"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { useNofilterStore } from "@/lib/store";
import { Compass, Users, ArrowRight, Check } from "lucide-react";

export default function CommunitiesPage() {
  const router = useRouter();
  const { communities, posts, setSelectedCommunityId } = useNofilterStore();
  const [joined, setJoined] = useState<Record<string, boolean>>({
    comm_tech: true,
    comm_career: true,
  });

  const toggleJoin = (id: string) => {
    setJoined((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEnterCommunity = (id: string) => {
    setSelectedCommunityId(id);
    router.push("/feed");
  };

  return (
    <Shell>
      <div className="flex flex-col gap-6 p-4 sm:p-6">
        {/* Header */}
        <div className="pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-100">
            <Compass className="w-5 h-5 text-zinc-400" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Explore Focused Rooms
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Spaces dedicated to substantive topics. Zero irrelevant algorithmic distraction.
          </p>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communities.map((community) => {
            const isMember = !!joined[community.id];
            const communityPosts = posts.filter((p) => p.communityId === community.id);

            return (
              <div
                key={community.id}
                className="p-5 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/80 transition-all flex flex-col justify-between gap-4 group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      onClick={() => handleEnterCommunity(community.id)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono font-bold text-sm text-zinc-200">
                        {community.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">
                          {community.name}
                        </h2>
                        <span className="text-xs text-zinc-400 font-medium flex items-center gap-1 mt-0.5">
                          <Users className="w-3 h-3" />
                          {(community.memberCount / 1000).toFixed(1)}k members
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleJoin(community.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all border ${
                        isMember
                          ? "bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:text-white"
                          : "bg-zinc-100 border-white text-zinc-950 hover:bg-white"
                      }`}
                    >
                      {isMember ? (
                        <>
                          <Check className="w-3 h-3 text-zinc-300" />
                          <span>Joined</span>
                        </>
                      ) : (
                        <span>Join</span>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {community.description}
                  </p>
                </div>

                {/* Recent Snippet & Link to Feed */}
                <div className="flex flex-col gap-2 pt-2 border-t border-zinc-800/60">
                  {communityPosts.length > 0 && (
                    <div
                      onClick={() => handleEnterCommunity(community.id)}
                      className="p-2.5 rounded-xl bg-zinc-950/50 border border-zinc-800/60 text-xs cursor-pointer hover:border-zinc-700 transition-colors"
                    >
                      <span className="text-[10px] uppercase font-mono text-zinc-400 block mb-0.5">
                        Latest Discussion
                      </span>
                      <p className="text-zinc-300 font-medium line-clamp-1">
                        "{communityPosts[0].title || communityPosts[0].content}"
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => handleEnterCommunity(community.id)}
                    className="w-full py-2 px-3 rounded-xl bg-zinc-800/60 hover:bg-zinc-100 text-zinc-300 hover:text-zinc-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Room Discussions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
