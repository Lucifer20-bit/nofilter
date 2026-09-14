import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Default Current User
  const alex = await prisma.user.upsert({
    where: { username: "alex_dev" },
    update: {},
    create: {
      id: "usr_current_alex",
      email: "alex@nofilter.local",
      username: "alex_dev",
      displayName: "Alex Rivera",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: "Building things, curious about cybersecurity and system design. Here for honest feedback.",
      reputationScore: 92,
      level: 14,
      xp: 1420,
      streakDays: 23,
    },
  });

  // Secondary community members
  const marcus = await prisma.user.upsert({
    where: { username: "mvance" },
    update: {},
    create: {
      id: "usr_marcus",
      email: "marcus@nofilter.local",
      username: "mvance",
      displayName: "Marcus Vance",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      reputationScore: 88,
      level: 12,
    },
  });

  const elena = await prisma.user.upsert({
    where: { username: "erostova" },
    update: {},
    create: {
      id: "usr_elena",
      email: "elena@nofilter.local",
      username: "erostova",
      displayName: "Elena Rostova",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      reputationScore: 96,
      level: 18,
    },
  });

  const samir = await prisma.user.upsert({
    where: { username: "samirchen" },
    update: {},
    create: {
      id: "usr_dev_sam",
      email: "samir@nofilter.local",
      username: "samirchen",
      displayName: "Samir Chen",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      reputationScore: 95,
      level: 15,
    },
  });

  // 2. Create Communities
  const tech = await prisma.community.upsert({
    where: { slug: "technology" },
    update: {},
    create: {
      id: "comm_tech",
      name: "Technology",
      slug: "technology",
      description: "Deep tech discussions, coding dilemmas, architectures, and AI realities.",
      icon: "TC",
      memberCount: 24500,
    },
  });

  const career = await prisma.community.upsert({
    where: { slug: "career" },
    update: {},
    create: {
      id: "comm_career",
      name: "Career & Work",
      slug: "career",
      description: "Honest career transitions, salary realities, job hunts, and burnout advice.",
      icon: "CW",
      memberCount: 18900,
    },
  });

  const life = await prisma.community.upsert({
    where: { slug: "life" },
    update: {},
    create: {
      id: "comm_life",
      name: "Life & Solitude",
      slug: "life",
      description: "What nobody tells you about growing up, loneliness, and finding peace.",
      icon: "LS",
      memberCount: 31200,
    },
  });

  const uni = await prisma.community.upsert({
    where: { slug: "university" },
    update: {},
    create: {
      id: "comm_uni",
      name: "University & School",
      slug: "university",
      description: "Exams, degrees vs practical skills, admissions, and surviving campus life.",
      icon: "US",
      memberCount: 15400,
    },
  });

  const money = await prisma.community.upsert({
    where: { slug: "money" },
    update: {},
    create: {
      id: "comm_money",
      name: "Money & Finance",
      slug: "money",
      description: "Real financial mistakes, saving on a student budget, and investing without hype.",
      icon: "MF",
      memberCount: 12800,
    },
  });

  // 3. Create Verified Initial Posts
  const p1 = await prisma.post.upsert({
    where: { id: "post_1" },
    update: {},
    create: {
      id: "post_1",
      authorId: marcus.id,
      communityId: tech.id,
      postType: "DEBATE",
      identityMode: "PROFILE",
      title: "University degrees are becoming less important for tech careers.",
      content: "With open source, accessible cloud tools, and AI tutors, I've seen self-taught developers out-architect university grads with 4-year CS degrees. But traditional institutions still claim accreditation and theory matter more. What is your actual experience on hiring teams?",
      tags: "TechCareers,University,SoftwareEngineering",
      debateAgreeTitle: "Portfolio & real grit matter 10x more than accredited theory",
      debateDisagreeTitle: "Deep algorithmic rigor & institutional networking are irreplaceable",
      agreeCount: 184,
      disagreeCount: 92,
      helpfulCount: 48,
      insightfulCount: 76,
      wellSaidCount: 34,
      madeMeThinkCount: 91,
      commentCount: 2,
    },
  });

  // Add comments to p1
  await prisma.comment.upsert({
    where: { id: "c_1" },
    update: {},
    create: {
      id: "c_1",
      postId: p1.id,
      authorId: elena.id,
      identityMode: "PROFILE",
      content: "I manage an engineering team of 14 at a series-B SaaS. The degree gets you past the automated ATS filter on junior roles, but in technical interviews, degree holders without side projects usually fail to debug real async race conditions.",
      helpfulCount: 29,
    },
  });

  await prisma.comment.upsert({
    where: { id: "c_2" },
    update: {},
    create: {
      id: "c_2",
      postId: p1.id,
      authorId: alex.id,
      identityMode: "ANONYMOUS",
      content: "In specialized fields like cryptography, compilers, or distributed systems infrastructure, a solid CS foundation is night and day compared to a 12-week bootcamp graduate.",
      helpfulCount: 15,
    },
  });

  const p2 = await prisma.post.upsert({
    where: { id: "post_2" },
    update: {},
    create: {
      id: "post_2",
      authorId: alex.id,
      communityId: career.id,
      postType: "CONFESSION",
      identityMode: "ANONYMOUS",
      title: "I've been pretending that I know what I'm doing with my career, but honestly I have no idea.",
      content: "I am 24. Everyone in my family talks about me like I have my life together because I work remotely at an agency and earn a decent salary. The reality? Every single morning I wake up paralyzed with imposter syndrome, dreading the moment someone realizes I'm basically guessing my way through half my responsibilities. How do you stop feeling like a fraud?",
      tags: "CareerAnxiety,ImposterSyndrome,GrowingUp",
      helpfulCount: 89,
      insightfulCount: 42,
      wellSaidCount: 67,
      madeMeThinkCount: 114,
      commentCount: 1,
    },
  });

  await prisma.comment.upsert({
    where: { id: "c_3" },
    update: {},
    create: {
      id: "c_3",
      postId: p2.id,
      authorId: marcus.id,
      identityMode: "ALIAS",
      aliasName: "15YrTechVeteran",
      content: "Here is the secret nobody tells you in your twenties: almost everyone is figuring it out on the fly. Competence is not knowing every answer beforehand; competence is knowing how to stay calm while searching for the answer.",
      helpfulCount: 54,
    },
  });

  const p3 = await prisma.post.upsert({
    where: { id: "post_3" },
    update: {},
    create: {
      id: "post_3",
      authorId: samir.id,
      communityId: tech.id,
      postType: "QUESTION",
      identityMode: "PROFILE",
      title: "Should I learn programming or cybersecurity first in 2026?",
      content: "I'm starting from scratch with about 15 hours a week to dedicate. Some people tell me to learn Python and web fundamentals first so I understand what I'm securing, while others suggest starting directly with Network+ and Linux administration. What route creates the highest job readiness?",
      tags: "LearningToCode,Cybersecurity,Beginners",
      helpfulCount: 63,
      insightfulCount: 41,
      wellSaidCount: 19,
      madeMeThinkCount: 35,
      commentCount: 0,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
