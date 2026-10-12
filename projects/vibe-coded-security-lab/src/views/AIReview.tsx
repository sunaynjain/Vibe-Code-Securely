import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export default function AIReview() {
  const { state, setState } = useStore();

  useEffect(() => {
    if (state === 'AI_REVIEW') {
      const timer = setTimeout(() => {
        setState('SECURITY_PROMPT');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [state, setState]);

  return (
    <div className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center p-4 sm:p-8 font-mono">
      
      <AnimatePresence mode="wait">
        
        {state === 'AI_REVIEW' && (
          <motion.div 
            key="review"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8 w-full max-w-3xl"
          >
            <div className="text-center">
              <div className="text-[10px] text-[#717176] uppercase tracking-widest mb-2">SYSTEM AUDIT</div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] uppercase tracking-tight mb-2">AI SECURITY REVIEW</h2>
              <p className="text-xs sm:text-sm text-[#A0A0A5]">Benchmarking generated application against modern OWASP threat models.</p>
            </div>

            <div className="w-full border border-[#2A2A2E] bg-[#111113] p-6 sm:p-8">
               <div className="flex items-center justify-between border-b border-[#2A2A2E] pb-3 mb-6 text-xs">
                 <div className="flex items-center gap-2 text-[#FF4D4D] font-bold">
                   <span className="w-2 h-2 bg-[#FF4D4D] animate-pulse"></span>
                   <span>ANALYZING CODEBASE ARTIFACTS...</span>
                 </div>
                 <span className="text-[#717176]">5 CHECKS PERFORMED</span>
               </div>

               <div className="flex flex-col border border-[#2A2A2E] divide-y divide-[#2A2A2E]">
                 <Issue delay={0.2} text="SQL Injection (String Concatenation in Login)" isCritical={true} />
                 <Issue delay={0.4} text="Stored XSS (Raw innerHTML Assignment)" isCritical={true} />
                 <Issue delay={0.6} text="Hardcoded Secret (Client JS Bundle Leak)" isCritical={true} />
                 <Issue delay={0.8} text="Broken Authorization (Missing IDOR Verification)" isCritical={true} />
                 <Issue delay={1.0} text="Missing Security Headers (CSP & HSTS absent)" isCritical={false} />
               </div>
            </div>
          </motion.div>
        )}

        {state === 'SECURITY_PROMPT' && (
          <motion.div 
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl"
          >
            <div className="border border-[#2A2A2E] bg-[#111113]">
              <div className="bg-[#19191C] px-6 py-3.5 border-b border-[#2A2A2E] flex items-center justify-between">
                <span className="text-xs font-bold text-[#F5F5F5] tracking-widest uppercase">SPECIFICATION DIRECTIVE / SECURITY-FIRST PROMPT</span>
                <span className="text-[10px] text-[#717176]">REWRITE RULES</span>
              </div>
              
              <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm leading-loose text-[#A0A0A5] divide-y divide-[#2A2A2E]/50">
                <div className="py-1 text-[#F5F5F5]">1. Review application with security as a primary functional requirement.</div>
                <div className="py-1">2. Enforce parameterized queries across all database drivers.</div>
                <div className="py-1">3. Never concatenate untrusted user input into query strings.</div>
                <div className="py-1">4. Sanitize and validate input on server boundaries.</div>
                <div className="py-1">5. Render user-controlled content strictly as safe text nodes.</div>
                <div className="py-1">6. Isolate secrets in server-side environment variables.</div>
                <div className="py-1">7. Enforce object-level resource ownership checks on protected routes.</div>
              </div>

              <div className="bg-[#0B0B0C] p-4 border-t border-[#2A2A2E] flex justify-end">
                <button 
                  onClick={() => setState('PLAYBOOK')}
                  className="px-6 py-3 bg-[#F5F5F5] text-[#0B0B0C] hover:bg-white font-mono text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
                >
                  PROCEED TO PLAYBOOK →
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

function Issue({ delay, text, isCritical }: { delay: number; text: string; isCritical: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center justify-between p-3.5 bg-[#0B0B0C] text-xs font-mono"
    >
      <div className="flex items-center gap-3">
        {isCritical ? (
          <ShieldAlert size={14} className="text-[#FF4D4D] shrink-0" />
        ) : (
          <AlertTriangle size={14} className="text-[#A0A0A5] shrink-0" />
        )}
        <span className="text-[#F5F5F5]">{text}</span>
      </div>
      <span className={isCritical ? 'text-[#FF4D4D] font-bold text-[10px]' : 'text-[#717176] text-[10px]'}>
        {isCritical ? 'CRITICAL' : 'WARNING'}
      </span>
    </motion.div>
  );
}
