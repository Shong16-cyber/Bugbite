"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    icon: "/icons/bug_basic.svg",
    title: "Bug Quiz",
    description: "Find your spirit bug and recipes that match your comfort level.",
    href: "/quiz",
    accent: "bg-[#C6F6D5]",
  },
  {
    icon: "/icons/bug_worldmap.svg",
    title: "World Map",
    description: "Explore how cultures worldwide have eaten insects for centuries.",
    href: "/map",
    accent: "bg-[#FEFCBF]",
  },
  {
    icon: "/icons/bug_cooking.svg",
    title: "Bug Kitchen",
    description: "Cook recipes tailored to your taste — from cricket flour to whole roasted.",
    href: "/kitchen",
    accent: "bg-[#FED7AA]",
  },
];

export default function Home() {
  return (
    <main className="px-8 pt-8 pb-24 max-w-5xl mx-auto">
      {/* Hero */}
      <section className="py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#48BB78] mb-6">
            From Fear to Fork
          </p>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 text-[#1A3A2A]">
            Eat bugs.<br />
            Save the planet.<br />
            <span className="text-[#48BB78]">Have fun.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#1A3A2A]/70 max-w-xl mx-auto leading-relaxed mb-10">
            Insects are the most sustainable protein on Earth. We&apos;ll help you get from
            &quot;no way&quot; to &quot;okay, maybe one bite&quot; — gently.
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <Link
              href="/quiz"
              className="inline-block bg-[#1A3A2A] text-[#F0FFF4] text-base font-bold px-10 py-4 rounded-full transition-all hover:bg-[#48BB78] shadow-sm hover:shadow-lg"
            >
              Take the Bug Quiz →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Emotional arc */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-8 text-sm font-medium text-[#1A3A2A]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span>Fear</span>
        <span className="text-[#48BB78]">→</span>
        <span>Fascination</span>
        <span className="text-[#48BB78]">→</span>
        <span>Familiarity</span>
        <span className="text-[#48BB78]">→</span>
        <span className="font-bold text-[#48BB78]">Food</span>
      </motion.div>

      {/* Feature cards */}
      <section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <Link
                href={feature.href}
                className="group block bg-white rounded-3xl p-7 h-full transition-all hover:-translate-y-1 hover:shadow-xl shadow-sm"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.accent} flex items-center justify-center mb-5`}>
                  <Image src={feature.icon} alt={feature.title} width={32} height={32} />
                </div>
                <h2 className="text-xl font-bold mb-2 text-[#1A3A2A]">
                  {feature.title}
                </h2>
                <p className="text-[#1A3A2A]/60 leading-relaxed text-sm">
                  {feature.description}
                </p>
                <div className="mt-6 text-sm font-semibold text-[#48BB78] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
