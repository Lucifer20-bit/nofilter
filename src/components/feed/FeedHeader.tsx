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

  const filterChips: { id: PostFilter; label: string }[] = [
    { id: "ALL", label: "All Posts" },
    { id: "THOUGHT", label: "Thoughts" },
    { id: "QUESTION", label: "Questions" },
    { id: "CONFESSION", label: "Confessions" },
    { id: "DEBATE", label: "Debates" },
    { id: "ADVICE", label: "Advice" },
    { id: "STORY", label: "Stories" },
    { id: "ACHIEVEMENT", label: "Milestones" },
  ];

  return (
    <div className="sticky top-0 z-30 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 pt-3 pb-2 px-4 flex flex-col gap-2.5">
      {/* Search Input & Active Community Badge */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search discussions, questions, topics, #tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-zinc-900/70 border border-zinc-800 rounded-xl pl-9 pr-8 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
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
          <div className="flex items-center gap-1.5 bg-zinc-800 border border-zinc-700 text-zinc-200 px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap">
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
                  ? "bg-zinc-100 text-zinc-950 shadow-sm"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter Chips by Content Format (Zero Emojis, Clean Editorial Type) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        {filterChips.map((chip) => {
          const isSelected = activeFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onFilterChange(chip.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? "bg-zinc-800 border-zinc-500 text-zinc-100"
                  : "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
