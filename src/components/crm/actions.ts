import { supabase } from '../../utils/supabase/client';
import { Contact, LeadScore, LeadEnrichment } from './types';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

const supabaseUrl = `https://${projectId}.supabase.co`;
const SERVER_URL = `${supabaseUrl}/functions/v1/make-server-6522a742`;

const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token || publicAnonKey;
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

const getStartupId = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  // Try to find startup associated with user
  // First try direct user_id match
  const { data: startup } = await supabase
    .from('startups')
    .select('id')
    .eq('user_id', user.id)
    .single();
    
  if (startup) return startup.id;

  // If not found, check org membership (assuming user might belong to an org that has a startup)
  // This is more complex, for now fallback to creating one or handling error
  // But given the "seed" logic in other places, maybe we should just create one if missing?
  // Or query via orgs.
  
  // Let's assume for now 1:1 user:startup or it exists.
  return null;
};

export const addContact = async (
  contact: Partial<Contact>, 
  account: { name: string; domain?: string; segment?: string },
  enrichment?: any,
  score?: any
) => {
  try {
    const startupId = await getStartupId();
    if (!startupId) throw new Error("No startup profile found. Please complete onboarding.");

    // 1. Handle Account (Find or Create)
    let accountId = null;
    if (account.name) {
      // Check if account exists
      const { data: existingAccount } = await supabase
        .from('crm_accounts')
        .select('id')
        .eq('startup_id', startupId)
        .ilike('name', account.name)
        .single();
        
      if (existingAccount) {
        accountId = existingAccount.id;
      } else {
        // Create new account
        const { data: newAccount, error: accError } = await supabase
          .from('crm_accounts')
          .insert({
            startup_id: startupId,
            name: account.name,
            domain: account.domain,
            segment: account.segment,
            status: 'Lead'
          })
          .select()
          .single();
          
        if (accError) throw accError;
        accountId = newAccount.id;
      }
    }

    // 2. Create Contact
    const { data: newContact, error: contactError } = await supabase
      .from('crm_contacts')
      .insert({
        startup_id: startupId,
        account_id: accountId,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        title: contact.title,
        phone: contact.phone,
        linkedin_url: contact.linkedin_url,
        // role: contact.role // role is usually 'Decision Maker' etc, not passed in arg but maybe in contact object
      })
      .select()
      .single();

    if (contactError) throw contactError;

    // 3. Create Enrichment (if provided)
    if (enrichment) {
      const { error: enrichError } = await supabase
        .from('crm_lead_enrichment')
        .insert({
          lead_id: newContact.id,
          company_id: accountId, // Can be null
          recent_news: enrichment.recent_news,
          gemini_summary: enrichment.gemini_summary,
          funding_history: enrichment.funding_history,
          // other fields
        });
        
      if (enrichError) console.error("Enrichment save error:", enrichError);
    }

    // 4. Create Lead Score (if provided)
    if (score) {
      const { error: scoreError } = await supabase
        .from('crm_lead_scores')
        .insert({
          lead_id: newContact.id,
          overall_score: score.overall_score,
          ai_findings: score.match_reason ? [{ type: 'reason', text: score.match_reason }] : [],
          recommended_next_actions: score.recommended_next_actions,
          status_band: score.overall_score > 70 ? 'High' : 'Medium' 
        });

      if (scoreError) console.error("Score save error:", scoreError);
    }

    return { success: true, data: newContact };

  } catch (err: any) {
    console.error('Error adding contact:', err);
    throw err;
  }
};

export const enrichFromUrl = async (url: string) => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${SERVER_URL}/crm/ai/extract-from-url`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ url })
    });

    if (!response.ok) throw new Error("AI Extraction failed");
    
    const data = await response.json();
    return data;

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateContactFull = async (
  contactId: string,
  accountId: string | undefined,
  updates: {
    contact?: Partial<Contact>;
    account?: Partial<{ name: string; domain: string }>;
    enrichment?: Partial<LeadEnrichment>;
  }
) => {
  try {
    // Update Contact
    if (updates.contact) {
      const { error } = await supabase
        .from('crm_contacts')
        .update(updates.contact)
        .eq('id', contactId);
      if (error) throw error;
    }

    // Update Account
    if (accountId && updates.account) {
      const { error } = await supabase
        .from('crm_accounts')
        .update(updates.account)
        .eq('id', accountId);
      if (error) throw error;
    }

    // Update Enrichment (Upsert)
    if (updates.enrichment) {
      // Need to check if exists or just upsert on lead_id (but lead_id is not PK)
      // Actually crm_lead_enrichment ID is PK.
      // We should probably select first.
      
      const { data: existing } = await supabase
        .from('crm_lead_enrichment')
        .select('id')
        .eq('lead_id', contactId)
        .single();

      if (existing) {
        await supabase
          .from('crm_lead_enrichment')
          .update(updates.enrichment)
          .eq('id', existing.id);
      } else {
        await supabase
          .from('crm_lead_enrichment')
          .insert({
             lead_id: contactId,
             ...updates.enrichment
          });
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error updating contact full:', err);
    throw err;
  }
};

export const generateFollowUpActions = async (contactId: string) => {
  // Use the AI score endpoint which returns next steps
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${SERVER_URL}/crm/ai/score`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ contact_id: contactId })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.next_steps || [];
    }
  } catch (e) {
    console.error(e);
  }
  
  return [];
};

export const regenerateSummary = async (contactId: string, context?: string) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${SERVER_URL}/crm/ai/summarize`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ contact_id: contactId })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.result;
      }
    } catch (e) {
      console.error(e);
    }
    return `Summary unavailable.`;
};
