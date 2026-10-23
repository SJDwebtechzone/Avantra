import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/Navbar';
import { EnquireSection } from '../components/EnquireSection';
import { Footer } from '../components/Footer';
import { Zt } from '../data/servicesData';

export const ServicesIndexPage: React.FC = () => {
  const markets = ['US Services', 'India Services'] as const;

  return (
    <main className="site-shell">
      <SEO 
        title="Services | Legal, Remote Staffing & Business Operations"
        description="Explore Avantra Consulting's suite of services: Legal Process Outsourcing, Full-Time Dedicated Remote Teams, Bookkeeping, IT-Enabled Services, and Strategic Consulting."
        canonical="https://avantraconsulting.com/services"
      />
      <Navbar light={true} />
      
      <section className="service-index-hero dark-panel">
        <div className="container-wide grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <div className="eyebrow">Services</div>
            <h1 className="mt-6 max-w-[640px] text-[clamp(3.6rem,8vw,8rem)] font-normal leading-[0.95] tracking-[-0.025em]">
              The right<br />
              <span className="serif italic text-[hsl(var(--accent))]">capacity</span><br />
              for the work.
            </h1>
          </div>
          <p className="max-w-[470px] text-[17px] leading-[1.65] text-[hsl(var(--primary-foreground)/.88)]">
            Explore Avantra services by market. Every engagement is built around clear ownership, practical expertise and work that fits your operating rhythm.
          </p>
        </div>
      </section>

      <section className="service-index-list bg-[hsl(var(--background))] py-24 md:py-32">
        <div className="container-wide">
          {markets.map((m) => (
            <div key={m} className="service-index-group">
              <div className="eyebrow">{m}</div>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {Zt.filter((r) => r.market === m).map((r) => (
                  <a key={r.slug} href={`/services/${r.slug}`} className="service-index-card">
                    <span className="service-num">{r.number}</span>
                    <div>
                      <h2>{r.title}</h2>
                      <p>{r.summary}</p>
                    </div>
                    <ArrowRight size={19} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <EnquireSection />
      <Footer />
    </main>
  );
};
