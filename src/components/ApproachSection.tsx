import React from 'react';
import { kE } from '../data/servicesData';

export const ApproachSection: React.FC = () => {
  return (
    <section id="approach" className="bg-[hsl(var(--background))] py-24 md:py-32">
      <div className="container-wide">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="eyebrow">How we work</div>
            <h2 className="mt-5 max-w-[380px] text-[clamp(3rem,5vw,5.3rem)] font-normal leading-[0.95] tracking-[-0.025em]">
              Built for<br />
              <span className="serif italic text-[hsl(var(--secondary))]">the handoff.</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="quote-block">
              <blockquote className="serif italic text-2xl">“Expertise you can count on, results you can trust.”</blockquote>
              <cite className="eyebrow mt-4 block">Avantra principle</cite>
            </div>

            <div className="space-y-7">
              {kE.map(([num, title, desc]) => (
                <div key={num} className="process-step" data-testid={`step-process-${num}`}>
                  <span className="eyebrow">{num}</span>
                  <h3 className="text-xl font-bold mt-1 mb-2">{title}</h3>
                  <p className="text-sm text-[hsl(var(--foreground)/.66)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
