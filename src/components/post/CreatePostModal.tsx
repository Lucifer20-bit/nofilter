"use client";

import React, { useState, useMemo } from "react";
import {
  X,
  Sparkles,
  Shield,
  EyeOff,
  UserCheck,
  AlertTriangle,
  HeartHandshake,
  Dice5,
} from "lucide-react";
import { useNofilterStore } from "@/lib/store";
import { checkPreFlightContent } from "@/lib/moderation";
import { PostItem } from "@/lib/mock-data";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PSEUDONYM_PREFIXES = [
  "Curious", "Midnight", "Silent", "Thoughtful", "Stoic", "Wandering",
  "Observant", "Vulnerable", "Bold", "Restless", "Deep", "Gentle"
];
const PSEUDONYM_NOUNS = [
  "Thinker", "Fox", "Cipher", "Philosopher", "Engineer", "Wanderer",
  "Scholar", "Owl", "Voice", "Seeker", "Builder", "Spectator"
];

function generateRandomAlias(): string {
  const prefix = PSEUDONYM_PREFIXES[Math.floor(Math.random() * PSEUDONYM_PREFIXES.length)];
  const noun = PSEUDONYM_NOUNS[Math.floor(Math.random() * PSEUDONYM_NOUNS.length)];
  const num = Math.floor(Math.random() * 90) + 10;
  return `${prefix}${noun}#${num}`;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const { user, communities, addPost } = useNofilterStore();

  const [postType, setPostType] = useState<PostItem["postType"]>("THOUGHT");
  const [identityMode, setIdentityMode] = useState<"PROFILE" | "ANONYMOUS" | "ALIAS">("PROFILE");
  const [aliasName, setAliasName] = useState("");
  const [communityId, setCommunityId] = useState(communities[0]?.id || "comm_tech");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Debate specific arguments
  const [agreeTitle, setAgreeTitle] = useState("");
  const [disagreeTitle, setDisagreeTitle] = useState("");

  // Tags
  const [tagInput, setTagInput] = useState("");

  const handleRollAlias = () => {
    setAliasName(generateRandomAlias());
  };

  // Live Pre-flight AI Mirror evaluation
  const aiFeedback = useMemo(() => {
    if (!content.trim()) return null;
    return checkPreFlightContent(content, postType);
  }, [content, postType]);

  const isCrisisTopic = useMemo(() => {
    const lower = content.toLowerCase();
    return (
      postType === "CONFESSION" ||
      lower.includes("depress") ||
      lower.includes("suicid") ||
      lower.includes("alone") ||
      lower.includes("paralyzed") ||
      lower.includes("hopeless")
    );
  }, [content, postType]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const selectedComm = communities.find((c) => c.id === communityId) || communities[0];
    const tags = tagInput
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);

    addPost({
      authorId: user.id,
      authorName: identityMode === "ANONYMOUS" ? "Anonymous" : user.displayName,
      authorUsername: identityMode === "ANONYMOUS" ? "anonymous" : user.username,
      authorAvatar: identityMode === "PROFILE" ? user.avatarUrl : undefined,
      authorReputation: user.reputationScore,
      communityId: selectedComm.id,
      communityName: selectedComm.name,
      communitySlug: selectedComm.slug,
      postType,
      identityMode,
      aliasName:
        identityMode === "ALIAS" ? aliasName || generateRandomAlias() : undefined,
      title: title.trim() || undefined,
      content: content.trim(),
      tags: tags.length > 0 ? tags : [selectedComm.slug],
      debateAgreeTitle:
        postType === "DEBATE" ? agreeTitle.trim() || "Agree with statement" : undefined,
      debateDisagreeTitle:
        postType === "DEBATE" ? disagreeTitle.trim() || "Disagree with statement" : undefined,
      userVote: null,
    });

    setTitle("");
    setContent("");
    setAgreeTitle("");
    setDisagreeTitle("");
    setTagInput("");
    onClose();
  };

  const types: { type: PostItem["postType"]; label: string; icon: string; desc: string }[] = [
    { type: "THOUGHT", label: "Thought", icon: "💭", desc: "Random unfiltered perspectives" },
    { type: "QUESTION", label: "Question", icon: "❓", desc: "Ask the community for solutions" },
    { type: "CONFESSION", label: "Confession", icon: "🤫", desc: "Anonymous raw truth" },
    { type: "DEBATE", label: "Debate", icon: "🔥", desc: "Agree vs Disagree showdown" },
    { type: "ADVICE", label: "Advice", icon: "💡", desc: "Share or request guidance" },
    { type: "STORY", label: "Story", icon: "🗣️", desc: "Long-form personal experience" },
    { type: "ACHIEVEMENT", label: "Milestone", icon: "🏆", desc: "Celebrate real progress" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-5 sm:p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
          <div>
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <span>Start Authentic Conversation</span>
            </h2>
            <p className="text-xs text-zinc-400">
              No performance. No vanity metrics. Just honest dialogue.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Post Type Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400">Content Format</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {types.map((t) => (
                <button
                  key={t.type}
                  type="button"
                  onClick={() => {
                    setPostType(t.type);
                    if (t.type === "CONFESSION") {
                      setIdentityMode("ANONYMOUS");
                    }
                  }}
                  className={`p-2.5 rounded-xl border text-left flex flex-col gap-0.5 transition-all ${
                    postType === t.type
                      ? "bg-purple-950/40 border-purple-500 text-purple-200 ring-1 ring-purple-500/50"
                      : "bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900 text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold text-xs">
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 line-clamp-1">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Identity Mode Selector */}
          <div
            className={`p-3 rounded-xl border flex flex-col gap-2.5 transition-all ${
              identityMode === "ANONYMOUS"
                ? "bg-rose-950/20 border-rose-800/60"
                : "bg-zinc-900/50 border-zinc-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Shield
                  className={`w-3.5 h-3.5 ${
                    identityMode === "ANONYMOUS" ? "text-rose-400" : "text-purple-400"
                  }`}
                />
                Post Identity Mode:
              </span>
              <span className="text-[11px] text-zinc-400">
                {identityMode === "ANONYMOUS"
                  ? "🔒 Identity completely shielded to public"
                  : identityMode === "ALIAS"
                  ? "🎭 Per-thread ephemeral pseudonym"
                  : "Public as @" + user.username}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setIdentityMode("PROFILE")}
                className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                  identityMode === "PROFILE"
                    ? "bg-purple-600 text-white border-purple-500"
                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                onClick={() => setIdentityMode("ANONYMOUS")}
                className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                  identityMode === "ANONYMOUS"
                    ? "bg-rose-700 text-white border-rose-600 shadow-md shadow-rose-950/50"
                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>🤫 Anonymous</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIdentityMode("ALIAS");
                  if (!aliasName) setAliasName(generateRandomAlias());
                }}
                className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                  identityMode === "ALIAS"
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>🎭 Alias</span>
              </button>
            </div>

            {identityMode === "ALIAS" && (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  placeholder="Choose alias (or roll random)..."
                  value={aliasName}
                  onChange={(e) => setAliasName(e.target.value)}
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleRollAlias}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1.5 transition-colors border border-zinc-700"
                >
                  <Dice5 className="w-3.5 h-3.5" />
                  <span>Roll</span>
                </button>
              </div>
            )}
          </div>

          {/* Community Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400">Target Community</label>
            <select
              value={communityId}
              onChange={(e) => setCommunityId(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
            >
              {communities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name} — {c.description}
                </option>
              ))}
            </select>
          </div>

          {/* Title (for Questions, Debates, Confessions, Stories, Achievements) */}
          {postType !== "THOUGHT" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-400">Headline / Topic</label>
              <input
                type="text"
                placeholder={
                  postType === "QUESTION"
                    ? "What do you want advice about?"
                    : postType === "DEBATE"
                    ? "State the proposition (e.g. Remote work vs in-office)"
                    : "Give your post a concise title..."
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          {/* Debate Specific Sides */}
          {postType === "DEBATE" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-xl bg-orange-950/20 border border-orange-900/30">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-emerald-400">Agree Position</label>
                <input
                  type="text"
                  placeholder="Supporting argument..."
                  value={agreeTitle}
                  onChange={(e) => setAgreeTitle(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:border-emerald-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-rose-400">Disagree Position</label>
                <input
                  type="text"
                  placeholder="Counter argument..."
                  value={disagreeTitle}
                  onChange={(e) => setDisagreeTitle(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:border-rose-500"
                />
              </div>
            </div>
          )}

          {/* Content Body */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-400">Body & Context</label>
              <span className="text-[11px] text-zinc-500 font-mono">
                {content.length} characters
              </span>
            </div>
            <textarea
              rows={4}
              placeholder="What's genuinely on your mind? Share without holding back..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500 resize-none leading-relaxed"
            />
          </div>

          {/* Compassionate Support Notice for Vulnerable / Mental Health Posts */}
          {isCrisisTopic && (
            <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/50 flex items-start gap-2.5 text-xs text-indigo-200">
              <HeartHandshake className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-indigo-100">You are safe here.</p>
                <p className="text-[11px] text-indigo-300/80 mt-0.5 leading-relaxed">
                  If you are experiencing severe crisis or loneliness, remember support is always
                  available. Text or call <strong>988</strong> (free, confidential 24/7 lifeline).
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Career, Startups, MentalHealth"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Constructive AI Mirror Banner */}
          {aiFeedback && aiFeedback.suggestion && (
            <div
              className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                !aiFeedback.isSafe
                  ? "bg-rose-950/40 border-rose-800/80 text-rose-200"
                  : aiFeedback.category === "PII"
                  ? "bg-amber-950/40 border-amber-800/80 text-amber-200"
                  : "bg-purple-950/40 border-purple-800/80 text-purple-200"
              }`}
            >
              {!aiFeedback.isSafe ? (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              ) : (
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-medium leading-relaxed">{aiFeedback.suggestion}</p>
                {!aiFeedback.isSafe && (
                  <p className="text-[11px] text-rose-300/80 mt-1 font-semibold">
                    You must resolve safety flags before posting.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-900">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!content.trim() || (aiFeedback !== null && !aiFeedback.isSafe)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 disabled:hover:from-purple-600 text-white shadow-lg shadow-purple-950/50 transition-all active:scale-98"
            >
              Publish Thought (+15 XP)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
