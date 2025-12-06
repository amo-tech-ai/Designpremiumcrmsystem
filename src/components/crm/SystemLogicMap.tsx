import React from 'react';
import { ArrowRight, ArrowDown, RefreshCw, Mail, CheckSquare, Users, Layers } from 'lucide-react';

export const SystemLogicMap: React.FC = () => {
  return (
    <div className="min-h-[600px] flex items-center justify-center bg-slate-50/50 p-10 rounded-xl border border-slate-200 border-dashed">
      <div className="relative max-w-4xl w-full grid grid-cols-3 gap-12 items-center">
        
        {/* Step 1: Pipeline */}
        <div className="flex flex-col items-center space-y-4 relative z-10">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 w-64 text-center ring-4 ring-purple-50">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 text-purple-600">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-800">Pipeline Step Cards</h3>
            <p className="text-xs text-slate-500 mt-2">Active step filters the leads table. Visual progress indicator.</p>
          </div>
          <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            Start Here
          </div>
        </div>

        {/* Arrow 1 */}
        <div className="flex flex-col items-center justify-center">
          <div className="h-0.5 w-full bg-slate-300 relative">
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mt-[5px]">
              <ArrowRight className="text-slate-300 h-6 w-6" />
            </div>
            <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-xs text-slate-400 font-medium bg-slate-50 px-2">
              Updates & Filters
            </div>
          </div>
        </div>

        {/* Step 2: Tasks System */}
        <div className="flex flex-col items-center space-y-4 relative z-10">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 w-64 text-center ring-4 ring-blue-50">
             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 text-blue-600">
              <CheckSquare className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-800">Tasks System</h3>
            <p className="text-xs text-slate-500 mt-2">Completion advances deals. Tasks feed into specific steps.</p>
          </div>
        </div>

        {/* Arrow Down from Tasks to Activities */}
         <div className="col-span-3 h-16 relative flex justify-center">
            <div className="h-full w-0.5 bg-slate-300 absolute right-1/3 top-0 transform translate-x-8">
               <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                  <ArrowDown className="text-slate-300 h-6 w-6" />
               </div>
            </div>
            <div className="absolute top-1/2 right-1/4 text-xs text-slate-400 font-medium bg-slate-50 px-2">
              Generates Activity
            </div>
         </div>

        {/* Step 3: Activities Feed */}
        <div className="flex flex-col items-center space-y-4 relative z-10">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-teal-100 w-64 text-center ring-4 ring-teal-50">
             <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3 text-teal-600">
              <RefreshCw className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-800">Activities Feed</h3>
            <p className="text-xs text-slate-500 mt-2">Timeline of actions. Updates instantly.</p>
          </div>
        </div>

        {/* Arrow 3 */}
        <div className="flex flex-col items-center justify-center">
          <div className="h-0.5 w-full bg-slate-300 relative">
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mt-[5px]">
              <ArrowRight className="text-slate-300 h-6 w-6" />
            </div>
             <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-xs text-slate-400 font-medium bg-slate-50 px-2">
              Informs User
            </div>
          </div>
        </div>

        {/* Step 4: Contact Panel */}
        <div className="flex flex-col items-center space-y-4 relative z-10">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100 w-64 text-center ring-4 ring-orange-50">
             <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3 text-orange-600">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-800">Contact Panel</h3>
            <p className="text-xs text-slate-500 mt-2">Triggers actions that push deals forward.</p>
          </div>
        </div>

        {/* Loop back arrow */}
         <div className="col-span-3 h-24 relative">
            <svg className="absolute w-full h-full" style={{ overflow: 'visible' }}>
               <path 
                 d="M 650 60 C 650 120, 150 120, 150 10" 
                 fill="none" 
                 stroke="#cbd5e1" 
                 strokeWidth="2" 
                 strokeDasharray="8 4"
               />
               <polygon points="150,0 145,10 155,10" fill="#cbd5e1" />
            </svg>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 font-medium bg-slate-50 px-2">
              Loop: Actions update Pipeline Status
            </div>
         </div>

      </div>
    </div>
  );
};
