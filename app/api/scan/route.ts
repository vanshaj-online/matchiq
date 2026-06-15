import connectDB from "@/lib/db";
import { Scan } from "@/models/scan.model";
import { auth } from "@/auth";
import { ai } from "@/lib/gemini";
import { analysisSchema, AnalysisResult } from "@/lib/validators/analysis";

const MATCHIQ_SYSTEM_PROMPT = `
You are an expert ATS (Applicant Tracking System) engine and senior technical recruiter.
Your job is to analyze a resume against a job description and return a precise, structured analysis.

STRICT RULES:
- Respond ONLY with a valid JSON object. No markdown, no backticks, no explanation, no preamble.
- Do not add any text before or after the JSON.
- Be direct and specific — no generic advice like "tailor your resume". Every insight must reference actual content from the resume or JD.
- Missing keywords must be exact terms or phrases from the JD that are absent in the resume.
- Rewrite suggestions must be for actual bullet points present in the resume.
- Match score must reflect realistic ATS + recruiter evaluation, not optimism.

OUTPUT SCHEMA (return exactly this shape):
{
  "matchScore": <number 0-100>,
  "matchVerdict": <"Strong Match" | "Good Match" | "Partial Match" | "Weak Match">,
  "scoreBreakdown": {
    "keywordMatch": <number 0-100>,
    "relevantExperience": <number 0-100>,
    "skillsAlignment": <number 0-100>,
    "educationFit": <number 0-100>
  },
  "missingKeywords": [
    {
      "keyword": <string>,
      "importance": <"critical" | "important" | "nice-to-have">,
      "context": <string — one sentence on why this keyword matters for this JD>
    }
  ],
  "sectionFeedback": {
    "summary": <string — 2-3 sentences max, specific feedback>,
    "experience": <string — 2-3 sentences max, specific feedback>,
    "skills": <string — 2-3 sentences max, specific feedback>,
    "education": <string — 2-3 sentences max, specific feedback>
  },
  "rewriteSuggestions": [
    {
      "original": <string — exact bullet from resume>,
      "rewritten": <string — improved version aligned to JD>,
      "reason": <string — one sentence explaining the change>
    }
  ],
  "topStrengths": [<string>, <string>, <string>],
  "quickWins": [<string>, <string>, <string>],
  "jobTitle": <string>,
  "name": <string>,
  
}

FIELD DEFINITIONS:
- matchScore: Overall 0-100 ATS + recruiter score. Below 40 = weak, 40-60 = partial, 60-80 = good, 80+ = strong.
- matchVerdict: Derived from matchScore using the ranges above.
- scoreBreakdown: Sub-scores for the 4 dimensions. These do NOT need to average to matchScore — they are independent signals.
- missingKeywords: Only include keywords that actually appear in the JD. Max 10 items.
- sectionFeedback: If a section (e.g. summary) is absent from the resume, say it's missing and why it matters for this role.
- rewriteSuggestions: Pick the 3 resume bullet points with the highest improvement potential. Max 3 items.
- topStrengths: 3 specific things the resume does well relative to this JD.
- quickWins: 3 concrete, actionable changes the candidate can make immediately (not generic advice).
`;

export async function POST(req: Request) {

    let newScan = null

    try {

        const session = await auth()
        await connectDB()

        const body = await req.json()
        const { resumeText, jdText } = body

        if (!resumeText || !jdText) {

            return Response.json(
                {
                    success: false,
                    message: "Please provide resume and job description"
                },
                { status: 400 }
            )
        }

        const DAILY_SCAN_LIMIT: number = 5

        const startOfToday = new Date()
        startOfToday.setHours(0, 0, 0, 0)

        const scanToday = await Scan.countDocuments({
            userId: session!.user!.id,
            createdAt: {
                $gte: startOfToday,
            },
            status: {
                $ne: "failed"
            }
        })

        if (scanToday >= DAILY_SCAN_LIMIT) {

            return Response.json(
                {
                    success: false,
                    message: "You have reached the daily scan limit of 5 scans"
                },
                { status: 429 }
            )
        }

        newScan = await Scan.create({
            userId: session!.user!.id,
            resumeText,
            jdText,
            status: "pending"
        })

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            config: {
                systemInstruction: MATCHIQ_SYSTEM_PROMPT,
                responseMimeType: "application/json",
                temperature: 0.2,
            },
            contents: `
RESUME:
${resumeText}

JOB DESCRIPTION:
${jdText}
`
        })

        if (!response.text) {
            throw new Error("Gemini returned empty response");
        }

        const result = JSON.parse(response.text)

        const validated: AnalysisResult = analysisSchema.parse(result);

        await Scan.findByIdAndUpdate(
            newScan._id,
            {
                status: "completed",
                matchScore: validated.matchScore,
                analysis: validated
            }
        );

        return Response.json({
            success: true,
            data: validated,
            scanId: newScan._id
        })

    } catch (error) {

        console.log(error)
        await Scan.findByIdAndUpdate(
            newScan._id,
            {
                status: "failed",
            }
        );

        return Response.json(
            {
                success: false,
                code: "AI_BUSY",
                message:
                    "AI service is currently busy. Please try again in a few minutes."
            },
            { status: 429 }
        );

    }
}