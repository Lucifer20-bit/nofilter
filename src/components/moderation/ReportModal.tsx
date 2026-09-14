"use client";

import React, { useState } from "react";
import { X, ShieldAlert, Check } from "lucide-react";
import { useNofilterStore } from "@/lib/store";

interface ReportModalProps {
  postId: string | null;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ postId, onClose }) => {
  const { posts, submitReport } = useNofilterStore();
  const [reason, setReason] = useState("Harassment & Bullying");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!postId) return null;
  const post = posts.find((p) => p.id === postId);

  const categories = [
    "Harassment & Bullying",
    "Spam & Malicious Links",
    "Violence or Threats",
    "Hate Speech",
    "Exposing Personal Data (Doxxing / PII)",
    "Severe Crisis / Mental Health",
    "Misinformation / Scam",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport(postId, reason, details);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-bold text-sm text-zinc-100">Report Content</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center gap-2 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-zinc-100">Report Submitted</h4>
            <p className="text-xs text-zinc-400">
              Our safety queue has logged this post. Thank you for protecting the community.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {post && (
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 line-clamp-2 italic">
                "{post.content}"
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Select Violation Category</label>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      reason === cat
                        ? "bg-rose-950/30 border-rose-600/50 text-rose-200"
                        : "bg-zinc-900/30 border-zinc-800/80 text-zinc-400 hover:bg-zinc-900"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      checked={reason === cat}
                      onChange={() => setReason(cat)}
                      className="text-rose-500 focus:ring-rose-500"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">Additional Context (Optional)</label>
              <textarea
                rows={2}
                placeholder="Help moderators understand what occurred..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-rose-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-900">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950 transition-all"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
