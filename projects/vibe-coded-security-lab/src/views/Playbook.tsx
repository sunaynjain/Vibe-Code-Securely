import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { ArrowRight, Code2, AlertTriangle, ShieldCheck, Search, Check, AlertOctagon } from 'lucide-react';

const PlaybookSection = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className={`min-h-[90vh] w-full max-w-5xl mx-auto flex flex-col items-center justify-center p-6 sm:p-10 text-center ${className}`}
  >
    {children}
  </motion.div>
);

export default function Playbook() {
  const { setState } = useStore();

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden pb-32">
      
      {/* 1. OPENING TRANSITION */}
      <PlaybookSection>
        <div className="flex flex-col gap-8 text-xl sm:text-2xl font-mono font-medium tracking-widest uppercase mb-16 text-[#717176]">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            YOU FOUND THE VULNERABILITIES.
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }} className="text-[#54C79A] font-bold">
            YOU FIXED THEM.
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.2 }}>
            BUT THERE'S ONE QUESTION LEFT...
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          transition={{ delay: 3.2, duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#F5F5F5] uppercase mb-6 leading-tight">
            SO... HOW DO WE VIBE CODE SECURELY?
          </h1>
          <p className="text-lg sm:text-2xl text-[#A0A0A5] font-normal font-sans">
            AI can write the code. <strong className="text-[#F5F5F5] font-bold">You still have to own the security.</strong>
          </p>
        </motion.div>
      </PlaybookSection>

      {/* 2. CORE IDEA */}
      <PlaybookSection>
        <div className="text-[11px] font-mono tracking-widest text-[#717176] uppercase mb-8">
          THE FUNDAMENTAL DISCONNECT
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-sm sm:text-base mb-12">
          <div className="px-4 py-2 border border-[#2A2A2E] bg-[#111113] text-[#F5F5F5] font-bold">YOU</div>
          <ArrowRight size={14} className="text-[#717176]" />
          <div className="px-4 py-2 border border-[#2A2A2E] bg-[#111113] text-[#A0A0A5]">PROMPT</div>
          <ArrowRight size={14} className="text-[#717176]" />
          <div className="px-4 py-2 border border-[#2A2A2E] bg-[#111113] text-[#F5F5F5] font-bold">AI MODEL</div>
          <ArrowRight size={14} className="text-[#717176]" />
          <div className="px-4 py-2 border border-[#2A2A2E] bg-[#19191C] text-[#F5F5F5] font-bold">CODE OUTPUT</div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="border border-[#FF4D4D] bg-[rgba(255,77,77,0.08)] text-[#FF4D4D] px-6 py-3 font-mono text-sm font-bold tracking-widest flex items-center gap-3 mb-16 uppercase"
        >
          <AlertTriangle size={16} /> 
          <span>CRITICAL PRINCIPLE: WORKING ≠ SECURE</span>
          <AlertTriangle size={16} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="border border-[#2A2A2E] bg-[#111113] p-8 sm:p-12 w-full max-w-2xl text-center"
        >
          <div className="text-[10px] font-mono tracking-widest text-[#717176] uppercase mb-2">THE SECURE FORMULA</div>
          <div className="text-2xl sm:text-4xl font-black text-[#F5F5F5] font-mono tracking-wider uppercase leading-snug">
            SECURE VIBE CODING<br />
            <span className="text-[#717176] text-xl block my-1">=</span>
            GUIDE <span className="text-[#717176]">+</span> REVIEW <span className="text-[#717176]">+</span> TEST
          </div>
        </motion.div>
      </PlaybookSection>

      {/* RULE 01 */}
      <PlaybookSection>
        <div className="text-[11px] font-mono font-bold tracking-widest text-[#717176] uppercase mb-2">RULE // 01</div>
        <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] uppercase mb-4 tracking-tight">
          PROMPT FOR SECURITY
        </h2>
        <p className="text-base text-[#A0A0A5] max-w-2xl mb-12 font-normal">
          Don't leave security as an implicit assumption. Make security controls explicit in your initial specification.
        </p>

        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-4xl text-left font-mono">
          {/* Bad Prompt */}
          <div className="flex-1 border border-[#2A2A2E] bg-[#111113] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-[#FF4D4D] uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FF4D4D]"></span>
                <span>VAGUE SPECIFICATION (UNSAFE)</span>
              </div>
              <p className="text-sm sm:text-base text-[#F5F5F5] leading-relaxed">
                "Build me a login system."
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#2A2A2E] text-[11px] text-[#717176]">
              RESULT: AI defaults to simplest implementation, skipping parameter checks, rate limits, and secure cookies.
            </div>
          </div>

          {/* Better Prompt */}
          <div className="flex-1 border border-[#54C79A] bg-[#111113] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-[#54C79A] uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#54C79A]"></span>
                <span>SECURITY-FIRST SPECIFICATION (SAFE)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#F5F5F5] leading-relaxed">
                "Build a login system.<br /><br />
                Use secure password hashing (Argon2/bcrypt),<br />
                server-side session handling,<br />
                parameterized input validation,<br />
                strict rate limiting, secure HTTP-only cookies,<br />
                and explicit authorization checks.<br /><br />
                Do not expose secrets or API keys to client bundles."
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#2A2A2E] text-[11px] text-[#54C79A]">
              RESULT: AI embeds defense-in-depth architecture directly into the generated code.
            </div>
          </div>
        </div>
      </PlaybookSection>

      {/* RULE 02 */}
      <PlaybookSection>
        <div className="text-[11px] font-mono font-bold tracking-widest text-[#717176] uppercase mb-2">RULE // 02</div>
        <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] uppercase mb-4 tracking-tight">
          MAKE AI AUDIT ITS OWN CODE
        </h2>
        <p className="text-base text-[#A0A0A5] max-w-2xl mb-12 font-normal">
          Don't only ask AI to generate features. Prompt it specifically as an offensive security reviewer.
        </p>

        <div className="flex flex-col items-center w-full max-w-3xl">
          <div className="border border-[#2A2A2E] bg-[#111113] p-6 sm:p-8 text-left w-full mb-8 font-mono">
            <div className="text-[10px] text-[#717176] uppercase tracking-widest mb-3">FOLLOW-UP AUDIT PROMPT</div>
            <p className="text-xs sm:text-sm text-[#A0A0A5] leading-relaxed">
              "Review the code you just generated as a senior security researcher.<br /><br />
              Identify potential vulnerabilities in:<br />
              • SQL injection & database queries<br />
              • Stored / Reflected XSS<br />
              • Authentication and session handling<br />
              • Object-level authorization flaws (IDOR)<br />
              • Exposed client credentials & secrets<br /><br />
              For every finding, explain <span className="text-[#FF4D4D] font-bold">WHAT</span> is wrong, <span className="text-[#F5F5F5] font-bold">WHY</span> it is dangerous, and <span className="text-[#54C79A] font-bold">HOW</span> to rewrite it securely."
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs w-full">
            <div className="px-4 py-2 border border-[#2A2A2E] bg-[#0B0B0C] text-[#F5F5F5]">CODE GENERATED</div>
            <span className="text-[#717176]">→</span>
            <div className="px-4 py-2 border border-[#2A2A2E] bg-[#19191C] text-[#F5F5F5] flex items-center gap-1.5">
              <Search size={13} />
              <span>SECURITY AUDIT</span>
            </div>
            <span className="text-[#717176]">→</span>
            <div className="px-4 py-2 border border-[#FF4D4D] text-[#FF4D4D] bg-[rgba(255,77,77,0.08)]">
              FLAWS IDENTIFIED
            </div>
            <span className="text-[#717176]">→</span>
            <div className="px-4 py-2 border border-[#54C79A] text-[#54C79A] bg-[rgba(84,199,154,0.08)] flex items-center gap-1.5">
              <Check size={13} />
              <span>PATCH & RETEST</span>
            </div>
          </div>
        </div>
      </PlaybookSection>

      {/* RULE 03 */}
      <Rule3Interactive />

      {/* RULE 04 */}
      <PlaybookSection>
        <div className="text-[11px] font-mono font-bold tracking-widest text-[#717176] uppercase mb-2">RULE // 04</div>
        <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] uppercase mb-4 tracking-tight">
          TEST LIKE AN ATTACKER
        </h2>
        <p className="text-base text-[#A0A0A5] max-w-2xl mb-12 font-normal">
          If you only test whether the happy path works, you haven't tested security. Always ask: "Can I break it?"
        </p>

        <div className="w-full max-w-4xl border border-[#2A2A2E] bg-[#111113] p-8 sm:p-12 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-[#2A2A2E] pb-8 mb-8">
            <div className="text-left border border-[#2A2A2E] p-6 bg-[#0B0B0C] opacity-50 line-through">
              <div className="text-[10px] text-[#717176] uppercase tracking-wider mb-1">STANDARD MINDSET</div>
              <div className="text-xl font-bold text-[#A0A0A5]">BUILD → "DOES IT WORK?"</div>
              <div className="text-xs text-[#717176] mt-2">Only verifies functional output under expected inputs.</div>
            </div>

            <div className="text-left border border-[#F5F5F5] p-6 bg-[#19191C]">
              <div className="text-[10px] text-[#54C79A] font-bold uppercase tracking-wider mb-1">ATTACKER MINDSET</div>
              <div className="text-xl font-bold text-[#F5F5F5]">BUILD → "CAN I BREAK IT?"</div>
              <div className="text-xs text-[#A0A0A5] mt-2">Actively tests boundary cases, malicious payloads, and bypassed checks.</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <AttackBadge label="SQL INJECTION" />
            <AttackBadge label="STORED XSS" />
            <AttackBadge label="MALICIOUS INPUT" />
            <AttackBadge label="BROKEN IDOR" />
            <AttackBadge label="EXPOSED KEYS" />
          </div>
        </div>
      </PlaybookSection>

      {/* RULE 05 */}
      <PlaybookSection>
        <div className="text-[11px] font-mono font-bold tracking-widest text-[#717176] uppercase mb-2">RULE // 05</div>
        <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] uppercase mb-4 tracking-tight">
          SCAN BEFORE YOU SHIP
        </h2>
        <p className="text-base text-[#A0A0A5] max-w-2xl mb-12 font-normal">
          AI can make mistakes. Humans miss details. Automated pipeline scans provide an essential second layer of defense.
        </p>

        <div className="w-full max-w-4xl border border-[#2A2A2E] bg-[#111113] p-8 sm:p-12 font-mono">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-8">
            <PipelineItem label="01 / AI CODE" icon={<Code2 size={14} />} />
            <span className="text-[#717176]">→</span>
            <PipelineItem label="02 / MANUAL REVIEW" icon={<Search size={14} />} />
            <span className="text-[#717176]">→</span>
            <PipelineItem label="03 / DEP AUDIT" icon={<AlertOctagon size={14} />} />
            <span className="text-[#717176]">→</span>
            <PipelineItem label="04 / SAST SCAN" icon={<ShieldCheck size={14} />} />
            <span className="text-[#717176]">→</span>
            <PipelineItem label="05 / SHIP" icon={<Check size={14} />} />
          </div>

          <div className="p-4 border border-[#54C79A] bg-[rgba(84,199,154,0.06)] text-xs text-[#54C79A] font-bold tracking-wider uppercase flex items-center justify-center gap-2">
            <Check size={15} />
            <span>ALL GATES VERIFIED: READY FOR STABLE PRODUCTION RELEASE</span>
          </div>
        </div>
      </PlaybookSection>

      {/* 4. HERO LOOP */}
      <HeroLoopSection />

      {/* 5. 30 SECOND CHECKLIST */}
      <PlaybookSection>
        <div className="text-[11px] font-mono tracking-widest text-[#717176] uppercase mb-2">FINAL VERIFICATION GATE</div>
        <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] uppercase mb-12 tracking-tight">
          BEFORE YOU SHIP AI-GENERATED CODE...
        </h2>
        
        <div className="flex flex-col gap-3 text-left w-full max-w-2xl font-mono text-xs sm:text-sm">
          <ChecklistItem text="Did I validate and sanitize all user input?" delay={0.1} />
          <ChecklistItem text="Are authentication AND authorization enforced on every route?" delay={0.2} />
          <ChecklistItem text="Are all private API secrets isolated strictly to server environments?" delay={0.3} />
          <ChecklistItem text="Are database queries parameterized against injection?" delay={0.4} />
          <ChecklistItem text="Did I actively test whether the application can be broken?" delay={0.5} />
        </div>
      </PlaybookSection>

      {/* 6. FINAL TAKEAWAY */}
      <PlaybookSection className="min-h-[70vh]">
        <div className="border border-[#2A2A2E] bg-[#111113] p-10 sm:p-16 w-full max-w-3xl flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col gap-4 text-3xl sm:text-5xl lg:text-6xl font-black text-[#F5F5F5] uppercase tracking-tight leading-tight">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              AI IS THE CODER.
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.2 }} className="text-[#A0A0A5]">
              YOU ARE THE ENGINEER.
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 2.2 }} className="text-[#54C79A]">
              YOU OWN THE SECURITY.
            </motion.div>
          </div>

          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 3.2 }}
            onClick={() => setState('FINALE')}
            className="mt-8 px-8 py-4 bg-[#F5F5F5] text-[#0B0B0C] hover:bg-white font-mono text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer flex items-center gap-3 border border-[#F5F5F5]"
          >
            <span>CONCLUDE PRESENTATION</span>
            <ArrowRight size={14} />
          </motion.button>
        </div>
      </PlaybookSection>

    </div>
  );
}

