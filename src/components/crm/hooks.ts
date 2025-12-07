import { useState, useEffect, useCallback } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { supabase } from '../../utils/supabase/client';
import { Contact, Interaction } from './types';
import { toast } from 'sonner@2.0.3';

const supabaseUrl = `https://${projectId}.supabase.co`;
const SERVER_URL = `${supabaseUrl}/functions/v1/make-server-6522a742`;

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getContacts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('crm_contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
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
      // Fetch Contact
      const { data: contactData, error: contactError } = await supabase
        .from('crm_contacts')
        .select('*')
        .eq('id', contactId)
        .single();
      
      if (contactError) throw contactError;

      // Fetch Interactions with corrected FK query
      const { data: interactionsData, error: interactionsError } = await supabase
        .from('crm_interactions')
        .select('*')
        .eq('contact_id', contactId)
        .order('occurred_at', { ascending: false });

      if (interactionsError) throw interactionsError;

      setContact(contactData);
      setActivities(interactionsData || []);

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

export const useTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('crm_tasks')
      .select(`
        *,
        account:crm_accounts(id, name),
        deal:crm_deals(id, name),
        contact:crm_contacts(id, first_name, last_name)
      `)
      .order('due', { ascending: true });
    
    if (!error) setTasks(data || []);
    setLoading(false);
  };

  const createTask = async (task: any) => {
    const { error } = await supabase.from('crm_tasks').insert(task);
    if (!error) await fetchTasks();
    else toast.error("Failed to create task");
    return !error;
  };

  const completeTask = async (taskId: string) => {
    const { error } = await supabase
      .from('crm_tasks')
      .update({ completed: true, status: 'done' })
      .eq('id', taskId);
    if (!error) await fetchTasks();
    else toast.error("Failed to complete task");
    return !error;
  };

  useEffect(() => { fetchTasks(); }, []);
  return { tasks, loading, createTask, completeTask, refresh: fetchTasks };
};

export const useActivities = (limit = 20) => {
  const [activities, setActivities] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('crm_interactions')
      .select(`
        *,
        contact:crm_contacts(id, first_name, last_name)
      `)
      .order('occurred_at', { ascending: false })
      .limit(limit);
      
    if (!error) {
       setActivities(data || []);
    } else {
       console.error("Error fetching activities:", error);
    }
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { activities, loading, refresh: fetchActivities };
};


export const useAIActions = (contactId: string) => {
  const [processing, setProcessing] = useState(false);

  const callEdgeFunction = async (endpoint: string, payload: any) => {
    setProcessing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || publicAnonKey;

      const response = await fetch(`${SERVER_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
    return callEdgeFunction('crm/ai/summarize', { contact_id: contactId });
  };

  const enrichContact = async (linkedinUrl: string) => {
    if (!linkedinUrl) {
       toast.error("No URL provided");
       return;
    }
    const data = await callEdgeFunction('crm/ai/extract-from-url', { url: linkedinUrl });
    if (data && !data.error) {
       // Auto-update if possible, but for now just return data
       return data; 
    }
    return null;
  };

  const suggestNextSteps = async () => {
    return callEdgeFunction('crm/ai/score', { contact_id: contactId });
  };

  return { summarizeContact, enrichContact, suggestNextSteps, processing };
};

export const useDealAI = (dealId: string) => {
  const [processing, setProcessing] = useState(false);

  const analyzeDeal = async (deal: any) => {
    setProcessing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || publicAnonKey;

      const response = await fetch(`${SERVER_URL}/crm/ai/analyze-deal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ deal })
      });
      
      if (!response.ok) throw new Error('AI processing failed');
      return await response.json();
    } catch (err: any) {
      console.error("Error analyzing deal:", err);
      toast.error("Failed to analyze deal");
    } finally {
      setProcessing(false);
    }
  };

  return { analyzeDeal, processing };
};

export const useCompanyAI = () => {
  const [processing, setProcessing] = useState(false);

  const analyzeProfile = async (profile: any) => {
    setProcessing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || publicAnonKey;

      const response = await fetch(`${SERVER_URL}/company-profile/ai-analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ profile })
      });
      
      if (!response.ok) throw new Error('AI processing failed');
      return await response.json();
    } catch (err: any) {
      console.error("Error analyzing profile:", err);
      toast.error("Failed to analyze profile");
    } finally {
      setProcessing(false);
    }
  };

  return { analyzeProfile, processing };
};

export const useStartupProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || publicAnonKey;

      const res = await fetch(`${SERVER_URL}/startup-profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error("Error fetching startup profile:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, refresh: fetchProfile };
};

export const useDeals = (pipelineType: 'sales' | 'investor') => {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeals = useCallback(async () => {
    setLoading(true);
    // Map pipelineType to sector
    const sector = pipelineType === 'sales' ? 'Sales' : 'Fundraising';

    const { data, error } = await supabase
      .from('crm_deals')
      .select(`
        *,
        account:crm_accounts(id, name, domain),
        enrichment:crm_deal_enrichment(*)
      `)
      .eq('sector', sector)
      .order('updated_at', { ascending: false });
    
    if (!error) {
       setDeals(data || []);
    } else {
       console.error("Error fetching deals:", error);
    }
    setLoading(false);
  }, [pipelineType]);

  const updateDeal = async (id: string, updates: any) => {
    const { error } = await supabase
      .from('crm_deals')
      .update(updates)
      .eq('id', id);
    
    if (!error) {
       await fetchDeals();
       return true;
    } else {
       console.error("Error updating deal:", error);
       return false;
    }
  };

  const createDeal = async (dealData: any) => {
    const sector = pipelineType === 'sales' ? 'Sales' : 'Fundraising';
    const { error } = await supabase
      .from('crm_deals')
      .insert({ ...dealData, sector }); // Use sector instead of pipeline_type
      
    if (!error) {
       await fetchDeals();
       return true;
    } else {
       console.error("Error creating deal:", error);
       return false;
    }
  };

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  return { deals, loading, updateDeal, createDeal, refresh: fetchDeals };
};

export const useCRMStats = () => {
  const [stats, setStats] = useState<any>(null);
  
  const fetchStats = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || publicAnonKey;

      const res = await fetch(`${SERVER_URL}/crm/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, refresh: fetchStats };
};

export const useRealtimeCRM = (onUpdate: () => void) => {
  useEffect(() => {
    const channel = supabase
      .channel('crm-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'crm_contacts' },
        () => onUpdate()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'crm_deals' },
        () => onUpdate()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'crm_tasks' },
        () => onUpdate()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onUpdate]);
};
