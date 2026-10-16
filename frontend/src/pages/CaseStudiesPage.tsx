import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const CaseStudiesPage: React.FC = () => {
  return (
    <main className="site-shell bg-[hsl(var(--background))]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-24 border-b border-[hsl(var(--foreground)/.1)] min-h-[60vh]">
        <div className="container-wide">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[11px] uppercase tracking-[0.14em] font-mono font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.1)] px-3 py-1 rounded-full">
              Client Outcomes &amp; Case Studies
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,5vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[hsl(var(--foreground))] max-w-[900px] font-sans">
            Case Studies.
          </h1>

          <p className="mt-6 text-[18px] md:text-[22px] leading-[1.5] text-[hsl(var(--foreground)/.75)] max-w-[800px] font-light">
            Real-world case studies and client outcomes.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CaseStudiesPage;
