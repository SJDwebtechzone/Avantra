
export interface Capability {
  title: string;
  copy: string;
}

export interface Service {
  number: string;
  slug: string;
  market: "US Services" | "India Services";
  title: string;
  summary: string;
  intro: string;
  capabilities: Capability[];
}

export const Zt: Service[] = [
  {
    number: "01",
    slug: "legal-services",
    market: "US Services",
    title: "Legal Services",
    summary: "Reliable legal support for firms and teams managing demanding caseloads.",
    intro: "Our legal services team extends your capacity with careful, process-driven support across the work that keeps matters moving.",
    capabilities: [
      { title: "Paralegal Support", copy: "Day-to-day matter support that helps attorneys stay focused on strategy, advocacy and client service." },
      { title: "Legal Drafting", copy: "Clear, consistent drafts for correspondence, pleadings, agreements, notices and other legal documents." },
      { title: "Legal Research", copy: "Structured research that turns the relevant authorities and facts into practical working insight." },
      { title: "Case Management", copy: "Organized matter coordination, document control and deadline visibility from intake through resolution." },
      { title: "FDCPA", copy: "Support for Fair Debt Collection Practices Act matters, including research, documentation and workflow assistance." },
      { title: "Bankruptcy", copy: "Reliable support for bankruptcy workflows, filings, notices and the documentation around each matter." },
      { title: "Debt Defense", copy: "Process support for debt defense matters, helping teams prepare, organize and move cases forward." },
      { title: "Notice Drafting", copy: "Accurate, timely notices prepared to fit your process, matter requirements and review standards." }
    ]
  },
  {
    number: "02",
    slug: "remote-staffing-solutions",
    market: "US Services",
    title: "Remote Staffing Solutions",
    summary: "Dedicated remote professionals who become a dependable part of your team.",
    intro: "We recruit, vet, and manage full time remote team members who work directly for your business. You gain long term stability, predictable staffing costs, and premium talent from markets known for high performance. We handle hiring structure, onboarding support, local HR oversight, and workspace options depending on the country.",
    capabilities: [
      { title: "Full Time Dedicated Remote Staff", copy: "Build a stable extension of your team with professionals selected around your roles, systems and working style." },
      { title: "Full time, role specific professionals", copy: "Add focused capacity for legal, finance, operations, technology or other defined functions." },
      { title: "Tailored recruitment for your business needs", copy: "Recruitment is shaped around the skills, experience and communication style your business actually needs." },
      { title: "Office, hybrid, or remote working setups", copy: "Choose the working model that fits your team, market and operating requirements." },
      { title: "Local HR support and worker stability", copy: "Local oversight supports consistent performance, employee care and long-term team stability." },
      { title: "One monthly invoice", copy: "Keep administration simple with one predictable monthly invoice for your dedicated team." },
      { title: "No need to open a foreign entity", copy: "Expand your capacity without setting up a foreign entity just to employ and manage a remote team." },
      { title: "Legal Secretarial Support", copy: "Add trained legal secretarial capacity for scheduling, document coordination, correspondence and matter administration." }
    ]
  },
  {
    number: "03",
    slug: "bookkeeping-accounting",
    market: "US Services",
    title: "Bookkeeping & Accounting",
    summary: "Accurate financial operations that give your business a clearer view of performance.",
    intro: "Keep the books current, organized and useful with dependable support that fits your existing systems and reporting rhythm.",
    capabilities: [
      { title: "Bookkeeping Support", copy: "Consistent transaction processing and account maintenance for clean, current records." },
      { title: "Reconciliations", copy: "Regular reconciliations that help identify discrepancies early and maintain confidence in the numbers." },
      { title: "Management Reporting", copy: "Practical reports that make financial information easier to understand and act on." },
      { title: "Accounts Payable & Receivable", copy: "Organized support across invoicing, collections, payables and the follow-up that keeps cash moving." }
    ]
  },
  {
    number: "04",
    slug: "it-enabled-services",
    market: "US Services",
    title: "IT-Enabled Services",
    summary: "Technology-enabled process support that makes everyday operations more efficient.",
    intro: "We combine capable people with practical technology to improve repeatable workflows, visibility and service delivery.",
    capabilities: [
      { title: "Process Support", copy: "Structured delivery for repeatable workflows that need consistency, speed and clear ownership." },
      { title: "Data & Document Operations", copy: "Organized handling of information, documents and inputs across the processes your team relies on." },
      { title: "Workflow Improvement", copy: "Practical recommendations and implementation support to remove friction from daily work." },
      { title: "Technology Coordination", copy: "A responsive extension of your team for technology-enabled business operations." }
    ]
  },
  {
    number: "05",
    slug: "consulting",
    market: "India Services",
    title: "Consulting",
    summary: "Clear thinking and practical guidance for important business decisions.",
    intro: "We help organizations understand the operating reality, make better decisions and move from direction to execution with confidence.",
    capabilities: [
      { title: "Business Strategy", copy: "Structured thinking to clarify priorities, choices and the path forward." },
      { title: "Operations Advisory", copy: "Practical insight into processes, accountability and the systems that make work move." },
      { title: "Organizational Transformation", copy: "Support for teams navigating change, growth and new ways of working." },
      { title: "Decision Support", copy: "Independent perspective for the moments where a clear outside view creates progress." }
    ]
  },
  {
    number: "06",
    slug: "technology",
    market: "India Services",
    title: "Technology",
    summary: "Digital capability for businesses building, improving and growing online.",
    intro: "From websites and search visibility to apps and flexible specialist support, we help businesses turn technology needs into useful, working outcomes.",
    capabilities: [
      { title: "Website Building", copy: "Responsive, purposeful websites that give your business a clear and credible digital presence." },
      { title: "SEO", copy: "Search optimization that improves discoverability, relevance and the quality of traffic reaching your business." },
      { title: "App Development", copy: "Web and mobile applications designed around real user needs, practical workflows and scalable foundations." },
      { title: "Freelancing", copy: "Flexible access to skilled technology specialists for defined projects, ongoing support or extra delivery capacity." }
    ]
  },
  {
    number: "07",
    slug: "outsourcing",
    market: "India Services",
    title: "Outsourcing",
    summary: "Flexible operational support for the work that keeps your business moving.",
    intro: "Extend your team with reliable delivery across essential business processes, without adding unnecessary overhead to your internal operation.",
    capabilities: [
      { title: "Data Entry", copy: "Accurate, organized data handling that keeps records current and teams ready to act." },
      { title: "Brand Promotion", copy: "Consistent outreach and promotional support to help your brand stay visible and connected to its audience." },
      { title: "Advertisement", copy: "Practical advertising support across campaign coordination, creative execution and performance follow-through." },
      { title: "Payroll Management", copy: "Dependable payroll administration that supports timely, accurate and organized employee payments." },
      { title: "Taxation", copy: "Structured support for tax-related administration, documentation and recurring compliance workflows." }
    ]
  }
];

