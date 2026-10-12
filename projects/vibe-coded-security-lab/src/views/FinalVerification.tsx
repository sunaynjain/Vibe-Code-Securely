import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { Check, ShieldAlert, ArrowRight } from 'lucide-react';

export default function FinalVerification() {
  const { state, setState } = useStore();
  const [completedTests, setCompletedTests] = useState(0);

  useEffect(() => {
    if (state === 'FINAL_VERIFICATION') {
      const interval = setInterval(() => {
        setCompletedTests(prev => {
          if (prev >= 4) {
            clearInterval(interval);
            setTimeout(() => setState('BEFORE_AFTER'), 1500);
            return prev;
          }
          return prev + 1;
        });
      }, 600);
      return () => clearInterval(interval);
    }
  }, [state, setState]);

  return (
    <div className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center p-4 sm:p-8 font-mono">
      
      <AnimatePresence mode="wait">
        {state === 'FINAL_VERIFICATION' && (
          <motion.div 
            key="verif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center gap-8 max-w-3xl"
          >
            <div className="text-center">
              <div className="text-[10px] text-[#717176] uppercase tracking-widest mb-1">RE-TESTING PIPELINE</div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] uppercase tracking-tight mb-2">SECURITY VERIFICATION</h2>
              <p className="text-xs text-[#A0A0A5]">Executing identical penetration test vectors against patched endpoints.</p>
            </div>

            <div className="border border-[#2A2A2E] bg-[#111113] divide-y divide-[#2A2A2E] w-full">
               <TestModule num="01" name="SQL INJECTION HARNESS" isComplete={completedTests > 0} />
               <TestModule num="02" name="STORED XSS DOM EVALUATION" isComplete={completedTests > 1} />
               <TestModule num="03" name="CLIENT SECRET SCANNER" isComplete={completedTests > 2} />
               <TestModule num="04" name="IDOR AUTHORIZATION CHECK" isComplete={completedTests > 3} />
            </div>

            {completedTests >= 4 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 border border-[#54C79A] bg-[rgba(84,199,154,0.08)] text-xs font-bold text-[#54C79A] uppercase tracking-widest flex items-center gap-2"
              >
                <Check size={14} />
                <span>ALL 4 ATTACK VECTORS BLOCKED BY SECURITY CONTROLS</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {state === 'BEFORE_AFTER' && (
          <motion.div 
            key="comparison"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl flex flex-col gap-8"
          >
            <div className="text-center border-b border-[#2A2A2E] pb-4">
              <div className="text-[10px] text-[#717176] uppercase tracking-widest mb-1">ARCHITECTURE AUDIT</div>
              <h3 className="text-2xl sm:text-4xl font-black text-[#F5F5F5] uppercase tracking-tight">BEFORE & AFTER</h3>
            </div>

            <div className="border border-[#2A2A2E] bg-[#111113] divide-y divide-[#2A2A2E]">
               <ComparisonRow num="01" bad="Concatenated String Queries" good="Parameterized Prepared Statements" />
               <ComparisonRow num="02" bad="Raw innerHTML Injection" good="textContent Sanitized Nodes" />
               <ComparisonRow num="03" bad="Client-Bundled API Keys" good="Server Environment Isolation" />
               <ComparisonRow num="04" bad="Unchecked Object Access" good="Explicit Identity Authorization" />
            </div>

            <div className="flex justify-center mt-4">
              <button 
                onClick={() => setState('PLAYBOOK')}
                className="px-8 py-3.5 bg-[#F5F5F5] text-[#0B0B0C] hover:bg-white font-mono text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>OPEN SECURE VIBE CODING PLAYBOOK</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TestModule({ num, name, isComplete }: { num: string; name: string; isComplete: boolean }) {
  return (
    <div className="p-4 px-6 flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <span className="text-[#717176] font-bold">{num}</span>
        <span className={isComplete ? 'text-[#F5F5F5] font-bold' : 'text-[#A0A0A5]'}>{name}</span>
      </div>
      {isComplete ? (
        <span className="text-[#54C79A] font-bold flex items-center gap-1.5 text-[11px]">
          <Check size={13} />
          <span>PASSED / BLOCKED</span>
        </span>
      ) : (
        <span className="text-[#717176] animate-pulse text-[11px]">TESTING...</span>
      )}
    </div>
  );
}

function ComparisonRow({ num, bad, good }: { num: string; bad: string; good: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#2A2A2E] text-xs">
      <div className="p-4 px-6 bg-[#111113] flex items-center gap-3 text-[#FF4D4D]">
        <span className="text-[#717176]">{num}</span>
        <ShieldAlert size={14} className="shrink-0" />
        <span className="line-through opacity-80">{bad}</span>
      </div>
      <div className="p-4 px-6 bg-[#141417] flex items-center gap-3 text-[#54C79A] font-bold">
        <Check size={14} className="shrink-0" />
        <span>{good}</span>
      </div>
    </div>
  );
}
