import React, { useState } from 'react';
import { 
  Home, 
  LayoutDashboard, 
  Presentation, 
  Users, 
  Rocket, 
  LayoutGrid, 
  Settings, 
  Sparkles,
  ChevronRight,
  Globe,
  Trello,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Building2,
  Briefcase,
  Calendar
} from 'lucide-react';
import { cn } from "../ui/utils";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { motion } from "motion/react";

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navItems = [
    { id: 'landing-v2', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'startup-profile', label: 'Startup Profile Wizard', icon: Sparkles },
    { id: 'company-profile', label: 'Edit Company', icon: Building2 },
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'wizard', label: 'Pitch Decks', icon: Presentation },
    { id: 'event-wizard', label: 'Event Wizard', icon: Calendar },
    { id: 'pipeline', label: 'Deals', icon: Trello },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'discovery', label: 'Discovery', icon: Globe },
    { id: 'gtm', label: 'GTM Strategy', icon: Rocket },
    { id: 'lean-canvas', label: 'Lean Canvas', icon: LayoutGrid, badge: 'AI' },
  ];

  return (
    <div 
      className={cn(
        "bg-white border-r border-[#E1E6EE] flex flex-col h-full z-30 flex-shrink-0 transition-all duration-300 ease-in-out font-sans shadow-sm", 
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      
      {/* Logo Section */}
      <div className={cn("h-20 flex items-center border-b border-[#E1E6EE] flex-shrink-0 bg-white", isCollapsed ? "justify-center px-0" : "px-6 justify-between")}>
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onNavigate('landing-v2')}
        >
          <div className="w-9 h-9 bg-gradient-to-br from-[#6F7EBC] to-[#4A5B78] rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-xl tracking-tight text-[#1A1F2C] animate-in fade-in duration-300">
              StartupAI
            </span>
          )}
        </div>
        
        {!isCollapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-[#9CA3AF] hover:text-[#4A5B78] hover:bg-[#E8EEF5]"
            onClick={() => setIsCollapsed(true)}
          >
            <PanelLeftClose className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Main Navigation */}
      <div className={cn("flex-grow overflow-y-auto py-6 space-y-1 scrollbar-none", isCollapsed ? "px-2" : "px-4")}>
        
        {!isCollapsed && (
          <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-4 px-2 mt-2">
            Platform
          </div>
        )}

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center rounded-xl text-sm font-medium transition-all duration-200 group relative outline-none focus-visible:ring-2 focus-visible:ring-[#4A5B78]/20",
              isCollapsed 
                ? "justify-center px-0 py-3" 
                : "gap-3 px-3 py-2.5",
              currentView === item.id 
                ? "bg-[#E8EEF5] text-[#4A5B78]" 
                : "text-[#6B7280] hover:bg-[#F7F9FC] hover:text-[#1A1F2C]"
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors flex-shrink-0",
              currentView === item.id ? "text-[#4A5B78]" : "text-[#9CA3AF] group-hover:text-[#4A5B78]"
            )} />
            
            {!isCollapsed && (
              <>
                <span className="flex-grow text-left truncate">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-[#C9D7F2] text-[#4A5B78] border-0 font-bold">
                    {item.badge}
                  </Badge>
                )}
              </>
            )}

            {currentView === item.id && (
              <motion.div
                layoutId="sidebar-active"
                className={cn(
                  "absolute bg-[#4A5B78] rounded-r-full",
                  isCollapsed ? "left-0 top-3 bottom-3 w-1" : "left-0 top-2 bottom-2 w-1"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </button>
        ))}

        <div className={cn("pt-6 pb-2", isCollapsed && "border-t border-[#E1E6EE] mt-4 pt-4")}>
          {!isCollapsed && (
            <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 px-2">
              Workspace
            </div>
          )}
          <button
            onClick={() => onNavigate('settings')}
            className={cn(
              "w-full flex items-center rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#F7F9FC] hover:text-[#1A1F2C] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#4A5B78]/20",
              isCollapsed 
                ? "justify-center px-0 py-3" 
                : "gap-3 px-3 py-2.5"
            )}
            title={isCollapsed ? "Settings" : undefined}
          >
            <Settings className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#4A5B78]" />
            {!isCollapsed && <span>Settings</span>}
          </button>
        </div>
      </div>

      {/* User Profile / Collapse Toggle (Bottom) */}
      <div className="p-4 border-t border-[#E1E6EE] bg-[#F7F9FC] flex flex-col gap-2">
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-9 w-9 border border-[#E1E6EE] cursor-pointer" onClick={() => onNavigate('profile')}>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-[#9CA3AF] hover:text-[#4A5B78]"
              onClick={() => setIsCollapsed(false)}
            >
              <PanelLeftOpen className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white hover:shadow-sm transition-all cursor-pointer group border border-transparent hover:border-[#E1E6EE]" onClick={() => onNavigate('profile')}>
            <Avatar className="h-10 w-10 border border-[#E1E6EE]">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
              <AvatarFallback className="bg-[#E8EEF5] text-[#4A5B78] font-bold">AD</AvatarFallback>
            </Avatar>
            <div className="flex-grow min-w-0">
              <div className="text-sm font-bold text-[#1A1F2C] truncate">Alex Founder</div>
              <div className="text-xs text-[#6B7280] truncate font-medium">Pro Plan</div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#4A5B78]" />
          </div>
        )}
      </div>
    </div>
  );
};
