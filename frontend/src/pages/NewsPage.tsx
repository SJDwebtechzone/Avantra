import React, { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { newsData, NewsItem } from '../data/newsData';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>(newsData);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetch('/api/news')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setNews(json.data);
        }
      })
      .catch((err) => {
        console.warn('Using local fallback for news:', err);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(news.map((item) => item.category)))];

  const filteredNews = selectedCategory === 'All'
    ? news
    : news.filter((item) => item.category === selectedCategory);

  return (
    <main className="site-shell bg-[hsl(var(--background))]">
      <SEO 
        title="News & Announcements | Avantra Consulting"
        description="Latest company news, service launches, and industry updates from Avantra Consulting."
        canonical="https://avantraconsulting.com/news"
      />
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 border-b border-[hsl(var(--foreground)/.1)]">
        <div className="container-wide">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[11px] uppercase tracking-[0.14em] font-mono font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.1)] px-3 py-1 rounded-full">
              Company Announcements
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,5vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[hsl(var(--foreground))]">
            News
          </h1>

          <p className="mt-4 text-[18px] md:text-[22px] leading-[1.5] text-[hsl(var(--foreground)/.92)] max-w-[750px] font-normal">
            The latest announcements, strategic milestones, and capability updates from Avantra Consulting.
          </p>

          {/* Category Filter Bar */}
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
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Feed Cards Grid */}
      <section className="py-16 md:py-24">
        <div className="container-wide max-w-[1100px]">
          <div className="grid gap-8 md:gap-10">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-[hsl(var(--foreground)/.12)] p-8 md:p-10 shadow-sm transition-all hover:shadow-md hover:border-[hsl(var(--accent)/.4)] group"
              >
                <div className="flex flex-wrap items-center gap-4 text-[13px] text-[hsl(var(--foreground)/.8)] mb-4 font-mono">
                  <span className="flex items-center gap-1.5 font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.08)] px-3 py-1 rounded-md">
                    <Tag size={13} /> {item.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[hsl(var(--foreground)/.75)]">
                    <Calendar size={13} /> {item.date}
                  </span>
                </div>

                <h2 className="text-[22px] md:text-[28px] font-normal leading-snug tracking-[-0.015em] text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--accent))] transition-colors">
                  {item.title}
                </h2>

                <p className="mt-4 text-[16px] md:text-[17px] leading-[1.7] text-[hsl(var(--foreground)/.92)] font-normal">
                  {item.content}
                </p>
              </article>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-14 rounded-2xl border border-[hsl(var(--foreground)/.12)] bg-white p-8 md:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[hsl(var(--accent))] font-medium">Media &amp; Inquiries</span>
              <h3 className="text-[22px] font-normal text-[hsl(var(--foreground))] mt-1">
                Looking for firm commentary or partner interviews?
              </h3>
              <p className="text-[15px] text-[hsl(var(--foreground)/.8)] mt-2 max-w-[550px]">
                Connect with our communications desk for press briefings, executive commentary, or partnership opportunities.
              </p>
            </div>
            <a
              href="/#enquire"
              className="primary-button whitespace-nowrap self-start md:self-center"
            >
              Contact Press Desk <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
