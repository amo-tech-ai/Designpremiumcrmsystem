import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import { projectId } from '../../utils/supabase/info';
import { toast } from "sonner@2.0.3";

interface StartupProfileData {
  // Context
  startupName: string;
  website: string;
  linkedin: string;
  description: string;
  longDescription: string;
  targetMarket: string;
  additionalUrls: string[];
  searchTerms: string;
  industry: string;
  foundedYear: string;
  coverImage: string;
  
  // Team
  founders: Array<{ name: string; role: string; linkedin: string; bio: string }>;
  
  // Business
  businessModel: string;
  targetAudience: string[];
  pricing: string;
  
  // Traction
  mrr: string;
  users: string;
  growth: string;
  
  // Funding
  stage: string;
  raiseAmount: string;
  useOfFunds: string[];
}

interface StartupProfileContextType {
  data: StartupProfileData;
  updateData: (updates: Partial<StartupProfileData>) => void;
  saveData: () => Promise<void>;
  generateAI: (action: string, prompt: string, context?: any) => Promise<string>;
  isLoading: boolean;
  isSaving: boolean;
}

const defaultData: StartupProfileData = {
  startupName: '',
  website: '',
  linkedin: '',
  description: '',
  longDescription: '',
  targetMarket: '',
  additionalUrls: [],
  searchTerms: '',
  industry: '',
  foundedYear: '',
  coverImage: '',
  founders: [],
  businessModel: '',
  targetAudience: [],
  pricing: '',
  mrr: '',
  users: '',
  growth: '',
  stage: '',
  raiseAmount: '',
  useOfFunds: []
};

const StartupProfileContext = createContext<StartupProfileContextType | undefined>(undefined);

export const StartupProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StartupProfileData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6522a742/startup-profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const fetchedData = await response.json();
          if (fetchedData && Object.keys(fetchedData).length > 0) {
            setData({ ...defaultData, ...fetchedData });
          }
        }
      } catch (error) {
        console.error("Failed to load startup profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const updateData = (updates: Partial<StartupProfileData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const saveData = async () => {
    setIsSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      // If no session, warn user but don't fail completely
      if (!session) {
        toast.error("Please sign in to save your profile");
        setIsSaving(false);
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6522a742/startup-profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Failed to save");
      
    } catch (error) {
      console.error("Failed to save:", error);
      toast.error("Failed to save progress");
    } finally {
      setIsSaving(false);
    }
  };

  const generateAI = async (action: string, prompt: string, context?: any) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No active session");

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6522a742/ai-action`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action, prompt, context: context || data })
      });

      const result = await response.json();
      return result.result;
    } catch (error) {
      console.error("AI Action failed:", error);
      toast.error("AI generation failed");
      return "";
    }
  };

  return (
    <StartupProfileContext.Provider value={{ data, updateData, saveData, generateAI, isLoading, isSaving }}>
      {children}
    </StartupProfileContext.Provider>
  );
};

export const useStartupProfile = () => {
  const context = useContext(StartupProfileContext);
  if (context === undefined) {
    throw new Error('useStartupProfile must be used within a StartupProfileProvider');
  }
  return context;
};