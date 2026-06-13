import { auth } from "@/auth";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const session = await auth();

  return (
    <main>

      <Navbar />

      <HeroSection session={session} />

      <HowItWorks />

      <Features />

      <CTASection session={session} />

      <Footer />

    </main>
  );
}
