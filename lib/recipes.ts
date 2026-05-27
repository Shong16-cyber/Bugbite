export type Recipe = {
  id: string;
  name: string;
  emoji: string;
  insect: string;
  foodForm: "whole" | "pieces" | "powder" | "invisible";
  difficulty: "easy" | "medium" | "hard";
  texture: "crunchy" | "chewy" | "smooth" | "mixed";
  flavorTags: string[];
  shortDesc: string;
};

export const recipes: Recipe[] = [
  {
    id: "cricket_energy_balls",
    name: "5-Min Cricket Energy Balls",
    emoji: "🍪",
    insect: "cricket",
    foodForm: "powder",
    difficulty: "easy",
    texture: "chewy",
    flavorTags: ["sweet"],
    shortDesc: "No-bake protein bites with dates and cricket flour.",
  },
  {
    id: "cricket_flour_pancakes",
    name: "Cricket Flour Pancakes",
    emoji: "🥞",
    insect: "cricket",
    foodForm: "invisible",
    difficulty: "easy",
    texture: "smooth",
    flavorTags: ["sweet"],
    shortDesc: "Fluffy weekend pancakes with hidden protein boost.",
  },
  {
    id: "roasted_crickets",
    name: "Chili Garlic Roasted Crickets",
    emoji: "🌶️",
    insect: "cricket",
    foodForm: "whole",
    difficulty: "medium",
    texture: "crunchy",
    flavorTags: ["spicy_savory", "umami"],
    shortDesc: "Crispy whole crickets tossed in garlic chili oil.",
  },
  {
    id: "tempura_mealworms",
    name: "Tempura Mealworm Bites",
    emoji: "🍤",
    insect: "mealworm",
    foodForm: "whole",
    difficulty: "medium",
    texture: "crunchy",
    flavorTags: ["umami"],
    shortDesc: "Light, crispy tempura with a soy dipping sauce.",
  },
  {
    id: "cricket_chocolate_cookies",
    name: "Cricket Chocolate Chip Cookies",
    emoji: "🍫",
    insect: "cricket",
    foodForm: "invisible",
    difficulty: "easy",
    texture: "chewy",
    flavorTags: ["sweet"],
    shortDesc: "Classic cookies with 5g of cricket protein per bite.",
  },
  {
    id: "mealworm_stirfry",
    name: "Mealworm Veggie Stir-Fry",
    emoji: "🥡",
    insect: "mealworm",
    foodForm: "pieces",
    difficulty: "medium",
    texture: "mixed",
    flavorTags: ["umami", "spicy_savory"],
    shortDesc: "Weeknight stir-fry with crispy mealworms and ginger.",
  },
  {
    id: "silkworm_smoothie",
    name: "Silkworm Protein Smoothie",
    emoji: "🥤",
    insect: "silkworm",
    foodForm: "invisible",
    difficulty: "easy",
    texture: "smooth",
    flavorTags: ["sweet"],
    shortDesc: "Blend it and forget it. Banana, oats, silkworm powder.",
  },
  {
    id: "black_ant_risotto",
    name: "Black Ant Risotto",
    emoji: "🍚",
    insect: "ant",
    foodForm: "whole",
    difficulty: "hard",
    texture: "mixed",
    flavorTags: ["umami", "herby"],
    shortDesc: "Creamy risotto topped with citrusy black ants.",
  },
  {
    id: "cricket_protein_bar",
    name: "Cricket Protein Bar",
    emoji: "🍫",
    insect: "cricket",
    foodForm: "powder",
    difficulty: "easy",
    texture: "chewy",
    flavorTags: ["sweet", "umami"],
    shortDesc: "Grab-and-go protein bar. Zero cooking required.",
  },
  {
    id: "chapulines_tacos",
    name: "Chapulines Street Tacos",
    emoji: "🌮",
    insect: "grasshopper",
    foodForm: "whole",
    difficulty: "medium",
    texture: "crunchy",
    flavorTags: ["spicy_savory", "herby"],
    shortDesc: "Toasted grasshoppers with lime, chili, and fresh cilantro.",
  },
  {
    id: "ant_egg_salad",
    name: "Ant-Egg Citrus Salad",
    emoji: "🥗",
    insect: "ant",
    foodForm: "pieces",
    difficulty: "hard",
    texture: "mixed",
    flavorTags: ["herby", "umami"],
    shortDesc: "Buttery ant eggs over greens with a lime vinaigrette.",
  },
  {
    id: "cricket_crumble_topping",
    name: "5-Min Cricket Crumble Topping",
    emoji: "🥣",
    insect: "cricket",
    foodForm: "pieces",
    difficulty: "easy",
    texture: "crunchy",
    flavorTags: ["umami"],
    shortDesc: "Roast, crush, sprinkle. Adds protein to anything.",
  },
];

// Compute match score for one recipe given quiz answers
function scoreRecipe(recipe: Recipe, answers: Record<string, string>): number {
  let score = 0;

  // Fear triggers -> food form
  const fearfulTriggers = ["legs", "antennae", "eyes"];
  const fearful =
    fearfulTriggers.includes(answers.fear_triggers) ||
    ["reject", "hesitant"].includes(answers.comfort) ||
    ["panic", "avoid"].includes(answers.fear_baseline);

  if (fearful) {
    if (recipe.foodForm === "invisible") score += 4;
    if (recipe.foodForm === "powder") score += 3;
    if (recipe.foodForm === "whole") score -= 3;
  } else {
    if (recipe.foodForm === "whole") score += 2;
    if (recipe.foodForm === "pieces") score += 1;
  }

  // Texture match
  if (answers.texture_pref === recipe.texture) score += 3;
  if (answers.texture_pref === "mixed") score += 1;

  // Effort -> difficulty
  if (answers.effort_level === "lazy" && recipe.difficulty === "easy") score += 4;
  if (answers.effort_level === "medium" && recipe.difficulty === "medium") score += 3;
  if (answers.effort_level === "ambitious" && recipe.difficulty === "medium") score += 2;
  if (answers.effort_level === "ambitious" && recipe.difficulty === "hard") score += 3;
  if (answers.effort_level === "extreme" && recipe.difficulty === "hard") score += 4;
  if (answers.effort_level === "lazy" && recipe.difficulty === "hard") score -= 3;

  // Flavor overlap
  if (recipe.flavorTags.includes(answers.flavor_profile)) score += 2;

  return score;
}

export function getTopRecipes(answers: Record<string, string>, n = 3): Recipe[] {
  return recipes
    .map((r) => ({ recipe: r, score: scoreRecipe(r, answers) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.recipe);
}

// Generate the "Picked for you" reason for a recipe based on answers
export function buildPickedReason(recipe: Recipe, answers: Record<string, string>): string {
  const reasons: string[] = [];

  if (answers.texture_pref === recipe.texture) {
    reasons.push(recipe.texture);
  }
  if (recipe.flavorTags.includes(answers.flavor_profile)) {
    const flavorLabel = answers.flavor_profile.replace("_", " & ");
    reasons.push(flavorLabel);
  }
  if (answers.effort_level === "lazy" && recipe.difficulty === "easy") {
    reasons.push("low effort");
  }
  if (recipe.foodForm === "invisible" || recipe.foodForm === "powder") {
    if (["reject", "hesitant"].includes(answers.comfort)) {
      reasons.push("beginner-friendly");
    }
  }

  if (reasons.length === 0) return "Picked for you";
  return "Picked for you: " + reasons.join(" + ");
}
