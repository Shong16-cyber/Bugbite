export type Recipe = {
  id: string;
  name: string;
  emoji: string;
  insect: "cricket" | "mealworm" | "silkworm" | "ant" | "grasshopper";
  foodForm: "whole" | "pieces" | "powder" | "invisible";
  difficulty: "easy" | "medium" | "adventurous";
  texture: "crunchy" | "chewy" | "smooth" | "mixed";
  flavorTags: string[];
  prepTime: "5 min" | "15 min" | "30+ min";
  shortDesc: string;
  ingredients?: string[];
  steps?: string[];
  nutrition?: {
    protein: string;
    sustainability: string;
    calories: string;
  };
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
    prepTime: "5 min",
    shortDesc: "No-bake protein bites with dates, oats, and cricket flour.",
    ingredients: [
      "1 cup medjool dates, pitted",
      "1 cup rolled oats",
      "3 tbsp cricket flour",
      "2 tbsp peanut butter",
      "1 tbsp honey",
      "Pinch of sea salt",
    ],
    steps: [
      "Blend dates in a food processor until a sticky paste forms.",
      "Add oats, cricket flour, peanut butter, honey, and salt. Pulse until combined.",
      "Roll into 12 balls, about 1 inch each.",
      "Refrigerate for 15 minutes to firm up. Store in fridge for up to 1 week.",
    ],
    nutrition: {
      protein: "6g per ball",
      sustainability: "Crickets use 12x less feed than beef for the same protein",
      calories: "~110 kcal per ball",
    },
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
    prepTime: "15 min",
    shortDesc: "Fluffy weekend pancakes with a hidden protein boost.",
    ingredients: [
      "1 cup all-purpose flour",
      "¼ cup cricket flour",
      "1 tbsp sugar",
      "1 tsp baking powder",
      "½ tsp baking soda",
      "1 cup buttermilk",
      "1 egg",
      "2 tbsp melted butter",
    ],
    steps: [
      "Whisk dry ingredients (flours, sugar, baking powder, soda) in a large bowl.",
      "In a separate bowl, mix buttermilk, egg, and melted butter.",
      "Combine wet and dry. Stir until just mixed — lumps are fine.",
      "Heat a non-stick pan on medium. Pour ¼ cup batter per pancake.",
      "Cook until bubbles form (~2 min), flip, cook 1 more minute. Serve with maple syrup.",
    ],
    nutrition: {
      protein: "9g per serving (3 pancakes)",
      sustainability: "25% of flour swapped for cricket flour cuts carbon footprint significantly",
      calories: "~280 kcal per serving",
    },
  },
  {
    id: "chili_garlic_crickets",
    name: "Chili Garlic Roasted Crickets",
    emoji: "🌶️",
    insect: "cricket",
    foodForm: "whole",
    difficulty: "medium",
    texture: "crunchy",
    flavorTags: ["spicy", "savory"],
    prepTime: "15 min",
    shortDesc: "Crispy whole crickets tossed in garlic chili oil. A classic street snack.",
    ingredients: [
      "1 cup dried crickets (food-grade)",
      "2 tbsp olive oil",
      "3 garlic cloves, minced",
      "1 tsp chili flakes",
      "½ tsp smoked paprika",
      "Salt to taste",
      "Fresh lime juice",
    ],
    steps: [
      "Preheat oven to 375°F (190°C). Spread crickets on a baking sheet.",
      "Roast for 8-10 minutes until crispy. Shake pan halfway.",
      "Heat oil in a pan. Sauté garlic and chili flakes for 1 minute.",
      "Toss roasted crickets in the garlic chili oil. Season with paprika and salt.",
      "Finish with a squeeze of lime. Eat like popcorn.",
    ],
    nutrition: {
      protein: "14g per serving",
      sustainability: "Crickets emit 80x less methane than cattle",
      calories: "~160 kcal per serving",
    },
  },
  {
    id: "tempura_mealworms",
    name: "Tempura Mealworm Bites",
    emoji: "🍤",
    insect: "mealworm",
    foodForm: "whole",
    difficulty: "medium",
    texture: "crunchy",
    flavorTags: ["savory"],
    prepTime: "30+ min",
    shortDesc: "Light, crispy tempura with a soy dipping sauce.",
    ingredients: [
      "1 cup mealworms (food-grade, cleaned)",
      "½ cup cold sparkling water",
      "½ cup all-purpose flour",
      "1 egg yolk",
      "Pinch of salt",
      "Oil for frying",
      "Soy sauce + grated ginger for dipping",
    ],
    steps: [
      "Pat mealworms dry with paper towels.",
      "Mix cold sparkling water, flour, and egg yolk into a thin batter. Don't over-mix.",
      "Heat oil to 350°F (175°C).",
      "Coat mealworms in batter and fry in small batches for 2-3 minutes until golden.",
      "Drain on paper towels. Serve immediately with soy-ginger dipping sauce.",
    ],
    nutrition: {
      protein: "11g per serving",
      sustainability: "Mealworms need 10x less land than livestock",
      calories: "~200 kcal per serving",
    },
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
    prepTime: "30+ min",
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
    flavorTags: ["savory", "spicy"],
    prepTime: "15 min",
    shortDesc: "Weeknight stir-fry with crispy mealworms and fresh ginger.",
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
    prepTime: "5 min",
    shortDesc: "Blend it and forget it. Banana, oats, silkworm powder.",
  },
  {
    id: "black_ant_risotto",
    name: "Black Ant Risotto",
    emoji: "🍚",
    insect: "ant",
    foodForm: "whole",
    difficulty: "adventurous",
    texture: "mixed",
    flavorTags: ["savory"],
    prepTime: "30+ min",
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
    flavorTags: ["sweet", "savory"],
    prepTime: "5 min",
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
    flavorTags: ["spicy", "savory"],
    prepTime: "15 min",
    shortDesc: "Toasted grasshoppers with lime, chili, and fresh cilantro.",
  },
  {
    id: "ant_egg_salad",
    name: "Ant-Egg Citrus Salad",
    emoji: "🥗",
    insect: "ant",
    foodForm: "pieces",
    difficulty: "adventurous",
    texture: "mixed",
    flavorTags: ["savory"],
    prepTime: "15 min",
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
    flavorTags: ["savory"],
    prepTime: "5 min",
    shortDesc: "Roast, crush, sprinkle. Adds protein to anything.",
  },
  {
    id: "mealworm_pasta",
    name: "Mealworm Bolognese",
    emoji: "🍝",
    insect: "mealworm",
    foodForm: "pieces",
    difficulty: "medium",
    texture: "mixed",
    flavorTags: ["savory"],
    prepTime: "30+ min",
    shortDesc: "A rich, meaty bolognese — with mealworms doing the heavy lifting.",
  },
  {
    id: "grasshopper_guacamole",
    name: "Grasshopper Guacamole",
    emoji: "🥑",
    insect: "grasshopper",
    foodForm: "whole",
    difficulty: "easy",
    texture: "mixed",
    flavorTags: ["savory", "spicy"],
    prepTime: "5 min",
    shortDesc: "Classic guac topped with toasted chapulines for a satisfying crunch.",
  },
  {
    id: "silkworm_miso_soup",
    name: "Silkworm Miso Soup",
    emoji: "🍜",
    insect: "silkworm",
    foodForm: "whole",
    difficulty: "adventurous",
    texture: "chewy",
    flavorTags: ["savory"],
    prepTime: "15 min",
    shortDesc: "Traditional miso soup with silkworm pupae — popular Korean street food.",
  },
];

