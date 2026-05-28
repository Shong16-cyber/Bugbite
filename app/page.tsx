"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Feature = {
  icon: string;
  hoverIcon?: string;
  hoverAnim?: "wiggle" | "spin" | "bounce";
  title: string;
  description: string;
  href: string;
  accent: string;
};

const features: Feature[] = [
  {
    icon: "/icons/bug_basic.svg",
    hoverIcon: "/icons/bug_hover.svg",
    title: "Bug Quiz",
    description: "Find your spirit bug and recipes that match your comfort level.",
    href: "/quiz",
    accent: "bg-[#EEF7F2]",
  },
  {
    icon: "/icons/bug_worldmap.svg",
    hoverAnim: "wiggle",
    title: "World Map",
    description: "Explore how cultures worldwide have eaten insects for centuries.",
    href: "/map",
    accent: "bg-[#FBF0D2]",
  },
  {
    icon: "/icons/bug_cooking.svg",
    hoverAnim: "bounce",
    title: "Bug Kitchen",
    description: "Cook recipes tailored to your taste — from cricket flour to whole roasted.",
    href: "/kitchen",
    accent: "bg-[#FFF0E8]",
  },
];

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [frame, setFrame] = useState(0);

  // 2-frame sprite animation for cards with a hoverIcon
  useEffect(() => {
    if (!hovered || !feature.hoverIcon) {
      setFrame(0);
      return;
    }
    const interval = setInterval(() => setFrame((f) => (f === 0 ? 1 : 0)), 200);
    return () => clearInterval(interval);
  }, [hovered, feature.hoverIcon]);

  const currentIcon =
    feature.hoverIcon && frame === 1 ? feature.hoverIcon : feature.icon;

  const wiggleVariants = {
    rest: { rotate: 0 },
    hover: {
      rotate: [0, -12, 12, -8, 8, -4, 4, 0] as number[],
      transition: { duration: 0.6, type: "tween" as const },
    },
  };

  const bounceVariants = {
    rest: { y: 0 },
    hover: {
      y: [0, -10, 0, -6, 0] as number[],
      transition: { duration: 0.5, type: "tween" as const },
    },
  };

  const motionVariant =
    feature.hoverAnim === "wiggle"
      ? wiggleVariants
      : feature.hoverAnim === "bounce"
      ? bounceVariants
      : null;

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
          {motionVariant ? (
            <motion.div
              variants={motionVariant}
              animate={hovered ? "hover" : "rest"}
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={110}
                height={110}
                className="object-contain drop-shadow-sm"
              />
            </motion.div>
          ) : (
            <Image
              src={currentIcon}
              alt={feature.title}
              width={110}
              height={110}
              className="object-contain drop-shadow-sm"
            />
          )}
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
      <section className="py-24 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#2A7D50] mb-6">
            From Fear to Fork
          </p>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 text-[#0D2B19]">
            Eat bugs.<br />
            Save the planet.<br />
            <span className="text-[#2A7D50]">Have fun.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#0D2B19]/70 max-w-xl mx-auto leading-relaxed mb-10">
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
      <motion.div
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-8 text-sm font-medium text-[#0D2B19]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span>Fear</span>
        <span className="text-[#2A7D50]">→</span>
        <span>Fascination</span>
        <span className="text-[#2A7D50]">→</span>
        <span>Familiarity</span>
        <span className="text-[#2A7D50]">→</span>
        <span className="font-bold text-[#2A7D50]">Food</span>
      </motion.div>

      {/* Feature cards */}
      <section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.href} feature={feature} delay={0.3 + i * 0.1} />
          ))}
        </div>
      </section>
    </main>
  );
}
