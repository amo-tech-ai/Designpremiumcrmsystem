import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';

interface TagInputProps {
  placeholder?: string;
  tags?: string[];
  onChange?: (tags: string[]) => void;
}

export const TagInput: React.FC<TagInputProps> = ({ 
  placeholder = "Add tag...", 
  tags = [], 
  onChange 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [localTags, setLocalTags] = useState<string[]>(tags);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    }
  };

  const addTag = (tag: string) => {
    if (!localTags.includes(tag)) {
      const newTags = [...localTags, tag];
      setLocalTags(newTags);
      if (onChange) onChange(newTags);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = localTags.filter(tag => tag !== tagToRemove);
    setLocalTags(newTags);
    if (onChange) onChange(newTags);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {localTags.map(tag => (
          <Badge key={tag} variant="secondary" className="px-3 py-1 bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#F7F7F5] font-sans font-medium rounded-lg">
            {tag}
            <button onClick={() => removeTag(tag)} className="ml-2 hover:text-[#991B1B] text-[#9CA3AF] transition-colors focus:outline-none">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow h-10 border-[#E5E5E5] focus-visible:ring-[#1A1A1A] rounded-lg font-sans"
        />
        <Button 
          variant="outline" 
          size="icon"
          className="h-10 w-10 border-[#E5E5E5] hover:bg-[#F7F7F5] hover:text-[#1A1A1A] rounded-lg"
          onClick={() => inputValue.trim() && addTag(inputValue.trim())}
          disabled={!inputValue.trim()}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
