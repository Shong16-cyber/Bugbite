"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import type { QuizAnswers } from "@/lib/quizQuestions";
import { matchPersona, personas, type Persona } from "@/lib/personas";
import { getTopRecipes, buildPickedReason, type Recipe } from "@/lib/recipes";

export default function QuizResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [topRecipes, setTopRecipes] = useState<Recipe[]>([]);
  const [copied, setCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    const personaParam = searchParams.get("p");

    if (personaParam) {
      // Shared link: load persona by ID, use default answers for recipe preview
      const found = personas.find((p) => p.id === personaParam);
      if (found) {
        setPersona(found);
        setIsShared(true);
        // Use empty answers so recipes show without personalized sorting
        setTopRecipes(getTopRecipes({}, 3));
        return;
      }
    }

    // Normal flow: load from sessionStorage
    const stored = sessionStorage.getItem("bugbite_quiz_answers");
    if (stored) {
      const parsed: QuizAnswers = JSON.parse(stored);
      setAnswers(parsed);
      const matched = matchPersona(parsed);
      setPersona(matched);
      setTopRecipes(getTopRecipes(parsed, 3));
      // Save persona to sessionStorage for Kitchen banner
      sessionStorage.setItem("bugbite_persona", JSON.stringify({
        id: matched.id,
        name: matched.name,
        emoji: matched.emoji,
        tagline: matched.tagline,
        accentColor: matched.accentColor,
      }));
    }
  }, [searchParams]);

  const handleCopyLink = async () => {
    if (!persona) return;
    try {
      const url = `${window.location.origin}/quiz/result?p=${persona.id}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!persona) {
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
    <main className="px-6 py-10 max-w-2xl mx-auto">
      {/* Shared banner */}
      {isShared && (
        <div className="bg-[#FEFCBF] rounded-2xl px-4 py-3 mb-6 text-center">
          <p className="text-sm text-[#1A3A2A]/70">
            Someone shared their bug persona with you! 🐛{" "}
            <Link href="/quiz" className="font-semibold text-[#1A3A2A] underline underline-offset-2">
              Take the quiz yourself →
            </Link>
          </p>
        </div>
      )}

      {/* Persona reveal */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#48BB78] mb-3">
          Your Bug Persona
        </p>
        <motion.div
          className="w-24 h-24 rounded-3xl flex items-center justify-center text-6xl mb-5 mx-auto shadow-sm"
          style={{ backgroundColor: persona.accentColor }}
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {persona.emoji}
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A3A2A] tracking-tight mb-2">
          {persona.name}
        </h1>
        <p className="text-base text-[#48BB78] font-semibold mb-4">
          {persona.tagline}
        </p>
        <p className="text-[#1A3A2A]/70 leading-relaxed text-sm max-w-md mx-auto">
          {persona.description}
        </p>
      </motion.section>

      {/* Fun facts + Edibility */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-3xl p-6 mb-10 shadow-sm"
      >
        <ul className="space-y-2.5 mb-4">
          {persona.funFacts.map((fact, i) => (
            <li key={i} className="flex gap-3 text-[#1A3A2A]/80 text-sm leading-relaxed">
              <span className="text-[#48BB78] font-bold">•</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-[#1A3A2A]/50 italic border-t border-[#1A3A2A]/5 pt-3">
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
        <h2 className="text-2xl font-extrabold text-[#1A3A2A] tracking-tight mb-1 text-center">
          {isShared ? "Popular Recipes" : "Your Top 3 Recipes"}
        </h2>
        <p className="text-[#1A3A2A]/60 text-sm text-center mb-6">
          {isShared ? "Take the quiz to get your own picks" : "Hand-picked based on your quiz answers"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {topRecipes.map((recipe, i) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
            >
              <Link
                href={`/kitchen/recipe/${recipe.id}`}
                className="block bg-white rounded-2xl p-4 h-full transition-all hover:-translate-y-1 hover:shadow-lg shadow-sm"
              >
                <div className="text-3xl mb-2">{recipe.emoji}</div>
                <h3 className="font-bold text-[#1A3A2A] mb-1.5 leading-tight text-sm">
                  {recipe.name}
                </h3>
                {answers && (
                  <p className="text-[10px] text-[#48BB78] font-semibold uppercase tracking-wider">
                    {buildPickedReason(recipe, answers)}
                  </p>
                )}
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
        {!isShared && (
          <Link
            href="/kitchen"
            className="inline-block bg-[#1A3A2A] text-[#F0FFF4] text-base font-bold px-10 py-4 rounded-full transition-colors hover:bg-[#48BB78] shadow-sm hover:shadow-lg"
          >
            Explore Your Bug Kitchen →
          </Link>
        )}
        {isShared && (
          <Link
            href="/quiz"
            className="inline-block bg-[#1A3A2A] text-[#F0FFF4] text-base font-bold px-10 py-4 rounded-full transition-colors hover:bg-[#48BB78] shadow-sm hover:shadow-lg"
          >
            Take the Quiz →
          </Link>
        )}
        <div className="flex gap-3 justify-center mt-4">
          {!isShared && (
            <button
              onClick={() => {
                sessionStorage.removeItem("bugbite_quiz_answers");
                sessionStorage.removeItem("bugbite_persona");
                window.location.href = "/quiz";
              }}
              className="bg-white border border-[#1A3A2A]/10 text-[#1A3A2A] font-semibold px-5 py-2 rounded-full hover:bg-[#1A3A2A]/5 transition-colors text-sm"
            >
              Retake quiz
            </button>
          )}
          <button
            onClick={handleCopyLink}
            className="bg-white border border-[#1A3A2A]/10 text-[#1A3A2A] font-semibold px-5 py-2 rounded-full hover:bg-[#1A3A2A]/5 transition-colors text-sm"
          >
            {copied ? "Copied! ✓" : "Share my persona 🔗"}
          </button>
        </div>
      </motion.section>
    </main>
  );
}
