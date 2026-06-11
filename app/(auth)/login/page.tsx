'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (result?.error) {
                setError("Invalid email or password.");
            } else {
                window.location.href = "/dashboard";
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                {/* Brand Mark */}
                <div className="mb-8 text-center">
                    <span
                        className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-[#6B7280] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        MatchIQ
                    </span>
                    <h1
                        className="text-2xl font-bold text-[#111111]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Welcome back
                    </h1>
                    <p className="text-sm text-[#6B7280] mt-1" style={{ fontFamily: "var(--font-body)" }}>
                        Sign in to your account
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-[#E5E7EB] rounded-md p-6">
                    {error && (
                        <div className="mb-4 px-3 py-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded text-xs text-[#DC2626]">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-xs font-semibold text-[#374151] mb-1.5"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-xs font-semibold text-[#374151] mb-1.5"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="paper-btn paper-btn-primary w-full mt-2"
                        >
                            {loading ? "Signing in…" : "Sign In"}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-[#9CA3AF] mt-5" style={{ fontFamily: "var(--font-body)" }}>
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-[#111111] font-semibold underline underline-offset-2 hover:text-[#374151]">
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    );
}
