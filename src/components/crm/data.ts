import { 
  Lightbulb, 
  Search, 
  Target, 
  FileText, 
  Handshake, 
  PenTool, 
  Trophy,
  Mail,
  Calendar,
  ShieldCheck,
  CheckCircle,
  File,
  Phone
} from 'lucide-react';

// --- SALES PIPELINE ---
export const steps = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Lead Discovery',
    description: 'Identify potential leads and initial contact points.',
    icon: Lightbulb,
    colorClass: 'from-purple-600 to-purple-500'
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Qualification',
    description: 'Assess lead fit, budget, and timeline requirements.',
    icon: Search,
    colorClass: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'First Meeting',
    description: 'Initial discovery call to understand pain points.',
    icon: Target,
    colorClass: 'from-indigo-500 to-blue-600'
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'Proposal',
    description: 'Draft and send detailed project proposal.',
    icon: FileText,
    colorClass: 'from-blue-600 to-blue-500'
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'Negotiation',
    description: 'Discuss terms, pricing, and contract details.',
    icon: Handshake,
    colorClass: 'from-blue-500 to-teal-500'
  },
  {
    id: 'step-6',
    stepNumber: 6,
    title: 'Contract',
    description: 'Final legal review and signing process.',
    icon: PenTool,
    colorClass: 'from-teal-500 to-teal-400'
  },
  {
    id: 'step-7',
    stepNumber: 7,
    title: 'Closed Won',
    description: 'Onboarding and project kickoff.',
    icon: Trophy,
    colorClass: 'from-teal-400 to-teal-300'
  }
];

// --- INVESTOR PIPELINE ---
export const investorSteps = [
  {
    id: 'inv-step-1',
    stepNumber: 1,
    title: 'Research',
    description: 'Identify ideal investors, collect background info.',
    icon: Search,
    colorClass: 'from-indigo-600 to-indigo-500'
  },
  {
    id: 'inv-step-2',
    stepNumber: 2,
    title: 'Outreach',
    description: 'Cold outreach, warm intros, pitch email sent.',
    icon: Mail,
    colorClass: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'inv-step-3',
    stepNumber: 3,
    title: 'Meeting',
    description: 'Pitch meetings, follow-ups, deck reviews.',
    icon: Calendar,
    colorClass: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'inv-step-4',
    stepNumber: 4,
    title: 'Due Diligence',
    description: 'Docs, metrics, legal, financial review.',
    icon: ShieldCheck,
    colorClass: 'from-cyan-500 to-teal-500'
  },
  {
    id: 'inv-step-5',
    stepNumber: 5,
    title: 'Closed',
    description: 'Won or lost, final investment outcome.',
    icon: Handshake,
    colorClass: 'from-teal-500 to-teal-400'
  }
];
