"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Quiz", href: "/quiz" },
  { label: "World Map", href: "/map" },
  { label: "Kitchen", href: "/kitchen" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between max-w-6xl mx-auto relative">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setMenuOpen(false)}
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

      {/* Desktop nav */}
      <ul className="hidden sm:flex gap-1">
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

      {/* Mobile hamburger button */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <motion.span
          animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          className="block w-6 h-0.5 bg-[#0D2B19] rounded-full origin-center"
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          className="block w-6 h-0.5 bg-[#0D2B19] rounded-full"
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          className="block w-6 h-0.5 bg-[#0D2B19] rounded-full origin-center"
          transition={{ duration: 0.2 }}
        />
      </button>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden absolute top-full left-0 right-0 bg-[#FAFFF7] border-b border-[#C8E2D4] shadow-sm z-50 px-6 py-4 flex flex-col gap-1"
          >
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-[#0D2B19] text-[#FAFFF7]"
                      : "text-[#0D2B19]/70 hover:text-[#0D2B19] hover:bg-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
