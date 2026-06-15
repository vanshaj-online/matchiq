import { Scan } from "@/models/scan.model";
import connectDB from "@/lib/db";
import Link from "next/link";
import {
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import type { AnalysisResult } from "@/lib/validators/analysis";
import { tone } from "@/lib/colorTone";
import JDModal from '@/components/JDModal';

const summaryBase =
  "flex items-center justify-between gap-3 cursor-pointer select-none list-none " +
  "[&::-webkit-details-marker]:hidden [&::marker]:hidden " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper-ink/30 rounded-sm";

const chevron =
  "h-3.5 w-3.5 text-paper-subtle shrink-0 transition-transform duration-200 group-open:rotate-180";



export default async function ScanResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let scan: any = null;
  let result: AnalysisResult | null = null;
  let error: string | null = null;

  try {
    await connectDB();
    scan = await Scan.findById(id);
    if (scan) result = scan.analysis;
  } catch (err: any) {
    error = "Failed to fetch scan data";
  }

  if (!scan && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="paper-sheet p-10 text-center max-w-md">
          <span className="paper-label">404 · not on file</span>
          <h2 className="paper-display text-2xl font-bold text-paper-ink mt-2 mb-2">
            Scan not found
          </h2>
          <p className="text-sm text-paper-muted">
            The requested scan ID does not exist or has been deleted.
          </p>
          <Link href="/dashboard" className="paper-btn paper-btn-primary mt-6">
            <ArrowLeft className="h-4 w-4" /> Back to ATS Report
          </Link>
        </div>
      </div>
    );
  }

  const colors = result ? tone(result.matchScore) : null;
  const radius = 44;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = result
    ? circumference - (result.matchScore / 100) * circumference
    : 0;


  const badgeClass = (importance: string) =>
    importance === "critical"
      ? "border-[color:var(--color-paper-danger)] text-[color:var(--color-paper-danger)]"
      : importance === "important"
        ? "border-[color:var(--color-paper-warning)] text-[color:var(--color-paper-warning)]"
        : "border-[color:var(--color-paper-secondary)] text-[color:var(--color-paper-secondary)]";

  const keywordGroups = result
    ? [
      {
        label: "critical",
        items: result.missingKeywords.filter((k) => k.importance === "critical"),
      },
      {
        label: "important",
        items: result.missingKeywords.filter((k) => k.importance === "important"),
      },
      {
        label: "nice to have",
        items: result.missingKeywords.filter(
          (k) => k.importance !== "critical" && k.importance !== "important"
        ),
      },
    ].filter((group) => group.items.length > 0)
    : [];

  const criticalCount = result
    ? result.missingKeywords.filter((k) => k.importance === "critical").length
    : 0;
  const importantCount = result
    ? result.missingKeywords.filter((k) => k.importance === "important").length
    : 0;

  return (
    <div className="min-h-screen relative">
      <header className="sticky top-0 z-50 bg-paper-cream/85 backdrop-blur-md border-b border-paper-rule">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-paper-ink text-white px-2 py-1 paper-mono text-xs tracking-[0.18em]">
              MIQ
            </div>
            <span className="paper-display font-bold text-lg text-paper-ink tracking-tight">
              MatchIQ
            </span>
          </Link>
          <Link href="/dashboard" className="paper-btn paper-btn-ghost">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {error && (
          <div className="p-4 border border-paper-danger bg-[#fdecec] text-paper-danger flex items-start gap-3 text-sm rounded-sm">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <span className="paper-mono uppercase tracking-wider text-xs">
                Error ·{" "}
              </span>
              {error}
            </div>
          </div>
        )}

        {result && colors && (
          <>
            <div className="space-y-10">
              {/* Masthead verdict */}
              <section className="paper-sheet p-8 sm:p-10 relative overflow-hidden">
                <JDModal text={scan.jdText} />
                <div className="absolute top-4 left-6 paper-label">
                  Report
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8 relative">


                  <div className="text-center sm:text-left">
                    <span
                      className={`paper-stamp ${colors.text}`}
                    >
                      {result.matchVerdict}
                    </span>
                    <h1 className="paper-display text-4xl sm:text-5xl font-bold tracking-tight text-paper-ink mt-4 leading-none">
                      Compatibility
                      <br />
                      Report
                    </h1>
                    <p className="text-sm text-paper-muted mt-4 max-w-md leading-relaxed">
                      Your match analysis is filed. Below: the headline score,
                      section-by-section verdicts, missing keywords, and concrete
                      rewrites.
                    </p>
                  </div>

                  <div className="relative shrink-0 flex items-center justify-center">
                    <svg className="w-32 h-32 -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        className="text-paper-hairline"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        className={`transition-all duration-1000 ${colors.ring}`}
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="butt"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="paper-display text-3xl font-bold text-paper-ink">
                        {result.matchScore}
                      </span>
                      <span className="paper-label mt-1">/ 100</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sub-metrics */}
              <section>
                <div className="flex items-center justify-between mb-4 flex-wrap">
                  <span className="paper-label whitespace-nowrap">sub-scores</span>
                  <span className="paper-label whitespace-nowrap">four metrics</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: "Keyword Match",
                      val: result.scoreBreakdown.keywordMatch,
                      desc: "Presence of essential keywords",
                    },
                    {
                      title: "Experience",
                      val: result.scoreBreakdown.relevantExperience,
                      desc: "Relevance of work history",
                    },
                    {
                      title: "Skills Fit",
                      val: result.scoreBreakdown.skillsAlignment,
                      desc: "Technical & core capability",
                    },
                    {
                      title: "Education",
                      val: result.scoreBreakdown.educationFit,
                      desc: "Academic requirements",
                    },
                  ].map((item, idx) => {
                    const t = tone(item.val);
                    return (
                      <div key={idx} className="paper-sheet p-5 flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <span className="paper-label">{item.title}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="paper-display text-3xl font-bold text-paper-ink">
                            {item.val}
                          </span>
                          <span className="paper-mono text-xs text-paper-muted">
                            /100
                          </span>
                        </div>
                        <p className="text-xs text-paper-muted leading-snug">
                          {item.desc}
                        </p>
                        <div className="w-full h-[3px] bg-paper-hairline mt-1">
                          <div
                            className={`h-[3px] ${t.bar} transition-all duration-500`}
                            style={{ width: `${item.val}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Strengths / Quick wins / Missing kw */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-6">
                  <div className="paper-sheet p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="paper-label">strengths</span>
                    </div>
                    <ul className="space-y-3">
                      {result.topStrengths.map((str, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-paper-text leading-relaxed"
                        >
                          <span className="paper-mono text-xs text-paper-subtle mt-0.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="paper-sheet p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="paper-label">quick wins</span>
                    </div>
                    <ul className="space-y-3">
                      {result.quickWins.map((win, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-paper-text leading-relaxed"
                        >
                          <span className="paper-mono text-xs text-paper-subtle mt-0.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{win}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Missing keywords — grouped by severity, reasons collapsed */}
                <div className="lg:col-span-7 paper-sheet p-6">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                    <div className="flex items-center gap-2">
                      <span className="paper-label whitespace-nowrap">missing keywords</span>
                    </div>
                    <span className="paper-label whitespace-nowrap">{result.missingKeywords.length} items</span>
                  </div>
                  <p className="text-xs text-paper-muted mb-1 leading-relaxed">
                    Keywords from the job description that did not appear on your
                    resume.
                  </p>
                  {(criticalCount > 0 || importantCount > 0) && (
                    <p className="paper-mono text-[11px] tracking-[0.08em] mb-4">
                      {criticalCount > 0 && (
                        <span className="text-paper-danger">
                          {criticalCount} critical
                        </span>
                      )}
                      {criticalCount > 0 && importantCount > 0 && (
                        <span className="text-paper-subtle"> · </span>
                      )}
                      {importantCount > 0 && (
                        <span className="text-paper-warning">
                          {importantCount} important
                        </span>
                      )}
                    </p>
                  )}

                  <div className="space-y-5">
                    {keywordGroups.map((group) => (
                      <div key={group.label}>
                        <div className="paper-mono text-[10px] tracking-[0.18em] uppercase text-ink font-medium mb-1">
                          {group.label} · {group.items.length}
                        </div>
                        <div className="divide-y divide-dashed divide-paper-rule border-t border-paper-ink ">
                          {group.items.map((kw, i) => (
                            <details key={`${group.label}-${i}`} className="group py-4">
                              <summary className={summaryBase}>
                                <span className="flex items-center gap-2 flex-wrap">
                                  <span className="paper-mono text-[13px] text-paper-ink bg-paper-cream-soft px-2 py-0.5 border border-paper-hairline rounded-sm">
                                    {kw.keyword}
                                  </span>
                                  <span
                                    className={`paper-mono text-[10px] tracking-[0.14em] uppercase px-2 py-0.5 border rounded-sm ${badgeClass(kw.importance)}`}
                                  >
                                    {kw.importance}
                                  </span>
                                </span>
                                <ChevronDown className={chevron} />
                              </summary>
                              <p className="text-xs text-paper-muted leading-relaxed mt-2 pr-6">
                                {kw.context}
                              </p>
                            </details>
                          ))}
                        </div>
                      </div>
                    ))}
                    {result.missingKeywords.length === 0 && (
                      <div className="text-center py-8 paper-label">
                        No missing keywords — match is clean.
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Section feedback — title + 2-line preview, full text on expand */}
              <section className="paper-sheet p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="paper-label">review by part</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  {[
                    { title: "Summary / Objective", text: result.sectionFeedback.summary },
                    { title: "Experience", text: result.sectionFeedback.experience },
                    { title: "Skills", text: result.sectionFeedback.skills },
                    { title: "Education", text: result.sectionFeedback.education },
                  ].map((item, idx) => (
                    <details
                      key={idx}
                      className="group border-l-2 border-paper-ink pl-4 py-3"
                      {...(idx === 0 ? { open: true } : {})}
                    >
                      <summary className={`${summaryBase} items-start`}>
                        <div className="flex-1">
                          <h4 className="paper-display font-bold text-sm text-paper-ink mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-paper-muted leading-relaxed line-clamp-2 group-open:hidden">
                            {item.text}
                          </p>
                        </div>
                        <ChevronDown className={`${chevron} mt-1`} />
                      </summary>
                      <p className="text-xs text-paper-muted leading-relaxed mt-1">
                        {item.text}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              {/* Rewrites — rewritten copy + reason lead, original tucked away */}
              <section className="paper-sheet p-6">
                <div className="flex items-center justify-between mb-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="paper-label whitespace-nowrap">rewrites</span>
                  </div>
                  <span className="paper-label whitespace-nowrap">
                    {result.rewriteSuggestions.length} drafts
                  </span>
                </div>
                <p className="text-xs text-paper-muted mb-5 leading-relaxed">
                  Refine your phrasing using these suggested edits. Pencil them in.
                </p>

                <div className="space-y-5">
                  {result.rewriteSuggestions.map((sug, i) => (
                    <article
                      key={i}
                      className="border border-paper-hairline rounded-sm overflow-hidden"
                    >
                      <div className="p-4">
                        <span className="paper-label text-paper-success">
                          rewritten
                        </span>
                        <p className="text-sm text-paper-ink font-medium mt-2 leading-relaxed">
                          &ldquo;{sug.rewritten}&rdquo;
                        </p>
                      </div>
                      <div className="px-4 pb-4 flex items-start gap-2 text-xs">
                        <HelpCircle className="h-3.5 w-3.5 text-paper-muted shrink-0 mt-0.5" />
                        <p className="text-paper-muted leading-relaxed">
                          <span className="paper-mono uppercase tracking-wider text-[10px] text-paper-ink mr-1">
                            why ·
                          </span>
                          {sug.reason}
                        </p>
                      </div>
                      <details className="group border-t border-dashed border-paper-rule">
                        <summary className={`${summaryBase} px-4 py-2 bg-paper-cream-soft`}>
                          <span className="paper-label text-paper-danger">
                            show original
                          </span>
                          <ChevronDown className={chevron} />
                        </summary>
                        <div className="px-4 pb-4 pt-1 bg-paper-cream-soft">
                          <p className="text-xs text-paper-muted leading-relaxed italic font-serif">
                            &ldquo;{sug.original}&rdquo;
                          </p>
                        </div>
                      </details>
                    </article>
                  ))}
                  {result.rewriteSuggestions.length === 0 && (
                    <div className="text-center py-8 paper-label">
                      No rewrites suggested.
                    </div>
                  )}
                </div>
              </section>

              <div className="text-center pt-6 border-t border-dashed border-paper-rule paper-label">
                — end of report —
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}