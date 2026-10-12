import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { ArrowRight, Check, Database, Server, Smartphone } from 'lucide-react';

export default function FeedbackApp() {
  const { state, setState } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setState('FEEDBACK_SUBMITTED');
      setIsSubmitting(false);
      
      setTimeout(() => {
        setState('ADMIN');
      }, 2500);
      
    }, 1200);
  };

  const isSubmitted = state === 'FEEDBACK_SUBMITTED';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-5xl flex-1 flex flex-col items-center justify-center p-4 sm:p-8"
    >
      {/* Top Architecture Pipeline - Swiss Technical Schematic */}
      <div className="w-full max-w-3xl mb-8 border border-[#2A2A2E] bg-[#111113] p-4 hidden md:flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-[#2A2A2E] bg-[#19191C] text-[#F5F5F5]">
            <Smartphone size={16} />
          </div>
          <div>
            <div className="text-[10px] text-[#717176] uppercase">SOURCE</div>
            <div className="font-semibold text-[#F5F5F5]">CLIENT (WEB)</div>
          </div>
        </div>

        <div className="flex-1 px-4 flex items-center">
          <div className="w-full h-px bg-[#2A2A2E] relative">
            {isSubmitting && (
              <motion.div 
                initial={{ left: '0%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#F5F5F5]"
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 border border-[#2A2A2E] bg-[#19191C] text-[#F5F5F5]">
            <Server size={16} />
          </div>
          <div>
            <div className="text-[10px] text-[#717176] uppercase">ROUTER</div>
            <div className="font-semibold text-[#F5F5F5]">EXPRESS API</div>
          </div>
        </div>

        <div className="flex-1 px-4 flex items-center">
          <div className="w-full h-px bg-[#2A2A2E] relative">
            {isSubmitting && (
              <motion.div 
                initial={{ left: '0%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 0.6, delay: 0.3, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#F5F5F5]"
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 border border-[#2A2A2E] bg-[#19191C] text-[#F5F5F5]">
            <Database size={16} />
          </div>
          <div>
            <div className="text-[10px] text-[#717176] uppercase">STORAGE</div>
            <div className="font-semibold text-[#F5F5F5]">SQL DATABASE</div>
          </div>
        </div>
      </div>

      {/* Main Software Window - Vercel / Swiss Editorial Frame */}
      <div className="relative z-10 w-full max-w-[520px] bg-[#111113] border border-[#2A2A2E] shadow-none">
        
        {/* Software Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#2A2A2E] bg-[#19191C]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-[#F5F5F5]"></span>
            <span className="font-mono text-xs font-bold text-[#F5F5F5] tracking-widest uppercase">FEEDBACKLY / CLIENT FORM</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#A0A0A5]">
            <span className="inline-block w-1.5 h-1.5 bg-[#54C79A]"></span>
            <span>PORT 3000 · ONLINE</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="border-b border-[#2A2A2E] pb-3 mb-1">
                  <h2 className="text-xl font-bold tracking-tight text-[#F5F5F5]">STUDENT FEEDBACK</h2>
                  <p className="text-xs text-[#A0A0A5] mt-1">Submit remarks regarding the recent seminar and workshop session.</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono text-[#A0A0A5] tracking-wider uppercase">FULL NAME</label>
                  <input 
                    type="text" 
                    defaultValue="Sunay Jain"
                    required
                    className="w-full bg-[#0B0B0C] border border-[#2A2A2E] px-3.5 py-2.5 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#F5F5F5] transition-colors font-mono"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono text-[#A0A0A5] tracking-wider uppercase">STUDENT EMAIL</label>
                  <input 
                    type="email" 
                    defaultValue="sunay@demo.local"
                    required
                    className="w-full bg-[#0B0B0C] border border-[#2A2A2E] px-3.5 py-2.5 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#F5F5F5] transition-colors font-mono"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono text-[#A0A0A5] tracking-wider uppercase">FEEDBACK COMMENT</label>
                  <textarea 
                    rows={4}
                    defaultValue="Really enjoyed the cybersecurity seminar."
                    required
                    className="w-full bg-[#0B0B0C] border border-[#2A2A2E] px-3.5 py-2.5 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#F5F5F5] transition-colors font-mono resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 flex items-center justify-center gap-2.5 w-full bg-[#F5F5F5] text-[#0B0B0C] font-mono text-xs font-bold tracking-widest py-3 hover:bg-white transition-colors cursor-pointer uppercase disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="font-mono">DISPATCHING PACKET...</span>
                  ) : (
                    <>
                      <span>TRANSMIT RESPONSE</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
                
                <div className="flex items-center justify-between pt-2 border-t border-[#2A2A2E] text-[10px] font-mono text-[#717176]">
                  <span>SQLITE SYNC ENABLED</span>
                  <span>SESSION: GUEST_STUDENT</span>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 gap-4 text-center font-mono"
              >
                <div className="w-12 h-12 border border-[#54C79A] bg-[rgba(84,199,154,0.1)] text-[#54C79A] flex items-center justify-center">
                  <Check size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5F5F5] uppercase tracking-wider">RESPONSE RECORDED</h3>
                  <p className="text-xs text-[#A0A0A5] mt-1">Payload stored in table 'feedback'. Routing to Administrator Console...</p>
                </div>
                <div className="mt-4 px-3 py-1 border border-[#2A2A2E] text-[10px] text-[#717176] uppercase">
                  AUTO-NAVIGATING IN 2s
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
