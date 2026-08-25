import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./sport.css";
import "@/components/TransitionProvider/TransitionLoader.css";
import SmoothScroll from "@/components/SmoothScroll";
import { TransitionProvider } from "@/components/TransitionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "VP Associates — Construction, Catering & Sports Grounds",
  description:
    "VP Associates offers dependable civil construction, professional manpower supply, tailored event catering, and well-maintained cricket grounds across Chennai.",
  keywords: [
    "VP Associates",
    "Civil Construction Chennai",
    "Manpower Supply",
    "Event Catering Chennai",
    "Cricket Ground Booking",
    "Sports Turf Chennai",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "VP Associates — Construction, Catering & Sports Grounds",
    description:
      "VP Associates offers dependable civil construction, professional manpower supply, tailored event catering, and well-maintained cricket grounds across Chennai.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Caveat:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=Oswald:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TransitionProvider>
          <SmoothScroll>
            <Navbar />
            <div className="page-wrapper min-h-screen">
              {children}
            </div>
            <Footer />
          </SmoothScroll>
        </TransitionProvider>
      </body>
    </html>
  );
}
