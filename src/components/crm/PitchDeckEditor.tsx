import React, { useState } from 'react';
import { 
  Layout, 
  Image as ImageIcon, 
  Type, 
  Columns, 
  MoreVertical, 
  Plus, 
  Sparkles, 
  Check, 
  ChevronRight, 
  AlertCircle, 
  Lightbulb, 
  Wand2,
  RefreshCw,
  Maximize2,
  Download,
  Share2,
  Play
} from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

// Types
type SlideStatus = 'draft' | 'edited' | 'ai-suggested';
type SlideLayout = 'text' | 'text-image' | 'two-column' | 'visual';

interface Slide {
  id: string;
  title: string;
  content: string;
  layout: SlideLayout;
  status: SlideStatus;
  thumbnail?: string;
}

const INITIAL_SLIDES: Slide[] = [
  { id: '1', title: 'Title Slide', content: 'EventOS: The Future of Fashion Events', layout: 'visual', status: 'edited' },
  { id: '2', title: 'Problem', content: 'Organizing fashion weeks is chaotic and disconnected.', layout: 'text', status: 'draft' },
  { id: '3', title: 'Solution', content: 'An all-in-one platform for digital and physical runway management.', layout: 'text-image', status: 'ai-suggested' },
  { id: '4', title: 'Market Size', content: '$2.5T Global Fashion Industry', layout: 'two-column', status: 'draft' },
  { id: '5', title: 'Product', content: 'Seamless ticketing, seating, and showrooms.', layout: 'text-image', status: 'draft' },
  { id: '6', title: 'Business Model', content: 'SaaS Subscription + Transaction Fees', layout: 'text', status: 'draft' },
  { id: '7', title: 'Go-to-Market', content: 'Direct sales to Fashion Councils & PR Agencies', layout: 'text', status: 'draft' },
  { id: '8', title: 'Traction', content: '3 Major Fashion Weeks signed LOIs', layout: 'visual', status: 'draft' },
  { id: '9', title: 'Team', content: 'Ex-Vogue, Ex-Shopify Founders', layout: 'two-column', status: 'draft' },
  { id: '10', title: 'The Ask', content: 'Raising $2M Seed to scale engineering', layout: 'text', status: 'draft' },
];

