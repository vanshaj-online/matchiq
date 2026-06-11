import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
    Plus,
    FileText,
    Calendar,
    LogOut,
    ChevronRight,
} from "lucide-react";
import { auth, signOut } from '@/auth';
import connectDB from "@/lib/db";
import { Scan } from "@/models/scan.model";

// Helper to format the creation date
const formatDate = (date: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    await connectDB();
    const scans = await Scan.find({ userId: session.user.id }).sort({ createdAt: -1 });

    const userName = session.user.name || session.user.email || "User";

    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-black text-white p-2 rounded-lg font-bold text-sm tracking-wider">
                            MIQ
                        </div>
                        <span className="font-bold text-lg text-black tracking-tight">MatchIQ</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/scan/new"
                            className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-black transition-colors"
                        >
                            New Scan
                        </Link>
                        <form
                            action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/login" });
                            }}
                        >
                            <button
                                type="submit"
                                className="flex items-center space-x-1 text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="hidden sm:inline">Sign Out</span>
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Main Area */}
            <main className="grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
                {/* Header Welcome and CTA */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-5">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                            Resumes
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Welcome back, {userName}.
                        </p>
                    </div>
                    <Link
                        href="/scan/new"
                        className="bg-black hover:bg-slate-900 text-white font-semibold text-sm py-2 px-4 rounded-lg shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        <span>New Scan</span>
                    </Link>
                </div>

                {/* Dashboard List Section */}
                {scans.length > 0 ? (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-500 font-medium">
                            You have {scans.length} resume {scans.length === 1 ? 'scan' : 'scans'} analyzed:
                        </p>
                        
                        <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden divide-y divide-slate-100">
                            {scans.map((item, index) => (
                                <Link
                                    key={item._id.toString()}
                                    href={`/dashboard/scans/${item._id.toString()}`}
                                    className="group flex items-center justify-between p-4 hover:bg-slate-50 transition-all cursor-pointer"
                                >
                                    <div className="flex items-center space-x-3.5 min-w-0">
                                        <div className="p-2 bg-slate-50 group-hover:bg-slate-100 rounded-lg text-slate-400 group-hover:text-black transition-colors shrink-0">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-sm text-slate-800 group-hover:text-black transition-colors truncate">
                                                {userName}'s Resume {scans.length > 1 ? `#${scans.length - index}` : ''}
                                            </h3>
                                            <div className="flex items-center space-x-1 text-xs text-slate-400 mt-0.5">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{formatDate(item.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-slate-300 group-hover:text-black transition-colors pl-4 shrink-0">
                                        <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Empty State */
                    <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center shadow-xs max-w-md mx-auto flex flex-col items-center">
                        <div className="p-3 bg-slate-50 rounded-xl text-slate-400 mb-4">
                            <FileText className="h-6 w-6" />
                        </div>
                        <h3 className="text-base font-bold text-black mb-1">
                            No resumes uploaded yet
                        </h3>
                        <p className="text-xs text-slate-500 max-w-xs mb-6 leading-relaxed">
                            Start by running a compatibility scan against a target job description.
                        </p>
                        <Link
                            href="/scan/new"
                            className="bg-black hover:bg-slate-900 text-white font-semibold text-xs py-2.5 px-4 rounded-lg transition-all shadow-xs cursor-pointer"
                        >
                            Upload & Scan Resume
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}