"use client";

import React, { useState } from "react";
import { Send, ThumbsUp, CornerDownRight } from "lucide-react";
import { CommentItem } from "@/lib/mock-data";
import { useNofilterStore } from "@/lib/store";
import { formatTimeAgo } from "@/lib/utils";

interface ThreadedCommentsProps {
  postId: string;
  comments: CommentItem[];
}

export const ThreadedComments: React.FC<ThreadedCommentsProps> = ({ postId, comments }) => {
  const { addComment } = useNofilterStore();
  const [content, setContent] = useState("");
  const [identityMode, setIdentityMode] = useState<"PROFILE" | "ANONYMOUS" | "ALIAS">("PROFILE");
  const [aliasName, setAliasName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addComment(
      postId,
      content.trim(),
      identityMode,
      identityMode === "ALIAS" ? aliasName || "CuriousThinker" : undefined
    );

    setContent("");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Existing Comments List */}
      <div className="flex flex-col gap-3">
        {comments.length === 0 ? (
          <p className="text-xs text-zinc-500 py-2 italic text-center">
            No perspectives shared yet. Be the first to start the conversation!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/60 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {comment.identityMode === "ANONYMOUS" ? (
                    <span className="w-5 h-5 rounded-full bg-rose-950/60 border border-rose-800/40 text-rose-300 text-[10px] flex items-center justify-center">
                      🤫
                    </span>
                  ) : comment.identityMode === "ALIAS" ? (
                    <span className="w-5 h-5 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-[10px] flex items-center justify-center">
                      🎭
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-[10px] flex items-center justify-center font-bold">
                      {comment.authorName.charAt(0)}
                    </span>
                  )}

                  <span className="font-semibold text-zinc-200">
                    {comment.identityMode === "ANONYMOUS"
                      ? "Anonymous"
                      : comment.identityMode === "ALIAS"
                      ? comment.aliasName || "CuriousThinker"
                      : comment.authorName}
                  </span>

                  <span className="text-[11px] text-zinc-500">
                    {formatTimeAgo(comment.createdAt)}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                  <ThumbsUp className="w-3 h-3 text-amber-400/80" />
                  <span>{comment.helpfulCount}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 pl-7 leading-relaxed">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Write Comment Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 pt-2 border-t border-zinc-900">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Add to discussion:</span>
          
          {/* Identity Mode Pills */}
          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            <button
              type="button"
              onClick={() => setIdentityMode("PROFILE")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                identityMode === "PROFILE" ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              My Name
            </button>
            <button
              type="button"
              onClick={() => setIdentityMode("ANONYMOUS")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                identityMode === "ANONYMOUS" ? "bg-rose-700 text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              🤫 Anonymous
            </button>
            <button
              type="button"
              onClick={() => setIdentityMode("ALIAS")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                identityMode === "ALIAS" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              🎭 Alias
            </button>
          </div>
        </div>

        {identityMode === "ALIAS" && (
          <input
            type="text"
            placeholder="Enter temporary handle (e.g. MidnightPhilosopher)..."
            value={aliasName}
            onChange={(e) => setAliasName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500"
          />
        )}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Share an authentic perspective or advice..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={!content.trim()}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Reply</span>
          </button>
        </div>
      </form>
    </div>
  );
};
