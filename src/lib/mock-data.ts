export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  reputationScore: number;
  level: number;
  xp: number;
  streakDays: number;
  helpfulAnswersCount: number;
  achievementsCount: number;
  topics: string[];
}

export interface CommunityItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  memberCount: number;
}

export interface CommentItem {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  identityMode: "PROFILE" | "ANONYMOUS" | "ALIAS";
  aliasName?: string;
  content: string;
  helpfulCount: number;
  createdAt: string;
  parentId?: string;
  replies?: CommentItem[];
}

export interface PostItem {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  authorReputation: number;
  communityId: string;
  communityName: string;
  communitySlug: string;
  postType: "THOUGHT" | "QUESTION" | "STORY" | "CONFESSION" | "ADVICE" | "DEBATE" | "ACHIEVEMENT";
  identityMode: "PROFILE" | "ANONYMOUS" | "ALIAS";
  aliasName?: string;
  title?: string;
  content: string;
  tags: string[];

  // Debate specific
  debateAgreeTitle?: string;
  debateDisagreeTitle?: string;
  agreeCount: number;
  disagreeCount: number;
  userVote?: "AGREE" | "DISAGREE" | null;

  // Reactions
  reactions: {
    helpful: number;
    insightful: number;
    wellSaid: number;
    madeMeThink: number;
  };
  userReactions: {
    helpful: boolean;
    insightful: boolean;
    wellSaid: boolean;
    madeMeThink: boolean;
  };

  commentsCount: number;
  createdAt: string;
  comments: CommentItem[];
}

export const CURRENT_USER: UserProfile = {
  id: "usr_current_alex",
  username: "alex_dev",
  displayName: "Alex Rivera",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  bio: "Building things, curious about cybersecurity and system design. Here for honest feedback.",
  reputationScore: 92,
  level: 14,
  xp: 1420,
  streakDays: 23,
  helpfulAnswersCount: 47,
  achievementsCount: 18,
  topics: ["Technology", "Career", "Web Development", "University", "Cybersecurity"],
};

export const INITIAL_COMMUNITIES: CommunityItem[] = [
  {
    id: "comm_tech",
    name: "Technology",
    slug: "technology",
    description: "Deep tech discussions, coding dilemmas, architectures, and AI realities.",
    icon: "💻",
    color: "#6366f1",
    memberCount: 24500,
  },
  {
    id: "comm_career",
    name: "Career & Work",
    slug: "career",
    description: "Honest career transitions, salary realities, job hunts, and burnout advice.",
    icon: "💼",
    color: "#8b5cf6",
    memberCount: 18900,
  },
  {
    id: "comm_life",
    name: "Life & Solitude",
    slug: "life",
    description: "What nobody tells you about growing up, loneliness, and finding peace.",
    icon: "🌿",
    color: "#10b981",
    memberCount: 31200,
  },
  {
    id: "comm_uni",
    name: "University & School",
    slug: "university",
    description: "Exams, degrees vs practical skills, admissions, and surviving campus life.",
    icon: "🎓",
    color: "#f59e0b",
    memberCount: 15400,
  },
  {
    id: "comm_money",
    name: "Money & Finance",
    slug: "money",
    description: "Real financial mistakes, saving on a student budget, and investing without hype.",
    icon: "💰",
    color: "#06b6d4",
    memberCount: 12800,
  },
];

