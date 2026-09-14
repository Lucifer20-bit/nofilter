import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, reactionType, userId = "usr_current_alex" } = body;

    if (!postId || !reactionType) {
      return NextResponse.json(
        { success: false, error: "Post ID and reaction type are required" },
        { status: 400 }
      );
    }

    const fieldMap: Record<string, string> = {
      helpful: "helpfulCount",
      insightful: "insightfulCount",
      wellSaid: "wellSaidCount",
      madeMeThink: "madeMeThinkCount",
    };

    const countField = fieldMap[reactionType];
    if (!countField) {
      return NextResponse.json(
        { success: false, error: "Invalid reaction type" },
        { status: 400 }
      );
    }

    // Check if user already reacted
    const existing = await prisma.reaction.findUnique({
      where: {
        userId_postId_reactionType: {
          userId,
          postId,
          reactionType: reactionType.toUpperCase(),
        },
      },
    });

    let updatedPost;
    let isActive = false;

    if (existing) {
      // Remove reaction
      await prisma.reaction.delete({
        where: { id: existing.id },
      });

      updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          [countField]: { decrement: 1 },
        },
      });
      isActive = false;
    } else {
      // Add reaction
      await prisma.reaction.create({
        data: {
          userId,
          postId,
          reactionType: reactionType.toUpperCase(),
        },
      });

      updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          [countField]: { increment: 1 },
        },
      });
      isActive = true;

      // Update author reputation
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { authorId: true },
      });

      if (post && post.authorId) {
        const points = reactionType === "helpful" ? 5 : 3;
        await prisma.user.update({
          where: { id: post.authorId },
          data: { reputationScore: { increment: points } },
        });
      }
    }

    return NextResponse.json({
      success: true,
      isActive,
      reactions: {
        helpful: updatedPost.helpfulCount,
        insightful: updatedPost.insightfulCount,
        wellSaid: updatedPost.wellSaidCount,
        madeMeThink: updatedPost.madeMeThinkCount,
      },
    });
  } catch (error: any) {
    console.error("POST /api/reactions error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
