"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Quiz", href: "/quiz" },
  { label: "World Map", href: "/map" },
  { label: "Kitchen", href: "/kitchen" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);

  return (
    <nav className="w-full px-8 py-6 flex items-center justify-between max-w-6xl mx-auto">
      <Link
        href="/"
        className="flex items-center gap-2 group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={hovered ? "/icons/bug_hover.svg" : "/icons/bug_basic.svg"}
          alt="BugBite logo"
          width={32}
          height={32}
          className="transition-transform group-hover:-rotate-12"
        />
        <span className="text-xl font-bold tracking-tight text-[#0D2B19]">
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
                    ? "bg-[#0D2B19] text-[#FAFFF7]"
                    : "text-[#0D2B19]/70 hover:text-[#0D2B19] hover:bg-white/60"
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
