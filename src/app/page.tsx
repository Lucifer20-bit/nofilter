"use client";

import React, { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { FeedHeader, FeedTab, PostFilter } from "@/components/feed/FeedHeader";
import { PostCard } from "@/components/post/PostCard";
import { useNofilterStore } from "@/lib/store";
import { Sparkles, MessageCircle, PenLine } from "lucide-react";
import { CreatePostModal } from "@/components/post/CreatePostModal";
import { ReportModal } from "@/components/moderation/ReportModal";

export default function HomePage() {
  const { posts } = useNofilterStore();
  const [activeTab, setActiveTab] = useState<FeedTab>("FOR_YOU");
  const [activeFilter, setActiveFilter] = useState<PostFilter>("ALL");
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [reportingPostId, setReportingPostId] = useState<string | null>(null);

  // Filter posts based on active Tab and format filter
  const filteredPosts = posts.filter((p) => {
    // Content format filter
    if (activeFilter !== "ALL" && p.postType !== activeFilter) {
      return false;
    }

    // Stream tabs
    if (activeTab === "DEBATES" && p.postType !== "DEBATE") {
      return false;
    }
    if (activeTab === "QUESTIONS" && p.postType !== "QUESTION") {
      return false;
    }
    return true;
  });

  // Sort based on Tab
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeTab === "TRENDING") {
      const aScore = a.reactions.helpful + a.reactions.madeMeThink * 2 + a.commentsCount;
      const bScore = b.reactions.helpful + b.reactions.madeMeThink * 2 + b.commentsCount;
      return bScore - aScore;
    }
    // Default: Newest first
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <Shell>
      <div className="flex flex-col min-h-screen">
        {/* Feed Header with Tabs and Format Pills */}
        <FeedHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Quick Thought Composer Banner */}
        <div className="p-4 border-b border-zinc-800/80 bg-zinc-950/40">
          <div
            onClick={() => setIsComposerOpen(true)}
            className="p-3.5 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/70 border border-zinc-800/80 hover:border-purple-500/40 cursor-pointer transition-all flex items-center justify-between gap-3 text-zinc-400 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400 text-sm">
                <PenLine className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-200">
                What are you genuinely thinking or struggling with?
              </span>
            </div>

            <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30">
              Share
            </span>
          </div>
        </div>

        {/* Posts Stream */}
        <div className="flex flex-col gap-4 p-4 sm:p-5">
          {sortedPosts.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center gap-3 bg-zinc-900/20 rounded-2xl border border-zinc-800/80 p-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800/60 flex items-center justify-center text-zinc-400">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-zinc-200">No conversations in this filter yet</h3>
              <p className="text-xs text-zinc-400 max-w-sm">
                Be the first to share an authentic question, confession, or debate in this category.
              </p>
              <button
                onClick={() => setIsComposerOpen(true)}
                className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 transition-colors"
              >
                Start Conversation
              </button>
            </div>
          ) : (
            sortedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onOpenReport={(id) => setReportingPostId(id)}
              />
            ))
          )}
        </div>

        {/* Modals */}
        <CreatePostModal
          isOpen={isComposerOpen}
          onClose={() => setIsComposerOpen(false)}
        />
        <ReportModal
          postId={reportingPostId}
          onClose={() => setReportingPostId(null)}
        />
      </div>
    </Shell>
  );
}
