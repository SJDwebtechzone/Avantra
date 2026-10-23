import React from 'react';
import { RotateCw } from 'lucide-react';

export const OnboardingProcessInfographic: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Questionnaire',
      desc: 'Your work, tools, volumes and standards.',
      bgColor: 'bg-[#1B344D]', // Darkest Navy
    },
    {
      num: '02',
      title: 'SLA',
      desc: 'Scope, turnaround, quality checks and reporting.',
      bgColor: 'bg-[#2B4E73]', // Dark Slate Blue
    },
    {
      num: '03',
      title: 'Kickoff',
      desc: 'Meet your team. Access, security and a first-month plan.',
      bgColor: 'bg-[#406894]', // Medium Steel Blue
    },
    {
      num: '04',
      title: 'Deliver',
      desc: 'A pilot first, then regular follow-ups.',
      bgColor: 'bg-[#5681B0]', // Muted Slate Blue
    },
    {
      num: '05',
      title: 'Optimize',
      desc: 'Better templates, automation, faster turnaround.',
      bgColor: 'bg-[#198afa]', // Royal Blue
    },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-[#E5DFD5] bg-[#F7F3EA] p-6 sm:p-10 md:p-12 shadow-sm"
      data-testid="onboarding-process-infographic"
    >
      {/* Top right soft ice blue curve background shape */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-[#CEE7EA]/70 rounded-bl-full pointer-events-none -mr-8 -mt-8" />

      {/* Header */}
      <div className="relative z-10">
        <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#198afa]">
          WORKING WITH US
        </span>
        <h3 className="mt-2 text-2xl sm:text-3xl md:text-[38px] font-bold leading-tight tracking-tight text-[#1E3A5F]">
          How we onboard a new client
        </h3>
      </div>

      {/* Chevrons Process Grid */}
      <div className="relative z-10 mt-10 md:mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-1.5">
          {steps.map((step, idx) => {
            // Determine chevron clipPath for desktop screens
            let clipPathStyle = {};
            if (idx === 0) {
              clipPathStyle = { clipPath: 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)' };
            } else if (idx === steps.length - 1) {
              clipPathStyle = { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 20px 50%)' };
            } else {
              clipPathStyle = { clipPath: 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%, 20px 50%)' };
            }

            return (
              <div
                key={step.num}
                className={`${step.bgColor} text-white p-6 md:p-7 min-h-[230px] flex flex-col justify-between relative shadow-md rounded-xl lg:rounded-none`}
                style={clipPathStyle}
              >
                <div>
                  <span className="text-3xl md:text-4xl font-extrabold text-white/35 font-mono tracking-tight block mb-3">
                    {step.num}
                  </span>
                  <h4 className="text-xl md:text-[22px] font-bold text-white leading-tight">
                    {step.title}
                  </h4>
                </div>

                <p className="mt-4 text-[13px] md:text-[14px] leading-relaxed text-white/90 font-normal">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Center Pill Banner */}
        <div className="mt-10 flex justify-center">
          <div className="bg-white rounded-full border border-[#E2DCD0] px-7 py-3.5 shadow-sm inline-flex items-center gap-3">
            <RotateCw size={22} className="text-[#198afa] stroke-[2.5]" />
            <span className="font-bold text-[#1E3A5F] text-[15px] sm:text-[16px]">
              Improvement never stops after onboarding
            </span>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 mt-12 pt-6 border-t border-[#E2DCD0] flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px]">
        <span className="font-bold uppercase tracking-widest text-[#1E3A5F]">
          AVANTRA CONSULTING
        </span>
        <span className="text-[#6B7C93] font-medium text-center sm:text-right">
          Ask. We own it. We deliver.
        </span>
      </div>
    </div>
  );
};
