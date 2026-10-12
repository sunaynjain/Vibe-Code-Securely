import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, AlertTriangle } from 'lucide-react';

export interface CodeLine {
  num: number;
  code: string;
  isVulnerable?: boolean;
  isSecure?: boolean;
  annotation?: string;
  diffType?: 'removed' | 'added' | 'none';
}

interface CodeViewerProps {
  vulnerableLines: CodeLine[];
  secureLines: CodeLine[];
  onFixApplied: () => void;
  isFixed: boolean;
  explanation: React.ReactNode;
  secureExplanation: React.ReactNode;
  dataFlow: React.ReactNode;
  secureDataFlow: React.ReactNode;
}

export function CodeViewer({
  vulnerableLines,
  secureLines,
  onFixApplied,
  isFixed,
  explanation,
  secureExplanation,
  dataFlow,
  secureDataFlow
}: CodeViewerProps) {
  const [view, setView] = useState<'VULNERABLE' | 'SECURE'>('VULNERABLE');
  const [showDiff, setShowDiff] = useState(false);

  // If patched, force SECURE view.
  const activeView = isFixed ? 'SECURE' : view;

  const currentLines = showDiff 
    ? [...vulnerableLines.map(l => ({ ...l, diffType: l.isVulnerable ? 'removed' : 'none' })), 
       ...secureLines.filter(l => l.isSecure).map(l => ({ ...l, diffType: 'added' }))]
    : activeView === 'VULNERABLE' ? vulnerableLines : secureLines;

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
      
      {/* Left Column: Code Review Workspace */}
      <div className="flex-1 w-full flex flex-col border border-[#2A2A2E] bg-[#111113]">
        
        {/* Editor Controls Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#2A2A2E] bg-[#19191C] px-4 py-2.5 gap-3">
          
          {/* Segmented Control - VULNERABLE | SECURE */}
          <div className="flex items-center border border-[#2A2A2E] bg-[#0B0B0C] p-0.5 font-mono text-xs">
            <button 
              onClick={() => { setView('VULNERABLE'); setShowDiff(false); }}
              disabled={isFixed}
              className={`px-3 py-1.5 transition-colors cursor-pointer font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                activeView === 'VULNERABLE' && !showDiff 
                  ? 'bg-[#FF4D4D] text-[#0B0B0C]' 
                  : 'text-[#A0A0A5] hover:text-[#F5F5F5]'
              }`}
            >
              <AlertTriangle size={12} className={activeView === 'VULNERABLE' && !showDiff ? 'text-[#0B0B0C]' : 'text-[#FF4D4D]'} />
              <span>VULNERABLE</span>
            </button>
            <button 
              onClick={() => { setView('SECURE'); setShowDiff(false); }}
              className={`px-3 py-1.5 transition-colors cursor-pointer font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                activeView === 'SECURE' && !showDiff 
                  ? 'bg-[#54C79A] text-[#0B0B0C]' 
                  : 'text-[#A0A0A5] hover:text-[#F5F5F5]'
              }`}
            >
              <Check size={12} className={activeView === 'SECURE' && !showDiff ? 'text-[#0B0B0C]' : 'text-[#54C79A]'} />
              <span>SECURE REPLACEMENT</span>
            </button>
          </div>

          {/* Show Diff Toggle */}
          <button 
            onClick={() => setShowDiff(!showDiff)}
            className={`font-mono text-xs px-3.5 py-1.5 border tracking-wider uppercase transition-colors cursor-pointer ${
              showDiff 
                ? 'bg-[#F5F5F5] text-[#0B0B0C] border-[#F5F5F5] font-bold' 
                : 'border-[#2A2A2E] bg-[#111113] text-[#A0A0A5] hover:text-[#F5F5F5] hover:border-[#45454C]'
            }`}
          >
            <span>{showDiff ? 'HIDE DIFF' : 'SHOW DIFF'}</span>
          </button>
        </div>

        {/* Code Workspace Display */}
        <div className="bg-[#0B0B0C] font-mono text-sm leading-relaxed overflow-x-auto py-4">
          <AnimatePresence mode="popLayout">
            {currentLines.map((line, i) => {
              let lineBg = 'transparent';
              let borderLeft = '2px solid transparent';
              let textColor = 'text-[#A0A0A5]';
              
              if (showDiff) {
                if (line.diffType === 'removed') {
                  lineBg = 'rgba(255, 77, 77, 0.12)';
                  borderLeft = '2px solid #FF4D4D';
                  textColor = 'text-[#FF4D4D]';
                } else if (line.diffType === 'added') {
                  lineBg = 'rgba(84, 199, 154, 0.12)';
                  borderLeft = '2px solid #54C79A';
                  textColor = 'text-[#54C79A]';
                }
              } else if (activeView === 'VULNERABLE' && line.isVulnerable) {
                lineBg = 'rgba(255, 77, 77, 0.12)';
                borderLeft = '2px solid #FF4D4D';
                textColor = 'text-[#F5F5F5] font-semibold';
              } else if (activeView === 'SECURE' && line.isSecure) {
                lineBg = 'rgba(84, 199, 154, 0.12)';
                borderLeft = '2px solid #54C79A';
                textColor = 'text-[#F5F5F5] font-semibold';
              }

              return (
                <div 
                  key={`${activeView}-${showDiff}-${i}-${line.code}`}
                  className="flex group w-full min-w-max py-1 transition-colors"
                  style={{ backgroundColor: lineBg, borderLeft: borderLeft }}
                >
                  {/* Line Number / Diff indicator */}
                  <div className="w-12 shrink-0 text-right pr-4 text-xs select-none text-[#717176]">
                    {showDiff ? (
                      line.diffType === 'removed' ? (
                        <span className="text-[#FF4D4D] font-bold">-</span>
                      ) : line.diffType === 'added' ? (
                        <span className="text-[#54C79A] font-bold">+</span>
                      ) : (
                        line.num
                      )
                    ) : (
                      line.num
                    )}
                  </div>

                  {/* Code Line Content */}
                  <div className={`whitespace-pre pl-2 ${textColor}`}>
                    {line.code}
                  </div>

                  {/* Inline Problem Annotation */}
                  {!showDiff && line.annotation && (
                    <div className={`ml-6 text-xs font-mono font-bold tracking-wide flex items-center ${
                      activeView === 'VULNERABLE' ? 'text-[#FF4D4D]' : 'text-[#54C79A]'
                    }`}>
                      {line.annotation}
                    </div>
                  )}
                </div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Editor Bottom Bar */}
        <div className="flex items-center justify-between border-t border-[#2A2A2E] bg-[#111113] px-4 py-2 text-[11px] font-mono text-[#717176]">
          <span>LANGUAGE: JAVASCRIPT / NODE.JS</span>
          <span>{currentLines.length} LINES</span>
        </div>

      </div>

      {/* Right Column: Technical Investigation Notes */}
      <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-5">
        
        {/* Section: What is Happening? */}
        <div className="border border-[#2A2A2E] bg-[#111113] p-5">
          <div className="text-[10px] font-mono font-bold tracking-widest text-[#717176] uppercase mb-2">
            01 / ROOT CAUSE ANALYSIS
          </div>
          <div className="text-sm text-[#F5F5F5] leading-relaxed">
            {activeView === 'VULNERABLE' ? explanation : secureExplanation}
          </div>
        </div>
        
        {/* Section: Data Flow */}
        <div className="border border-[#2A2A2E] bg-[#111113] p-5">
          <div className="text-[10px] font-mono font-bold tracking-widest text-[#717176] uppercase mb-3">
            02 / DATA FLOW SCHEMATIC
          </div>
          <div>
            {activeView === 'VULNERABLE' ? dataFlow : secureDataFlow}
          </div>
        </div>

        {/* Action Button: APPLY SECURE FIX */}
        {!isFixed && activeView === 'SECURE' && !showDiff && (
          <button 
            onClick={onFixApplied}
            className="w-full py-3.5 bg-[#F5F5F5] text-[#0B0B0C] hover:bg-white font-mono text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>APPLY SECURE FIX</span>
            <ArrowRight size={14} />
          </button>
        )}

      </div>
    </div>
  );
}

export function FlowStep({ text, isDanger = false, isSuccess = false }: { text: string, isDanger?: boolean, isSuccess?: boolean }) {
  let borderClass = 'border-[#2A2A2E] text-[#A0A0A5] bg-[#19191C]';
  if (isDanger) borderClass = 'border-[#FF4D4D] text-[#FF4D4D] bg-[rgba(255,77,77,0.08)]';
  if (isSuccess) borderClass = 'border-[#54C79A] text-[#54C79A] bg-[rgba(84,199,154,0.08)]';

  return (
    <div className={`p-2.5 border font-mono text-[11px] font-bold tracking-wider uppercase text-center ${borderClass}`}>
      {text}
    </div>
  );
}

export function FlowArrow() {
  return (
    <div className="text-center font-mono text-[#717176] py-1 text-xs">
      ↓
    </div>
  );
}
