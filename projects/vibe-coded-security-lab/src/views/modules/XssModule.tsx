import React, { useState } from 'react';
import { useStore } from '../../store';
import { InvestigationLayout } from '../../components/InvestigationLayout';
import { CodeViewer, type CodeLine, FlowStep, FlowArrow } from '../../components/CodeViewer';
import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';

export default function XssModule() {
  const { setXssStatus, setState, xssStatus } = useStore();
  const [isFixed, setIsFixed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const isVerified = xssStatus === 'VERIFIED';

  const handleFixApplied = () => {
    setIsFixed(true);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setXssStatus('VERIFIED');
    }, 1200);
  };

  const vulnerableLines: CodeLine[] = [
    { num: 1, code: 'const feedback = req.body.feedback;' },
    { num: 2, code: '' },
    { num: 3, code: '// SAVE UNESCAPED TO DB' },
    { num: 4, code: 'db.run("INSERT INTO feedback (message) VALUES (?)", [feedback]);' },
    { num: 5, code: '' },
    { num: 6, code: '// RENDER AS RAW HTML IN BROWSER' },
    { num: 7, code: 'feedbackList.innerHTML +=' },
    { num: 8, code: '  `<div>${feedback}</div>`;', isVulnerable: true, annotation: '← UNTRUSTED CONTENT RENDERED AS RAW HTML' }
  ];

  const secureLines: CodeLine[] = [
    { num: 1, code: 'const feedback = req.body.feedback;' },
    { num: 2, code: '' },
    { num: 3, code: '// SAVE TO DB' },
    { num: 4, code: 'db.run("INSERT INTO feedback (message) VALUES (?)", [feedback]);' },
    { num: 5, code: '' },
    { num: 6, code: '// RENDER SAFELY AS TEXT NODE' },
    { num: 7, code: 'const message = document.createElement("div");', isSecure: true },
    { num: 8, code: 'message.textContent = feedback;', isSecure: true, annotation: '← CONTENT ENFORCED AS PURE TEXT' },
    { num: 9, code: 'feedbackList.appendChild(message);', isSecure: true }
  ];

  if (isVerified) {
    return (
      <InvestigationLayout 
        title="STORED XSS" 
        subtitle="Can user-controlled content execute inside another user's browser?" 
        severity="HIGH" 
        status="VERIFIED" 
        onBack={() => setState('SECURITY_LAB')}
        nextModuleTitle="EXPOSED SECRET"
        onContinue={() => setState('SECRET_INVESTIGATION')}
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
              <h3 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tight">STORED XSS MITIGATED</h3>
            </div>

            <ul className="flex flex-col gap-3 text-left w-full text-xs text-[#A0A0A5] border-t border-b border-[#2A2A2E] py-4">
              <li className="flex items-center gap-2.5">
                <Check size={14} className="text-[#54C79A] shrink-0" />
                <span>HTML markup parsing disabled for user content</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={14} className="text-[#54C79A] shrink-0" />
                <span>DOM textContent forces string evaluation without script triggers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={14} className="text-[#54C79A] shrink-0" />
                <span>Client session and cookie storage protected against script theft</span>
              </li>
            </ul>

            <div className="p-3 border border-[#2A2A2E] bg-[#0B0B0C] w-full text-[11px] text-[#717176] uppercase">
              STATUS: TEXT NODE CONSTRAINTS ENFORCED
            </div>
          </div>
        </motion.div>
      </InvestigationLayout>
    );
  }

  return (
    <InvestigationLayout 
      title="STORED XSS" 
      subtitle="Can user-controlled content execute inside another user's browser?" 
      severity="HIGH" 
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
          explanation="The application inserts raw stored text directly into innerHTML. If a submitted comment contains script tags or onerror event handlers, the victim's browser executes that script with full session authority."
          secureExplanation="Replacing innerHTML with textContent instructs the browser engine to treat incoming characters purely as text nodes. HTML entities remain unrendered and harmless."
          dataFlow={
            <div className="flex flex-col font-mono">
              <FlowStep text="MALICIOUS PAYLOAD" />
              <FlowArrow />
              <FlowStep text="STORED IN DATABASE" />
              <FlowArrow />
              <FlowStep text="innerHTML ASSIGNMENT" isDanger />
              <FlowArrow />
              <FlowStep text="BROWSER EXECUTES SCRIPT" isDanger />
            </div>
          }
          secureDataFlow={
            <div className="flex flex-col font-mono">
              <FlowStep text="USER CONTENT" />
              <FlowArrow />
              <FlowStep text="STORED IN DATABASE" />
              <FlowArrow />
              <FlowStep text="textContent ASSIGNMENT" isSuccess />
              <FlowArrow />
              <FlowStep text="RENDERED AS LITERAL TEXT" isSuccess />
            </div>
          }
        />
      </div>
    </InvestigationLayout>
  );
}
