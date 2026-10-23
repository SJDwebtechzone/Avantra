import React from 'react';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export const WhyUsPage: React.FC = () => {
  const pillars = [
    {
      number: "01",
      pillar: "One clear owner for every brief",
      description: "A single point of accountability tracks your work end to end, so nothing falls into the gap between teams or time zones."
    },
    {
      number: "02",
      pillar: "Room to grow with the work",
      description: "Add capacity in weeks, not quarters — the engagement scales with your caseload or workload, not the other way around."
    },
    {
      number: "03",
      pillar: "Cross-border by design",
      description: "Delivery teams in Bangalore working in your time zone, inside your systems, to your standards — not a generic offshore queue."
    },
    {
      number: "04",
      pillar: "Fixed standards, flexible engagement",
      description: "Dedicated staff, project-based support, or fully managed services — the model bends to the brief; the quality bar doesn't move."
    }
  ];

  return (
    <main className="site-shell bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen flex flex-col justify-between">
      <SEO 
        title="Why Avantra | Global Capacity, Uncompromising Standards"
        description="Discover why leading organizations partner with Avantra Consulting for remote staffing and legal process outsourcing: single-owner accountability, agile scaling, and cross-border expertise."
        canonical="https://avantraconsulting.com/why-us"
      />
      <Navbar />

      <div className="pt-[70px]">
        {/* Why Us Hero Header Section */}
        <section className="py-6 md:py-10 border-b border-[hsl(var(--foreground)/.14)]">
          <div className="container-wide">
            
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--foreground)/.75)] mb-3">
              <a href="/" className="hover:text-[hsl(var(--accent))] transition-colors">Home</a>
              <span>/</span>
              <span className="mono text-[hsl(var(--accent))] font-semibold">Why Us</span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr] items-start">
              <div>
                <h1 className="text-[clamp(2.5rem,5.2vw,5.2rem)] font-normal leading-[.95] tracking-[-.035em]">
                  Easy to work with.<br />
                  <span className="serif italic text-[hsl(var(--secondary))]">Hard to outgrow.</span>
                </h1>
              </div>

              <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-5 md:p-6 shadow-sm">
                <span className="mono text-[10px] uppercase tracking-[.14em] text-[hsl(var(--accent))] block mb-2 font-semibold">
                  OUR PHILOSOPHY
                </span>
                <p className="text-[14.5px] md:text-[15.5px] leading-[1.65] text-[hsl(var(--foreground)/.92)] font-normal">
                  Based in Bangalore and trusted by law firms and businesses across North America and India, Avantra is built for the day-to-day realities behind ambitious work. We are not another vendor added to the pile — we are the partner that makes the rest of the pile easier to manage.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Pillars Table & Grid Section */}
        <section className="py-8 md:py-14 border-b border-[hsl(var(--foreground)/.14)]">
          <div className="container-wide">
            
            <div className="mb-6">
              <span className="eyebrow">THE FOUR PILLARS</span>
              <h2 className="mt-1 text-xl md:text-2xl font-light tracking-tight">
                Built for accountability, scale, and operational clarity.
              </h2>
            </div>

            {/* Structured Table Presentation */}
            <div className="overflow-x-auto rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] shadow-sm">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                    <th className="py-3.5 px-6 font-mono text-[11px] uppercase tracking-[0.14em] w-[80px]">#</th>
                    <th className="py-3.5 px-6 font-mono text-[11px] uppercase tracking-[0.14em] w-[35%]">Pillar</th>
                    <th className="py-3.5 px-6 font-mono text-[11px] uppercase tracking-[0.14em]">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--foreground)/.1)]">
                  {pillars.map((item) => (
                    <tr key={item.number} className="hover:bg-[hsl(var(--foreground)/.03)] transition-colors">
                      <td className="py-5 px-6 serif text-xl font-normal text-[hsl(var(--accent))]">{item.number}</td>
                      <td className="py-5 px-6 font-medium text-[15px] text-[hsl(var(--foreground))]">{item.pillar}</td>
                      <td className="py-5 px-6 text-[14.5px] leading-[1.6] text-[hsl(var(--foreground)/.92)] font-normal">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* Dark Callout Banner */}
        <section className="py-10 md:py-14">
          <div className="container-wide">
            <div className="dark-panel relative rounded-2xl border border-[hsl(var(--primary-foreground)/.2)] p-8 md:p-12 text-center shadow-2xl overflow-hidden">
              <div className="relative z-10 max-w-[750px] mx-auto">
                <span className="mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--accent))] block mb-3 font-semibold">
                  NEXT STEPS
                </span>
                <h2 className="text-2xl md:text-3xl font-light text-[hsl(var(--primary-foreground))]">
                  Ready to remove the seams in your operations?
                </h2>
                <p className="mt-3 text-xs md:text-sm text-[hsl(var(--primary-foreground)/.7)] max-w-[560px] mx-auto leading-relaxed">
                  Talk to our advisors in Bangalore or North America to discuss your brief and get dedicated support.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a href="/#enquire" className="primary-button text-xs py-2.5 px-5 uppercase tracking-wider flex items-center gap-2">
                    Schedule a Consultation <ArrowRight size={14} />
                  </a>
                  <a href="/services" className="secondary-button text-xs py-2.5 px-5 uppercase tracking-wider flex items-center gap-2 bg-transparent text-white border-white/30 hover:bg-white/10">
                    Explore Our Services <ArrowUpRight size={15} />
                  </a>
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
