import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Building, 
  MapPin, 
  Tag, 
  Linkedin, 
  Globe, 
  MoreHorizontal,
  UserPlus,
  Users,
  ArrowRight,
  BrainCircuit,
  RefreshCw,
  CheckCircle2,
  X,
  MessageCircle,
  TrendingUp
} from 'lucide-react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../ui/utils";
import { ContactPanel } from './ContactPanel';
import { toast } from 'sonner@2.0.3';
import { addContact } from './actions';

// --- Types & Mock Data ---

interface DiscoveryContact {
  id: string;
  name: string;
  role: string;
  company: string;
  type: 'Lead' | 'Investor' | 'Partner';
  source: 'LinkedIn' | 'Website' | 'Database' | 'Referral';
  location: string;
  industry: string;
  matchScore: number;
  matchReason: string;
  aiNextStep: string;
  tags: string[];
  avatarSeed: string;
}

const MOCK_CONTACTS: DiscoveryContact[] = [
  {
    id: '1',
    name: "Elena Rodriguez",
    role: "VP of Engineering",
    company: "TechFlow Systems",
    type: "Lead",
    source: "LinkedIn",
    location: "San Francisco, CA",
    industry: "SaaS",
    matchScore: 94,
    matchReason: "High role relevance + Recent Series B funding",
    aiNextStep: "Connect with technical case study",
    tags: ["Decision Maker", "Scaling Team"],
    avatarSeed: "Elena"
  },
  {
    id: '2',
    name: "Marcus Chen",
    role: "Angel Investor",
    company: "Chen Capital",
    type: "Investor",
    source: "Database",
    location: "New York, NY",
    industry: "FinTech",
    matchScore: 88,
    matchReason: "Invests in early-stage B2B SaaS",
    aiNextStep: "Request intro via mutual connection",
    tags: ["Active Angel", "FinTech"],
    avatarSeed: "Marcus"
  },
  {
    id: '3',
    name: "Sarah Johnson",
    role: "Head of Product",
    company: "Creative Solutions",
    type: "Partner",
    source: "Website",
    location: "Austin, TX",
    industry: "Design Tools",
    matchScore: 72,
    matchReason: "Potential integration partner",
    aiNextStep: "Schedule exploratory call",
    tags: ["Product Led", "Partnership"],
    avatarSeed: "Sarah"
  },
  {
    id: '4',
    name: "David Kim",
    role: "CTO",
    company: "BuildRight",
    type: "Lead",
    source: "LinkedIn",
    location: "Seattle, WA",
    industry: "DevTools",
    matchScore: 91,
    matchReason: "Perfect tech stack match",
    aiNextStep: "Send personalized demo",
    tags: ["Technical Buyer"],
    avatarSeed: "David"
  },
  {
    id: '5',
    name: "Olivia Wilson",
    role: "Director of Sales",
    company: "GrowthHacks",
    type: "Lead",
    source: "Referral",
    location: "London, UK",
    industry: "Marketing Tech",
    matchScore: 65,
    matchReason: "Role matches but industry is adjacent",
    aiNextStep: "Nurture with content",
    tags: ["Sales Leader"],
    avatarSeed: "Olivia"
  }
];

// --- Components ---

