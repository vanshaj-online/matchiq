import { Mail } from "lucide-react";
import Link from 'next/link';
import Logo from './Logo';

function Footer() {
    return (
        <footer className="border-t border-paper-rule/70 px-6 py-10">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 paper-label">
                <div className="flex items-center gap-3">
                    <Link href="/" className="hover:opacity-90 transition-opacity">
                        <Logo />
                    </Link>
                    <span>© 2026</span>
                </div>
                <div className="flex items-center gap-5">
                    <a href="mailto:singhvanshaj09@gmail.com" className="hover:underline underline-offset-4 inline-flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" /> singhvanshaj09@gmail.com
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer