"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquareQuote, Compass, Plus, ShieldCheck, User } from "lucide-react";

interface MobileNavProps {
  onOpenCreate: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenCreate }) => {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800/80 px-4 py-2 flex items-center justify-around select-none">
      <Link
        href="/"
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
          pathname === "/" ? "text-purple-400" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <MessageSquareQuote className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Feed</span>
      </Link>

      <Link
        href="/communities"
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
          pathname === "/communities" ? "text-purple-400" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <Compass className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Explore</span>
      </Link>

      {/* Center Action Button */}
      <button
        onClick={onOpenCreate}
        aria-label="Create Post"
        className="w-12 h-12 -mt-5 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-900/60 active:scale-95 transition-transform ring-4 ring-zinc-950"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      <Link
        href="/moderation"
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
          pathname === "/moderation" ? "text-purple-400" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <ShieldCheck className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Safety</span>
      </Link>

      <div className="flex flex-col items-center gap-1 py-1 px-3 text-zinc-500">
        <User className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Profile</span>
      </div>
    </nav>
  );
};
