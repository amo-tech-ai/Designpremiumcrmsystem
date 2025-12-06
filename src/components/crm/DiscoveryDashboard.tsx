import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  Target, 
  Briefcase, 
  Linkedin, 
  Plus, 
  ArrowRight, 
  Sparkles,
  Globe,
  Mail,
  CheckCircle,
  MoreHorizontal,
  Building,
  DollarSign,
  PieChart
} from 'lucide-react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../ui/utils";
import { discoveryResults, suggestedMatches } from './data';
import { EditableInput, EditableSelect } from './EditableFields';

export const DiscoveryDashboard: React.FC = () => {
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [contactType, setContactType] = useState<string>('All Types');

  // Filter logic
  const filteredResults = discoveryResults.filter(r => {
     if (contactType === 'All Types') return true;
     return r.type === contactType;
  });

  const isInvestorMode = contactType === 'Investor';

  return (
    <div className="flex h-full bg-slate-50/50 overflow-hidden">
      
      {/* Main Content - Scrollable */}
      <div className={cn(
        "flex-grow flex flex-col h-full overflow-y-auto transition-all duration-300",
        selectedResult ? "w-2/3 pr-0" : "w-full"
      )}>
        
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* 1. KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'New Contacts', val: '124', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'High Potential', val: '18', icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Investor Matches', val: '7', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'LinkedIn Imports', val: '42', icon: Linkedin, color: 'text-[#0A66C2]', bg: 'bg-[#0A66C2]/10' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", stat.bg, stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{stat.val}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Search Input Panel (Editable) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Discovery Parameters</h3>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Keywords</label>
                 <Input placeholder="e.g. AI founders in Europe" className="h-10 bg-slate-50 border-slate-200" />
              </div>
              <EditableSelect 
                label="Contact Type"
                value={contactType}
                onSave={(val) => setContactType(val)}
                options={[
                  { label: 'All Types', value: 'All Types' },
                  { label: 'Lead', value: 'Lead' },
                  { label: 'Investor', value: 'Investor' },
                  { label: 'Partner', value: 'Partner' },
                  { label: 'LinkedIn Contact', value: 'LinkedIn Contact' }
                ]}
              />
              <EditableSelect 
                label="Industry"
                value="Technology"
                onSave={() => {}}
                options={[
                  { label: 'Technology', value: 'Technology' },
                  { label: 'Healthcare', value: 'Healthcare' },
                  { label: 'Finance', value: 'Finance' }
                ]}
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                <Sparkles className="w-4 h-4" /> Run Discovery
              </Button>
            </div>
          </div>

          {/* 3. Results List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
               <h3 className="font-bold text-slate-700">Search Results</h3>
               <span className="text-xs text-slate-400">Found {filteredResults.length} matches</span>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  {isInvestorMode ? (
                    <>
                      <th className="px-6 py-3 font-medium">Fund Name</th>
                      <th className="px-6 py-3 font-medium">Stage Focus</th>
                      <th className="px-6 py-3 font-medium">Check Size</th>
                      <th className="px-6 py-3 font-medium">Portfolio</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-3 font-medium">Role / Company</th>
                      <th className="px-6 py-3 font-medium">Type</th>
                      <th className="px-6 py-3 font-medium">Source</th>
                      <th className="px-6 py-3 font-medium">Match</th>
                    </>
                  )}
                  <th className="px-6 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredResults.map((result) => (
                  <tr 
                    key={result.id} 
                    onClick={() => setSelectedResult(result)}
                    className={cn(
                      "group hover:bg-blue-50/30 transition-colors cursor-pointer",
                      selectedResult?.id === result.id ? "bg-blue-50" : ""
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-slate-100">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${result.avatarSeed}`} />
                          <AvatarFallback>{result.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-slate-700">{result.name}</span>
                      </div>
                    </td>
                    
                    {isInvestorMode ? (
                      <>
                        <td className="px-6 py-4 text-slate-700 font-medium">{result.fundName || result.company}</td>
                        <td className="px-6 py-4 text-slate-600">{result.stageFocus || 'Seed'}</td>
                        <td className="px-6 py-4 text-slate-600">{result.checkSize || '$100k+'}</td>
                        <td className="px-6 py-4">
                           <div className="flex gap-1 flex-wrap">
                             {result.portfolio?.map((p: string) => (
                               <Badge key={p} variant="outline" className="text-[10px] bg-white border-slate-200">{p}</Badge>
                             ))}
                           </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <div className="text-slate-700">{result.role}</div>
                          <div className="text-xs text-slate-500">{result.company}</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="font-normal bg-slate-50">
                            {result.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {result.source}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={cn("h-full rounded-full", result.matchScore > 90 ? "bg-green-500" : "bg-blue-500")} 
                                style={{ width: `${result.matchScore}%` }}
                              />
                            </div>
                            <span className={cn("text-xs font-bold", result.matchScore > 90 ? "text-green-600" : "text-blue-600")}>
                              {result.matchScore}%
                            </span>
                          </div>
                        </td>
                      </>
                    )}

                    <td className="px-6 py-4 text-right">
                       <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-600">
                         <MoreHorizontal className="w-4 h-4" />
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 6. Suggested Matches (AI Recommendations) */}
          {!isInvestorMode && (
            <div>
               <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-slate-700">AI Suggested Matches</h3>
               </div>
               <div className="grid grid-cols-3 gap-4">
                  {suggestedMatches.map(match => (
                    <div key={match.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-purple-200 hover:shadow-md transition-all group">
                       <div className="flex items-start justify-between mb-3">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${match.avatarSeed}`} />
                            <AvatarFallback>{match.name.substring(0,2)}</AvatarFallback>
                          </Avatar>
                          <Badge className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-0">Match</Badge>
                       </div>
                       <h4 className="font-bold text-slate-800">{match.name}</h4>
                       <p className="text-sm text-slate-500 mb-1">{match.role} at {match.company}</p>
                       <p className="text-xs text-slate-400 italic mb-4">"{match.reason}"</p>
                       <Button variant="outline" className="w-full text-xs h-8">View Profile</Button>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* 5. Workflow Diagram */}
          <div className="pt-8 pb-4">
            <div className="flex items-center justify-center gap-2 mb-6 opacity-50">
               <div className="h-px bg-slate-300 w-24"></div>
               <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Discovery Workflow</span>
               <div className="h-px bg-slate-300 w-24"></div>
            </div>
            
            <div className="flex items-center justify-between px-12 relative">
               {/* Connecting Line */}
               <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 transform -translate-y-1/2"></div>

               {[
                 { label: 'Search', icon: Search },
                 { label: 'Review', icon: Users },
                 { label: 'AI Fit Score', icon: Sparkles },
                 { label: 'Add to CRM', icon: Plus },
                 { label: 'Outreach Task', icon: CheckCircle },
               ].map((step, idx) => (
                 <div key={idx} className="flex flex-col items-center gap-2 bg-slate-50 p-2 rounded-lg z-10">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                       <step.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 bg-slate-50 px-2">{step.label}</span>
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>

      {/* 4. Contact Profile Preview Panel */}
      {selectedResult && (
        <div className="w-[400px] border-l border-slate-200 bg-white h-full flex-shrink-0 shadow-2xl z-20 overflow-y-auto">
           {/* Custom Discovery Profile View */}
           <div className="p-6">
              <div className="flex justify-end mb-4">
                 <Button variant="ghost" size="icon" onClick={() => setSelectedResult(null)}>
                    <MoreHorizontal className="w-4 h-4" /> {/* Close/More icon */}
                 </Button>
              </div>
              
              <div className="text-center mb-6">
                 <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-slate-50">
                   <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedResult.avatarSeed}`} />
                   <AvatarFallback>{selectedResult.name.substring(0,2)}</AvatarFallback>
                 </Avatar>
                 <h2 className="text-xl font-bold text-slate-800">{selectedResult.name}</h2>
                 <p className="text-slate-500">{selectedResult.role} at {selectedResult.company}</p>
                 
                 <div className="flex justify-center gap-2 mt-4">
                    <Button variant="outline" size="sm" className="gap-2 h-8">
                       <Linkedin className="w-3 h-3 text-[#0A66C2]" /> LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 h-8">
                       <Globe className="w-3 h-3 text-slate-500" /> Website
                    </Button>
                 </div>
              </div>

              {/* AI Insights / Fit Score Panel */}
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                 <div className="flex items-center justify-between mb-2">
                   <div className="text-xs font-bold text-green-600 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {selectedResult.type === 'Investor' ? 'Investor Fit' : 'AI Analysis'}
                   </div>
                   <span className="text-green-700 font-bold text-sm">
                      {selectedResult.matchScore}% Match
                   </span>
                 </div>
                 
                 {selectedResult.type === 'Investor' ? (
                    <ul className="space-y-1 text-xs text-green-800">
                       <li>• Strong interest in AI and Ops tooling</li>
                       <li>• Actively investing this quarter</li>
                       <li>• Portfolio companies match your segment</li>
                    </ul>
                 ) : (
                    <p className="text-sm text-green-800 font-medium">High match to AI Ideal Customer Profile</p>
                 )}
                 
                 <div className="mt-3 bg-white/50 p-2 rounded border border-green-100 text-xs text-green-800 italic">
                    Suggested: {selectedResult.type === 'Investor' ? 'Send short intro + deck link' : 'Create Follow-up Task'}
                 </div>
              </div>

              {/* Investor Specific Details */}
              {selectedResult.type === 'Investor' && (
                 <div className="space-y-4 mb-6">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Investment Thesis</h4>
                       <p className="text-sm text-slate-600 italic">"{selectedResult.thesis || 'Looking for high-growth SaaS.'}"</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                       <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Stage Focus</h4>
                          <div className="font-medium text-slate-700">{selectedResult.stageFocus || 'Seed'}</div>
                       </div>
                       <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Check Size</h4>
                          <div className="font-medium text-slate-700">{selectedResult.checkSize || 'TBD'}</div>
                       </div>
                    </div>

                    <div>
                       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recent Deals</h4>
                       <div className="flex flex-col gap-2">
                          {selectedResult.recentDeals?.map((deal: string) => (
                             <div key={deal} className="flex items-center gap-2 text-sm text-slate-600">
                                <CheckCircle className="w-3 h-3 text-blue-500" /> {deal}
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              )}

              <div className="space-y-3 mb-6">
                 <Button className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2">
                    <Plus className="w-4 h-4" /> Add to CRM
                 </Button>
                 <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full">{selectedResult.type === 'Investor' ? 'Draft Email' : 'Create Deal'}</Button>
                    <Button variant="outline" className="w-full">Create Task</Button>
                 </div>
              </div>

              {/* Common Tags */}
              <div>
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tags</h4>
                 <div className="flex flex-wrap gap-2">
                    {selectedResult.tags?.map((tag: string) => (
                       <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600">
                          {tag}
                       </Badge>
                    ))}
                 </div>
              </div>

           </div>
        </div>
      )}

    </div>
  );
};
