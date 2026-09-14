"use client";

import React from "react";
import Link from "next/link";
import { Flame, HelpCircle, Users, ExternalLink, ShieldAlert } from "lucide-react";
import { useNofilterStore } from "@/lib/store";

export const SidebarRight: React.FC = () => {
  const { posts, communities, voteDebate } = useNofilterStore();

  const debatePosts = posts.filter((p) => p.postType === "DEBATE");
  const questionPosts = posts.filter((p) => p.postType === "QUESTION").slice(0, 3);

  return (
    <aside className="hidden xl:flex flex-col gap-6 w-80 h-screen sticky top-0 p-4 border-l border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md overflow-y-auto">
      {/* Trending Debates Card */}
      {debatePosts.length > 0 && (
        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
            <Flame className="w-4 h-4" />
            <span>Featured Debate</span>
          </div>

          {debatePosts.slice(0, 1).map((debate) => {
            const totalVotes = debate.agreeCount + debate.disagreeCount;
            const agreePct = totalVotes > 0 ? Math.round((debate.agreeCount / totalVotes) * 100) : 50;
            const disagreePct = 100 - agreePct;

            return (
              <div key={debate.id} className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-zinc-100 leading-snug">
                  "{debate.title}"
                </p>

                {/* Live Debate Tug of War Bar */}
                <div className="w-full">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-emerald-400">Agree ({agreePct}%)</span>
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
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => voteDebate(debate.id, "AGREE")}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      debate.userVote === "AGREE"
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                        : "border-zinc-800 hover:bg-zinc-800/60 text-zinc-300"
                    }`}
                  >
                    Agree ({debate.agreeCount})
                  </button>
                  <button
                    onClick={() => voteDebate(debate.id, "DISAGREE")}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      debate.userVote === "DISAGREE"
                        ? "bg-rose-500/20 border-rose-500 text-rose-300"
                        : "border-zinc-800 hover:bg-zinc-800/60 text-zinc-300"
                    }`}
                  >
                    Disagree ({debate.disagreeCount})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Questions Needing Answers */}
      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
          <HelpCircle className="w-4 h-4" />
          <span>Needs Honest Advice</span>
        </div>

        <div className="flex flex-col gap-3">
          {questionPosts.map((q) => (
            <div
              key={q.id}
              className="group p-2.5 rounded-xl hover:bg-zinc-800/40 transition-colors border border-transparent hover:border-zinc-800"
            >
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {q.communityName}
              </span>
              <p className="text-xs font-medium text-zinc-200 group-hover:text-purple-300 mt-1.5 line-clamp-2">
                {q.title || q.content}
              </p>
              <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-1">
                <span>{q.commentsCount} answers</span>
                <span>💡 {q.reactions.helpful} helpful</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Communities */}
      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <Users className="w-4 h-4" />
            <span>Communities</span>
          </div>
          <Link
            href="/communities"
            className="text-[11px] text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
          >
            Explore <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {communities.slice(0, 4).map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-800/30 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm">
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-zinc-200 truncate">{c.name}</p>
                  <p className="text-[10px] text-zinc-500">
                    {(c.memberCount / 1000).toFixed(1)}k members
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-purple-400 hover:underline cursor-pointer">
                Join
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Core Security & Authenticity Philosophy Footer */}
      <div className="p-3 text-[11px] text-zinc-400 rounded-xl bg-purple-950/20 border border-purple-900/30 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold text-zinc-300">Safe Authenticity:</span> Anonymous to
          peers, verified to platform. Zero tolerance for harassment or targeted doxxing.
        </p>
      </div>
    </aside>
  );
};
