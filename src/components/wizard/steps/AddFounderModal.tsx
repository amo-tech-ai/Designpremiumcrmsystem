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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
           {/* Avatar Upload */}
           <div className="col-span-1">
              <UploadCard label="Photo" sublabel="Square" />
           </div>

           {/* Form Fields */}
           <div className="col-span-2 space-y-4">
              <div className="space-y-2">
                 <Label>Full Name</Label>
                 <Input placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                 <Label>Role / Title</Label>
                 <Input placeholder="CEO & Co-Founder" />
              </div>
              <div className="space-y-2">
                 <Label>LinkedIn URL</Label>
                 <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input className="pl-10" placeholder="linkedin.com/in/..." />
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Email</Label>
                    <Input placeholder="jane@example.com" type="email" />
                 </div>
                 <div className="space-y-2">
                    <Label>Website</Label>
                    <Input placeholder="janedoe.com" />
                 </div>
              </div>
           </div>

           {/* Bio with AI */}
           <div className="col-span-3 space-y-2">
              <div className="flex justify-between items-center">
                 <Label>Short Bio</Label>
                 <Button variant="ghost" size="sm" className="h-6 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                    <Sparkles className="w-3 h-3 mr-1" /> AI Rewrite
                 </Button>
              </div>
              <Textarea placeholder="Briefly describe background and expertise..." />
           </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => { onSave({}); onClose(); }}>Add Member</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
