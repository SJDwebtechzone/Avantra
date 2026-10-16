import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { UE } from '../data/servicesData';

export const WhatWeDoSection: React.FC = () => {
  return (
    <section id="practices" className="bg-[hsl(var(--background))] py-24 md:py-32">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <div className="eyebrow">What we do</div>
            <h2 className="mt-5 max-w-[370px] text-[clamp(2.9rem,5.3vw,5.6rem)] font-normal leading-[.88] tracking-[-.015em]">
              One view of<br />
              <span className="serif italic text-[hsl(var(--secondary))]">the whole</span> picture.
            </h2>
          </div>
          <div>
            <p className="max-w-[520px] text-[18px] leading-[1.5] text-[hsl(var(--foreground)/.68)]">
              The strongest support does not sit in a silo. It understands the matter, the money, the systems and the people carrying the work. Avantra brings those perspectives into one practical partnership.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {UE.map((a) => (
                <article key={a.number} className="practice-card" data-testid={`card-practice-${a.number}`}>
                  <span className="practice-number">{a.number}</span>
                  <h3>{a.title}</h3>
                  <p>{a.copy}</p>
                  <ul className="mt-5 space-y-2 text-[11px] text-[hsl(var(--foreground)/.54)]">
                    {a.details.map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-1 w-1 shrink-0 bg-[hsl(var(--accent))]" />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <a href="/#enquire" className="line-link" data-testid={`link-practice-${a.number}`}>
                    Discuss this practice <ArrowUpRight size={14} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
