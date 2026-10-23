import React, { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowRight, TrendingUp, Database, Building2 } from 'lucide-react';

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: string;
  date: string;
}

const fallbackCaseStudies: CaseStudyItem[] = [
  {
    id: "cross-border-tax-structuring",
    slug: "cross-border-tax-structuring-fintech",
    title: "Cross-Border Entity & Tax Structuring for US-India FinTech",
    client: "Global FinTech Operator",
    category: "Finance & Legal",
    challenge: "A fast-growing US FinTech needed to establish a dedicated engineering & compliance hub in Bangalore while navigating transfer pricing, dual-jurisdiction tax treaties, and Delaware corporate governance.",
    solution: "Avantra deployed a joint US-India corporate advisory team to draft master service agreements, implement IRS & RBI compliance workflows, and establish an automated reconciliation engine.",
    outcome: "Saved $180,000 in redundant entity structuring costs and achieved full regulatory clearance across both jurisdictions within 90 days.",
    metrics: "90-Day Clearance · $180k Saved",
    date: "Q3 2026"
  },
  {
    id: "high-volume-paralegal-roster",
    slug: "high-volume-paralegal-scaling",
    title: "Scaling Paralegal Capacity for Multi-State Debt Defense Practice",
    client: "New York Consumer Litigation Firm",
    category: "Legal Support",
    challenge: "The firm was handling 800+ monthly case filings across New York and New Jersey. In-house attorneys spent 40% of their billable hours drafting routine validation notices and filing motions.",
    solution: "Avantra placed 6 dedicated senior paralegals trained in FDCPA & Regulation F protocols directly into the firm's Clio and case management portals under strict US data encryption standards.",
    outcome: "Turnaround dropped from 72 hours to under 8 hours with zero missed statutory deadlines, freeing senior attorneys to double their active caseload.",
    metrics: "8-Hour Turnaround · 0 Missed Deadlines",
    date: "August 2026"
  },
  {
    id: "five-day-month-end-close",
    slug: "five-day-close-implementation",
    title: "Streamlining Month-End Close from 21 Days to 5 Days",
    client: "Multi-Entity SaaS Enterprise",
    category: "Finance & Bookkeeping",
    challenge: "Leadership received financial reports 3 weeks after month-end, creating blind spots in cash flow planning and investor burn rate metrics across 4 operating subsidiaries.",
    solution: "Avantra's certified QuickBooks & accounting specialists restructured chart-of-accounts mapping, automated Stripe-to-bank daily matching, and introduced a 5-day closing checklist.",
    outcome: "Clean financial packages delivered by Business Day 5 every month, giving executive leadership real-time clarity on operating runway.",
    metrics: "76% Faster Close · Day 5 Delivery",
    date: "July 2026"
  },
  {
    id: "dedicated-remote-tech-staffing",
    slug: "dedicated-remote-technical-staffing",
    title: "Full-Cycle Remote Engineering & Cloud Operations Staffing",
    client: "Healthcare Logistics Provider",
    category: "Remote Staffing & Technology",
    challenge: "Urgent requirement for SOC2-compliant HIPAA data pipeline specialists with high retention and immediate availability in US Eastern Time overlap.",
    solution: "Avantra screened, vetted, and onboarded a 5-engineer dedicated squad in Bangalore equipped with enterprise VPNs, encrypted work laptops, and continuous activity monitoring.",
    outcome: "Position fill time reduced from 90 days to 14 days, with 100% staff retention over 18 consecutive months and 55% reduction in total cost of hiring.",
    metrics: "14-Day Placement · 55% Cost Reduction",
    date: "May 2026"
  }
];

