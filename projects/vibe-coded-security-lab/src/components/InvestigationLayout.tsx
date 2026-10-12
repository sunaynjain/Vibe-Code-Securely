import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';

interface InvestigationLayoutProps {
  title: string;
  subtitle: string;
  severity: string;
  status: 'UNVERIFIED' | 'VERIFYING' | 'VERIFIED';
  onBack: () => void;
  nextModuleTitle?: string;
  onContinue?: () => void;
  children: React.ReactNode;
}

export function InvestigationLayout({ 
  title, 
  subtitle, 
  severity, 
  status, 
  onBack, 
  nextModuleTitle, 
  onContinue, 
  children 
}: InvestigationLayoutProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleContinue = () => {
    if (!onContinue) return;
    setIsTransitioning(true);
    setTimeout(() => {
      onContinue();
    }, 1400);
  };

  if (isTransitioning) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center p-8 font-mono text-center"
      >
        <div className="w-full border border-[#2A2A2E] bg-[#111113] p-10 sm:p-14 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-[#54C79A] text-xs font-bold tracking-widest uppercase">
            <Check size={16} />
            <span>EXPLOIT RESOLVED & TESTED</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] uppercase tracking-tight">
            {title} VERIFIED
          </h2>

          <div className="text-[#717176] my-2">↓</div>

          <div>
            <div className="text-[10px] text-[#717176] tracking-widest uppercase mb-1">PROCEEDING TO</div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] uppercase tracking-wider">
              {nextModuleTitle === 'COMPLETE SECURITY LAB' ? 'LAB FINAL SUMMARY' : nextModuleTitle}
            </h3>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-[#717176]">
            <span className="inline-block w-2 h-2 bg-[#54C79A] animate-pulse"></span>
            <span>MOUNTING WORKSPACE...</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-6xl flex-1 flex flex-col p-4 sm:p-6 lg:p-8 relative">
      
      {/* Top Breadcrumb & Metadata Header */}
      <div className="border-b border-[#2A2A2E] pb-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="text-[#A0A0A5] hover:text-[#F5F5F5] flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>BACK TO LAB INDEX</span>
          </button>
          
          <span className="font-mono text-[11px] text-[#717176] uppercase">
            SOURCE CODE INSPECTOR
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight uppercase">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-[#A0A0A5] font-normal max-w-3xl">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Structured Technical Status Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#2A2A2E] bg-[#111113] divide-x divide-[#2A2A2E] font-mono text-xs mb-8">
        <div className="p-3 px-4">
          <div className="text-[10px] text-[#717176] uppercase tracking-wider">VULNERABILITY</div>
          <div className="text-[#F5F5F5] font-bold truncate mt-0.5">{title}</div>
        </div>
        <div className="p-3 px-4">
          <div className="text-[10px] text-[#717176] uppercase tracking-wider">SEVERITY RATING</div>
          <div className="text-[#FF4D4D] font-bold mt-0.5">{severity}</div>
        </div>
        <div className="p-3 px-4">
          <div className="text-[10px] text-[#717176] uppercase tracking-wider">INVESTIGATION STATUS</div>
          <div className="mt-0.5 font-bold flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 ${
              status === 'VERIFIED' ? 'bg-[#54C79A]' : status === 'VERIFYING' ? 'bg-[#F5F5F5] animate-ping' : 'bg-[#FF4D4D]'
            }`}></span>
            <span className={status === 'VERIFIED' ? 'text-[#54C79A]' : status === 'VERIFYING' ? 'text-[#F5F5F5]' : 'text-[#A0A0A5]'}>
              {status}
            </span>
          </div>
        </div>
        <div className="p-3 px-4">
          <div className="text-[10px] text-[#717176] uppercase tracking-wider">ORIGIN</div>
          <div className="text-[#A0A0A5] font-bold mt-0.5">AI-GENERATED</div>
        </div>
      </div>

      {/* Main Workspace (Children) */}
      <div className="flex-1 w-full flex flex-col relative">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </div>

      {/* Bottom Sticky Action Bar when Verified */}
      <AnimatePresence>
        {status === 'VERIFIED' && nextModuleTitle && onContinue && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="sticky bottom-4 z-40 mt-8 p-4 bg-[#111113] border border-[#54C79A] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#54C79A] text-[#0B0B0C] flex items-center justify-center font-bold">
                <Check size={14} />
              </div>
              <div className="text-xs">
                <span className="text-[#54C79A] font-bold">{title} FULLY MITIGATED.</span>
                <span className="text-[#A0A0A5] hidden sm:inline ml-2">Verification checks passed successfully.</span>
              </div>
            </div>

            <button 
              onClick={handleContinue}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#F5F5F5] text-[#0B0B0C] hover:bg-white font-mono text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{nextModuleTitle === 'COMPLETE SECURITY LAB' ? 'COMPLETE SECURITY LAB' : `CONTINUE TO ${nextModuleTitle}`}</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
