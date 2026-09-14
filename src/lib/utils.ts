import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(dateString: string | Date): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function getPostTypeColor(type: string): { bg: string; text: string; border: string; icon: string } {
  switch (type.toUpperCase()) {
    case "THOUGHT":
      return { bg: "bg-purple-950/40", text: "text-purple-300", border: "border-purple-800/40", icon: "💭" };
    case "QUESTION":
      return { bg: "bg-blue-950/40", text: "text-blue-300", border: "border-blue-800/40", icon: "❓" };
    case "STORY":
      return { bg: "bg-emerald-950/40", text: "text-emerald-300", border: "border-emerald-800/40", icon: "🗣️" };
    case "CONFESSION":
      return { bg: "bg-rose-950/40", text: "text-rose-300", border: "border-rose-800/40", icon: "🤫" };
    case "ADVICE":
      return { bg: "bg-amber-950/40", text: "text-amber-300", border: "border-amber-800/40", icon: "💡" };
    case "DEBATE":
      return { bg: "bg-orange-950/40", text: "text-orange-300", border: "border-orange-800/40", icon: "🔥" };
    case "ACHIEVEMENT":
      return { bg: "bg-yellow-950/40", text: "text-yellow-300", border: "border-yellow-800/40", icon: "🏆" };
    default:
      return { bg: "bg-zinc-900", text: "text-zinc-300", border: "border-zinc-800", icon: "📌" };
  }
}
