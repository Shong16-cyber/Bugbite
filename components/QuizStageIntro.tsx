"use client";

import { motion } from "framer-motion";

type Props = {
  stage: 1 | 2;
  onContinue: () => void;
};

const stageContent = {
  1: {
    emoji: "🫣",
    label: "Stage 1",
    title: "How Brave Are You?",
    description: "Let's start with how you feel about bugs. No judgment — we just want to know where you're starting from.",
  },
  2: {
    emoji: "🍽️",
    label: "Stage 2",
    title: "What's Your Flavor?",
    description: "Now let's talk food. Your taste preferences will shape the recipes we recommend later.",
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
        {stage === 1 ? "Let's go →" : "Continue →"}
      </motion.button>
    </motion.div>
  );
}
