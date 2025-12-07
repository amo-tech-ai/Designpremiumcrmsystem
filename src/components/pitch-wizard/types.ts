export interface PitchWizardData {
  // Step 1: Context
  deckType: 'investor' | 'sales';
  format: 'yc' | 'sequoia';
  description: string;
  website: string;
  urls: string[];

  // Step 2: Aesthetic
  theme: string;

  // Step 3: Details
  businessType: string[];
  stage: string;
  deckFocus: string[];
  teamSize: string;
  traction: string;
  targetRaise: number;

  // Step 4: Financials
  revenueModel: string;
  dealSize: number; // Avg Price / Deal Size
  enableAiReasoning: boolean;
}

export const INITIAL_DATA: PitchWizardData = {
  deckType: 'investor',
  format: 'yc',
  description: '',
  website: '',
  urls: [],
  theme: 'minimal-dark',
  businessType: [],
  stage: '',
  deckFocus: [],
  teamSize: '',
  traction: '',
  targetRaise: 500000,
  revenueModel: '',
  dealSize: 0,
  enableAiReasoning: false,
};

export type WizardStepId = 'context' | 'aesthetic' | 'details' | 'financials';

export const STEPS = [
  { id: 'context', label: 'Context', number: 1 },
  { id: 'aesthetic', label: 'Style', number: 2 },
  { id: 'details', label: 'Details', number: 3 },
  { id: 'financials', label: 'Financials', number: 4 },
];
