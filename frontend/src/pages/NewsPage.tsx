import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { newsData } from '../data/newsData';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

export const NewsPage: React.FC = () => {
  return (
    <main className="site-shell bg-[hsl(var(--background))]">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 border-b border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--muted)/.4)]">
        <div className="container-wide">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[11px] uppercase tracking-[0.14em] font-mono font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.1)] px-3 py-1 rounded-full">
              Company Announcements
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,5vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[hsl(var(--foreground))]">
            News
          </h1>

          <p className="mt-4 text-[18px] md:text-[22px] leading-[1.5] text-[hsl(var(--foreground)/.75)] max-w-[750px] font-light">
            The latest from Avantra Consulting.
          </p>
        </div>
      </section>

      {/* News Feed Cards Grid */}
      <section className="py-16 md:py-24">
        <div className="container-wide max-w-[1100px]">
          <div className="grid gap-8 md:gap-10">
            {newsData.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-[hsl(var(--foreground)/.12)] p-8 md:p-10 shadow-sm transition-all hover:shadow-md hover:border-[hsl(var(--accent)/.4)] group"
              >
                <div className="flex flex-wrap items-center gap-4 text-[13px] text-[hsl(var(--foreground)/.6)] mb-4 font-mono">
                  <span className="flex items-center gap-1.5 font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.08)] px-3 py-1 rounded-md">
                    <Tag size={13} /> {item.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[hsl(var(--foreground)/.5)]">
                    <Calendar size={13} /> {item.date}
                  </span>
                </div>

                <h2 className="text-[22px] md:text-[28px] font-normal leading-snug tracking-[-0.015em] text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--accent))] transition-colors">
                  {item.title}
                </h2>

                <p className="mt-4 text-[16px] md:text-[17px] leading-[1.7] text-[hsl(var(--foreground)/.78)] font-light">
                  {item.content}
                </p>
              </article>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-16 p-8 md:p-10 rounded-2xl bg-[hsl(var(--muted))] border border-[hsl(var(--foreground)/.15)] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[hsl(var(--accent))] font-medium">Stay Connected</span>
              <h3 className="text-[22px] font-normal text-[hsl(var(--foreground))] mt-1">
                Want to learn more about working with Avantra Consulting?
              </h3>
            </div>
            <a href="/#enquire" className="nav-cta px-6 py-3.5 text-[13px] font-bold inline-flex items-center gap-2 shrink-0">
              Schedule a Consultation <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
