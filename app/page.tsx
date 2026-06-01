"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, Fragment } from "react";

const arcSteps = [
  { num: 1, label: "Fear" },
  { num: 2, label: "Fascination" },
  { num: 3, label: "Familiarity" },
  { num: 4, label: "Food" },
];

function EmotionalArc() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % 4), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="flex items-start w-full max-w-xs sm:max-w-sm mx-auto py-10 sm:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      {arcSteps.map((step, i) => (
        <Fragment key={step.num}>
          <div className="flex flex-col items-center gap-1.5 z-10">
            <motion.div
              animate={{
                backgroundColor: i === active ? "#7CC4A2" : "#E5EFE9",
                scale: i === active ? 1.18 : 1,
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ color: i === active ? "#fff" : "rgba(13,43,25,0.35)" }}
            >
              {step.num}
            </motion.div>
            <span
              className="text-[10px] sm:text-xs font-medium text-center leading-tight transition-colors duration-300 max-w-[52px] sm:max-w-none"
              style={{ color: i === active ? "#0D2B19" : "rgba(13,43,25,0.35)" }}
            >
              {step.label}
            </span>
          </div>
          {i < arcSteps.length - 1 && (
            <div className="flex-1 border-t-2 border-dashed border-[#C8E2D4] mt-4 mx-1" />
          )}
        </Fragment>
      ))}
    </motion.div>
  );
}

type Feature = {
  icon: string;
  hoverIcon: string;
  iconSize: number;
  hoverIconSize: number;
  frameMs: number;
  title: string;
  description: string;
  href: string;
  accent: string;
};

const features: Feature[] = [
  {
    icon: "/icons/bug_basic.svg",
    hoverIcon: "/icons/bug_hover.svg",
    iconSize: 110,
    hoverIconSize: 110,
    frameMs: 200,
    title: "Bug Quiz",
    description: "Find your spirit bug and recipes that match your comfort level.",
    href: "/quiz",
    accent: "bg-[#EEF7F2]",
  },
  {
    icon: "/icons/bug_worldmap.svg",
    hoverIcon: "/icons/bug_worldmap_hover.svg",
    iconSize: 110,
    hoverIconSize: 148,
    frameMs: 420,
    title: "World Map",
    description: "Explore how cultures worldwide have eaten insects for centuries.",
    href: "/map",
    accent: "bg-[#FBF0D2]",
  },
  {
    icon: "/icons/bug_cooking.svg",
    hoverIcon: "/icons/bug_cooking_hover.svg",
    iconSize: 110,
    hoverIconSize: 110,
    frameMs: 380,
    title: "Bug Kitchen",
    description: "Cook recipes tailored to your taste — from cricket flour to whole roasted.",
    href: "/kitchen",
    accent: "bg-[#FFF0E8]",
  },
];

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!hovered) {
      setFrame(0);
      return;
    }
    const interval = setInterval(() => setFrame((f) => (f === 0 ? 1 : 0)), feature.frameMs);
    return () => clearInterval(interval);
  }, [hovered, feature.frameMs]);

  const currentIcon = frame === 1 ? feature.hoverIcon : feature.icon;
  const displaySize = frame === 1 ? feature.hoverIconSize : feature.iconSize;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        href={feature.href}
        className="group block bg-white border border-[#C8E2D4] rounded-2xl overflow-hidden h-full transition-all hover:-translate-y-1 hover:shadow-md"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Illustration area */}
        <div className={`flex items-center justify-center ${feature.accent} h-36 px-8 py-4`}>
          <Image
            src={currentIcon}
            alt={feature.title}
            width={displaySize}
            height={displaySize}
            className="object-contain drop-shadow-sm"
          />
        </div>
        {/* Text */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2 text-[#0D2B19]">
            {feature.title}
          </h2>
          <p className="text-[#0D2B19]/60 leading-relaxed text-sm">
            {feature.description}
          </p>
          <div className="mt-5 text-sm font-semibold text-[#2A7D50] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            Explore →
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="px-8 pt-8 pb-24 max-w-5xl mx-auto">
      {/* Hero */}
      <section className="pt-8 pb-4 sm:py-24 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#2A7D50] mb-4 sm:mb-6">
            From Fear to Fork
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-5 sm:mb-8 text-[#0D2B19]">
            Eat bugs.<br />
            Save the planet.<br />
            <span className="text-[#2A7D50]">Have fun.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#0D2B19]/70 max-w-xl mx-auto leading-relaxed mb-7 sm:mb-10">
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
              className="inline-block bg-[#2A7D50] text-white text-base font-bold px-10 py-4 rounded-[10px] transition-all hover:bg-[#1F6040] shadow-sm hover:shadow-lg"
            >
              Take the Bug Quiz →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Emotional arc */}
      <EmotionalArc />

      {/* Feature cards */}
      <section className="mt-8 sm:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.href} feature={feature} delay={0.3 + i * 0.1} />
          ))}
        </div>
      </section>
    </main>
  );
}
