import React, { useState, useRef, useEffect } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { 
  Check, 
  X, 
  Edit2, 
  Plus, 
  Hash, 
  ChevronDown 
} from 'lucide-react';
import { cn } from "../ui/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// --- 1. Editable Text Input (Name, Company, Email) ---
interface EditableInputProps {
  value: string;
  label?: string;
  placeholder?: string;
  onSave: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
}

export const EditableInput: React.FC<EditableInputProps> = ({ 
  value: initialValue, 
  label, 
  placeholder, 
  onSave,
  icon,
  className 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <div className={cn("group relative", className)}>
      {label && <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">{label}</label>}
      
      {isEditing ? (
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">{icon}</div>}
            <Input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn("h-9", icon && "pl-9")}
            />
          </div>
          <Button size="icon" variant="ghost" onClick={handleSave} className="h-8 w-8 text-green-600 hover:bg-green-50">
            <Check className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleCancel} className="h-8 w-8 text-red-500 hover:bg-red-50">
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div 
          onClick={() => setIsEditing(true)}
          className="flex items-center justify-between p-2 -ml-2 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all"
        >
          <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
            {icon && <span className="text-slate-400">{icon}</span>}
            <span className={cn(!value && "text-slate-400 italic")}>{value || placeholder || "Empty"}</span>
          </div>
          <Edit2 className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
    </div>
  );
};

// --- 2. Editable Select (Stage, Priority) ---
interface EditableSelectProps {
  value: string;
  label?: string;
  options: { label: string; value: string; color?: string }[];
  onSave: (value: string) => void;
}

export const EditableSelect: React.FC<EditableSelectProps> = ({
  value,
  label,
  options,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const currentOption = options.find(o => o.value === value);

  const handleSelect = (val: string) => {
    onSave(val);
    setIsEditing(false);
  };

  return (
    <div className="group">
      {label && <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">{label}</label>}
      
      {isEditing ? (
        <div className="flex items-center gap-2">
           <Select defaultValue={value} onValueChange={handleSelect}>
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)} className="h-8 w-8 text-slate-400">
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
         <div 
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
         >
           <Badge className={cn(
             "px-3 py-1 text-sm font-medium hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-2",
             currentOption?.color || "bg-slate-100 text-slate-700"
           )}>
             {currentOption?.label || value}
             <ChevronDown className="w-3 h-3 opacity-50" />
           </Badge>
         </div>
      )}
    </div>
  );
};

// --- 3. Editable Textarea (Notes) ---
interface EditableTextareaProps {
  value: string;
  label?: string;
  placeholder?: string;
  onSave: (value: string) => void;
}

export const EditableTextarea: React.FC<EditableTextareaProps> = ({
  value: initialValue,
  label,
  placeholder,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        {label && <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</label>}
        {isEditing && (
          <div className="flex gap-1">
            <Button size="xs" variant="ghost" onClick={() => setIsEditing(false)} className="h-6 text-xs text-slate-400">Cancel</Button>
            <Button size="xs" onClick={handleSave} className="h-6 text-xs bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <Textarea 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="min-h-[100px] text-sm"
        />
      ) : (
        <div 
          onClick={() => setIsEditing(true)}
          className="p-3 -ml-3 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50 cursor-pointer transition-all min-h-[60px]"
        >
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
            {value || <span className="text-slate-400 italic">{placeholder}</span>}
          </p>
        </div>
      )}
    </div>
  );
};

// --- 4. Editable Tags ---
interface EditableTagsProps {
  tags: string[];
  onSave: (tags: string[]) => void;
}

export const EditableTags: React.FC<EditableTagsProps> = ({ tags: initialTags, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState("");

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    if (!isEditing) onSave(newTags);
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleSave = () => {
    onSave(tags);
    setIsEditing(false);
  };

  return (
    <div className="group">
       <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Hash className="w-3 h-3" /> Tags
        </label>
        {isEditing ? (
           <Button size="xs" onClick={handleSave} className="h-6 text-xs bg-blue-600">Done</Button>
        ) : (
           <Button 
             size="icon" variant="ghost" 
             onClick={() => setIsEditing(true)} 
             className="h-6 w-6 text-slate-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
           >
             <Edit2 className="w-3 h-3" />
           </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 font-normal pl-2 pr-1 py-1 flex items-center gap-1">
            {tag}
            {isEditing && (
              <X 
                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                onClick={() => removeTag(tag)}
              />
            )}
          </Badge>
        ))}
        
        {isEditing && (
          <div className="relative w-24">
             <Input 
               className="h-6 text-xs px-1 py-0 border-slate-200 focus-visible:ring-0 focus-visible:border-blue-400"
               placeholder="Add tag..."
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={addTag}
               autoFocus
             />
          </div>
        )}

        {!isEditing && tags.length === 0 && (
           <span className="text-xs text-slate-400 italic cursor-pointer" onClick={() => setIsEditing(true)}>+ Add tags</span>
        )}
      </div>
    </div>
  );
};
