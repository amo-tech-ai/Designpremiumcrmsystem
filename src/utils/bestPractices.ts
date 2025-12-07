
// Best practices for Pitch Decks used by the Slide AI and Wizard

export interface SlideBestPractice {
  rules: string;
  avoid: string;
}

export const BEST_PRACTICES: Record<string, SlideBestPractice> = {
  title: {
    rules: "Logo prominent + tagline max 5 words",
    avoid: "Generic titles like 'Pitch Deck'"
  },
  problem: {
    rules: "Exactly 3 pain points, concrete and relatable",
    avoid: "Vague complaints, more than 3 problems"
  },
  solution: {
    rules: "Mirror problem structure, one solution per pain point",
    avoid: "Technical jargon, feature lists without benefits"
  },
  market: {
    rules: "TAM/SAM/SOM numbers + 'why now' timing",
    avoid: "Unrealistic market size, no sources"
  },
  competition: {
    rules: "Never say 'no competition', use 2x2 matrix or feature comparison",
    avoid: "Bash competitors, ignoring indirect competition"
  },
  traction: {
    rules: "One powerful metric (North Star), clearly visualized",
    avoid: "Vanity metrics, cumulative graphs that hide churn"
  },
  team: {
    rules: "Name + credential + past company logo for key members",
    avoid: "Advisors before core team, generic descriptions"
  },
  ask: {
    rules: "Specific amount + 3-4 use categories with %",
    avoid: "Vague ranges, lack of runway definition"
  },
  // Fallback for other slide types
  vision: {
    rules: "Big picture future state, inspiring",
    avoid: "Small thinking, incremental improvements"
  },
  product: {
    rules: "Show don't tell, screenshots or diagrams",
    avoid: "Walls of text, specifications"
  },
  business_model: {
    rules: "Unit economics, clear revenue streams",
    avoid: "Confusing pricing schemes"
  }
};

export const getBestPractice = (slideType: string): SlideBestPractice => {
  const normalizedType = slideType.toLowerCase().replace(' ', '_');
  return BEST_PRACTICES[normalizedType] || {
    rules: "Clear, concise, high impact",
    avoid: "Clutter, jargon"
  };
};
