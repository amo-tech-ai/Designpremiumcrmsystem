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
          <Badge key={tag} variant="secondary" className="px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100">
            {tag}
            <button onClick={() => removeTag(tag)} className="ml-2 hover:text-red-500 focus:outline-none">
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
          className="flex-grow"
        />
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => inputValue.trim() && addTag(inputValue.trim())}
          disabled={!inputValue.trim()}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
