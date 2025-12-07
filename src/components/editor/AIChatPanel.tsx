import React, { useState, useRef, useEffect } from 'react';
import { Slide } from './types';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Wand2,
  ChevronRight,
  Type,
  ListPlus,
  Layout,
  Image as ImageIcon,
  Check,
  Maximize2,
  Minimize2,
  BarChart,
  Loader2,
  Globe,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { cn } from '../ui/utils';
import { toast } from 'sonner@2.0.3';
import { Textarea } from '../ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog";
import { 
  rewriteSlide, 
  analyzeSlideAI, 
  researchTopic, 
  chatWithSlide 
} from '../../services/edgeFunctions';

interface AIChatPanelProps {
  currentSlide: Slide;
  onUpdateSlide: (updates: Partial<Slide>) => void;
  onAddSlide: (slide?: Partial<Slide>) => void;
  onClose: () => void;
}

interface ChatAction {
  id: string;
  label: string;
  type: 'update_title' | 'update_content' | 'replace_slide';
  payload: Partial<Slide>;
}

interface ResearchData {
  tam: string;
  sam: string;
  som: string;
  cagr: string;
  sources: { url: string; title: string }[];
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  actions?: ChatAction[];
  researchData?: ResearchData;
  isTyping?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'ai',
    content: "Hi! I'm your Gemini 3 copilot. I can help you refine your pitch deck. Try asking me to rewrite this slide or add better bullet points.",
    timestamp: new Date(Date.now() - 60000),
  }
];

