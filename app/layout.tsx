import type { Metadata } from "next";
import { DM_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-accent",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bugbite-sigma.vercel.app"),
  title: "BugBite - From Fear to Fork",
  description: "A gamified journey from insect-phobia to insect-foodie",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "BugBite - From Fear to Fork",
    description: "A gamified journey from insect-phobia to insect-foodie",
    url: "https://bugbite-sigma.vercel.app",
    siteName: "BugBite",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "BugBite",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BugBite - From Fear to Fork",
    description: "A gamified journey from insect-phobia to insect-foodie",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,600,500,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${dmSans.variable} ${fraunces.variable} ${jetbrainsMono.variable} min-h-screen bg-[#FAFFF7] text-[#0D2B19]`}
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        <header className="sticky top-0 z-40 bg-[#FAFFF7]/90 backdrop-blur-md">
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
