import React, { useEffect } from 'react';
import { useStore, type AppState } from './store';
import { AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw, MonitorPlay } from 'lucide-react';

import Landing from './views/Landing';
import FeedbackApp from './views/FeedbackApp';
import Admin from './views/Admin';
import SecurityLabTransition from './views/SecurityLabTransition';
import SecurityLab from './views/SecurityLab';
import SqlModule from './views/modules/SqlModule';
import XssModule from './views/modules/XssModule';
import SecretModule from './views/modules/SecretModule';
import AuthModule from './views/modules/AuthModule';
import AIReview from './views/AIReview';
import FinalVerification from './views/FinalVerification';
import Finale from './views/Finale';
import LabComplete from './views/LabComplete';
import Playbook from './views/Playbook';

function App() {
  const { 
    state, 
    presentationMode, 
    soundEnabled, 
    setPresentationMode, 
    setSoundEnabled, 
    reset
  } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (presentationMode) {
        if (e.code === 'KeyR') {
          e.preventDefault();
          reset();
        } else if (e.code === 'Escape') {
          e.preventDefault();
          setPresentationMode(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode, reset, setPresentationMode]);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#0B0B0C] text-[#F5F5F5] selection:bg-[#F5F5F5] selection:text-[#0B0B0C]">
      
      {/* Precision Grid Background */}
      <div className="fixed inset-0 bg-grid opacity-25 pointer-events-none z-0"></div>

      {/* Top Bar - Swiss Minimalist Navigation */}
      {state !== 'FINALE' && state !== 'FINAL_JOURNEY' && (
        <header className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-[#2A2A2E] bg-[#0B0B0C] sticky top-0">
          {/* Left: Brand & Section */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-tight text-[#F5F5F5] flex items-center gap-2">
              <span className="text-base text-[#F5F5F5]">◇</span>
              <span>VIBE CODED</span>
            </span>
            <span className="text-[#2A2A2E]">/</span>
            <span className="text-[11px] font-mono tracking-widest text-[#717176] uppercase">
              SECURITY LAB
            </span>
          </div>
          
          {/* Center: Session Tag */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 border border-[#2A2A2E] text-[10px] font-mono font-medium tracking-widest text-[#A0A0A5] uppercase">
            <span>DEMO SESSION 01</span>
          </div>
          
          {/* Right: Status & Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 bg-[#54C79A]"></span>
              <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wider text-[#A0A0A5]">SYSTEM ONLINE</span>
            </div>
            
            <div className="h-3 w-px bg-[#2A2A2E]"></div>

            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-[#717176] hover:text-[#F5F5F5] transition-colors cursor-pointer p-1"
              title={soundEnabled ? "Mute sound" : "Enable sound"}
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center p-4 py-8 sm:p-6 lg:p-10">
        <AnimatePresence mode="wait">
          {renderState(state)}
        </AnimatePresence>
      </main>

      {/* Presenter Controls - Sharp Swiss Geometric Buttons */}
      <div className={`fixed bottom-4 right-4 z-50 flex gap-1.5 transition-opacity duration-300 ${presentationMode ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
        <button 
          onClick={reset}
          className="p-2 bg-[#111113] border border-[#2A2A2E] text-[#A0A0A5] hover:text-[#F5F5F5] hover:border-[#F5F5F5] transition-colors cursor-pointer"
          title="Reset Demo (R)"
          aria-label="Reset Demo"
        >
          <RotateCcw size={15} />
        </button>
        <button 
          onClick={() => setPresentationMode(!presentationMode)}
          className={`p-2 border transition-colors cursor-pointer ${presentationMode ? 'bg-[#F5F5F5] text-[#0B0B0C] border-[#F5F5F5]' : 'bg-[#111113] border-[#2A2A2E] text-[#A0A0A5] hover:text-[#F5F5F5] hover:border-[#F5F5F5]'}`}
          title="Presentation Mode (ESC to exit)"
          aria-label="Toggle Presentation Mode"
        >
          <MonitorPlay size={15} />
        </button>
      </div>

    </div>
  );
}

function renderState(state: AppState) {
  switch (state) {
    case 'LANDING':
      return <Landing key="landing" />;
    case 'FEEDBACK_APP':
    case 'FEEDBACK_SUBMITTED':
      return <FeedbackApp key="feedback" />;
    case 'ADMIN':
      return <Admin key="admin" />;
    case 'SECURITY_LAB_TRANSITION':
      return <SecurityLabTransition key="transition" />;
    case 'SECURITY_LAB':
      return <SecurityLab key="lab" />;
    case 'SQL_INVESTIGATION':
    case 'SQL_ATTACK':
    case 'SQL_EXPLANATION':
    case 'SQL_FIX':
    case 'SQL_VERIFIED':
      return <SqlModule key="sql" />;
    case 'XSS_INVESTIGATION':
    case 'XSS_ATTACK':
    case 'XSS_EXPLANATION':
    case 'XSS_FIX':
    case 'XSS_VERIFIED':
      return <XssModule key="xss" />;
    case 'SECRET_INVESTIGATION':
    case 'SECRET_FOUND':
    case 'SECRET_FIXED':
      return <SecretModule key="secret" />;
    case 'AUTH_INVESTIGATION':
    case 'AUTH_ATTACK':
    case 'AUTH_FIXED':
      return <AuthModule key="auth" />;
    case 'AI_REVIEW':
    case 'SECURITY_PROMPT':
    case 'SECURITY_PIPELINE':
      return <AIReview key="ai" />;
    case 'FINAL_VERIFICATION':
    case 'BEFORE_AFTER':
      return <FinalVerification key="final-verif" />;
    case 'FINAL_JOURNEY':
    case 'FINALE':
      return <Finale key="finale" />;
    case 'LAB_COMPLETE':
      return <LabComplete key="lab-complete" />;
    case 'PLAYBOOK':
      return <Playbook key="playbook" />;
    default:
      return <Landing key="default" />;
  }
}

export default App;
