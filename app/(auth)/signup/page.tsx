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
      await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="paper-label">MatchIQ · enrollment</span>
          <h1 className="paper-display text-3xl font-extrabold mt-2 text-[var(--color-paper-ink)]">
            Open a new ATS Report
          </h1>
          <p className="text-sm text-[var(--color-paper-muted)] mt-1">
            Three fields. One signature. You're in.
          </p>
        </div>

        <div className="paper-sheet p-6">
          <div className="flex items-center justify-between mb-5">
            <span className="paper-label">Form · 02</span>
            <span className="paper-label">new entry</span>
          </div>

          {error && (
            <div className="mb-4 px-3 py-2.5 border border-[var(--color-paper-danger)] bg-[#fdecec] text-[var(--color-paper-danger)] text-xs paper-mono rounded-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="paper-label block mb-1.5">Full name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="email" className="paper-label block mb-1.5">Email address</label>
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
              <label htmlFor="password" className="paper-label block mb-1.5">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="paper-btn paper-btn-primary w-full mt-2"
            >
              {loading ? "Filing…" : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[var(--color-paper-muted)] mt-5 paper-body">
          Already enrolled?{" "}
          <Link href="/login" className="text-[var(--color-paper-ink)] font-semibold underline underline-offset-4 decoration-dotted">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
