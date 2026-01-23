import { useState, useEffect, useCallback } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { supabase } from '../../utils/supabase/client';
import { Contact, Interaction } from './types';
import { toast } from 'sonner@2.0.3';
import { sampleContacts } from './sampleContacts';

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

      if (error) {
        // If table doesn't exist or fetch fails, use demo data
        console.log('Using demo data for contacts');
        const demoContacts = sampleContacts.map((contact, index) => ({
          ...contact,
          id: `demo-${index + 1}`,
          created_at: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString()
        }));
        setContacts(demoContacts as Contact[]);
        setError(null); // Clear error since we're showing demo data
      } else if (!data || data.length === 0) {
        // If no contacts in database, show demo data
        console.log('No contacts in database, showing demo data');
        const demoContacts = sampleContacts.map((contact, index) => ({
          ...contact,
          id: `demo-${index + 1}`,
          created_at: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString()
        }));
        setContacts(demoContacts as Contact[]);
        setError(null);
      } else {
        // Log first contact to check ID format
        console.log('Sample contact ID:', data[0].id, 'Type:', typeof data[0].id);
        setContacts(data || []);
        setError(null);
      }
    } catch (err: any) {
      console.log('Using demo data for contacts');
      // Fallback to demo data on any error
      const demoContacts = sampleContacts.map((contact, index) => ({
        ...contact,
        id: `demo-${index + 1}`,
        created_at: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString()
      }));
      setContacts(demoContacts as Contact[]);
      setError(null); // Don't show error to user, we have demo data
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

    // Handle Demo/Mock IDs (demo-1, demo-2, etc.)
    if (contactId === '1' || contactId.startsWith('demo-')) {
      setLoading(false);
      
      // Find the specific demo contact from sampleContacts
      const demoIndex = contactId.startsWith('demo-') 
        ? parseInt(contactId.replace('demo-', '')) - 1 
        : 0;
      
      const demoContact = sampleContacts[demoIndex] || sampleContacts[0];
      
      setContact({
        id: contactId,
        first_name: demoContact.first_name,
        last_name: demoContact.last_name,
        email: demoContact.email,
        phone: demoContact.phone,
        title: demoContact.title,
        account_name: demoContact.account_name,
        linkedin_url: demoContact.linkedin_url,
        tags: demoContact.tags,
        overall_score: demoContact.overall_score,
        notes: demoContact.notes,
        last_interaction_at: demoContact.last_interaction_at
      });
      
      // Generate mock activities for demo contacts
      setActivities([
        { 
          id: `${contactId}-1`, 
          type: 'email', 
          summary: 'Follow-up on initial conversation', 
          occurred_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() 
        },
        { 
          id: `${contactId}-2`, 
          type: 'call', 
          summary: 'Discussed partnership opportunities', 
          occurred_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() 
        },
        { 
          id: `${contactId}-3`, 
          type: 'meeting', 
          summary: 'Intro call scheduled', 
          occurred_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() 
        }
      ]);
      return;
    }
    
    // Validate that contactId is a valid UUID format
    // UUIDs are in format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(contactId)) {
      console.error('Invalid contact ID format:', contactId, '- expected UUID');
      toast.error('Invalid contact ID format');
      setLoading(false);
      return;
    }
    
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
    
    // Handle demo contacts - just update local state
    if (contactId === '1' || contactId.startsWith('demo-')) {
      setContact((prev: any) => ({ ...prev, ...fields }));
      toast.success('Contact updated (demo mode)');
      return true;
    }
    
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
    try {
      const { data, error } = await supabase
        .from('crm_tasks')
        .select(`
          *,
          account:crm_accounts(id, name),
          deal:crm_deals(id, name),
          contact:crm_contacts(id, first_name, last_name)
        `)
        .order('due', { ascending: true });
      
      if (error) {
        console.warn('Could not fetch tasks from database:', error.message);
        setTasks([]);
      } else {
        setTasks(data || []);
      }
    } catch (err: any) {
      console.error('Error fetching tasks:', err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: any) => {
    try {
      const { error } = await supabase.from('crm_tasks').insert(task);
      if (!error) await fetchTasks();
      else toast.error("Failed to create task");
      return !error;
    } catch (err: any) {
      console.error('Error creating task:', err);
      toast.error("Failed to create task");
      return false;
    }
  };

  const completeTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('crm_tasks')
        .update({ completed: true, status: 'done' })
        .eq('id', taskId);
      if (!error) await fetchTasks();
      else toast.error("Failed to complete task");
      return !error;
    } catch (err: any) {
      console.error('Error completing task:', err);
      toast.error("Failed to complete task");
      return false;
    }
  };

  useEffect(() => { fetchTasks(); }, []);
  return { tasks, loading, createTask, completeTask, refresh: fetchTasks };
};