export const UE = [
  {
    number: "01",
    title: "Business Services — United States",
    copy: "Operational support for organizations that need dependable capacity across critical business functions.",
    details: ["Legal Services", "Remote Staffing Solutions", "Bookkeeping & Accounting", "IT-Enabled Services"]
  },
  {
    number: "02",
    title: "Consulting — India",
    copy: "Strategy, technology and advisory support for organizations shaping what comes next.",
    details: ["Consulting", "Technology", "Outsourcing"]
  }
];

export const kE = [
  ["01", "Listen closely", "We begin with the operating reality: the bottleneck, the handoff, the deadline, the standard."],
  ["02", "Shape the right team", "The right mix of legal, finance, technology and process expertise—without unnecessary layers."],
  ["03", "Work in your rhythm", "Clear ownership, practical updates and work that fits into the systems you already trust."],
  ["04", "Keep improving", "We measure what matters, learn the pattern and make the next cycle easier than the last."]
];

export const Hp = [
  {
    label: "About",
    href: "/story",
    columns: [
      {
        label: "About Avantra",
        items: [
          ["Our Story", "/story"],
          ["Why Us", "/why-us"],
          ["Our Approach", "/approach"],
          ["Pricing", "/pricing"]
        ]
      }
    ]
  },
  {
    label: "Services",
    href: "/services",
    columns: [
      {
        label: "US Services",
        items: [
          ["Legal Services", "/services/legal-services"],
          ["Remote Staffing Solutions", "/services/remote-staffing-solutions"],
          ["Bookkeeping & Accounting", "/services/bookkeeping-accounting"],
          ["IT-Enabled Services", "/services/it-enabled-services"]
        ]
      },
      {
        label: "India Services",
        items: [
          ["Consulting", "/services/consulting"],
          ["Technology", "/services/technology"],
          ["Outsourcing", "/services/outsourcing"]
        ]
      }
    ]
  },
  {
    label: "Solutions by Region",
    href: "/#regions",
    columns: [
      {
        label: "Markets",
        items: [
          ["United States", "/#region-us"],
          ["India", "/#region-india"]
        ]
      }
    ]
  },
  {
    label: "Insights",
    href: "/#insights",
    columns: [
      {
        label: "Explore",
        items: [
          ["Articles", "/articles"],
          ["News & Announcements", "/news"],
          ["Updates", "/updates"],
          ["Case Studies", "/case-studies"]
        ]
      }
    ]
  }
];

