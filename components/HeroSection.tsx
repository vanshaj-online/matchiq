import PrimaryBtn from "./PrimaryBtn";
import { CheckCircle2 } from "lucide-react";


function HeroSection({ session }: { session: any }) {
    return (
        <section className="px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10  min-h-[calc(100vh-80px)] items-center">
                {/* Left — masthead */}
                <div className="lg:col-span-7">
                    <span className="paper-label">Resume · Job Description · Analysis</span>
                    <h1 className="paper-display text-6xl sm:text-7xl font-bold tracking-tight leading-[0.92] mt-4">
                        Read your <br className="hidden md:block" /> match,<span className="text-paper-secondary"> in print.</span>
                    </h1>
                    <hr className="paper-divider my-8" />
                    <p className="max-w-xl text-[17px] leading-relaxed text-paper-muted">
                        MatchIQ reads your resume against any job description and returns a
                        verdict. Just a quiet memo telling you what to fix.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        {session?.user ? (
                            <PrimaryBtn type="dashboard" >Get your verdict</PrimaryBtn>
                        ) : (
                            <PrimaryBtn type="signup" >Get started</PrimaryBtn>
                        )}
                    </div>

                </div>

                {/* Right — sample verdict sheet */}
                <div className="lg:col-span-5">
                    <div className="paper-sheet p-8 relative">
                        <div className="flex items-center justify-between">
                            <span className="paper-label"> Verdict</span>
                            <span className="paper-label">06 / 11 / 26</span>
                        </div>

                        <div className="mt-6 flex items-baseline gap-3">
                            <span className="paper-display text-7xl font-bold tracking-tight">
                                87
                            </span>
                            <span className="paper-display text-2xl text-paper-muted">
                                / 100
                            </span>
                        </div>
                        <div className="mt-2 paper-stamp inline-block text-green-400">STRONG MATCH</div>

                        <hr className="paper-divider my-6" />

                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-4 w-4 mt-[3px] shrink-0" />
                                <span>
                                    Title alignment — <em>Senior Product Designer</em> ↔ role
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-4 w-4 mt-[3px] shrink-0" />
                                <span>11 of 14 required keywords present</span>
                            </li>
                            <li className="flex items-start gap-3 text-paper-danger">
                                <span className="font-mono text-xs mt-[3px]">[ ! ]</span>
                                <span>
                                    Missing: <span className="font-mono">design systems</span>,{" "}
                                    <span className="font-mono">a/b testing</span>
                                </span>
                            </li>
                        </ul>

                        <hr className="paper-divider my-6" />
                        <div className="flex items-center justify-between paper-label">
                            <span>Reader · M.IQ</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection

