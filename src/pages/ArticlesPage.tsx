import React, { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { articlesData, ArticleItem } from '../data/articlesData';
import { Clock, ArrowUpRight, Database } from 'lucide-react';

export const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<ArticleItem[]>(articlesData);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isDynamic, setIsDynamic] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setArticles(json.data);
          setIsDynamic(true);
        }
      })
      .catch((err) => {
        console.warn('Using local fallback for articles:', err);
      });
  }, []);

  // Dynamically extract categories from database records
  const dynamicCategories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter((article) => article.category === selectedCategory);

  return (
    <main className="site-shell bg-[hsl(var(--background))]">
      <SEO 
        title="Articles & Insights | Legal Process Outsourcing & Remote Operations"
        description="Thought leadership and operational guides from Avantra Consulting on legal process outsourcing, offshore staffing, month-end financial closing, and data security."
        canonical="https://avantraconsulting.com/articles"
      />
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-14 border-b border-[hsl(var(--foreground)/.1)]">
        <div className="container-wide">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="eyebrow text-[11px] uppercase tracking-[0.15em] font-mono text-[hsl(var(--accent))]">
              INSIGHTS &amp; ARTICLES
            </span>
            {isDynamic && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.1em] text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full font-medium">
                <Database size={11} /> PostgreSQL Live
              </span>
            )}
          </div>

          <h1 className="mt-3 text-[clamp(2.8rem,5.5vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.025em] text-[hsl(var(--foreground))] font-sans">
            Insights &amp; Articles.
          </h1>
          <p className="mt-5 max-w-[680px] text-[18px] leading-[1.6] text-[hsl(var(--foreground)/.92)] font-normal">
            Practical guidance on legal support, remote teams, bookkeeping and technology, from the people who do the work every day.
          </p>

          {/* Filter Labels Bar */}
          <div className="mt-10 flex flex-wrap items-center gap-2 pt-6 border-t border-[hsl(var(--foreground)/.1)]">
            <span className="text-[12px] font-mono uppercase tracking-[0.1em] text-[hsl(var(--foreground)/.5)] mr-2">
              Filter by:
            </span>
            {dynamicCategories.map((cat) => (
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
                className="group border border-[hsl(var(--foreground)/.12)] p-8 md:p-10 rounded-xl bg-white hover:border-[hsl(var(--accent))] transition-all shadow-sm hover:shadow-md"
                data-testid={`article-card-${article.number}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[hsl(var(--foreground)/.1)]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[14px] text-[hsl(var(--accent))] font-bold">
                      0{article.number}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.14em] font-medium text-[hsl(var(--foreground)/.85)] bg-[hsl(var(--foreground)/.06)] px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[hsl(var(--foreground)/.75)]">
                    <Clock size={13} />
                    <span>{article.readTime} read</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-[22px] md:text-[26px] font-normal leading-[1.3] text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--accent))] transition-colors">
                    {article.title}
                  </h2>
                  <p className="mt-3.5 text-[16px] leading-[1.65] text-[hsl(var(--foreground)/.92)] font-normal max-w-[900px]">
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
