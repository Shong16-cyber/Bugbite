"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  stage: 1 | 2 | 3;
  onContinue: () => void;
};

const stageContent = {
  1: {
    emoji: "🫣",
    icon: "/icons/bug_basic.svg",
    label: "Stage 1 of 3",
    title: "How Brave Are You?",
    description: "Let's start with how you feel about bugs. No judgment — we just want to know where you're starting from.",
    cta: "Let's go →",
  },
  2: {
    emoji: "🍽️",
    icon: "/icons/bug_cooking.svg",
    label: "Stage 2 of 3",
    title: "What's Your Flavor?",
    description: "Now let's talk food. Your taste preferences will shape the recipes we recommend.",
    cta: "Continue →",
  },
  3: {
    emoji: "✨",
    icon: "/icons/bug_worldmap.svg",
    label: "Stage 3 of 3",
    title: "Your Bug Persona",
    description: "All done! Let's see which bug matches your vibe — and what you should eat first.",
    cta: "Reveal my persona →",
  },
};

export default function QuizStageIntro({ stage, onContinue }: Props) {
  const content = stageContent[stage];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto text-center"
    >
      <div className="w-36 h-36 mx-auto mb-4 flex items-center justify-center">
        <Image
          src={content.icon}
          alt="Bug character"
          width={144}
          height={144}
          className="object-contain drop-shadow-sm"
        />
      </div>
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2A7D50] mb-3">
        {content.label}
      </p>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D2B19] tracking-tight mb-4">
        {content.title}
      </h1>
      <p className="text-[#0D2B19]/60 leading-relaxed mb-10">
        {content.description}
      </p>
      <motion.button
        onClick={onContinue}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="bg-[#2A7D50] text-white text-base font-bold px-10 py-4 rounded-[10px] transition-colors hover:bg-[#1F6040] shadow-sm hover:shadow-lg"
      >
        {content.cta}
      </motion.button>
    </motion.div>
  );
}
