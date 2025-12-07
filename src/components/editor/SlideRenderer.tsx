import React, { useRef, useEffect } from 'react';
import { Slide } from './types';
import { cn } from '../ui/utils';
import { Button } from '../ui/button';
import { Image as ImageIcon, X, Bold, Italic, Link, List, ListOrdered, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell,
  ScatterChart, Scatter, ZAxis
} from 'recharts';

const getChartType = (slideType: string) => {
  const type = slideType?.toLowerCase() || '';
  if (type.includes('traction')) return 'line';
  if (type.includes('market')) return 'pie'; 
  if (type.includes('competition')) return 'matrix'; 
  if (type.includes('financial')) return 'bar';
  if (type.includes('ask') || type.includes('fund')) return 'pie';
  return null;
}

const DUMMY_DATA = {
  line: [
    { name: 'Q1', value: 400 },
    { name: 'Q2', value: 800 },
    { name: 'Q3', value: 1600 },
    { name: 'Q4', value: 3200 },
  ],
  bar: [
    { name: 'Year 1', value: 2.5 },
    { name: 'Year 2', value: 5.0 },
    { name: 'Year 3', value: 12.5 },
  ],
  pie: [
    { name: 'Product', value: 40 },
    { name: 'Sales', value: 35 },
    { name: 'Ops', value: 25 },
  ],
  matrix: [
    { x: 20, y: 30, z: 200, name: 'Others' },
    { x: 40, y: 60, z: 200, name: 'Incumbents' },
    { x: 90, y: 90, z: 500, name: 'Us' },
  ]
};

const COLORS = ['#F97316', '#3B82F6', '#10B981', '#F43F5E'];

interface SlideRendererProps {
  slide: Slide;
  onChange: (updates: Partial<Slide>) => void;
  isActive: boolean;
  onTriggerImageModal?: () => void;
  templateId?: string;
}