// Compute match score for one recipe given quiz answers
function scoreRecipe(recipe: Recipe, answers: Record<string, string>): number {
  let score = 0;

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

  if (answers.texture_pref === recipe.texture) score += 3;
  if (answers.texture_pref === "mixed") score += 1;

  if (answers.effort_level === "lazy" && recipe.difficulty === "easy") score += 4;
  if (answers.effort_level === "medium" && recipe.difficulty === "medium") score += 3;
  if (answers.effort_level === "ambitious" && recipe.difficulty === "medium") score += 2;
  if (answers.effort_level === "ambitious" && recipe.difficulty === "adventurous") score += 3;
  if (answers.effort_level === "extreme" && recipe.difficulty === "adventurous") score += 4;
  if (answers.effort_level === "lazy" && recipe.difficulty === "adventurous") score -= 3;

  if (recipe.flavorTags.some((t) => answers.flavor_profile?.includes(t))) score += 2;

  return score;
}

export function getTopRecipes(answers: Record<string, string>, n = 3): Recipe[] {
  return recipes
    .map((r) => ({ recipe: r, score: scoreRecipe(r, answers) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.recipe);
}

export function getSortedRecipes(answers: Record<string, string> | null): Recipe[] {
  if (!answers) {
    // No quiz — sort by difficulty (easy first)
    const order = { easy: 0, medium: 1, adventurous: 2 };
    return [...recipes].sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  }
  return recipes
    .map((r) => ({ recipe: r, score: scoreRecipe(r, answers) }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.recipe);
}

export function getMatchLabel(recipe: Recipe, answers: Record<string, string>): string {
  const reasons: string[] = [];
  if (answers.texture_pref === recipe.texture) reasons.push(recipe.texture);
  if (recipe.flavorTags.some((t) => answers.flavor_profile?.includes(t))) {
    reasons.push(answers.flavor_profile.replace("_", " & "));
  }
  if (answers.effort_level === "lazy" && recipe.difficulty === "easy") reasons.push("quick & easy");
  if (recipe.foodForm === "invisible" && ["reject", "hesitant"].includes(answers.comfort)) {
    reasons.push("beginner-friendly");
  }
  if (reasons.length === 0) return "";
  return "Great match: " + reasons.join(" + ");
}

export function buildPickedReason(recipe: Recipe, answers: Record<string, string>): string {
  const label = getMatchLabel(recipe, answers);
  return label || "Picked for you";
}
