"use client";

import { useState, useEffect } from "react";
import {
  PostItem,
  CommentItem,
  UserProfile,
  CommunityItem,
  INITIAL_POSTS,
  INITIAL_COMMUNITIES,
  CURRENT_USER,
} from "./mock-data";

export interface ReportItem {
  id: string;
  postId: string;
  postTitle?: string;
  postSnippet: string;
  authorIdentity: string;
  reporterUsername: string;
  reason: string;
  details?: string;
  status: "PENDING" | "RESOLVED" | "DISMISSED";
  createdAt: string;
}

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: "rep_1",
    postId: "post_2",
    postTitle: "I've been pretending that I know what I'm doing with my career...",
    postSnippet: "Every single morning I wake up paralyzed with imposter syndrome...",
    authorIdentity: "Anonymous",
    reporterUsername: "safety_patrol",
    reason: "Severe Anxiety / Mental Wellness Check",
    details: "User sounds deeply distressed. Auto-flagged for helpful wellness resources.",
    status: "PENDING",
    createdAt: new Date(Date.now() - 1000 * 60 * 100).toISOString(),
  },
];

// In-memory global state
let globalPosts: PostItem[] = [...INITIAL_POSTS];
let globalUser: UserProfile = { ...CURRENT_USER };
let globalReports: ReportItem[] = [...INITIAL_REPORTS];
let isLoaded = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function useNofilterStore() {
  const [posts, setPosts] = useState<PostItem[]>(globalPosts);
  const [user, setUser] = useState<UserProfile>(globalUser);
  const [reports, setReports] = useState<ReportItem[]>(globalReports);
  const [communities] = useState<CommunityItem[]>(INITIAL_COMMUNITIES);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);

  // Sync with real backend REST APIs on mount
  useEffect(() => {
    async function syncBackend() {
      try {
        const postsRes = await fetch("/api/posts");
        if (postsRes.ok) {
          const data = await postsRes.json();
          if (data.posts && data.posts.length > 0) {
            globalPosts = data.posts;
          }
        }

        const reportsRes = await fetch("/api/reports");
        if (reportsRes.ok) {
          const data = await reportsRes.json();
          if (data.reports && data.reports.length > 0) {
            globalReports = data.reports;
          }
        }
      } catch (e) {
        console.warn("Backend API sync failed, falling back to local dataset:", e);
      } finally {
        isLoaded = true;
        notify();
      }
    }

    if (!isLoaded) {
      syncBackend();
    }

    const handler = () => {
      setPosts([...globalPosts]);
      setUser({ ...globalUser });
      setReports([...globalReports]);
    };
    listeners.add(handler);
    handler();

    return () => {
      listeners.delete(handler);
    };
  }, []);

  const addPost = async (
    newPost: Omit<
      PostItem,
      | "id"
      | "createdAt"
      | "reactions"
      | "userReactions"
      | "commentsCount"
      | "comments"
      | "agreeCount"
      | "disagreeCount"
    >
  ) => {
    // Optimistic UI update
    const created: PostItem = {
      ...newPost,
      id: `post_${Date.now()}`,
      createdAt: new Date().toISOString(),
      agreeCount: 0,
      disagreeCount: 0,
      reactions: { helpful: 0, insightful: 0, wellSaid: 0, madeMeThink: 0 },
      userReactions: { helpful: false, insightful: false, wellSaid: false, madeMeThink: false },
      commentsCount: 0,
      comments: [],
    };
    globalPosts = [created, ...globalPosts];
    globalUser = {
      ...globalUser,
      xp: globalUser.xp + 15,
    };
    notify();

    // Real server call
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          postType: newPost.postType,
          identityMode: newPost.identityMode,
          aliasName: newPost.aliasName,
          communityId: newPost.communityId,
          tags: newPost.tags,
          debateAgreeTitle: newPost.debateAgreeTitle,
          debateDisagreeTitle: newPost.debateDisagreeTitle,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.post && data.post.id) {
          // Sync server-generated ID
          created.id = data.post.id;
          notify();
        }
      }
    } catch (e) {
      console.warn("POST /api/posts network call failed:", e);
    }

    return created;
  };

  const toggleReaction = async (
    postId: string,
    reactionType: "helpful" | "insightful" | "wellSaid" | "madeMeThink"
  ) => {
    // Optimistic UI update
    globalPosts = globalPosts.map((p) => {
      if (p.id !== postId) return p;

      const isCurrentlyActive = p.userReactions[reactionType];
      const countDelta = isCurrentlyActive ? -1 : 1;

      return {
        ...p,
        reactions: {
          ...p.reactions,
          [reactionType]: Math.max(0, p.reactions[reactionType] + countDelta),
        },
        userReactions: {
          ...p.userReactions,
          [reactionType]: !isCurrentlyActive,
        },
      };
    });
    notify();

    // Real server call
    try {
      await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, reactionType }),
      });
    } catch (e) {
      console.warn("POST /api/reactions network call failed:", e);
    }
  };

  const voteDebate = async (postId: string, stance: "AGREE" | "DISAGREE") => {
    // Optimistic UI update
    globalPosts = globalPosts.map((p) => {
      if (p.id !== postId) return p;
      if (p.userVote === stance) {
        return {
          ...p,
          userVote: null,
          agreeCount: stance === "AGREE" ? p.agreeCount - 1 : p.agreeCount,
          disagreeCount: stance === "DISAGREE" ? p.disagreeCount - 1 : p.disagreeCount,
        };
      } else {
        let newAgree = p.agreeCount;
        let newDisagree = p.disagreeCount;

        if (p.userVote === "AGREE") newAgree--;
        if (p.userVote === "DISAGREE") newDisagree--;

        if (stance === "AGREE") newAgree++;
        if (stance === "DISAGREE") newDisagree++;

        return {
          ...p,
          userVote: stance,
          agreeCount: Math.max(0, newAgree),
          disagreeCount: Math.max(0, newDisagree),
        };
      }
    });
    notify();

    // Real server call
    try {
      await fetch("/api/debates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "VOTE", postId, stance }),
      });
    } catch (e) {
      console.warn("POST /api/debates network call failed:", e);
    }
  };

  const addComment = async (
    postId: string,
    content: string,
    identityMode: "PROFILE" | "ANONYMOUS" | "ALIAS",
    aliasName?: string
  ) => {
    // Optimistic UI update
    const newComment: CommentItem = {
      id: `c_${Date.now()}`,
      postId,
      authorId: globalUser.id,
      authorName:
        identityMode === "ANONYMOUS"
          ? "Anonymous Author"
          : identityMode === "ALIAS"
          ? aliasName || "CuriousThinker"
          : globalUser.displayName,
      authorAvatar: identityMode === "PROFILE" ? globalUser.avatarUrl : undefined,
      identityMode,
      aliasName,
      content,
      helpfulCount: 0,
      createdAt: new Date().toISOString(),
    };

    globalPosts = globalPosts.map((p) => {
      if (p.id !== postId) return p;
      return {
        ...p,
        commentsCount: p.commentsCount + 1,
        comments: [...p.comments, newComment],
      };
    });
    globalUser.xp += 10;
    notify();

    // Real server call
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content,
          identityMode,
          aliasName,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.comment?.id) {
          newComment.id = data.comment.id;
          notify();
        }
      }
    } catch (e) {
      console.warn("POST /api/comments network call failed:", e);
    }
  };

  const awardDelta = async (postId: string, commentId: string) => {
    // Optimistic update
    globalPosts = globalPosts.map((p) => {
      if (p.id !== postId) return p;
      return {
        ...p,
        comments: p.comments.map((c) => {
          if (c.id !== commentId) return c;
          return {
            ...c,
            helpfulCount: c.helpfulCount + 5,
          };
        }),
      };
    });
    globalUser.xp += 20;
    notify();

    // Real server call
    try {
      await fetch("/api/debates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "DELTA", postId, commentId }),
      });
    } catch (e) {
      console.warn("POST /api/debates Delta failed:", e);
    }
  };

  const submitReport = async (postId: string, reason: string, details?: string) => {
    const targetPost = globalPosts.find((p) => p.id === postId);
    if (!targetPost) return;

    const newReport: ReportItem = {
      id: `rep_${Date.now()}`,
      postId,
      postTitle: targetPost.title,
      postSnippet: targetPost.content.substring(0, 80) + "...",
      authorIdentity: targetPost.identityMode === "ANONYMOUS" ? "Anonymous" : targetPost.authorName,
      reporterUsername: globalUser.username,
      reason,
      details,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    globalReports = [newReport, ...globalReports];
    notify();

    // Real server call
    try {
      await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, reason, details }),
      });
    } catch (e) {
      console.warn("POST /api/reports failed:", e);
    }
  };

  const resolveReport = async (reportId: string, action: "DISMISS" | "REMOVE") => {
    const rep = globalReports.find((r) => r.id === reportId);
    if (rep && action === "REMOVE") {
      globalPosts = globalPosts.filter((p) => p.id !== rep.postId);
    }
    globalReports = globalReports.map((r) =>
      r.id === reportId ? { ...r, status: action === "REMOVE" ? "RESOLVED" : "DISMISSED" } : r
    );
    notify();

    // Real server call
    try {
      await fetch("/api/reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, action }),
      });
    } catch (e) {
      console.warn("PATCH /api/reports failed:", e);
    }
  };

  return {
    posts,
    user,
    reports,
    communities,
    selectedCommunityId,
    setSelectedCommunityId,
    addPost,
    toggleReaction,
    voteDebate,
    addComment,
    awardDelta,
    submitReport,
    resolveReport,
  };
}
