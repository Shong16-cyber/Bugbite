"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { QuizAnswers } from "@/lib/quizQuestions";
import { matchPersona, type Persona } from "@/lib/personas";
import { getTopRecipes, buildPickedReason, type Recipe } from "@/lib/recipes";

export default function QuizResultPage() {
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [topRecipes, setTopRecipes] = useState<Recipe[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("bugbite_quiz_answers");
    if (stored) {
      const parsed: QuizAnswers = JSON.parse(stored);
      setAnswers(parsed);
      setPersona(matchPersona(parsed));
      setTopRecipes(getTopRecipes(parsed, 3));
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!answers || !persona) {
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
    <main className="px-6 py-12 max-w-3xl mx-auto">
      {/* Persona reveal */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#48BB78] mb-3">
          Your Bug Persona
        </p>
        <motion.div
          className="w-28 h-28 rounded-3xl flex items-center justify-center text-7xl mb-6 mx-auto shadow-sm"
          style={{ backgroundColor: persona.accentColor }}
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {persona.emoji}
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A3A2A] tracking-tight mb-3">
          {persona.name}
        </h1>
        <p className="text-lg text-[#48BB78] font-semibold mb-6">
          {persona.tagline}
        </p>
        <p className="text-[#1A3A2A]/70 leading-relaxed max-w-xl mx-auto mb-8">
          {persona.description}
        </p>
      </motion.section>

      {/* Fun facts */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-3xl p-6 mb-6 shadow-sm"
      >
        <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#48BB78] mb-4">
          Fun Facts
        </h2>
        <ul className="space-y-3">
          {persona.funFacts.map((fact, i) => (
            <li key={i} className="flex gap-3 text-[#1A3A2A]/80 text-sm leading-relaxed">
              <span className="text-[#48BB78] font-bold">•</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Edibility */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-3xl p-6 mb-12 shadow-sm"
      >
        <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#48BB78] mb-3">
          Edibility
        </h2>
        <p className="text-[#1A3A2A]/80 text-sm leading-relaxed">
          {persona.edibility}
        </p>
      </motion.section>

      {/* Top 3 recipes */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-extrabold text-[#1A3A2A] tracking-tight mb-2 text-center">
          Your Top 3 Recipes
        </h2>
        <p className="text-[#1A3A2A]/60 text-sm text-center mb-6">
          Hand-picked based on your quiz answers
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topRecipes.map((recipe, i) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
            >
              <Link
                href={`/kitchen/recipe/${recipe.id}`}
                className="block bg-white rounded-2xl p-5 h-full transition-all hover:-translate-y-1 hover:shadow-lg shadow-sm group"
              >
                <div className="text-4xl mb-3">{recipe.emoji}</div>
                <h3 className="font-bold text-[#1A3A2A] mb-2 leading-tight">
                  {recipe.name}
                </h3>
                <p className="text-xs text-[#48BB78] font-semibold mb-3">
                  {buildPickedReason(recipe, answers)}
                </p>
                <p className="text-xs text-[#1A3A2A]/60 leading-relaxed">
                  {recipe.shortDesc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="text-center"
      >
        <Link
          href="/kitchen"
          className="inline-block bg-[#1A3A2A] text-[#F0FFF4] text-base font-bold px-10 py-4 rounded-full transition-colors hover:bg-[#48BB78] shadow-sm hover:shadow-lg mb-4"
        >
          Explore Your Bug Kitchen →
        </Link>
        <div className="flex gap-3 justify-center mt-4">
          <Link
            href="/quiz"
            className="bg-white border border-[#1A3A2A]/10 text-[#1A3A2A] font-semibold px-5 py-2 rounded-full hover:bg-[#1A3A2A]/5 transition-colors text-sm"
          >
            Retake quiz
          </Link>
          <button
            onClick={handleCopyLink}
            className="bg-white border border-[#1A3A2A]/10 text-[#1A3A2A] font-semibold px-5 py-2 rounded-full hover:bg-[#1A3A2A]/5 transition-colors text-sm"
          >
            {copied ? "Copied! ✓" : "Copy link"}
          </button>
        </div>
      </motion.section>
    </main>
  );
}
