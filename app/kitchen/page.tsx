"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { recipes, getSortedRecipes, getMatchLabel, type Recipe } from "@/lib/recipes";

type Filters = {
  insect: string;
  difficulty: string;
  foodForm: string;
  flavor: string;
};

const defaultFilters: Filters = {
  insect: "",
  difficulty: "",
  foodForm: "",
  flavor: "",
};

const difficultyColors: Record<string, string> = {
  easy: "bg-[#C6F6D5] text-[#1A3A2A]",
  medium: "bg-[#FEFCBF] text-[#1A3A2A]",
  adventurous: "bg-[#FED7AA] text-[#1A3A2A]",
};

const foodFormColors: Record<string, string> = {
  whole: "bg-[#FECACA] text-[#1A3A2A]",
  pieces: "bg-[#D8B4FE] text-[#1A3A2A]",
  powder: "bg-[#BFDBFE] text-[#1A3A2A]",
  invisible: "bg-[#E5E7EB] text-[#1A3A2A]",
};

export default function KitchenPage() {
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string> | null>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [persona, setPersona] = useState<{ name: string; emoji: string; tagline: string; accentColor: string } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("bugbite_quiz_answers");
    if (stored) setQuizAnswers(JSON.parse(stored));
    const storedPersona = sessionStorage.getItem("bugbite_persona");
    if (storedPersona) setPersona(JSON.parse(storedPersona));
  }, []);

  const sorted = useMemo(() => getSortedRecipes(quizAnswers), [quizAnswers]);

  const filtered = useMemo(() => {
    return sorted.filter((r) => {
      if (filters.insect && r.insect !== filters.insect) return false;
      if (filters.difficulty && r.difficulty !== filters.difficulty) return false;
      if (filters.foodForm && r.foodForm !== filters.foodForm) return false;
      if (filters.flavor && !r.flavorTags.includes(filters.flavor)) return false;
      return true;
    });
  }, [sorted, filters]);

  const hasFilters = Object.values(filters).some(Boolean);

  const setFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? "" : value }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <main className="px-6 py-10 max-w-5xl mx-auto">
      {/* Persona banner */}
      {persona && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl px-5 py-4 mb-6 flex items-center justify-between gap-4"
          style={{ backgroundColor: persona.accentColor }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{persona.emoji}</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1A3A2A]/60 mb-0.5">
                Your Persona
              </p>
              <p className="font-bold text-[#1A3A2A] leading-tight">
                {persona.name}
              </p>
              <p className="text-xs text-[#1A3A2A]/70">{persona.tagline}</p>
            </div>
          </div>
          <Link
            href="/quiz/result"
            className="text-xs font-semibold text-[#1A3A2A]/60 hover:text-[#1A3A2A] whitespace-nowrap transition-colors"
          >
            See result →
          </Link>
        </motion.div>
      )}

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#48BB78] mb-2">
          Level 2
        </p>
        <h1 className="text-4xl font-extrabold text-[#1A3A2A] tracking-tight mb-2">
          Bug Kitchen 🍳
        </h1>
        <p className="text-[#1A3A2A]/60 text-sm">
          {quizAnswers
            ? "Sorted by your quiz preferences. Your best matches are first."
            : "Complete the quiz to get personalized recommendations. Showing easiest first."}
        </p>
        {!quizAnswers && (
          <Link
            href="/quiz"
            className="inline-block mt-3 text-sm font-semibold text-[#48BB78] underline underline-offset-2"
          >
            Take the quiz →
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-[#1A3A2A]/50 uppercase tracking-wider mr-1">
            Filter:
          </span>

          {/* Insect */}
          {["cricket", "mealworm", "silkworm", "ant", "grasshopper"].map((v) => (
            <button
              key={v}
              onClick={() => setFilter("insect", v)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                filters.insect === v
                  ? "bg-[#1A3A2A] text-white"
                  : "bg-[#F0FFF4] text-[#1A3A2A]/70 hover:bg-[#C6F6D5]"
              }`}
            >
              {v}
            </button>
          ))}

          <div className="w-px h-4 bg-[#1A3A2A]/10 mx-1" />

          {/* Difficulty */}
          {["easy", "medium", "adventurous"].map((v) => (
            <button
              key={v}
              onClick={() => setFilter("difficulty", v)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                filters.difficulty === v
                  ? "bg-[#1A3A2A] text-white"
                  : "bg-[#F0FFF4] text-[#1A3A2A]/70 hover:bg-[#C6F6D5]"
              }`}
            >
              {v}
            </button>
          ))}

          <div className="w-px h-4 bg-[#1A3A2A]/10 mx-1" />

          {/* Food form */}
          {["whole", "powder", "invisible"].map((v) => (
            <button
              key={v}
              onClick={() => setFilter("foodForm", v)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                filters.foodForm === v
                  ? "bg-[#1A3A2A] text-white"
                  : "bg-[#F0FFF4] text-[#1A3A2A]/70 hover:bg-[#C6F6D5]"
              }`}
            >
              {v}
            </button>
          ))}

          <div className="w-px h-4 bg-[#1A3A2A]/10 mx-1" />

          {/* Flavor */}
          {["sweet", "savory", "spicy"].map((v) => (
            <button
              key={v}
              onClick={() => setFilter("flavor", v)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                filters.flavor === v
                  ? "bg-[#1A3A2A] text-white"
                  : "bg-[#F0FFF4] text-[#1A3A2A]/70 hover:bg-[#C6F6D5]"
              }`}
            >
              {v}
            </button>
          ))}

          {hasFilters && (
            <button
              onClick={resetFilters}
              className="ml-auto text-xs font-semibold text-[#1A3A2A]/40 hover:text-[#1A3A2A] transition-colors"
            >
              Clear all ×
            </button>
          )}
        </div>
      </div>

      {/* Recipe Grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🤷</div>
            <h2 className="text-xl font-bold text-[#1A3A2A] mb-2">No recipes match</h2>
            <p className="text-[#1A3A2A]/60 text-sm mb-4">
              Try removing a filter or two.
            </p>
            <button
              onClick={resetFilters}
              className="text-sm font-semibold text-[#48BB78] underline underline-offset-2"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((recipe, i) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={i}
                matchLabel={quizAnswers ? getMatchLabel(recipe, quizAnswers) : ""}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function RecipeCard({
  recipe,
  index,
  matchLabel,
}: {
  recipe: Recipe;
  index: number;
  matchLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link
        href={`/kitchen/recipe/${recipe.id}`}
        className="group block bg-white rounded-2xl p-5 h-full transition-all hover:-translate-y-1 hover:shadow-lg shadow-sm"
      >
        <div className="text-4xl mb-3">{recipe.emoji}</div>
        <h2 className="font-bold text-[#1A3A2A] mb-1 leading-tight">
          {recipe.name}
        </h2>
        <p className="text-xs text-[#1A3A2A]/60 mb-3 leading-relaxed">
          {recipe.shortDesc}
        </p>

        {matchLabel && (
          <p className="text-[10px] font-semibold text-[#48BB78] uppercase tracking-wider mb-3">
            {matchLabel}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${difficultyColors[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${foodFormColors[recipe.foodForm]}`}>
            {recipe.foodForm}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F0FFF4] text-[#1A3A2A]/70">
            {recipe.insect}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F0FFF4] text-[#1A3A2A]/70">
            {recipe.prepTime}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
