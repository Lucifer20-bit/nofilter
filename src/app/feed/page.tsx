"use client";

import React, { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { FeedHeader, FeedTab, PostFilter } from "@/components/feed/FeedHeader";
import { PostCard } from "@/components/post/PostCard";
import { useNofilterStore } from "@/lib/store";
import { MessageCircle, PenLine, SearchX } from "lucide-react";
import { CreatePostModal } from "@/components/post/CreatePostModal";
import { ReportModal } from "@/components/moderation/ReportModal";

export default function FeedPage() {
  const { posts, communities, selectedCommunityId, setSelectedCommunityId } = useNofilterStore();
  const [activeTab, setActiveTab] = useState<FeedTab>("FOR_YOU");
  const [activeFilter, setActiveFilter] = useState<PostFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [reportingPostId, setReportingPostId] = useState<string | null>(null);

  const activeCommunity = communities.find((c) => c.id === selectedCommunityId);

  // Filter posts based on active Tab, format filter, search query, and community
  const filteredPosts = posts.filter((p) => {
    // Community filter
    if (selectedCommunityId && p.communityId !== selectedCommunityId) {
      return false;
    }

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

    // Live search query matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inTitle = p.title?.toLowerCase().includes(q);
      const inContent = p.content.toLowerCase().includes(q);
      const inTags = p.tags?.some((t) => t.toLowerCase().includes(q));
      const inCommunity = p.communityName.toLowerCase().includes(q);
      const inAuthor =
        p.authorName.toLowerCase().includes(q) || p.aliasName?.toLowerCase().includes(q);

      if (!inTitle && !inContent && !inTags && !inCommunity && !inAuthor) {
        return false;
      }
    }

    return true;
  });

  // Sort based on Tab
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeTab === "TRENDING") {
      const aScore = (a.reactions?.helpful || 0) + (a.reactions?.madeMeThink || 0) * 2 + (a.commentsCount || 0);
      const bScore = (b.reactions?.helpful || 0) + (b.reactions?.madeMeThink || 0) * 2 + (b.commentsCount || 0);
      return bScore - aScore;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <Shell>
      <div className="flex flex-col min-h-screen">
        {/* Feed Header with Search, Tabs, Community Badge and Format Pills */}
        <FeedHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCommunityName={activeCommunity?.name}
          onClearCommunity={() => setSelectedCommunityId(null)}
        />

        {/* Quick Thought Composer Banner */}
        <div className="p-4 border-b border-zinc-800/80 bg-zinc-950/40">
          <div
            onClick={() => setIsComposerOpen(true)}
            className="p-3.5 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 cursor-pointer transition-all flex items-center justify-between gap-3 text-zinc-400 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 text-sm shadow-inner">
                <PenLine className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-200">
                What are you genuinely thinking or struggling with?
              </span>
            </div>

            <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700">
              Share
            </span>
          </div>
        </div>

        {/* Posts Stream */}
        <div className="flex flex-col gap-4 p-4 sm:p-5">
          {sortedPosts.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center gap-3 bg-zinc-900/20 rounded-2xl border border-zinc-800/80 p-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800/60 flex items-center justify-center text-zinc-400">
                {searchQuery ? <SearchX className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
              </div>
              <h3 className="font-bold text-sm text-zinc-200">
                {searchQuery
                  ? `No discussions match "${searchQuery}"`
                  : "No conversations in this filter yet"}
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm">
                {searchQuery
                  ? "Try searching for another topic or hashtag, or be the first to start this thread."
                  : "Be the first to share an authentic question, confession, or debate in this category."}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCommunityId(null);
                  setActiveFilter("ALL");
                }}
                className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-100 text-zinc-950 hover:bg-white transition-colors"
              >
                Reset All Filters
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
