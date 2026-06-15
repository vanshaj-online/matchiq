import React from "react";

export default function ScanResultLoading() {
  return (
    <div className="min-h-screen relative animate-fadeIn">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-paper-cream/85 backdrop-blur-md border-b border-paper-rule">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-paper-ink px-2 py-1 paper-stamp uppercase text-xs tracking-[0.18em] opacity-50">
            M·IQ
          </div>
          <div className="w-24 h-8 bg-neutral-200/60 rounded-sm animate-pulse" />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-10">
        {/* Top Verdict Section Skeleton */}
        <section className="paper-sheet p-8 sm:p-10 relative overflow-hidden">
          {/* Modal button placeholder */}
          <div className="absolute top-4 right-6 w-32 h-8 bg-neutral-200/60 rounded-sm animate-pulse" />
          <div className="absolute top-4 left-6 paper-label opacity-50">
            Report
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8 relative">
            <div className="text-center sm:text-left space-y-4 w-full sm:w-auto">
              <div className="h-6 w-28 bg-neutral-200/60 rounded-sm animate-pulse mx-auto sm:mx-0" />
              <div className="space-y-2">
                <div className="h-10 w-56 bg-neutral-200/60 rounded-sm animate-pulse mx-auto sm:mx-0" />
                <div className="h-10 w-40 bg-neutral-200/60 rounded-sm animate-pulse mx-auto sm:mx-0" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto sm:mx-0">
                <div className="h-4 w-full bg-neutral-200/60 rounded-sm animate-pulse" />
                <div className="h-4 w-5/6 bg-neutral-200/60 rounded-sm animate-pulse" />
              </div>
            </div>

            {/* Circular Progress Skeleton */}
            <div className="relative shrink-0 flex items-center justify-center w-32 h-32 rounded-full border-4 border-neutral-200/60 animate-pulse">
              <div className="flex flex-col items-center justify-center">
                <div className="h-8 w-12 bg-neutral-200/60 rounded-sm animate-pulse" />
                <div className="h-3 w-8 bg-neutral-200/60 rounded-sm animate-pulse mt-1" />
              </div>
            </div>
          </div>
        </section>

        {/* Sub-metrics Section Skeleton */}
        <section>
          <div className="flex items-center justify-between mb-4 flex-wrap">
            <div className="h-4 w-20 bg-neutral-200/60 rounded-sm animate-pulse" />
            <div className="h-4 w-24 bg-neutral-200/60 rounded-sm animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="paper-sheet p-5 flex flex-col gap-3">
                <div className="h-4 w-28 bg-neutral-200/60 rounded-sm animate-pulse" />
                <div className="flex items-baseline gap-1">
                  <div className="h-8 w-12 bg-neutral-200/60 rounded-sm animate-pulse" />
                  <span className="paper-mono text-xs text-paper-muted">/100</span>
                </div>
                <div className="h-3 w-full bg-neutral-200/60 rounded-sm animate-pulse" />
                <div className="w-full h-[3px] bg-paper-hairline mt-1" />
              </div>
            ))}
          </div>
        </section>

        {/* Strengths & Missing Keywords Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-6">
            {/* Strengths Card */}
            <div className="paper-sheet p-6 space-y-4">
              <div className="h-4 w-20 bg-neutral-200/60 rounded-sm animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="h-4 w-4 bg-neutral-200/60 rounded-sm animate-pulse shrink-0" />
                    <div className="h-4 w-full bg-neutral-200/60 rounded-sm animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Wins Card */}
            <div className="paper-sheet p-6 space-y-4">
              <div className="h-4 w-24 bg-neutral-200/60 rounded-sm animate-pulse" />
              <div className="space-y-3">
                {[1, 2].map((idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="h-4 w-4 bg-neutral-200/60 rounded-sm animate-pulse shrink-0" />
                    <div className="h-4 w-full bg-neutral-200/60 rounded-sm animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Missing Keywords Card */}
          <div className="lg:col-span-7 paper-sheet p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-32 bg-neutral-200/60 rounded-sm animate-pulse" />
              <div className="h-4 w-16 bg-neutral-200/60 rounded-sm animate-pulse" />
            </div>
            <div className="h-3 w-5/6 bg-neutral-200/60 rounded-sm animate-pulse" />

            <div className="space-y-4 pt-4 border-t border-paper-hairline">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="flex justify-between items-center py-2">
                  <div className="flex gap-2">
                    <div className="h-6 w-20 bg-neutral-200/60 rounded-sm animate-pulse" />
                    <div className="h-6 w-16 bg-neutral-200/60 rounded-sm animate-pulse" />
                  </div>
                  <div className="h-4 w-4 bg-neutral-200/60 rounded-sm animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