const KPICard = ({ title, value, change, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <p className={cn("text-xs font-medium mt-1 flex items-center gap-1", change.startsWith('+') ? "text-emerald-600" : "text-slate-500")}>
        {change.startsWith('+') && <TrendingUp className="w-3 h-3" />}
        {change}
      </p>
    </div>
    <div className={cn("p-2 rounded-lg", colorClass)}>
      <Icon className="w-5 h-5" />
    </div>
  </div>
);

export const ContactDiscovery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<DiscoveryContact | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    type: 'All',
    industry: 'All',
    region: 'All'
  });
  const [isEnriching, setIsEnriching] = useState(false);

  const handleAddToCRM = async (e: React.MouseEvent, contact: DiscoveryContact) => {
    e.stopPropagation();
    try {
       await addContact({
          first_name: contact.name.split(' ')[0],
          last_name: contact.name.split(' ').slice(1).join(' '),
          title: contact.role,
          tags: contact.tags,
          overall_score: contact.matchScore,
          // map other fields
       }, {
          name: contact.company,
          // infer domain or leave empty
          segment: contact.type
       }, {
          gemini_summary: contact.matchReason
       }, {
          overall_score: contact.matchScore,
          match_reason: contact.matchReason,
          recommended_next_actions: [contact.aiNextStep]
       });
       
       toast.success(`Added ${contact.name} to CRM`);
    } catch (err) {
       toast.error("Failed to add contact");
    }
  };

  // Filter Logic
  const filteredContacts = useMemo(() => {
    return MOCK_CONTACTS.filter(contact => {
      const matchesSearch = 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = activeFilters.type === 'All' || contact.type === activeFilters.type;
      const matchesIndustry = activeFilters.industry === 'All' || contact.industry === activeFilters.industry;
      const matchesRegion = activeFilters.region === 'All' || contact.location.includes(activeFilters.region);

      return matchesSearch && matchesType && matchesIndustry && matchesRegion;
    });
  }, [searchQuery, activeFilters]);

  const handleEnrich = () => {
    setIsEnriching(true);
    setTimeout(() => setIsEnriching(false), 2000);
  };

  return (
    <div className="flex h-full bg-slate-50/50 relative overflow-hidden font-sans text-slate-900">
      
      {/* Main Content */}
      <div className="flex-grow flex flex-col h-full overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-white border-b border-slate-200 px-8 py-6 z-10 shadow-sm shrink-0">
          <div className="flex justify-between items-center mb-6">
             <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                   Contact Discovery
                   <Badge variant="outline" className="border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-normal py-0.5">
                      <Sparkles className="w-3 h-3 mr-1 inline" /> AI Powered
                   </Badge>
                </h1>
                <p className="text-slate-500 text-sm mt-1">Find and enrich new prospects with intelligent matching.</p>
             </div>
             <div className="flex gap-3">
                <Button variant="outline" className="gap-2 text-slate-600" onClick={handleEnrich} disabled={isEnriching}>
                  <RefreshCw className={cn("w-4 h-4", isEnriching && "animate-spin")} />
                  {isEnriching ? "Enriching..." : "Enrich Data"}
                </Button>
                <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200">
                  <UserPlus className="w-4 h-4" /> Import Contacts
                </Button>
             </div>
          </div>

          {/* Search & Filters Bar */}
          <div className="flex flex-col xl:flex-row gap-4 justify-between">
             {/* Search */}
             <div className="relative flex-grow max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search by name, company, role, or keywords..." 
                  className="pl-10 h-11 border-slate-200 bg-slate-50 focus:bg-white transition-all shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                   <button 
                     onClick={() => setSearchQuery('')}
                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                   >
                      <X className="w-4 h-4" />
                   </button>
                )}
             </div>

             {/* Filters */}
             <div className="flex flex-wrap gap-2 items-center">
                <FilterDropdown 
                  label="Type" 
                  value={activeFilters.type} 
                  options={['All', 'Lead', 'Investor', 'Partner']}
                  onChange={(val) => setActiveFilters(prev => ({ ...prev, type: val }))}
                  icon={Users}
                />
                <FilterDropdown 
                  label="Industry" 
                  value={activeFilters.industry} 
                  options={['All', 'SaaS', 'FinTech', 'DevTools', 'Marketing Tech']}
                  onChange={(val) => setActiveFilters(prev => ({ ...prev, industry: val }))}
                  icon={Building}
                />
                <FilterDropdown 
                  label="Region" 
                  value={activeFilters.region} 
                  options={['All', 'San Francisco', 'New York', 'London', 'Remote']}
                  onChange={(val) => setActiveFilters(prev => ({ ...prev, region: val }))}
                  icon={MapPin}
                />
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600">
                   <Filter className="w-4 h-4" />
                </Button>
             </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
           
           {/* KPI Row */}
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <KPICard 
                title="New Contacts" 
                value="128" 
                change="+12% this week" 
                icon={UserPlus} 
                colorClass="bg-blue-50 text-blue-600" 
              />
              <KPICard 
                title="High Potential" 
                value="42" 
                change="Match score > 85" 
                icon={Sparkles} 
                colorClass="bg-purple-50 text-purple-600" 
              />
              <KPICard 
                title="Investor Matches" 
                value="15" 
                change="+3 new funds" 
                icon={TrendingUp} 
                colorClass="bg-emerald-50 text-emerald-600" 
              />
              <KPICard 
                title="LinkedIn Imports" 
                value="324" 
                change="Last sync: 1h ago" 
                icon={Linkedin} 
                colorClass="bg-[#0A66C2]/10 text-[#0A66C2]" 
              />
           </div>

           {/* Results Header */}
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                 Search Results 
                 <Badge variant="secondary" className="ml-2 bg-slate-200 text-slate-600 hover:bg-slate-200">
                    {filteredContacts.length}
                 </Badge>
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                 <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> All emails verified</span>
              </div>
           </div>

           {/* Results List */}
           <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left">
                 <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    <tr>
                       <th className="px-6 py-4 w-[300px]">Profile</th>
                       <th className="px-6 py-4">Role & Location</th>
                       <th className="px-6 py-4">Type & Source</th>
                       <th className="px-6 py-4 w-[250px]">
                          <div className="flex items-center gap-1.5">
                             <BrainCircuit className="w-3.5 h-3.5 text-purple-500" /> AI Match
                          </div>
                       </th>
                       <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {filteredContacts.map((contact) => (
                       <tr 
                         key={contact.id} 
                         className={cn(
                           "group hover:bg-slate-50 transition-colors cursor-pointer",
                           selectedContact?.id === contact.id ? "bg-indigo-50/50" : ""
                         )}
                         onClick={() => setSelectedContact(contact)}
                       >
                          {/* Profile */}
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border border-slate-100 shadow-sm bg-white">
                                   <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatarSeed}`} />
                                   <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                   <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{contact.name}</div>
                                   <div className="text-sm text-slate-500 flex items-center gap-1.5">
                                      {contact.company}
                                      {contact.source === 'LinkedIn' && <Linkedin className="w-3 h-3 text-[#0A66C2]" />}
                                   </div>
                                </div>
                             </div>
                          </td>

                          {/* Role & Location */}
                          <td className="px-6 py-4">
                             <div className="text-sm font-medium text-slate-700">{contact.role}</div>
                             <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3" /> {contact.location}
                             </div>
                          </td>

                          {/* Type & Tags */}
                          <td className="px-6 py-4">
                             <div className="flex flex-col gap-1.5 items-start">
                                <Badge variant="outline" className={cn(
                                   "text-[10px] px-2 py-0.5 border-0 font-medium",
                                   contact.type === 'Lead' ? "bg-blue-100 text-blue-700" :
                                   contact.type === 'Investor' ? "bg-emerald-100 text-emerald-700" :
                                   "bg-amber-100 text-amber-700"
                                )}>
                                   {contact.type}
                                </Badge>
                                <div className="flex flex-wrap gap-1">
                                   {contact.tags.map(tag => (
                                      <span key={tag} className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                                         {tag}
                                      </span>
                                   ))}
                                </div>
                             </div>
                          </td>

                          {/* AI Match Score */}
                          <td className="px-6 py-4">
                             <div className="w-full">
                                <div className="flex justify-between items-end mb-1">
                                   <span className="text-xs font-bold text-slate-700">{contact.matchScore}%</span>
                                   <span className="text-[10px] font-medium text-purple-600">High Fit</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                                   <div 
                                      className={cn(
                                        "h-full rounded-full bg-gradient-to-r",
                                        contact.matchScore > 90 ? "from-emerald-400 to-emerald-500" :
                                        contact.matchScore > 75 ? "from-purple-400 to-purple-500" :
                                        "from-amber-400 to-amber-500"
                                      )}
                                      style={{ width: `${contact.matchScore}%` }}
                                   />
                                </div>
                                <p className="text-[10px] text-slate-500 line-clamp-1 flex items-center gap-1">
                                   <Sparkles className="w-3 h-3 text-purple-400 inline" />
                                   {contact.matchReason}
                                </p>
                             </div>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                             <div className="flex items-center justify-end gap-2">
                                <Button 
                                   size="xs" 
                                   className="h-8 text-xs bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm opacity-0 group-hover:opacity-100 transition-all mr-2"
                                   onClick={(e) => handleAddToCRM(e, contact)}
                                >
                                   <UserPlus className="w-3 h-3 mr-1" /> Add to CRM
                                </Button>
                                
                                <div className="hidden group-hover:flex gap-2 mr-2">
                                   <Button 
                                      variant="outline" 
                                      size="xs" 
                                      className="h-8 text-[10px] bg-white hover:text-indigo-600 hover:border-indigo-200"
                                      title={contact.aiNextStep}
                                   >
                                      <MessageCircle className="w-3 h-3 mr-1" /> Next Step
                                   </Button>
                                </div>
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600">
                                   <ArrowRight className="w-4 h-4" />
                                </Button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

        </div>
      </div>

      {/* Slide-over Profile */}
      <AnimatePresence>
        {selectedContact && (
          <>
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedContact(null)}
               className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-20"
             />
             <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="absolute right-0 top-0 bottom-0 w-[500px] bg-white shadow-2xl z-30 border-l border-slate-200"
             >
                <div className="h-full flex flex-col">
                   <ContactPanel 
                     lead={convertDiscoveryToLead(selectedContact)} 
                     onClose={() => setSelectedContact(null)}
                   />
                </div>
             </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

// Helper: Convert DiscoveryContact to the format ContactPanel expects
const convertDiscoveryToLead = (dc: DiscoveryContact) => ({
  ...dc,
  healthScore: dc.matchScore,
  email: `${dc.name.split(' ')[0].toLowerCase()}@${dc.company.toLowerCase().replace(/\s/g, '')}.com`,
  phone: '+1 (555) 123-4567',
  stage: 'Discovery',
  lastActivity: 'Found today',
  connectionLevel: '2nd',
  connectionStatus: 'Not Connected',
  targetInvestors: dc.type === 'Investor' ? [dc.industry] : undefined,
  fundingGoal: dc.type === 'Investor' ? '$2M - $5M' : undefined
});

// Helper: Filter Dropdown Component
const FilterDropdown = ({ label, value, options, onChange, icon: Icon }: any) => {
   const [isOpen, setIsOpen] = useState(false);
   
   return (
      <div className="relative">
         <button 
           onClick={() => setIsOpen(!isOpen)}
           onBlur={() => setTimeout(() => setIsOpen(false), 200)}
           className={cn(
             "h-10 px-3 rounded-lg border flex items-center gap-2 text-sm font-medium transition-all",
             value !== 'All' 
               ? "bg-indigo-50 border-indigo-200 text-indigo-700" 
               : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
           )}
         >
            <Icon className={cn("w-4 h-4", value !== 'All' ? "text-indigo-500" : "text-slate-400")} />
            {label}: {value}
         </button>
         
         {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
               {options.map((opt: string) => (
                  <button
                    key={opt}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    onClick={() => {
                       onChange(opt);
                       setIsOpen(false);
                    }}
                  >
                    {opt}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
}