const TEMPLATE_STYLES: Record<string, any> = {
  'startup': { bg: 'bg-white', title: 'text-slate-900 font-bold', text: 'text-slate-600', marker: 'bg-[#F97316]' },
  'minimal-dark': { bg: 'bg-slate-900', title: 'text-white font-light tracking-tight', text: 'text-slate-300', marker: 'bg-blue-500' },
  'classic-clean': { bg: 'bg-white', title: 'text-slate-800 font-serif', text: 'text-slate-700', marker: 'bg-slate-800' },
  'vibrant-bold': { bg: 'bg-yellow-50', title: 'text-black font-black uppercase', text: 'text-black', marker: 'bg-black' },
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, onChange, isActive, onTriggerImageModal, templateId = 'startup' }) => {
  // We use this to auto-resize textareas
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
    }
    contentRefs.current.forEach(ref => {
      if (ref) {
        ref.style.height = 'auto';
        ref.style.height = ref.scrollHeight + 'px';
      }
    });
  }, [slide.title, slide.content]);

  const handleContentChange = (index: number, value: string) => {
    const newContent = [...slide.content];
    newContent[index] = value;
    onChange({ content: newContent });
  };

  const addBulletPoint = () => {
    onChange({ content: [...slide.content, ''] });
  };

  const removeBulletPoint = (index: number) => {
    if (slide.content.length <= 1) return;
    const newContent = slide.content.filter((_, i) => i !== index);
    onChange({ content: newContent });
  };

  const layout = slide.layout || 'default';
  const theme = TEMPLATE_STYLES[templateId] || TEMPLATE_STYLES['startup'];
  
  // Define layout classes
  const getContentClasses = () => {
    switch (layout) {
      case 'image-left':
        return 'flex-col md:flex-row-reverse';
      case 'image-right':
        return 'flex-col md:flex-row'; // Default
      case 'grid':
        return 'grid md:grid-cols-2 gap-8';
      default:
        return 'flex-col md:flex-row';
    }
  };

  return (
    <div className={cn("w-full h-full rounded-lg shadow-sm border border-slate-100 p-8 md:p-12 flex flex-col relative group transition-colors duration-500", theme.bg)}>
      
      {/* Slide Type Pill */}
      <div className="absolute top-6 left-8 md:left-12">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 px-2 py-1 rounded border border-current">
          {slide.type}
        </span>
      </div>

      {/* Formatting Toolbar (Visible on Hover/Focus - Simplified) */}
      <div className="absolute top-4 right-8 md:right-12 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white shadow-sm border border-slate-200 rounded-md p-1 z-20">
         <Button variant="ghost" size="icon" className="h-6 w-6"><Bold className="w-3 h-3 text-slate-700" /></Button>
         <Button variant="ghost" size="icon" className="h-6 w-6"><Italic className="w-3 h-3 text-slate-700" /></Button>
         <div className="w-[1px] h-3 bg-slate-200 mx-1" />
         <Button variant="ghost" size="icon" className="h-6 w-6"><List className="w-3 h-3 text-slate-700" /></Button>
      </div>

      {/* Main Content Area */}
      <div className="mt-8 flex-grow flex flex-col gap-6">
        
        {/* Title */}
        <Textarea
          ref={titleRef}
          value={slide.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className={cn("text-4xl border-none p-0 focus-visible:ring-0 resize-none bg-transparent overflow-hidden placeholder:opacity-30 min-h-[50px] leading-tight", theme.title)}
          placeholder="Slide Title"
          rows={1}
        />

        <div className={cn("flex gap-8 flex-grow", getContentClasses())}>
          {/* Bullet Points */}
          <div className="flex-1 space-y-4">
            {slide.content.map((point, idx) => (
              <div key={idx} className="flex gap-3 group/bullet">
                <div className="pt-2.5">
                  <div className={cn("w-1.5 h-1.5 rounded-full", theme.marker)} />
                </div>
                <div className="flex-grow relative">
                  <Textarea
                    ref={el => contentRefs.current[idx] = el}
                    value={point}
                    onChange={(e) => handleContentChange(idx, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addBulletPoint();
                      }
                      if (e.key === 'Backspace' && point === '') {
                        e.preventDefault();
                        removeBulletPoint(idx);
                      }
                    }}
                    className={cn("text-lg border-none p-0 focus-visible:ring-0 resize-none bg-transparent overflow-hidden min-h-[32px] leading-relaxed w-full placeholder:opacity-30", theme.text)}
                    rows={1}
                    placeholder="Type your point..."
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-8 top-0 opacity-0 group-hover/bullet:opacity-100 h-6 w-6 text-slate-300 hover:text-red-500"
                    onClick={() => removeBulletPoint(idx)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
            <div 
              className="text-sm text-slate-400 font-medium cursor-pointer hover:text-[#F97316] pl-5 mt-2 transition-colors"
              onClick={addBulletPoint}
            >
              + Add point
            </div>
          </div>

          {/* Visual Block (Image or Chart) */}
          <div className={cn("w-full md:w-1/3 flex-shrink-0", layout === 'grid' ? "md:w-full" : "")}>
             {getChartType(slide.type) ? (
                <div className="aspect-[4/3] rounded-lg border border-slate-200 bg-white p-4 relative group/chart shadow-sm">
                  <div className="w-full h-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      {(() => {
                        const type = getChartType(slide.type);
                        switch(type) {
                          case 'line':
                            return (
                              <LineChart data={DUMMY_DATA.line}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} tick={{fill: '#64748b'}} />
                                <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{fill: '#64748b'}} />
                                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Line type="monotone" dataKey="value" stroke={COLORS[0]} strokeWidth={3} dot={{r: 4, fill: COLORS[0], strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                              </LineChart>
                            );
                          case 'bar':
                            return (
                              <BarChart data={DUMMY_DATA.bar}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} tick={{fill: '#64748b'}} />
                                <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{fill: '#64748b'}} />
                                <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Bar dataKey="value" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
                              </BarChart>
                            );
                          case 'pie':
                            return (
                              <PieChart>
                                <Pie data={DUMMY_DATA.pie} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                                  {DUMMY_DATA.pie.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                              </PieChart>
                            );
                          case 'matrix':
                            return (
                              <ScatterChart>
                                <CartesianGrid stroke="#e2e8f0" />
                                <XAxis type="number" dataKey="x" name="Vision" unit="%" fontSize={10} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                                <YAxis type="number" dataKey="y" name="Ability" unit="%" fontSize={10} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                                <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Scatter name="Competitors" data={DUMMY_DATA.matrix} fill={COLORS[2]}>
                                   {DUMMY_DATA.matrix.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={index === 2 ? COLORS[0] : '#94a3b8'} />
                                   ))}
                                </Scatter>
                              </ScatterChart>
                            );
                          default: return <div />;
                        }
                      })()}
                    </ResponsiveContainer>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover/chart:opacity-100 transition-opacity z-10">
                     <div className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-medium text-slate-500 border border-slate-200 shadow-sm">
                        {slide.type} Chart
                     </div>
                  </div>
                </div>
             ) : slide.imageUrl ? (
               <div className="relative aspect-[4/3] rounded-lg overflow-hidden group/image">
                 <img src={slide.imageUrl} alt="Slide Visual" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => onChange({ imageUrl: undefined })}>Remove</Button>
                 </div>
               </div>
             ) : (
               <div 
                  className="aspect-[4/3] rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 gap-2 cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-all"
                  onClick={() => onTriggerImageModal ? onTriggerImageModal() : onChange({ imageUrl: 'https://source.unsplash.com/random/800x600?business' })}
               >
                  <ImageIcon className="w-8 h-8 opacity-50" />
                  <span className="text-xs font-semibold">Add Image</span>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
