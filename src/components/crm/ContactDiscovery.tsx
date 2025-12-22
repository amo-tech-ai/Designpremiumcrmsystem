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
  TrendingUp,
  Mail,
  Phone
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
  <div className="bg-white p-6 rounded-2xl border border-[#E3E7EE] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-start justify-between">
    <div>
      <p className="text-[#7A8191] text-xs font-bold uppercase tracking-wider mb-2">{title}</p>
      <h3 className="text-3xl font-bold text-[#1A1F2C] mb-1">{value}</h3>
      <p className={cn("text-xs font-medium flex items-center gap-1", change.startsWith('+') ? "text-[#3A4250]" : "text-[#7A8191]")}>
        {change.startsWith('+') && <TrendingUp className="w-3 h-3" />}
        {change}
      </p>
    </div>
    <div className={cn("p-3 rounded-xl", colorClass)}>
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
    <div className="flex h-full bg-[#FAF9F7] relative overflow-hidden font-sans text-[#1A1F2C]">
      
      {/* Main Content */}
      <div className="flex-grow flex flex-col h-full overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-[#FAF9F7] px-8 py-8 z-10 shrink-0">
          <div className="flex justify-between items-end mb-8">
             <div>
                <h1 className="text-3xl font-bold text-[#1A1F2C] flex items-center gap-3 tracking-tight">
                   Contact Discovery
                   <Badge variant="secondary" className="border border-[#DCE4F4] bg-[#EAF1FF] text-[#3A4250] text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                      <Sparkles className="w-3 h-3 mr-1.5 inline text-[#6070A0]" /> AI Powered
                   </Badge>
                </h1>
                <p className="text-[#7A8191] text-base mt-2 font-medium">Find and enrich new prospects with intelligent matching.</p>
             </div>
             <div className="flex gap-4">
                <Button variant="outline" className="gap-2 text-[#4A4F5B] bg-white border-[#E3E7EE] hover:bg-[#F3F6FB] hover:text-[#3A4250] hover:border-[#DCE4F4] shadow-sm rounded-xl h-11 px-5" onClick={handleEnrich} disabled={isEnriching}>
                  <RefreshCw className={cn("w-4 h-4", isEnriching && "animate-spin")} />
                  {isEnriching ? "Enriching..." : "Enrich Data"}
                </Button>
                <Button className="gap-2 bg-[#3A4250] hover:bg-[#2C333F] text-white shadow-md shadow-[#3A4250]/20 rounded-xl h-11 px-5 font-medium">
                  <UserPlus className="w-4 h-4" /> Import Contacts
                </Button>
             </div>
          </div>

          {/* Search & Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#E3E7EE] shadow-sm flex flex-col xl:flex-row gap-4 justify-between items-center">
             {/* Search */}
             <div className="relative flex-grow w-full xl:max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A8191]" />
                <Input 
                  placeholder="Search by name, company, role, or keywords..." 
                  className="pl-11 h-12 border-[#E3E7EE] bg-[#FAF9F7] focus:bg-white focus:border-[#DCE4F4] focus:ring-4 focus:ring-[#EAF1FF] transition-all rounded-xl text-[#1A1F2C] placeholder:text-[#9CA3AF]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                   <button 
                     onClick={() => setSearchQuery('')}
                     className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A8191] hover:text-[#3A4250]"
                   >
                      <X className="w-4 h-4" />
                   </button>
                )}
             </div>

             {/* Filters */}
             <div className="flex flex-wrap gap-3 items-center w-full xl:w-auto justify-end">
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
                <Button variant="ghost" size="icon" className="text-[#7A8191] hover:text-[#3A4250] hover:bg-[#F3F6FB] rounded-xl h-10 w-10">
                   <Filter className="w-4 h-4" />
                </Button>
             </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto px-8 pb-12 custom-scrollbar">
           
           {/* KPI Row */}
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <KPICard 
                title="New Contacts" 
                value="128" 
                change="+12% this week" 
                icon={UserPlus} 
                colorClass="bg-[#EAF1FF] text-[#6070A0]" 
              />
              <KPICard 
                title="High Potential" 
                value="42" 
                change="Match score > 85" 
                icon={Sparkles} 
                colorClass="bg-[#F3F6FB] text-[#3A4250]" 
              />
              <KPICard 
                title="Investor Matches" 
                value="15" 
                change="+3 new funds" 
                icon={TrendingUp} 
                colorClass="bg-[#FFECEC] text-[#FF8B6B]" 
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
           <div className="flex items-center justify-between mb-5 px-1">
              <h2 className="text-xl font-bold text-[#1A1F2C] flex items-center gap-3">
                 Search Results 
                 <Badge variant="secondary" className="bg-[#EAF1FF] text-[#3A4250] hover:bg-[#DCE4F4] text-xs font-bold px-2.5 py-0.5 border border-[#DCE4F4]">
                    {filteredContacts.length} Found
                 </Badge>
              </h2>
              <div className="flex items-center gap-2 text-sm text-[#7A8191] font-medium">
                 <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E3E7EE] shadow-sm"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> All emails verified</span>
              </div>
           </div>

           {/* Results List */}
           <div className="bg-white border border-[#E3E7EE] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
              <table className="w-full text-left">
                 <thead className="bg-[#F3F6FB] border-b border-[#E3E7EE] text-[#7A8191] text-xs font-bold uppercase tracking-wider">
                    <tr>
                       <th className="px-8 py-5 w-[320px]">Profile</th>
                       <th className="px-6 py-5">Role & Location</th>
                       <th className="px-6 py-5">Type & Source</th>
                       <th className="px-6 py-5 w-[280px]">
                          <div className="flex items-center gap-1.5">
                             <BrainCircuit className="w-4 h-4 text-[#6070A0]" /> AI Match
                          </div>
                       </th>
                       <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-[#F3F6FB]">
                    {filteredContacts.map((contact) => (
                       <tr 
                         key={contact.id} 
                         className={cn(
                           "group hover:bg-[#F9FAFC] transition-all cursor-pointer",
                           selectedContact?.id === contact.id ? "bg-[#EAF1FF]/40" : ""
                         )}
                         onClick={() => setSelectedContact(contact)}
                       >
                          {/* Profile */}
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-4">
                                <Avatar className="h-11 w-11 border-2 border-white shadow-md bg-white">
                                   <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatarSeed}`} />
                                   <AvatarFallback className="bg-[#F3F6FB] text-[#3A4250] font-bold">{contact.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                   <div className="font-bold text-[#1A1F2C] text-base group-hover:text-[#3A4250] transition-colors">{contact.name}</div>
                                   <div className="text-sm text-[#7A8191] flex items-center gap-1.5 font-medium mt-0.5">
                                      {contact.company}
                                      {contact.source === 'LinkedIn' && <Linkedin className="w-3 h-3 text-[#0A66C2]" />}
                                   </div>
                                </div>
                             </div>
                          </td>

                          {/* Role & Location */}
                          <td className="px-6 py-5">
                             <div className="text-sm font-semibold text-[#4A4F5B]">{contact.role}</div>
                             <div className="text-xs text-[#7A8191] flex items-center gap-1.5 mt-1 font-medium">
                                <MapPin className="w-3 h-3" /> {contact.location}
                             </div>
                          </td>

                          {/* Type & Tags */}
                          <td className="px-6 py-5">
                             <div className="flex flex-col gap-2 items-start">
                                <Badge variant="outline" className={cn(
                                   "text-[10px] px-2.5 py-0.5 border font-bold rounded-lg shadow-sm",
                                   contact.type === 'Lead' ? "bg-[#EAF1FF] text-[#3A4250] border-[#DCE4F4]" :
                                   contact.type === 'Investor' ? "bg-[#ECFFE9] text-[#2F5E3D] border-[#A8E6C1]" :
                                   "bg-[#FFF9E6] text-[#7A5C1B] border-[#F6DFA9]"
                                )}>
                                   {contact.type}
                                </Badge>
                                <div className="flex flex-wrap gap-1.5">
                                   {contact.tags.map(tag => (
                                      <span key={tag} className="text-[10px] text-[#7A8191] bg-[#F3F6FB] border border-[#E3E7EE] px-2 py-0.5 rounded-md font-medium">
                                         {tag}
                                      </span>
                                   ))}
                                </div>
                             </div>
                          </td>

                          {/* AI Match Score */}
                          <td className="px-6 py-5">
                             <div className="w-full">
                                <div className="flex justify-between items-end mb-1.5">
                                   <span className="text-sm font-bold text-[#3A4250]">{contact.matchScore}%</span>
                                   <span className="text-[10px] font-bold text-[#6070A0] uppercase tracking-wide">High Fit</span>
                                </div>
                                <div className="h-2.5 w-full bg-[#F3F6FB] rounded-full overflow-hidden mb-2 border border-[#E3E7EE]">
                                   <div 
                                      className={cn(
                                        "h-full rounded-full bg-gradient-to-r shadow-sm",
                                        contact.matchScore > 90 ? "from-[#4CAF73] to-[#A8E6C1]" :
                                        contact.matchScore > 75 ? "from-[#6F7EBC] to-[#C9D7F2]" :
                                        "from-[#E0B45A] to-[#F6DFA9]"
                                      )}
                                      style={{ width: `${contact.matchScore}%` }}
                                   />
                                </div>
                                <p className="text-[11px] text-[#7A8191] line-clamp-1 flex items-center gap-1.5 font-medium">
                                   <Sparkles className="w-3 h-3 text-[#6070A0] inline" />
                                   {contact.matchReason}
                                </p>
                             </div>
                          </td>

                          {/* Actions */}
                          <td className="px-8 py-5 text-right">
                             <div className="flex items-center justify-end gap-3">
                                <Button 
                                   size="sm" 
                                   className="h-9 text-xs bg-[#3A4250] text-white hover:bg-[#2C333F] shadow-sm opacity-0 group-hover:opacity-100 transition-all font-medium rounded-lg px-4"
                                   onClick={(e) => handleAddToCRM(e, contact)}
                                >
                                   <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Add
                                </Button>
                                
                                <div className="hidden group-hover:flex gap-2">
                                   <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="h-9 text-xs bg-white hover:text-[#3A4250] hover:bg-[#F3F6FB] hover:border-[#DCE4F4] font-medium rounded-lg"
                                      title={contact.aiNextStep}
                                   >
                                      <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> Next Step
                                   </Button>
                                </div>
                                <Button variant="ghost" size="icon" className="text-[#7A8191] hover:text-[#3A4250] hover:bg-[#F3F6FB] rounded-lg">
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
               className="absolute inset-0 bg-[#3A4250]/20 backdrop-blur-sm z-20"
             />
             <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="absolute right-0 top-0 bottom-0 w-[550px] bg-white shadow-2xl z-30 border-l border-[#E3E7EE]"
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
             "h-11 px-4 rounded-xl border flex items-center gap-2.5 text-sm font-semibold transition-all shadow-sm",
             value !== 'All' 
               ? "bg-[#EAF1FF] border-[#DCE4F4] text-[#3A4250]" 
               : "bg-white border-[#E3E7EE] text-[#4A4F5B] hover:border-[#DCE4F4] hover:bg-[#F9FAFC]"
           )}
         >
            <Icon className={cn("w-4 h-4", value !== 'All' ? "text-[#6070A0]" : "text-[#7A8191]")} />
            <span className="text-[#7A8191] font-normal">{label}:</span> {value}
         </button>
         
         {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-[#E3E7EE] py-1.5 z-20 animate-in fade-in zoom-in-95 duration-100 overflow-hidden">
               {options.map((opt: string) => (
                  <button
                    key={opt}
                    className="w-full text-left px-5 py-2.5 text-sm text-[#4A4F5B] font-medium hover:bg-[#F3F6FB] hover:text-[#3A4250] transition-colors"
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
