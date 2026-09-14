import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      postId,
      content,
      identityMode = "PROFILE",
      aliasName,
      authorId = "usr_current_alex",
    } = body;

    if (!postId || !content || !content.trim()) {
      return NextResponse.json(
        { success: false, error: "Post ID and content are required" },
        { status: 400 }
      );
    }

    const createdComment = await prisma.comment.create({
      data: {
        postId,
        authorId,
        content: content.trim(),
        identityMode,
        aliasName: identityMode === "ALIAS" ? aliasName || "CuriousThinker" : null,
      },
      include: {
        author: {
          select: {
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });

    // Update post discussion count
    await prisma.post.update({
      where: { id: postId },
      data: { commentCount: { increment: 1 } },
    });

    // Award XP to commenter
    await prisma.user.update({
      where: { id: authorId },
      data: { xp: { increment: 10 } },
    });

    const isAnonymous = identityMode === "ANONYMOUS";
    const isAlias = identityMode === "ALIAS";

    return NextResponse.json({
      success: true,
      comment: {
        id: createdComment.id,
        postId: createdComment.postId,
        authorName: isAnonymous ? "Anonymous" : isAlias ? (createdComment.aliasName || "CuriousThinker") : createdComment.author.displayName,
        authorAvatar: identityMode === "PROFILE" ? createdComment.author.avatarUrl : null,
        identityMode: createdComment.identityMode,
        aliasName: createdComment.aliasName,
        content: createdComment.content,
        helpfulCount: createdComment.helpfulCount,
        createdAt: createdComment.createdAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("POST /api/comments error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
