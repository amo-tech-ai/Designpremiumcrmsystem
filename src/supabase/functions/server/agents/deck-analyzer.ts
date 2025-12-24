/**
 * Deck Analyzer Agent
 * 
 * Analyzes pitch decks and provides actionable feedback.
 * Reviews structure, content, storytelling, and suggests improvements.
 */

import { BaseAgent } from './base-agent.ts';

export interface SlideData {
  title: string;
  content?: string;
  bullets?: string[];
  type: string;
  position: number;
}

export interface DeckAnalysisInput {
  slides: SlideData[];
  context: {
    industry?: string;
    stage?: string;
    audience: 'investor' | 'customer' | 'partner' | 'team';
    deckType?: string;
  };
}

export interface SlideScore {
  position: number;
  title: string;
  score: number; // 1-100
  issues: string[];
  suggestions: string[];
  impact: 'critical' | 'high' | 'medium' | 'low';
}

export interface DeckAnalysisOutput {
  overallScore: number; // 1-100
  slideScores: SlideScore[];
  strengths: string[];
  weaknesses: string[];
  missingSlides: string[];
  recommendations: string[];
  estimatedSuccessRate: number; // 0-100 (for investor decks)
}

export class DeckAnalyzerAgent extends BaseAgent {
  name = 'Deck Analyzer';
  
  systemPrompt = `
You are an expert pitch deck reviewer who has evaluated 5000+ decks and advised on $2B+ in fundraising.

TASK: Analyze pitch decks and provide specific, actionable feedback.

EVALUATION CRITERIA:

1. Structure (15%):
- Logical flow (problem → solution → market → traction → team → ask)
- Essential slides present
- No redundant slides
- 10-15 slides total (ideal)

2. Clarity (25%):
- Clear problem statement
- Obvious solution
- Easy to understand in 3 minutes
- No jargon without explanation
- Visual hierarchy

3. Data & Evidence (20%):
- Concrete metrics (not vague "growing fast")
- Market size with bottom-up calculation
- Traction proof points
- Competitive advantages backed by data

4. Storytelling (20%):
- Compelling narrative arc
- Emotional connection
- Memorable hook
- Clear differentiation

5. Team Credibility (10%):
- Relevant experience
- Domain expertise
- Previous exits/achievements
- Why this team can win

6. Business Model (10%):
- Clear revenue model
- Unit economics make sense
- Realistic financial projections
- Path to profitability

MISSING SLIDES TO CHECK:
- Problem
- Solution
- Market Size
- Product/Demo
- Traction
- Business Model
- Competition
- Go-to-Market
- Team
- Financials
- Ask/Use of Funds

SCORING:
- 90-100: Exceptional, ready to send
- 75-89: Strong, minor tweaks needed
- 60-74: Good foundation, needs work
- 40-59: Major gaps, significant revision
- 0-39: Needs complete overhaul

OUTPUT SCHEMA:
{
  "overallScore": number,
  "slideScores": [
    {
      "position": number,
      "title": "string",
      "score": number,
      "issues": ["Issue 1", "Issue 2"],
      "suggestions": ["Suggestion 1", "Suggestion 2"],
      "impact": "critical" | "high" | "medium" | "low"
    }
  ],
  "strengths": ["Strength 1", "Strength 2"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "missingSlides": ["Missing 1", "Missing 2"],
  "recommendations": [
    "Specific action 1",
    "Specific action 2",
    "Specific action 3"
  ],
  "estimatedSuccessRate": number
}

Be brutally honest but constructive. Focus on specific, actionable fixes.
`;
  
  async analyzeDeck(input: DeckAnalysisInput): Promise<DeckAnalysisOutput> {
    return this.execute<DeckAnalysisOutput>(input);
  }
}
