import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOFILTER — Say What You Really Think",
  description: "A social discussion platform built around authentic conversations rather than popularity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-purple-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
