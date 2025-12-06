import { 
  Lightbulb, 
  Search, 
  Target, 
  FileText, 
  Handshake, 
  PenTool, 
  Trophy,
  Mail,
  Phone,
  Calendar,
  File,
  CheckCircle,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  XCircle,
  AlertTriangle,
  BarChart3
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

export const leads = [
  {
    id: 'lead-1',
    name: 'Sarah Connor',
    company: 'Skynet Systems',
    priority: 'High',
    stepId: 'step-1',
    owner: 'John D.',
    lastActivity: '2h ago',
    email: 'sarah@skynet.com',
    phone: '+1 555-0199',
    tags: ['Enterprise', 'AI'],
    healthScore: 92,
    mrr: '$5,000'
  },
  {
    id: 'lead-2',
    name: 'Bruce Wayne',
    company: 'Wayne Enterprises',
    priority: 'Medium',
    stepId: 'step-2',
    owner: 'Alfred P.',
    lastActivity: '1d ago',
    email: 'bruce@wayne.com',
    phone: '+1 555-0123',
    tags: ['VIP', 'Defense'],
    healthScore: 85,
    mrr: '$12,000'
  },
  {
    id: 'lead-3',
    name: 'Diana Prince',
    company: 'Themyscira Inc.',
    priority: 'Low',
    stepId: 'step-1',
    owner: 'Steve T.',
    lastActivity: '3d ago',
    email: 'diana@themyscira.com',
    phone: '+1 555-0144',
    tags: ['International'],
    healthScore: 78,
    mrr: '$3,500'
  },
  {
    id: 'lead-4',
    name: 'Tony Stark',
    company: 'Stark Industries',
    priority: 'High',
    stepId: 'step-4',
    owner: 'Pepper P.',
    lastActivity: '5m ago',
    email: 'tony@stark.com',
    phone: '+1 555-0188',
    tags: ['Tech', 'Urgent'],
    healthScore: 98,
    mrr: '$25,000'
  },
  {
    id: 'lead-5',
    name: 'Clark Kent',
    company: 'Daily Planet',
    priority: 'Medium',
    stepId: 'step-3',
    owner: 'Lois L.',
    lastActivity: '4h ago',
    email: 'clark@dailyplanet.com',
    phone: '+1 555-0155',
    tags: ['Media'],
    healthScore: 88,
    mrr: '$2,000'
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

export const investorLeads = [
  {
    id: 'inv-1',
    name: 'Sequoia Capital',
    company: 'Partner: Roelof B.',
    priority: 'High',
    stepId: 'inv-step-3',
    owner: 'Founder',
    lastActivity: '1d ago',
    email: 'roelof@sequoia.com',
    phone: '',
    tags: ['Tier 1', 'SaaS'],
    fundingGoal: '$2M',
    targetInvestors: ['SaaS', 'Growth'],
    healthScore: 95
  },
  {
    id: 'inv-2',
    name: 'Andreessen Horowitz',
    company: 'Partner: Marc A.',
    priority: 'High',
    stepId: 'inv-step-2',
    owner: 'Founder',
    lastActivity: '3d ago',
    email: 'marc@a16z.com',
    phone: '',
    tags: ['Crypto', 'Consumer'],
    fundingGoal: '$5M',
    targetInvestors: ['Platform', 'AI'],
    healthScore: 80
  },
  {
    id: 'inv-3',
    name: 'Y Combinator',
    company: 'Batch W24',
    priority: 'Medium',
    stepId: 'inv-step-4',
    owner: 'Co-Founder',
    lastActivity: '5h ago',
    email: 'partners@ycombinator.com',
    phone: '',
    tags: ['Accelerator'],
    fundingGoal: '$500k',
    targetInvestors: ['Seed'],
    healthScore: 99
  },
  {
    id: 'inv-4',
    name: 'First Round',
    company: 'Partner: Josh K.',
    priority: 'Medium',
    stepId: 'inv-step-1',
    owner: 'Founder',
    lastActivity: '1w ago',
    email: 'josh@firstround.com',
    phone: '',
    tags: ['Seed', 'Helpful'],
    fundingGoal: '$1.5M',
    targetInvestors: ['Product-Led'],
    healthScore: 60
  }
];

// --- AI INSIGHTS ---
export const aiInsights = [
  {
    id: 'ai-1',
    type: 'risk',
    title: 'Deals likely to slip',
    description: 'Wayne Enterprises has low engagement in "Qualification". No email opens in 5 days.',
    tags: [{ label: 'At Risk', color: 'bg-red-100 text-red-700' }],
    action: 'Create Follow-up Task',
    relatedId: 'lead-2'
  },
  {
    id: 'ai-2',
    type: 'positive',
    title: 'Engagement Spike',
    description: 'Stark Industries viewed the proposal deck 12 times today. 3 new stakeholders identified.',
    tags: [{ label: 'High Engagement', color: 'bg-green-100 text-green-700' }],
    action: 'Schedule Closing Call',
    relatedId: 'lead-4'
  },
  {
    id: 'ai-3',
    type: 'suggestion',
    title: 'Suggested Action',
    description: 'Sequoia Capital is due for a follow-up. Last contact was 1 week ago.',
    tags: [{ label: 'Needs Attention', color: 'bg-amber-100 text-amber-700' }],
    action: 'Draft Update Email',
    relatedId: 'inv-1'
  }
];

// --- LINKEDIN CONTACTS ---
export const linkedinContacts = [
  {
    id: 'li-1',
    name: 'Rita Gomez',
    role: 'AI Product Lead',
    company: 'TechFlow AI',
    type: 'linkedin',
    email: 'rita.gomez@email.com',
    lastActivity: 'Connected on LinkedIn 3 days ago',
    connectionStatus: 'Connected',
    connectionLevel: '1st',
    tags: ['Networking', 'Product', 'AI'],
    notes: 'Interested in learning more about the demo.',
    avatarSeed: 'Rita',
    linkedinActivity: {
      likes: 12,
      comments: 3,
      replies: 1
    }
  },
  {
    id: 'li-2',
    name: 'Samuel Ortiz',
    role: 'Growth Consultant',
    company: 'GrowthHub',
    type: 'linkedin',
    email: 'samuel.ortiz@growthhub.io',
    lastActivity: 'Replied on LinkedIn: requesting case studies',
    connectionStatus: 'Messaging',
    connectionLevel: '1st',
    tags: ['Growth', 'Partnership'],
    notes: '',
    avatarSeed: 'Samuel',
    linkedinActivity: {
      likes: 5,
      comments: 8,
      replies: 4
    }
  },
  {
    id: 'li-3',
    name: 'Maya Stein',
    role: 'Investor Relations',
    company: 'FundX Capital',
    type: 'linkedin',
    email: 'maya.stein@fundx.co',
    lastActivity: 'Viewed profile, liked a post',
    connectionStatus: 'Pending',
    connectionLevel: '2nd',
    tags: ['VC', 'Outreach', 'Warm Lead'],
    notes: '',
    avatarSeed: 'Maya',
    linkedinActivity: {
      likes: 1,
      comments: 0,
      replies: 0
    }
  }
];

// --- DISCOVERY DATA ---
export const discoveryResults = [
  {
    id: 'd-1',
    name: 'Elena Rostova',
    role: 'CEO & Founder',
    company: 'NeuroGen AI',
    type: 'Lead',
    source: 'TechCrunch',
    matchScore: 98,
    tags: ['AI', 'Biotech', 'Series A'],
    avatarSeed: 'Elena'
  },
  {
    id: 'd-2',
    name: 'Lina Park',
    role: 'Partner',
    company: 'Horizon Ventures',
    fundName: 'Horizon Ventures',
    type: 'Investor',
    source: 'LinkedIn',
    matchScore: 95,
    tags: ['Seed', 'Series A', 'Deep Tech'],
    avatarSeed: 'Lina',
    stageFocus: 'Seed → Series A',
    checkSize: '$250k–2M',
    portfolio: ['NovaAI', 'GridOps'],
    thesis: 'Strong interest in AI and Ops tooling',
    recentDeals: ['NovaAI (Lead)', 'GridOps (Follow)']
  },
  {
    id: 'd-3',
    name: 'Sarah Jenkins',
    role: 'VP of Engineering',
    company: 'CloudScale',
    type: 'LinkedIn Contact',
    source: 'LinkedIn',
    matchScore: 88,
    tags: ['SaaS', 'Infra', 'Hiring'],
    avatarSeed: 'Sarah'
  },
  {
    id: 'd-4',
    name: 'David Kim',
    role: 'Head of Product',
    company: 'Fintech Solutions',
    type: 'Partner',
    source: 'Conference',
    matchScore: 82,
    tags: ['Fintech', 'Partnership'],
    avatarSeed: 'David'
  },
  {
    id: 'd-5',
    name: 'Marcus Reed',
    role: 'Principal',
    company: 'Finex Capital',
    fundName: 'Finex Capital',
    type: 'Investor',
    source: 'AngelList',
    matchScore: 91,
    tags: ['Pre-Seed', 'Seed', 'Fintech'],
    avatarSeed: 'Marcus',
    stageFocus: 'Pre-Seed → Seed',
    checkSize: '$100k–500k',
    portfolio: ['SkyRun', 'FabricAI'],
    thesis: 'Actively investing this quarter in Fintech infra',
    recentDeals: ['SkyRun (Seed)']
  },
  {
    id: 'd-6',
    name: 'James Wilson',
    role: 'CTO',
    company: 'LogisticsPro',
    type: 'Lead',
    source: 'Website',
    matchScore: 75,
    tags: ['Logistics', 'Enterprise'],
    avatarSeed: 'James'
  }
];

export const suggestedMatches = [
  {
    id: 's-1',
    name: 'Dr. Arinze Okafor',
    role: 'Research Lead',
    company: 'DeepMind',
    reason: 'Matched AI sector',
    avatarSeed: 'Arinze'
  },
  {
    id: 's-2',
    name: 'Priya Patel',
    role: 'Founder',
    company: 'EduTech Global',
    reason: 'Similar to closed-won lead',
    avatarSeed: 'Priya'
  },
  {
    id: 's-3',
    name: 'Thomas Anderson',
    role: 'Software Architect',
    company: 'MetaCortex',
    reason: 'High technical influence',
    avatarSeed: 'Thomas'
  }
];

// --- EXISTING DATA PRESERVED ---
export const activities = [
  {
    id: 'act-1',
    type: 'Email',
    title: 'Proposal Sent',
    description: 'Sent the revised proposal v2.0 to Tony Stark.',
    time: '10:00 AM',
    icon: Mail,
    color: 'text-blue-500'
  },
  {
    id: 'act-2',
    type: 'Call',
    title: 'Discovery Call',
    description: 'Had a great call with Sarah Connor regarding security requirements.',
    time: 'Yesterday',
    icon: Phone,
    color: 'text-green-500'
  },
  {
    id: 'act-3',
    type: 'Meeting',
    title: 'Demo Scheduled',
    description: 'Scheduled a product demo with Wayne Enterprises team.',
    time: 'Yesterday',
    icon: Calendar,
    color: 'text-purple-500'
  },
  {
    id: 'act-4',
    type: 'Note',
    title: 'Internal Note',
    description: 'Discussed pricing strategy for Stark deal with manager.',
    time: '2 days ago',
    icon: File,
    color: 'text-orange-500'
  },
  {
    id: 'act-5',
    type: 'Task',
    title: 'Follow Up',
    description: 'Task completed: Send follow up email to Clark Kent.',
    time: '3 days ago',
    icon: CheckCircle,
    color: 'text-teal-500'
  }
];

export const tasks = [
  { id: 't-1', title: 'Research Competitors', dueDate: 'Today', priority: 'High', category: 'Research', completed: false },
  { id: 't-2', title: 'Draft Initial Proposal', dueDate: 'Tomorrow', priority: 'Medium', category: 'Planning', completed: false },
  { id: 't-3', title: 'Client Meeting Prep', dueDate: 'Sep 12', priority: 'High', category: 'Execution', completed: true },
  { id: 't-4', title: 'Update CRM Records', dueDate: 'Sep 14', priority: 'Low', category: 'Review', completed: false },
];
