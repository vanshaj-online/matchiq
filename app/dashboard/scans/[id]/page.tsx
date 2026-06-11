import { Scan } from "@/models/scan.model";
import connectDB from "@/lib/db";
import {
    Briefcase,
    Sparkles,
    AlertCircle,
    Check,
    Zap,
    Target,
    Compass,
    BookOpen,
    HelpCircle,
} from "lucide-react";
import type { AnalysisResult } from "@/lib/validators/analysis";

export default async function NewScanPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    let scan = null;
    let result: AnalysisResult | null = null;
    let error: string | null = null;

    try {
        await connectDB();
        scan = await Scan.findById(id);
        if (scan) {
            result = scan.analysis;
        }
    } catch (err: any) {
        error = err.message || "Failed to fetch scan data";
    }

    if (!scan && !error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
                <div className="text-center p-8 bg-white border border-gray-100 rounded-2xl shadow-xs">
                    <h2 className="text-lg font-bold text-black mb-1">Scan not found</h2>
                    <p className="text-xs text-gray-500">The requested scan ID does not exist or has been deleted.</p>
                </div>
            </div>
        );
    }


    // Style helper based on ATS Match Score
    const getScoreColor = (score: number) => {
        if (score >= 80) return {
            ring: "stroke-emerald-500 text-emerald-500",
            text: "text-emerald-700",
            bg: "bg-emerald-50/50",
            border: "border-emerald-100",
            badge: "bg-emerald-100 text-emerald-800 border-emerald-200"
        };
        if (score >= 60) return {
            ring: "stroke-blue-500 text-blue-500",
            text: "text-blue-700",
            bg: "bg-blue-50/50",
            border: "border-blue-100",
            badge: "bg-blue-100 text-blue-800 border-blue-200"
        };
        if (score >= 40) return {
            ring: "stroke-amber-500 text-amber-500",
            text: "text-amber-700",
            bg: "bg-amber-50/50",
            border: "border-amber-100",
            badge: "bg-amber-100 text-amber-800 border-amber-200"
        };
        return {
            ring: "stroke-rose-500 text-rose-500",
            text: "text-rose-700",
            bg: "bg-rose-50/50",
            border: "border-rose-100",
            badge: "bg-rose-100 text-rose-800 border-rose-200"
        };
    };

    const colors = result ? getScoreColor(result.matchScore) : null;
    const radius = 42;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = result ? circumference - (result.matchScore / 100) * circumference : 0;

    return (
        <div className="min-h-screen bg-gray-50/50">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Error Box */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-start space-x-3 text-sm animate-fadeIn">
                        <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                        <div className="grow">
                            <span className="font-semibold">Something went wrong:</span> {error}
                        </div>
                    </div>
                )}

                {/* Results Screen Layout */}
                {result && (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Summary Score Card */}
                        <div className={`border ${colors?.border} ${colors?.bg} p-6 sm:p-8 rounded-3xl`}>
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                                    {/* Score Radial Visual */}
                                    <div className="relative shrink-0 flex items-center justify-center bg-white p-2 rounded-full shadow-xs border border-gray-100">
                                        <svg className="w-28 h-28 transform -rotate-90">
                                            <circle
                                                cx="56"
                                                cy="56"
                                                r={radius}
                                                className="stroke-gray-100"
                                                strokeWidth={strokeWidth}
                                                fill="transparent"
                                            />
                                            <circle
                                                cx="56"
                                                cy="56"
                                                r={radius}
                                                className={`transition-all duration-1000 ${colors?.ring}`}
                                                strokeWidth={strokeWidth}
                                                strokeDasharray={circumference}
                                                strokeDashoffset={strokeDashoffset}
                                                strokeLinecap="round"
                                                fill="transparent"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-2xl font-extrabold text-black">{result.matchScore}%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                                            <span className={`text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full ${colors?.badge}`}>
                                                {result.matchVerdict}
                                            </span>
                                            <span className="text-xs text-gray-500 font-medium">ATS Match Grade</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-black">
                                            ATS Compatibility Summary
                                        </h2>
                                        <p className="text-sm text-gray-600 max-w-xl mt-1.5 leading-relaxed">
                                            Your match analysis is ready. We've verified your resume against the target requirements using Gemini AI.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sub-Metric Score Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { title: "Keyword Match", val: result.scoreBreakdown.keywordMatch, desc: "Presence of essential keywords", icon: Target },
                                { title: "Experience Alignment", val: result.scoreBreakdown.relevantExperience, desc: "Relevance of work history", icon: Briefcase },
                                { title: "Skills Fit", val: result.scoreBreakdown.skillsAlignment, desc: "Technical & core capability", icon: Compass },
                                { title: "Education Match", val: result.scoreBreakdown.educationFit, desc: "Academic requirements status", icon: BookOpen }
                            ].map((item, idx) => {
                                const statColors = getScoreColor(item.val);
                                return (
                                    <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.title}</span>
                                                <item.icon className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <div className="flex items-baseline space-x-1">
                                                <span className="text-2xl font-extrabold text-black">{item.val}</span>
                                                <span className="text-xs text-gray-400 font-medium">/100</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 leading-snug">{item.desc}</p>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
                                            <div
                                                className="h-1.5 rounded-full bg-current transition-all duration-500"
                                                style={{ width: `${item.val}%`, color: statColors.ring.split(" ")[1] }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Main Feedback & Keyword Panels */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Strengths & Quick Wins */}
                            <div className="lg:col-span-5 space-y-6">
                                {/* Strengths */}
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                                    <h3 className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg flex items-center space-x-2 mb-4 w-fit">
                                        <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                                        <span>Top Strengths</span>
                                    </h3>
                                    <ul className="space-y-3">
                                        {result.topStrengths.map((str, i) => (
                                            <li key={i} className="flex items-start space-x-2 text-sm text-gray-700">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                                                <span>{str}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Quick Wins */}
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                                    <h3 className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg flex items-center space-x-2 mb-4 w-fit">
                                        <Zap className="h-4 w-4 shrink-0 text-blue-600" />
                                        <span>Quick Wins</span>
                                    </h3>
                                    <ul className="space-y-3">
                                        {result.quickWins.map((win, i) => (
                                            <li key={i} className="flex items-start space-x-2 text-sm text-gray-700">
                                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0 mt-2" />
                                                <span>{win}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Missing Keywords Details */}
                            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                                <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center space-x-2">
                                    <Target className="h-5 w-5 text-gray-600" />
                                    <span>Missing Keywords to Target</span>
                                </h3>
                                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                                    These are specific keywords from the Job Description missing from your resume. Incorporating them naturally will improve ATS match scores.
                                </p>

                                <div className="space-y-4">
                                    {result.missingKeywords.map((kw, i) => {
                                        const badgeStyle =
                                            kw.importance === "critical"
                                                ? "bg-rose-50 text-rose-800 border-rose-100"
                                                : kw.importance === "important"
                                                    ? "bg-amber-50 text-amber-800 border-amber-100"
                                                    : "bg-blue-50 text-blue-800 border-blue-100";
                                        return (
                                            <div key={i} className="p-3 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors">
                                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                                    <span className="text-sm font-bold text-gray-900 font-mono bg-gray-50 px-2 py-0.5 rounded">
                                                        {kw.keyword}
                                                    </span>
                                                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                                                        {kw.importance}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-600 leading-normal">
                                                    {kw.context}
                                                </p>
                                            </div>
                                        );
                                    })}
                                    {result.missingKeywords.length === 0 && (
                                        <div className="text-center py-8 text-gray-400 text-sm">
                                            No missing keywords identified. Your resume matches perfectly!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section Analysis Breakdown */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                            <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center space-x-2">
                                <BookOpen className="h-5 w-5 text-gray-600" />
                                <span>ATS Review by Section</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: "Summary / Objective", text: result.sectionFeedback.summary },
                                    { title: "Experience Details", text: result.sectionFeedback.experience },
                                    { title: "Skills Listing", text: result.sectionFeedback.skills },
                                    { title: "Education Fit", text: result.sectionFeedback.education }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-4 border border-gray-100 rounded-xl bg-gray-50/30">
                                        <h4 className="text-sm font-bold text-gray-800 mb-1.5">{item.title}</h4>
                                        <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Resume Bullet Point Optimization */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                            <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center space-x-2">
                                <Sparkles className="h-5 w-5 text-gray-600" />
                                <span>Bullet Point Optimization Suggestions</span>
                            </h3>
                            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                                Refine specific phrasing on your resume using these suggestions to align better with the job's context.
                            </p>

                            <div className="space-y-6">
                                {result.rewriteSuggestions.map((sug, i) => (
                                    <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-2xs">
                                        <div className="grid grid-cols-1 lg:grid-cols-2">
                                            {/* Original Resume Bullet */}
                                            <div className="p-4 bg-rose-50/20 border-b lg:border-b-0 lg:border-r border-gray-100">
                                                <span className="text-[9px] font-extrabold text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                    Original Bullet Point
                                                </span>
                                                <p className="text-xs text-gray-600 mt-2 line-through leading-relaxed italic">
                                                    "{sug.original}"
                                                </p>
                                            </div>
                                            {/* Rewritten Optimized Bullet */}
                                            <div className="p-4 bg-emerald-50/10">
                                                <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1 w-fit">
                                                    <Sparkles className="h-3 w-3 shrink-0 text-emerald-600" />
                                                    <span>ATS Optimized Suggestion</span>
                                                </span>
                                                <p className="text-xs text-gray-800 font-semibold mt-2 leading-relaxed">
                                                    "{sug.rewritten}"
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-start space-x-2 text-xs">
                                            <HelpCircle className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                                            <p className="text-gray-500 leading-normal">
                                                <span className="font-semibold text-gray-700">Why this helps:</span> {sug.reason}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {result.rewriteSuggestions.length === 0 && (
                                    <div className="text-center py-8 text-gray-400 text-sm">
                                        No bullet points require rewriting! Excellent phrasing.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}