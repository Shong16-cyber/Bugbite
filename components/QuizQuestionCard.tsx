"use client";

import { motion } from "framer-motion";
import type { QuizQuestion } from "@/lib/quizQuestions";

type Props = {
  question: QuizQuestion;
  onAnswer: (value: string) => void;
};

export default function QuizQuestionCard({ question, onAnswer }: Props) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A3A2A] tracking-tight mb-8 text-center leading-tight">
        {question.question}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option, i) => (
          <motion.button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-white rounded-2xl p-5 text-left transition-all hover:shadow-lg shadow-sm border-2 border-transparent hover:border-[#48BB78]"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{option.emoji}</span>
              <span className="font-semibold text-[#1A3A2A] text-sm md:text-base">
                {option.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
