"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { QuizQuestion } from "@/lib/quizQuestions";

type Props = {
  question: QuizQuestion;
  initialValue?: string;
  onAnswer: (value: string) => void;
  onBack?: () => void;
};

export default function QuizQuestionCard({
  question,
  initialValue,
  onAnswer,
  onBack,
}: Props) {
  const [selected, setSelected] = useState<string | undefined>(initialValue);

  // Reset selection when question changes
  useEffect(() => {
    setSelected(initialValue);
  }, [question.id, initialValue]);

  const handleNext = () => {
    if (selected) onAnswer(selected);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2B19] tracking-tight mb-8 text-center leading-tight">
        {question.question}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-28 sm:mb-8">
        {question.options.map((option, i) => {
          const isSelected = selected === option.value;
          return (
            <motion.button
              key={option.value}
              onClick={() => setSelected(option.value)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-2xl p-5 text-left transition-all shadow-sm border-2 ${
                isSelected
                  ? "bg-[#2A7D50]/10 text-[#0D2B19] border-[#2A7D50]"
                  : "bg-white text-[#0D2B19] border-transparent hover:border-[#2A7D50]/40 hover:shadow-lg"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{option.emoji}</span>
                <span className="font-semibold text-sm md:text-base">
                  {option.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Navigation: fixed bottom on mobile, inline on desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-between items-center gap-3 bg-[#FAFFF7] border-t border-[#C8E2D4] px-6 py-4 sm:static sm:bg-transparent sm:border-0 sm:px-0 sm:py-0">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-[#0D2B19]/60 hover:text-[#0D2B19] font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        <motion.button
          onClick={handleNext}
          disabled={!selected}
          whileHover={selected ? { scale: 1.03 } : undefined}
          whileTap={selected ? { scale: 0.97 } : undefined}
          className={`font-bold px-8 py-3 rounded-[10px] text-sm transition-all ${
            selected
              ? "bg-[#2A7D50] hover:bg-[#1F6040] text-white shadow-sm hover:shadow-lg"
              : "bg-[#0D2B19]/10 text-[#0D2B19]/30 cursor-not-allowed"
          }`}
        >
          Next →
        </motion.button>
      </div>
    </motion.div>
  );
}
