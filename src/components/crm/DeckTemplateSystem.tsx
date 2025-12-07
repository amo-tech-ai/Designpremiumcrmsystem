import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { LayoutTemplate, Palette, Type, ChevronRight, Wand2, RefreshCw } from "lucide-react";
import { cn } from "../ui/utils";
import { Toaster, toast } from "sonner@2.0.3";

import { TEMPLATES, Template } from './templates/types';
import { TemplateCard } from './templates/TemplateCard';
import { PreviewFrame } from './templates/PreviewFrame';

export interface DeckTemplateSystemProps {
  value?: string;
  onChange?: (id: string) => void;
}

export const DeckTemplateSystem: React.FC<DeckTemplateSystemProps> = ({ 
  value, 
  onChange 
}) => {
  const [activeTab, setActiveTab] = useState("templates");
  // Use prop value if available, otherwise default to 'minimal-dark'
  const [internalId, setInternalId] = useState('minimal-dark');
  const selectedTemplateId = value || internalId;
  
  // Customization State (for Configuration tab)
  const [customColors, setCustomColors] = useState<Template['colors'] | undefined>(undefined);
  const [customFonts, setCustomFonts] = useState<Template['fonts'] | undefined>(undefined);
  const [isResetting, setIsResetting] = useState(false);

  // Derived State
  const selectedTemplate = TEMPLATES.find(t => t.id === selectedTemplateId) || TEMPLATES[0];

  // Reset custom settings when switching templates (optional behavior, can be changed)
  useEffect(() => {
    setCustomColors(undefined);
    setCustomFonts(undefined);
  }, [selectedTemplateId]);

  const handleSelectTemplate = (id: string) => {
    if (onChange) {
      onChange(id);
    } else {
      setInternalId(id);
    }
    // Analytics Log
    console.log("Analytics: template_selected", { templateId: id });
    
    // Optional: Auto-switch to config or just show toast
    // setActiveTab("configuration"); 
    toast.success(`Selected ${TEMPLATES.find(t => t.id === id)?.name}`);
  };

  const handleApplyTheme = () => {
    toast.success("Theme configuration applied successfully");
    // In a real app, this would persist the custom theme settings
  };

  const handleResetTheme = () => {
    setIsResetting(true);
    setTimeout(() => {
      setCustomColors(undefined);
      setCustomFonts(undefined);
      setIsResetting(false);
      toast.info("Theme reset to default");
    }, 500);
  };

  return (
    <div className="w-full h-full">
        {/* Main Content Area */}
        <div className="flex flex-col gap-8">
            
            {/* Header Text */}
            <div className="text-center max-w-2xl mx-auto mb-4">
               <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Choose your style</h2>
               <p className="text-slate-500 text-lg">
                  Select a starting point for your deck. You can fully customize colors, fonts, and layouts later in the editor.
               </p>
            </div>

            <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              
              {/* Tabs Navigation */}
              <div className="flex items-center justify-center">
                <TabsList className="bg-white p-1 rounded-full border border-slate-200 shadow-sm">
                  <TabsTrigger 
                    value="templates"
                    className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 text-slate-500"
                  >
                    All Templates
                  </TabsTrigger>
                  <TabsTrigger 
                    value="configuration"
                    className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 text-slate-500"
                  >
                    Customize & Preview
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Templates Grid */}
              <TabsContent value="templates" className="outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {TEMPLATES.map((template) => (
                      <TemplateCard 
                        key={template.id} 
                        template={template}
                        isSelected={selectedTemplateId === template.id}
                        onSelect={handleSelectTemplate}
                      />
                    ))}
                 </div>
              </TabsContent>

              {/* Configuration Panel */}
              <TabsContent value="configuration" className="outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                   
                   {/* Left Column: Settings */}
                   <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
                      <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                         <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                   <Palette className="w-4 h-4 text-slate-500" />
                                   Theme Settings
                                </CardTitle>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={handleResetTheme}
                                  className={cn("h-7 w-7 text-slate-400 hover:text-slate-700", isResetting && "animate-spin")}
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                         </CardHeader>
                         <CardContent className="space-y-6 pt-6">
                            
                            {/* Template Selection (Quick Switch) */}
                            <div className="space-y-3">
                               <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Base Template</Label>
                               <Select value={selectedTemplateId} onValueChange={handleSelectTemplate}>
                                  <SelectTrigger className="w-full bg-slate-50 border-slate-200 focus:ring-indigo-500/20">
                                     <SelectValue placeholder="Select a template" />
                                  </SelectTrigger>
                                  <SelectContent>
                                     {TEMPLATES.map(t => (
                                        <SelectItem key={t.id} value={t.id}>
                                          <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                                            {t.name}
                                          </div>
                                        </SelectItem>
                                     ))}
                                  </SelectContent>
                               </Select>
                            </div>

                            {/* Colors */}
                            <div className="space-y-3">
                               <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Brand Colors</Label>
                               <div className="grid grid-cols-1 gap-3">
                                  {Object.entries(customColors || selectedTemplate.colors).map(([key, value]) => (
                                    <div key={key} className="flex items-center gap-3 p-2 rounded-lg border border-slate-100 hover:border-slate-300 transition-colors bg-white group">
                                       <div 
                                          className="w-10 h-10 rounded-md border border-slate-200 shadow-sm flex-shrink-0 cursor-pointer" 
                                          style={{ backgroundColor: value }}
                                       ></div>
                                       <div className="flex flex-col flex-grow">
                                          <span className="text-xs font-semibold text-slate-700 capitalize">{key}</span>
                                          <span className="text-[10px] text-slate-400 font-mono">{value}</span>
                                       </div>
                                       <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                                          <Wand2 className="w-3 h-3" />
                                       </Button>
                                    </div>
                                  ))}
                               </div>
                            </div>

                            {/* Typography */}
                            <div className="space-y-3">
                               <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Typography</Label>
                               <div className="space-y-3">
                                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-300 transition-colors cursor-pointer">
                                     <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                                            <span className="font-serif font-bold text-sm">Ag</span>
                                        </div>
                                        <div>
                                           <p className="text-xs font-medium text-slate-700">Headings</p>
                                           <p className="text-[10px] text-slate-400">{(customFonts || selectedTemplate.fonts).heading}</p>
                                        </div>
                                     </div>
                                  </div>
                                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-300 transition-colors cursor-pointer">
                                     <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                                            <span className="font-sans text-sm">Aa</span>
                                        </div>
                                        <div>
                                           <p className="text-xs font-medium text-slate-700">Body Text</p>
                                           <p className="text-[10px] text-slate-400">{(customFonts || selectedTemplate.fonts).body}</p>
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            </div>

                         </CardContent>
                         <CardFooter className="pt-2 pb-6 border-t border-slate-100 bg-slate-50/30">
                            <Button 
                              className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200/50"
                              onClick={handleApplyTheme}
                            >
                               Apply Changes
                            </Button>
                         </CardFooter>
                      </Card>
                   </div>

                   {/* Right Column: Preview */}
                   <div className="lg:col-span-8 order-1 lg:order-2 sticky top-24">
                       <PreviewFrame 
                          template={selectedTemplate}
                          customColors={customColors}
                          customFonts={customFonts}
                       />
                       
                       {/* Quick Actions / Tips */}
                       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                             <h4 className="font-semibold text-sm mb-1 text-slate-900">Auto-Layout</h4>
                             <p className="text-xs text-slate-500">Content automatically adjusts to fit the selected template's grid system.</p>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                             <h4 className="font-semibold text-sm mb-1 text-slate-900">Smart Colors</h4>
                             <p className="text-xs text-slate-500">We check contrast ratios to ensure your text is always readable.</p>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                             <h4 className="font-semibold text-sm mb-1 text-slate-900">Brand Safe</h4>
                             <p className="text-xs text-slate-500">Lock specific colors or fonts to enforce brand guidelines across the deck.</p>
                          </div>
                       </div>
                   </div>
                </div>
              </TabsContent>

            </Tabs>
        </div>
    </div>
  );
};
