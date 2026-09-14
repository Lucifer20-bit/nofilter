"use client";

import React, { useState } from "react";
import { SidebarLeft } from "./SidebarLeft";
import { SidebarRight } from "./SidebarRight";
import { MobileNav } from "./MobileNav";
import { CreatePostModal } from "../post/CreatePostModal";
import { ReportModal } from "../moderation/ReportModal";

interface ShellProps {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [reportingPostId, setReportingPostId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex justify-center selection:bg-purple-900 selection:text-white">
      <div className="w-full max-w-7xl flex relative">
        {/* Left Desktop Sidebar */}
        <SidebarLeft onOpenCreate={() => setIsCreateOpen(true)} />

        {/* Center Main Viewport */}
        <main className="flex-1 min-w-0 pb-20 lg:pb-8 border-r border-zinc-800/80">
          {children}
        </main>

        {/* Right Desktop Sidebar */}
        <SidebarRight />

        {/* Mobile Sticky Bottom App Bar */}
        <MobileNav onOpenCreate={() => setIsCreateOpen(true)} />

        {/* Global Modals */}
        <CreatePostModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />

        <ReportModal
          postId={reportingPostId}
          onClose={() => setReportingPostId(null)}
        />
      </div>
    </div>
  );
};
