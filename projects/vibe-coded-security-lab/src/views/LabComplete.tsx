import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { Check, ArrowRight } from 'lucide-react';

export default function LabComplete() {
  const { setState } = useStore();

  return (
    <div className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center max-w-2xl gap-4 mb-10"
      >
        <div className="flex items-center gap-2 px-3 py-1 border border-[#54C79A] bg-[rgba(84,199,154,0.08)] font-mono text-xs text-[#54C79A] uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-[#54C79A]"></span>
          <span>AUDIT CHECKPOINT REACHED</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#F5F5F5] uppercase tracking-tight">
          SECURITY LAB COMPLETE
        </h1>
        <p className="text-base sm:text-lg text-[#A0A0A5] font-normal leading-relaxed">
          The application works.<br className="hidden sm:inline" />
          Now you've verified why security cannot be an afterthought.
        </p>
      </motion.div>

      {/* 2x2 Swiss Grid of Completed Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 border border-[#2A2A2E] bg-[#111113] divide-y md:divide-y-0 md:divide-x divide-[#2A2A2E] w-full max-w-4xl mb-10">
        <div className="flex flex-col divide-y divide-[#2A2A2E]">
          <SummaryCard 
            num="01"
            title="SQL INJECTION" 
            desc="Parameterized queries isolate untrusted input from the database interpreter." 
          />
          <SummaryCard 
            num="02"
            title="STORED XSS" 
            desc="Safe output rendering treats user content as plain text nodes, preventing script execution." 
          />
        </div>

        <div className="flex flex-col divide-y divide-[#2A2A2E]">
          <SummaryCard 
            num="03"
            title="EXPOSED SECRET" 
            desc="Server-side secret management isolates credentials behind environment variables." 
          />
          <SummaryCard 
            num="04"
            title="BROKEN AUTHORIZATION" 
            desc="Explicit access control validates object-level resource ownership on every request." 
          />
        </div>
      </div>

      {/* Verification Counter & Action */}
      <div className="flex flex-col items-center gap-6">
        <div className="font-mono text-xs text-[#54C79A] font-bold tracking-widest uppercase flex items-center gap-2 px-4 py-2 border border-[#54C79A] bg-[rgba(84,199,154,0.08)]">
          <Check size={14} />
          <span>4 / 4 VULNERABILITIES VERIFIED & SECURED</span>
        </div>
        
        <button 
          onClick={() => setState('PLAYBOOK')}
          className="px-8 py-4 bg-[#F5F5F5] text-[#0B0B0C] hover:bg-white font-mono text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer flex items-center gap-3 border border-[#F5F5F5]"
        >
          <span>HOW TO VIBE CODE SECURELY</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function SummaryCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="p-6 sm:p-8 flex items-start gap-5 bg-[#111113]">
      <span className="font-mono text-xl font-bold text-[#54C79A] shrink-0">
        {num}
      </span>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#F5F5F5] tracking-wider uppercase">
          <Check size={13} className="text-[#54C79A]" />
          <span>{title}</span>
        </div>
        <p className="text-xs text-[#A0A0A5] font-mono leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
