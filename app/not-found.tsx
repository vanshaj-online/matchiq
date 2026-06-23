import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | MatchIQ",
  description: "The page or document resource you requested could not be located in our system archives.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="paper-card p-8 sm:p-12 max-w-md w-full text-center animate-fadeIn space-y-6">

          {/* Tactile Stamp & Icon */}
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full  text-paper-muted">
              <FileQuestion className="h-6 w-6 text-paper-ink" />
            </div>

            <div className="paper-stamp text-xs tracking-[0.2em] font-mono border-paper-danger text-paper-danger font-semibold">
              404 / NOT_FOUND
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="paper-display text-2xl sm:text-3xl font-bold tracking-tight text-paper-ink">
              Page Not Found
            </h1>
            <p className="text-sm text-paper-muted leading-relaxed">
              We couldn't find the page you're looking for. It might have been moved, deleted, or the address might be typed incorrectly.
            </p>
          </div>

          <hr className="paper-divider" />

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/"
              className="paper-btn paper-btn-primary flex items-center justify-center gap-2 text-xs"
            >
              Return Home
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
