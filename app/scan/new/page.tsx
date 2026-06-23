"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Briefcase,
  X,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Upload,
} from "lucide-react";
import Logo from "@/components/Logo";
import type { AnalysisResult } from "@/lib/validators/analysis";
import { Flip, ToastContainer, toast } from "react-toastify";

export default function NewScanPage() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setResult] = useState<AnalysisResult | null>(null);
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

      const response = await fetch('/api/resume/extract', { method: 'POST', body: formData });

      if (!response.ok) throw new Error("Failed to extract text from resume");

      const data = await response.json();

      setResumeText(data.text);

    } catch (err: any) {

      setError(err.message || "Failed to extract text from resume");

    } finally {

      setIsExtracting(false);

    }

  };

  const handleFileClear = async () => {
    setFile(null);
    setResumeText("");
    setIsExtracting(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setIsAnalyzing(true);
    setError(null);

    try {

      const response = await fetch('/api/scan', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jdText }),
      });

      if (!response.ok) {

        if (response.status == 429) {

          toast.error('You have reached the daily scan limit. Please try again tomorrow.', {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });

          return
        }

        throw new Error('Failed to analyze resume. Please try again.');

      }


      const data = await response.json();

      if (data.success && data.data) {
        setResult(data.data);
        router.push(`/dashboard/scans/${data.scanId}`)
      }

      else throw new Error(data.message || 'Analysis failed.');

    } catch (err: any) {

      setError(err.message || 'Failed to analyze resume.');

    } finally {

      setIsAnalyzing(false);

    }

  };

  return (
    <div className="min-h-screen">
      <ToastContainer
        toastStyle={{
          fontSize: "13px",
          color: 'var(--color-paper-danger)'
        }}
      />
      <header className="sticky top-0 z-50 bg-paper-cream/85 backdrop-blur-md border-b border-paper-rule">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
          <Link href="/dashboard" className="paper-btn paper-btn-ghost">
            <ArrowLeft className="h-4 w-4" /> Back to ATS Report
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="pb-6 border-b border-paper-rule border-dashed">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h1 className="paper-display text-4xl sm:text-5xl font-bold mt-2 text-paper-ink leading-none">
                File a Scan
              </h1>
              <p className="text-sm text-paper-muted mt-2 max-w-xl">
                Submit a resume and target job description. We&apos;ll print back an
                ATS compatibility report, line by line.
              </p>
            </div>
            <span className="paper-stamp text-paper-secondary">
              draft · pending
            </span>
          </div>
        </div>

        {error && (
          <div className="px-2 py-2 border border-paper-danger/70 bg-paper-cream-soft text-paper-danger flex items-center justify-between text-sm rounded-sm animate-fadeIn">
            <div className="flex gap-3 items-center">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <div className="">
                <span className="paper-mono uppercase tracking-wider text-xs"
                >Error · </span>
                {error}
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="hover:bg-paper-danger/70 hover:text-white transition-colors text-xs cursor-pointer p-0.5 rounded-sm border">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Step 1 — Upload */}
          <section className="paper-sheet p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="paper-display font-bold text-base text-paper-ink flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Step 01 · Upload Resume
              </h2>
              <span className="paper-label">pdf / docx</span>
            </div>

            <label className="group relative flex flex-col items-center justify-center border border-dashed border-paper-rule p-10 text-center cursor-pointer hover:border-paper-ink transition-colors bg-paper-cream-soft rounded-sm">
              <input type="file" accept=".pdf,.docx" onChange={handleFile} className="sr-only" />
              {isExtracting ? (
                <div className="flex flex-col items-center gap-3 py-4">
                  <Loader2 className="h-7 w-7 animate-spin text-paper-ink" />
                  <p className="paper-mono uppercase tracking-wider text-xs text-paper-ink">
                    Extracting…
                  </p>
                  <p className="text-xs text-paper-muted">Parsing document with MatchIQ</p>
                </div>
              ) : file ? (
                <div className="flex flex-col items-center gap-6 py-2">
                  <div className="text-paper-ink">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="paper-display font-semibold text-sm text-paper-ink max-w-xs truncate">
                      {file.name}
                    </p>
                    <p className="paper-mono text-[11px] text-paper-muted mt-0.5">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="p-3  text-paper-ink rounded-sm">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="paper-display font-semibold text-sm text-paper-ink">
                    Drop your resume here
                  </p>
                  <p className="text-xs text-paper-muted">
                    or click to browse — only PDF / DOCX, up to 10MB
                  </p>
                </div>
              )}
            </label>

            {
              file &&
              <div className="flex gap-4 mx-auto w-max mt-4 ">

                <button
                  onClick={handleFileClear}
                  className="mono hover:bg-paper-danger/70 hover:text-white transition-colors text-xs border px-2 py-1 rounded-sm cursor-pointer text-paper-danger/70 "
                >Remove file</button>

              </div>
            }

            <div className="mt-6">
              <label htmlFor="resume" className="paper-label block mb-2">Extracted resume text</label>
              <textarea
                id="resume"
                rows={10}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Resume contents will appear here after extraction…"
                className="w-full text-sm min-h-[220px]"
                style={{ resize: "vertical" }}
              />
            </div>
          </section>

          {/* Step 2 — JD */}
          <section className="paper-sheet p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="paper-display font-bold text-base text-paper-ink flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Step 02 · Target Job Description
              </h2>
              {jdText && (
                <span className="paper-label">
                  {jdText.split(/\s+/).filter(Boolean).length} words
                </span>
              )}
            </div>

            <textarea
              id="jd"
              rows={20}
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste the job description here, verbatim. Bullet points, requirements, the lot."
              className="w-full text-sm flex-1 min-h-[380px]"
              style={{ resize: "vertical" }}
            />

            <div className="mt-6 pt-5 border-t border-dashed border-paper-rule">
              <button
                type="submit"
                disabled={isAnalyzing || !resumeText || !jdText}
                className="paper-btn paper-btn-primary w-full py-3"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Running compatibility analysis…
                  </>
                ) : (
                  <>
                    Analyze
                  </>
                )}
              </button>
              <p className="paper-label text-center mt-3">
                results print to your ATS Report
              </p>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
