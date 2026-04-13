import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
