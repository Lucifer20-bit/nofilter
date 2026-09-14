"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquareQuote,
  Compass,
  ShieldCheck,
  Flame,
  Award,
  PlusCircle,
  EyeOff,
  UserCheck,
  Globe,
} from "lucide-react";
import { useNofilterStore } from "@/lib/store";

interface SidebarLeftProps {
  onOpenCreate: () => void;
}

export const SidebarLeft: React.FC<SidebarLeftProps> = ({ onOpenCreate }) => {
  const pathname = usePathname();
  const { user } = useNofilterStore();

  const navItems = [
    { label: "Discussions", href: "/feed", icon: MessageSquareQuote },
    { label: "Communities", href: "/communities", icon: Compass },
    { label: "Safety & Audit", href: "/moderation", icon: ShieldCheck },
    { label: "Manifesto", href: "/", icon: Globe },
  ];

  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 xl:w-72 h-screen sticky top-0 p-4 border-r border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md select-none">
      <div className="flex flex-col gap-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 px-2 py-1 group">
          <div className="h-10 w-10 rounded-xl bg-zinc-100 text-zinc-950 flex items-center justify-center font-mono font-black text-lg tracking-tighter">
            NF
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              NOFILTER
            </h1>
            <p className="text-[11px] text-zinc-400 font-normal">Say what you really think.</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? "bg-zinc-800 text-zinc-100 border border-zinc-700"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-zinc-100" : "text-zinc-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Create Post Button */}
        <button
          onClick={onOpenCreate}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-zinc-100 hover:bg-white text-zinc-950 transition-all active:scale-[0.98]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Discussion</span>
        </button>

        {/* Identity & Reputation Preview Card */}
        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Reputation
            </span>
            <span className="text-xs font-bold text-zinc-200 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-zinc-400" />
              Level {user.level}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Trust Score</span>
            <span className="font-mono font-bold text-zinc-100">{user.reputationScore}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-zinc-300 rounded-full"
              style={{ width: `${user.reputationScore}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1 text-zinc-300">
              <Flame className="w-3.5 h-3.5 text-zinc-400" /> {user.streakDays}d Streak
            </span>
            <span>{user.helpfulAnswersCount} Helpful answers</span>
          </div>
        </div>
      </div>

      {/* User Mini Profile */}
      <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={user.avatarUrl}
            alt={user.displayName}
            className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-700"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-200 truncate">{user.displayName}</p>
            <p className="text-xs text-zinc-500 truncate">@{user.username}</p>
          </div>
        </div>

        <div
          title="Identity Status: Public profile active"
          className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <UserCheck className="w-4 h-4 text-zinc-300" />
        </div>
      </div>
    </aside>
  );
};
