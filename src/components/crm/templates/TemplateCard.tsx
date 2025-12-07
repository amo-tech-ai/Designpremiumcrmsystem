import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { cn } from "../../ui/utils";
import { Template } from './types';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  isSelected, 
  onSelect, 
  disabled = false 
}) => {
  return (
    <div 
      onClick={() => !disabled && onSelect(template.id)}
      className={cn(
        "group relative flex flex-col p-6 rounded-xl border transition-all duration-300 cursor-pointer bg-white",
        // Default State
        "border-slate-200 hover:shadow-md hover:border-slate-300",
        // Selected State
        isSelected && "border-blue-600 ring-4 ring-blue-50/50 shadow-lg z-10",
        // Disabled State
        disabled && "opacity-50 cursor-not-allowed grayscale hover:shadow-none hover:border-slate-200"
      )}
    >
      {/* Header Row: Color Dot & Badge */}
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-3 h-3 rounded-full shadow-sm ring-1 ring-black/5"
          style={{ backgroundColor: template.color }}
        />
        {isSelected && (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
            Active
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow space-y-2 mb-6">
        <h3 className={cn(
          "font-semibold text-lg tracking-tight transition-colors",
          isSelected ? "text-blue-900" : "text-slate-900"
        )}>
          {template.name}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {template.description}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center gap-3">
        <Button 
          variant={isSelected ? "default" : "outline"}
          disabled={disabled}
          className={cn(
            "flex-grow transition-all duration-300",
            isSelected 
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200" 
              : "text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template.id);
          }}
        >
          {isSelected ? "Selected" : "Select Template"}
        </Button>
        
        {/* Animated Checkmark */}
        <div className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
          isSelected 
            ? "bg-blue-100 text-blue-600 scale-100 opacity-100" 
            : "bg-transparent text-transparent scale-50 opacity-0"
        )}>
          <Check className="w-5 h-5" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};
