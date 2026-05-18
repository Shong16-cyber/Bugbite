"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { recipes, buildPickedReason } from "@/lib/recipes";

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

export default function RecipeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const recipe = recipes.find((r) => r.id === id);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("bugbite_quiz_answers");
    if (stored) setQuizAnswers(JSON.parse(stored));
  }, []);

  if (!recipe) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="text-5xl mb-4">🤷</div>
        <h1 className="text-3xl font-extrabold text-[#0D2B19] mb-3">
          Recipe not found
        </h1>
        <Link
          href="/kitchen"
          className="mt-4 bg-[#0D2B19] hover:bg-[#2A7D50] text-[#FAFFF7] font-bold px-8 py-3 rounded-full transition-colors"
        >
          Back to Kitchen →
        </Link>
      </main>
    );
  }

  const pickedReason = quizAnswers ? buildPickedReason(recipe, quizAnswers) : null;

  return (
    <main className="px-6 py-10 max-w-2xl mx-auto">
      <Link
        href="/kitchen"
        className="text-sm text-[#2A7D50] font-semibold mb-6 inline-block hover:opacity-70 transition-opacity"
      >
        ← Back to Kitchen
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-4">
          <div className="text-6xl mb-4">{recipe.emoji}</div>
          <h1 className="text-3xl font-extrabold text-[#0D2B19] tracking-tight mb-2">
            {recipe.name}
          </h1>
          <p className="text-[#0D2B19]/70 leading-relaxed mb-5">
            {recipe.shortDesc}
          </p>

          {/* "Picked for you" reason */}
          {pickedReason && pickedReason !== "Picked for you" && (
            <div className="bg-[#FAFFF7] rounded-xl px-4 py-3 mb-5">
              <p className="text-xs font-semibold text-[#2A7D50]">
                ✓ {pickedReason}
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${foodFormColors[recipe.foodForm]}`}>
              {recipe.foodForm}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAFFF7] text-[#0D2B19]/70">
              {recipe.insect}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAFFF7] text-[#0D2B19]/70">
              {recipe.prepTime}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAFFF7] text-[#0D2B19]/70">
              {recipe.texture}
            </span>
          </div>
        </div>

        {recipe.ingredients && recipe.steps && recipe.nutrition ? (
          <>
            {/* Ingredients */}
            <div className="bg-white rounded-3xl p-6 shadow-sm mb-4">
              <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#2A7D50] mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#0D2B19]/80">
                    <span className="text-[#2A7D50] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="bg-white rounded-3xl p-6 shadow-sm mb-4">
              <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#2A7D50] mb-4">
                Steps
              </h2>
              <ol className="space-y-4">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-4 text-sm text-[#0D2B19]/80">
                    <span className="w-6 h-6 rounded-full bg-[#C6F6D5] text-[#0D2B19] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Nutrition */}
            <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
              <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#2A7D50] mb-4">
                Nutrition & Sustainability
              </h2>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#0D2B19]/60">Protein</span>
                  <span className="font-semibold text-[#0D2B19]">{recipe.nutrition.protein}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#0D2B19]/60">Calories</span>
                  <span className="font-semibold text-[#0D2B19]">{recipe.nutrition.calories}</span>
                </div>
                <div className="pt-2 border-t border-[#0D2B19]/5">
                  <p className="text-xs text-[#0D2B19]/60 leading-relaxed">
                    🌍 {recipe.nutrition.sustainability}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
            <p className="text-sm text-[#0D2B19]/50 italic text-center">
              Full recipe details coming soon.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="flex gap-3 justify-center">
          <Link
            href="/kitchen"
            className="bg-white border border-[#0D2B19]/10 text-[#0D2B19] font-semibold px-6 py-3 rounded-full hover:bg-[#0D2B19]/5 transition-colors text-sm"
          >
            ← Browse all recipes
          </Link>
          {!quizAnswers && (
            <Link
              href="/quiz"
              className="bg-[#0D2B19] hover:bg-[#2A7D50] text-[#FAFFF7] font-bold px-6 py-3 rounded-full transition-colors text-sm"
            >
              Take the quiz →
            </Link>
          )}
        </div>
      </motion.div>
    </main>
  );
}
