"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Share2,
  MoreHorizontal,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Bookmark,
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
  const totalDebateVotes = post.agreeCount + post.disagreeCount;
  const agreePct = totalDebateVotes > 0 ? Math.round((post.agreeCount / totalDebateVotes) * 100) : 50;
  const disagreePct = 100 - agreePct;

  return (
    <article className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/80 transition-all flex flex-col gap-4">
      {/* Header: Author Identity + Community + Format Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {post.identityMode === "ANONYMOUS" ? (
            <div className="w-10 h-10 rounded-full bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-300 text-lg shadow-inner ring-1 ring-rose-500/20">
              🤫
            </div>
          ) : post.identityMode === "ALIAS" ? (
            <div className="w-10 h-10 rounded-full bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-300 text-lg shadow-inner ring-1 ring-purple-500/20">
              🎭
            </div>
          ) : (
            <img
              src={post.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
              alt={post.authorName}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-700"
            />
          )}

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-zinc-100">
                {post.identityMode === "ANONYMOUS"
                  ? "Anonymous"
                  : post.identityMode === "ALIAS"
                  ? post.aliasName || "CuriousThinker"
                  : post.authorName}
              </span>

              {post.identityMode === "PROFILE" && (
                <span className="text-xs font-mono px-1.5 py-0.2 rounded bg-zinc-800/80 text-purple-300 border border-zinc-700 text-[11px]">
                  ⭐ {post.authorReputation}% Rep
                </span>
              )}

              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-zinc-400 text-xs font-medium">{post.communityName}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
              <span>{formatTimeAgo(post.createdAt)}</span>
              {post.identityMode === "ANONYMOUS" && (
                <span className="text-rose-400/80 font-medium">Protected Identity</span>
              )}
            </div>
          </div>
        </div>

        {/* Format Badge & Options Menu */}
        <div className="flex items-center gap-2 relative">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${typeMeta.bg} ${typeMeta.text} ${typeMeta.border}`}
          >
            <span>{typeMeta.icon}</span>
            <span className="capitalize">{post.postType.toLowerCase()}</span>
          </span>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1 rounded-lg transition-colors ${
              isBookmarked ? "text-purple-400" : "text-zinc-500 hover:text-zinc-300"
            }`}
            title={isBookmarked ? "Saved" : "Save discussion"}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-purple-400" : ""}`} />
          </button>

          <button
            onClick={() => setShowActionsMenu(!showActionsMenu)}
            className="p-1 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
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
                {copied ? "Link Copied!" : "Share Discussion"}
              </button>
              <button
                onClick={() => {
                  setShowActionsMenu(false);
                  onOpenReport(post.id);
                }}
                className="w-full px-3 py-2 text-left hover:bg-rose-950/30 text-rose-400 flex items-center gap-2"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
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
                className="text-[11px] font-medium text-purple-400/80 hover:text-purple-300 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Special Debate Interactive Grid */}
      {post.postType === "DEBATE" && (
        <div className="p-3 sm:p-4 rounded-xl bg-zinc-950/60 border border-orange-900/30 flex flex-col gap-3 my-1">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Agree ({agreePct}%)
            </span>
            <span className="text-rose-400">Disagree ({disagreePct}%)</span>
          </div>

          <div className="h-2 w-full rounded-full bg-zinc-800 flex overflow-hidden">
            <div
              className="bg-emerald-500 transition-all duration-300"
              style={{ width: `${agreePct}%` }}
            />
            <div
              className="bg-rose-500 transition-all duration-300"
              style={{ width: `${disagreePct}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => voteDebate(post.id, "AGREE")}
              className={`p-2.5 rounded-xl text-xs font-semibold border flex flex-col text-left transition-all ${
                post.userVote === "AGREE"
                  ? "bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50"
                  : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 text-zinc-300"
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-emerald-400 font-bold">Vote Agree</span>
                <span className="text-[11px] opacity-80">{post.agreeCount} votes</span>
              </div>
              <span className="text-[11px] text-zinc-400 mt-1 font-normal line-clamp-1">
                {post.debateAgreeTitle || "Support this perspective"}
              </span>
            </button>

            <button
              onClick={() => voteDebate(post.id, "DISAGREE")}
              className={`p-2.5 rounded-xl text-xs font-semibold border flex flex-col text-left transition-all ${
                post.userVote === "DISAGREE"
                  ? "bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500/50"
                  : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 text-zinc-300"
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-rose-400 font-bold">Vote Disagree</span>
                <span className="text-[11px] opacity-80">{post.disagreeCount} votes</span>
              </div>
              <span className="text-[11px] text-zinc-400 mt-1 font-normal line-clamp-1">
                {post.debateDisagreeTitle || "Counter this perspective"}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Meaningful Reactions Bar */}
      <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Helpful */}
          <button
            onClick={() => toggleReaction(post.id, "helpful")}
            className={`px-2.5 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all border ${
              post.userReactions.helpful
                ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>💡</span>
            <span className="font-semibold">{post.reactions.helpful}</span>
            <span className="hidden sm:inline text-[11px]">Helpful</span>
          </button>

          {/* Insightful */}
          <button
            onClick={() => toggleReaction(post.id, "insightful")}
            className={`px-2.5 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all border ${
              post.userReactions.insightful
                ? "bg-orange-500/15 border-orange-500/40 text-orange-300"
                : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>🔥</span>
            <span className="font-semibold">{post.reactions.insightful}</span>
            <span className="hidden sm:inline text-[11px]">Insightful</span>
          </button>

          {/* Well Said */}
          <button
            onClick={() => toggleReaction(post.id, "wellSaid")}
            className={`px-2.5 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all border ${
              post.userReactions.wellSaid
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>👏</span>
            <span className="font-semibold">{post.reactions.wellSaid}</span>
            <span className="hidden sm:inline text-[11px]">Well Said</span>
          </button>

          {/* Made Me Think */}
          <button
            onClick={() => toggleReaction(post.id, "madeMeThink")}
            className={`px-2.5 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all border ${
              post.userReactions.madeMeThink
                ? "bg-purple-500/15 border-purple-500/40 text-purple-300"
                : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>🤔</span>
            <span className="font-semibold">{post.reactions.madeMeThink}</span>
            <span className="hidden sm:inline text-[11px]">Thought-Provoking</span>
          </button>
        </div>

        {/* Comments Toggle */}
        <button
          onClick={() => setShowComments(!showComments)}
          className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all border ${
            showComments
              ? "bg-purple-600/20 border-purple-500/40 text-purple-300"
              : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="font-semibold">{post.commentsCount}</span>
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
