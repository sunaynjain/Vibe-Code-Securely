import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { ShieldAlert, Terminal } from 'lucide-react';

export default function SecurityLabTransition() {
  const { setState } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setState('SECURITY_LAB');
    }, 2800);
    return () => clearTimeout(timer);
  }, [setState]);

  return (
    <div className="relative w-full max-w-4xl flex-1 flex flex-col items-center justify-center p-6 text-center font-mono">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full border border-[#FF4D4D] bg-[#111113] p-8 sm:p-12 relative"
      >
        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b border-[#2A2A2E] pb-4 mb-8 text-xs text-[#717176]">
          <div className="flex items-center gap-2 text-[#FF4D4D]">
            <Terminal size={14} />
            <span className="font-bold tracking-widest uppercase">AUDIT_SUITE_V2</span>
          </div>
          <span className="text-[#A0A0A5]">ISOLATION_SANDBOX // READY</span>
        </div>

        {/* Center Graphic & Statement */}
        <div className="flex flex-col items-center gap-6 py-6">
          <div className="w-16 h-16 border-2 border-[#FF4D4D] flex items-center justify-center text-[#FF4D4D]">
            <ShieldAlert size={32} />
          </div>

          <div>
            <div className="text-xs text-[#FF4D4D] font-bold tracking-widest uppercase mb-2">
              SECURITY AUDIT INITIALIZING
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F5F5F5] uppercase">
              DECONSTRUCTING FEEDBACKLY
            </h2>
          </div>

          <p className="text-sm text-[#A0A0A5] max-w-lg font-mono">
            Mounting local test harnesses for database layer, rendering pipeline, client environment, and access control.
          </p>

          {/* Stepper Progress */}
          <div className="w-full max-w-md border border-[#2A2A2E] bg-[#0B0B0C] p-3 text-left text-xs text-[#717176] flex flex-col gap-1.5 mt-2">
            <div className="flex items-center justify-between text-[#F5F5F5]">
              <span>[01] INJECT TEST HARNESS</span>
              <span className="text-[#54C79A]">DONE</span>
            </div>
            <div className="flex items-center justify-between text-[#F5F5F5]">
              <span>[02] MAP EXECUTION THREADS</span>
              <span className="text-[#54C79A]">DONE</span>
            </div>
            <div className="flex items-center justify-between text-[#FF4D4D]">
              <span className="animate-pulse">[03] ISOLATE 4 EXPLOITATION VECTORS</span>
              <span className="animate-pulse">MOUNTING...</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#2A2A2E] pt-4 mt-8 flex justify-between text-[10px] text-[#717176] uppercase">
          <span>TARGET: LOCALHOST_DEMO</span>
          <span>TRANSITIONING TO LAB...</span>
        </div>
      </motion.div>
    </div>
  );
}
