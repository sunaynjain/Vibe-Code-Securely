import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { ArrowRight, Terminal } from 'lucide-react';

export default function Landing() {
  const { setState } = useStore();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto flex flex-col justify-center px-4 sm:px-6 py-6"
    >
      {/* Top Metadata Strip */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#2A2A2E] pb-3 mb-10 text-[11px] font-mono tracking-widest text-[#717176] uppercase">
        <div className="flex items-center gap-2">
          <span className="text-[#F5F5F5]">VIBE CODED</span>
          <span>/</span>
          <span>SECURITY LAB RESEARCH</span>
        </div>
        <div className="flex items-center gap-4">
          <span>SUBJECT: FEEDBACKLY V1.0</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline text-[#A0A0A5]">AUDIT: REQUIRED</span>
        </div>
      </div>

      {/* Hero Headline - Swiss Brutalist Composition */}
      <div className="mb-12">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#F5F5F5] uppercase leading-[0.92] mb-6">
          THE CODE WORKS.<br />
          <span className="text-[#717176]">DO YOU TRUST IT?</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-[#A0A0A5] max-w-2xl font-normal leading-relaxed">
          AI can generate working applications in seconds. But functional does not equal secure.
          Explore <span className="text-[#F5F5F5] font-medium">Feedbackly</span> — a live student platform built fast with AI, where four critical security flaws hide in plain sight.
        </p>
      </div>

      {/* Technical Spec & Launch Bar */}
      <div className="border border-[#2A2A2E] bg-[#111113] p-6 sm:p-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-[#2A2A2E] pb-6 mb-6 font-mono text-xs">
          <div>
            <div className="text-[10px] text-[#717176] uppercase tracking-wider mb-1">TARGET APPLICATION</div>
            <div className="text-[#F5F5F5] font-bold">Feedbackly Core</div>
          </div>
          <div>
            <div className="text-[10px] text-[#717176] uppercase tracking-wider mb-1">GENERATION STACK</div>
            <div className="text-[#F5F5F5] font-bold">Node · Express · SQLite</div>
          </div>
          <div>
            <div className="text-[10px] text-[#717176] uppercase tracking-wider mb-1">KNOWN VULNERABILITIES</div>
            <div className="text-[#FF4D4D] font-bold">4 Undetected</div>
          </div>
          <div>
            <div className="text-[10px] text-[#717176] uppercase tracking-wider mb-1">SECURITY STATUS</div>
            <div className="text-[#A0A0A5] font-bold">UNVERIFIED</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A0A0A5]">
            <Terminal size={14} className="text-[#717176]" />
            <span>Ready for security investigation walkthrough</span>
          </div>

          <button
            onClick={() => setState('FEEDBACK_APP')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-[#F5F5F5] text-[#0B0B0C] hover:bg-white font-mono text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
          >
            <span>LAUNCH APPLICATION</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Minimal Footer Note */}
      <div className="flex justify-between items-center text-[10px] font-mono text-[#717176] uppercase tracking-widest">
        <span>INTERACTIVE SIMULATION LAB</span>
        <span>ZERO EXTERNAL NETWORK EXPOSURE</span>
      </div>
    </motion.div>
  );
}
