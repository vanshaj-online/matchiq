import { ArrowRight } from "lucide-react";
import Link from "next/link";

type BtnType = "dashboard" | "signup" | "login" | "scan"

function PrimaryBtn({ children, type }: { children: React.ReactNode, type: BtnType }) {
    return (
        <Link href={type === "dashboard" ? "/dashboard" : type === "signup" ? "/signup" : type === "scan" ? "/scan/new" : "/login"} className="paper-btn paper-btn-primary">
            {children} <ArrowRight className="h-4 w-4" />
        </Link>
    )
}

export default PrimaryBtn