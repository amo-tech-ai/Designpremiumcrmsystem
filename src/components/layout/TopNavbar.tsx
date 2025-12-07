import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bell, 
  Menu, 
  X, 
  Home, 
  LayoutDashboard, 
  Presentation, 
  Users, 
  Rocket, 
  Settings,
  LogOut,
  ChevronDown,
  LayoutGrid,
  Sparkles
} from 'lucide-react';
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { cn } from "../ui/utils";
import { Badge } from "../ui/badge";

import { ProfileDropdown } from "../ProfileDropdown";

interface TopNavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  showNavLinks?: boolean;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ currentView, onNavigate, showNavLinks = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { id: 'landing-v2', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wizard', label: 'Pitch Decks', icon: Presentation },
    { id: 'pipeline', label: 'CRM', icon: Users },
    { id: 'gtm', label: 'GTM', icon: Rocket },
    { id: 'lean-canvas', label: 'Canvas', icon: LayoutGrid, badge: 'AI' },
  ];

  const handleNav = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            
            {/* Left: Logo & Product Name */}
            <div className="flex items-center gap-3 md:gap-8">
              <div 
                className={cn(
                  "flex items-center gap-2 cursor-pointer",
                  !showNavLinks && "md:hidden"
                )}
                onClick={() => handleNav('landing-v2')}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-900 hidden sm:block">
                  StartupAI
                </span>
              </div>

              {/* Desktop Navigation Links */}
              {showNavLinks && (
                <div className="hidden md:flex items-center space-x-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNav(link.id)}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 group relative",
                        currentView === link.id 
                          ? "text-indigo-600 bg-indigo-50" 
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      {link.label}
                      {link.badge && (
                        <Badge variant="secondary" className="h-4 px-1 text-[10px] bg-indigo-100 text-indigo-700 border-0">
                          {link.badge}
                        </Badge>
                      )}
                      {currentView === link.id && (
                        <motion.div 
                          layoutId="navbar-active"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" 
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              
              {/* Search Bar (Desktop) */}
              <div className="hidden lg:flex relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-9 h-9 bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </div>
              </div>

              {/* Search Icon (Mobile/Tablet) */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-slate-500 hover:text-slate-700"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </Button>

              {/* Divider */}
              <div className="h-6 w-px bg-slate-200 hidden sm:block" />

              {/* User Menu */}
              <div className="hidden sm:flex items-center gap-3 pl-1">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-slate-700 leading-none">Alex D.</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wide">Pro Plan</span>
                </div>
                <ProfileDropdown onNavigate={onNavigate} />
              </div>

              {/* Mobile Hamburger */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-slate-700"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search Expand */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-100 bg-slate-50 px-4 py-3 overflow-hidden"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Search..." 
                  className="pl-9 w-full bg-white"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu Drawer (Slide Over) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-[280px] bg-white shadow-2xl border-l border-slate-100 md:hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-lg text-slate-900">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-5 h-5 text-slate-500" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNav(link.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                        currentView === link.id 
                          ? "bg-indigo-50 text-indigo-700" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <link.icon className={cn("w-5 h-5", currentView === link.id ? "text-indigo-600" : "text-slate-400")} />
                      {link.label}
                      {link.badge && (
                        <Badge variant="secondary" className="ml-auto h-5 text-[10px] bg-indigo-100 text-indigo-700 border-0">
                          {link.badge}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>

                <div className="my-6 border-t border-slate-100" />

                <div className="space-y-1">
                   <button onClick={() => handleNav('settings')} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                      <Settings className="w-5 h-5 text-slate-400" />
                      Settings
                   </button>
                   <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                      <LogOut className="w-5 h-5" />
                      Log Out
                   </button>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-200">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Alex D.</div>
                    <div className="text-xs text-slate-500">alex@startup.ai</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
