"use client";
import { useState } from "react";

export default function JDModal({ text }: { text: string }) {

    const [showJD, setShowJD] = useState<boolean>(false)

    return (
        <>
            <button onClick={() => {
                setShowJD(true)
                console.log(showJD)
            }} className="mono text-paper-muted hover:bg-neutral-200/70 absolute top-4 right-6 uppercase text-xs z-50 tracking-wider hover:text-paper-ink transition-colors py-1.5 px-2 rounded-sm cursor-pointer">View Job Description</button>



            {showJD && (
                <div className="fixed top-0 left-0 z-50 bg-black/20 min-h-screen w-full flex items-center justify-center backdrop-blur-xs animate-fadeIn">
                    <div className="bg-white border border-paper-rule p-10 max-w-2xl rounded-md relative">
                        <h1 className="paper-display text-xl font-bold text-paper-ink mt-2 mb-2">Job Description</h1>
                        <p className="text-[15px] text-paper-ink leading-loose max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 transition-colors duration-300 pr-2 whitespace-pre-line">{text}</p>
                        <button onClick={() => setShowJD(false)} className="absolute right-2 top-2 tracking-wide mono uppercase hover:text-paper-danger text-paper-danger/70 cursor-pointer p-1.5 text-xs">Close</button>
                    </div>
                </div>
            )}

        </>
    )
}