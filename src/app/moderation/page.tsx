"use client";

import React from "react";
import { Shell } from "@/components/layout/Shell";
import { AdminDashboard } from "@/components/moderation/AdminDashboard";

export default function ModerationPage() {
  return (
    <Shell>
      <AdminDashboard />
    </Shell>
  );
}
