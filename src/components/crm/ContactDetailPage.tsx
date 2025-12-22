import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit3, 
  Plus, 
  MoreVertical,
  Phone,
  Mail,
  Linkedin,
  MapPin,
  Building2,
  Users,
  DollarSign,
  Globe,
  Clock,
  CheckCircle2,
  Circle,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Calendar,
  FileText,
  Target,
  Tag as TagIcon,
  X,
  Send,
  MessageSquare,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { cn } from '../ui/utils';

interface ContactDetailPageProps {
  onBack?: () => void;
}

export const ContactDetailPage: React.FC<ContactDetailPageProps> = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState('');

  // Sample Data
  const contact = {
    name: 'Sarah Thompson',
    role: 'Head of Procurement',
    company: 'TechNova Solutions',
    status: 'Hot Lead',
    email: 'sarah@technova.com',
    phone: '+1 (312) 555-0184',
    location: 'Austin, TX',
    linkedin: 'linkedin.com/in/sarah-thompson',
    source: 'Website Demo Form',
    score: 86,
    segment: 'Enterprise',
    arrPotential: '$42,000',
    tags: ['AI Buyer', 'High Priority', 'Needs Demo', 'Q4 Target']
  };

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Send updated proposal', date: 'Jan 6', priority: 'High', completed: false },
    { id: 2, text: 'Prepare ROI sheet', date: 'Jan 8', priority: 'Medium', completed: false }
  ]);

  const activities = [
    { 
      id: 1, 
      type: 'email', 
      title: 'Email Sent',
      desc: 'Follow-up on proposal', 
      time: 'Jan 4, 9:32 AM',
      icon: Mail,
      color: 'bg-[#F3F4F6] text-[#4B5563]'
    },
    { 
      id: 2, 
      type: 'call', 
      title: 'Call Logged',
      desc: 'Discussed budget constraints', 
      time: 'Jan 3',
      icon: Phone,
      color: 'bg-[#F3F4F6] text-[#4B5563]'
    },
    { 
      id: 3, 
      type: 'meeting', 
      title: 'Meeting Scheduled',
      desc: 'Demo Scheduled — Jan 7 @ 11:00 AM', 
      time: 'Jan 2',
      icon: Calendar,
      color: 'bg-[#DCFCE7] text-[#166534]'
    }
  ];

  const deals = [
    {
      id: 1,
      name: 'TechNova Annual Contract',
      stage: 'Proposal Sent',
      amount: '$42,000',
      probability: '70%',
      status: 'active'
    }
  ];

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, date: 'Today', priority: 'Medium', completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-sans text-[#1A1A1A]">
      
      {/* 1. HEADER SECTION */}
      <div className="bg-white border-b border-[#E5E5E5] sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-6">
              {onBack && (
                <button 
                  onClick={onBack}
                  className="p-2 hover:bg-[#F7F7F5] rounded-xl transition-colors text-[#6B7280]"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              
              <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white text-xl font-serif font-medium shadow-sm">
                ST
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                   <h1 className="text-2xl font-serif font-medium text-[#1A1A1A]">{contact.name}</h1>
                   <Badge className="bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A] border-none px-2.5 py-0.5 font-bold font-sans rounded-md">
                     {contact.status}
                   </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6B7280] font-medium font-sans">
                   <span className="flex items-center gap-1.5">
                     <Building2 className="w-4 h-4" /> {contact.company}
                   </span>
                   <span className="text-[#E5E5E5]">•</span>
                   <span>{contact.role}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <Button variant="outline" className="border-[#E5E5E5] text-[#1A1A1A] bg-white hover:bg-[#F7F7F5] font-medium rounded-xl h-10 px-4">
                 Edit
               </Button>
               <Button variant="outline" className="border-[#E5E5E5] text-[#1A1A1A] bg-white hover:bg-[#F7F7F5] font-medium rounded-xl h-10 w-10 p-0">
                 <Mail className="w-4 h-4" />
               </Button>
               <Button variant="outline" className="border-[#E5E5E5] text-[#1A1A1A] bg-white hover:bg-[#F7F7F5] font-medium rounded-xl h-10 w-10 p-0">
                 <Phone className="w-4 h-4" />
               </Button>
               <Button className="bg-[#1A1A1A] text-white hover:bg-black font-bold rounded-xl h-10 px-4 shadow-sm">
                 <Plus className="w-4 h-4 mr-2" /> Add Task
               </Button>
               <Button variant="ghost" className="text-[#6B7280] hover:text-[#1A1A1A] w-10 p-0">
                 <MoreVertical className="w-5 h-5" />
               </Button>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 2. LEFT COLUMN (Contact Info) - 4 cols */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* A) Basic Info Card */}
            <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
               <div className="p-6 border-b border-[#F7F7F5]">
                  <h3 className="font-serif font-medium text-lg text-[#1A1A1A]">Contact Details</h3>
               </div>
               <div className="p-6 space-y-5">
                  <div className="flex items-start gap-3">
                     <Mail className="w-4 h-4 text-[#9CA3AF] mt-1" />
                     <div>
                        <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-0.5">Email</div>
                        <a href={`mailto:${contact.email}`} className="text-sm font-medium text-[#1A1A1A] hover:underline">{contact.email}</a>
                     </div>
                  </div>
                  <div className="flex items-start gap-3">
                     <Phone className="w-4 h-4 text-[#9CA3AF] mt-1" />
                     <div>
                        <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-0.5">Phone</div>
                        <div className="text-sm font-medium text-[#1A1A1A]">{contact.phone}</div>
                     </div>
                  </div>
                  <div className="flex items-start gap-3">
                     <MapPin className="w-4 h-4 text-[#9CA3AF] mt-1" />
                     <div>
                        <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-0.5">Location</div>
                        <div className="text-sm font-medium text-[#1A1A1A]">{contact.location}</div>
                     </div>
                  </div>
                  <div className="flex items-start gap-3">
                     <Linkedin className="w-4 h-4 text-[#9CA3AF] mt-1" />
                     <div>
                        <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-0.5">Social</div>
                        <a href="#" className="text-sm font-medium text-[#1A1A1A] hover:text-blue-600 transition-colors">linkedin.com/in/sarah...</a>
                     </div>
                  </div>
               </div>
            </div>

            {/* B) Lead Details Card */}
            <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
               <div className="p-6 border-b border-[#F7F7F5]">
                  <h3 className="font-serif font-medium text-lg text-[#1A1A1A]">Lead Intelligence</h3>
               </div>
               <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                     <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">Source</div>
                     <div className="text-sm font-medium text-[#1A1A1A]">{contact.source}</div>
                  </div>
                  <div>
                     <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">Score</div>
                     <div className="flex items-center gap-2">
                        <div className="text-sm font-bold text-[#1A1A1A]">{contact.score}</div>
                        <div className="w-16 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                           <div className="h-full bg-[#166534]" style={{ width: `${contact.score}%` }}></div>
                        </div>
                     </div>
                  </div>
                  <div>
                     <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">Segment</div>
                     <Badge variant="secondary" className="bg-[#F7F7F5] text-[#1A1A1A] font-medium border border-[#E5E5E5]">{contact.segment}</Badge>
                  </div>
                  <div>
                     <div className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">ARR Potential</div>
                     <div className="text-sm font-bold text-[#1A1A1A]">{contact.arrPotential}</div>
                  </div>
               </div>
            </div>

            {/* C) Tags */}
            <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm p-6">
               <h3 className="font-serif font-medium text-lg text-[#1A1A1A] mb-4">Tags</h3>
               <div className="flex flex-wrap gap-2">
                  {contact.tags.map((tag, i) => (
                     <Badge key={i} variant="outline" className="bg-white border-[#E5E5E5] text-[#6B7280] font-medium px-3 py-1 rounded-lg">
                        {tag}
                     </Badge>
                  ))}
                  <button className="px-3 py-1 rounded-lg border border-dashed border-[#E5E5E5] text-[#9CA3AF] text-xs font-bold hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all">
                     + Add
                  </button>
               </div>
            </div>

          </div>

          {/* 3. RIGHT COLUMN (Activity & AI) - 8 cols */}
          <div className="lg:col-span-8 space-y-6">
             
             {/* 4. AI INSIGHTS PANEL (Top of Right Column) */}
             <div className="bg-[#F3E8FF]/30 rounded-2xl border border-[#F3E8FF] shadow-sm overflow-hidden">
                <div className="p-5 border-b border-[#F3E8FF] flex justify-between items-center bg-[#F3E8FF]/20">
                   <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#A855F7]" />
                      <h3 className="font-serif font-medium text-lg text-[#1A1A1A]">AI Insights</h3>
                   </div>
                   <Button size="sm" className="bg-white text-[#6B21A8] hover:bg-[#F3E8FF] border border-[#E9D5FF] font-bold h-8 rounded-lg text-xs shadow-sm">
                      Auto-Generate Tasks
                   </Button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-2">
                      <div className="text-xs font-bold text-[#6B21A8] uppercase tracking-wider">Summary</div>
                      <p className="text-sm text-[#1A1A1A] leading-relaxed">Lead shows strong intent; last 3 messages were positive.</p>
                   </div>
                   <div className="space-y-2">
                      <div className="text-xs font-bold text-[#991B1B] uppercase tracking-wider">Risks</div>
                      <div className="flex items-start gap-2">
                         <AlertTriangle className="w-3.5 h-3.5 text-[#991B1B] mt-0.5" />
                         <p className="text-sm text-[#1A1A1A] leading-relaxed">Budget uncertainty mentioned in last call.</p>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <div className="text-xs font-bold text-[#166534] uppercase tracking-wider">Next Best Action</div>
                      <p className="text-sm text-[#1A1A1A] leading-relaxed">Send revised proposal; schedule procurement review.</p>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* B) Tasks Section */}
                <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden flex flex-col h-full">
                   <div className="p-5 border-b border-[#F7F7F5] flex justify-between items-center bg-white">
                      <h3 className="font-serif font-medium text-lg text-[#1A1A1A]">Tasks</h3>
                      <div className="flex gap-2">
                         <Badge variant="secondary" className="bg-[#F7F7F5] text-[#6B7280] font-bold">{tasks.filter(t => !t.completed).length} Pending</Badge>
                      </div>
                   </div>
                   <div className="p-5 flex-grow space-y-3">
                      {tasks.map((task) => (
                         <div key={task.id} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[#F7F7F5] border border-transparent hover:border-[#E5E5E5] transition-all cursor-pointer">
                            <button onClick={() => toggleTask(task.id)} className="mt-0.5 text-[#D1D5DB] hover:text-[#1A1A1A]">
                               {task.completed ? <CheckCircle2 className="w-5 h-5 text-[#166534]" /> : <Circle className="w-5 h-5" />}
                            </button>
                            <div className="flex-grow">
                               <div className={cn("text-sm font-medium text-[#1A1A1A]", task.completed && "line-through text-[#9CA3AF]")}>{task.text}</div>
                               <div className="flex items-center gap-2 mt-1.5">
                                  <Badge variant="outline" className={cn(
                                     "text-[10px] px-1.5 py-0 h-5 border-0 font-bold",
                                     task.priority === 'High' ? "bg-[#FEE2E2] text-[#991B1B]" : "bg-[#FEF3C7] text-[#92400E]"
                                  )}>
                                     {task.priority}
                                  </Badge>
                                  <span className="text-[10px] text-[#9CA3AF] font-medium">Due {task.date}</span>
                               </div>
                            </div>
                         </div>
                      ))}
                      
                      {/* Add Task Input */}
                      <div className="flex gap-2 mt-4 pt-4 border-t border-[#F7F7F5]">
                         <Input 
                            placeholder="Add new task..." 
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="h-9 text-sm border-[#E5E5E5] bg-[#F7F7F5] focus:bg-white transition-colors"
                            onKeyDown={(e) => e.key === 'Enter' && addTask()}
                         />
                         <Button size="sm" onClick={addTask} className="bg-[#1A1A1A] hover:bg-black h-9 w-9 p-0 rounded-lg">
                            <Plus className="w-4 h-4" />
                         </Button>
                      </div>
                   </div>
                </div>

                {/* C) Related Deals */}
                <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden flex flex-col h-full">
                   <div className="p-5 border-b border-[#F7F7F5] bg-white">
                      <h3 className="font-serif font-medium text-lg text-[#1A1A1A]">Related Deals</h3>
                   </div>
                   <div className="p-5 flex-grow space-y-4">
                      {deals.map((deal) => (
                         <div key={deal.id} className="p-4 rounded-xl border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors cursor-pointer group bg-white hover:shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                               <h4 className="font-bold text-[#1A1A1A] text-sm">{deal.name}</h4>
                               <Badge className="bg-[#DCFCE7] text-[#166534] border-none text-[10px] font-bold px-1.5">Active</Badge>
                            </div>
                            <div className="text-xs text-[#6B7280] font-medium mb-3">{deal.stage}</div>
                            <div className="flex justify-between items-end">
                               <div className="flex items-center gap-1.5">
                                  <span className="text-lg font-bold text-[#1A1A1A]">{deal.amount}</span>
                                  <span className="text-xs text-[#9CA3AF] font-medium">({deal.probability})</span>
                               </div>
                               <ChevronDown className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#1A1A1A] -rotate-90 group-hover:rotate-0 transition-transform" />
                            </div>
                         </div>
                      ))}
                      <Button variant="outline" className="w-full border-dashed border-[#E5E5E5] text-[#6B7280] hover:text-[#1A1A1A] hover:border-[#1A1A1A] h-9 text-xs font-bold">
                         + Create Deal
                      </Button>
                   </div>
                </div>

             </div>

             {/* A) Interaction Timeline */}
             <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#F7F7F5] flex justify-between items-center">
                   <h3 className="font-serif font-medium text-lg text-[#1A1A1A]">Activity Timeline</h3>
                   <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-[#6B7280] hover:text-[#1A1A1A] bg-[#F7F7F5]">Filter</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-[#6B7280] hover:text-[#1A1A1A] bg-[#F7F7F5]">Log Activity</Button>
                   </div>
                </div>
                <div className="p-6">
                   <div className="relative pl-4 space-y-8">
                      {/* Vertical Line */}
                      <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-[#E5E5E5]" />
                      
                      {activities.map((activity) => (
                         <div key={activity.id} className="relative flex gap-4 group">
                            <div className={cn(
                               "relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm flex-shrink-0",
                               activity.color
                            )}>
                               <activity.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-grow pt-1">
                               <div className="flex justify-between items-start">
                                  <h4 className="text-sm font-bold text-[#1A1A1A]">{activity.title}</h4>
                                  <span className="text-xs text-[#9CA3AF] font-medium">{activity.time}</span>
                               </div>
                               <p className="text-sm text-[#4A4F5B] mt-1">{activity.desc}</p>
                               <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="sm" className="h-6 text-xs text-[#6B7280] px-2 hover:bg-[#F7F7F5]">Reply</Button>
                                  <Button variant="ghost" size="sm" className="h-6 text-xs text-[#6B7280] px-2 hover:bg-[#F7F7F5]">Add Note</Button>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
};