/* SUB COMPONENTS */

function Rule3Interactive() {
  const [activeTab, setActiveTab] = useState<string | null>('auth');

  const tabs = [
    { id: 'auth', label: 'AUTHENTICATION', q: 'Who is this user?' },
    { id: 'authz', label: 'AUTHORIZATION', q: 'Is this user actually allowed to do this?' },
    { id: 'input', label: 'USER INPUT', q: 'What happens if the user sends something unexpected?' },
    { id: 'db', label: 'DATABASE', q: 'Is user input safely separated from the query?' },
    { id: 'secrets', label: 'SECRETS', q: 'Can the browser or user see this credential?' },
  ];

  return (
    <PlaybookSection>
      <div className="text-[11px] font-mono font-bold tracking-widest text-[#717176] uppercase mb-2">RULE // 03</div>
      <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] uppercase mb-4 tracking-tight">
        READ THE DANGEROUS PARTS
      </h2>
      <p className="text-base text-[#A0A0A5] max-w-2xl mb-12 font-normal">
        You don't need to manually verify every boilerplate line. But you MUST audit the critical control points.
      </p>

      <div className="flex flex-col gap-2.5 w-full max-w-2xl text-left font-mono">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 border transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                isActive 
                  ? 'border-[#F5F5F5] bg-[#19191C]' 
                  : 'border-[#2A2A2E] bg-[#111113] hover:border-[#45454C]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 ${isActive ? 'bg-[#54C79A]' : 'bg-[#717176]'}`}></span>
                <span className={`text-xs font-bold tracking-wider uppercase ${isActive ? 'text-[#F5F5F5]' : 'text-[#A0A0A5]'}`}>
                  {tab.label}
                </span>
              </div>
              
              <div className="text-xs text-[#54C79A] font-medium pl-5 sm:pl-0">
                "{tab.q}"
              </div>
            </div>
          );
        })}
      </div>
    </PlaybookSection>
  );
}

