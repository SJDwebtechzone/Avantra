import React from 'react';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { EnquireSection } from '../components/EnquireSection';

export const GetStartedPage: React.FC = () => {
  return (
    <main className="site-shell bg-[hsl(var(--background))]">
      <SEO 
        title="Get Started | Consult With Avantra"
        description="Tell us about your staffing or legal process outsourcing requirements. Receive a custom proposal and staffing roadmap within 24 hours."
        canonical="https://avantraconsulting.com/get-started"
      />
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-12 border-b border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--muted)/.3)]">
        <div className="container-wide">
          <span className="text-[11px] uppercase tracking-[0.14em] font-mono font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.1)] px-3 py-1 rounded-full">
            Client Onboarding · Step 1
          </span>
          <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[hsl(var(--foreground))]">
            Tell us what you need
          </h1>
          <p className="mt-4 text-[18px] md:text-[20px] leading-[1.6] text-[hsl(var(--foreground)/.72)] max-w-[750px] font-light">
            Answer a few quick questions and we'll come back with ideas tailored to your business. It takes about 3 minutes.
          </p>
        </div>
      </section>

      {/* Questionnaire Form Section */}
      <EnquireSection />

      <Footer />
    </main>
  );
};