export const AIChatPanel: React.FC<AIChatPanelProps> = ({ currentSlide, onUpdateSlide, onAddSlide, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  
  // Preview Modal State
  const [previewData, setPreviewData] = useState<{ title?: string; content?: string[]; explanation?: string } | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Analysis State
  const [analysis, setAnalysis] = useState<{ score: number; suggestions: string[] } | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  // Automatic Slide Analysis on Slide Change
  useEffect(() => {
    const analyzeCurrentSlide = async () => {
      // Don't analyze empty slides or title slides to save tokens/time if preferred, 
      // but for now we analyze everything.
      if (!currentSlide.content || currentSlide.content.length === 0) return;

      try {
        const res = await analyzeSlideAI({
          action: 'analyze',
          slideId: currentSlide.id,
          slideContent: currentSlide.content
        });

        if (res) {
          setAnalysis(res);
        }
      } catch (error) {
        console.error("Auto-analysis failed", error);
      }
    };

    // Debounce or just run on ID change
    analyzeCurrentSlide();
  }, [currentSlide.id]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await chatWithSlide({
        action: 'chat',
        message: userMsg.content,
        slideTitle: currentSlide.title,
        slideContent: currentSlide.content,
        slideType: currentSlide.type,
      });

      if (res && res.result) {
        const aiResponse: Message = {
          id: Date.now().toString(),
          role: 'ai',
          content: res.result.reply || "I'm not sure how to respond to that.",
          timestamp: new Date(),
          actions: res.result.suggestedAction ? [{
            id: `act-${Date.now()}`,
            label: "Apply Suggestion",
            type: res.result.suggestedAction.type as any,
            payload: res.result.suggestedAction.payload
          }] : undefined
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      toast.error("Failed to get AI response");
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'ai',
        content: "Sorry, I encountered an error processing your request.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleApplyPreview = () => {
    if (!previewData) return;
    
    onUpdateSlide({
      title: previewData.title || currentSlide.title,
      content: previewData.content || currentSlide.content
    });
    
    toast.success("Changes applied successfully");
    setIsPreviewOpen(false);
    setPreviewData(null);
  };

  const executeAIAction = async (action: string) => {
    if (loadingAction) return; // Prevent double clicks
    setLoadingAction(action);
    setIsTyping(true); // Show typing in chat too? Maybe just spinner on button.

    try {
      let res;
      
      if (action === 'research') {
        const topic = currentSlide.title || "Target Market";
        
        // Add a user message to show context
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'user',
          content: `Research market size (TAM/SAM/SOM) for: ${topic}`,
          timestamp: new Date()
        }]);

        const result = await researchTopic({
          query: `Research market size (TAM/SAM/SOM) for: ${topic}`,
          slideType: currentSlide.type
        });

        // Parse result.content to extract TAM/SAM/SOM if possible, or just display content
        // For now, assuming the edge function returns structured text we can display.
        // Or if the edge function returns a structured object, we might need to adjust.
        // The service interface says returns { content, citations }.
        
        // Mock parsing for the UI structure or use the content directly
        if (result && result.content) {
             // Try to parse JSON from content if the LLM returned JSON string
             let researchData: ResearchData | undefined;
             try {
                // This is optimistic, depends on backend
                const parsed = JSON.parse(result.content);
                if (parsed.tam) researchData = { ...parsed, sources: result.citations };
             } catch (e) {
                // Fallback: create a dummy data structure or just show content in chat
             }

             if (researchData) {
                setMessages(prev => [...prev, {
                  id: Date.now().toString(),
                  role: 'ai',
                  content: `I've found some market data for **${topic}**.`,
                  timestamp: new Date(),
                  researchData: researchData
                }]);
             } else {
                 setMessages(prev => [...prev, {
                  id: Date.now().toString(),
                  role: 'ai',
                  content: result.content + "\n\n**Sources:**\n" + result.citations.map(c => `- ${c.title}: ${c.url}`).join('\n'),
                  timestamp: new Date()
                 }]);
             }

        } else {
           toast.error("Research failed to return data");
        }
      } else if (action === 'add-metrics') {
         // Special case using chat to ask for metrics
         res = await chatWithSlide({
           action: 'chat',
           message: "Add relevant placeholder metrics/data points to this slide's content to make it more convincing. Return a suggestedAction with type update_content.",
           slideTitle: currentSlide.title,
           slideContent: currentSlide.content,
           slideType: currentSlide.type
         });
         
         if (res.success && res.result.suggestedAction) {
           setPreviewData({
             content: res.result.suggestedAction.payload.content,
             explanation: res.result.reply
           });
           setIsPreviewOpen(true);
         } else {
           toast.error("Could not generate metrics.");
         }

      } else if (action === 'rewrite') {
        // Use rewriteSlide
        const rewriteRes = await rewriteSlide({
          slideId: currentSlide.id,
          action: 'rewrite',
          prompt: "Improve this slide to be more investor-focused and concise.",
          currentContent: { title: currentSlide.title, content: currentSlide.content }
        });
        
        // rewriteRes returns { title, content, bullets }
        // Map to preview data
        setPreviewData({
          title: rewriteRes.title,
          content: rewriteRes.bullets || rewriteRes.content as any,
          explanation: "Here is a rewritten version of your slide."
        });
        setIsPreviewOpen(true);

      } else {
        // Other actions like expand, shorten
        res = await chatWithSlide({
          action: action as any,
          slideTitle: currentSlide.title,
          slideContent: currentSlide.content,
          slideType: currentSlide.type
        });

        if (res.success && res.result) {
           setPreviewData({
             title: res.result.title,
             content: res.result.content,
             explanation: res.result.reply
           });
           setIsPreviewOpen(true);
        }
      }

    } catch (error) {
      console.error(error);
      toast.error(`Action ${action} failed`);
    } finally {
      setLoadingAction(null);
      setIsTyping(false);
    }
  };

  const QuickAction = ({ label, prompt }: { label: string, prompt: string }) => (
    <Button 
      variant="outline" 
      size="sm" 
      className="text-xs h-7 bg-white/50 hover:bg-white text-slate-600 border-slate-200"
      onClick={() => {
        setInputValue(prompt);
      }}
    >
      {label}
    </Button>
  );

  const ActionButton = ({ icon: Icon, label, action }: { icon: any, label: string, action: string }) => {
    const isLoading = loadingAction === action;
    
    return (
     <Tooltip>
        <TooltipTrigger asChild>
           <Button 
             variant="ghost" 
             size="sm"
             disabled={!!loadingAction}
             className={cn(
               "h-8 px-3 rounded-full text-xs font-medium border transition-all flex-shrink-0 gap-1.5",
               isLoading 
                  ? "bg-violet-50 border-violet-200 text-violet-700" 
                  : "bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
             )}
             onClick={() => executeAIAction(action)}
           >
              {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Icon className="w-3.5 h-3.5" />}
              {label}
           </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
           {label}
        </TooltipContent>
     </Tooltip>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
      <TooltipProvider>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            AI Chat
            <Sparkles className="w-3 h-3 text-[#F97316]" />
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-[10px] text-slate-400">Gemini 3 Copilot</p>
            {analysis && (
              <span className={cn(
                "text-[9px] px-1.5 py-0.5 rounded-full border",
                analysis.score > 70 ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"
              )}>
                Score: {analysis.score}
              </span>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400" onClick={onClose}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4 pb-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex gap-3 max-w-[90%]",
                msg.role === 'user' ? "self-end flex-row-reverse" : "self-start"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1",
                msg.role === 'ai' ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-600"
              )}>
                {msg.role === 'ai' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>
              
              <div className="space-y-2">
                <div className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.role === 'user' 
                    ? "bg-[#F1F5F9] text-slate-800 rounded-tr-sm" 
                    : "bg-white text-slate-700 border border-slate-100 rounded-tl-sm"
                )}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {/* Research Card */}
                  {msg.researchData && (
                    <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                       <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-slate-100/50">
                          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-indigo-500" />
                            Market Research
                          </span>
                       </div>
                       <div className="p-3 space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                             <div className="p-2 bg-white rounded border border-slate-200">
                                <div className="text-[10px] text-slate-400 font-bold uppercase">TAM</div>
                                <div className="text-sm font-bold text-slate-900">{msg.researchData.tam}</div>
                             </div>
                             <div className="p-2 bg-white rounded border border-slate-200">
                                <div className="text-[10px] text-slate-400 font-bold uppercase">SAM</div>
                                <div className="text-sm font-bold text-slate-900">{msg.researchData.sam}</div>
                             </div>
                             <div className="p-2 bg-white rounded border border-slate-200">
                                <div className="text-[10px] text-slate-400 font-bold uppercase">SOM</div>
                                <div className="text-sm font-bold text-slate-900">{msg.researchData.som}</div>
                             </div>
                             <div className="p-2 bg-white rounded border border-slate-200">
                                <div className="text-[10px] text-slate-400 font-bold uppercase">CAGR</div>
                                <div className="text-sm font-bold text-slate-900">{msg.researchData.cagr}</div>
                             </div>
                          </div>
                          
                          {msg.researchData.sources && msg.researchData.sources.length > 0 && (
                            <div className="space-y-1">
                               <div className="text-[10px] font-semibold text-slate-500">Sources</div>
                               {msg.researchData.sources.map((source, idx) => (
                                 <a key={idx} href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-indigo-600 hover:underline truncate">
                                   <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                   <span className="truncate">{source.title || source.url}</span>
                                 </a>
                               ))}
                            </div>
                          )}

                          <Button 
                             size="sm" 
                             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8"
                             onClick={() => {
                               if (!msg.researchData) return;
                               const bullets = [
                                 `TAM (Total Addressable Market): ${msg.researchData.tam}`,
                                 `SAM (Serviceable Available Market): ${msg.researchData.sam}`,
                                 `SOM (Serviceable Obtainable Market): ${msg.researchData.som}`,
                                 `CAGR: ${msg.researchData.cagr}`
                               ];
                               const footnotes = msg.researchData.sources.map((s, i) => `[${i+1}] ${s.title} - ${s.url}`).join('\n');
                               
                               onUpdateSlide({
                                 content: bullets,
                                 notes: (currentSlide.notes || '') + '\n\nSources:\n' + footnotes
                               });
                               toast.success("Inserted market data into slide");
                             }}
                          >
                             Insert into Slide
                             <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Button>
                       </div>
                    </div>
                  )}
                </div>
                
                {msg.actions && msg.actions.length > 0 && (
                   <div className="flex gap-2">
                      {msg.actions.map(action => (
                         <Button 
                           key={action.id}
                           size="sm"
                           variant="outline"
                           className="h-7 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                           onClick={() => {
                             onUpdateSlide(action.payload);
                             toast.success(`Applied: ${action.label}`);
                           }}
                         >
                           <Check className="w-3 h-3 mr-1" />
                           {action.label}
                         </Button>
                      ))}
                   </div>
                )}
                
                <span className="text-[10px] text-slate-300 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 self-start max-w-[80%]">
               <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-1">
                 <Bot className="w-3.5 h-3.5" />
               </div>
               <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                 <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                 <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                 <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none border-t border-slate-50">
        <QuickAction label="Fix Grammar" prompt="Fix any grammar or spelling errors in this slide." />
        <QuickAction label="Make Punchier" prompt="Make the bullet points more punchy and active." />
        <QuickAction label="Add Data" prompt="Suggest some placeholder data points for this slide." />
      </div>

      {/* Input & Action Bar Container */}
      <div className="bg-white border-t border-slate-100 pb-2">
         {/* Input Area */}
         <div className="p-4 pb-2">
           <div className="relative shadow-sm rounded-xl">
             <Textarea
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Ask AI to improve this slide..."
               className="min-h-[44px] max-h-[120px] pr-10 resize-none py-3 text-sm border-slate-200 focus:border-indigo-300 focus:ring-indigo-100"
             />
             <Button 
               size="icon" 
               className={cn(
                 "absolute right-1.5 bottom-1.5 h-8 w-8 transition-colors",
                 inputValue.trim() ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-slate-100 text-slate-400"
               )}
               onClick={handleSendMessage}
               disabled={!inputValue.trim()}
             >
               <Send className="w-3.5 h-3.5" />
             </Button>
           </div>
         </div>

         {/* AI Action Bar */}
         <div className="px-4 pb-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Actions</h4>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
               <ActionButton icon={Wand2} label="Rewrite" action="rewrite" />
               <ActionButton icon={Maximize2} label="Expand" action="expand" />
               <ActionButton icon={Minimize2} label="Shorten" action="shorten" />
               <ActionButton icon={BarChart} label="Metrics" action="add-metrics" />
               <ActionButton icon={Globe} label="Research" action="research" />
            </div>
         </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review AI Suggestions</DialogTitle>
            <DialogDescription>
               {previewData?.explanation || "Here is the improved version of your slide content."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {previewData?.title && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500 uppercase">New Title</label>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-md text-sm font-semibold">
                  {previewData.title}
                </div>
              </div>
            )}
            
            {previewData?.content && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500 uppercase">New Content</label>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-md text-sm space-y-1">
                  {previewData.content.map((point, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-slate-400">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Discard</Button>
            <Button onClick={handleApplyPreview} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Apply Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      </TooltipProvider>
    </div>
  );
};