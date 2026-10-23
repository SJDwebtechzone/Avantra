import React from 'react';
import { Lock, Monitor, UserCheck, ShieldCheck } from 'lucide-react';

export const DataSecurityInfographic: React.FC = () => {
  const cards = [
    {
      icon: Lock,
      title: 'Access',
      items: [
        'Individual logins, role-based access',
        'Multi-factor authentication everywhere',
        'Access removed the day someone leaves',
      ],
    },
    {
      icon: Monitor,
      title: 'Devices',
      items: [
        'Managed, encrypted laptops',
        'USB storage disabled',
        'Work stays inside your systems',
      ],
    },
    {
      icon: UserCheck,
      title: 'People',
      items: [
        'Signed confidentiality agreements',
        'Background checks before client work',
        'Regular security training',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Accountability',
      items: [
        'Activity logs: who, what, when',
        'Written incident response plan',
        'Commitments in the contract and SLA',
      ],
    },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-[#E5DFD5] bg-[#F7F3EA] p-6 sm:p-10 md:p-12 shadow-sm"
      data-testid="data-security-infographic"
    >
      {/* Top right soft ice blue curve background shape */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-[#CEE7EA]/70 rounded-bl-full pointer-events-none -mr-8 -mt-8" />

      {/* Header */}
      <div className="relative z-10">
        <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#198afa]">
          TECHNOLOGY · DATA SECURITY
        </span>
        <h3 className="mt-2 text-2xl sm:text-3xl md:text-[38px] font-bold leading-tight tracking-tight text-[#1E3A5F]">
          Four questions to ask any outsourcing partner
        </h3>
      </div>

      {/* 4 Cards Grid */}
      <div className="relative z-10 mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.title}
              className="flex flex-col rounded-2xl overflow-hidden shadow-sm border border-[#E2DCD3] transition-transform hover:-translate-y-1"
            >
              {/* Header Box */}
              <div className="bg-[#1C3857] text-white p-5 flex items-center gap-3">
                <IconComponent size={24} className="text-white shrink-0 stroke-[2]" />
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {card.title}
                </h4>
              </div>

              {/* Body Box */}
              <div className="bg-white p-6 flex-1 flex flex-col justify-start">
                <ul className="divide-y divide-[#F0ECE6] space-y-0 text-[14px] leading-snug text-[#4A5D73]">
                  {card.items.map((item, idx) => (
                    <li key={idx} className="py-3.5 first:pt-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 mt-12 pt-6 border-t border-[#E2DCD0] flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px]">
        <span className="font-bold uppercase tracking-widest text-[#1E3A5F]">
          AVANTRA CONSULTING
        </span>
        <span className="text-[#6B7C93] font-medium text-center sm:text-right">
          Security agreed at kickoff, not after.
        </span>
      </div>
    </div>
  );
};
