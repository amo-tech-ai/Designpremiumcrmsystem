import { 
  Search, 
  CheckCircle2, 
  Users, 
  FileText, 
  Scale, 
  PenTool, 
  Trophy 
} from 'lucide-react';

export const STEPS = [
  {
    id: 1,
    title: "Lead Discovery",
    description: "Identify potential clients and initial outreach.",
    icon: Search,
    colorStart: "#a855f7", // Purple 500
    colorEnd: "#9333ea",   // Purple 600
  },
  {
    id: 2,
    title: "Qualification",
    description: "Assess fit, budget, and timeline.",
    icon: CheckCircle2,
    colorStart: "#8b5cf6", // Violet 500
    colorEnd: "#7c3aed",   // Violet 600
  },
  {
    id: 3,
    title: "First Meeting",
    description: "Initial consultation and needs analysis.",
    icon: Users,
    colorStart: "#6366f1", // Indigo 500
    colorEnd: "#4f46e5",   // Indigo 600
  },
  {
    id: 4,
    title: "Proposal",
    description: "Draft and send detailed proposal.",
    icon: FileText,
    colorStart: "#3b82f6", // Blue 500
    colorEnd: "#2563eb",   // Blue 600
  },
  {
    id: 5,
    title: "Negotiation",
    description: "Discuss terms and handle objections.",
    icon: Scale,
    colorStart: "#0ea5e9", // Sky 500
    colorEnd: "#0284c7",   // Sky 600
  },
  {
    id: 6,
    title: "Contract",
    description: "Finalize legal documents and signing.",
    icon: PenTool,
    colorStart: "#06b6d4", // Cyan 500
    colorEnd: "#0891b2",   // Cyan 600
  },
  {
    id: 7,
    title: "Closed Won",
    description: "Onboarding and project kickoff.",
    icon: Trophy,
    colorStart: "#14b8a6", // Teal 500
    colorEnd: "#0d9488",   // Teal 600
  },
];

export const LEADS = [
  {
    id: "L001",
    name: "Sarah Miller",
    company: "TechFlow Inc",
    priority: "High",
    stage: 1,
    owner: "Alex D.",
    lastActivity: "2h ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: "L002",
    name: "James Chen",
    company: "Nexus Global",
    priority: "Medium",
    stage: 2,
    owner: "Maria R.",
    lastActivity: "1d ago",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: "L003",
    name: "Emma Wilson",
    company: "Creative Studio",
    priority: "Low",
    stage: 3,
    owner: "Alex D.",
    lastActivity: "3h ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: "L004",
    name: "Michael Brown",
    company: "Logistics Co",
    priority: "High",
    stage: 4,
    owner: "Sarah K.",
    lastActivity: "5m ago",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: "L005",
    name: "Lisa Anderson",
    company: "Retail Solutions",
    priority: "High",
    stage: 5,
    owner: "Maria R.",
    lastActivity: "1w ago",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: "L006",
    name: "David Clark",
    company: "FinTech Corp",
    priority: "Medium",
    stage: 1,
    owner: "John S.",
    lastActivity: "4h ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
  },
];

export const ACTIVITIES = [
  {
    id: 1,
    type: "email",
    title: "Email Sent to Sarah Miller",
    description: "Follow-up regarding the proposal sent last week.",
    time: "10:30 AM",
    date: "Today",
  },
  {
    id: 2,
    type: "call",
    title: "Call with James Chen",
    description: "Discussed budget constraints and timeline adjustments.",
    time: "09:15 AM",
    date: "Today",
  },
  {
    id: 3,
    type: "meeting",
    title: "Meeting with TechFlow Team",
    description: "Product demo and Q&A session.",
    time: "02:00 PM",
    date: "Yesterday",
  },
  {
    id: 4,
    type: "note",
    title: "Note added for Michael Brown",
    description: "Key decision maker is out of office until Monday.",
    time: "11:45 AM",
    date: "Yesterday",
  },
];

export const TASKS = [
  {
    id: 1,
    title: "Research competitor pricing for TechFlow",
    due: "Tomorrow",
    category: "Research",
    priority: "High",
    assigned: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 2,
    title: "Draft proposal for Nexus Global",
    due: "Next Week",
    category: "Planning",
    priority: "Medium",
    assigned: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 3,
    title: "Follow up call with Lisa",
    due: "Today",
    category: "Execution",
    priority: "High",
    assigned: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 4,
    title: "Quarterly review preparation",
    due: "Friday",
    category: "Review",
    priority: "Low",
    assigned: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&h=100",
  },
];
