import React from 'react';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  
  const handleNav = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-white pt-16 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900">Startup AI</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs mb-6">
              The operating system for modern startups. Build, launch, and scale with intelligence.
            </p>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors" />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('wizard')}>Pitch Deck</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('profile')}>Startup Profile Wizard</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('gtm')}>GTM Strategy</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('insights')}>Market Research</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('pricing')}>Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('blog')}>Blog</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('community')}>Community</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('help')}>Help Center</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('templates')}>Templates</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('about')}>About</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('how-it-works')}>How it Works</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('business-model')}>Business Model</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('careers')}>Careers</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('legal')}>Legal</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => handleNav('contact')}>Contact</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2024 Startup AI Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-600 cursor-pointer transition-colors" onClick={() => handleNav('legal')}>Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors" onClick={() => handleNav('legal')}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
