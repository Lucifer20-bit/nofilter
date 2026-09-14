"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Share2,
  MoreHorizontal,
  ShieldAlert,
  Shield,
  User,
  CheckCircle2,
  Bookmark,
  Lightbulb,
  Sparkles,
  Check,
  Brain,
} from "lucide-react";
import { PostItem } from "@/lib/mock-data";
import { useNofilterStore } from "@/lib/store";
import { formatTimeAgo, getPostTypeColor } from "@/lib/utils";
import { ThreadedComments } from "../comments/ThreadedComments";

interface PostCardProps {
  post: PostItem;
  onOpenReport: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onOpenReport }) => {
  const { toggleReaction, voteDebate } = useNofilterStore();
  const [showComments, setShowComments] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const typeMeta = getPostTypeColor(post.postType);

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowActionsMenu(false);
  };

  // Debate stats
  const totalDebateVotes = (post.agreeCount || 0) + (post.disagreeCount || 0);
  const agreePct = totalDebateVotes > 0 ? Math.round(((post.agreeCount || 0) / totalDebateVotes) * 100) : 50;
  const disagreePct = 100 - agreePct;

  const userReactions = post.userReactions || {
    helpful: false,
    insightful: false,
    wellSaid: false,
    madeMeThink: false,
  };

  const reactions = post.reactions || {
    helpful: 0,
    insightful: 0,
    wellSaid: 0,
    madeMeThink: 0,
  };

  return (
    <article className="p-5 rounded-2xl bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/80 transition-all flex flex-col gap-4">
      {/* Header: Author Identity + Community + Format Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {post.identityMode === "ANONYMOUS" ? (
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
              <Shield className="w-4 h-4" />
            </div>
          ) : post.identityMode === "ALIAS" ? (
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-mono text-xs font-bold">
              AL
            </div>
          ) : (
            <img
              src={
                post.authorAvatar ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
              }
              alt={post.authorName}
              className="w-10 h-10 rounded-xl object-cover border border-zinc-800"
            />
          )}

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-zinc-100">
                {post.identityMode === "ANONYMOUS"
                  ? "Anonymous Author"
                  : post.identityMode === "ALIAS"
                  ? post.aliasName || "CuriousThinker"
                  : post.authorName}
              </span>

              {post.identityMode === "PROFILE" && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px]">
                  Score {post.authorReputation}%
                </span>
              )}

              <span className="text-zinc-600 text-xs">•</span>
              <span className="text-zinc-400 text-xs font-medium">{post.communityName}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
              <span>{formatTimeAgo(post.createdAt)}</span>
              {post.identityMode === "ANONYMOUS" && (
                <span className="text-zinc-400 font-mono">Shielded Identity</span>
              )}
            </div>
          </div>
        </div>

        {/* Format Badge & Options Menu */}
        <div className="flex items-center gap-2 relative">
          <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium border bg-zinc-900 border-zinc-800 text-zinc-300 uppercase tracking-wider">
            {post.postType.toLowerCase()}
          </span>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
            }`}
            title={isBookmarked ? "Saved" : "Save discussion"}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-zinc-100" : ""}`} />
          </button>

          <button
            onClick={() => setShowActionsMenu(!showActionsMenu)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {showActionsMenu && (
            <div className="absolute right-0 top-8 z-20 w-44 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl py-1 text-xs">
              <button
                onClick={handleCopy}
                className="w-full px-3 py-2 text-left hover:bg-zinc-800 text-zinc-300 flex items-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copied ? "Link Copied" : "Share Discussion"}
              </button>
              <button
                onClick={() => {
                  setShowActionsMenu(false);
                  onOpenReport(post.id);
                }}
                className="w-full px-3 py-2 text-left hover:bg-zinc-800 text-zinc-400 flex items-center gap-2"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-zinc-400" />
                Report Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-2">
        {post.title && (
          <h3 className="text-base sm:text-lg font-bold text-zinc-100 tracking-tight leading-snug">
            {post.title}
          </h3>
        )}

        <p className="text-sm text-zinc-300 whitespace-pre-line leading-relaxed font-normal">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono text-zinc-400 hover:text-zinc-200 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Structured Debate Section */}
      {post.postType === "DEBATE" && (
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex flex-col gap-3 my-1">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" /> Agree ({agreePct}%)
            </span>
            <span className="text-zinc-400">Disagree ({disagreePct}%)</span>
          </div>

          <div className="h-2 w-full rounded-full bg-zinc-800 flex overflow-hidden">
            <div
              className="bg-zinc-200 transition-all duration-300"
              style={{ width: `${agreePct}%` }}
            />
            <div
              className="bg-zinc-600 transition-all duration-300"
              style={{ width: `${disagreePct}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => voteDebate(post.id, "AGREE")}
              className={`p-3 rounded-xl text-xs font-semibold border flex flex-col text-left transition-all ${
                post.userVote === "AGREE"
                  ? "bg-zinc-800 border-zinc-500 text-white"
                  : "bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-300"
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-bold">Vote Agree</span>
                <span className="text-[11px] opacity-70 font-mono">{post.agreeCount}</span>
              </div>
              <span className="text-[11px] text-zinc-400 mt-1 font-normal line-clamp-1">
                {post.debateAgreeTitle || "Support this perspective"}
              </span>
            </button>

            <button
              onClick={() => voteDebate(post.id, "DISAGREE")}
              className={`p-3 rounded-xl text-xs font-semibold border flex flex-col text-left transition-all ${
                post.userVote === "DISAGREE"
                  ? "bg-zinc-800 border-zinc-500 text-white"
                  : "bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-300"
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-bold">Vote Disagree</span>
                <span className="text-[11px] opacity-70 font-mono">{post.disagreeCount}</span>
              </div>
              <span className="text-[11px] text-zinc-400 mt-1 font-normal line-clamp-1">
                {post.debateDisagreeTitle || "Counter this perspective"}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Substantive Reactions Bar (No Emojis, Pure Professional Icons) */}
      <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Helpful */}
          <button
            onClick={() => toggleReaction(post.id, "helpful")}
            className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all border ${
              userReactions.helpful
                ? "bg-zinc-800 border-zinc-600 text-white"
                : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="font-mono font-semibold">{reactions.helpful}</span>
            <span className="hidden sm:inline text-[11px]">Helpful</span>
          </button>

          {/* Insightful */}
          <button
            onClick={() => toggleReaction(post.id, "insightful")}
            className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all border ${
              userReactions.insightful
                ? "bg-zinc-800 border-zinc-600 text-white"
                : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-mono font-semibold">{reactions.insightful}</span>
            <span className="hidden sm:inline text-[11px]">Insightful</span>
          </button>

          {/* Well Said */}
          <button
            onClick={() => toggleReaction(post.id, "wellSaid")}
            className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all border ${
              userReactions.wellSaid
                ? "bg-zinc-800 border-zinc-600 text-white"
                : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span className="font-mono font-semibold">{reactions.wellSaid}</span>
            <span className="hidden sm:inline text-[11px]">Well Said</span>
          </button>

          {/* Thought Provoking */}
          <button
            onClick={() => toggleReaction(post.id, "madeMeThink")}
            className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all border ${
              userReactions.madeMeThink
                ? "bg-zinc-800 border-zinc-600 text-white"
                : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span className="font-mono font-semibold">{reactions.madeMeThink}</span>
            <span className="hidden sm:inline text-[11px]">Thought-Provoking</span>
          </button>
        </div>

        {/* Comments Toggle */}
        <button
          onClick={() => setShowComments(!showComments)}
          className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all border ${
            showComments
              ? "bg-zinc-800 border-zinc-600 text-white"
              : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="font-mono font-semibold">{post.commentsCount}</span>
          <span className="hidden sm:inline">Discussions</span>
        </button>
      </div>

      {/* Threaded Comments Section */}
      {showComments && (
        <div className="pt-2 border-t border-zinc-800/60">
          <ThreadedComments
            postId={post.id}
            isDebate={post.postType === "DEBATE"}
            comments={post.comments}
          />
        </div>
      )}
    </article>
  );
};
