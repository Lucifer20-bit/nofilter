"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Lock,
  UserX,
  FileText,
  Search,
} from "lucide-react";
import { useNofilterStore } from "@/lib/store";

export const AdminDashboard: React.FC = () => {
  const { reports, resolveReport } = useNofilterStore();
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "RESOLVED">("PENDING");

  const filteredReports = reports.filter((r) => {
    if (filter === "ALL") return true;
    return r.status === filter;
  });

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-zinc-100 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <span>Trust & Safety Audit Dashboard</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Auditing anonymous and public contributions. Protecting conversation authenticity.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setFilter("PENDING")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === "PENDING"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Pending ({reports.filter((r) => r.status === "PENDING").length})
          </button>
          <button
            onClick={() => setFilter("RESOLVED")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === "RESOLVED"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Resolved
          </button>
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === "ALL"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            All Reports
          </button>
        </div>
      </div>

      {/* Safety Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col gap-1">
          <span className="text-xs font-semibold text-zinc-400">Platform Safety Health</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">99.2%</span>
            <span className="text-xs text-zinc-500">safe discussions</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col gap-1">
          <span className="text-xs font-semibold text-zinc-400">Pre-Flight AI Blocks</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-purple-400">142</span>
            <span className="text-xs text-zinc-500">hostility nudges caught</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col gap-1">
          <span className="text-xs font-semibold text-zinc-400">Active Anonymity Ratio</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400">38%</span>
            <span className="text-xs text-zinc-500">posts protected</span>
          </div>
        </div>
      </div>

      {/* Moderation Queue */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
          Flagged Incident Queue
        </h2>

        {filteredReports.length === 0 ? (
          <div className="p-8 rounded-2xl bg-zinc-900/20 border border-zinc-800/80 text-center flex flex-col items-center justify-center gap-2">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
            <p className="text-sm font-semibold text-zinc-200">Moderation Queue is Clear</p>
            <p className="text-xs text-zinc-500">No pending safety violations to review.</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800 flex flex-col gap-3 transition-all"
            >
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {report.reason}
                  </span>

                  <span className="text-xs text-zinc-400 font-mono">
                    Post ID: #{report.postId.replace("post_", "")}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-500">Reported by @{report.reporterUsername}</span>
                  <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                    report.status === "PENDING"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-emerald-500/20 text-emerald-300"
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs sm:text-sm text-zinc-300">
                <span className="font-semibold text-zinc-400 block mb-1">
                  Author Identity: {report.authorIdentity} (Auditable to platform)
                </span>
                <p className="italic font-normal">"{report.postSnippet}"</p>
              </div>

              {report.details && (
                <p className="text-xs text-zinc-400 bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/60">
                  <span className="font-semibold text-zinc-300">Reporter Note:</span> {report.details}
                </p>
              )}

              {/* Action Buttons */}
              {report.status === "PENDING" && (
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/60">
                  <button
                    onClick={() => resolveReport(report.id, "DISMISS")}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                  >
                    Dismiss (Safe)
                  </button>
                  <button
                    onClick={() => resolveReport(report.id, "REMOVE")}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shadow-md shadow-rose-950 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Post</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