function AttackBadge({ label }: { label: string }) {
  return (
    <div className="px-3.5 py-2 border border-[#FF4D4D] bg-[rgba(255,77,77,0.06)] text-[#FF4D4D] text-xs font-mono font-bold tracking-wider uppercase">
      {label}
    </div>
  );
}

function PipelineItem({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border border-[#2A2A2E] bg-[#0B0B0C] text-[#F5F5F5]">
      <span className="text-[#A0A0A5]">{icon}</span>
      <span className="text-[11px] font-bold">{label}</span>
    </div>
  );
}

function ChecklistItem({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3 p-3.5 border border-[#2A2A2E] bg-[#111113] text-[#F5F5F5]"
    >
      <div className="w-4 h-4 border border-[#54C79A] bg-[rgba(84,199,154,0.1)] text-[#54C79A] flex items-center justify-center shrink-0">
        <Check size={11} />
      </div>
      <span>{text}</span>
    </motion.div>
  );
}

function HeroLoopSection() {
  const [activeNode, setActiveNode] = useState(0);

  const nodes = [
    { label: 'PROMPT', desc: 'Tell AI what security you expect.' },
    { label: 'BUILD', desc: 'Let AI generate the implementation.' },
    { label: 'REVIEW', desc: 'Understand the risky parts.' },
    { label: 'TEST', desc: 'Try to break the application.' },
    { label: 'FIX', desc: 'Correct the vulnerabilities.' },
    { label: 'VERIFY', desc: 'Test again.' },
    { label: 'SHIP', desc: 'Only then release it.' }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(prev => (prev + 1) % nodes.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [nodes.length]);

  return (
    <PlaybookSection>
      <div className="text-[11px] font-mono tracking-widest text-[#717176] uppercase mb-2">THE HERO METHODOLOGY</div>
      <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] uppercase mb-12 tracking-tight">
        THE SECURE VIBE CODING LOOP
      </h2>
      
      <div className="w-full max-w-xl border border-[#2A2A2E] bg-[#111113] p-8 sm:p-10 font-mono">
        <div className="flex flex-col items-center gap-2">
          {nodes.map((node, i) => {
            const isActive = activeNode === i;
            return (
              <React.Fragment key={node.label}>
                <div className={`w-full max-w-xs p-3 border transition-colors flex items-center justify-between text-xs ${
                  isActive 
                    ? 'border-[#54C79A] bg-[#19191C] text-[#F5F5F5]' 
                    : 'border-[#2A2A2E] bg-[#0B0B0C] text-[#717176]'
                }`}>
                  <span className="font-bold tracking-wider">{node.label}</span>
                  <span className="text-[10px] text-[#A0A0A5]">{node.desc}</span>
                </div>
                {i < nodes.length - 1 && (
                  <span className="text-[#717176] text-xs">↓</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-[#2A2A2E] text-[10px] text-[#717176] tracking-widest uppercase text-center">
          CONTINUOUS CYCLE: ITERATE ON EVERY FEATURE RELEASE
        </div>
      </div>
    </PlaybookSection>
  );
}
