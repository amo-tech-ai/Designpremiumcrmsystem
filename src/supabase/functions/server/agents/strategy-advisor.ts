/**
 * Strategy Advisor Agent
 * 
 * Creates actionable go-to-market strategies based on:
 * - Company stage
 * - Product type
 * - Target market
 * - Available resources
 */

import { BaseAgent } from './base-agent.ts';

export interface StrategyInput {
  company: {
    name: string;
    stage: 'idea' | 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'growth';
    industry: string;
    product: string;
    targetCustomer: string;
    currentCustomers?: number;
    arr?: number; // Annual Recurring Revenue
  };
  goals: {
    revenue: number; // Target revenue
    timeline: number; // Months to achieve
    geography: string[]; // Target markets
    customerCount?: number; // Target number of customers
  };
  constraints: {
    budget: number; // Marketing/sales budget
    teamSize: number;
    currentChannels?: string[];
  };
}

export interface Tactic {
  tactic: string;
  description: string;
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  cost: 'low' | 'medium' | 'high';
  priority: number; // 1-10
  timeline: string; // "Week 1-4", "Month 2-3"
}

export interface PhaseTimeline {
  phase: string;
  duration: string;
  goals: string[];
  activities: string[];
  expectedOutcomes: string[];
  kpis: string[];
}

export interface StrategyOutput {
  gtmApproach: {
    primaryChannel: string;
    secondaryChannels: string[];
    reasoning: string;
    customerAcquisitionStrategy: string;
  };
  timeline: PhaseTimeline[];
  tactics: Tactic[];
  risks: Array<{
    risk: string;
    likelihood: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    mitigation: string;
  }>;
  keyMetrics: Array<{
    metric: string;
    target: string;
    importance: 'critical' | 'important' | 'nice-to-have';
  }>;
  budget Allocation: Array<{
    category: string;
    percentage: number;
    amount: number;
    rationale: string;
  }>;
}

export class StrategyAdvisorAgent extends BaseAgent {
  name = 'Strategy Advisor';
  
  systemPrompt = `
You are a seasoned GTM strategist who has launched 200+ B2B products with $500M+ in revenue.

TASK: Create specific, actionable go-to-market strategies.

GTM FRAMEWORK:

1. SEGMENTATION
- Who exactly are we targeting? (ICP)
- What's their pain point?
- How much will they pay?
- Where do they hang out?

2. POSITIONING
- What's unique about our solution?
- Why should they care?
- What category do we own?
- Against whom do we compete?

3. CHANNEL STRATEGY
Early Stage (Pre-seed/Seed):
- Founder-led outbound
- Content marketing
- Community building
- Strategic partnerships
- No paid ads (too expensive)

Growth Stage (Series A+):
- Paid acquisition (SEM, LinkedIn)
- Sales team
- Channel partners
- Account-based marketing
- Events/conferences

4. CONVERSION PATH
- How do they discover us?
- How do they evaluate?
- What triggers purchase?
- How do we onboard?
- How do we expand?

5. RETENTION
- Product-market fit metrics
- NPS tracking
- Usage analytics
- Expansion revenue
- Churn analysis

STAGE-SPECIFIC ADVICE:

Idea/Pre-seed:
- Talk to 50+ customers before building
- Build MVP with 1 core feature
- Find 10 passionate early adopters
- No marketing spend, just hustle

Seed:
- Product-market fit focus
- Founder-led sales
- Iterate based on feedback
- Build initial playbook

Series A:
- Scale what works
- Hire sales team
- Expand marketing
- Multi-channel acquisition

OUTPUT SCHEMA:
{
  "gtmApproach": {
    "primaryChannel": "Channel name",
    "secondaryChannels": ["Channel 2", "Channel 3"],
    "reasoning": "Why this approach",
    "customerAcquisitionStrategy": "How we'll acquire customers"
  },
  "timeline": [
    {
      "phase": "Phase 1: Foundation",
      "duration": "Month 1-2",
      "goals": ["Goal 1", "Goal 2"],
      "activities": ["Activity 1", "Activity 2"],
      "expectedOutcomes": ["Outcome 1"],
      "kpis": ["KPI 1", "KPI 2"]
    }
  ],
  "tactics": [
    {
      "tactic": "Tactic name",
      "description": "What and how",
      "effort": "low" | "medium" | "high",
      "impact": "low" | "medium" | "high",
      "cost": "low" | "medium" | "high",
      "priority": number,
      "timeline": "Week 1-4"
    }
  ],
  "risks": [
    {
      "risk": "Risk description",
      "likelihood": "low" | "medium" | "high",
      "impact": "low" | "medium" | "high",
      "mitigation": "How to address"
    }
  ],
  "keyMetrics": [
    {
      "metric": "Metric name",
      "target": "Target value",
      "importance": "critical" | "important" | "nice-to-have"
    }
  ],
  "budgetAllocation": [
    {
      "category": "Category",
      "percentage": number,
      "amount": number,
      "rationale": "Why this allocation"
    }
  ]
}

Be specific, prioritized, and realistic based on constraints.
Focus on tactics that have worked for similar companies.
`;
  
  async generateStrategy(input: StrategyInput): Promise<StrategyOutput> {
    return this.execute<StrategyOutput>(input);
  }
}
