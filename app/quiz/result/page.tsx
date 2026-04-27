"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { QuizAnswers } from "@/lib/quizQuestions";

export default function QuizResultPage() {
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("bugbite_quiz_answers");
    if (stored) {
      setAnswers(JSON.parse(stored));
    }
  }, []);

  if (!answers) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="text-5xl mb-4">🤔</div>
        <h1 className="text-3xl font-extrabold text-[#1A3A2A] mb-3">
          No quiz data found
        </h1>
        <p className="text-[#1A3A2A]/60 mb-8">Take the quiz first!</p>
        <Link
          href="/quiz"
          className="bg-[#1A3A2A] hover:bg-[#48BB78] text-[#F0FFF4] font-bold px-8 py-3 rounded-full transition-colors"
        >
          Start Quiz →
        </Link>
      </main>
    );
  }

  return (
    <main className="px-6 py-16 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">✨</div>
        <h1 className="text-4xl font-extrabold text-[#1A3A2A] mb-3 tracking-tight">
          Your answers
        </h1>
        <p className="text-[#1A3A2A]/60">
          Persona + recipe matching coming in Issue #4
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <pre className="text-sm text-[#1A3A2A]/80 overflow-auto">
          {JSON.stringify(answers, null, 2)}
        </pre>
      </div>

      <div className="flex gap-3 justify-center">
        <Link
          href="/quiz"
          className="bg-white border border-[#1A3A2A]/10 text-[#1A3A2A] font-semibold px-6 py-3 rounded-full hover:bg-[#1A3A2A]/5 transition-colors"
        >
          Retake quiz
        </Link>
        <Link
          href="/"
          className="bg-[#1A3A2A] hover:bg-[#48BB78] text-[#F0FFF4] font-bold px-6 py-3 rounded-full transition-colors"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
