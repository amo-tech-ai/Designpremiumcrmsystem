import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Footer } from './Footer';

interface StandardPageProps {
  title: string;
  subtitle?: string;
  onNavigate: (view: string) => void;
  children?: React.ReactNode;
  currentView?: string;
}

export const StandardPage: React.FC<StandardPageProps> = ({ title, subtitle, onNavigate, children, currentView }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 h-16 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => onNavigate('landing-v2')}>
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Button>
                <div className="font-bold text-xl text-slate-900">FounderAI</div>
            </div>
            <div className="flex gap-4">
                 <Button onClick={() => onNavigate('dashboard')}>Log In</Button>
            </div>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 min-h-[60vh]">
        <div className="max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{title}</h1>
                {subtitle && <p className="text-xl text-slate-500 mb-12">{subtitle}</p>}
                
                {children || (
                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-600 mb-6">
                            This is a placeholder page for <strong>{title}</strong>. In a production application, this page would contain detailed content relevant to the section.
                        </p>
                        <p className="text-slate-600 mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p className="text-slate-600 mb-4">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <div className="h-64 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 mt-8">
                            Content Placeholder
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} currentView={currentView} />
    </div>
  );
};