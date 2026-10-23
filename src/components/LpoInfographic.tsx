import React from 'react';
import { FileText, Scale, ArrowRight } from 'lucide-react';

export const LpoInfographic: React.FC = () => {
  const avantraItems = [
    'Notice and document drafting from your templates',
    'Case management and deadline tracking',
    'FDCPA and debt defense file preparation',
    'Bankruptcy document support',
    'Research and summaries for review'
  ];

  const attorneyItems = [
    'Legal advice and strategy',
    'Final review and sign-off',
    'Court appearances',
    'Client counseling'
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#E5DFD5] bg-[#F7F3EA] p-6 sm:p-10 md:p-14 shadow-sm" data-testid="lpo-infographic">
      {/* Top right elegant solid curved shape matching logo ice blue */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-[#CEE7EA]/70 rounded-bl-full pointer-events-none -mr-8 -mt-8" />

      {/* Header */}
      <div className="relative z-10">
        <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#198afa]">
          LEGAL SUPPORT
        </span>
        <h3 className="mt-2 text-2xl sm:text-3xl md:text-[38px] font-bold leading-tight tracking-tight text-[#1E3A5F]">
          Legal process outsourcing: who does what
        </h3>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 mt-8 md:mt-12 grid gap-6 md:grid-cols-[1fr_auto_1fr] items-center">
        
        {/* Left Card - Avantra Handles */}
        <div className="bg-white rounded-2xl border-t-[5px] border-t-[#198afa] border-x border-b border-[#E2DCD3] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3 pb-5 border-b border-[#F0ECE6]">
            <FileText size={26} className="text-[#1E3A5F]" />
            <h4 className="text-xl md:text-2xl font-bold text-[#1E3A5F]">
              Avantra handles
            </h4>
          </div>
          <ul className="divide-y divide-[#F0ECE6]">
            {avantraItems.map((item) => (
              <li key={item} className="py-4 flex items-start gap-3.5 text-[15px] md:text-[16px] leading-snug text-[#2C3E50] font-medium">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#198afa] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Center Connecting Arrow */}
        <div className="flex flex-col items-center justify-center py-4 md:py-0 px-2">
          <div className="flex items-center justify-center text-[#198afa]">
            <ArrowRight size={38} className="stroke-[2.5]" />
          </div>
          <span className="mt-2 text-[13px] font-semibold text-[#5A6E85] text-center leading-tight max-w-[100px]">
            Review-ready work
          </span>
        </div>

        {/* Right Card - Your Attorneys Keep */}
        <div className="bg-[#1C3857] text-white rounded-2xl p-6 md:p-8 shadow-lg relative">
          <div className="flex items-center gap-3 pb-5 border-b border-white/15">
            <Scale size={26} className="text-white" />
            <h4 className="text-xl md:text-2xl font-bold text-white">
              Your attorneys keep
            </h4>
          </div>
          <ul className="divide-y divide-white/10">
            {attorneyItems.map((item) => (
              <li key={item} className="py-4 flex items-start gap-3.5 text-[15px] md:text-[16px] leading-snug text-white/95 font-medium">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#8EA2B8] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Footer Bar */}
      <div className="relative z-10 mt-12 pt-6 border-t border-[#E2DCD0] flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px]">
        <span className="font-bold uppercase tracking-widest text-[#1E3A5F]">
          AVANTRA CONSULTING
        </span>
        <span className="text-[#6B7C93] font-medium text-center sm:text-right">
          Start with one workflow. Measure it. Then scale.
        </span>
      </div>
    </div>
  );
};
