"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, HelpCircle, Users, ExternalLink, ShieldAlert } from "lucide-react";
import { useNofilterStore } from "@/lib/store";

export const SidebarRight: React.FC = () => {
  const router = useRouter();
  const { posts, communities, voteDebate, setSelectedCommunityId } = useNofilterStore();

  const debatePosts = posts.filter((p) => p.postType === "DEBATE");
  const questionPosts = posts.filter((p) => p.postType === "QUESTION").slice(0, 3);

  const handleSelectCommunity = (id: string) => {
    setSelectedCommunityId(id);
    router.push("/feed");
  };

  return (
    <aside className="hidden xl:flex flex-col gap-6 w-80 h-screen sticky top-0 p-4 border-l border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md overflow-y-auto select-none">
      {/* Trending Debates Card */}
      {debatePosts.length > 0 && (
        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">
            <Flame className="w-4 h-4 text-zinc-400" />
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
                    <span className="text-zinc-200">Agree ({agreePct}%)</span>
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
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => voteDebate(debate.id, "AGREE")}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      debate.userVote === "AGREE"
                        ? "bg-zinc-800 border-zinc-500 text-white"
                        : "border-zinc-800 hover:bg-zinc-800/60 text-zinc-400"
                    }`}
                  >
                    Agree ({debate.agreeCount})
                  </button>
                  <button
                    onClick={() => voteDebate(debate.id, "DISAGREE")}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      debate.userVote === "DISAGREE"
                        ? "bg-zinc-800 border-zinc-500 text-white"
                        : "border-zinc-800 hover:bg-zinc-800/60 text-zinc-400"
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
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">
          <HelpCircle className="w-4 h-4 text-zinc-400" />
          <span>Needs Honest Advice</span>
        </div>

        <div className="flex flex-col gap-3">
          {questionPosts.map((q) => (
            <div
              key={q.id}
              onClick={() => handleSelectCommunity(q.communityId)}
              className="group p-2.5 rounded-xl hover:bg-zinc-800/40 transition-colors border border-transparent hover:border-zinc-800 cursor-pointer"
            >
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                {q.communityName}
              </span>
              <p className="text-xs font-medium text-zinc-200 group-hover:text-white mt-1.5 line-clamp-2">
                {q.title || q.content}
              </p>
              <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-1">
                <span>{q.commentsCount || 0} answers</span>
                <span>{q.reactions?.helpful || 0} helpful</span>
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
            className="text-[11px] text-zinc-300 hover:text-white font-medium flex items-center gap-1"
          >
            Explore <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {communities.slice(0, 4).map((c) => (
            <div
              key={c.id}
              onClick={() => handleSelectCommunity(c.id)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-800/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-mono font-bold text-zinc-300 border border-zinc-700">
                  {c.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-zinc-200 truncate hover:text-white">
                    {c.name}
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    {(c.memberCount / 1000).toFixed(1)}k members
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-zinc-400 hover:text-white">
                Filter
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy Footer */}
      <div className="p-3 text-[11px] text-zinc-400 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold text-zinc-200">Safe Authenticity:</span> Anonymous to
          peers, verified to platform. Zero tolerance for harassment or targeted doxxing.
        </p>
      </div>
    </aside>
  );
};
