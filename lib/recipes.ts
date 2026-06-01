export type Recipe = {
  id: string;
  name: string;
  emoji: string;
  illustration: string;
  /** Optional secondary illustration shown alongside the steps list. */
  stepsIllustration?: string;
  /**
   * Optional pixel-height ratios for each step section in `stepsIllustration`,
   * used to vertically align the steps text rows with the image's section
   * dividers. Length must equal `steps.length`. If omitted, rows share equal
   * height (good for illustrations with evenly-sized sections).
   */
  stepsSectionRatios?: number[];
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
    illustration: "/illustrations/recipes/energy-balls.png",
    stepsIllustration: "/illustrations/recipes/energy-balls-steps.png",
    // Image (564×1038): step 2 stacks two rows (ingredients + processor). Last includes 30 px buffer.
    stepsSectionRatios: [280, 330, 184, 214],
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
    illustration: "/illustrations/recipes/pancakes.png",
    stepsIllustration: "/illustrations/recipes/pancake-steps.png",
    // Heights of the 5 step sections in pancake-steps.png (last includes 30 px buffer).
    stepsSectionRatios: [192, 207, 203, 167, 190],
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
    illustration: "/illustrations/recipes/roasted-crickets.png",
    stepsIllustration: "/illustrations/recipes/roasted-crickets-steps.png",
    // 5 equal step sections + 30 px bottom buffer (image now 551×1027).
    stepsSectionRatios: [200, 200, 200, 200, 227],
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
    illustration: "/illustrations/recipes/tempura.png",
    stepsIllustration: "/illustrations/recipes/tempura-steps.png",
    // 5 equal step sections + 30 px bottom buffer (image 564×1042).
    stepsSectionRatios: [200, 220, 200, 200, 188],
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
    illustration: "/illustrations/recipes/cookies.png",
    stepsIllustration: "/illustrations/recipes/cookies-steps.png",
    // 5 equal step sections + 30 px bottom buffer (image 565×1042).
    stepsSectionRatios: [200, 230, 180, 220, 181],
    insect: "cricket",
    foodForm: "invisible",
    difficulty: "easy",
    texture: "chewy",
    flavorTags: ["sweet"],
    prepTime: "30+ min",
    shortDesc: "Classic cookies with 5g of cricket protein per bite.",
    ingredients: [
      "1¾ cups all-purpose flour",
      "¼ cup cricket flour",
      "1 tsp baking soda",
      "½ tsp sea salt",
      "1 cup unsalted butter, softened",
      "¾ cup brown sugar",
      "½ cup white sugar",
      "2 eggs",
      "1 tsp vanilla extract",
      "2 cups chocolate chips",
    ],
    steps: [
      "Preheat oven to 375°F (190°C). Line a baking sheet with parchment.",
      "Whisk flours, baking soda, and salt in a bowl.",
      "Cream butter and sugars until fluffy. Beat in eggs and vanilla.",
      "Stir in dry mix, then fold in chocolate chips.",
      "Drop rounded tablespoons onto the sheet. Bake 9-11 min until edges are golden.",
    ],
    nutrition: {
      protein: "5g per cookie",
      sustainability: "Cricket flour uses 2,000x less water than equivalent beef protein",
      calories: "~140 kcal per cookie",
    },
  },
  {
    id: "mealworm_stirfry",
    name: "Mealworm Veggie Stir-Fry",
    emoji: "🥡",
    illustration: "/illustrations/recipes/stirfry.png",
    stepsIllustration: "/illustrations/recipes/stirfry-steps.png",
    stepsSectionRatios: [200, 220, 200, 200, 202],
    insect: "mealworm",
    foodForm: "pieces",
    difficulty: "medium",
    texture: "mixed",
    flavorTags: ["savory", "spicy"],
    prepTime: "15 min",
    shortDesc: "Weeknight stir-fry with crispy mealworms and fresh ginger.",
    ingredients: [
      "1 cup mealworms (food-grade, cleaned)",
      "1 tbsp sesame oil",
      "1 red bell pepper, sliced",
      "1 cup broccoli florets",
      "1 carrot, julienned",
      "2 garlic cloves, minced",
      "1 inch fresh ginger, grated",
      "2 tbsp soy sauce",
      "1 tsp chili paste",
      "Cooked rice, for serving",
    ],
    steps: [
      "Toast mealworms in a dry wok over medium heat for 3-4 min until crispy. Set aside.",
      "Add sesame oil to the wok. Sauté ginger and garlic for 30 seconds.",
      "Add bell pepper, broccoli, and carrot. Stir-fry 3-4 min until just tender.",
      "Stir in soy sauce, chili paste, and the toasted mealworms.",
      "Spoon over rice and serve hot.",
    ],
    nutrition: {
      protein: "16g per serving",
      sustainability: "Mealworms convert food waste into protein at a 2:1 ratio",
      calories: "~310 kcal per serving",
    },
  },
  {
    id: "silkworm_smoothie",
    name: "Silkworm Protein Smoothie",
    emoji: "🥤",
    illustration: "/illustrations/recipes/smoothie.png",
    stepsIllustration: "/illustrations/recipes/smoothie-steps.png",
    stepsSectionRatios: [400, 280, 342],
    insect: "silkworm",
    foodForm: "invisible",
    difficulty: "easy",
    texture: "smooth",
    flavorTags: ["sweet"],
    prepTime: "5 min",
    shortDesc: "Blend it and forget it. Banana, oats, silkworm powder.",
    ingredients: [
      "1 frozen banana",
      "½ cup rolled oats",
      "1 tbsp silkworm powder",
      "1 cup almond milk (or any milk)",
      "1 tbsp peanut butter",
      "1 tsp honey",
      "Pinch of cinnamon",
    ],
    steps: [
      "Add all ingredients to a blender.",
      "Blend on high for 30-45 seconds until smooth.",
      "Pour into a glass. Dust with extra cinnamon.",
    ],
    nutrition: {
      protein: "14g per serving",
      sustainability: "Silkworm pupae are a byproduct of silk production — zero-waste protein",
      calories: "~330 kcal per serving",
    },
  },
  {
    id: "black_ant_risotto",
    name: "Black Ant Risotto",
    emoji: "🍚",
    illustration: "/illustrations/recipes/risotto.png",
    stepsIllustration: "/illustrations/recipes/risotto-steps.png",
    // 5 equal step sections + 30 px bottom buffer (image 564×1042).
    stepsSectionRatios: [200, 200, 200, 200, 225],
    insect: "ant",
    foodForm: "whole",
    difficulty: "adventurous",
    texture: "mixed",
    flavorTags: ["savory"],
    prepTime: "30+ min",
    shortDesc: "Creamy risotto topped with citrusy black ants.",
    ingredients: [
      "1½ cups arborio rice",
      "4 cups warm vegetable stock",
      "1 small onion, finely diced",
      "2 garlic cloves, minced",
      "½ cup dry white wine",
      "½ cup grated parmesan",
      "2 tbsp unsalted butter",
      "2 tbsp olive oil",
      "1 tbsp dried black ants (food-grade)",
      "Zest of 1 lemon",
      "Fresh parsley, to garnish",
    ],
    steps: [
      "Warm the stock in a separate pot and keep it at a gentle simmer.",
      "Sauté onion in olive oil until translucent, then stir in garlic.",
      "Add rice and toast 1 min. Pour in wine and stir until fully absorbed.",
      "Add warm stock one ladle at a time, stirring until each ladle is absorbed (~18 min).",
      "Off heat, stir in butter, parmesan, and lemon zest. Top with black ants and parsley.",
    ],
    nutrition: {
      protein: "12g per serving",
      sustainability: "Ants require almost no feed or water — fully foraged",
      calories: "~420 kcal per serving",
    },
  },
  {
    id: "cricket_protein_bar",
    name: "Cricket Protein Bar",
    emoji: "🍫",
    illustration: "/illustrations/recipes/chocolate.png",
    stepsIllustration: "/illustrations/recipes/chocolate-steps.png",
    stepsSectionRatios: [280, 317, 226, 201],
    insect: "cricket",
    foodForm: "powder",
    difficulty: "easy",
    texture: "chewy",
    flavorTags: ["sweet", "savory"],
    prepTime: "5 min",
    shortDesc: "Grab-and-go protein bar. Zero cooking required.",
    ingredients: [
      "1 cup pitted medjool dates",
      "½ cup almond butter",
      "¼ cup cricket flour",
      "¼ cup rolled oats",
      "2 tbsp honey",
      "2 tbsp mini chocolate chips",
      "Pinch of sea salt",
    ],
    steps: [
      "Blend dates in a food processor until they form a smooth paste.",
      "Add almond butter, cricket flour, oats, honey, and salt. Pulse until combined.",
      "Press into a parchment-lined 8×8 pan. Sprinkle chocolate chips on top, press them in.",
      "Chill for 30 min. Cut into 8 bars. Keeps 1 week in the fridge.",
    ],
    nutrition: {
      protein: "9g per bar",
      sustainability: "1 kg of cricket protein uses 2,000x less water than 1 kg of beef",
      calories: "~220 kcal per bar",
    },
  },
  {
    id: "chapulines_tacos",
    name: "Chapulines Street Tacos",
    emoji: "🌮",
    illustration: "/illustrations/recipes/tacos.png",
    stepsIllustration: "/illustrations/recipes/tacos-steps.png",
    // Step 2 (toss + arrows) is largest, step 4 (assembly strip) is smallest.
    stepsSectionRatios: [225, 261, 194, 122, 220],
    insect: "grasshopper",
    foodForm: "whole",
    difficulty: "medium",
    texture: "crunchy",
    flavorTags: ["spicy", "savory"],
    prepTime: "15 min",
    shortDesc: "Toasted grasshoppers with lime, chili, and fresh cilantro.",
    ingredients: [
      "1 cup chapulines (dried grasshoppers, food-grade)",
      "1 tbsp olive oil",
      "1 tsp chili powder",
      "1 lime",
      "8 small corn tortillas",
      "1 avocado, sliced",
      "½ cup fresh cilantro",
      "1 small red onion, finely diced",
      "1 jalapeño, sliced",
      "Salt to taste",
    ],
    steps: [
      "Toast chapulines in a dry pan over medium heat for 2-3 min until crisp.",
      "Drizzle with olive oil. Add chili powder, salt, and a squeeze of lime. Toss.",
      "Warm tortillas in a separate pan until pliable.",
      "Build each taco: tortilla → avocado → chapulines → onion → cilantro → jalapeño.",
      "Finish with another squeeze of lime.",
    ],
    nutrition: {
      protein: "13g per 2 tacos",
      sustainability: "Grasshoppers emit 80x less methane per kg than cattle",
      calories: "~290 kcal per 2 tacos",
    },
  },
  {
    id: "ant_egg_salad",
    name: "Ant-Egg Citrus Salad",
    emoji: "🥗",
    illustration: "/illustrations/recipes/salad.png",
    stepsIllustration: "/illustrations/recipes/salad-steps.png",
    stepsSectionRatios: [200, 200, 200, 200, 221],
    insect: "ant",
    foodForm: "pieces",
    difficulty: "adventurous",
    texture: "mixed",
    flavorTags: ["savory"],
    prepTime: "15 min",
    shortDesc: "Buttery ant eggs over greens with a lime vinaigrette.",
    ingredients: [
      "2 cups mixed greens (arugula, butter lettuce)",
      "½ cup escamoles (ant eggs, fresh or canned)",
      "1 tbsp unsalted butter",
      "1 orange, segmented",
      "¼ cup pomegranate seeds",
      "2 tbsp olive oil",
      "1 tbsp fresh lime juice",
      "1 tsp honey",
      "Fresh mint leaves",
      "Salt and pepper",
    ],
    steps: [
      "Melt butter in a small pan. Add escamoles and warm gently for 1-2 min.",
      "Whisk olive oil, lime juice, honey, salt, and pepper for the dressing.",
      "Toss greens with half the dressing. Plate them.",
      "Top with orange segments, pomegranate, warm escamoles, and mint.",
      "Drizzle with remaining dressing and serve.",
    ],
    nutrition: {
      protein: "10g per serving",
      sustainability: "Escamoles are a regenerative wild harvest from Mexico's high plateau",
      calories: "~250 kcal per serving",
    },
  },
  {
    id: "cricket_crumble_topping",
    name: "5-Min Cricket Crumble Topping",
    emoji: "🥣",
    illustration: "/illustrations/recipes/crumble.png",
    stepsIllustration: "/illustrations/recipes/crumble-steps.png",
    stepsSectionRatios: [200, 220, 200, 180, 222],
    insect: "cricket",
    foodForm: "pieces",
    difficulty: "easy",
    texture: "crunchy",
    flavorTags: ["savory"],
    prepTime: "5 min",
    shortDesc: "Roast, crush, sprinkle. Adds protein to anything.",
    ingredients: [
      "1 cup dried crickets (food-grade)",
      "1 tbsp olive oil",
      "½ tsp smoked paprika",
      "½ tsp garlic powder",
      "Salt to taste",
    ],
    steps: [
      "Preheat oven to 375°F (190°C).",
      "Spread crickets on a baking sheet. Roast 8 min until crispy.",
      "Toss warm crickets with olive oil, paprika, garlic powder, and salt.",
      "Cool, then pulse briefly in a food processor until coarsely crushed.",
      "Sprinkle on salads, avocado toast, soup — anywhere you'd want a crispy topping.",
    ],
    nutrition: {
      protein: "8g per 2 tbsp",
      sustainability: "Crickets need 12x less feed than beef for the same protein",
      calories: "~50 kcal per 2 tbsp",
    },
  },
  {
    id: "mealworm_pasta",
    name: "Mealworm Bolognese",
    emoji: "🍝",
    illustration: "/illustrations/recipes/pasta.png",
    stepsIllustration: "/illustrations/recipes/pasta-steps.png",
    stepsSectionRatios: [215, 215, 195, 220, 177],
    insect: "mealworm",
    foodForm: "pieces",
    difficulty: "medium",
    texture: "mixed",
    flavorTags: ["savory"],
    prepTime: "30+ min",
    shortDesc: "A rich, meaty bolognese — with mealworms doing the heavy lifting.",
    ingredients: [
      "1 lb spaghetti or rigatoni",
      "1 cup mealworms (food-grade, cleaned)",
      "1 small onion, diced",
      "2 carrots, diced",
      "2 celery stalks, diced",
      "3 garlic cloves, minced",
      "2 tbsp olive oil",
      "1 can (28 oz) crushed tomatoes",
      "½ cup red wine",
      "1 tsp dried oregano",
      "Salt, pepper, parmesan to serve",
    ],
    steps: [
      "Pulse mealworms in a food processor until they look like coarse mince.",
      "Heat olive oil in a deep pan. Cook onion, carrot, and celery until softened (~7 min).",
      "Add garlic and the mealworm mince. Cook 2 min more.",
      "Pour in red wine and let it reduce by half. Add tomatoes and oregano.",
      "Simmer 25 min. Cook pasta al dente in the meantime. Toss together with parmesan.",
    ],
    nutrition: {
      protein: "22g per serving",
      sustainability: "Mealworms produce 100x less greenhouse gas than equivalent beef",
      calories: "~480 kcal per serving",
    },
  },
  {
    id: "grasshopper_guacamole",
    name: "Grasshopper Guacamole",
    emoji: "🥑",
    illustration: "/illustrations/recipes/guacamole.png",
    stepsIllustration: "/illustrations/recipes/guacamole-steps.png",
    stepsSectionRatios: [245, 305, 245, 226],
    insect: "grasshopper",
    foodForm: "whole",
    difficulty: "easy",
    texture: "mixed",
    flavorTags: ["savory", "spicy"],
    prepTime: "5 min",
    shortDesc: "Classic guac topped with toasted chapulines for a satisfying crunch.",
    ingredients: [
      "2 ripe avocados",
      "¼ cup toasted chapulines (dried grasshoppers)",
      "1 small tomato, diced",
      "½ small red onion, finely chopped",
      "1 jalapeño, minced",
      "Juice of 1 lime",
      "¼ cup fresh cilantro, chopped",
      "Salt to taste",
      "Tortilla chips, to serve",
    ],
    steps: [
      "Mash avocados in a bowl with a fork — keep some chunks for texture.",
      "Stir in tomato, onion, jalapeño, lime juice, and cilantro. Salt to taste.",
      "Top with toasted chapulines right before serving so they stay crunchy.",
      "Serve with warm tortilla chips.",
    ],
    nutrition: {
      protein: "6g per serving",
      sustainability: "Chapulines are wild-harvested in Mexico — no feed, no fertilizer",
      calories: "~210 kcal per serving",
    },
  },
  {
    id: "silkworm_miso_soup",
    name: "Silkworm Miso Soup",
    emoji: "🍜",
    illustration: "/illustrations/recipes/miso.png",
    stepsIllustration: "/illustrations/recipes/miso-steps.png",
    stepsSectionRatios: [195, 205, 200, 200, 222],
    insect: "silkworm",
    foodForm: "whole",
    difficulty: "adventurous",
    texture: "chewy",
    flavorTags: ["savory"],
    prepTime: "15 min",
    shortDesc: "Traditional miso soup with silkworm pupae — popular Korean street food.",
    ingredients: [
      "4 cups dashi or vegetable broth",
      "½ cup beondegi (silkworm pupae, canned)",
      "3 tbsp white miso paste",
      "½ block soft tofu, cubed",
      "2 tbsp dried wakame seaweed",
      "2 green onions, sliced",
      "1 tsp toasted sesame oil",
    ],
    steps: [
      "Rehydrate wakame in cold water for 5 min. Drain.",
      "Heat dashi in a pot until just simmering — don't boil (boiling kills miso flavor).",
      "Whisk miso paste with a ladle of warm dashi, then stir back into the pot.",
      "Add beondegi, tofu, and wakame. Warm gently for 2-3 min.",
      "Ladle into bowls. Top with green onions and a few drops of sesame oil.",
    ],
    nutrition: {
      protein: "12g per bowl",
      sustainability: "Silkworm pupae are a byproduct of silk production — zero-waste protein",
      calories: "~180 kcal per bowl",
    },
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
