export interface Contact {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  title?: string; // Role
  account_id?: string;
  linkedin_url?: string;
  tags: string[];
  avatar_url?: string;
  // Joined fields
  account_name?: string; // from crm_accounts
  overall_score?: number; // from crm_lead_scores
  last_interaction_at?: string; // inferred
}

export interface Account {
  id: string;
  name: string;
  domain?: string;
}

export interface LeadScore {
  lead_id: string;
  overall_score: number;
  industry_fit: number;
  company_size_fit: number;
  budget_fit: number;
  risk_score: number;
  match_reason?: string;
  recommended_next_actions: string[];
}

export interface LeadEnrichment {
  lead_id: string;
  recent_news: Array<{ title: string; url: string; date: string }>;
  funding_history: Array<{ round: string; amount: string; date: string }>;
  hiring_trends: Record<string, any>;
  gemini_summary?: string;
}

export interface Interaction {
  id: string;
  created_at: string;
  account_id: string;
  contact_id?: string;
  type: 'email' | 'call' | 'meeting' | 'note' | 'linkedin';
  content: string;
  occurred_at: string;
}
