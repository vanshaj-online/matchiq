import React from "react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex flex-col animate-fadeIn">
      {/* Top masthead */}
      <header className="sticky top-0 z-50 border-b border-(--color-paper-rule) bg-paper-cream w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="paper-stamp uppercase text-paper-muted opacity-50">
            M·IQ
          </div>
          <div className="flex items-center gap-3">
            <div className="w-20 h-8 bg-neutral-200/60 rounded-sm animate-pulse" />
          </div>
        </div>
      </header>

      <main className="grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        {/* Masthead */}
        <div className="pb-6 border-b border-(--color-paper-rule) border-dashed">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="h-10 w-64 bg-neutral-200/60 rounded-sm animate-pulse mt-2" />
              <div className="h-4 w-40 bg-neutral-200/60 rounded-sm animate-pulse mt-4" />
            </div>
            <div className="w-36 h-10 bg-neutral-200/60 rounded-sm animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="h-4 w-24 bg-neutral-200/60 rounded-sm animate-pulse" />
          </div>

          <ul className="paper-sheet divide-y divide-paper-hairline">
            {[1, 2, 3].map((idx) => (
              <li key={idx}>
                <div className="flex justify-between items-center w-full p-5">
                  <div className="flex items-center min-w-0 w-full">
                    {/* Index number skeleton */}
                    <div className="w-10 shrink-0">
                      <div className="h-4 w-4 bg-neutral-200/60 rounded-sm animate-pulse" />
                    </div>

                    <div className="flex gap-6 w-full items-start flex-col sm:flex-row">
                      <div className="space-y-3 w-full">
                        {/* Title and Date skeletons */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full">
                          <div className="h-5 w-1/3 bg-neutral-200/60 rounded-sm animate-pulse" />
                          <div className="h-3 w-24 bg-neutral-200/60 rounded-sm animate-pulse" />
                        </div>
                        
                        {/* Score and Verdict skeleton */}
                        <div className="h-4 w-48 bg-neutral-200/60 rounded-sm animate-pulse mt-2" />
                      </div>
                    </div>
                  </div>
                  {/* Delete button skeleton */}
                  <div className="w-8 h-8 bg-neutral-200/60 rounded-sm animate-pulse shrink-0 ml-4" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
