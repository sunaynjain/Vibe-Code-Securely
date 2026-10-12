import React, { useState } from 'react';
import { useStore } from '../../store';
import { InvestigationLayout } from '../../components/InvestigationLayout';
import { CodeViewer, type CodeLine, FlowStep, FlowArrow } from '../../components/CodeViewer';
import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';

export default function SqlModule() {
  const { setSqlStatus, setState, sqlStatus } = useStore();
  const [isFixed, setIsFixed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const isVerified = sqlStatus === 'VERIFIED';

  const handleFixApplied = () => {
    setIsFixed(true);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setSqlStatus('VERIFIED');
    }, 1200);
  };

  const vulnerableLines: CodeLine[] = [
    { num: 1, code: 'app.post("/api/login", (req, res) => {' },
    { num: 2, code: '  const userInput = req.body.email;' },
    { num: 3, code: '' },
    { num: 4, code: '  const query = ' },
    { num: 5, code: '    "SELECT * FROM users WHERE email = \'" + userInput + "\'";', isVulnerable: true, annotation: '← USER INPUT IS DIRECTLY CONCATENATED INTO SQL' },
    { num: 6, code: '' },
    { num: 7, code: '  db.execute(query);' },
    { num: 8, code: '});' }
  ];

  const secureLines: CodeLine[] = [
    { num: 1, code: 'app.post("/api/login", (req, res) => {' },
    { num: 2, code: '  const userInput = req.body.email;' },
    { num: 3, code: '' },
    { num: 4, code: '  const query = ' },
    { num: 5, code: '    "SELECT * FROM users WHERE email = ?";', isSecure: true },
    { num: 6, code: '' },
    { num: 7, code: '  db.execute(query, [userInput]);', isSecure: true, annotation: '← INPUT BOUND AS DATA PARAMETER' },
    { num: 8, code: '});' }
  ];

  if (isVerified) {
    return (
      <InvestigationLayout 
        title="SQL INJECTION" 
        subtitle="Can user input manipulate database command structure?" 
        severity="HIGH" 
        status="VERIFIED" 
        onBack={() => setState('SECURITY_LAB')}
        nextModuleTitle="STORED XSS"
        onContinue={() => setState('XSS_INVESTIGATION')}
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
              <h3 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tight">SQL INJECTION BLOCKED</h3>
            </div>

            <ul className="flex flex-col gap-3 text-left w-full text-xs text-[#A0A0A5] border-t border-b border-[#2A2A2E] py-4">
              <li className="flex items-center gap-2.5">
                <Check size={14} className="text-[#54C79A] shrink-0" />
                <span>User input isolated completely from SQL interpreter</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={14} className="text-[#54C79A] shrink-0" />
                <span>Parameter binding placeholder (?) enforces strict data typing</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={14} className="text-[#54C79A] shrink-0" />
                <span>Arbitrary SQL grammar execution rejected at database engine</span>
              </li>
            </ul>

            <div className="p-3 border border-[#2A2A2E] bg-[#0B0B0C] w-full text-[11px] text-[#717176] uppercase">
              STATUS: SECURED VIA PARAMETERIZED QUERY
            </div>
          </div>
        </motion.div>
      </InvestigationLayout>
    );
  }

  return (
    <InvestigationLayout 
      title="SQL INJECTION" 
      subtitle="Can user input manipulate database command structure?" 
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
          explanation="The application takes user input and directly concatenates it into the SQL string. When an attacker provides quotes and SQL syntax, the database executes their input as structural commands rather than data."
          secureExplanation="Parameterized queries separate the query template from user input. The database compiles the SQL statement first, then injects the parameter strictly as literal data."
          dataFlow={
            <div className="flex flex-col font-mono">
              <FlowStep text="USER INPUT" />
              <FlowArrow />
              <FlowStep text="STRING CONCATENATION" isDanger />
              <FlowArrow />
              <FlowStep text="SQL COMMAND ALTERED" isDanger />
              <FlowArrow />
              <FlowStep text="DATABASE EXECUTION" />
            </div>
          }
          secureDataFlow={
            <div className="flex flex-col font-mono">
              <FlowStep text="USER INPUT" />
              <FlowArrow />
              <FlowStep text="PARAMETER BINDING (?)" isSuccess />
              <FlowArrow />
              <FlowStep text="DATA LITERAL" isSuccess />
              <FlowArrow />
              <FlowStep text="DATABASE EXECUTION" />
            </div>
          }
        />
      </div>
    </InvestigationLayout>
  );
}
