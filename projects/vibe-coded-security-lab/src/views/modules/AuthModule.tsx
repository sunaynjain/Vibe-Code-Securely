import React, { useState } from 'react';
import { useStore } from '../../store';
import { InvestigationLayout } from '../../components/InvestigationLayout';
import { CodeViewer, type CodeLine, FlowStep, FlowArrow } from '../../components/CodeViewer';
import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';

export default function AuthModule() {
  const { setAuthStatus, setState, authStatus } = useStore();
  const [isFixed, setIsFixed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const isVerified = authStatus === 'VERIFIED';

  const handleFixApplied = () => {
    setIsFixed(true);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setAuthStatus('VERIFIED');
    }, 1200);
  };

  const vulnerableLines: CodeLine[] = [
    { num: 1, code: 'app.get("/api/users/:id", async (req, res) => {' },
    { num: 2, code: '  // VULNERABILITY: NO RESOURCE OWNERSHIP CHECK' },
    { num: 3, code: '  const user = await db.get(' },
    { num: 4, code: '    "SELECT * FROM users WHERE id = ?",', isVulnerable: true, annotation: '← FETCHES ANY USER DATA WITHOUT CHECKING PERMISSIONS' },
    { num: 5, code: '    [req.params.id]', isVulnerable: true },
    { num: 6, code: '  );' },
    { num: 7, code: '' },
    { num: 8, code: '  res.json(user);' },
    { num: 9, code: '});' }
  ];

  const secureLines: CodeLine[] = [
    { num: 1, code: 'app.get("/api/users/:id", async (req, res) => {' },
    { num: 2, code: '' },
    { num: 3, code: '  // CHECK: DOES REQUESTOR OWN REQUESTED ID?' },
    { num: 4, code: '  if (req.user.id !== req.params.id) {', isSecure: true, annotation: '← EXPLICIT RESOURCE OWNERSHIP VERIFICATION' },
    { num: 5, code: '    return res.status(403).json({ error: "Forbidden" });', isSecure: true },
    { num: 6, code: '  }', isSecure: true },
    { num: 7, code: '' },
    { num: 8, code: '  const user = await db.get(' },
    { num: 9, code: '    "SELECT * FROM users WHERE id = ?", [req.params.id]' },
    { num: 10, code: '  );' },
    { num: 11, code: '  res.json(user);' },
    { num: 12, code: '});' }
  ];

  if (isVerified) {
    return (
      <InvestigationLayout 
        title="BROKEN AUTHORIZATION" 
        subtitle="Can authenticated users access other users' private records?" 
        severity="HIGH" 
        status="VERIFIED" 
        onBack={() => setState('SECURITY_LAB')}
        nextModuleTitle="COMPLETE SECURITY LAB"
        onContinue={() => setState('LAB_COMPLETE')}
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
              <h3 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tight">ACCESS CONTROL ENFORCED</h3>
            </div>

            <ul className="flex flex-col gap-3 text-left w-full text-xs text-[#A0A0A5] border-t border-b border-[#2A2A2E] py-4">
              <li className="flex items-center gap-2.5">
                <Check size={14} className="text-[#54C79A] shrink-0" />
                <span>Identity verified via session / token claims</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={14} className="text-[#54C79A] shrink-0" />
                <span>Resource ownership check: req.user.id === req.params.id</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={14} className="text-[#54C79A] shrink-0" />
                <span>IDOR exploit attempts terminate immediately with 403 Forbidden</span>
              </li>
            </ul>

            <div className="p-3 border border-[#2A2A2E] bg-[#0B0B0C] w-full text-[11px] text-[#717176] uppercase">
              STATUS: EXPLICIT OBJECT-LEVEL AUTHORIZATION ACTIVE
            </div>
          </div>
        </motion.div>
      </InvestigationLayout>
    );
  }

  return (
    <InvestigationLayout 
      title="BROKEN AUTHORIZATION" 
      subtitle="Can authenticated users access other users' private records?" 
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
          explanation="Authentication confirms 'who you are'. Authorization verifies 'what you have permission to do'. The endpoint assumes that any logged-in user is permitted to request any arbitrary user record by swapping the numeric ID."
          secureExplanation="The fix verifies object ownership before touching the database. If req.user.id does not match req.params.id, the server rejects the request immediately with an HTTP 403 Forbidden code."
          dataFlow={
            <div className="flex flex-col font-mono text-xs">
              <FlowStep text="USER AUTHENTICATED AS ID: 10" />
              <FlowArrow />
              <FlowStep text="REQUESTS GET /api/users/42" />
              <FlowArrow />
              <FlowStep text="SERVER SKIPS OWNERSHIP CHECK" isDanger />
              <FlowArrow />
              <FlowStep text="USER 42 RECORD LEAKED" isDanger />
            </div>
          }
          secureDataFlow={
            <div className="flex flex-col font-mono text-xs">
              <FlowStep text="USER AUTHENTICATED AS ID: 10" />
              <FlowArrow />
              <FlowStep text="REQUESTS GET /api/users/42" />
              <FlowArrow />
              <FlowStep text="CHECK: (req.user.id === req.params.id)?" isSuccess />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="border border-[#54C79A] bg-[rgba(84,199,154,0.08)] p-2 text-[10px] text-[#54C79A] text-center">
                  MATCH: 200 OK
                </div>
                <div className="border border-[#FF4D4D] bg-[rgba(255,77,77,0.08)] p-2 text-[10px] text-[#FF4D4D] text-center">
                  MISMATCH: 403 FORBIDDEN
                </div>
              </div>
            </div>
          }
        />
      </div>
    </InvestigationLayout>
  );
}
