import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { kE } from '../data/servicesData';

export const ApproachPage: React.FC = () => {
  return (
    <main className="site-shell bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen flex flex-col justify-between">
      <Navbar />

      <div className="pt-[80px]">
        {/* Our Approach Section - 100% Exact Original UI */}
        <section id="approach" className="bg-[hsl(var(--background))] py-16 md:py-24">
          <div className="container-wide">
            
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--foreground)/.52)] mb-8">
              <a href="/" className="hover:text-[hsl(var(--accent))] transition-colors">Home</a>
              <span>/</span>
              <span className="mono text-[hsl(var(--accent))] font-semibold">Our Approach</span>
            </div>

            <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <div className="eyebrow">How we work</div>
                <h1 className="mt-5 max-w-[380px] text-[clamp(3rem,5vw,5.3rem)] font-normal leading-[0.95] tracking-[-0.025em]">
                  Built for<br />
                  <span className="serif italic text-[hsl(var(--secondary))]">the handoff.</span>
                </h1>
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
      </div>

      <Footer />
    </main>
  );
};
