import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, postId, commentId, stance, userId = "usr_current_alex" } = body;

    // 1. Vote on Debate Proposition
    if (action === "VOTE") {
      if (!postId || !stance) {
        return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 });
      }

      const post = await prisma.post.findUnique({ where: { id: postId } });
      if (!post) {
        return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
      }

      let dataToUpdate = {};
      if (stance === "AGREE") {
        dataToUpdate = { agreeCount: { increment: 1 } };
      } else if (stance === "DISAGREE") {
        dataToUpdate = { disagreeCount: { increment: 1 } };
      }

      const updated = await prisma.post.update({
        where: { id: postId },
        data: dataToUpdate,
      });

      return NextResponse.json({
        success: true,
        agreeCount: updated.agreeCount,
        disagreeCount: updated.disagreeCount,
      });
    }

    // 2. Award Delta Persuasion Point to a comment
    if (action === "DELTA") {
      if (!commentId) {
        return NextResponse.json({ success: false, error: "Comment ID required" }, { status: 400 });
      }

      const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: { helpfulCount: { increment: 5 } },
        include: { author: true },
      });

      // Reward persuasion author
      await prisma.user.update({
        where: { id: updatedComment.authorId },
        data: {
          xp: { increment: 20 },
          reputationScore: { increment: 5 },
        },
      });

      return NextResponse.json({
        success: true,
        helpfulCount: updatedComment.helpfulCount,
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("POST /api/debates error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
