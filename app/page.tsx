import Link from "next/link";
import { auth } from "@/auth";
import { FileText, ArrowRight } from "lucide-react";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="paper-sheet w-full max-w-2xl p-10 sm:p-14 relative overflow-hidden">
        {/* Top register marks */}
        <div className="absolute top-4 left-4 paper-label">01 / matchiq</div>

        <div className="mt-10 mb-8">
          <span className="paper-label">Resume × Job Description</span>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mt-3 leading-[0.95]">
            MatchIQ
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper-muted">
            A quiet, print-inspired tool for measuring how well your resume answers
            a job description. Upload, paste, and read the verdict — like a typed
            memo, not a dashboard.
          </p>
        </div>

        <hr className="paper-divider my-8" />

        <div className="flex flex-col sm:flex-row gap-3">
          {session?.user ? (
            <Link href="/dashboard" className="paper-btn paper-btn-primary">
              View ATS Report <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <Link href="/login" className="paper-btn paper-btn-primary">
                Sign in <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/signup" className="paper-btn">
                Create an account
              </Link>
            </>
          )}
        </div>

        <div className="mt-12 grid sm:grid-cols-3 grid-cols-1 gap-6 paper-label">

          {['Upload', 'Paste Job Description', 'Read Verdict'].map((elem, index) => (
            <div key={index} className="text-center">
              <div className="text-paper-ink text-2xl font-bold paper-display">0{index + 1}</div>
              <h1 className="font-medium text-black tracking-wider">{elem}</h1>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
