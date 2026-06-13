import { auth } from '@/auth'
import PrimaryBtn from './PrimaryBtn';

async function Navbar() {
    const session = await auth();
    return (
        <header className="border-b border-paper-rule/70">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="paper-stamp">M·IQ</div>
                </div>
                <nav className="flex items-center gap-6 text-sm">
                    <a href="#how" className="text-[#444444] font-medium hover:text-black transition-colors duration-300">How it works</a>
                    <a href="#features" className="text-[#444444] font-medium hover:text-black transition-colors duration-300">Features</a>
                    {session?.user ? (
                        <PrimaryBtn type="dashboard">Dashboard</PrimaryBtn>
                    ) : (
                        <PrimaryBtn type="login">Sign In</PrimaryBtn>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar