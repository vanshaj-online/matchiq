import { z } from "zod";

export const analysisSchema = z.object({
  matchScore: z.number().min(0).max(100),

  matchVerdict: z.enum([
    "Strong Match",
    "Good Match",
    "Partial Match",
    "Weak Match",
  ]),

  scoreBreakdown: z.object({
    keywordMatch: z.number().min(0).max(100),
    relevantExperience: z.number().min(0).max(100),
    skillsAlignment: z.number().min(0).max(100),
    educationFit: z.number().min(0).max(100),
  }),

  missingKeywords: z.array(
    z.object({
      keyword: z.string(),
      importance: z.enum([
        "critical",
        "important",
        "nice-to-have",
      ]),
      context: z.string(),
    })
  ),

  sectionFeedback: z.object({
    summary: z.string(),
    experience: z.string(),
    skills: z.string(),
    education: z.string(),
  }),

  rewriteSuggestions: z.array(
    z.object({
      original: z.string(),
      rewritten: z.string(),
      reason: z.string(),
    })
  ),

  topStrengths: z.array(z.string()),

  quickWins: z.array(z.string()),
});

export type AnalysisResult = z.infer<
  typeof analysisSchema
>;