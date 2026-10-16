import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const whatsIncludedFullTime = [
    "End-to-end recruitment",
    "Pre-vetted candidate shortlists",
    "Interview coordination",
    "Onboarding support",
    "A dedicated account manager",
    "Monthly employee management",
    "Ongoing performance check-ins"
  ];

  const bestFitFullTime = [
    "Companies hiring long-term remote talent",
    "Legal and operational roles",
    "Teams that need full-time stability and real integration, not a stopgap"
  ];

  const bestFitVA = [
    "Amazon and eCommerce businesses",
    "Real estate teams and agencies",
    "Customer-support-heavy operations",
    "Founders who need reliable daily support without adding headcount"
  ];

  const bestFitOps = [
    "Businesses juggling multiple moving parts across teams or vendors",
    "Companies ready to replace inbox-and-spreadsheet coordination with real process",
    "Operations that have outgrown one person doing everything informally",
    "Leaders who want the day-to-day owned by someone else, not managed by them"
  ];

  const alwaysGet = [
    "Premium recruitment quality",
    "Fast talent delivery",
    "No long-term commitments",
    "Transparent communication",
    "Flexible scaling",
    "Full operational support"
  ];

  return (
    <main className="site-shell bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen flex flex-col justify-between">
      <Navbar />

      <div className="pt-[70px]">
        {/* Pricing Hero Section */}
        <section className="py-8 md:py-14 border-b border-[hsl(var(--foreground)/.14)]">
          <div className="container-wide">
            
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--foreground)/.52)] mb-4">
              <a href="/" className="hover:text-[hsl(var(--accent))] transition-colors">Home</a>
              <span>/</span>
              <span className="mono text-[hsl(var(--accent))] font-semibold">Pricing</span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr] items-start">
              <div>
                <span className="eyebrow">TRANSPARENT PRICING</span>
                <h1 className="mt-2 text-[clamp(2.5rem,5.2vw,5.2rem)] font-normal leading-[.92] tracking-[-.035em]">
                  Transparent Pricing.<br />
                  <span className="serif italic text-[hsl(var(--secondary))]">Flexible Engagements.</span>
                </h1>
              </div>

              <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-5 md:p-6 shadow-sm">
                <span className="mono text-[10px] uppercase tracking-[.14em] text-[hsl(var(--accent))] block mb-2 font-semibold">
                  NO HIDDEN FEES
                </span>
                <p className="text-[14.5px] md:text-[15.5px] leading-[1.65] text-[hsl(var(--foreground)/.8)]">
                  We tailor pricing to the role, experience, location, and support you need. Clear costs, flexible engagements, and no hidden fees.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 3 Pricing Models Section */}
        <section className="py-10 md:py-16 border-b border-[hsl(var(--foreground)/.14)]">
          <div className="container-wide space-y-10">
            
            {/* 01. Full-Time Remote Employees */}
            <div className="rounded-2xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6 md:p-10 shadow-sm transition-all hover:border-[hsl(var(--accent)/.4)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[hsl(var(--foreground)/.1)] pb-6 mb-6">
                <div>
                  <span className="serif text-3xl font-normal text-[hsl(var(--accent))]">01</span>
                  <h2 className="text-2xl md:text-3xl font-normal mt-1 text-[hsl(var(--foreground))]">
                    Full-Time Remote Employees
                  </h2>
                  <p className="mono text-xs uppercase tracking-wider text-[hsl(var(--accent))] mt-1 font-semibold">
                    Transparent pricing, built around the hire
                  </p>
                </div>
                <div className="rounded-xl border border-[hsl(var(--accent)/.3)] bg-[hsl(var(--accent)/.1)] px-5 py-3 text-right">
                  <span className="block text-[10px] uppercase tracking-widest text-[hsl(var(--foreground)/.5)] font-mono">Pricing Structure</span>
                  <span className="serif text-xl md:text-2xl font-light text-[hsl(var(--accent))]">Custom</span>
                  <span className="block text-[11px] text-[hsl(var(--foreground)/.6)]">Based on role, experience &amp; location</span>
                </div>
              </div>

              <p className="text-[15px] leading-[1.65] text-[hsl(var(--foreground)/.8)] max-w-[900px] mb-6">
                Every hire is different, so we don't force it into a flat rate. Pricing is set around the role, location, experience level, and what the job actually needs to run — no subscriptions, no long-term contracts, no surprises.
              </p>

              <div className="rounded-xl border border-[hsl(var(--foreground)/.12)] bg-[hsl(var(--muted)/.4)] p-4 mb-8">
                <h4 className="font-semibold text-sm text-[hsl(var(--foreground))] mb-1 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[hsl(var(--accent))]" /> Build long-term remote teams, without the overhead
                </h4>
                <p className="text-xs md:text-sm text-[hsl(var(--foreground)/.7)] leading-relaxed">
                  We handle sourcing, vetting, and onboarding so you can build a stable, integrated remote team — not a rotating cast of contractors.
                </p>
              </div>

              <div className="mb-8 border-b border-[hsl(var(--foreground)/.1)] pb-6">
                <span className="mono text-[11px] uppercase tracking-wider text-[hsl(var(--accent))] font-semibold block mb-2">
                  ROLES WE PLACE
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Paralegal and Secretarial", "Book-keeping", "Accountant", "IT related services"].map((role) => (
                    <span key={role} className="rounded-lg border border-[hsl(var(--foreground)/.15)] bg-[hsl(var(--background))] px-3 py-1.5 text-xs text-[hsl(var(--foreground)/.85)] font-medium">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <span className="mono text-[11px] uppercase tracking-wider text-[hsl(var(--accent))] font-semibold block mb-3">
                    WHAT'S INCLUDED
                  </span>
                  <ul className="space-y-2.5">
                    {whatsIncludedFullTime.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs md:text-sm text-[hsl(var(--foreground)/.75)]">
                        <Check size={16} className="text-[hsl(var(--accent))] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="mono text-[11px] uppercase tracking-wider text-[hsl(var(--accent))] font-semibold block mb-3">
                    BEST FIT FOR
                  </span>
                  <ul className="space-y-2.5">
                    {bestFitFullTime.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs md:text-sm text-[hsl(var(--foreground)/.75)]">
                        <Check size={16} className="text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 02. Virtual Assistant Pricing */}
            <div className="rounded-2xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6 md:p-10 shadow-sm transition-all hover:border-[hsl(var(--accent)/.4)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[hsl(var(--foreground)/.1)] pb-6 mb-6">
                <div>
                  <span className="serif text-3xl font-normal text-[hsl(var(--accent))]">02</span>
                  <h2 className="text-2xl md:text-3xl font-normal mt-1 text-[hsl(var(--foreground))]">
                    Virtual Assistant Pricing
                  </h2>
                  <p className="mono text-xs uppercase tracking-wider text-[hsl(var(--accent))] mt-1 font-semibold">
                    Reliable daily support, without the full-time overhead
                  </p>
                </div>
                <div className="rounded-xl border border-[hsl(var(--accent)/.3)] bg-[hsl(var(--accent)/.1)] px-5 py-3 text-right">
                  <span className="block text-[10px] uppercase tracking-widest text-[hsl(var(--foreground)/.5)] font-mono">Estimated Monthly Salary</span>
                  <span className="serif text-2xl md:text-3xl font-normal text-[hsl(var(--accent))]">$500–$900 USD</span>
                </div>
              </div>

              <p className="text-[15px] leading-[1.65] text-[hsl(var(--foreground)/.8)] max-w-[900px] mb-6">
                Our most requested option — built for founders, operators, and growing teams that need dependable day-to-day help without hiring in-house.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8 border-b border-[hsl(var(--foreground)/.1)] pb-6">
                <div>
                  <span className="mono text-[11px] uppercase tracking-wider text-[hsl(var(--accent))] font-semibold block mb-2">
                    WHO IT'S BUILT FOR
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["eCommerce", "Real Estate", "Customer Support", "Busy Founders"].map((item) => (
                      <span key={item} className="rounded-lg border border-[hsl(var(--foreground)/.15)] bg-[hsl(var(--background))] px-3 py-1.5 text-xs text-[hsl(var(--foreground)/.85)] font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="mono text-[11px] uppercase tracking-wider text-[hsl(var(--accent))] font-semibold block mb-2">
                    ROLES AVAILABLE
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Executive Assistant", "Admin Assistant", "Customer Support", "Data Entry & Research", "Scheduling & Operations"].map((item) => (
                      <span key={item} className="rounded-lg border border-[hsl(var(--foreground)/.15)] bg-[hsl(var(--background))] px-3 py-1.5 text-xs text-[hsl(var(--foreground)/.85)] font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <span className="mono text-[11px] uppercase tracking-wider text-[hsl(var(--accent))] font-semibold block mb-3">
                  BEST FIT FOR
                </span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {bestFitVA.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs md:text-sm text-[hsl(var(--foreground)/.75)]">
                      <Check size={16} className="text-[hsl(var(--accent))] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 03. Operations Coordinator */}
            <div className="rounded-2xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6 md:p-10 shadow-sm transition-all hover:border-[hsl(var(--accent)/.4)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[hsl(var(--foreground)/.1)] pb-6 mb-6">
                <div>
                  <span className="serif text-3xl font-normal text-[hsl(var(--accent))]">03</span>
                  <h2 className="text-2xl md:text-3xl font-normal mt-1 text-[hsl(var(--foreground))]">
                    Operations Coordinator
                  </h2>
                  <p className="mono text-xs uppercase tracking-wider text-[hsl(var(--accent))] mt-1 font-semibold">
                    Keeps daily operations moving, so you don't have to
                  </p>
                </div>
                <div className="rounded-xl border border-[hsl(var(--accent)/.3)] bg-[hsl(var(--accent)/.1)] px-5 py-3 text-right">
                  <span className="block text-[10px] uppercase tracking-widest text-[hsl(var(--foreground)/.5)] font-mono">Estimated Monthly Salary</span>
                  <span className="serif text-2xl md:text-3xl font-normal text-[hsl(var(--accent))]">$1000–$1300 USD</span>
                </div>
              </div>

              <p className="text-[15px] leading-[1.65] text-[hsl(var(--foreground)/.8)] max-w-[900px] mb-6">
                A dependable hire for teams whose schedules, documentation, and vendor relationships need one steady owner — someone who keeps the daily mechanics of the business running without you having to manage it yourself.
              </p>

              <div className="mb-8 border-b border-[hsl(var(--foreground)/.1)] pb-6">
                <span className="mono text-[11px] uppercase tracking-wider text-[hsl(var(--accent))] font-semibold block mb-2">
                  WHO IT'S BUILT FOR
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Professional services firms", "Growing operations teams", "Multi-vendor businesses", "Founders scaling past ad hoc processes"].map((item) => (
                    <span key={item} className="rounded-lg border border-[hsl(var(--foreground)/.15)] bg-[hsl(var(--background))] px-3 py-1.5 text-xs text-[hsl(var(--foreground)/.85)] font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="mono text-[11px] uppercase tracking-wider text-[hsl(var(--accent))] font-semibold block mb-3">
                  BEST FIT FOR
                </span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {bestFitOps.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs md:text-sm text-[hsl(var(--foreground)/.75)]">
                      <Check size={16} className="text-[hsl(var(--secondary))] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Why We Use Custom Pricing & What You Always Get */}
        <section className="py-10 md:py-16 border-b border-[hsl(var(--foreground)/.14)]">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-2">
              
              {/* Why We Use Custom Pricing */}
              <div className="rounded-2xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="eyebrow">TRANSPARENT VALUE</span>
                  <h3 className="text-xl md:text-2xl font-light mt-2 mb-4 text-[hsl(var(--foreground))]">
                    Why we use custom pricing — <span className="serif italic text-[hsl(var(--secondary))]">Pricing Built Around Your Needs</span>
                  </h3>
                  <p className="text-[14.5px] leading-[1.65] text-[hsl(var(--foreground)/.75)] mb-4">
                    Every project is different. Rather than publish a standard price list that may not reflect your actual requirements, we take the time to understand your scope, roles, experience needs, location, timelines, and level of support.
                  </p>
                  <blockquote className="rounded-xl border-l-4 border-l-[hsl(var(--accent))] bg-[hsl(var(--muted)/.4)] p-4 text-xs md:text-sm italic text-[hsl(var(--foreground)/.85)] leading-relaxed mb-6">
                    “We then provide a custom quote tailored to your engagement — giving you clarity on cost and ensuring you pay for the services you actually need.”
                  </blockquote>
                </div>
                <div className="border-t border-[hsl(var(--foreground)/.12)] pt-4 text-xs font-mono tracking-wider uppercase text-[hsl(var(--accent))] font-semibold">
                  Understand the need. Build the right solution. Quote transparently.
                </div>
              </div>

              {/* What You Always Get With Us */}
              <div className="rounded-2xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="eyebrow">THE AVANTRA STANDARD</span>
                  <h3 className="text-xl md:text-2xl font-light mt-2 mb-6 text-[hsl(var(--foreground))]">
                    What you <span className="serif italic text-[hsl(var(--secondary))]">always get</span> with us
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {alwaysGet.map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-lg border border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--background))] p-3.5 text-xs md:text-sm font-medium text-[hsl(var(--foreground)/.85)]">
                        <Check size={16} className="text-[hsl(var(--accent))] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[hsl(var(--foreground)/.12)] text-center">
                  <a href="/#enquire" className="primary-button text-xs py-2.5 px-6 uppercase tracking-wider inline-flex items-center gap-2">
                    Get Your Custom Quote <ArrowRight size={14} />
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
