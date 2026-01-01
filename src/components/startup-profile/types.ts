export interface Founder {
  id: string;
  fullName: string;
  role: string;
  linkedinUrl?: string;
  avatarUrl?: string;
  bio?: string;
  education?: string[];
  experience?: Array<{
    company: string;
    title: string;
    duration: string;
  }>;
}

export interface MarketSource {
  title: string;
  url: string;
  year: number;
  credibility: number;
  organization: string;
}

export interface PreviousRound {
  amount: number;
  date: string;
  lead: string;
  stage: string;
}

export interface StartupProfile {
  // Business Overview
  problem: string;
  solution: string;
  oneLiner: string;
  uvp?: string;
  businessModel?: string;

  // Market & Traction
  industry: string;
  targetCustomer: string;
  competitors?: string[];
  tam?: number;
  sam?: number;
  som?: number;
  marketSources?: MarketSource[];
  activeUsers?: number;
  mrr?: number;
  customers?: number;
  growthRate?: number;
  launchedDate?: string;

  // Team
  founders?: Founder[];
  teamSize?: number;
  keyHires?: string[];

  // Business Model
  revenueStreams?: string;
  pricing?: string;
  arpu?: number;
  ltv?: number;
  cac?: number;
  grossMargin?: number;

  // Fundraising
  fundingGoal?: number;
  stage?: string;
  timeline?: string;
  useOfFunds?: string;
  previousRounds?: PreviousRound[];

  // Metadata
  completeness?: number;
  lastUpdated?: string;
  createdAt?: string;
}

export interface CompletenessBreakdown {
  business: number;
  market: number;
  team: number;
  model: number;
  fundraising: number;
}
