export type QuizOption = {
  emoji: string;
  label: string;
  value: string;
};

export type QuizQuestion = {
  id: string;
  stage: 1 | 2;
  dimension: "fear_baseline" | "fear_triggers" | "comfort" | "texture_pref" | "flavor_profile" | "effort_level";
  question: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  // Stage 1: How Brave Are You?
  {
    id: "q1",
    stage: 1,
    dimension: "fear_baseline",
    question: "A bug lands on your arm. What's your first move?",
    options: [
      { emoji: "😱", label: "Scream and flail (legit panic)", value: "panic" },
      { emoji: "🏃", label: "Flick it off, walk away fast", value: "avoid" },
      { emoji: "🤔", label: "Observe it briefly, then gently shoo", value: "curious" },
      { emoji: "😎", label: "Let it chill, it's just vibing", value: "chill" },
    ],
  },
  {
    id: "q2",
    stage: 1,
    dimension: "fear_triggers",
    question: "Which bug feature creeps you out the most?",
    options: [
      { emoji: "🦵", label: "Legs (so many of them)", value: "legs" },
      { emoji: "📡", label: "Antennae (why are they wiggling)", value: "antennae" },
      { emoji: "👁️", label: "Eyes (they're watching me)", value: "eyes" },
      { emoji: "🪽", label: "Wings (the surprise flying)", value: "wings" },
    ],
  },
  {
    id: "q3",
    stage: 1,
    dimension: "comfort",
    question: "You open a snack bag and realize it's cricket protein chips. You...",
    options: [
      { emoji: "🚫", label: "Nope. Throw it out.", value: "reject" },
      { emoji: "😬", label: "Eat around the obvious bits", value: "hesitant" },
      { emoji: "🤷", label: "Try one, see what happens", value: "open" },
      { emoji: "🤩", label: "Already a fan, actually", value: "enthusiast" },
    ],
  },
  // Stage 2: What's Your Flavor?
  {
    id: "q4",
    stage: 2,
    dimension: "texture_pref",
    question: "Your ideal snack texture?",
    options: [
      { emoji: "🥨", label: "Crunchy (chips, nuts, crackers)", value: "crunchy" },
      { emoji: "🍡", label: "Chewy (gummies, mochi)", value: "chewy" },
      { emoji: "🥤", label: "Smooth (smoothies, yogurt)", value: "smooth" },
      { emoji: "🎲", label: "Honestly, mix it up", value: "mixed" },
    ],
  },
  {
    id: "q5",
    stage: 2,
    dimension: "flavor_profile",
    question: "Pick your flavor vibe:",
    options: [
      { emoji: "🌶️", label: "Spicy & savory", value: "spicy_savory" },
      { emoji: "🍯", label: "Sweet & comforting", value: "sweet" },
      { emoji: "🧂", label: "Salty & umami", value: "umami" },
      { emoji: "🌿", label: "Fresh & herby", value: "herby" },
    ],
  },
  {
    id: "q6",
    stage: 2,
    dimension: "effort_level",
    question: "How do you feel about cooking tonight?",
    options: [
      { emoji: "🛋️", label: "Absolutely not. 5 minutes max.", value: "lazy" },
      { emoji: "🍳", label: "I can do a weeknight meal", value: "medium" },
      { emoji: "👨‍🍳", label: "Give me a weekend project", value: "ambitious" },
      { emoji: "🔥", label: "Bring on the multi-step chaos", value: "extreme" },
    ],
  },
];

export type QuizAnswers = Record<string, string>;
