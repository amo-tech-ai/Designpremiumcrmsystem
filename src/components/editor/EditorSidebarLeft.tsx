import React, { useState } from 'react';
import { Slide } from './types';
import { cn } from '../ui/utils';
import { GripVertical, Plus, Copy, Trash2, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '../ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "../ui/context-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface EditorSidebarLeftProps {
  slides: Slide[];
  currentSlideId: string;
  onSelectSlide: (id: string) => void;
  onAddSlide: () => void;
  onDeleteSlide: (id: string) => void;
  onDuplicateSlide: (id: string) => void;
  onMoveSlide: (id: string, direction: 'up' | 'down') => void;
}

export const EditorSidebarLeft: React.FC<EditorSidebarLeftProps> = ({
  slides,
  currentSlideId,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
  onDuplicateSlide,
  onMoveSlide
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "flex-shrink-0 flex flex-col border-r border-slate-200 bg-white h-full transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      {/* Header */}
      <div className={cn("h-14 flex items-center border-b border-slate-100 flex-shrink-0 transition-all", isCollapsed ? "justify-center px-0" : "justify-between px-4")}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-800">Slides</h2>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {slides.length}
            </span>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 text-slate-400 hover:text-slate-600"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </Button>
      </div>

      {/* Slide List */}
      <div className="flex-grow overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-200">
        <TooltipProvider delayDuration={0}>
          {slides.map((slide, index) => {
            const isActive = slide.id === currentSlideId;
            
            return (
              <ContextMenu key={slide.id}>
                <ContextMenuTrigger>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        onClick={() => onSelectSlide(slide.id)}
                        className={cn(
                          "group flex items-center rounded-lg cursor-pointer transition-all duration-200 border-l-[3px]",
                          isCollapsed 
                            ? "flex-col justify-center py-3 px-1 gap-1" 
                            : "gap-3 p-2",
                          isActive
                            ? "bg-orange-50 border-[#F97316]"
                            : "bg-white border-transparent hover:bg-slate-50"
                        )}
                      >
                        {!isCollapsed && (
                          <div className="text-slate-300 group-hover:text-slate-400 cursor-grab">
                            <GripVertical className="w-4 h-4" />
                          </div>
                        )}

                        {/* Slide Number */}
                        <span className={cn(
                          "text-[10px] font-bold text-center",
                          isActive ? "text-[#F97316]" : "text-slate-400"
                        )}>
                          {index + 1}
                        </span>

                        {/* Content */}
                        {isCollapsed ? (
                           <div className="w-8 h-6 bg-slate-100 rounded border border-slate-200 flex-shrink-0" />
                        ) : (
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={cn(
                                "text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded",
                                isActive ? "bg-white text-[#F97316] shadow-sm" : "bg-slate-100 text-slate-500"
                              )}>
                                {slide.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                               <div className="w-8 h-5 bg-slate-100 rounded border border-slate-200 flex-shrink-0" />
                               <div className={cn(
                                 "text-xs font-medium truncate",
                                 isActive ? "text-slate-900" : "text-slate-600"
                               )}>
                                 {slide.title || "Untitled Slide"}
                               </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right" className="font-semibold">
                        <p>{index + 1}. {slide.title || "Untitled"}</p>
                        <p className="text-[10px] text-slate-400 font-normal uppercase">{slide.type}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </ContextMenuTrigger>
                
                <ContextMenuContent className="w-48">
                  <ContextMenuItem onClick={() => onDuplicateSlide(slide.id)}>
                    <Copy className="w-4 h-4 mr-2" /> Duplicate
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => onMoveSlide(slide.id, 'up')} disabled={index === 0}>
                    <ArrowUp className="w-4 h-4 mr-2" /> Move Up
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => onMoveSlide(slide.id, 'down')} disabled={index === slides.length - 1}>
                    <ArrowDown className="w-4 h-4 mr-2" /> Move Down
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem 
                    onClick={() => onDeleteSlide(slide.id)}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </TooltipProvider>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-center">
        <Button 
          variant="outline" 
          className={cn(
            "border-dashed border-slate-300 text-slate-600 hover:border-[#F97316] hover:text-[#F97316] bg-white transition-all",
            isCollapsed ? "w-10 h-10 p-0 rounded-full" : "w-full"
          )}
          onClick={onAddSlide}
          title={isCollapsed ? "Add Slide" : undefined}
        >
          <Plus className="w-4 h-4" /> 
          {!isCollapsed && <span className="ml-2">Add Slide</span>}
        </Button>
      </div>
    </div>
  );
};
