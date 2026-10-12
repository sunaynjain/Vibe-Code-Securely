import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { RotateCcw } from 'lucide-react';

export default function Finale() {
  const { state, setState, reset } = useStore();

  useEffect(() => {
    if (state === 'FINAL_JOURNEY') {
      const timer = setTimeout(() => {
        setState('FINALE');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state, setState]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0B0B0C] fixed inset-0 z-[100] p-6">
      
      <AnimatePresence mode="wait">
        {state === 'FINAL_JOURNEY' && (
          <motion.div 
            key="journey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl flex flex-col items-center justify-center text-center font-mono"
          >
            <div className="border border-[#2A2A2E] bg-[#111113] p-10 sm:p-14 w-full flex flex-col items-center">
              <div className="text-[11px] text-[#717176] tracking-widest uppercase mb-8">
                JOURNEY VERIFICATION SUMMARY
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full text-xs font-bold text-[#F5F5F5] mb-8">
                <JourneyNode text="VIBE CODING" num="01" />
                <JourneyNode text="DISCOVER FLAWS" num="02" />
                <JourneyNode text="ROOT CAUSE" num="03" />
                <JourneyNode text="HARDEN CODE" num="04" />
                <JourneyNode text="VERIFIED PASS" num="05" isSuccess={true} />
              </div>

              <div className="text-xs text-[#A0A0A5]">
                TRANSITIONING TO FINAL PRINCIPLE...
              </div>
            </div>
          </motion.div>
        )}

        {state === 'FINALE' && (
          <motion.div 
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl flex flex-col items-center justify-center text-center p-6 sm:p-12"
          >
            <div className="flex items-center gap-2 px-3.5 py-1 border border-[#2A2A2E] text-[10px] font-mono tracking-widest text-[#717176] uppercase mb-12">
              <span>PRESENTATION CONCLUSION // VIBE CODED</span>
            </div>

            {/* Headline 1 */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#A0A0A5] mb-6 tracking-tight uppercase"
            >
              AI CAN WRITE THE CODE.
            </motion.h2>

            {/* Headline 2 */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#F5F5F5] mb-14 tracking-tight uppercase"
            >
              YOU HAVE TO EARN THE TRUST.
            </motion.h2>

            {/* Divider */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              className="w-32 h-px bg-[#2A2A2E] mb-14"
            />

            {/* Core Mantra */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 text-3xl sm:text-5xl font-black tracking-tight uppercase mb-14"
            >
              <span className="text-[#FF4D4D]">VIBE FAST.</span>
              <span className="text-[#54C79A]">THINK SECURE.</span>
            </motion.div>

            {/* Reset / Restart Demo Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5, duration: 0.8 }}
              className="flex flex-col items-center gap-4 font-mono"
            >
              <button
                onClick={reset}
                className="px-6 py-3 border border-[#2A2A2E] bg-[#111113] hover:border-[#F5F5F5] text-[#A0A0A5] hover:text-[#F5F5F5] text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer flex items-center gap-2"
              >
                <RotateCcw size={13} />
                <span>RESTART DEMONSTRATION</span>
              </button>
              
              <div className="text-[10px] text-[#717176] uppercase tracking-widest">
                DEMO SESSION COMPLETED · THANK YOU
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function JourneyNode({ text, num, isSuccess = false }: { text: string; num: string; isSuccess?: boolean }) {
  return (
    <div className={`p-4 border flex flex-col items-center gap-1.5 ${
      isSuccess 
        ? 'border-[#54C79A] bg-[rgba(84,199,154,0.06)] text-[#54C79A]' 
        : 'border-[#2A2A2E] bg-[#0B0B0C] text-[#A0A0A5]'
    }`}>
      <span className="text-[10px] text-[#717176]">{num}</span>
      <span className="text-[11px] font-bold text-center">{text}</span>
    </div>
  );
}
