export interface ModerationResult {
  isSafe: boolean;
  score: number; // 0 to 100 risk score
  category?: "PII" | "HARASSMENT" | "HATE" | "THREAT" | "SPAM";
  suggestion?: string;
  flaggedTerms: string[];
}

// Regex patterns for PII detection
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const DOXXING_TRIGGERS = ["real name is", "lives at", "his number is", "her number is", "phone number is"];

// Simulated toxic and harassment keywords
const COMBATIVE_TRIGGERS = [
  "idiot", "stupid", "kill yourself", "kys", "scumbag", "loser",
  "trash", "worthless", "hate you", "threaten"
];

/**
 * Pre-flight Constructive AI Mirror
 * Runs instantly in client-side or edge before submitting to advise author
 */
export function checkPreFlightContent(content: string, postType?: string): ModerationResult {
  const flaggedTerms: string[] = [];
  const lower = content.toLowerCase();

  // 1. Check for PII (Phone / Email)
  if (EMAIL_REGEX.test(content) || PHONE_REGEX.test(content)) {
    flaggedTerms.push("personal_contact_info");
    return {
      isSafe: true, // safe to post, but strongly advised to remove
      score: 40,
      category: "PII",
      suggestion: "🛡️ Safety Notice: Your post appears to include personal contact info (email/phone). We recommend removing it to protect your identity.",
      flaggedTerms,
    };
  }

  // 2. Check for doxxing phrases
  for (const trigger of DOXXING_TRIGGERS) {
    if (lower.includes(trigger)) {
      flaggedTerms.push(trigger);
      return {
        isSafe: false,
        score: 85,
        category: "PII",
        suggestion: "⚠️ Potential Doxxing: Posting personal identifying details about individuals is against community safety rules.",
        flaggedTerms,
      };
    }
  }

  // 3. Check for severe toxicity / harassment
  for (const trigger of COMBATIVE_TRIGGERS) {
    if (lower.includes(trigger)) {
      flaggedTerms.push(trigger);
      return {
        isSafe: false,
        score: 90,
        category: "HARASSMENT",
        suggestion: "⛔ Constructive AI Mirror: Your draft contains hostile language. Constructive disagreement builds trust, but personal attacks are prohibited.",
        flaggedTerms,
      };
    }
  }

  // 4. Helpful tone nudge for questions
  if (postType === "QUESTION" && content.length < 35) {
    return {
      isSafe: true,
      score: 10,
      suggestion: "💡 Pro-Tip: Questions with a bit of context or what you've already tried receive 3x more helpful responses!",
      flaggedTerms: [],
    };
  }

  return {
    isSafe: true,
    score: 0,
    flaggedTerms: [],
  };
}
