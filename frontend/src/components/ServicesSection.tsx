import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Zt } from '../data/servicesData';

export const ServicesSection: React.FC = () => {
  const usServices = Zt.filter((r) => r.market === 'US Services');
  const indiaServices = Zt.filter((r) => r.market === 'India Services');

  return (
    <section id="services" className="dark-panel scroll-mt-8 py-24 md:py-32">
      <div className="container-wide grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <div className="eyebrow">Services</div>
          <h2 className="mt-5 max-w-[400px] text-[clamp(3rem,5vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.025em]">
            Business<br />
            <span className="serif italic text-[hsl(var(--accent))]">support</span><br />
            with range.
          </h2>
          <p className="muted-copy mt-8 max-w-[340px] text-[15px] leading-[1.65]">
            Choose the market and capability that fits your brief. We bring practical expertise, flexible engagement models and visible ownership to the work.
          </p>
        </div>

        <div className="self-end">
          <div className="service-group">
            <div className="service-group-label eyebrow">US Services</div>
            {usServices.map((r) => (
              <a 
                key={r.number} 
                href={`/services/${r.slug}`} 
                className="service-row" 
                data-testid={`row-service-${r.number}`}
              >
                <span className="service-num">{r.number}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.summary}</p>
                </div>
                <ArrowRight className="service-arrow" size={18} />
              </a>
            ))}
          </div>

          <div className="service-group mt-10">
            <div className="service-group-label eyebrow">India Services</div>
            {indiaServices.map((r) => (
              <a 
                key={r.number} 
                href={`/services/${r.slug}`} 
                className="service-row" 
                data-testid={`row-service-${r.number}`}
              >
                <span className="service-num">{r.number}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.summary}</p>
                </div>
                <ArrowRight className="service-arrow" size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