export const CaseStudiesPage: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>(fallbackCaseStudies);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isDynamic, setIsDynamic] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/case-studies')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setCaseStudies(json.data);
          setIsDynamic(true);
        }
      })
      .catch((err) => {
        console.warn('Using local fallback for case studies:', err);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(caseStudies.map((cs) => cs.category)))];

  const filtered = selectedCategory === 'All'
    ? caseStudies
    : caseStudies.filter((cs) => cs.category === selectedCategory);

  return (
    <main className="site-shell bg-[hsl(var(--background))]">
      <SEO 
        title="Case Studies & Client Results | Avantra Consulting"
        description="See real-world case studies of how Avantra Consulting helps law firms, fintechs, and enterprises scale operations, accelerate month-end closes, and reduce staffing overhead."
        canonical="https://avantraconsulting.com/case-studies"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-14 border-b border-[hsl(var(--foreground)/.1)]">
        <div className="container-wide">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[11px] uppercase tracking-[0.14em] font-mono font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.1)] px-3 py-1 rounded-full">
              Client Outcomes &amp; Case Studies
            </span>
            {isDynamic && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.1em] text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full font-medium">
                <Database size={11} /> PostgreSQL Live
              </span>
            )}
          </div>

          <h1 className="text-[clamp(2.5rem,5vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[hsl(var(--foreground))] max-w-[900px] font-sans">
            Case Studies.
          </h1>

          <p className="mt-5 text-[18px] md:text-[22px] leading-[1.5] text-[hsl(var(--foreground)/.92)] max-w-[800px] font-normal">
            Real-world engagements where practical expertise, flexible staffing, and rigorous execution moved the needle for our clients.
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

      {/* Case Studies Grid */}
      <section className="py-16 md:py-24">
        <div className="container-wide max-w-[1100px]">
          <div className="grid gap-10">
            {filtered.map((cs) => (
              <article
                key={cs.id}
                className="bg-white rounded-2xl border border-[hsl(var(--foreground)/.12)] p-8 md:p-12 shadow-sm transition-all hover:shadow-md hover:border-[hsl(var(--accent)/.4)] group"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[hsl(var(--foreground)/.1)]">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[hsl(var(--foreground)/.85)] bg-[hsl(var(--foreground)/.06)] px-3 py-1 rounded-full">
                      <Building2 size={13} className="text-[hsl(var(--accent))]" /> {cs.client}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.08)] px-2.5 py-1 rounded-md">
                      {cs.category}
                    </span>
                  </div>
                  {cs.metrics && (
                    <div className="inline-flex items-center gap-2 text-[12.5px] font-mono font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-full">
                      <TrendingUp size={14} className="text-emerald-700" />
                      <span>{cs.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 className="mt-6 text-[24px] md:text-[30px] font-normal leading-snug tracking-[-0.015em] text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--accent))] transition-colors">
                  {cs.title}
                </h2>

                {/* Detailed Narrative Grid */}
                <div className="mt-8 grid gap-6 md:grid-cols-3 pt-6 border-t border-[hsl(var(--foreground)/.08)]">
                  <div className="rounded-xl bg-[hsl(var(--muted)/.3)] p-5 border border-[hsl(var(--foreground)/.06)]">
                    <span className="text-[10px] uppercase tracking-[0.14em] font-mono text-[hsl(var(--foreground)/.6)] font-semibold block mb-2">
                      The Challenge
                    </span>
                    <p className="text-[14px] leading-[1.65] text-[hsl(var(--foreground)/.92)] font-normal">
                      {cs.challenge}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[hsl(var(--muted)/.3)] p-5 border border-[hsl(var(--foreground)/.06)]">
                    <span className="text-[10px] uppercase tracking-[0.14em] font-mono text-[hsl(var(--accent))] font-semibold block mb-2">
                      Avantra Solution
                    </span>
                    <p className="text-[14px] leading-[1.65] text-[hsl(var(--foreground)/.92)] font-normal">
                      {cs.solution}
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50/50 p-5 border border-emerald-200/60">
                    <span className="text-[10px] uppercase tracking-[0.14em] font-mono text-emerald-800 font-semibold block mb-2">
                      Business Outcome
                    </span>
                    <p className="text-[14px] leading-[1.65] text-emerald-950 font-normal">
                      {cs.outcome}
                    </p>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-8 pt-6 border-t border-[hsl(var(--foreground)/.08)] flex items-center justify-between">
                  <span className="text-[12px] font-mono text-[hsl(var(--foreground)/.6)]">
                    Engagement Period: {cs.date}
                  </span>
                  <a
                    href="/#enquire"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[hsl(var(--accent))] hover:underline"
                  >
                    Request Similar Case Analysis <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-14 rounded-2xl border border-[hsl(var(--foreground)/.12)] bg-white p-8 md:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[hsl(var(--accent))] font-medium">Custom Briefs</span>
              <h3 className="text-[22px] font-normal text-[hsl(var(--foreground))] mt-1">
                Have a specific operational challenge to solve?
              </h3>
              <p className="text-[15px] text-[hsl(var(--foreground)/.8)] mt-2 max-w-[550px]">
                Tell us your caseload, turnaround target, or reconciliation backlog. We will prepare a transparent scoping review.
              </p>
            </div>
            <a
              href="/#enquire"
              className="primary-button whitespace-nowrap self-start md:self-center"
            >
              Consult an Advisor <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CaseStudiesPage;
