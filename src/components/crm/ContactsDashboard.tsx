import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Linkedin, 
  Mail, 
  Phone, 
  Plus 
} from 'lucide-react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../ui/utils";
import { leads, investorLeads, linkedinContacts } from './data';
import { ContactPanel } from './ContactPanel';

export const ContactsDashboard: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'sales' | 'investor' | 'linkedin'>('all');

  // Normalize data for the table
  const allContacts = [
    ...leads.map(l => ({ ...l, type: 'sales', role: 'Lead' })),
    ...investorLeads.map(l => ({ ...l, type: 'investor', role: 'Investor' })),
    ...linkedinContacts
  ];

  const filteredContacts = allContacts.filter(c => {
    if (filter === 'all') return true;
    return c.type === filter;
  });

  return (
    <div className="flex h-full bg-slate-50/50">
      
      {/* Main List Area */}
      <div className={cn(
        "flex-grow flex flex-col h-full overflow-hidden transition-all duration-300",
        selectedContact ? "w-2/3" : "w-full"
      )}>
        
        {/* Header / Toolbar */}
        <div className="p-6 border-b border-slate-200 bg-white flex justify-between items-center flex-shrink-0">
           <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-slate-800">Contacts</h2>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                 {['all', 'sales', 'investor', 'linkedin'].map((f) => (
                   <button
                     key={f}
                     onClick={() => setFilter(f as any)}
                     className={cn(
                       "px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-all",
                       filter === f ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
                     )}
                   >
                     {f}
                   </button>
                 ))}
              </div>
           </div>
           <div className="flex gap-3">
             <div className="relative w-64">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
               <Input placeholder="Search contacts..." className="pl-10 h-10" />
             </div>
             <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
               <Plus className="w-4 h-4" /> Add Contact
             </Button>
           </div>
        </div>

        {/* Table List */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                   <th className="px-6 py-4 font-medium">Name</th>
                   <th className="px-6 py-4 font-medium">Company / Role</th>
                   <th className="px-6 py-4 font-medium">Tags</th>
                   <th className="px-6 py-4 font-medium">Status</th>
                   <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredContacts.map((contact: any) => (
                  <tr 
                    key={contact.id} 
                    onClick={() => setSelectedContact(contact)}
                    className={cn(
                      "group hover:bg-slate-50 transition-colors cursor-pointer",
                      selectedContact?.id === contact.id ? "bg-blue-50/50" : ""
                    )}
                  >
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <Avatar className="h-10 w-10 border border-white shadow-sm">
                           <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatarSeed || contact.name}`} />
                           <AvatarFallback>{contact.name.substring(0,2)}</AvatarFallback>
                         </Avatar>
                         <div>
                           <div className="font-bold text-slate-800 flex items-center gap-1.5">
                             {contact.name}
                             {contact.type === 'linkedin' && (
                               <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] fill-current" />
                             )}
                           </div>
                           <div className="text-xs text-slate-500">{contact.email}</div>
                         </div>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="font-medium text-slate-700">{contact.company}</div>
                       <div className="text-xs text-slate-500">{contact.role || 'Contact'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {contact.type === 'linkedin' && (
                           <Badge className="bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 border-0 px-2 py-0.5 text-[10px]">
                             LinkedIn
                           </Badge>
                        )}
                        {contact.tags?.slice(0, 2).map((t: string) => (
                          <Badge key={t} variant="secondary" className="px-2 py-0.5 text-[10px] bg-slate-100 text-slate-600 font-normal">
                            {t}
                          </Badge>
                        ))}
                        {contact.tags?.length > 2 && (
                          <span className="text-xs text-slate-400">+{contact.tags.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       {contact.type === 'linkedin' ? (
                         <div className="flex items-center gap-2">
                           {contact.connectionStatus === 'Connected' && <div className="w-2 h-2 rounded-full bg-green-500" />}
                           {contact.connectionStatus === 'Pending' && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                           {contact.connectionStatus === 'Messaging' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                           <span className="text-slate-600 font-medium">{contact.connectionStatus || 'Connected'}</span>
                         </div>
                       ) : (
                         <div className="text-slate-500 italic">{contact.lastActivity}</div>
                       )}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                         <MoreHorizontal className="w-4 h-4" />
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {selectedContact && (
        <div className="w-[400px] border-l border-slate-200 bg-white h-full flex-shrink-0 shadow-2xl z-10">
           <ContactPanel 
             lead={selectedContact} 
             onClose={() => setSelectedContact(null)} 
           />
        </div>
      )}

    </div>
  );
};
