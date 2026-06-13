type TStep = {
    n: string;
    t: string;
    d: string;
}

const steps: TStep[] = [
    {
        n: "01",
        t: "Upload résumé",
        d: "PDF, DOCX, or plain text. We parse it once and keep it filed.",
    },
    {
        n: "02",
        t: "Paste the JD",
        d: "Any job description, any length. Pasted text or a public URL.",
    },
    {
        n: "03",
        t: "Read the verdict",
        d: "Score, strengths, gaps, and rewrites — typed like a memo.",
    },
]

function HowItWorks() {
    return (
        <section id="how" className="px-6 min-h-screen flex items-center border-t border-paper-rule/70">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-end justify-between flex-wrap gap-4">
                    <div>
                        <span className="paper-label">Section · 02</span>
                        <h2 className="paper-display text-4xl sm:text-5xl font-bold tracking-tight mt-2">
                            Three steps. <span className="text-paper-secondary">One memo.</span>
                        </h2>
                        <p className="max-w-sm mt-6 text-sm text-paper-muted">
                            No onboarding sequence. No setup wizard. Upload, paste, and read.
                        </p>
                    </div>
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    {steps.map((s) => (
                        <div key={s.n} className="paper-sheet p-7">
                            <div className="flex items-center justify-between">
                                <span className="paper-display text-4xl font-bold">{s.n}</span>
                            </div>
                            <hr className="paper-divider my-5" />
                            <h3 className="paper-display text-xl font-bold">{s.t}</h3>
                            <p className="mt-2 text-sm text-paper-muted leading-relaxed">
                                {s.d}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks