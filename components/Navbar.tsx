"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Quiz", href: "/quiz" },
  { label: "World Map", href: "/map" },
  { label: "Kitchen", href: "/kitchen" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full px-8 py-6 flex items-center justify-between max-w-6xl mx-auto">
      <Link href="/" className="flex items-center gap-2 group">
        <span className="text-2xl transition-transform group-hover:-rotate-12">🐛</span>
        <span className="text-xl font-bold tracking-tight text-[#1A3A2A]">
          BugBite
        </span>
      </Link>
      <ul className="flex gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  active
                    ? "bg-[#1A3A2A] text-[#F0FFF4]"
                    : "text-[#1A3A2A]/70 hover:text-[#1A3A2A] hover:bg-white/60"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
