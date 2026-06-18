import type { Metadata } from "next";
import { Montserrat, Roboto, PT_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const ptMono = PT_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MatchIQ",
  description: "AI powered ATS resume analyzer that compares resumes against job descriptions and provides actionable insights.",
  verification: {
    google: '8pbaWqdqDMvPeJm6Gh7poItvAS00o-xsUgoMCsTNZ40'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${roboto.variable} ${ptMono.variable} h-full antialiased`}
      style={{
        scrollBehavior: 'smooth'
      }}
    >
      <body className="min-h-full flex flex-col">
        <NextTopLoader
          color="#c2410c"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px rgba(194, 65, 12, 0.5), 0 0 5px rgba(194, 65, 12, 0.5)"
        />
        {children}
      </body>
    </html>
  );
}
