import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, FileText, Calendar, LogOut, ChevronRight, Trash } from "lucide-react";
import { auth, signOut } from '@/auth';
import connectDB from "@/lib/db";
import { Scan } from "@/models/scan.model";
import { tone } from '@/lib/colorTone';
import DeleteBtn from '@/components/DeleteBtn';

const formatDate = (date: Date) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  await connectDB();
  const scans = await Scan.find({ userId: session.user.id }).sort({ createdAt: -1 });
  const userName = session.user.name || session.user.email || "User";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top masthead */}
      <header className="sticky top-0 z-50 bg-(--color-paper-cream)/85 backdrop-blur-md border-b border-(--color-paper-rule)">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-(--color-paper-ink) text-white px-2 py-1 paper-mono text-xs tracking-[0.18em]">
              MIQ
            </div>
            <span className="paper-display font-extrabold text-lg text-(--color-paper-ink) tracking-tight">
              MatchIQ
            </span>
            <span className="hidden sm:inline paper-label"></span>
          </Link>
          <div className="flex items-center gap-3">
            <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button type="submit" className="paper-btn paper-btn-ghost text-paper-danger)">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        {/* Masthead */}
        <div className="pb-6 border-b border-(--color-paper-rule) border-dashed">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="paper-label">Bulletin · resumes on file</span>
              <h1 className="paper-display text-4xl sm:text-5xl font-bold mt-2 leading-none text-(--color-paper-ink)">
                ATS Report
              </h1>
              <p className="text-sm text-paper-muted mt-2">
                Welcome back, <span className="text-(--color-paper-ink) font-medium capitalize">{userName}</span>.
              </p>
            </div>
            <Link href="/scan/new" className="paper-btn paper-btn-primary">
              <Plus className="h-4 w-4" /> File a new scan
            </Link>
          </div>
        </div>

        {scans.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="paper-label">
                {scans.length} {scans.length === 1 ? "entry" : "entries"} on record
              </span>
              <span className="paper-label">vol. 01</span>
            </div>

            <ul className="paper-sheet divide-y divide-paper-hairline">
              {scans.map((item, index) => (
                <li key={item._id.toString()}>
                  <div className="flex justify-between items-center w-full p-5 hover:bg-paper-cream-soft transition-colors group">
                    <Link
                      href={`/dashboard/scans/${item._id.toString()}`}
                      className=" w-full flex items-center"
                    >
                      <div className="flex items-center min-w-0 w-full">
                        <div className="paper-mono text-xs text-paper-subtle w-10 shrink-0">
                          {String(scans.length - index).padStart(2, "0")}
                        </div>

                        <div className='flex gap-6 w-full items-start flex-col sm:flex-row'>

                          <div className="space-y-4">
                            <h3 className="paper-display font-semibold text-[15px] capitalize text-paper-ink truncate">
                              {userName}&apos;s Resume {scans.length > 1 ? `#${scans.length - index}` : ''}
                            </h3>
                            <div className='h-full text-xs'>

                              <h1 className='text-paper-muted font-mono uppercase tracking-widest'>Match Score:&nbsp;
                                <span className='text-paper-ink font-semibold'>{item?.matchScore}</span>
                              </h1>

                            </div>
                          </div>

                          <div className="flex paper-label w-full flex-col sm:flex-row gap-6 items-start justify-between md:px-6"
                            style={{
                              letterSpacing: "0.5px",
                              fontSize: "10px"
                            }}>
                            <span>{formatDate(item.createdAt)}</span>
                            <span
                              className={`paper-stamp ${item?.analysis && tone(item.analysis.matchScore).text}`}
                            >
                              {item?.analysis?.matchVerdict}
                            </span>
                          </div>


                        </div>

                      </div>
                    </Link>
                    <DeleteBtn id={item._id.toString()} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="paper-sheet p-12 text-center max-w-md mx-auto">
            <div className="inline-flex p-3 border border-paper-hairline bg-paper-cream-soft text-paper-muted mb-4 rounded-sm">
              <FileText className="h-5 w-5" />
            </div>
            <span className="paper-label block mb-1">Empty file</span>
            <h3 className="paper-display text-xl font-bold text-paper-ink mb-2">
              No resumes yet
            </h3>
            <p className="text-sm text-paper-muted max-w-xs mx-auto mb-6 leading-relaxed">
              Start by filing a compatibility scan against a target job description.
            </p>
            <Link href="/scan/new" className="paper-btn paper-btn-primary">
              <Plus className="h-4 w-4" /> Upload &amp; scan resume
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
