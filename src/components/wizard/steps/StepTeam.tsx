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
          <h2 className="text-xl font-serif font-medium text-[#1A1A1A]">Team & Founders</h2>
          <p className="text-sm text-[#6B7280] font-sans mt-1">Add key members of your leadership team.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#1A1A1A] hover:bg-black text-white rounded-xl font-sans font-medium h-10 shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {founders.map((founder, index) => (
          <Card key={index} className="group hover:border-[#1A1A1A] hover:shadow-md transition-all border-[#E5E5E5] rounded-2xl bg-white shadow-sm">
            <CardContent className="p-6">
               <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                     <Avatar className="w-16 h-16 border-2 border-white ring-1 ring-[#E5E5E5] shadow-sm">
                        <AvatarImage src={founder.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${founder.name}`} />
                        <AvatarFallback className="bg-[#F7F7F5] text-[#1A1A1A] font-bold">{founder.name?.[0] || "T"}</AvatarFallback>
                     </Avatar>
                     <div>
                        <h3 className="font-bold text-[#1A1A1A] font-sans text-lg">{founder.name}</h3>
                        <p className="text-sm text-[#6B7280] font-medium font-sans">{founder.role}</p>
                        {founder.linkedin && (
                           <a href="#" className="text-xs text-[#9CA3AF] hover:text-[#0077B5] flex items-center gap-1 mt-1 transition-colors">
                              <Linkedin className="w-3 h-3" /> LinkedIn Profile
                           </a>
                        )}
                     </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] hover:text-[#1A1A1A] hover:bg-[#F7F7F5] rounded-lg">
                        <Edit2 className="w-4 h-4" />
                     </Button>
                     <Button 
                       variant="ghost" 
                       size="icon" 
                       className="h-8 w-8 text-[#9CA3AF] hover:text-[#991B1B] hover:bg-[#FEE2E2]"
                       onClick={() => handleRemoveFounder(index)}
                     >
                        <Trash2 className="w-4 h-4" />
                     </Button>
                  </div>
               </div>
               <div className="mt-5 text-sm text-[#4A4F5B] leading-relaxed bg-[#F7F7F5] p-4 rounded-xl border border-[#E5E5E5] font-sans">
                  {founder.bio || "No bio provided."}
               </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State / Add Card */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="border border-dashed border-[#E5E5E5] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-[#1A1A1A] hover:bg-[#FFFFFF] bg-[#F7F7F5]/50 transition-all group h-full min-h-[220px]"
        >
           <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#9CA3AF] group-hover:text-[#1A1A1A] shadow-sm border border-[#E5E5E5] group-hover:border-[#1A1A1A] transition-colors">
              <Plus className="w-6 h-6" />
           </div>
           <span className="text-sm font-bold text-[#6B7280] group-hover:text-[#1A1A1A] font-sans">Add Team Member</span>
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
