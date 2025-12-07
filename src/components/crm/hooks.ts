import { useState, useEffect, useCallback } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { supabase } from '../../utils/supabase/client';
import { Contact, Interaction } from './types';
import { toast } from 'sonner@2.0.3';
import { seedCRMData } from './seed';

const supabaseUrl = `https://${projectId}.supabase.co`;
const SERVER_URL = `${supabaseUrl}/functions/v1/make-server-6522a742`;

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Query: getContacts
  // SELECT 
  //   crm_contacts.id,
  //   first_name,
  //   last_name,
  //   email,
  //   title,
  //   crm_accounts.name AS company,
  //   crm_lead_scores.overall_score AS ai_score
  // FROM crm_contacts
  // LEFT JOIN crm_accounts ON crm_accounts.id = crm_contacts.account_id
  // LEFT JOIN crm_lead_scores ON crm_lead_scores.lead_id = crm_contacts.id
  // ORDER BY crm_contacts.created_at DESC;
  const getContacts = useCallback(async () => {
    setLoading(true);
    try {
      // Seed data if needed
      await seedCRMData();

      const { data, error } = await supabase
        .from('crm_contacts')
        .select(`
          *,
          account:crm_accounts(id, name, domain),
          score:crm_lead_scores(overall_score)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Map to flat structure for UI
      const mappedContacts: Contact[] = (data || []).map((c: any) => ({
        ...c,
        account_name: c.account?.name,
        account_industry: c.account?.industry,
        overall_score: c.score?.length > 0 ? c.score[0].overall_score : c.score?.overall_score,
      }));

      setContacts(mappedContacts);
    } catch (err: any) {
      console.error('Error fetching contacts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  return { contacts, loading, error, getContacts, refreshContacts: getContacts };
};

export const useContactDetail = (contactId: string | null) => {
  const [contact, setContact] = useState<any | null>(null);
  const [activities, setActivities] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDetail = useCallback(async () => {
    if (!contactId) return;
    setLoading(true);
    try {
      // Query: getContactDetail (without interactions join due to potential missing FK)
      const { data: contactData, error: contactError } = await supabase
        .from('crm_contacts')
        .select(`
          *,
          account:crm_accounts(*),
          enrichment:crm_lead_enrichment(*),
          score:crm_lead_scores(*)
        `)
        .eq('id', contactId)
        .single();

      if (contactError) throw contactError;

      // Fetch interactions separately
      const { data: interactionsData, error: interactionsError } = await supabase
        .from('crm_interactions')
        .select('*')
        .eq('contact_id', contactId);
        
      if (interactionsError) {
        console.warn('Error fetching interactions:', interactionsError);
        // Don't fail the whole request if interactions fail
      }

      setContact({
        ...contactData,
        score: Array.isArray(contactData.score) ? contactData.score[0] : contactData.score,
        enrichment: Array.isArray(contactData.enrichment) ? contactData.enrichment[0] : contactData.enrichment
      });

      const sortedActivities = (interactionsData || []).sort((a: any, b: any) => 
        new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime()
      );
      
      setActivities(sortedActivities);

    } catch (err: any) {
      console.error('Error fetching contact detail:', err);
      toast.error('Failed to load contact details');
    } finally {
      setLoading(false);
    }
  }, [contactId]);

  useEffect(() => {
    if (contactId) {
      fetchDetail();
    } else {
      setContact(null);
      setActivities([]);
    }
  }, [contactId, fetchDetail]);

  const updateContact = async (fields: Partial<Contact>) => {
    if (!contactId) return;
    try {
      const { error } = await supabase
        .from('crm_contacts')
        .update(fields)
        .eq('id', contactId);

      if (error) throw error;
      
      setContact((prev: any) => ({ ...prev, ...fields }));
      toast.success('Contact updated');
      return true;
    } catch (err: any) {
      console.error('Error updating contact:', err);
      toast.error('Failed to update contact');
      return false;
    }
  };

  return { contact, activities, loading, updateContact, refresh: fetchDetail };
};

export const useAIActions = (contactId: string) => {
  const [processing, setProcessing] = useState(false);

  const callEdgeFunction = async (endpoint: string, payload: any) => {
    setProcessing(true);
    try {
      const response = await fetch(`${SERVER_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error('AI processing failed');
      
      const data = await response.json();
      return data;
    } catch (err: any) {
      console.error(`Error calling ${endpoint}:`, err);
      throw err;
    } finally {
      setProcessing(false);
    }
  };

  const summarizeContact = async () => {
    return callEdgeFunction('ai-contact-summary', { contact_id: contactId });
  };

  const enrichContact = async (linkedinUrl: string) => {
    return callEdgeFunction('enrich-lead', { contact_id: contactId, linkedin_url: linkedinUrl });
  };

  const suggestNextSteps = async () => {
    return callEdgeFunction('score-lead', { contact_id: contactId });
  };

  return { summarizeContact, enrichContact, suggestNextSteps, processing };
};