export const INITIAL_POSTS: PostItem[] = [
  {
    id: "post_1",
    authorId: "usr_marcus",
    authorName: "Marcus Vance",
    authorUsername: "mvance",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    authorReputation: 88,
    communityId: "comm_tech",
    communityName: "Technology",
    communitySlug: "technology",
    postType: "DEBATE",
    identityMode: "PROFILE",
    title: "University degrees are becoming less important for tech careers.",
    content: "With open source, accessible cloud tools, and AI tutors, I've seen self-taught developers out-architect university grads with 4-year CS degrees. But traditional institutions still claim accreditation and theory matter more. What is your actual experience on hiring teams?",
    tags: ["TechCareers", "University", "SoftwareEngineering"],
    debateAgreeTitle: "Portfolio & real grit matter 10x more than accredited theory",
    debateDisagreeTitle: "Deep algorithmic rigor & institutional networking are irreplaceable",
    agreeCount: 184,
    disagreeCount: 92,
    userVote: "AGREE",
    reactions: {
      helpful: 48,
      insightful: 76,
      wellSaid: 34,
      madeMeThink: 91,
    },
    userReactions: {
      helpful: true,
      insightful: false,
      wellSaid: false,
      madeMeThink: true,
    },
    commentsCount: 38,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    comments: [
      {
        id: "c_1",
        postId: "post_1",
        authorId: "usr_elena",
        authorName: "Elena Rostova",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        identityMode: "PROFILE",
        content: "I manage an engineering team of 14 at a series-B SaaS. The degree gets you past the automated ATS filter on junior roles, but in technical interviews, degree holders without side projects usually fail to debug real async race conditions.",
        helpfulCount: 29,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: "c_2",
        postId: "post_1",
        authorId: "usr_anon_1",
        authorName: "Anonymous",
        identityMode: "ANONYMOUS",
        content: "In specialized fields like cryptography, compilers, or distributed systems infrastructure, a solid CS foundation is night and day compared to a 12-week bootcamp graduate.",
        helpfulCount: 15,
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      },
    ],
  },
  {
    id: "post_2",
    authorId: "usr_hidden_2",
    authorName: "Anonymous",
    authorUsername: "anonymous",
    authorReputation: 60,
    communityId: "comm_career",
    communityName: "Career & Work",
    communitySlug: "career",
    postType: "CONFESSION",
    identityMode: "ANONYMOUS",
    title: "I've been pretending that I know what I'm doing with my career, but honestly I have no idea.",
    content: "I am 24. Everyone in my family talks about me like I have my life together because I work remotely at an agency and earn a decent salary. The reality? Every single morning I wake up paralyzed with imposter syndrome, dreading the moment someone realizes I'm basically guessing my way through half my responsibilities. How do you stop feeling like a fraud?",
    tags: ["CareerAnxiety", "ImposterSyndrome", "GrowingUp"],
    agreeCount: 0,
    disagreeCount: 0,
    reactions: {
      helpful: 89,
      insightful: 42,
      wellSaid: 67,
      madeMeThink: 114,
    },
    userReactions: {
      helpful: false,
      insightful: false,
      wellSaid: true,
      madeMeThink: false,
    },
    commentsCount: 27,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    comments: [
      {
        id: "c_3",
        postId: "post_2",
        authorId: "usr_senior_lead",
        authorName: "Jordan K.",
        identityMode: "ALIAS",
        aliasName: "15YrTechVeteran",
        content: "Here is the secret nobody tells you in your twenties: almost everyone is figuring it out on the fly. Competence is not knowing every answer beforehand; competence is knowing how to stay calm while searching for the answer.",
        helpfulCount: 54,
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      },
    ],
  },
  {
    id: "post_3",
    authorId: "usr_dev_sam",
    authorName: "Samir Chen",
    authorUsername: "samirchen",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    authorReputation: 95,
    communityId: "comm_tech",
    communityName: "Technology",
    communitySlug: "technology",
    postType: "QUESTION",
    identityMode: "PROFILE",
    title: "Should I learn programming or cybersecurity first in 2026?",
    content: "I'm starting from scratch with about 15 hours a week to dedicate. Some people tell me to learn Python and web fundamentals first so I understand what I'm securing, while others suggest starting directly with Network+ and Linux administration. What route creates the highest job readiness?",
    tags: ["LearningToCode", "Cybersecurity", "Beginners"],
    agreeCount: 0,
    disagreeCount: 0,
    reactions: {
      helpful: 63,
      insightful: 41,
      wellSaid: 19,
      madeMeThink: 35,
    },
    userReactions: {
      helpful: true,
      insightful: false,
      wellSaid: false,
      madeMeThink: false,
    },
    commentsCount: 19,
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    comments: [],
  },
  {
    id: "post_4",
    authorId: "usr_sarah_m",
    authorName: "Sarah Miller",
    authorUsername: "sarahm",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    authorReputation: 84,
    communityId: "comm_life",
    communityName: "Life & Solitude",
    communitySlug: "life",
    postType: "THOUGHT",
    identityMode: "PROFILE",
    content: "I think we are becoming too dependent on AI to think for ourselves. I noticed that whenever a mildly challenging thought or question strikes me, instead of sitting with the ambiguity or writing down my own raw perspective, my hand instinctively opens an LLM prompt. We might be outsourcing the very friction that builds independent taste.",
    tags: ["ArtificialIntelligence", "Philosophy", "DeepWork"],
    agreeCount: 0,
    disagreeCount: 0,
    reactions: {
      helpful: 34,
      insightful: 98,
      wellSaid: 52,
      madeMeThink: 142,
    },
    userReactions: {
      helpful: false,
      insightful: true,
      wellSaid: false,
      madeMeThink: true,
    },
    commentsCount: 44,
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    comments: [],
  },
  {
    id: "post_5",
    authorId: "usr_tariq",
    authorName: "Tariq Bello",
    authorUsername: "tbello",
    authorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    authorReputation: 78,
    communityId: "comm_career",
    communityName: "Career & Work",
    communitySlug: "career",
    postType: "ACHIEVEMENT",
    identityMode: "PROFILE",
    title: "Finally shipped my first paying client project after 8 months of self-study!",
    content: "Eight months ago I didn't know what a git merge conflict was. Today, I deployed an automated inventory dashboard for a local logistics company and received my first invoice payment of $1,200. It's not Silicon Valley money, but it proves the grind wasn't in vain. Keep pushing, everyone.",
    tags: ["Milestone", "Freelancing", "ProofOfWork"],
    agreeCount: 0,
    disagreeCount: 0,
    reactions: {
      helpful: 58,
      insightful: 31,
      wellSaid: 120,
      madeMeThink: 22,
    },
    userReactions: {
      helpful: false,
      insightful: false,
      wellSaid: true,
      madeMeThink: false,
    },
    commentsCount: 31,
    createdAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    comments: [],
  },
];