export const PitchDeckEditor: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(INITIAL_SLIDES);
  const [currentSlideId, setCurrentSlideId] = useState<string>('2');
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);

  const currentSlide = slides.find(s => s.id === currentSlideId) || slides[0];

  const updateSlide = (key: keyof Slide, value: any) => {
    setSlides(slides.map(s => s.id === currentSlideId ? { ...s, [key]: value } : s));
  };

  return (
    <div className="flex h-full bg-[#F7F7FB] overflow-hidden font-sans text-slate-800">
      
      {/* 1. LEFT SIDEBAR: SLIDE LIST */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
           <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Slides ({slides.length})</h2>
           <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
              <MoreVertical className="w-4 h-4" />
           </Button>
        </div>
        
        <div className="flex-grow overflow-y-auto custom-scrollbar p-3 space-y-2">
           {slides.map((slide, index) => (
             <div 
               key={slide.id}
               onClick={() => setCurrentSlideId(slide.id)}
               className={cn(
                 "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all group border",
                 currentSlideId === slide.id 
                   ? "bg-indigo-50 border-indigo-200 shadow-sm" 
                   : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-100"
               )}
             >
                <div className="text-xs font-bold text-slate-300 w-4 text-center">{index + 1}</div>
                {/* Mini Thumbnail */}
                <div className={cn(
                   "w-12 h-8 rounded border flex items-center justify-center bg-slate-50",
                   currentSlideId === slide.id ? "border-indigo-200" : "border-slate-100"
                )}>
                   {slide.layout === 'visual' && <ImageIcon className="w-3 h-3 text-slate-300" />}
                   {slide.layout === 'text' && <Type className="w-3 h-3 text-slate-300" />}
                   {slide.layout === 'text-image' && <Layout className="w-3 h-3 text-slate-300" />}
                   {slide.layout === 'two-column' && <Columns className="w-3 h-3 text-slate-300" />}
                </div>
                
                <div className="flex-grow min-w-0">
                   <div className={cn("text-xs font-bold truncate mb-0.5", currentSlideId === slide.id ? "text-indigo-900" : "text-slate-700")}>
                      {slide.title}
                   </div>
                   <div className="flex items-center gap-1.5">
                      <div className={cn("w-1.5 h-1.5 rounded-full", 
                         slide.status === 'ai-suggested' ? "bg-purple-500" :
                         slide.status === 'edited' ? "bg-indigo-500" : "bg-slate-300"
                      )} />
                      <span className="text-[10px] text-slate-400 capitalize">{slide.status}</span>
                   </div>
                </div>
             </div>
           ))}

           <Button variant="outline" className="w-full mt-4 border-dashed border-slate-300 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 gap-2 h-10">
              <Plus className="w-4 h-4" /> Add Slide
           </Button>
        </div>
      </div>

      {/* 2. MAIN EDITOR AREA */}
      <div className="flex-grow flex flex-col min-w-0 relative">
         {/* Editor Toolbar */}
         <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex items-center gap-4">
               <div className="flex bg-slate-100 rounded-lg p-1">
                  {[
                    { id: 'text', icon: Type, label: 'Text' },
                    { id: 'text-image', icon: Layout, label: 'Image + Text' },
                    { id: 'two-column', icon: Columns, label: '2 Cols' },
                    { id: 'visual', icon: ImageIcon, label: 'Visual' },
                  ].map((layout) => (
                    <button 
                      key={layout.id}
                      onClick={() => updateSlide('layout', layout.id)}
                      title={layout.label}
                      className={cn(
                        "p-1.5 rounded-md transition-all",
                        currentSlide.layout === layout.id ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                       <layout.icon className="w-4 h-4" />
                    </button>
                  ))}
               </div>
               <div className="h-4 w-px bg-slate-200" />
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Last saved 2m ago</span>
            </div>
            
            <div className="flex items-center gap-3">
               <Button variant="ghost" className="text-slate-500 gap-2 h-9">
                  <Play className="w-4 h-4" /> Preview
               </Button>
               <Button className="bg-slate-900 text-white gap-2 h-9 hover:bg-slate-800">
                  <Download className="w-4 h-4" /> Export
               </Button>
            </div>
         </div>

         {/* Canvas Area */}
         <div className="flex-grow overflow-y-auto p-8 flex justify-center bg-[#F7F7FB]">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-slate-200 min-h-[600px] flex flex-col overflow-hidden relative group">
               {/* Slide Number Watermark */}
               <div className="absolute top-4 left-4 text-xs font-bold text-slate-200 select-none">
                  SLIDE {currentSlideId}
               </div>

               <div className="p-12 flex-grow flex flex-col">
                  {/* Title Input */}
                  <input 
                    className="text-4xl font-bold text-slate-900 placeholder:text-slate-300 border-none focus:ring-0 px-0 py-2 mb-6 bg-transparent w-full"
                    value={currentSlide.title}
                    onChange={(e) => updateSlide('title', e.target.value)}
                    placeholder="Slide Title..."
                  />
                  
                  {/* Content Area */}
                  <div className="flex-grow flex gap-8">
                     {/* Text Column */}
                     <div className={cn(
                        "flex-grow flex flex-col",
                        (currentSlide.layout === 'text-image' || currentSlide.layout === 'two-column') ? "w-1/2" : "w-full"
                     )}>
                        <Textarea 
                           className="flex-grow text-lg text-slate-600 leading-relaxed border-none focus:ring-0 p-0 resize-none bg-transparent placeholder:text-slate-300"
                           value={currentSlide.content}
                           onChange={(e) => updateSlide('content', e.target.value)}
                           placeholder="Start typing your bullet points..."
                        />
                     </div>

                     {/* Image/Secondary Column */}
                     {(currentSlide.layout !== 'text') && (
                        <div className={cn(
                           "flex-col gap-4",
                           (currentSlide.layout === 'text-image' || currentSlide.layout === 'two-column') ? "w-1/2 flex" : "hidden"
                        )}>
                           <div className="flex-grow bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all cursor-pointer group/upload">
                              <ImageIcon className="w-8 h-8 mb-2 text-slate-300 group-hover/upload:text-indigo-400" />
                              <span className="text-sm font-medium">Click to upload image</span>
                              <span className="text-xs opacity-70">or drag and drop</span>
                           </div>
                           
                           {/* AI Visual Idea Generator */}
                           <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 flex items-center justify-between">
                              <span className="text-xs font-bold text-indigo-700">Need a visual?</span>
                              <Button size="sm" variant="ghost" className="h-7 text-indigo-600 hover:bg-indigo-100 text-xs gap-1">
                                 <Sparkles className="w-3 h-3" /> Generate Idea
                              </Button>
                           </div>
                        </div>
                     )}
                  </div>
               </div>

               {/* AI Action Bar */}
               <div className="bg-slate-50 border-t border-slate-100 p-3 flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-600 gap-2 h-8 text-xs hover:text-indigo-600 hover:border-indigo-200">
                     <Wand2 className="w-3 h-3" /> Improve Wording
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-600 gap-2 h-8 text-xs hover:text-indigo-600 hover:border-indigo-200">
                     <RefreshCw className="w-3 h-3" /> Rewrite for Investors
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-600 gap-2 h-8 text-xs hover:text-indigo-600 hover:border-indigo-200">
                     <Maximize2 className="w-3 h-3" /> Expand Points
                  </Button>
               </div>
            </div>
         </div>
      </div>

      {/* 3. RIGHT PANEL: AI ASSISTANT */}
      <div className={cn(
         "w-80 bg-white border-l border-slate-200 flex flex-col flex-shrink-0 transition-all duration-300",
         !isAiPanelOpen && "w-0 opacity-0 overflow-hidden"
      )}>
         <div className="p-6 border-b border-slate-100 bg-slate-50/30">
            <div className="flex items-center gap-2 mb-1">
               <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                  <Sparkles className="w-3 h-3" />
               </div>
               <h3 className="font-bold text-slate-900">Deck Copilot</h3>
            </div>
            <p className="text-xs text-slate-500"> analyzing '{currentSlide.title}'...</p>
         </div>

         <div className="flex-grow overflow-y-auto p-6 space-y-6">
            
            {/* Helpful Insights */}
            <div className="space-y-3">
               <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Lightbulb className="w-3 h-3" /> Helpful Insights
               </h4>
               <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100">
                  <p className="text-xs text-blue-900 leading-relaxed font-medium">
                     Your problem statement is clear, but lacks quantification. Try adding a statistic about "disconnected fashion weeks".
                  </p>
               </div>
            </div>

            {/* Things to Improve */}
            <div className="space-y-3">
               <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" /> Improvements
               </h4>
               <div className="bg-amber-50/50 rounded-lg p-3 border border-amber-100">
                  <p className="text-xs text-amber-900 leading-relaxed font-medium mb-2">
                     The title "Problem" is generic.
                  </p>
                  <Button size="sm" variant="outline" className="w-full bg-white border-amber-200 text-amber-700 h-7 text-xs hover:bg-amber-50">
                     Rename to "The Disconnect"
                  </Button>
               </div>
            </div>

            {/* AI Suggestions */}
            <div className="space-y-3">
               <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Wand2 className="w-3 h-3" /> AI Suggestions
               </h4>
               
               <div className="space-y-2">
                  <div className="p-3 rounded-lg border border-purple-100 bg-purple-50/30 hover:bg-purple-50 transition-colors cursor-pointer group">
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-purple-700">Strengthen Narrative</span>
                        <Sparkles className="w-3 h-3 text-purple-400 group-hover:text-purple-600" />
                     </div>
                     <p className="text-xs text-slate-600 line-clamp-2">
                        Connect the "Problem" directly to the "Solution" using a bridge statement.
                     </p>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-purple-100 bg-purple-50/30 hover:bg-purple-50 transition-colors cursor-pointer group">
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-purple-700">Fix Formatting</span>
                        <Sparkles className="w-3 h-3 text-purple-400 group-hover:text-purple-600" />
                     </div>
                     <p className="text-xs text-slate-600 line-clamp-2">
                        Convert long paragraphs into punchy bullet points for better readability.
                     </p>
                  </div>
               </div>
            </div>

         </div>

         <div className="p-4 border-t border-slate-100 bg-slate-50/30">
            <Button className="w-full bg-indigo-600 text-white shadow-md shadow-indigo-900/10 hover:bg-indigo-700">
               Auto-Fix Slide
            </Button>
         </div>
      </div>
      
    </div>
  );
};
