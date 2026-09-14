import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkPreFlightContent } from "@/lib/moderation";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const communityId = searchParams.get("communityId");
    const postType = searchParams.get("postType");
    const search = searchParams.get("search");

    const whereClause: any = {
      moderationStatus: { not: "REMOVED" },
    };

    if (communityId) {
      whereClause.communityId = communityId;
    }

    if (postType && postType !== "ALL") {
      whereClause.postType = postType;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    const rawPosts = await prisma.post.findMany({
      where: whereClause,
      include: {
        community: true,
        author: {
          select: {
            id: true,
            displayName: true,
            username: true,
            avatarUrl: true,
            reputationScore: true,
          },
        },
        comments: {
          where: { moderationStatus: { not: "REMOVED" } },
          include: {
            author: {
              select: {
                displayName: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Server-Side Public Privacy Sanitizer
    const sanitizedPosts = rawPosts.map((post) => {
      const isAnonymous = post.identityMode === "ANONYMOUS";
      const isAlias = post.identityMode === "ALIAS";

      const publicAuthor = {
        name: isAnonymous ? "Anonymous Author" : isAlias ? (post.aliasName || "CuriousThinker") : post.author.displayName,
        username: isAnonymous || isAlias ? "shielded" : post.author.username,
        avatar: isAnonymous || isAlias ? null : post.author.avatarUrl,
        reputation: isAnonymous ? 50 : post.author.reputationScore,
      };

      const sanitizedComments = post.comments.map((c) => ({
        id: c.id,
        postId: c.postId,
        authorName: c.identityMode === "ANONYMOUS" ? "Anonymous" : c.identityMode === "ALIAS" ? (c.aliasName || "CuriousThinker") : c.author.displayName,
        authorAvatar: c.identityMode === "PROFILE" ? c.author.avatarUrl : null,
        identityMode: c.identityMode,
        aliasName: c.aliasName,
        content: c.content,
        helpfulCount: c.helpfulCount,
        createdAt: c.createdAt.toISOString(),
      }));

      return {
        id: post.id,
        authorName: publicAuthor.name,
        authorUsername: publicAuthor.username,
        authorAvatar: publicAuthor.avatar,
        authorReputation: publicAuthor.reputation,
        communityId: post.communityId,
        communityName: post.community.name,
        communitySlug: post.community.slug,
        postType: post.postType,
        identityMode: post.identityMode,
        aliasName: post.aliasName,
        title: post.title,
        content: post.content,
        tags: post.tags ? post.tags.split(",").filter(Boolean) : [],
        debateAgreeTitle: post.debateAgreeTitle,
        debateDisagreeTitle: post.debateDisagreeTitle,
        agreeCount: post.agreeCount,
        disagreeCount: post.disagreeCount,
        reactions: {
          helpful: post.helpfulCount,
          insightful: post.insightfulCount,
          wellSaid: post.wellSaidCount,
          madeMeThink: post.madeMeThinkCount,
        },
        commentsCount: post.commentCount,
        createdAt: post.createdAt.toISOString(),
        comments: sanitizedComments,
      };
    });

    return NextResponse.json({ success: true, posts: sanitizedPosts });
  } catch (error: any) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      postType = "THOUGHT",
      identityMode = "PROFILE",
      aliasName,
      communityId,
      tags = [],
      debateAgreeTitle,
      debateDisagreeTitle,
      authorId = "usr_current_alex",
    } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ success: false, error: "Content is required" }, { status: 400 });
    }

    // 1. Server-side Pre-Flight Safety Audit
    const moderation = checkPreFlightContent(content, postType);
    if (!moderation.isSafe) {
      return NextResponse.json(
        {
          success: false,
          error: moderation.suggestion || "Content failed community safety criteria.",
        },
        { status: 422 }
      );
    }

    // 2. Resolve community
    const targetCommunityId = communityId || "comm_tech";

    // 3. Persist post
    const created = await prisma.post.create({
      data: {
        authorId,
        communityId: targetCommunityId,
        postType,
        identityMode,
        aliasName: identityMode === "ALIAS" ? aliasName || "CuriousThinker" : null,
        title: title?.trim() || null,
        content: content.trim(),
        tags: Array.isArray(tags) ? tags.join(",") : tags || "",
        debateAgreeTitle: postType === "DEBATE" ? debateAgreeTitle || "Agree position" : null,
        debateDisagreeTitle: postType === "DEBATE" ? debateDisagreeTitle || "Disagree position" : null,
        moderationStatus: "APPROVED",
      },
    });

    // 4. Increment user XP in database
    await prisma.user.update({
      where: { id: authorId },
      data: { xp: { increment: 15 } },
    });

    return NextResponse.json({ success: true, post: created });
  } catch (error: any) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
