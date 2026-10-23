import React from 'react';
import { Clock } from 'lucide-react';

export const FiveDayCloseInfographic: React.FC = () => {
  const days = [
    {
      num: '1',
      title: 'Capture',
      desc: 'Enter every invoice and bill, payroll and recurring entries.',
      isHighlight: false,
    },
    {
      num: '2',
      title: 'Reconcile',
      desc: 'Match bank, card and loan accounts to statements.',
      isHighlight: false,
    },
    {
      num: '3',
      title: 'Review',
      desc: 'Check receivables and payables. Record accruals and depreciation.',
      isHighlight: false,
    },
    {
      num: '4',
      title: 'Check',
      desc: 'Compare to budget and last month. Investigate surprises.',
      isHighlight: false,
    },
    {
      num: '5',
      title: 'Report',
      desc: 'P&L, balance sheet and cash summary. Lock the period.',
      isHighlight: true,
    },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-[#E5DFD5] bg-[#F7F3EA] p-6 sm:p-10 md:p-12 shadow-sm"
      data-testid="five-day-close-infographic"
    >
      {/* Top right soft ice blue curve background shape */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-[#CEE7EA]/70 rounded-bl-full pointer-events-none -mr-8 -mt-8" />

      {/* Header */}
      <div className="relative z-10">
        <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#198afa]">
          FINANCE &amp; BOOKKEEPING
        </span>
        <h3 className="mt-2 text-2xl sm:text-3xl md:text-[38px] font-bold leading-tight tracking-tight text-[#1E3A5F]">
          Close your books in five days
        </h3>
      </div>

      {/* Timeline Section */}
      <div className="relative z-10 mt-10 md:mt-14">
        {/* Connecting Line behind badges (visible on desktop) */}
        <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-[2.5px] bg-[#DDD6CA] z-0" />

        {/* 5 Day Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
          {days.map((d) => (
            <div key={d.num} className="flex flex-col items-center text-center group">
              {/* Double Ring Circle Badge */}
              {d.isHighlight ? (
                <div className="w-[88px] h-[88px] rounded-full border-4 border-[#F7F3EA] outline outline-2 outline-[#198afa] bg-[#198afa] text-white flex flex-col items-center justify-center shadow-md shrink-0">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-90 leading-none">
                    DAY
                  </span>
                  <span className="text-2xl font-extrabold leading-none mt-0.5">
                    {d.num}
                  </span>
                </div>
              ) : (
                <div className="w-[88px] h-[88px] rounded-full border-4 border-[#F7F3EA] outline outline-2 outline-[#1C3857] bg-[#1C3857] text-white flex flex-col items-center justify-center shadow-sm shrink-0">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-80 leading-none">
                    DAY
                  </span>
                  <span className="text-2xl font-extrabold leading-none mt-0.5">
                    {d.num}
                  </span>
                </div>
              )}

              {/* Subheading Title */}
              <h4 className="mt-4 text-[17px] font-bold text-[#1E3A5F]">
                {d.title}
              </h4>

              {/* White Content Card */}
              <div className="mt-3 w-full bg-white rounded-2xl border border-[#E4DDD2] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex-1 flex items-center justify-center min-h-[110px]">
                <p className="text-[13px] md:text-[14px] leading-relaxed text-[#4A5D73] font-normal">
                  {d.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner: "All month" */}
        <div className="mt-8 bg-[#1C3857] text-white rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-md">
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center shrink-0">
            <Clock size={20} className="text-white" />
          </div>
          <p className="text-[14px] sm:text-[15px] leading-snug text-white/90">
            <strong className="text-[#38bdf8] font-bold">All month:</strong>{' '}
            record transactions weekly, attach receipts as you go, and keep a running list of questions.
          </p>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 mt-10 pt-6 border-t border-[#E2DCD0] flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px]">
        <span className="font-bold uppercase tracking-widest text-[#1E3A5F]">
          AVANTRA CONSULTING
        </span>
        <span className="text-[#6B7C93] font-medium text-center sm:text-right">
          Your numbers on time, every month.
        </span>
      </div>
    </div>
  );
};
