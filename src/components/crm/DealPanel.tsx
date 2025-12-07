import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { 
  X,
  DollarSign,
  TrendingUp,
  Briefcase,
  Calendar,
  Sparkles,
  Loader2,
  Building,
  User
} from 'lucide-react';
import { Separator } from "../ui/separator";
import { EditableInput, EditableSelect } from './EditableFields';
import { useDeals, useDealAI } from './hooks';
import { toast } from "sonner@2.0.3";
import { steps, investorSteps } from './data';

interface DealPanelProps {
  deal: any;
  onClose?: () => void;
  pipelineMode?: 'sales' | 'investor';
}

export const DealPanel: React.FC<DealPanelProps> = ({ deal: initialDeal, onClose, pipelineMode = 'sales' }) => {
  const { updateDeal } = useDeals(pipelineMode);
  const { analyzeDeal, processing } = useDealAI(initialDeal?.id);
  const [localDeal, setLocalDeal] = useState(initialDeal);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocalDeal(initialDeal);
  }, [initialDeal]);

  const runAIAnalysis = async () => {
    const result = await analyzeDeal(localDeal);
    if (result) {
      setLocalDeal(prev => ({ ...prev, ...result }));
      toast.success("Deal analyzed with Gemini");
    }
  };

  if (!localDeal) return null;

  const currentSteps = pipelineMode === 'investor' ? investorSteps : steps;
  
  const handleUpdate = async (field: string, value: any) => {
    // Optimistic
    setLocalDeal({ ...localDeal, [field]: value });
    setSaving(true);
    try {
      // Map UI fields to DB fields if needed
      // Updated for PostgreSQL schema: stage, ai_score, etc.
      const dbField = field === 'company' ? 'account_name' : 
                      field === 'stepId' ? 'stage' : 
                      field === 'healthScore' ? 'ai_score' : 
                      field === 'aiRisk' ? 'ai_risk' :
                      field;

      // Handle numeric conversion for amount/probability
      let dbValue = value;
      if (dbField === 'amount') dbValue = parseFloat(value.toString().replace(/[^0-9.]/g, '')) || 0;
      if (dbField === 'probability') dbValue = parseInt(value, 10) || 0;

      await updateDeal(localDeal.id, { [dbField]: dbValue });
      toast.success('Deal updated');
    } catch (e) {
      toast.error('Failed to update deal');
      setLocalDeal(initialDeal); // Revert
    } finally {
      setSaving(false);
    }
  };

  const getStageName = (id: string) => currentSteps.find(s => s.id === id)?.title || id;

  return (
    <div className="bg-white h-full border-l border-slate-200 shadow-xl flex flex-col overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
        <h2 className="font-bold text-slate-700 flex items-center gap-2">
           <Briefcase className="w-4 h-4 text-blue-500" /> Deal Details
        </h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Body */}
      <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar">
         
         {/* Top Card */}
         <div className="text-center">
            <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-white shadow-lg">
              <AvatarImage src={`https://logo.clearbit.com/${localDeal.company?.replace(/\s+/g, '').toLowerCase()}.com`} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-bold">{localDeal.company?.[0]}</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold text-slate-900 mb-1">{localDeal.name}</h1>
            <div className="flex justify-center items-center gap-2 text-slate-500 text-sm mb-4">
               <Building className="w-3.5 h-3.5" /> {localDeal.company}
            </div>
            
            <div className="flex justify-center gap-2">
               <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  {localDeal.probability}% Probability
               </Badge>
               <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {getStageName(localDeal.stepId)}
               </Badge>
            </div>
         </div>

         <Separator />

         {/* Key Metrics */}
         <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
               <div className="text-xs text-slate-400 font-medium uppercase mb-1">Value</div>
               <EditableInput 
                  value={localDeal.amount} 
                  onSave={(val) => handleUpdate('amount', val)}
                  className="text-lg font-bold text-slate-900"
                  icon={<DollarSign className="w-4 h-4 text-slate-400" />}
               />
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
               <div className="text-xs text-slate-400 font-medium uppercase mb-1">Owner</div>
               <div className="flex items-center gap-2 font-medium text-slate-700">
                  <User className="w-4 h-4 text-slate-400" />
                  {localDeal.owner_name || 'Unassigned'}
               </div>
            </div>
         </div>

         {/* Stage Select */}
         <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Pipeline Stage</label>
            <select 
               className="w-full p-2 bg-white border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
               value={localDeal.stepId}
               onChange={(e) => handleUpdate('stepId', e.target.value)}
            >
               {currentSteps.map(step => (
                  <option key={step.id} value={step.id}>{step.title}</option>
               ))}
            </select>
         </div>

         {/* AI Insights */}
         <div className="space-y-3">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <h3 className="text-sm font-bold text-slate-700">AI Insights</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={runAIAnalysis} 
                  disabled={processing} 
                  className="h-6 text-xs text-purple-600 hover:bg-purple-50"
                >
                   {processing ? <Loader2 className="w-3 h-3 animate-spin" /> : "Refresh Analysis"}
                </Button>
             </div>
             
             {localDeal.aiRisk ? (
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-800">
                   <span className="font-bold">Risk Alert:</span> {localDeal.aiRisk}
                </div>
             ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-800">
                   Deal looks healthy. No major risks detected.
                </div>
             )}

             {localDeal.aiNextStep && (
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-800">
                   <span className="font-bold">Next Best Action:</span> {localDeal.aiNextStep}
                </div>
             )}
         </div>

         {/* Tags */}
         <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
               {localDeal.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600">
                     {tag}
                  </Badge>
               ))}
               <Button variant="outline" size="sm" className="h-6 text-xs border-dashed">+ Add</Button>
            </div>
         </div>

      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
         <p className="text-xs text-slate-400">
            Last updated {localDeal.lastActivity}
         </p>
      </div>
    </div>
  );
};
