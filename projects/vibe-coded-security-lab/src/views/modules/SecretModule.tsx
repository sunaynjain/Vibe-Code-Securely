import React, { useState } from 'react';
import { useStore } from '../../store';
import { InvestigationLayout } from '../../components/InvestigationLayout';
import { CodeViewer, type CodeLine, FlowStep, FlowArrow } from '../../components/CodeViewer';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Eye } from 'lucide-react';

export default function SecretModule() {
  const { setSecretStatus, setState, secretStatus } = useStore();
  const [isFixed, setIsFixed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const isVerified = secretStatus === 'VERIFIED';

  const handleFixApplied = () => {
    setIsFixed(true);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setSecretStatus('VERIFIED');
    }, 1200);
  };

  const vulnerableLines: CodeLine[] = [
    { num: 1, code: '// client.js — SHIPPED IN BUNDLE TO BROWSER' },
    { 
      num: 2, 
      code: `const API_KEY = "${isRevealed ? 'sk_live_9f823a01bce47d' : '••••••••••••••••••••'}";`, 
      isVulnerable: true, 
      annotation: '← HARDCODED SECRET VISIBLE IN CLIENT JS BUNDLE' 
    },
    { num: 3, code: '' },
    { num: 4, code: 'fetch("https://api.external.com/telemetry", {' },
    { num: 5, code: '  headers: {' },
    { num: 6, code: '    Authorization: `Bearer ${API_KEY}`' },
    { num: 7, code: '  }' },
    { num: 8, code: '});' }
  ];

  const secureLines: CodeLine[] = [
    { num: 1, code: '// server.js — STAYS SECURE IN BACKEND ENVIRONMENT' },
    { num: 2, code: 'const API_KEY = process.env.API_KEY;', isSecure: true, annotation: '← SECRET BOUND TO SERVER ENVIRONMENT VARIABLE' },
    { num: 3, code: '' },
    { num: 4, code: 'app.get("/api/telemetry", async (req, res) => {' },
    { num: 5, code: '  const response = await fetch("https://api.external.com/telemetry", {' },
    { num: 6, code: '    headers: { Authorization: `Bearer ${API_KEY}` }' },
    { num: 7, code: '  });' },
    { num: 8, code: '  res.json(await response.json());' },
    { num: 9, code: '});' },
    { num: 10, code: '' },
    { num: 11, code: '// client.js — NO CREDENTIAL EXPOSED' },
    { num: 12, code: 'fetch("/api/telemetry");', isSecure: true }
  ];

  if (isVerified) {
    return (
      <InvestigationLayout 
        title="EXPOSED SECRET" 
        subtitle="Can sensitive credentials be discovered inside client bundles?" 
        severity="CRITICAL" 
        status="VERIFIED" 
        onBack={() => setState('SECURITY_LAB')}
        nextModuleTitle="BROKEN AUTHORIZATION"
        onContinue={() => setState('AUTH_INVESTIGATION')}
      >
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center p-8 sm:p-14 text-center h-full flex-1 gap-6 font-mono"
        >
          <div className="w-full max-w-xl border border-[#54C79A] bg-[#111113] p-8 sm:p-10 flex flex-col items-center gap-6">
            <div className="w-12 h-12 border border-[#54C79A] bg-[rgba(84,199,154,0.1)] text-[#54C79A] flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>

            <div>
              <div className="text-[10px] text-[#54C79A] font-bold tracking-widest uppercase mb-1">AUDIT VERIFICATION PASSED</div>
              <h3 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tight">API SECRETS ISOLATED</h3>
            </div>

            <ul className="flex flex-col gap-3 text-left w-full text-xs text-[#A0A0A5] border-t border-b border-[#2A2A2E] py-4">
              <li className="flex items-center gap-2.5">
                <Check size={14} className="text-[#54C79A] shrink-0" />
                <span>Zero private credentials bundled into client JavaScript</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={14} className="text-[#54C79A] shrink-0" />
                <span>Backend proxy acts as credential boundary for 3rd-party APIs</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={14} className="text-[#54C79A] shrink-0" />
                <span>Secrets isolated inside environment variables (process.env)</span>
              </li>
            </ul>

            <div className="p-3 border border-[#2A2A2E] bg-[#0B0B0C] w-full text-[11px] text-[#717176] uppercase">
              STATUS: SERVER-SIDE PROXY CONFIGURED
            </div>
          </div>
        </motion.div>
      </InvestigationLayout>
    );
  }

  return (
    <InvestigationLayout 
      title="EXPOSED SECRET" 
      subtitle="Can sensitive credentials be discovered inside client bundles?" 
      severity="CRITICAL" 
      status={isVerifying ? 'VERIFYING' : 'UNVERIFIED'} 
      onBack={() => setState('SECURITY_LAB')}
    >
      <div className="flex flex-col gap-6 w-full mt-2">
        {isFixed && !isVerifying && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
            <button 
              onClick={handleVerify}
              className="px-8 py-3.5 bg-[#F5F5F5] text-[#0B0B0C] hover:bg-white font-mono text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer border border-[#F5F5F5]"
            >
              RUN VERIFICATION HARNESS →
            </button>
          </motion.div>
        )}

        <CodeViewer 
          vulnerableLines={vulnerableLines}
          secureLines={secureLines}
          onFixApplied={handleFixApplied}
          isFixed={isFixed}
          explanation={
            <div className="flex flex-col gap-3 font-mono text-xs">
              <p className="text-[#F5F5F5] font-sans text-sm">
                Sensitive private keys must never be shipped to the client browser. Anyone opening Browser DevTools or inspecting network bundles can steal hardcoded credentials.
              </p>
              {!isFixed && !isRevealed && (
                <button 
                  onClick={() => setIsRevealed(true)}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 bg-[#19191C] border border-[#FF4D4D] text-[#FF4D4D] text-xs font-bold tracking-widest hover:bg-[rgba(255,77,77,0.1)] transition-colors cursor-pointer uppercase"
                >
                  <Eye size={13} /> 
                  <span>REVEAL CLIENT LEAK</span>
                </button>
              )}
              {!isFixed && isRevealed && (
                <div className="p-2 border border-[#FF4D4D] bg-[rgba(255,77,77,0.08)] text-[#FF4D4D] text-[11px]">
                  CLIENT AUDIT: Plaintext key exposed in production asset bundle.
                </div>
              )}
            </div>
          }
          secureExplanation="The server handles third-party API communication. The client requests data from your internal endpoint (/api/telemetry), and the backend attaches secrets held strictly in process.env."
          dataFlow={
            <div className="flex flex-col font-mono">
              <FlowStep text="API SECRET TOKEN" />
              <FlowArrow />
              <FlowStep text="HARDCODED IN CLIENT JS" isDanger />
              <FlowArrow />
              <FlowStep text="SHIPPED IN BUNDLE TO BROWSER" isDanger />
              <FlowArrow />
              <FlowStep text="EXTRACTED VIA DEVTOOLS" isDanger />
            </div>
          }
          secureDataFlow={
            <div className="flex flex-col font-mono">
              <FlowStep text="BROWSER REQUESTS /api/telemetry" />
              <FlowArrow />
              <FlowStep text="YOUR SERVER (INTERNAL)" isSuccess />
              <FlowArrow />
              <FlowStep text="SECRET INJECTED FROM process.env" isSuccess />
              <FlowArrow />
              <FlowStep text="DISPATCH TO 3RD PARTY API" />
            </div>
          }
        />
      </div>
    </InvestigationLayout>
  );
}
