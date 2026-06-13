import PrimaryBtn from "./PrimaryBtn";

function CTASection({ session }: { session: any }) {
    return (
        <section className="px-6 min-h-screen flex items-center w-full border-t border-paper-rule/70">
            <div className="max-w-4xl mx-auto paper-sheet p-12 sm:p-16 text-center relative h-max w-full">

                <span className="paper-label"></span>
                <h2 className="paper-display text-5xl sm:text-6xl font-bold tracking-tight mt-3">
                    File your first
                    <span className="block text-paper-secondary">scan today.</span>
                </h2>
                <p className="mt-5 max-w-md mx-auto text-paper-muted">
                    Free to begin. No card, no clutter. Open an account and run a
                    résumé through the press.
                </p>
                <div className="mt-8 flex justify-center gap-3 flex-wrap">
                    {session?.user ? (
                        <PrimaryBtn type="scan">Start a new scan</PrimaryBtn>
                    ) : (
                        <PrimaryBtn type="signup">Get started</PrimaryBtn>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CTASection