export const useActivities = (limit = 20) => {
  const [activities, setActivities] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('crm_interactions')
        .select(`
          *,
          contact:crm_contacts(id, first_name, last_name)
        `)
        .order('occurred_at', { ascending: false })
        .limit(limit);
        
      if (error) {
        console.warn('Could not fetch activities from database:', error.message);
        setActivities([]);
      } else {
        setActivities(data || []);
      }
    } catch (err: any) {
      console.error("Error fetching activities:", err);
      setActivities([]);
    } finally {
      setLoading(false);
    }
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
    if (contactId === '1') return { result: "Lead shows strong intent; last 3 messages were positive." };
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
    if (contactId === '1') {
      return {
        score: 86,
        reason: "Strong engagement signals and budget approval mentioned.",
        next_steps: ["Send revised proposal", "Schedule procurement review"]
      };
    }
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

export const useLeadIntelligence = () => {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const enrichLead = async (contactId: string) => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || publicAnonKey;

      const response = await fetch(`${SERVER_URL}/lead-intelligence/enrich`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ contactId })
      });
      
      if (!response.ok) {
        // Handle gracefully - endpoint may not exist yet
        console.warn('Lead enrichment endpoint not available yet');
        toast.info('AI enrichment coming soon!');
        return null;
      }
      
      const data = await response.json();
      toast.success('Lead enriched successfully');
      return data;
    } catch (err: any) {
      console.error("Error enriching lead:", err);
      // Don't show error to user - feature not critical
      return null;
    } finally {
      setLoading(false);
    }
  };

  const analyzeDeal = async (dealData: any) => {
    setProcessing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || publicAnonKey;

      const response = await fetch(`${SERVER_URL}/lead-intelligence/analyze-deal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dealData)
      });
      
      if (!response.ok) {
        console.warn('Deal analysis endpoint not available yet');
        toast.info('AI deal analysis coming soon!');
        return null;
      }
      
      return await response.json();
    } catch (err: any) {
      console.error("Error analyzing deal:", err);
      // Don't show error - graceful degradation
      return null;
    } finally {
      setProcessing(false);
    }
  };

  return { enrichLead, analyzeDeal, loading, processing };
};

export const useCompanyProfile = () => {
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
      
      if (!response.ok) {
        console.warn('Profile analysis endpoint not available yet');
        toast.info('AI profile analysis coming soon!');
        return null;
      }
      
      return await response.json();
    } catch (err: any) {
      console.error("Error analyzing profile:", err);
      // Graceful degradation - don't break the UI
      return null;
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
      
      // Database-first approach: Always try database first
      const { data: dbProfile, error: dbError } = await supabase
        .from('startups')
        .select('*')
        .eq('user_id', session?.user?.id || '')
        .single();

      // If we have database profile, use it immediately
      if (dbProfile && !dbError) {
        setProfile(dbProfile);
        setLoading(false);
        return;
      }

      // If no database profile and user is authenticated, try edge function as fallback
      if (session?.access_token) {
        try {
          const res = await fetch(`${SERVER_URL}/startup-profile`, {
            headers: { 'Authorization': `Bearer ${session.access_token}` }
          });
          
          if (res.ok) {
            const data = await res.json();
            setProfile(data);
          } else {
            // Edge function not available, use database result (might be null)
            setProfile(dbProfile);
          }
        } catch (fetchErr) {
          // Edge function failed, silently use database result
          setProfile(dbProfile);
        }
      } else {
        // No session, profile is null
        setProfile(null);
      }
    } catch (err) {
      // Only log if it's not a network error
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        // Silently handle network errors in development
        console.warn('Startup profile service unavailable (development mode)');
      } else {
        console.error("Error fetching startup profile:", err);
      }
      // Graceful degradation - profile will be null
      setProfile(null);
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

    try {
      const { data, error } = await supabase
        .from('crm_deals')
        .select(`
          *,
          account:crm_accounts(id, name, domain),
          enrichment:crm_deal_enrichment(*)
        `)
        .eq('sector', sector)
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.warn('Could not fetch deals from database:', error.message);
        setDeals([]);
      } else {
        setDeals(data || []);
      }
    } catch (err: any) {
      console.error("Error fetching deals:", err);
      setDeals([]);
    } finally {
      setLoading(false);
    }
  }, [pipelineType]);

  const updateDeal = async (id: string, updates: any) => {
    try {
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
    } catch (err: any) {
      console.error("Error updating deal:", err);
      return false;
    }
  };

  const createDeal = async (dealData: any) => {
    try {
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
    } catch (err: any) {
      console.error("Error creating deal:", err);
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