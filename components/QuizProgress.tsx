"use client";

import { motion } from "framer-motion";

type Props = {
  current: number;
  total: number;
  stageLabel: string;
};

export default function QuizProgress({ current, total, stageLabel }: Props) {
  const percent = ((current + 1) / total) * 100;

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#2A7D50]">
          {stageLabel}
        </span>
        <span className="text-xs font-medium text-[#0D2B19]/50">
          {current + 1} / {total}
        </span>
      </div>
      <div className="h-1.5 bg-white rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#2A7D50] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
