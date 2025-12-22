import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { UploadCard } from '../common/UploadCard';
import { Sparkles, Linkedin } from 'lucide-react';

interface AddFounderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (founder: any) => void;
}

export const AddFounderModal: React.FC<AddFounderModalProps> = ({ isOpen, onClose, onSave }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white rounded-2xl border border-[#E5E5E5] shadow-lg p-0 overflow-hidden">
        <DialogHeader className="px-6 py-5 border-b border-[#E5E5E5] bg-[#F7F7F5]">
          <DialogTitle className="font-serif text-xl font-medium text-[#1A1A1A]">Add Team Member</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
           {/* Avatar Upload */}
           <div className="col-span-1">
              <UploadCard label="Photo" sublabel="Square" />
           </div>

           {/* Form Fields */}
           <div className="col-span-2 space-y-4">
              <div className="space-y-2">
                 <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Full Name</Label>
                 <Input placeholder="Jane Doe" className="h-10 border-[#E5E5E5] rounded-lg font-sans" />
              </div>
              <div className="space-y-2">
                 <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Role / Title</Label>
                 <Input placeholder="CEO & Co-Founder" className="h-10 border-[#E5E5E5] rounded-lg font-sans" />
              </div>
              <div className="space-y-2">
                 <Label className="text-sm font-bold text-[#1A1A1A] font-sans">LinkedIn URL</Label>
                 <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <Input className="pl-10 h-10 border-[#E5E5E5] rounded-lg font-sans" placeholder="linkedin.com/in/..." />
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Email</Label>
                    <Input placeholder="jane@example.com" type="email" className="h-10 border-[#E5E5E5] rounded-lg font-sans" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Website</Label>
                    <Input placeholder="janedoe.com" className="h-10 border-[#E5E5E5] rounded-lg font-sans" />
                 </div>
              </div>
           </div>

           {/* Bio with AI */}
           <div className="col-span-3 space-y-2">
              <div className="flex justify-between items-center">
                 <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Short Bio</Label>
                 <Button variant="ghost" size="sm" className="h-7 text-xs text-[#6B21A8] hover:text-[#4A0E8F] hover:bg-[#F3E8FF] font-sans font-medium rounded-lg">
                    <Sparkles className="w-3 h-3 mr-1.5" /> AI Rewrite
                 </Button>
              </div>
              <Textarea 
                placeholder="Briefly describe background and expertise..." 
                className="min-h-[100px] border-[#E5E5E5] rounded-xl font-sans resize-none"
              />
           </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-[#E5E5E5] bg-[#F7F7F5] gap-3">
          <Button variant="outline" onClick={onClose} className="border-[#E5E5E5] bg-white text-[#1A1A1A] hover:bg-[#E5E5E5] rounded-xl h-10 font-sans font-medium">Cancel</Button>
          <Button onClick={() => { onSave({}); onClose(); }} className="bg-[#1A1A1A] hover:bg-black text-white rounded-xl h-10 font-sans font-bold shadow-md">Add Member</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
