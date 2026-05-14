"use client";

import { motion } from "framer-motion";

type Props = {
  stage: 1 | 2 | 3;
  onContinue: () => void;
};

const stageContent = {
  1: {
    emoji: "🫣",
    label: "Stage 1 of 3",
    title: "How Brave Are You?",
    description: "Let's start with how you feel about bugs. No judgment — we just want to know where you're starting from.",
    cta: "Let's go →",
  },
  2: {
    emoji: "🍽️",
    label: "Stage 2 of 3",
    title: "What's Your Flavor?",
    description: "Now let's talk food. Your taste preferences will shape the recipes we recommend.",
    cta: "Continue →",
  },
  3: {
    emoji: "✨",
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
      <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-5xl mb-6 mx-auto shadow-sm">
        {content.emoji}
      </div>
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#48BB78] mb-3">
        {content.label}
      </p>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A3A2A] tracking-tight mb-4">
        {content.title}
      </h1>
      <p className="text-[#1A3A2A]/60 leading-relaxed mb-10">
        {content.description}
      </p>
      <motion.button
        onClick={onContinue}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="bg-[#1A3A2A] text-[#F0FFF4] text-base font-bold px-10 py-4 rounded-full transition-colors hover:bg-[#48BB78] shadow-sm hover:shadow-lg"
      >
        {content.cta}
      </motion.button>
    </motion.div>
  );
}
