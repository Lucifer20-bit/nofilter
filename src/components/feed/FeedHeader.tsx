"use client";

import React from "react";
import { Sparkles, TrendingUp, Clock, Flame, HelpCircle, Search, X } from "lucide-react";

export type FeedTab = "FOR_YOU" | "TRENDING" | "NEW" | "DEBATES" | "QUESTIONS";
export type PostFilter =
  | "ALL"
  | "THOUGHT"
  | "QUESTION"
  | "STORY"
  | "CONFESSION"
  | "ADVICE"
  | "DEBATE"
  | "ACHIEVEMENT";

interface FeedHeaderProps {
  activeTab: FeedTab;
  onTabChange: (tab: FeedTab) => void;
  activeFilter: PostFilter;
  onFilterChange: (filter: PostFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCommunityName?: string | null;
  onClearCommunity?: () => void;
}

export const FeedHeader: React.FC<FeedHeaderProps> = ({
  activeTab,
  onTabChange,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  selectedCommunityName,
  onClearCommunity,
}) => {
  const tabs = [
    { id: "FOR_YOU" as FeedTab, label: "For You", icon: Sparkles },
    { id: "TRENDING" as FeedTab, label: "Trending", icon: TrendingUp },
    { id: "NEW" as FeedTab, label: "Fresh", icon: Clock },
    { id: "DEBATES" as FeedTab, label: "Debates", icon: Flame },
    { id: "QUESTIONS" as FeedTab, label: "Questions", icon: HelpCircle },
  ];

  const filterChips = [
    { id: "ALL" as PostFilter, label: "All Posts", icon: "✨" },
    { id: "THOUGHT" as PostFilter, label: "Thoughts", icon: "💭" },
    { id: "QUESTION" as PostFilter, label: "Questions", icon: "❓" },
    { id: "CONFESSION" as PostFilter, label: "Confessions", icon: "🤫" },
    { id: "DEBATE" as PostFilter, label: "Debates", icon: "🔥" },
    { id: "ADVICE" as PostFilter, label: "Advice", icon: "💡" },
    { id: "STORY" as PostFilter, label: "Stories", icon: "🗣️" },
    { id: "ACHIEVEMENT" as PostFilter, label: "Milestones", icon: "🏆" },
  ];

  return (
    <div className="sticky top-0 z-30 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 pt-3 pb-2 px-4 flex flex-col gap-2.5">
      {/* Search Input & Active Community Badge */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search conversations, questions, topics, #tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-zinc-900/70 border border-zinc-800 rounded-xl pl-9 pr-8 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {selectedCommunityName && (
          <div className="flex items-center gap-1.5 bg-purple-950/50 border border-purple-500/40 text-purple-300 px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap">
            <span>Room: {selectedCommunityName}</span>
            {onClearCommunity && (
              <button
                onClick={onClearCommunity}
                className="hover:text-white p-0.5 rounded"
                title="Clear community filter"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Top Stream Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter Chips by Content Format */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        {filterChips.map((chip) => {
          const isSelected = activeFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onFilterChange(chip.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? "bg-zinc-800 border-purple-500/50 text-purple-300"
                  : "bg-zinc-900/30 border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
