import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { articlesData } from '../data/articlesData';
import { Clock, ArrowUpRight } from 'lucide-react';

const categories = [
  'All',
  'Legal Support',
  'Remote Staffing',
  'Finance & Bookkeeping',
  'Technology',
  'Working With Us'
];

export const ArticlesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredArticles = selectedCategory === 'All'
    ? articlesData
    : articlesData.filter((article) => article.category === selectedCategory);

  return (
    <main className="site-shell bg-[hsl(var(--background))]">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-14 border-b border-[hsl(var(--foreground)/.1)]">
        <div className="container-wide">
          <div className="eyebrow text-[11px] uppercase tracking-[0.15em] font-mono text-[hsl(var(--accent))]">
            INSIGHTS &amp; ARTICLES
          </div>
          <h1 className="mt-3 text-[clamp(2.8rem,5.5vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.025em] text-[hsl(var(--foreground))] font-sans">
            Insights &amp; Articles.
          </h1>
          <p className="mt-5 max-w-[680px] text-[18px] leading-[1.6] text-[hsl(var(--foreground)/.7)]">
            Practical guidance on legal support, remote teams, bookkeeping and technology, from the people who do the work every day.
          </p>

          {/* Filter Labels Bar */}
          <div className="mt-10 flex flex-wrap items-center gap-2 pt-6 border-t border-[hsl(var(--foreground)/.1)]">
            <span className="text-[12px] font-mono uppercase tracking-[0.1em] text-[hsl(var(--foreground)/.5)] mr-2">
              Filter by:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[12px] uppercase tracking-[0.1em] font-medium rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))] shadow-sm'
                    : 'bg-[hsl(var(--foreground)/.05)] text-[hsl(var(--foreground)/.7)] hover:bg-[hsl(var(--foreground)/.1)]'
                }`}
                data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Cards / Table Section */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          
          {/* Detailed Cards List */}
          <div className="grid gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group border border-[hsl(var(--foreground)/.12)] p-8 md:p-10 rounded-xl bg-[hsl(var(--background))] hover:border-[hsl(var(--accent))] transition-all shadow-sm hover:shadow-md"
                data-testid={`article-card-${article.number}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[hsl(var(--foreground)/.1)]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[14px] text-[hsl(var(--accent))] font-bold">
                      0{article.number}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.14em] font-medium text-[hsl(var(--foreground)/.65)] bg-[hsl(var(--foreground)/.06)] px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[hsl(var(--foreground)/.45)]">
                    <Clock size={13} />
                    <span>{article.readTime} read</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-[22px] md:text-[26px] font-normal leading-[1.3] text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--accent))] transition-colors">
                    {article.title}
                  </h2>
                  <p className="mt-3.5 text-[16px] leading-[1.65] text-[hsl(var(--foreground)/.68)] max-w-[900px]">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[hsl(var(--foreground)/.08)] flex items-center justify-between">
                  <a
                    href={`/articles/${article.slug}`}
                    className="line-link inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-[hsl(var(--accent))]"
                    data-testid={`link-read-article-${article.number}`}
                  >
                    Read Article <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};
