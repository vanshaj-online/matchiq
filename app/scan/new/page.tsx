"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Upload,
    FileText,
    Briefcase,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ArrowLeft,
    Check,
    Zap,
    Target,
    Compass,
    BookOpen,
    HelpCircle,
    RotateCcw
} from "lucide-react";
import type { AnalysisResult } from "@/lib/validators/analysis";

export default function NewScanPage() {

    const [resumeText, setResumeText] = useState("");
    const [jdText, setJdText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    // Visual loading and response states (only UI level)
    const [isExtracting, setIsExtracting] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const router = useRouter();

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0] ?? null;
        if (!uploadedFile) return;

        setFile(uploadedFile);
        setIsExtracting(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('resume', uploadedFile);

            const response = await fetch('/api/resume/extract', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to extract text from resume");
            }

            const data = await response.json();

            if (data.success) {
                router.push(`/dashboard/scans/${data.scanId}`);
            }

            setResumeText(data.text);

        } catch (err: any) {
            setError(err.message || "Failed to extract text from resume");
        } finally {
            setIsExtracting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setIsAnalyzing(true);

        setError(null);

        try {

            const response = await fetch('/api/scan', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    resumeText,
                    jdText,
                })
            });

            if (!response.ok) {
                throw new Error('Failed to analyze resume. Please try again.');
            }

            const data = await response.json();

            console.log(data);

            if (data.success && data.data) {
                setResult(data.data);
            } else {
                throw new Error(data.message || 'Analysis failed.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to analyze resume.');
        } finally {
            setIsAnalyzing(false);
        }
    };

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
            {/* Navigation Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-black text-white p-2 rounded-lg font-bold text-sm tracking-wider">
                            MIQ
                        </div>
                        <span className="font-bold text-lg text-black tracking-tight">MatchIQ</span>
                    </div>
                    <Link
                        href="/dashboard"
                        className="text-sm font-semibold text-gray-600 hover:text-black transition-colors flex items-center space-x-1.5"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Dashboard</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Intro Headers */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-black tracking-tight">
                        New Resume Scan
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Compare your resume details against the target job requirements to check ATS score compatibility and alignment.
                    </p>
                </div>

                {/* Error Box */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-start space-x-3 text-sm animate-fadeIn">
                        <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                        <div className="grow">
                            <span className="font-semibold">Something went wrong:</span> {error}
                        </div>
                    </div>
                )}

                {/* Input Panel Form */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Resume File Upload Box & Content Edit */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                            <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-gray-600" />
                                <span>Step 1: Upload Resume</span>
                            </h2>

                            <label className="group relative flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-black transition-all bg-gray-50/50 hover:bg-gray-100/20">
                                <input
                                    type="file"
                                    accept=".pdf,.docx,.doc"
                                    onChange={handleFile}
                                    className="sr-only"
                                />
                                {isExtracting ? (
                                    <div className="flex flex-col items-center space-y-3 py-4">
                                        <Loader2 className="h-8 w-8 animate-spin text-black" />
                                        <p className="text-sm font-semibold text-gray-900">Extracting text from resume...</p>
                                        <p className="text-xs text-gray-500">Parsing document nodes with MatchIQ engine</p>
                                    </div>
                                ) : file ? (
                                    <div className="flex flex-col items-center space-y-3 py-2">
                                        <div className="p-3 bg-black/5 rounded-full text-black">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 max-w-xs truncate">{file.name}</p>
                                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        <div className="flex items-center space-x-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-100">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            <span>Extracted successfully</span>
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium group-hover:text-black transition-colors mt-2">
                                            Click or drag to replace file
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center space-y-3 py-4">
                                        <div className="p-3 bg-white rounded-xl shadow-xs border border-gray-100 text-gray-500 group-hover:scale-110 transition-transform">
                                            <Upload className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">Choose a file or drag & drop</p>
                                            <p className="text-xs text-gray-500 mt-1">Supports PDF, DOC, or DOCX (Max 10MB)</p>
                                        </div>
                                    </div>
                                )}
                            </label>
                        </div>

                        {/* Extracted Text Content Field */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                            <div className="flex justify-between items-center mb-3">
                                <label htmlFor="resumeText" className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                                    <FileText className="h-4.5 w-4.5 text-gray-600" />
                                    <span>Extracted Resume Text</span>
                                </label>
                                {resumeText && (
                                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                                        {resumeText.split(/\s+/).filter(Boolean).length} words
                                    </span>
                                )}
                            </div>
                            <textarea
                                id="resumeText"
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                                rows={14}
                                className="w-full text-sm font-mono border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50/50 resize-y min-h-[300px]"
                                placeholder="Resume Text content will be loaded here automatically once you upload a file, or you can paste your raw resume text here directly..."
                            />
                        </div>
                    </div>

                    {/* Job Description Panel */}
                    <div className="h-full">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col h-full justify-between">
                            <div>
                                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center space-x-2">
                                    <Briefcase className="h-5 w-5 text-gray-600" />
                                    <span>Step 2: Enter Job Description</span>
                                </h2>

                                <div className="flex justify-between items-center mb-3">
                                    <label htmlFor="jd" className="text-sm font-bold text-gray-700">
                                        Target Job Description
                                    </label>
                                    {jdText && (
                                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                                            {jdText.split(/\s+/).filter(Boolean).length} words
                                        </span>
                                    )}
                                </div>

                                <textarea
                                    id="jd"
                                    rows={20}
                                    value={jdText}
                                    onChange={(e) => setJdText(e.target.value)}
                                    placeholder="Paste the target job description here..."
                                    className="w-full text-sm border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50/50 min-h-[380px]"
                                    style={{ resize: 'vertical' }}
                                />
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <button
                                    type="submit"
                                    disabled={isAnalyzing || !resumeText || !jdText}
                                    className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-xl text-white font-bold shadow-sm transition-all ${isAnalyzing || !resumeText || !jdText
                                        ? "bg-gray-300 cursor-not-allowed text-gray-500"
                                        : "bg-black hover:bg-gray-900 active:scale-[0.98] cursor-pointer"
                                        }`}
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin text-white" />
                                            <span>Running ATS Compatibility Analysis...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-5 w-5 text-white" />
                                            <span>Analyze Compatibility</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </main>
        </div>
    );
}