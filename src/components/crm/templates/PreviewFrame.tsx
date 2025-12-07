import React from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { Button } from "../../ui/button";
import { cn } from "../../ui/utils";
import { Template } from './types';
import { MotionConfig, motion } from "motion/react";

interface PreviewFrameProps {
  template: Template;
  customColors?: Template['colors']; // Allow override for live editing
  customFonts?: Template['fonts'];
}

export const PreviewFrame: React.FC<PreviewFrameProps> = ({ 
  template,
  customColors,
  customFonts
}) => {
  const colors = customColors || template.colors;
  const fonts = customFonts || template.fonts;

  // Simulate font application by style (in a real app, we'd load the font faces)
  const headingStyle = { fontFamily: fonts.heading, color: colors.primary };
  const bodyStyle = { fontFamily: fonts.body, color: colors.text };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-medium text-slate-500">Live Preview</h3>
        <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
           <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md bg-white shadow-sm text-slate-900 hover:bg-white">
              <Monitor className="w-3.5 h-3.5" />
           </Button>
           <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-200/50">
              <Tablet className="w-3.5 h-3.5" />
           </Button>
           <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-200/50">
              <Smartphone className="w-3.5 h-3.5" />
           </Button>
        </div>
      </div>

      <div className="relative w-full aspect-video rounded-xl shadow-2xl shadow-slate-200/70 border border-slate-200/60 overflow-hidden transition-all duration-500 group">
         {/* Live Slide Preview */}
         <div 
           className="absolute inset-0 transition-colors duration-500 ease-in-out p-8 md:p-12 lg:p-16 flex flex-col justify-center"
           style={{ backgroundColor: colors.background }}
         >
             {/* Decorative Elements */}
             <div 
               className="absolute top-0 right-0 w-1/2 h-full opacity-10 transform -skew-x-12 translate-x-1/4"
               style={{ backgroundColor: colors.accent }}
             />
             <div 
               className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10 blur-3xl"
               style={{ backgroundColor: colors.primary }}
             />

             {/* Slide Content */}
             <div className="relative z-10 max-w-2xl space-y-6">
                <div className="flex items-center gap-3 opacity-80">
                   <div 
                     className="w-6 h-6 rounded" 
                     style={{ backgroundColor: colors.accent }}
                   />
                   <span 
                     className="text-xs font-bold tracking-widest uppercase"
                     style={{ color: colors.text, fontFamily: fonts.body }}
                   >
                     Startup AI
                   </span>
                </div>

                <motion.h1 
                  key={template.id + "-title"} // Trigger animation on change
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl md:text-5xl font-bold leading-tight"
                  style={headingStyle}
                >
                  Reinventing the way <br/>
                  <span style={{ color: colors.accent }}>teams build products.</span>
                </motion.h1>

                <motion.p 
                  key={template.id + "-desc"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-lg md:text-xl opacity-80 max-w-lg leading-relaxed"
                  style={bodyStyle}
                >
                  Our platform enables cross-functional teams to iterate faster, communicate better, and ship higher quality software.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                   <Button 
                     className="h-12 px-8 rounded-full font-medium transition-transform hover:scale-105"
                     style={{ 
                       backgroundColor: colors.primary, 
                       color: colors.background === '#ffffff' ? '#ffffff' : colors.background 
                     }}
                   >
                     Get Started
                   </Button>
                   <Button 
                     variant="outline"
                     className="h-12 px-8 rounded-full font-medium bg-transparent border-2 hover:bg-black/5"
                     style={{ 
                       borderColor: colors.text, 
                       color: colors.text 
                     }}
                   >
                     Learn More
                   </Button>
                </motion.div>
             </div>
         </div>

         {/* Interactive Overlay */}
         <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/5 transition-colors duration-300 pointer-events-none group-hover:pointer-events-auto flex items-end justify-end p-6">
             <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm text-slate-600 border border-slate-200">
                  Preview Mode
                </span>
             </div>
         </div>
      </div>
      
      <p className="text-center text-xs text-slate-400 font-medium">
         Showing preview for <span className="text-slate-700">{template.name}</span>
      </p>
    </div>
  );
};
