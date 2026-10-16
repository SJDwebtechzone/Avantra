import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const RegionalSection: React.FC = () => {
  return (
    <section id="regions" className="region-panel scroll-mt-8 bg-[hsl(var(--muted))] py-24 md:py-32">
      <div className="container-wide">
        <div className="max-w-[720px]">
          <div className="eyebrow">Solutions by region</div>
          <h2 className="mt-5 text-[clamp(3rem,6vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.025em]">
            One partner.<br />
            <span className="serif italic text-[hsl(var(--secondary))]">Two markets.</span><br />
            Multiple capabilities.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <article id="region-us" className="region-card scroll-mt-8">
            <div className="eyebrow">United States</div>
            <h3>Operational support for organizations that need dependable capacity.</h3>
            <p>Legal Services · Remote Staffing Solutions · Bookkeeping & Accounting · IT-Enabled Services</p>
            <a href="/services" className="line-link">
              Explore US Services <ArrowUpRight size={14} />
            </a>
          </article>

          <article id="region-india" className="region-card scroll-mt-8">
            <div className="eyebrow">India</div>
            <h3>Consulting and advisory support for the next stage of growth.</h3>
            <p>Consulting · Technology · Outsourcing</p>
            <a href="/services" className="line-link">
              Explore India Services <ArrowUpRight size={14} />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};
