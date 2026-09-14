"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  MessageSquare,
  Lock,
  Compass,
  CheckCircle2,
  Quote,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 selection:bg-zinc-800 selection:text-zinc-100 font-sans">
      {/* Top Editorial Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-950 flex items-center justify-center font-mono font-black text-sm tracking-tighter">
              NF
            </div>
            <span className="font-bold text-base tracking-tight text-white group-hover:text-zinc-300 transition-colors">
              NOFILTER
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
            <a href="#problem" className="hover:text-zinc-100 transition-colors">
              The Reality
            </a>
            <a href="#formats" className="hover:text-zinc-100 transition-colors">
              Four Formats
            </a>
            <a href="#anonymity" className="hover:text-zinc-100 transition-colors">
              Privacy Architecture
            </a>
            <Link href="/communities" className="hover:text-zinc-100 transition-colors">
              Communities
            </Link>
            <Link href="/moderation" className="hover:text-zinc-100 transition-colors">
              Safety & Standards
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/feed"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-white text-zinc-950 transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <span>Enter Discussions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section: The Soul of the Product */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 border-b border-zinc-800/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span>A social network built around conversation, not performance.</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              The internet gave everyone a stage.
              <br />
              <span className="text-zinc-500">It forgot to give us a room.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
              Traditional social media forces you to curate a perfect life before you are allowed to
              speak. NOFILTER is built for what happens when the camera is turned off: the uncertainty,
              the career doubts, the honest questions, and the truths nobody admits in public.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/feed"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-zinc-100 hover:bg-white text-zinc-950 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>Read Real Conversations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#problem"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 flex items-center justify-center transition-colors"
              >
                <span>Why NOFILTER Exists</span>
              </a>
            </div>
          </div>

          {/* Picture Grid: Authentic Human Moments */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-16 sm:mt-20">
            <div className="sm:col-span-6 lg:col-span-5 relative rounded-2xl overflow-hidden border border-zinc-800 group h-80 sm:h-96">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1000&auto=format&fit=crop&q=80"
                alt="A person in deep personal contemplation"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-400">
                  Late Night • Solitude
                </span>
                <p className="text-sm font-medium text-zinc-100 mt-1">
                  "I am pretending I have my career figured out, but I am guessing every single day."
                </p>
              </div>
            </div>

            <div className="sm:col-span-6 lg:col-span-4 relative rounded-2xl overflow-hidden border border-zinc-800 group h-80 sm:h-96">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80"
                alt="Students studying and talking candidly"
                className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-400">
                  Real Guidance • University
                </span>
                <p className="text-sm font-medium text-zinc-100 mt-1">
                  "I failed my first admission exam. Here is what nobody tells you about recovering."
                </p>
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-3 relative rounded-2xl overflow-hidden border border-zinc-800 group h-80 sm:h-96">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                alt="Portrait of an authentic young person"
                className="w-full h-full object-cover grayscale contrast-115 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-400">
                  Unfiltered • No Filters
                </span>
                <p className="text-sm font-medium text-zinc-100 mt-1">
                  Your thoughts matter more than your follower count.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Metrics Bar */}
      <section className="border-b border-zinc-800/80 bg-zinc-950/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-bold text-white">0</p>
              <p className="text-xs text-zinc-400 mt-1 font-medium">Follower Counts Displayed</p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-bold text-white">100%</p>
              <p className="text-xs text-zinc-400 mt-1 font-medium">Contribution-Weighted Reputation</p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-bold text-white">3 Modes</p>
              <p className="text-xs text-zinc-400 mt-1 font-medium">Real Identity, Anonymous, Alias</p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-bold text-white">0</p>
              <p className="text-xs text-zinc-400 mt-1 font-medium">Superficial Likes (Helpful Only)</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem: Performance vs. Truth */}
      <section id="problem" className="py-20 sm:py-28 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              The Fundamental Problem
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Social networks became places of performance instead of presence.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
              Imagine a 20-year-old student with hundreds of followers on Instagram. They might be
              drowning in financial uncertainty, career confusion, and relationship doubts. But they
              cannot say it out loud, because modern platforms punish vulnerability and reward
              unrealistic perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Performance Column */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-400">
                  <span>Traditional Social Networks</span>
                  <span>The Performance</span>
                </div>

                <div className="relative rounded-xl overflow-hidden h-56 border border-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80"
                    alt="Glossy nightlife party performance"
                    className="w-full h-full object-cover filter contrast-125 grayscale"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center">
                    <p className="text-xs font-mono text-zinc-200">
                      Curated vacations • New phones • Endless selfies • Manufactured status
                    </p>
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5 text-xs text-zinc-400 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    Reach is tied to physical appearance and follower vanity.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    Failure and confusion are hidden out of fear of social judgment.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    Outrage algorithms prioritize sensational arguments over insight.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-500 font-mono">
                Formula: Person → Followers → Likes → Fleeting Popularity
              </div>
            </div>

            {/* The NOFILTER Column */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-700/80 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-200">
                  <span>NOFILTER Architecture</span>
                  <span>The Real Truth</span>
                </div>

                <div className="relative rounded-xl overflow-hidden h-56 border border-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80"
                    alt="Authentic group of people talking honestly"
                    className="w-full h-full object-cover filter contrast-115 grayscale"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6 text-center">
                    <p className="text-xs font-mono text-zinc-100">
                      Real problems • Career honesty • True questions • Knowledge exchange
                    </p>
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5 text-xs text-zinc-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-zinc-100 shrink-0" />
                    Reach is determined by the quality of your thoughts and advice.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-zinc-100 shrink-0" />
                    Vulnerability is protected with robust anonymous & alias modes.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-zinc-100 shrink-0" />
                    Reactions measure substance: Helpful, Insightful, Well Said, Thought-Provoking.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-mono">
                Formula: Thought → Conversation → Community → Earned Trust
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Content Formats */}
      <section id="formats" className="py-20 sm:py-28 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Thought Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Structured for conversation, not random noise.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
              When you press compose, NOFILTER asks what kind of contribution you want to make. Each
              format carries its own visual identity and behavioral expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Format 1: Confession */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between gap-5 group">
              <div className="flex flex-col gap-3">
                <div className="h-44 rounded-xl overflow-hidden relative border border-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=600&auto=format&fit=crop&q=80"
                    alt="Person sitting by window at night"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/80 text-[10px] font-mono text-zinc-200 border border-zinc-700">
                    Format 01
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">The Confession</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Post anonymously about the doubts, fears, and dilemmas you could never share on an
                  identified profile. The community offers perspective, not judgment.
                </p>
              </div>

              <span className="text-[11px] font-mono text-zinc-500">Identity: Anonymous Protected</span>
            </div>

            {/* Format 2: The Question & Advice */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between gap-5 group">
              <div className="flex flex-col gap-3">
                <div className="h-44 rounded-xl overflow-hidden relative border border-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80"
                    alt="People collaborating around a screen"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/80 text-[10px] font-mono text-zinc-200 border border-zinc-700">
                    Format 02
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">The Inquiry & Advice</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Ask specific career, technical, or life questions. The best answers rise to the
                  top through helpfulness votes and earn verifiable reputation.
                </p>
              </div>

              <span className="text-[11px] font-mono text-zinc-500">Identity: Profile or Alias</span>
            </div>

            {/* Format 3: The Structured Debate */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between gap-5 group">
              <div className="flex flex-col gap-3">
                <div className="h-44 rounded-xl overflow-hidden relative border border-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
                    alt="Two professionals engaged in serious discussion"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/80 text-[10px] font-mono text-zinc-200 border border-zinc-700">
                    Format 03
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">The Structured Debate</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Clear propositions with equal visual weight for Agree and Disagree stances.
                  Features the Delta award to honor arguments that change minds.
                </p>
              </div>

              <span className="text-[11px] font-mono text-zinc-500">Reward: Delta Persuasion Points</span>
            </div>

            {/* Format 4: The Earned Milestone */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between gap-5 group">
              <div className="flex flex-col gap-3">
                <div className="h-44 rounded-xl overflow-hidden relative border border-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop&q=80"
                    alt="Team celebrating an authentic milestone"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/80 text-[10px] font-mono text-zinc-200 border border-zinc-700">
                    Format 04
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">The Milestone</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Celebrate real progress: shipping your first project, passing a grueling exam, or
                  learning a difficult skill. Keeps the community constructive.
                </p>
              </div>

              <span className="text-[11px] font-mono text-zinc-500">Community: Mutual Respect</span>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Anonymity Philosophy */}
      <section id="anonymity" className="py-20 sm:py-28 border-b border-zinc-800/80 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Privacy Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Anonymous to the room.
                <br />
                Accountable to the platform.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Previous anonymous platforms failed because unchecked anonymity creates toxic rot,
                harassment, and bad actors. NOFILTER enforces a strict cryptographic distinction:
              </p>

              <div className="flex flex-col gap-3">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-zinc-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">
                      Public Shielding
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Other users and search engines never see your real user ID, email, or profile
                      when you choose Anonymous or Alias mode. Timestamps are fuzzily relative.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-zinc-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">
                      Platform Accountability
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      If a bad actor attempts to threaten, doxx, or harass others, platform safety
                      officers can inspect backend audit records and permanently ban the device.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-zinc-800 h-96 lg:h-[460px]">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80"
                alt="Atmospheric architecture representing security and trust"
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                <Quote className="w-8 h-8 text-zinc-500 mb-2" />
                <p className="text-base sm:text-lg font-medium text-zinc-100 leading-snug">
                  "People shouldn't have to build a perfect online identity before they are allowed to
                  have an honest conversation."
                </p>
                <span className="text-xs text-zinc-400 font-mono mt-2">
                  — The NOFILTER Philosophy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voices from the Community */}
      <section className="py-20 sm:py-28 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Community Voices
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Conversations that changed how people think.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between gap-6">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                "I was paralyzed by imposter syndrome at my first software role. I wrote a confession
                on NOFILTER late at night. Three senior engineers responded not with platitudes, but
                with the exact systems they used to overcome panic. It kept me in the industry."
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-700"
                />
                <div>
                  <p className="text-xs font-bold text-zinc-100">Anonymous Contributor</p>
                  <p className="text-[10px] text-zinc-500 font-mono">Technology Room • Level 11</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between gap-6">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                "On LinkedIn, every discussion about degrees vs self-study is corporate grandstanding.
                Here, hiring managers admitted what actually gets past applicant filters and what is
                wasted effort. The intellectual honesty is unprecedented."
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-700"
                />
                <div>
                  <p className="text-xs font-bold text-zinc-100">Elena Rostova</p>
                  <p className="text-[10px] text-zinc-500 font-mono">Engineering Lead • Level 18</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between gap-6">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                "The fact that someone can change their mind in a debate and award a Delta completely
                shifts the tone. People actually listen instead of screaming past each other."
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-700"
                />
                <div>
                  <p className="text-xs font-bold text-zinc-100">Samir Chen</p>
                  <p className="text-[10px] text-zinc-500 font-mono">Life & Philosophy • Level 14</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            No Performance. Real Conversations.
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Ready to say what you really think?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Join thousands of students, developers, and thinkers having honest conversations across
            technology, career, and life.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <Link
              href="/feed"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold bg-zinc-100 hover:bg-white text-zinc-950 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>Launch NOFILTER App</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/communities"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 flex items-center justify-center transition-colors"
            >
              <span>Explore Rooms</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 bg-zinc-950 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-zinc-300">NF</span>
            <span>© 2026 NOFILTER. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <Link href="/feed" className="hover:text-zinc-200 transition-colors">
              Discussions
            </Link>
            <Link href="/communities" className="hover:text-zinc-200 transition-colors">
              Rooms
            </Link>
            <Link href="/moderation" className="hover:text-zinc-200 transition-colors">
              Trust & Safety
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
