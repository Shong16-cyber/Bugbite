export type Persona = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  funFacts: string[];
  edibility: string;
  accentColor: string;
};

export const personas: Persona[] = [
  {
    id: "cricket_curious",
    name: "The Cricket Curious",
    emoji: "🦗",
    tagline: "Open-minded with a side of crunch.",
    description:
      "You're curious but grounded. Not the first to try, not the last either. You'll happily try a cricket if it's seasoned well.",
    funFacts: [
      "Crickets contain more protein per gram than beef.",
      "They're farmed in over 20 countries as a food source.",
      "A cricket's chirp speed tells you the air temperature.",
    ],
    edibility: "Crickets are widely eaten and one of the most beginner-friendly edible insects.",
    accentColor: "#C6F6D5",
  },
  {
    id: "cautious_caterpillar",
    name: "The Cautious Caterpillar",
    emoji: "🐛",
    tagline: "Slow and steady. You'll get there.",
    description:
      "Bugs aren't your thing — yet. You'd rather start with something that doesn't look like a bug at all. Cricket flour pancake? Sure. Whole roasted scorpion? Hard pass.",
    funFacts: [
      "Caterpillars are a delicacy in many parts of Africa and Asia.",
      "They turn into butterflies, which most people find beautiful.",
      "Mopane worms (caterpillars) are eaten by millions across Southern Africa.",
    ],
    edibility: "Many caterpillar species are edible and considered nutritious traditional foods.",
    accentColor: "#FEFCBF",
  },
  {
    id: "bold_beetle",
    name: "The Bold Beetle",
    emoji: "🪲",
    tagline: "Bring on the weird stuff.",
    description:
      "You're an adventurer. You'd order the scorpion lollipop just for the story. You see a new ingredient and think 'how do I cook this?'",
    funFacts: [
      "Beetles make up about 25% of all known animal species.",
      "Mealworm beetle larvae taste mildly nutty when roasted.",
      "They're legally approved as food in the EU.",
    ],
    edibility: "Many beetle species and their larvae are edible and rich in healthy fats.",
    accentColor: "#FED7AA",
  },
  {
    id: "lazy_ladybug",
    name: "The Lazy Ladybug",
    emoji: "🐞",
    tagline: "If it takes more than 5 minutes, nope.",
    description:
      "Effort? Minimal. You want something you can grab, blend, or open from a bag. Bonus points if you can eat it standing at the counter.",
    funFacts: [
      "Ladybugs (the real ones) aren't typically eaten — they taste bitter.",
      "But cricket protein bars take zero effort and pack 10g protein per bar.",
      "No-bake bug recipes are a real category.",
    ],
    edibility: "Skip the ladybugs themselves, but powder-based bug snacks are perfect for low-effort eating.",
    accentColor: "#FECACA",
  },
  {
    id: "butterfly_foodie",
    name: "The Butterfly Foodie",
    emoji: "🦋",
    tagline: "Flavor is everything.",
    description:
      "You don't care what the ingredient is — you care how it tastes. Bold spices, layered flavors, umami bombs. If a bug can deliver that, you're in.",
    funFacts: [
      "Chapulines (grasshoppers) are a classic Oaxacan dish, seasoned with lime, garlic, and chili.",
      "Ant eggs have a citrusy, almost buttery flavor.",
      "Silkworm pupae are popular Korean street food (beondegi).",
    ],
    edibility: "Many edible insects are prized for their unique umami and nutty flavors.",
    accentColor: "#D8B4FE",
  },
  {
    id: "bee_snacker",
    name: "The Bee Snacker",
    emoji: "🐝",
    tagline: "Sweet first, brave later.",
    description:
      "You like your food sweet, light, and not too challenging. A cricket-flour cookie? Adorable. A whole insect on a plate? Maybe in 2027.",
    funFacts: [
      "Bee larvae are eaten in Japan, mixed with rice and soy sauce.",
      "Honey is technically a bug product everyone already loves.",
      "Cricket flour blends seamlessly into baked goods.",
    ],
    edibility: "Bee larvae are edible, but most beginners start with sweet baked goods made from cricket flour.",
    accentColor: "#FDE68A",
  },
];

// Matching logic - returns the persona id with highest score
export function matchPersona(answers: Record<string, string>): Persona {
  const scores: Record<string, number> = {
    cricket_curious: 0,
    cautious_caterpillar: 0,
    bold_beetle: 0,
    lazy_ladybug: 0,
    butterfly_foodie: 0,
    bee_snacker: 0,
  };

  // Cautious Caterpillar: high fear
  if (["panic", "avoid"].includes(answers.fear_baseline)) scores.cautious_caterpillar += 3;
  if (["reject", "hesitant"].includes(answers.comfort)) scores.cautious_caterpillar += 3;

  // Bold Beetle: adventurous
  if (answers.comfort === "enthusiast") scores.bold_beetle += 3;
  if (["ambitious", "extreme"].includes(answers.effort_level)) scores.bold_beetle += 2;
  if (answers.fear_baseline === "chill") scores.bold_beetle += 2;

  // Cricket Curious: balanced + crunchy
  if (answers.fear_baseline === "curious") scores.cricket_curious += 2;
  if (answers.comfort === "open") scores.cricket_curious += 2;
  if (answers.texture_pref === "crunchy") scores.cricket_curious += 2;

  // Lazy Ladybug: low effort
  if (answers.effort_level === "lazy") scores.lazy_ladybug += 4;
  if (["smooth", "mixed"].includes(answers.texture_pref)) scores.lazy_ladybug += 1;

  // Butterfly Foodie: bold flavors
  if (["spicy_savory", "umami"].includes(answers.flavor_profile)) scores.butterfly_foodie += 3;
  if (["medium", "ambitious"].includes(answers.effort_level)) scores.butterfly_foodie += 1;

  // Bee Snacker: sweet + cautious
  if (answers.flavor_profile === "sweet") scores.bee_snacker += 3;
  if (["panic", "avoid"].includes(answers.fear_baseline)) scores.bee_snacker += 1;

  // Find highest score
  const winnerId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return personas.find((p) => p.id === winnerId) || personas[0];
}
