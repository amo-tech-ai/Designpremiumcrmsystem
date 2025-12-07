import { useContacts } from './hooks';
import { useRealtimeCRM } from './realtimeHooks';
import { ContactPanel } from './ContactPanel';
import { AddContactSidebar } from './AddContactSidebar';
import { SkeletonContactCard } from '../ui/skeleton';
import { AnimatePresence, motion } from 'motion/react';
import { LayoutGrid, List, MoreHorizontal } from 'lucide-react';

export const ContactsDashboard: React.FC = () => {
  const { contacts, loading, getContacts } = useContacts();
  
  // Enable Realtime Updates
  useRealtimeCRM(getContacts);

  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [isAddSidebarOpen, setIsAddSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'sales' | 'investor' | 'linkedin'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      // Simple type inference for demo based on tags or specific fields if they exist
      const type = c.tags?.includes('Investor') ? 'investor' : 
                   c.linkedin_url ? 'linkedin' : 'sales';
                   
      const matchesFilter = filter === 'all' || type === filter;
      const matchesSearch = 
        (c.first_name + ' ' + c.last_name).toLowerCase().includes(searchQuery.toLowerCase()) || 
        (c.account_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.email || '').toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [contacts, filter, searchQuery]);

  // Map to display format for Cards/Table
  const displayContacts = useMemo(() => {
    return filteredContacts.map(c => ({
      ...c,
      name: `${c.first_name} ${c.last_name}`,
      company: c.account_name || 'Unknown Company',
      role: c.title || 'Contact',
      type: c.tags?.includes('Investor') ? 'investor' : c.linkedin_url ? 'linkedin' : 'sales',
      engagementScore: c.overall_score || 0,
      relationshipStrength: 3, // Mock or derive
      aiInsight: c.overall_score && c.overall_score > 80 ? "High AI Match Score based on role and industry." : null,
      lastActivity: c.last_interaction_at ? new Date(c.last_interaction_at).toLocaleDateString() : 'Never',
      avatarSeed: c.email
    }));
  }, [filteredContacts]);

  return (
    <div className="flex h-full bg-slate-50/50 relative overflow-hidden">
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-full overflow-hidden">
        
        {/* HEADER */}
        <div className="px-8 py-6 bg-white border-b border-slate-200 flex flex-col gap-6 z-10 shadow-sm">
           
           {/* Top Row: Title & Actions */}
           <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
                <p className="text-slate-500 text-sm mt-1">Manage relationships with AI-powered insights</p>
              </div>
              <div className="flex gap-3">
                 <Button variant="outline" className="gap-2 hidden sm:flex">
                   <Filter className="w-4 h-4" /> Filter
                 </Button>
                 <Button 
                   onClick={() => setIsAddSidebarOpen(true)}
                   className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200"
                 >
                   <Plus className="w-4 h-4" /> Add Contact
                 </Button>
              </div>
           </div>

           {/* Bottom Row: Search & Filters */}
           <div className="flex flex-col sm:flex-row gap-4 justify-between items-end sm:items-center">
              
              {/* Tabs / Filter Pills */}
              <div className="flex bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
                 {['all', 'sales', 'investor', 'linkedin'].map((f) => (
                   <button
                     key={f}
                     onClick={() => setFilter(f as any)}
                     className={cn(
                       "px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all",
                       filter === f 
                         ? "bg-white text-indigo-900 shadow-sm font-semibold" 
                         : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                     )}
                   >
                     {f === 'linkedin' ? 'LinkedIn' : f.charAt(0).toUpperCase() + f.slice(1)}
                   </button>
                 ))}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                 {/* Smart Search */}
                 <div className="relative group w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <Input 
                      placeholder="Ask AI or search contacts..." 
                      className="pl-10 pr-10 h-10 border-slate-200 focus:border-indigo-300 focus:ring-indigo-100 transition-all bg-white" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-indigo-400 opacity-50" />
                 </div>

                 {/* View Toggle */}
                 <div className="flex items-center border border-slate-200 rounded-lg p-1 bg-white">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        "p-1.5 rounded-md transition-all",
                        viewMode === 'grid' ? "bg-slate-100 text-indigo-600" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-1" />
                    <button 
                      onClick={() => setViewMode('table')}
                      className={cn(
                        "p-1.5 rounded-md transition-all",
                        viewMode === 'table' ? "bg-slate-100 text-indigo-600" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      <List className="w-4 h-4" />
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
               {Array.from({ length: 8 }).map((_, i) => (
                 <SkeletonContactCard key={i} />
               ))}
             </div>
          ) : filteredContacts.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                   <Plus className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-700 mb-1">No contacts found</h3>
                <p className="max-w-xs text-center mb-6">Add your first contact or sync from LinkedIn to get started.</p>
                <Button 
                   onClick={() => setIsAddSidebarOpen(true)} 
                   className="bg-indigo-600 hover:bg-indigo-700 text-white"
                 >
                   <Plus className="w-4 h-4 mr-2" /> Add Contact
                </Button>
             </div>
          ) : (
             <>
                {/* Main List */}
                <div className="mb-4 flex items-center justify-between">
                   <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                     {filteredContacts.length} Contacts
                   </h3>
                   <div className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer hover:text-indigo-600">
                     Sort by: Last Activity <ChevronDown className="w-3 h-3" />
                   </div>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                    {displayContacts.map((contact) => (
                      <ContactCard 
                        key={contact.id} 
                        contact={contact} 
                        onClick={() => setSelectedContact(contact)}
                        isSelected={selectedContact?.id === contact.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden pb-20">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                        <tr>
                          <th className="px-6 py-4 font-medium">Name</th>
                          <th className="px-6 py-4 font-medium">Email</th>
                          <th className="px-6 py-4 font-medium">Company</th>
                          <th className="px-6 py-4 font-medium">AI Score</th>
                          <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {displayContacts.map((contact) => (
                          <tr 
                            key={contact.id}
                            onClick={() => setSelectedContact(contact)}
                            className={cn(
                              "group hover:bg-slate-50 transition-colors cursor-pointer",
                              selectedContact?.id === contact.id ? "bg-indigo-50/60" : ""
                            )}
                          >
                            <td className="px-6 py-4 font-medium text-slate-900">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                  {contact.first_name?.[0]}{contact.last_name?.[0]}
                                </div>
                                <span>{contact.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-slate-500">{contact.email}</td>
                            <td className="px-6 py-4 text-slate-600">{contact.company}</td>
                            <td className="px-6 py-4">
                               <div className={cn(
                                 "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                 contact.engagementScore > 80 ? "bg-green-100 text-green-800" :
                                 contact.engagementScore > 50 ? "bg-yellow-100 text-yellow-800" :
                                 "bg-slate-100 text-slate-800"
                               )}>
                                 {contact.engagementScore}
                               </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
             </>
          )}
        </div>
      </div>

      {/* Slide-over Context Panel */}
      <AnimatePresence>
        {selectedContact && (
          <>
            {/* Backdrop for mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedContact(null)}
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-20 lg:hidden"
            />
            
            {/* Panel */}
            <motion.div 
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full md:w-[500px] bg-white shadow-2xl z-30 border-l border-slate-200"
            >
              <ContactPanel 
                lead={selectedContact} 
                onClose={() => setSelectedContact(null)} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AddContactSidebar 
        open={isAddSidebarOpen} 
        onOpenChange={setIsAddSidebarOpen} 
        onContactAdded={getContacts}
      />
    </div>
  );
};