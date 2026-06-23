import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus } from "lucide-react";
import { auth, signOut } from '@/auth';
import connectDB from "@/lib/db";
import { Scan } from "@/models/scan.model";
import { tone } from '@/lib/colorTone';
import DeleteBtn from '@/components/DeleteBtn';
import PrimaryBtn from '@/components/PrimaryBtn';
import Logo from '@/components/Logo';

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

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/" })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top masthead */}
      <header className="sticky top-0 z-50 border-b border-(--color-paper-rule) bg-paper-cream w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <form action={handleSignOut}>
              <button type="submit" className="paper-btn paper-btn-ghost text-paper-danger)">
                <span className="hidden sm:inline paper-label"
                  style={{
                    color: "var(--color-paper-danger)"
                  }}
                >Sign Out</span>
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
              <h1 className="paper-display text-4xl sm:text-5xl font-bold mt-2 leading-none text-(--color-paper-ink)">
                Analysis History
              </h1>
              <p className="text-sm text-paper-muted mt-4">
                Welcome back, <span className="text-(--color-paper-ink) font-medium capitalize">{userName}</span>.
              </p>
            </div>
            <PrimaryBtn type="scan">
              File a new Scan
            </PrimaryBtn>
          </div>
        </div>

        {scans.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="paper-label">
                Total {scans.length === 1 ? "scan:" : "scans:"} {scans.length}
              </span>
            </div>

            <ul className="paper-sheet divide-y divide-paper-hairline">
              {scans.map((item, index) => (
                <li key={item._id.toString()}>
                  <div className="flex justify-between items-center w-full p-5 hover:bg-neutral-100 rounded-md transition-colors group">
                    <Link
                      href={`/dashboard/scans/${item._id.toString()}`}
                      className=" w-full flex items-center"
                    >
                      <div className="flex items-center min-w-0 w-full">
                        <div className="paper-mono text-xs text-paper-subtle w-10 shrink-0">
                          {String(scans.length - index).padStart(2, "0")}
                        </div>

                        <div className='flex gap-6 w-full items-start flex-col sm:flex-row'>

                          <div className="space-x-1">

                            <div className="paper-display font-semibold text-[15px] capitalize text-paper-ink truncate flex flex-col sm:flex-row items-start sm:items-center gap-5">

                              <h3 className='w-full truncate'>
                                {item.analysis?.jobTitle || ''}
                              </h3>

                              <div className='paper-label flex gap-2'
                                style={{ letterSpacing: "1px", fontSize: "10px", fontWeight: '600' }}
                              >

                                <p>
                                  {item.analysis?.name.split(' ')[0] || ''}
                                </p>
                                |
                                <p>

                                  {formatDate(item.createdAt)}

                                </p>
                              </div>


                            </div>


                            <div className='h-full text-xs'>


                              <h1 className='text-paper-muted font-mono uppercase tracking-widest whitespace-nowrap mt-4'>

                                <span className='text-paper-ink font-semibold'>{item?.matchScore}% </span>
                                match •

                                <span
                                  className={`${item?.analysis && tone(item.analysis.matchScore).text} text-xs tracking-wide font-medium opacity-80 sm:ml-4`}
                                >
                                  {item?.analysis?.matchVerdict}
                                </span>


                              </h1>

                            </div>

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
          <div className="p-12 text-center max-w-md mx-auto">
            <h3 className="paper-display text-xl font-bold text-paper-ink mb-2">
              No resumes yet
            </h3>
            <p className="text-sm text-paper-muted mx-auto mb-6 leading-relaxed">
              Start by filing a compatibility scan against a target job description.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
