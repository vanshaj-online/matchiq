import { ArrowRight } from "lucide-react";
import Link from "next/link";

type BtnType = "dashboard" | "signup" | "login" | "scan"

function PrimaryBtn({ children, type }: { children: React.ReactNode, type: BtnType }) {
    return (
        <Link href={type === "dashboard" ? "/dashboard" : type === "signup" ? "/signup" : type === "scan" ? "/scan/new" : "/login"} className="py-2.5 px-3.5 flex gap-2.5 bg-black text-white items-center justify-center max-w-xs rounded-sm hover:bg-neutral-800 transition-colors duration-200">
            {children} <ArrowRight className="h-4 w-4" />
        </Link>
    )
}

export default PrimaryBtn