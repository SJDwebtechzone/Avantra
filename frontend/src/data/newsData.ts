export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
}

export const newsData: NewsItem[] = [
  {
    id: "launches-new-website",
    title: "Avantra Consulting Launches New Website",
    date: "October 2026",
    category: "Company News",
    content: "We're pleased to launch our new website, designed to make it easier to find the right service, understand how we work and get in touch. Visitors can now explore our legal process outsourcing, remote staffing, bookkeeping, IT-enabled services and consulting offerings in one place, read practical articles from our team, and start onboarding with our online client questionnaire."
  },
  {
    id: "five-year-business-milestone",
    title: "Avantra Marks Five Year in Business Milestone",
    date: "October 2026",
    category: "Company News",
    content: "This October 2026, Avantra Consulting reached \"five years in business\". We want to thank our clients, who trust us with their work every day, and our team, who make \"solutioning together\" real. Here's to the next chapter."
  },
  {
    id: "partners-with-front-source-technologies",
    title: "Avantra Partners with Front Source Technologies Private Limited",
    date: "June 2024",
    category: "Partnerships",
    content: "Avantra Consulting has partnered with Front Source Technologies Private Limited to offer certified bookkeeping on QuickBooks Online and other IT enabled services. This partnership brings multiple capabilities under one leadership and one integrated platform, allowing clients to access a broader range of solutions while reducing costs, simplifying coordination, and improving operational efficiency."
  },
  {
    id: "expanded-paralegal-support",
    title: "Expanded Paralegal Support for Bankruptcy and Debt Defense Matters",
    date: "January 2022",
    category: "Services",
    content: "Avantra has expanded its legal support team to meet growing demand from firms handling bankruptcy, FDCPA and debt defense matters. Our paralegals now support notice drafting, case management, document preparation and deadline tracking for firms across New York & New Jersey states. Firms can start with a single workflow and scale as volumes change."
  }
];
