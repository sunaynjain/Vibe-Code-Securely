import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export default function Admin() {
  const { setState } = useStore();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center p-4 sm:p-6"
    >
      <div className="w-full bg-[#111113] border border-[#2A2A2E] shadow-none flex flex-col">
        
        {/* Admin Header - Clean Developer Tool Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 border-b border-[#2A2A2E] bg-[#19191C] gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#F5F5F5]"></span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-mono font-bold text-[#F5F5F5] tracking-wider uppercase">FEEDBACKLY / ADMIN CONSOLE</h2>
                <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[#2A2A2E] text-[#A0A0A5]">v1.0.4-dev</span>
              </div>
              <p className="text-[11px] text-[#717176] font-mono">INTERNAL INVENTORY & SUBMISSION LOGS</p>
            </div>
          </div>

          <button 
            onClick={() => setState('SECURITY_LAB_TRANSITION')}
            className="group flex items-center gap-2.5 px-5 py-2.5 bg-[#FF4D4D] text-[#0B0B0C] hover:bg-[#ff6666] font-mono text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer w-full sm:w-auto justify-center"
          >
            <ShieldAlert size={14} />
            <span>ENTER SECURITY LAB</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Minimal Horizontal Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#2A2A2E] divide-x divide-[#2A2A2E] font-mono">
          <div className="p-4 px-6 bg-[#111113]">
            <div className="text-[10px] text-[#717176] uppercase tracking-wider">TOTAL SUBMISSIONS</div>
            <div className="text-xl font-bold text-[#F5F5F5] mt-1">127</div>
          </div>
          <div className="p-4 px-6 bg-[#111113]">
            <div className="text-[10px] text-[#717176] uppercase tracking-wider">SERVICE UPTIME</div>
            <div className="text-xl font-bold text-[#F5F5F5] mt-1">99.2%</div>
          </div>
          <div className="p-4 px-6 bg-[#111113]">
            <div className="text-[10px] text-[#717176] uppercase tracking-wider">ACTIVE CLIENTS</div>
            <div className="text-xl font-bold text-[#F5F5F5] mt-1">24</div>
          </div>
          <div className="p-4 px-6 bg-[#111113]">
            <div className="text-[10px] text-[#717176] uppercase tracking-wider">DATABASE LATENCY</div>
            <div className="text-xl font-bold text-[#F5F5F5] mt-1">42ms</div>
          </div>
        </div>

        {/* Submissions Section */}
        <div className="p-6 sm:p-8 bg-[#0B0B0C]">
          <div className="flex items-center justify-between border-b border-[#2A2A2E] pb-3 mb-6">
            <h3 className="text-xs font-mono font-bold text-[#A0A0A5] tracking-widest uppercase">
              RECENT DATABASE ENTRIES (FEEDBACK_RECORDS)
            </h3>
            <span className="text-[10px] font-mono text-[#717176]">SHOWING LAST 3 OF 127</span>
          </div>
          
          <div className="flex flex-col border border-[#2A2A2E] divide-y divide-[#2A2A2E]">
            <SubmissionRow 
              id="REC-0127"
              name="Sunay Jain"
              email="sunay@demo.local"
              message="Really enjoyed the cybersecurity seminar."
              time="TODAY · 10:24:12"
              isNew={true}
            />
            <SubmissionRow 
              id="REC-0126"
              name="Rahul Sharma"
              email="rahul@demo.local"
              message="The UI looks amazing, great job team!"
              time="YESTERDAY · 14:15:30"
            />
            <SubmissionRow 
              id="REC-0125"
              name="Priya Patel"
              email="priya@demo.local"
              message="Could we get more features?"
              time="YESTERDAY · 09:30:02"
            />
          </div>

          <div className="mt-6 p-4 border border-[#2A2A2E] bg-[#111113] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#A0A0A5]">
              <span className="text-[#FF4D4D] font-bold">WARNING:</span> This application was vibe-coded without security guardrails.
            </div>
            <button
              onClick={() => setState('SECURITY_LAB_TRANSITION')}
              className="text-xs font-mono font-bold text-[#F5F5F5] hover:text-[#FF4D4D] flex items-center gap-1.5 transition-colors cursor-pointer uppercase"
            >
              <span>Inspect for flaws</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function SubmissionRow({ id, name, email, message, time, isNew = false }: { id: string, name: string, email: string, message: string, time: string, isNew?: boolean }) {
  return (
    <div className={`p-4 sm:p-5 flex flex-col gap-2 transition-colors ${isNew ? 'bg-[#141417]' : 'bg-[#111113] hover:bg-[#151518]'}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-[#717176]">{id}</span>
          <span className="text-[#2A2A2E]">/</span>
          <span className="font-bold text-[#F5F5F5]">{name}</span>
          <span className="text-[#717176] hidden sm:inline">&lt;{email}&gt;</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          {isNew && (
            <span className="px-1.5 py-0.2 bg-[#FF4D4D] text-[#0B0B0C] font-bold uppercase tracking-wider text-[10px]">
              JUST IN
            </span>
          )}
          <span className="text-[#717176]">{time}</span>
        </div>
      </div>
      <p className="text-sm text-[#A0A0A5] font-mono leading-relaxed pl-0 sm:pl-3 border-l-0 sm:border-l border-[#2A2A2E] mt-1">
        "{message}"
      </p>
    </div>
  );
}
