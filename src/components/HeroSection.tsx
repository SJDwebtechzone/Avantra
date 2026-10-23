import React from 'react';
import { ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="top" className="hero-grid relative min-h-[720px] bg-[hsl(var(--background))] pt-[70px]">
      <div className="container-wide relative z-10 grid min-h-[650px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
        <div className="max-w-[720px]">
          <h1 className="reveal reveal-delay-1 mt-6 text-[clamp(3.8rem,8.5vw,8.4rem)] font-normal leading-[.83] tracking-[-.035em]">
            Business<br />
            <span className="serif italic text-[hsl(var(--secondary))]">expertise.</span><br />
            Delivered<br />
            across markets.
          </h1>

          <p className="reveal reveal-delay-2 mt-8 max-w-[480px] text-[16px] leading-[1.65] text-[hsl(var(--foreground)/.92)] font-normal">
            We provide specialized business, consulting, technology, staffing, legal, and advisory solutions to organizations across the United States and India.
          </p>

          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <a href="/#enquire" className="primary-button" data-testid="link-hero-enquire">
              Talk to an Advisor <ArrowUpRight size={16} />
            </a>
            <a href="/services" className="secondary-button" data-testid="link-hero-practices">
              Explore Our Services <ArrowRight size={15} />
            </a>
          </div>

          <div className="reveal reveal-delay-3 mt-14 flex items-center gap-3 text-[11px] text-[hsl(var(--foreground)/.75)]">
            <span className="h-px w-10 bg-[#198afa]" />
            <span className="mono uppercase tracking-[.11em]">Solutioning Together</span>
          </div>
        </div>

        <div className="slide-reveal">
          <div className="orbital-wrap relative w-full max-w-[560px] h-[480px]">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="orbit orbit-c" />
            <span className="orbit-dot one" />
            <span className="orbit-dot two" />
            <span className="orbit-dot three" />
            <div className="center-mark" aria-label="Avantra Consulting LLP">
              <img 
                src="/avantra-logo.svg" 
                alt="Avantra Consulting LLP - solutioning together" 
                className="h-7 sm:h-8 md:h-9 w-auto max-w-[210px] sm:max-w-[260px] md:max-w-[290px] object-contain"
              />
            </div>
            <div className="hero-note left">
              <span className="eyebrow">The brief</span>
              <strong>Complex work.<br />Made workable.</strong>
              <p className="text-[12px] font-medium text-[hsl(var(--foreground))] leading-[1.5] mt-1.5">One partner across the moments that matter.</p>
            </div>
            <div className="hero-note right">
              <span className="eyebrow">The standard</span>
              <strong>Ask.<br />We Deliver.</strong>
              <p className="text-[12px] font-medium text-[hsl(var(--foreground))] leading-[1.5] mt-1.5">Simple requests. Meaningful results.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-[hsl(var(--foreground)/.14)] px-6 py-3 text-[10px] uppercase tracking-[.13em] text-[hsl(var(--foreground)/.85)] font-medium md:px-12">
        <span>01 / 05</span>
        <span className="hidden md:inline">Paralegal · Finance · Technology · Staffing</span>
        <a href="/#practices" className="flex items-center gap-2" data-testid="link-scroll-practices">
          Scroll to see more <ChevronDown size={13} />
        </a>
      </div>
    </section>
  );
};
