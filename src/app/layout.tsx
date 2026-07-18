import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { Providers } from "@/components/Providers";
import { MobileNav } from "@/components/MobileNav";
import PushNotificationInit from "@/components/PushNotificationInit";

export const metadata: Metadata = {
  title: "Kampus KonnectSA – AI-Powered Education & Career Platform",
  description:
    "Your AI guide to South African universities, bursaries, NSFAS, jobs, internships, learnerships and careers.",
  manifest: "/manifest.json",
  applicationName: "Kampus KonnectSA",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kampus KonnectSA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0066FF",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-kk-navy antialiased">
        <Providers>
          <Navbar />
          {/* pb for mobile bottom nav clearance */}
          <main className="relative pb-20 lg:pb-0">{children}</main>
          <Footer />
          <ChatWidget />
          <MobileNav />
          <PushNotificationInit />
        </Providers>
          <Analytics />
  </body>
    </html>
  );
}
