# NOFILTER — “Say what you really think.”

> A social discussion platform built around authentic conversations rather than popularity.

---

## 💡 Core Philosophy

Traditional social networks measure vanity:
* Followers
* Surface-level Likes
* Curated perfection and performance

**NOFILTER flips that.** Your contribution matters more than your follower count.
* **7 Content Types:** `💭 Thought`, `❓ Question`, `🗣️ Story`, `🤫 Confession`, `💡 Advice`, `🔥 Debate`, `🏆 Achievement`.
* **Anonymous Mode with Accountability:** Publicly anonymous, internally verified and audited by the platform for safety and anti-abuse.
* **Meaningful Reactions:** `💡 Helpful`, `🔥 Insightful`, `👏 Well Said`, `🤔 Made Me Think`.
* **Contextual Reputation:** Level, Streak, and Trust Score earned through positive community contributions.
* **Pre-Flight Constructive AI Mirror:** Sub-100ms tone and PII checks as you type to prevent doxxing and combative flame wars before publication.

---

## 🛠️ Architecture & Tech Stack

* **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons.
* **Database:** Serverless PostgreSQL via **Neon** with connection pooling (`DATABASE_URL`) & direct migrations (`DIRECT_URL`).
* **ORM:** Prisma ORM.
* **Layout:** Hybrid Responsive — Native-feeling mobile bottom navigation bar + Desktop 3-column command layout.
* **Safety & Moderation:** Pre-flight client analysis + Backend reporting queue (`/moderation`).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment & Database
Copy `.env.example` to `.env` and fill in your Neon Serverless PostgreSQL connection string:
```bash
cp .env.example .env
```

To sync your Prisma schema to Neon:
```bash
npx prisma db push
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access NOFILTER.

---

## 📱 Navigation & Views

* `/` — Main Feed with live tabs (`For You`, `Trending`, `Fresh`, `Debates`, `Questions`) and content filter chips.
* `/communities` — Directory of focused communities (`Technology`, `Career & Work`, `Life & Solitude`, etc.).
* `/moderation` — Trust & Safety dashboard with live flagged incident review queue.
