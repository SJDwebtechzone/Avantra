import React from 'react';

interface RatingDotsProps {
  score: number; // 1, 2, or 3 out of 3
  isHighlight?: boolean;
}

const RatingDots: React.FC<RatingDotsProps> = ({ score, isHighlight = false }) => {
  const activeColor = isHighlight ? 'bg-[#1C3857]' : 'bg-[#198afa]';
  const inactiveColor = 'bg-[#E0D8CD]';

  return (
    <div className="flex items-center justify-center gap-2">
      {[1, 2, 3].map((index) => (
        <span
          key={index}
          className={`h-3.5 w-3.5 rounded-full transition-colors ${
            index <= score ? activeColor : inactiveColor
          }`}
        />
      ))}
    </div>
  );
};

export const StaffingModelsInfographic: React.FC = () => {
  const rows = [
    {
      label: 'Control over daily work',
      freelancersScore: 1,
      agencyScore: 2,
      remoteStaffScore: 3,
    },
    {
      label: 'Continuity of people',
      freelancersScore: 1,
      agencyScore: 2,
      remoteStaffScore: 3,
    },
    {
      label: 'Predictable monthly cost',
      freelancersScore: 1,
      agencyScore: 2,
      remoteStaffScore: 3,
    },
    {
      label: 'Low admin for you',
      freelancersScore: 1,
      agencyScore: 3,
      remoteStaffScore: 3,
    },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-[#E5DFD5] bg-[#F7F3EA] p-6 sm:p-10 md:p-14 shadow-sm"
      data-testid="staffing-models-infographic"
    >
      {/* Top right elegant soft ice blue curve shape */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-[#CEE7EA]/70 rounded-bl-full pointer-events-none -mr-8 -mt-8" />

      {/* Header */}
      <div className="relative z-10">
        <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#198afa]">
          REMOTE STAFFING
        </span>
        <h3 className="mt-2 text-2xl sm:text-3xl md:text-[38px] font-bold leading-tight tracking-tight text-[#1E3A5F]">
          Freelancers, agencies or dedicated remote staff?
        </h3>
      </div>

      {/* Comparison Table Container */}
      <div className="relative z-10 mt-8 md:mt-12 overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Table Header */}
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1.2fr] items-end text-center">
            <div className="text-left font-bold text-[#1E3A5F] pb-4 px-4"></div>
            
            <div className="font-bold text-[17px] md:text-[19px] text-[#1E3A5F] pb-4 px-4">
              Freelancers
            </div>
            
            <div className="font-bold text-[17px] md:text-[19px] text-[#1E3A5F] pb-4 px-4">
              Agency / vendor
            </div>
            
            <div className="bg-[#1C3857] text-white font-bold text-[17px] md:text-[19px] py-4 px-4 rounded-t-2xl shadow-sm">
              Dedicated remote staff
            </div>
          </div>

          {/* Table Rows */}
          <div className="bg-white/60 rounded-b-2xl border border-[#E5DFD5] shadow-sm">
            {rows.map((row, idx) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.2fr_1fr_1fr_1.2fr] items-center text-center border-b border-[#EAE5DC] ${
                  idx === 0 ? 'bg-transparent' : ''
                }`}
              >
                {/* Criteria Label */}
                <div className="text-left font-bold text-[14px] md:text-[16px] text-[#1E3A5F] py-5 px-6 bg-white/40">
                  {row.label}
                </div>

                {/* Freelancers cell */}
                <div className="py-5 px-4 bg-white">
                  <RatingDots score={row.freelancersScore} />
                </div>

                {/* Agency cell */}
                <div className="py-5 px-4 bg-white">
                  <RatingDots score={row.agencyScore} />
                </div>

                {/* Remote Staff cell (Highlighted column) */}
                <div className="py-5 px-4 bg-[#EAF1F8] border-x border-[#D5E3F0]">
                  <RatingDots score={row.remoteStaffScore} isHighlight />
                </div>
              </div>
            ))}

            {/* Bottom Row: Rule of Thumb */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr_1.2fr] items-center text-center rounded-b-2xl">
              <div className="text-left font-bold text-[14px] md:text-[16px] text-[#1E3A5F] py-5 px-6 bg-white/40">
                Rule of thumb
              </div>

              <div className="py-5 px-4 bg-white font-bold text-[14px] md:text-[16px] text-[#198afa]">
                Need it once
              </div>

              <div className="py-5 px-4 bg-white font-bold text-[14px] md:text-[16px] text-[#198afa]">
                Need it finished
              </div>

              <div className="py-5 px-4 bg-[#EAF1F8] border-x border-b border-[#D5E3F0] rounded-b-2xl font-bold text-[14px] md:text-[16px] text-[#198afa]">
                Need it every day
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 mt-12 pt-6 border-t border-[#E2DCD0] flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px]">
        <span className="font-bold uppercase tracking-widest text-[#1E3A5F]">
          AVANTRA CONSULTING
        </span>
        <span className="text-[#6B7C93] font-medium text-center sm:text-right">
          Recruitment, training and payroll handled for you.
        </span>
      </div>
    </div>
  );
};
