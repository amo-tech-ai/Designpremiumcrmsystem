import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Linkedin } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { AddFounderModal } from './AddFounderModal';
import { useStartupProfile } from '../StartupProfileContext';

export const StepTeam = () => {
  const { data, updateData } = useStartupProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Use data from context, default to empty array if undefined
  const founders = data.founders || [];

  const handleAddFounder = (founder: any) => {
    const newFounder = {
      ...founder,
      id: founders.length + 1,
      // Ensure properties match interface if needed
      name: founder.name || "New Member",
      role: founder.role || "Role",
      bio: founder.bio || "",
      linkedin: founder.linkedin || "",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
    };
    
    updateData({ founders: [...founders, newFounder] });
  };

  const handleRemoveFounder = (index: number) => {
     const newFounders = [...founders];
     newFounders.splice(index, 1);
     updateData({ founders: newFounders });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Team & Founders</h2>
          <p className="text-sm text-slate-500">Add key members of your leadership team.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" /> Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {founders.map((founder, index) => (
          <Card key={index} className="group hover:border-indigo-200 transition-all">
            <CardContent className="p-5">
               <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                     <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
                        <AvatarImage src={founder.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${founder.name}`} />
                        <AvatarFallback>{founder.name?.[0] || "T"}</AvatarFallback>
                     </Avatar>
                     <div>
                        <h3 className="font-bold text-slate-900">{founder.name}</h3>
                        <p className="text-sm text-indigo-600 font-medium">{founder.role}</p>
                        {founder.linkedin && (
                           <a href="#" className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 mt-1">
                              <Linkedin className="w-3 h-3" /> LinkedIn Profile
                           </a>
                        )}
                     </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                        <Edit2 className="w-4 h-4" />
                     </Button>
                     <Button 
                       variant="ghost" 
                       size="icon" 
                       className="h-8 w-8 text-slate-400 hover:text-red-600"
                       onClick={() => handleRemoveFounder(index)}
                     >
                        <Trash2 className="w-4 h-4" />
                     </Button>
                  </div>
               </div>
               <div className="mt-4 text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {founder.bio || "No bio provided."}
               </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State / Add Card */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group h-full min-h-[180px]"
        >
           <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-600 shadow-sm">
              <Plus className="w-6 h-6" />
           </div>
           <span className="text-sm font-medium text-slate-500 group-hover:text-indigo-700">Add Team Member</span>
        </button>
      </div>

      <AddFounderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddFounder} 
      />
    </div>
  );
};
