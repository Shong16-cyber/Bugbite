"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { recipes } from "@/lib/recipes";

export default function RecipeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="text-5xl mb-4">🤷</div>
        <h1 className="text-3xl font-extrabold text-[#1A3A2A] mb-3">
          Recipe not found
        </h1>
        <Link
          href="/kitchen"
          className="mt-4 bg-[#1A3A2A] hover:bg-[#48BB78] text-[#F0FFF4] font-bold px-8 py-3 rounded-full transition-colors"
        >
          Back to Kitchen →
        </Link>
      </main>
    );
  }

  return (
    <main className="px-6 py-12 max-w-2xl mx-auto">
      <Link href="/kitchen" className="text-sm text-[#48BB78] font-semibold mb-6 inline-block">
        ← Back to Kitchen
      </Link>
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="text-6xl mb-4">{recipe.emoji}</div>
        <h1 className="text-3xl font-extrabold text-[#1A3A2A] tracking-tight mb-3">
          {recipe.name}
        </h1>
        <p className="text-[#1A3A2A]/70 leading-relaxed mb-6">
          {recipe.shortDesc}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-[#C6F6D5] text-[#1A3A2A] text-xs font-semibold rounded-full">
            {recipe.insect}
          </span>
          <span className="px-3 py-1 bg-[#FEFCBF] text-[#1A3A2A] text-xs font-semibold rounded-full">
            {recipe.difficulty}
          </span>
          <span className="px-3 py-1 bg-[#FED7AA] text-[#1A3A2A] text-xs font-semibold rounded-full">
            {recipe.foodForm}
          </span>
          <span className="px-3 py-1 bg-[#FECACA] text-[#1A3A2A] text-xs font-semibold rounded-full">
            {recipe.texture}
          </span>
        </div>
        <p className="text-sm text-[#1A3A2A]/50 italic">
          Full ingredients and steps coming in Issue #6 (Recipe Library).
        </p>
      </div>
    </main>
  );
}
