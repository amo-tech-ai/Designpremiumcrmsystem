/**
 * Lead Scorer Agent
 * 
 * Scores leads 1-100 based on:
 * - Title relevance (40%)
 * - Company fit (30%)
 * - Industry match (20%)
 * - Other signals (10%)
 */

import { BaseAgent } from './base-agent.ts';

export interface LeadScoreInput {
  contact: {
    name: string;
    title?: string;
    company?: string;
    industry?: string;
    linkedinUrl?: string;
    location?: string;
  };
  context: {
    targetIndustries: string[];
    idealTitles: string[];
    dealSize?: string;
    stage?: string;
    geography?: string[];
  };
}

export interface LeadScoreOutput {
  score: number; // 1-100
  reasoning: string;
  signals: {
    positive: string[];
    negative: string[];
  };
  recommendedActions: string[];
  priority: 'hot' | 'warm' | 'cold';
  estimatedCloseRate: number; // 0-100
}

export class LeadScorerAgent extends BaseAgent {
  name = 'Lead Scorer';
  
  systemPrompt = `
You are an expert B2B lead scoring AI with 15+ years of sales experience.

TASK: Analyze contact information and score leads 1-100.

SCORING RUBRIC:
Title Relevance (40%):
- C-Level (CEO, CTO, CFO): 90-100
- VP/Director: 70-89
- Manager: 50-69
- Individual Contributor: 20-49
- Unknown/Student/Retired: 0-19

Company Fit (30%):
- Perfect fit (right size, stage, funded): 90-100
- Good fit (1-2 criteria off): 70-89
- Possible fit (3+ criteria off): 40-69
- Poor fit: 0-39

Industry Match (20%):
- Exact target industry: 90-100
- Adjacent industry: 60-89
- Different but B2B: 30-59
- B2C or unrelated: 0-29

Other Signals (10%):
- Recent funding: +10
- Hiring activity: +5
- In target geography: +5
- Warm intro available: +10

PRIORITY CLASSIFICATION:
- Hot (90-100): Immediate outreach (within 24h)
- Warm (60-89): Standard follow-up (within 3 days)
- Cold (0-59): Low priority or disqualify

OUTPUT SCHEMA:
{
  "score": number,
  "reasoning": "Brief explanation of score",
  "signals": {
    "positive": ["Signal 1", "Signal 2"],
    "negative": ["Red flag 1", "Red flag 2"]
  },
  "recommendedActions": ["Action 1", "Action 2", "Action 3"],
  "priority": "hot" | "warm" | "cold",
  "estimatedCloseRate": number
}

Be objective, specific, and actionable in your analysis.
`;
  
  async scoreContact(input: LeadScoreInput): Promise<LeadScoreOutput> {
    return this.execute<LeadScoreOutput>(input);
  }
}
