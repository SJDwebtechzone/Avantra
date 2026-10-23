import React from 'react';

export const InsightsSection: React.FC = () => {
  const categories = [
    { title: "Articles", href: "/articles", desc: "Practical guides & industry insight" },
    { title: "Updates", href: "/updates", desc: "Service improvements & process updates" },
    { title: "Case Studies", href: "/case-studies", desc: "Client success stories & outcomes" },
    { title: "News", href: "/news", desc: "The latest from Avantra Consulting" }
  ];

  return (
    <section id="insights" className="bg-[hsl(var(--background))] scroll-mt-8 py-24 md:py-32 border-t border-[hsl(var(--foreground)/.08)]">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="eyebrow">Insights</div>
            <h2 className="mt-5 max-w-[460px] text-[clamp(3rem,5vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.025em]">
              Thinking for<br />
              <span className="serif italic text-[hsl(var(--secondary))]">the work ahead.</span>
            </h2>
          </div>

          <div>
            <p className="max-w-[540px] text-[17px] leading-[1.6] text-[hsl(var(--foreground)/.92)] font-normal">
              Avantra insights bring together practical perspectives on business strategy, technology, legal operations, bookkeeping, and company announcements.
            </p>

            <div className="insight-grid mt-12">
              {categories.map((item, idx) => (
                <a key={item.title} href={item.href} className="insight-card block group">
                  <span className="practice-number">0{idx + 1}</span>
                  <h3 className="group-hover:text-[hsl(var(--accent))] transition-colors">{item.title}</h3>
                  <p>{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
