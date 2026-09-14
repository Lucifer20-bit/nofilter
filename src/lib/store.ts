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

// In-memory global state holder for browser sessions
let globalPosts = [...INITIAL_POSTS];
let globalUser = { ...CURRENT_USER };
let globalReports = [...INITIAL_REPORTS];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function useNofilterStore() {
  const [posts, setPosts] = useState<PostItem[]>(globalPosts);
  const [user, setUser] = useState<UserProfile>(globalUser);
  const [reports, setReports] = useState<ReportItem[]>(globalReports);
  const [communities] = useState<CommunityItem[]>(INITIAL_COMMUNITIES);

  useEffect(() => {
    const handler = () => {
      setPosts([...globalPosts]);
      setUser({ ...globalUser });
      setReports([...globalReports]);
    };
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  const addPost = (newPost: Omit<PostItem, "id" | "createdAt" | "reactions" | "userReactions" | "commentsCount" | "comments" | "agreeCount" | "disagreeCount">) => {
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

    // Reward XP for constructive participation
    globalUser = {
      ...globalUser,
      xp: globalUser.xp + 15,
      streakDays: globalUser.streakDays,
    };

    notify();
    return created;
  };

  const toggleReaction = (
    postId: string,
    reactionType: "helpful" | "insightful" | "wellSaid" | "madeMeThink"
  ) => {
    globalPosts = globalPosts.map((p) => {
      if (p.id !== postId) return p;

      const isCurrentlyActive = p.userReactions[reactionType];
      const countDelta = isCurrentlyActive ? -1 : 1;

      // Update author reputation if reacting positively
      if (!isCurrentlyActive) {
        const points = reactionType === "helpful" ? 5 : 3;
        if (p.authorId === globalUser.id) {
          globalUser.reputationScore += points;
        }
      }

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
  };

  const voteDebate = (postId: string, stance: "AGREE" | "DISAGREE") => {
    globalPosts = globalPosts.map((p) => {
      if (p.id !== postId) return p;
      if (p.userVote === stance) {
        // Toggle off
        return {
          ...p,
          userVote: null,
          agreeCount: stance === "AGREE" ? p.agreeCount - 1 : p.agreeCount,
          disagreeCount: stance === "DISAGREE" ? p.disagreeCount - 1 : p.disagreeCount,
        };
      } else {
        // Vote or switch
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
  };

  const addComment = (
    postId: string,
    content: string,
    identityMode: "PROFILE" | "ANONYMOUS" | "ALIAS",
    aliasName?: string
  ) => {
    const newComment: CommentItem = {
      id: `c_${Date.now()}`,
      postId,
      authorId: globalUser.id,
      authorName: identityMode === "ANONYMOUS" ? "Anonymous" : identityMode === "ALIAS" ? (aliasName || "CuriousThinker") : globalUser.displayName,
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
  };

  const submitReport = (postId: string, reason: string, details?: string) => {
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
  };

  const resolveReport = (reportId: string, action: "DISMISS" | "REMOVE") => {
    const rep = globalReports.find((r) => r.id === reportId);
    if (rep && action === "REMOVE") {
      // Remove the reported post from feed
      globalPosts = globalPosts.filter((p) => p.id !== rep.postId);
    }
    globalReports = globalReports.map((r) =>
      r.id === reportId ? { ...r, status: action === "REMOVE" ? "RESOLVED" : "DISMISSED" } : r
    );
    notify();
  };

  return {
    posts,
    user,
    reports,
    communities,
    addPost,
    toggleReaction,
    voteDebate,
    addComment,
    submitReport,
    resolveReport,
  };
}
