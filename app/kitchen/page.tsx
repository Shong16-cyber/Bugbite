"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
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
  easy: "bg-[#C6F6D5] text-[#0D2B19]",
  medium: "bg-[#FEFCBF] text-[#0D2B19]",
  adventurous: "bg-[#FED7AA] text-[#0D2B19]",
};

const foodFormColors: Record<string, string> = {
  whole: "bg-[#FECACA] text-[#0D2B19]",
  pieces: "bg-[#D8B4FE] text-[#0D2B19]",
  powder: "bg-[#BFDBFE] text-[#0D2B19]",
  invisible: "bg-[#E5E7EB] text-[#0D2B19]",
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
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0D2B19]/60 mb-0.5">
                Your Persona
              </p>
              <p className="font-bold text-[#0D2B19] leading-tight">
                {persona.name}
              </p>
              <p className="text-xs text-[#0D2B19]/70">{persona.tagline}</p>
            </div>
          </div>
          <Link
            href="/quiz/result"
            className="text-xs font-semibold text-[#0D2B19]/60 hover:text-[#0D2B19] whitespace-nowrap transition-colors"
          >
            See result →
          </Link>
        </motion.div>
      )}

      {/* Header */}
      <div className="mb-8 flex items-center gap-6">
        <Image src="/icons/bug_cooking.svg" alt="" width={96} height={96} className="object-contain flex-shrink-0 drop-shadow-sm" />
        <div>
        <h1 className="text-4xl font-extrabold text-[#0D2B19] tracking-tight mb-2">
          Bug Kitchen
        </h1>
        <p className="text-[#0D2B19]/60 text-sm">
          {quizAnswers
            ? "Sorted by your quiz preferences. Your best matches are first."
            : "Complete the quiz to get personalized recommendations. Showing easiest first."}
        </p>
        {!quizAnswers && (
          <Link
            href="/quiz"
            className="inline-block mt-3 text-sm font-semibold text-[#2A7D50] underline underline-offset-2"
          >
            Take the quiz →
          </Link>
        )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#C8E2D4] rounded-2xl px-5 py-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#0D2B19]/40 uppercase tracking-wider">
            Filter
          </span>
          {hasFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-[#0D2B19]/40 hover:text-[#0D2B19] transition-colors"
            >
              Clear all ×
            </button>
          )}
        </div>

        <div className="space-y-2.5">
          {(
            [
              { label: "Insect", key: "insect", values: ["cricket", "mealworm", "silkworm", "ant", "grasshopper"] },
              { label: "Difficulty", key: "difficulty", values: ["easy", "medium", "adventurous"] },
              { label: "Form", key: "foodForm", values: ["whole", "powder", "invisible"] },
              { label: "Flavor", key: "flavor", values: ["sweet", "savory", "spicy"] },
            ] as const
          ).map(({ label, key, values }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-[10px] font-semibold text-[#0D2B19]/35 uppercase tracking-wider w-14 flex-shrink-0">
                {label}
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {values.map((v) => (
                  <button
                    key={v}
                    onClick={() => setFilter(key, v)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                      filters[key] === v
                        ? "bg-[#2A7D50] text-white border-[#2A7D50]"
                        : "bg-[#FAFFF7] text-[#0D2B19]/60 border-[#C8E2D4] hover:border-[#2A7D50]/40 hover:text-[#0D2B19]"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
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
            <h2 className="text-xl font-bold text-[#0D2B19] mb-2">No recipes match</h2>
            <p className="text-[#0D2B19]/60 text-sm mb-4">
              Try removing a filter or two.
            </p>
            <button
              onClick={resetFilters}
              className="text-sm font-semibold text-[#2A7D50] underline underline-offset-2"
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
      className="h-full"
    >
      <Link
        href={`/kitchen/recipe/${recipe.id}`}
        className="group flex flex-col bg-white border border-[#C8E2D4] rounded-2xl p-5 h-full transition-all hover:-translate-y-1 hover:shadow-md"
      >
        {/* Top: emoji + difficulty badge */}
        <div className="flex items-start justify-between mb-3">
          <span className="text-4xl">{recipe.emoji}</span>
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide ${difficultyColors[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-bold text-[#0D2B19] mb-1.5 leading-tight">
          {recipe.name}
        </h2>

        {/* Desc */}
        <p className="text-xs text-[#0D2B19]/60 leading-relaxed flex-1">
          {recipe.shortDesc}
        </p>

        {matchLabel && (
          <p className="text-[10px] font-semibold text-[#2A7D50] uppercase tracking-wider mt-2">
            {matchLabel}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#C8E2D4]">
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-sm font-semibold text-[#0D2B19]">{recipe.prepTime}</span>
            <span className="text-[10px] text-[#0D2B19]/50">prep</span>
          </div>
          <div className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${foodFormColors[recipe.foodForm]}`}>
            {recipe.foodForm}
          </div>
          <span className="text-[10px] text-[#0D2B19]/50 ml-auto">{recipe.insect}</span>
        </div>
      </Link>
    </motion.div>
  );
}
