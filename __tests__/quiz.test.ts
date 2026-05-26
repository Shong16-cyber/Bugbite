import { matchPersona } from "../lib/personas";
import { getTopRecipes, getSortedRecipes } from "../lib/recipes";

// ─────────────────────────────────────────
// Test Suite 1: Persona Matching
// ─────────────────────────────────────────
describe("matchPersona", () => {
  test("high-fear + reject answers → Cautious Caterpillar", () => {
    const answers = {
      fear_baseline: "panic",
      fear_triggers: "legs",
      comfort: "reject",
      texture_pref: "smooth",
      flavor_profile: "sweet",
      effort_level: "lazy",
    };
    const persona = matchPersona(answers);
    expect(persona.id).toBe("cautious_caterpillar");
  });

  test("enthusiast + ambitious answers → Bold Beetle", () => {
    const answers = {
      fear_baseline: "chill",
      fear_triggers: "wings",
      comfort: "enthusiast",
      texture_pref: "crunchy",
      flavor_profile: "spicy_savory",
      effort_level: "ambitious",
    };
    const persona = matchPersona(answers);
    expect(persona.id).toBe("bold_beetle");
  });

  test("lazy + smooth answers → Lazy Ladybug", () => {
    const answers = {
      fear_baseline: "curious",
      fear_triggers: "wings",
      comfort: "open",
      texture_pref: "smooth",
      flavor_profile: "sweet",
      effort_level: "lazy",
    };
    const persona = matchPersona(answers);
    expect(persona.id).toBe("lazy_ladybug");
  });

  test("sweet flavor + avoid answers → Bee Snacker", () => {
    const answers = {
      fear_baseline: "avoid",
      fear_triggers: "wings",
      comfort: "open",
      texture_pref: "chewy",
      flavor_profile: "sweet",
      effort_level: "medium",
    };
    const persona = matchPersona(answers);
    expect(persona.id).toBe("bee_snacker");
  });

  test("always returns a valid persona even with empty answers", () => {
    const persona = matchPersona({});
    expect(persona).toBeDefined();
    expect(persona.id).toBeTruthy();
    expect(persona.name).toBeTruthy();
  });
});

// ─────────────────────────────────────────
// Test Suite 2: Recipe Matching / Scoring
// ─────────────────────────────────────────
describe("getTopRecipes", () => {
  test("fearful user (legs trigger + reject) gets powder/invisible recipes first", () => {
    const answers = {
      fear_baseline: "panic",
      fear_triggers: "legs",
      comfort: "reject",
      texture_pref: "smooth",
      flavor_profile: "sweet",
      effort_level: "lazy",
    };
    const top = getTopRecipes(answers, 3);
    const forms = top.map((r) => r.foodForm);
    // All top 3 should be powder or invisible
    expect(forms.every((f) => f === "powder" || f === "invisible")).toBe(true);
  });

  test("adventurous user gets whole/pieces recipes in top results", () => {
    const answers = {
      fear_baseline: "chill",
      fear_triggers: "wings",
      comfort: "enthusiast",
      texture_pref: "crunchy",
      flavor_profile: "spicy",
      effort_level: "ambitious",
    };
    const top = getTopRecipes(answers, 3);
    const forms = top.map((r) => r.foodForm);
    expect(forms.some((f) => f === "whole" || f === "pieces")).toBe(true);
  });

  test("lazy user gets only easy recipes in top 3", () => {
    const answers = {
      fear_baseline: "avoid",
      fear_triggers: "antennae",
      comfort: "hesitant",
      texture_pref: "chewy",
      flavor_profile: "sweet",
      effort_level: "lazy",
    };
    const top = getTopRecipes(answers, 3);
    expect(top.every((r) => r.difficulty === "easy")).toBe(true);
  });

  test("always returns exactly n recipes", () => {
    const answers = {
      fear_baseline: "curious",
      fear_triggers: "wings",
      comfort: "open",
      texture_pref: "crunchy",
      flavor_profile: "savory",
      effort_level: "medium",
    };
    expect(getTopRecipes(answers, 3)).toHaveLength(3);
    expect(getTopRecipes(answers, 5)).toHaveLength(5);
  });
});

// ─────────────────────────────────────────
// Test Suite 3: Recipe Sorting (no quiz)
// ─────────────────────────────────────────
describe("getSortedRecipes", () => {
  test("with no quiz answers, sorts easiest recipes first", () => {
    const sorted = getSortedRecipes(null);
    const difficulties = sorted.map((r) => r.difficulty);
    const firstHard = difficulties.indexOf("adventurous");
    const lastEasy = difficulties.lastIndexOf("easy");
    // All easy recipes should appear before any adventurous ones
    expect(lastEasy).toBeLessThan(firstHard);
  });

  test("returns all 15 recipes when no filters applied", () => {
    const sorted = getSortedRecipes(null);
    expect(sorted).toHaveLength(15);
  });

  test("with quiz answers, returns same count but different order than no-quiz", () => {
    const answers = {
      fear_baseline: "chill",
      fear_triggers: "wings",
      comfort: "enthusiast",
      texture_pref: "crunchy",
      flavor_profile: "spicy",
      effort_level: "ambitious",
    };
    const withQuiz = getSortedRecipes(answers);
    const withoutQuiz = getSortedRecipes(null);
    expect(withQuiz).toHaveLength(withoutQuiz.length);
    // Order should differ
    expect(withQuiz.map((r) => r.id)).not.toEqual(withoutQuiz.map((r) => r.id));
  });
});
