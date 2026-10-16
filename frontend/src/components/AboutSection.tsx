import React from 'react';
import { ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-[hsl(var(--background))] border-t border-[hsl(var(--foreground)/.1)] py-20 md:py-28">
      <div className="container-wide grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div className="flex flex-col justify-between">
          <div>
            <div className="eyebrow text-[11px] uppercase tracking-[0.15em] font-mono text-[hsl(var(--accent))]">
              A PARTNER, NOT A PLATFORM
            </div>
            <h2 className="mt-5 max-w-[650px] text-[clamp(2.8rem,5.5vw,5.5rem)] font-normal leading-[0.92] tracking-[-0.025em] text-[hsl(var(--foreground))]">
              Easy to work<br />
              with. <span className="serif italic text-[hsl(var(--secondary))]">Hard to<br />outgrow.</span>
            </h2>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <a 
              href="/story" 
              className="group border-t border-[hsl(var(--foreground)/.25)] pt-4 flex items-center justify-between hover:border-[hsl(var(--accent))] transition-colors"
              data-testid="link-our-story"
            >
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-[hsl(var(--foreground)/.85)] group-hover:text-[hsl(var(--accent))] transition-colors">
                OUR STORY
              </span>
              <ArrowRight size={13} className="text-[hsl(var(--foreground)/.6)] group-hover:text-[hsl(var(--accent))] group-hover:translate-x-1 transition-all" />
            </a>

            <a 
              href="/approach" 
              className="group border-t border-[hsl(var(--foreground)/.25)] pt-4 flex items-center justify-between hover:border-[hsl(var(--accent))] transition-colors"
              data-testid="link-lydia-clancy"
            >
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-[hsl(var(--foreground)/.85)] group-hover:text-[hsl(var(--accent))] transition-colors">
             Our Approach
              </span>
              <ArrowRight size={13} className="text-[hsl(var(--foreground)/.6)] group-hover:text-[hsl(var(--accent))] group-hover:translate-x-1 transition-all" />
            </a>

            <a 
              href="/why-us" 
              className="group border-t border-[hsl(var(--foreground)/.25)] pt-4 flex items-center justify-between hover:border-[hsl(var(--accent))] transition-colors"
              data-testid="link-why-us"
            >
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-[hsl(var(--foreground)/.85)] group-hover:text-[hsl(var(--accent))] transition-colors">
                WHY US
              </span>
              <ArrowRight size={13} className="text-[hsl(var(--foreground)/.6)] group-hover:text-[hsl(var(--accent))] group-hover:translate-x-1 transition-all" />
            </a>

            <a 
              href="/pricing" 
              className="group border-t border-[hsl(var(--foreground)/.25)] pt-4 flex items-center justify-between hover:border-[hsl(var(--accent))] transition-colors"
              data-testid="link-our-pricing"
            >
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-[hsl(var(--foreground)/.85)] group-hover:text-[hsl(var(--accent))] transition-colors">
                OUR PRICING
              </span>
              <ArrowRight size={13} className="text-[hsl(var(--foreground)/.6)] group-hover:text-[hsl(var(--accent))] group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-2">
          <p className="text-[17px] md:text-[18px] leading-[1.6] text-[hsl(var(--foreground)/.68)] max-w-[500px]">
            Based in Bangalore and trusted by law firms and businesses across North America and India, Avantra is built for the day-to-day realities behind ambitious work.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[hsl(var(--foreground)/.15)] pt-6">
            <div>
              <span className="serif text-4xl md:text-5xl font-normal text-[hsl(var(--foreground))]">01</span>
              <p className="mt-3 text-[11px] uppercase tracking-[0.12em] leading-tight text-[hsl(var(--foreground)/.6)] font-medium">
                CLEAR OWNER<br />FOR EVERY BRIEF
              </p>
            </div>
            <div>
              <span className="serif text-4xl md:text-5xl font-normal text-[hsl(var(--foreground))]">∞</span>
              <p className="mt-3 text-[11px] uppercase tracking-[0.12em] leading-tight text-[hsl(var(--foreground)/.6)] font-medium">
                ROOM TO GROW<br />WITH THE WORK
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


