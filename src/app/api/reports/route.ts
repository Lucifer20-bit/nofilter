import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      include: {
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            identityMode: true,
            author: { select: { username: true, displayName: true } },
          },
        },
        reporter: {
          select: {
            username: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = reports.map((r) => ({
      id: r.id,
      postId: r.postId || "",
      postTitle: r.post?.title || undefined,
      postSnippet: (r.post?.content || "").substring(0, 80) + "...",
      authorIdentity:
        r.post?.identityMode === "ANONYMOUS"
          ? "Anonymous (Internal User: " + r.post?.author.username + ")"
          : r.post?.author.displayName || "Unknown",
      reporterUsername: r.reporter.username,
      reason: r.reason,
      details: r.details || undefined,
      status: r.status,
      createdAt: r.createdAt.toISOString(),
    }));

    return NextResponse.json({ success: true, reports: formatted });
  } catch (error: any) {
    console.error("GET /api/reports error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, reason, details, reporterId = "usr_current_alex" } = body;

    if (!postId || !reason) {
      return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 });
    }

    const created = await prisma.report.create({
      data: {
        reporterId,
        postId,
        reason,
        details: details?.trim() || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, report: created });
  } catch (error: any) {
    console.error("POST /api/reports error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { reportId, action } = body; // action: "DISMISS" | "REMOVE"

    if (!reportId || !action) {
      return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 });
    }

    const report = await prisma.report.findUnique({ where: { id: reportId } });
    if (!report) {
      return NextResponse.json({ success: false, error: "Report not found" }, { status: 404 });
    }

    if (action === "REMOVE" && report.postId) {
      // Soft-delete / hide post from feed
      await prisma.post.update({
        where: { id: report.postId },
        data: { moderationStatus: "REMOVED" },
      });
    }

    const updatedReport = await prisma.report.update({
      where: { id: reportId },
      data: { status: action === "REMOVE" ? "RESOLVED" : "DISMISSED" },
    });

    return NextResponse.json({ success: true, report: updatedReport });
  } catch (error: any) {
    console.error("PATCH /api/reports error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
