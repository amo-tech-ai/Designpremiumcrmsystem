export interface EventWizardData {
  // Basics
  eventName: string;
  eventDescription: string;
  eventType: string;
  primaryGoal: string;
  primaryGoalOther?: string;

  // Audience & Location
  audiencePersona: string;
  expectedAttendees: number | string;
  cityOrVenue: string;

  // Date & Budget
  eventDate: Date | undefined;
  durationHours: number | string;
  budgetCurrency: string;
  budgetAmount: number | string;

  // URLs
  venueUrl: string;
  sponsorUrls: string[];
  inspirationUrls: string[];
  searchTerms: string;
  analysis?: EventAnalysis;
}

export interface EventAnalysis {
  summary: string;
  complexity: 'Low' | 'Medium' | 'High';
  tags: string[];
  urlSignals: {
    capacity: string;
    venueType: string;
    vibe: string;
  };
  searchGrounding: {
    benchmarks: string;
    conflicts: string;
    costValidation: string;
  };
  feasibility: {
    score: number;
    explanation: string;
  };
  constraints: string[];
  risks: Array<{
    severity: 'low' | 'medium' | 'high';
    risk: string;
    mitigation: string;
  }>;
  reasoning: string[];
  refinedDescription: string;
}

export type EventWizardStep = 'context' | 'plan' | 'marketing' | 'tasks' | 'review';

export const INITIAL_EVENT_DATA: EventWizardData = {
  eventName: '',
  eventDescription: '',
  eventType: '',
  primaryGoal: '',
  audiencePersona: '',
  expectedAttendees: '',
  cityOrVenue: '',
  eventDate: undefined,
  durationHours: '',
  budgetCurrency: 'USD',
  budgetAmount: '',
  venueUrl: '',
  sponsorUrls: [],
  inspirationUrls: [],
  searchTerms: ''
};
