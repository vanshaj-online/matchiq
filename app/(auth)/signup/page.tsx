"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Signup failed.");
                return;
            }

            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/dashboard",
            });
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
                        Create an account
                    </h1>
                    <p className="text-sm text-[#6B7280] mt-1" style={{ fontFamily: "var(--font-body)" }}>
                        Start analyzing your resume today
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
                                htmlFor="name"
                                className="block text-xs font-semibold text-[#374151] mb-1.5"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                                className="w-full"
                            />
                        </div>

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
                            {loading ? "Creating account…" : "Create Account"}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-[#9CA3AF] mt-5" style={{ fontFamily: "var(--font-body)" }}>
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#111111] font-semibold underline underline-offset-2 hover:text-[#374151]">
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}