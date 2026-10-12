import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { ArrowRight, Check } from 'lucide-react';

export default function SecurityLab() {
  const { setState, sqlStatus, xssStatus, secretStatus, authStatus } = useStore();

  const allVerified = [sqlStatus, xssStatus, secretStatus, authStatus].every(s => s === 'VERIFIED');
  const verifiedCount = [sqlStatus, xssStatus, secretStatus, authStatus].filter(s => s === 'VERIFIED').length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl flex-1 flex flex-col p-4 sm:p-6 lg:p-8"
    >
      {/* Top Section - Large Bold Swiss Editorial Header */}
      <div className="border-b border-[#2A2A2E] pb-8 mb-8">
        <div className="text-[11px] font-mono tracking-widest text-[#717176] uppercase mb-3">
          SECURITY INVESTIGATION INDEX / 04 THREATS IDENTIFIED
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#F5F5F5] uppercase mb-4 leading-none">
          SECURITY LAB
        </h1>
        <p className="text-base sm:text-lg text-[#A0A0A5] max-w-2xl font-normal">
          The application works. Now let's find out if it's secure. Inspect the four AI-generated code vulnerabilities below.
        </p>
      </div>

      {/* Compact Horizontal Information & Progress Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 border border-[#2A2A2E] bg-[#111113] divide-x divide-[#2A2A2E] font-mono text-xs mb-10">
        <div className="p-3.5 px-5">
          <div className="text-[10px] text-[#717176] uppercase tracking-wider">APPLICATION</div>
          <div className="text-[#F5F5F5] font-bold mt-0.5">FEEDBACKLY</div>
        </div>
        <div className="p-3.5 px-5">
          <div className="text-[10px] text-[#717176] uppercase tracking-wider">APP STATUS</div>
          <div className="text-[#54C79A] font-bold mt-0.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#54C79A]"></span>
            <span>FUNCTIONAL</span>
          </div>
        </div>
        <div className="p-3.5 px-5">
          <div className="text-[10px] text-[#717176] uppercase tracking-wider">LAB AUDIT</div>
          <div className={`font-bold mt-0.5 ${allVerified ? 'text-[#54C79A]' : 'text-[#FF4D4D]'}`}>
            {allVerified ? 'VERIFIED' : 'UNVERIFIED'}
          </div>
        </div>
        <div className="p-3.5 px-5">
          <div className="text-[10px] text-[#717176] uppercase tracking-wider">CODE GENESIS</div>
          <div className="text-[#A0A0A5] font-bold mt-0.5">AI-GENERATED</div>
        </div>
        <div className="p-3.5 px-5 col-span-2 md:col-span-1 bg-[#19191C]">
          <div className="text-[10px] text-[#717176] uppercase tracking-wider">PROGRESS</div>
          <div className="text-[#F5F5F5] font-bold mt-0.5 flex items-center justify-between">
            <span>{verifiedCount} / 4 VERIFIED</span>
            <span className="text-[10px] text-[#717176]">{verifiedCount === 4 ? 'COMPLETE' : `${(verifiedCount / 4) * 100}%`}</span>
          </div>
        </div>
      </div>

      {/* The Four Vulnerability Modules - Editorial Technical List */}
      <div className="flex flex-col border border-[#2A2A2E] divide-y divide-[#2A2A2E] bg-[#111113] mb-8">
        
        <ModuleRow 
          num="01"
          title="SQL INJECTION"
          tag="DATABASE MANIPULATION"
          severity="HIGH SEVERITY"
          description="SQL Injection happens when untrusted user input is directly combined with a database query, allowing the input to change what the database command actually does."
          status={sqlStatus}
          onClick={() => setState('SQL_INVESTIGATION')}
        />
        
        <ModuleRow 
          num="02"
          title="STORED XSS"
          tag="BROWSER-SIDE EXECUTION"
          severity="HIGH SEVERITY"
          description="Stored XSS happens when user-controlled content is saved and later rendered as HTML without proper escaping, allowing unwanted scripts to execute in another user's browser."
          status={xssStatus}
          onClick={() => setState('XSS_INVESTIGATION')}
        />
        
        <ModuleRow 
          num="03"
          title="EXPOSED SECRET"
          tag="CREDENTIAL EXPOSURE"
          severity="CRITICAL SEVERITY"
          description="An exposed secret occurs when sensitive credentials such as API keys or tokens are placed directly in client code where anyone can extract them via DevTools."
          status={secretStatus}
          onClick={() => setState('SECRET_INVESTIGATION')}
        />
        
        <ModuleRow 
          num="04"
          title="BROKEN AUTHORIZATION"
          tag="ACCESS CONTROL FLAW"
          severity="HIGH SEVERITY"
          description="Broken authorization happens when an application checks authentication ('who are you') but fails to verify authorization ('what are you allowed to access')."
          status={authStatus}
          onClick={() => setState('AUTH_INVESTIGATION')}
        />

      </div>

      {/* Completion Banner when all 4 are verified */}
      {allVerified && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-[#54C79A] bg-[#111113] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#54C79A] bg-[rgba(84,199,154,0.1)] text-[#54C79A] flex items-center justify-center font-mono">
              <Check size={16} />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-[#F5F5F5] uppercase tracking-wider">ALL 4 VULNERABILITIES VERIFIED & MITIGATED</div>
              <div className="text-xs text-[#A0A0A5]">Ready to proceed to Secure Vibe Coding review and playbook.</div>
            </div>
          </div>

          <button 
            onClick={() => setState('LAB_COMPLETE')}
            className="flex items-center gap-2.5 px-6 py-3 bg-[#54C79A] text-[#0B0B0C] hover:bg-[#68d7ab] font-mono text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer w-full sm:w-auto justify-center"
          >
            <span>VIEW LAB SUMMARY</span>
            <ArrowRight size={14} />
          </button>
        </motion.div>
      )}

    </motion.div>
  );
}

