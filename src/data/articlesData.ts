export interface ArticleItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
}

export const articlesData: ArticleItem[] = [
  {
    id: "lpo-what-it-covers",
    number: "1",
    slug: "what-legal-process-outsourcing-covers",
    title: "What Legal Process Outsourcing Really Covers (and What It Doesn't)",
    category: "Legal Support",
    readTime: "5 min",
    excerpt: "LPO isn't about replacing your attorneys. It's about giving them back the hours they lose to drafting, tracking and filing. Here's where outsourcing fits and where it doesn't."
  },
  {
    id: "remote-staff-freelancers-agency",
    number: "2",
    slug: "remote-staff-vs-freelancers-vs-agency",
    title: "Remote Staff, Freelancers or an Agency? Choosing the Right Model",
    category: "Remote Staffing",
    readTime: "5 min",
    excerpt: "Each model solves a different problem. We compare cost, control, continuity and risk so you can pick the one that fits."
  },
  {
    id: "closing-books-five-days",
    number: "3",
    slug: "five-day-month-end-close",
    title: "Closing Your Books in Five Days: A Monthly Routine That Works",
    category: "Finance & Bookkeeping",
    readTime: "5 min",
    excerpt: "A slow month-end close means decisions made on old numbers. A simple five-day routine for small and mid-sized businesses."
  },
  {
    id: "how-we-onboard-new-client",
    number: "4",
    slug: "how-we-onboard-new-clients",
    title: "How We Onboard a New Client: Our Five-Step Process",
    category: "Working With Us",
    readTime: "4 min",
    excerpt: "From the first questionnaire to ongoing optimization, here's exactly what happens when you start working with Avantra."
  },
  {
    id: "keeping-client-data-safe",
    number: "5",
    slug: "data-security-when-outsourcing",
    title: "Keeping Client Data Safe When You Outsource",
    category: "Technology",
    readTime: "5 min",
    excerpt: "Outsourcing shouldn't mean giving up control of your data. The safeguards to ask any provider about, including us."
  }
];
