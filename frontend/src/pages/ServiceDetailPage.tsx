import React from 'react';
import { useRoute } from 'wouter';
import { Navbar } from '../components/Navbar';
import { EnquireSection } from '../components/EnquireSection';
import { Footer } from '../components/Footer';
import { Zt } from '../data/servicesData';

export const ServiceDetailPage: React.FC = () => {
  const [, params] = useRoute('/services/:slug');
  const slug = params?.slug;

  const service = Zt.find((s) => s.slug === slug) || Zt[0];

  return (
    <main className="site-shell">
      <Navbar light={true} />

      <section className="service-detail-hero dark-panel">
        <div className="container-wide grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <a href="/services" className="service-back line-link">
              ← All services
            </a>
            <div className="eyebrow mt-12">
              {service.market} · {service.number}
            </div>
            <h1 className="mt-6 max-w-[760px] text-[clamp(3.8rem,8vw,8.5rem)] font-normal leading-[0.95] tracking-[-0.025em]">
              {service.title}
            </h1>
          </div>

          <div className="service-detail-intro">
            <p className="text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.25] text-[hsl(var(--primary-foreground)/.86)]">
              {service.summary}
            </p>
            <p className="mt-7 max-w-[570px] text-[15px] leading-[1.7] text-[hsl(var(--primary-foreground)/.62)]">
              {service.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="service-capabilities bg-[hsl(var(--background))] py-24 md:py-32">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <div className="eyebrow">What we deliver</div>
              <h2 className="mt-5 max-w-[390px] text-[clamp(3rem,5vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.025em]">
                Built around<br />
                <span className="serif italic text-[hsl(var(--secondary))]">your brief.</span>
              </h2>
            </div>

            <div className="service-capability-grid">
              {service.capabilities.map((cap, idx) => (
                <article key={cap.title} className="service-capability">
                  <span className="practice-number">0{idx + 1}</span>
                  <h3>{cap.title}</h3>
                  <p>{cap.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EnquireSection />
      <Footer />
    </main>
  );
};