function ModuleRow({ 
  num, 
  title, 
  tag, 
  severity, 
  description, 
  status, 
  onClick 
}: { 
  num: string; 
  title: string; 
  tag: string; 
  severity: string; 
  description: string; 
  status: 'UNVERIFIED' | 'VERIFIED'; 
  onClick: () => void;
}) {
  const isVerified = status === 'VERIFIED';

  return (
    <button
      onClick={onClick}
      className={`group w-full p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left transition-colors cursor-pointer ${
        isVerified ? 'bg-[#111113] hover:bg-[#141417]' : 'bg-[#111113] hover:bg-[#151518]'
      }`}
    >
      {/* Left: Number & Titles */}
      <div className="flex items-start gap-6 sm:gap-8 flex-1">
        <span className="font-mono text-2xl sm:text-3xl font-black text-[#717176] group-hover:text-[#F5F5F5] transition-colors shrink-0">
          {num}
        </span>
        
        <div className="flex flex-col gap-1.5 flex-1 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px]">
            <span className="text-[#A0A0A5] tracking-widest uppercase font-semibold">{tag}</span>
            <span className="text-[#2A2A2E]">/</span>
            <span className={severity.includes('CRITICAL') ? 'text-[#FF4D4D]' : 'text-[#A0A0A5]'}>
              {severity}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-[#A0A0A5] font-normal leading-relaxed mt-0.5">
            {description}
          </p>
        </div>
      </div>

      {/* Right: Status Pill & Arrow */}
      <div className="flex items-center gap-4 shrink-0 font-mono text-xs pl-14 md:pl-0">
        <div className={`px-3 py-1.5 border tracking-wider text-[11px] font-bold uppercase flex items-center gap-2 ${
          isVerified 
            ? 'border-[#54C79A] text-[#54C79A] bg-[rgba(84,199,154,0.08)]' 
            : 'border-[#2A2A2E] text-[#A0A0A5] bg-[#0B0B0C]'
        }`}>
          {isVerified ? (
            <>
              <Check size={12} className="text-[#54C79A]" />
              <span>VERIFIED</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 bg-[#FF4D4D]"></span>
              <span>UNVERIFIED</span>
            </>
          )}
        </div>

        <div className="w-8 h-8 border border-[#2A2A2E] group-hover:border-[#F5F5F5] group-hover:bg-[#F5F5F5] group-hover:text-[#0B0B0C] text-[#A0A0A5] flex items-center justify-center transition-all">
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </button>
  );
}
