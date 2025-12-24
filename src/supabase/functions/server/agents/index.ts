/**
 * AI Agents Registry
 * 
 * Central export point for all AI agents.
 * Agents are singletons to reuse connections.
 */

export { BaseAgent } from './base-agent.ts';
export type { Agent, AgentOptions } from './base-agent.ts';

export { DeckAnalyzerAgent } from './deck-analyzer.ts';
export type { DeckAnalysisInput, DeckAnalysisOutput, SlideData, SlideScore } from './deck-analyzer.ts';

export { LeadScorerAgent } from './lead-scorer.ts';
export type { LeadScoreInput, LeadScoreOutput } from './lead-scorer.ts';

export { EmailWriterAgent } from './email-writer.ts';
export type { EmailInput, EmailOutput } from './email-writer.ts';

export { StrategyAdvisorAgent } from './strategy-advisor.ts';
export type { StrategyInput, StrategyOutput, Tactic, PhaseTimeline } from './strategy-advisor.ts';

// Singleton instances
let deckAnalyzer: DeckAnalyzerAgent | null = null;
let leadScorer: LeadScorerAgent | null = null;
let emailWriter: EmailWriterAgent | null = null;
let strategyAdvisor: StrategyAdvisorAgent | null = null;

/**
 * Get or create AI agent instances
 */
export const getAgents = () => {
  if (!deckAnalyzer) deckAnalyzer = new DeckAnalyzerAgent();
  if (!leadScorer) leadScorer = new LeadScorerAgent();
  if (!emailWriter) emailWriter = new EmailWriterAgent();
  if (!strategyAdvisor) strategyAdvisor = new StrategyAdvisorAgent();
  
  return {
    deckAnalyzer,
    leadScorer,
    emailWriter,
    strategyAdvisor,
  };
};
