function Features() {
    return (
        <section id="features" className="px-6 flex min-h-screen items-center border-t border-paper-rule/70">
            <div className="max-w-6xl mx-auto flex flex-col gap-10">
                <div className="lg:col-span-4">
                    <span className="paper-label">Section · 03</span>
                    <h2 className="paper-display text-4xl sm:text-5xl font-bold tracking-tight mt-2">
                        What the&nbsp;
                        <span className="text-paper-secondary">reader sees.</span>
                    </h2>
                    <p className="mt-5 text-sm text-paper-muted leading-relaxed max-w-sm">
                        Each scan is filed as a numbered report. Open one to read your
                        printed diagnostic.
                    </p>
                </div>

                <div className="grid sm:grid-cols-4 gap-5">
                    {[
                        {
                            t: "Keyword ledger",
                            d: "Every required term, present or absent, listed in mono.",
                        },
                        {
                            t: "Strength column",
                            d: "Concrete bullets the JD already rewards, pulled verbatim.",
                        },
                        {
                            t: "Rewrite slips",
                            d: "Suggested bullet rewrites in the margin, ready to paste.",
                        },
                        {
                            t: "Archive index",
                            d: "Past scans indexed by date, role, and verdict band.",
                        },
                    ].map((f, i) => (
                        <div
                            key={f.t}
                            className="border paper-sheet  flex items-center justify-between flex-col border-paper-rule bg-paper-cream-soft p-8"
                        >
                            <div className="paper-display text-3xl text-center w-full font-bold">0{i + 1}</div>
                            <hr className="paper-divider w-full my-6" />
                            <div className="">
                                <h4 className="paper-display text-xl text-center font-semibold">{f.t}</h4>
                                <p className="mt-2 text-paper-muted text-sm leading-relaxed text-center">
                                    {f.d}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features