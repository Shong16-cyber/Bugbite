import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BugBite - From Fear to Fork",
  description: "A gamified journey from insect-phobia to insect-foodie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} min-h-screen bg-[#F0FFF4] text-[#1A3A2A]`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
