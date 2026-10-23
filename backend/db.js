const { Pool, Client } = require('pg');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'avantra_db',
  password: process.env.DB_PASSWORD || '1234',
  port: parseInt(process.env.DB_PORT || '5432', 10),
};

// Initial database connection pool
let pool = new Pool(dbConfig);

// Seed Data
const initialPricing = [
  {
    plan_key: "full-time-remote",
    number: "01",
    title: "Full-Time Remote Employees",
    subtitle: "Transparent pricing, built around the hire",
    price_structure: "Custom",
    price_note: "Based on role, experience & location",
    description: "Every hire is different, so we don't force it into a flat rate. Pricing is set around the role, location, experience level, and what the job actually needs to run — no subscriptions, no long-term contracts, no surprises.",
    roles: ["Paralegal and Secretarial", "Book-keeping", "Accountant", "IT related services"],
    whats_included: [
      "End-to-end recruitment",
      "Pre-vetted candidate shortlists",
      "Interview coordination",
      "Onboarding support",
      "A dedicated account manager",
      "Monthly employee management",
      "Ongoing performance check-ins"
    ],
    best_fit: [
      "Companies hiring long-term remote talent",
      "Legal and operational roles",
      "Teams that need full-time stability and real integration, not a stopgap"
    ]
  },
  {
    plan_key: "virtual-assistant",
    number: "02",
    title: "Virtual Assistant Pricing",
    subtitle: "Reliable daily support, without the full-time overhead",
    price_structure: "$500–$900 USD",
    price_note: "Estimated Monthly Salary",
    description: "Our most requested option — built for founders, operators, and growing teams that need dependable day-to-day help without hiring in-house.",
    roles: [
      "Executive Assistant",
      "Admin Assistant",
      "Customer Support",
      "Data Entry & Research",
      "Scheduling & Operations"
    ],
    whats_included: [
      "eCommerce & Amazon operations",
      "Real estate coordination",
      "Daily inbox & calendar management",
      "Customer communications & research"
    ],
    best_fit: [
      "Amazon and eCommerce businesses",
      "Real estate teams and agencies",
      "Customer-support-heavy operations",
      "Founders who need reliable daily support without adding headcount"
    ]
  },
  {
    plan_key: "operations-coordinator",
    number: "03",
    title: "Operations Coordinator",
    subtitle: "Keeps daily operations moving, so you don't have to",
    price_structure: "$1000–$1300 USD",
    price_note: "Estimated Monthly Salary",
    description: "A dependable hire for teams whose schedules, documentation, and vendor relationships need one steady owner — someone who keeps the daily mechanics of the business running without you having to manage it yourself.",
    roles: [
      "Professional services firms",
      "Growing operations teams",
      "Multi-vendor businesses",
      "Founders scaling past ad hoc processes"
    ],
    whats_included: [
      "Workflow & SOP standardisation",
      "Cross-team vendor management",
      "Documentation & tracking pipelines",
      "Weekly operational reporting"
    ],
    best_fit: [
      "Businesses juggling multiple moving parts across teams or vendors",
      "Companies ready to replace inbox-and-spreadsheet coordination with real process",
      "Operations that have outgrown one person doing everything informally",
      "Leaders who want the day-to-day owned by someone else, not managed by them"
    ]
  }
];

const initialArticles = [
  {
    article_key: "lpo-what-it-covers",
    number: "1",
    slug: "what-legal-process-outsourcing-covers",
    title: "What Legal Process Outsourcing Really Covers (and What It Doesn't)",
    category: "Legal Support",
    read_time: "5 min",
    excerpt: "LPO isn't about replacing your attorneys. It's about giving them back the hours they lose to drafting, tracking and filing. Here's where outsourcing fits and where it doesn't."
  },
  {
    article_key: "remote-staff-freelancers-agency",
    number: "2",
    slug: "remote-staff-vs-freelancers-vs-agency",
    title: "Remote Staff, Freelancers or an Agency? Choosing the Right Model",
    category: "Remote Staffing",
    read_time: "5 min",
    excerpt: "Each model solves a different problem. We compare cost, control, continuity and risk so you can pick the one that fits."
  },
  {
    article_key: "closing-books-five-days",
    number: "3",
    slug: "five-day-month-end-close",
    title: "Closing Your Books in Five Days: A Monthly Routine That Works",
    category: "Finance & Bookkeeping",
    read_time: "5 min",
    excerpt: "A slow month-end close means decisions made on old numbers. A simple five-day routine for small and mid-sized businesses."
  },
  {
    article_key: "how-we-onboard-new-client",
    number: "4",
    slug: "how-we-onboard-new-clients",
    title: "How We Onboard a New Client: Our Five-Step Process",
    category: "Working With Us",
    read_time: "4 min",
    excerpt: "From the first questionnaire to ongoing optimization, here's exactly what happens when you start working with Avantra."
  },
  {
    article_key: "keeping-client-data-safe",
    number: "5",
    slug: "data-security-when-outsourcing",
    title: "Keeping Client Data Safe When You Outsource",
    category: "Technology",
    read_time: "5 min",
    excerpt: "Outsourcing shouldn't mean giving up control of your data. The safeguards to ask any provider about, including us."
  }
];

const initialUpdates = [
  {
    update_key: "online-client-questionnaire",
    title: "New: Online Client Questionnaire",
    date: "September 2026",
    category: "Service Update",
    content: "New clients can now complete our onboarding questionnaire online before the first call. It takes about 5 minutes and helps us prepare a tailored proposal and draft SLA faster.",
    link_text: "Start the questionnaire →",
    link_href: "/get-started"
  },
  {
    update_key: "monthly-reporting-bookkeeping",
    title: "Monthly Reporting Now Included for All Bookkeeping Clients",
    date: "September 2026",
    category: "Service Update",
    content: "Every bookkeeping client now receives a month-end pack by business day 6: profit and loss, balance sheet, cash summary and a short note on key movements. No change to pricing.",
    link_text: null,
    link_href: null
  },
  {
    update_key: "regulation-f-reminders",
    title: "Industry Update: Regulation F Reminders for Collection Files",
    date: "September 2026",
    category: "Industry Update",
    content: "Regulation F, which implements the FDCPA, sets specific rules on validation notices, call frequency and electronic communication opt-outs, and requires records to be kept for three years. Our legal support team has refreshed its file checklist to match. Read the full checklist in our article, FDCPA and Regulation F: A Practical Checklist for Notice Drafting.",
    link_text: null,
    link_href: null
  },
  {
    update_key: "extended-support-hours",
    title: "Extended Support Hours for North American Clients",
    date: "October 2026",
    category: "Service Update",
    content: "To better serve clients in North American region our team now provides coverage from 9:00 AM EST to 3:30 PM EST, for 5 days a week. Your account manager will confirm any changes to your schedule.",
    link_text: null,
    link_href: null
  }
];

const initialCaseStudies = [
  {
    case_key: "cross-border-tax-structuring",
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
    case_key: "high-volume-paralegal-roster",
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
    case_key: "five-day-month-end-close",
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
    case_key: "dedicated-remote-tech-staffing",
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

const initialNews = [
  {
    news_key: "launches-new-website",
    title: "Avantra Consulting Launches New Website",
    date: "October 2026",
    category: "Company News",
    content: "We're pleased to launch our new website, designed to make it easier to find the right service, understand how we work and get in touch. Visitors can now explore our legal process outsourcing, remote staffing, bookkeeping, IT-enabled services and consulting offerings in one place, read practical articles from our team, and start onboarding with our online client questionnaire."
  },
  {
    news_key: "five-year-business-milestone",
    title: "Avantra Marks Five Year in Business Milestone",
    date: "October 2026",
    category: "Company News",
    content: "This October 2026, Avantra Consulting reached \"five years in business\". We want to thank our clients, who trust us with their work every day, and our team, who make \"solutioning together\" real. Here's to the next chapter."
  },
  {
    news_key: "partners-with-front-source-technologies",
    title: "Avantra Partners with Front Source Technologies Private Limited",
    date: "June 2024",
    category: "Partnerships",
    content: "Avantra Consulting has partnered with Front Source Technologies Private Limited to offer certified bookkeeping on QuickBooks Online and other IT enabled services. This partnership brings multiple capabilities under one leadership and one integrated platform, allowing clients to access a broader range of solutions while reducing costs, simplifying coordination, and improving operational efficiency."
  },
  {
    news_key: "expanded-paralegal-support",
    title: "Expanded Paralegal Support for Bankruptcy and Debt Defense Matters",
    date: "January 2022",
    category: "Services",
    content: "Avantra has expanded its legal support team to meet growing demand from firms handling bankruptcy, FDCPA and debt defense matters. Our paralegals now support notice drafting, case management, document preparation and deadline tracking for firms across New York & New Jersey states. Firms can start with a single workflow and scale as volumes change."
  }
];

// Initialize database, tables, and seed data
async function initializeDatabase() {
  try {
    // 1. Ensure avantra_db database exists
    const adminClient = new Client({
      user: dbConfig.user,
      host: dbConfig.host,
      database: 'postgres',
      password: dbConfig.password,
      port: dbConfig.port,
    });
    await adminClient.connect();
    
    const dbCheck = await adminClient.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbConfig.database]
    );
    
    if (dbCheck.rows.length === 0) {
      console.log(`Database '${dbConfig.database}' does not exist. Creating...`);
      await adminClient.query(`CREATE DATABASE "${dbConfig.database}"`);
      console.log(`Database '${dbConfig.database}' created.`);
    }
    await adminClient.end();

    // 2. Connect pool to avantra_db
    const client = await pool.connect();
    console.log(`Connected to PostgreSQL database: ${dbConfig.database}`);

    // 3. Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS pricing (
        id SERIAL PRIMARY KEY,
        plan_key VARCHAR(100) UNIQUE NOT NULL,
        number VARCHAR(10) NOT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        price_structure VARCHAR(255) NOT NULL,
        price_note VARCHAR(255),
        description TEXT NOT NULL,
        roles TEXT[] DEFAULT '{}',
        whats_included TEXT[] DEFAULT '{}',
        best_fit TEXT[] DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        article_key VARCHAR(100) UNIQUE NOT NULL,
        number VARCHAR(10) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        read_time VARCHAR(50) NOT NULL DEFAULT '5 min',
        excerpt TEXT NOT NULL,
        content TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS updates (
        id SERIAL PRIMARY KEY,
        update_key VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        link_text VARCHAR(255),
        link_href VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS case_studies (
        id SERIAL PRIMARY KEY,
        case_key VARCHAR(100) UNIQUE NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        client VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        challenge TEXT NOT NULL,
        solution TEXT NOT NULL,
        outcome TEXT NOT NULL,
        metrics VARCHAR(255),
        date VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        news_key VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS admin_auth (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        reset_token VARCHAR(255),
        reset_token_expiry TIMESTAMP WITH TIME ZONE,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        services TEXT[],
        message TEXT NOT NULL,
        email_sent BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed default admin if not already present
    await client.query(`
      INSERT INTO admin_auth (username, email, password)
      VALUES ('admin', 'ramyiezhil.1010@gmail.com', 'avantra2026')
      ON CONFLICT (username) DO NOTHING;
    `);

    // 4. Seed Pricing
    for (const pr of initialPricing) {
      await client.query(`
        INSERT INTO pricing (plan_key, number, title, subtitle, price_structure, price_note, description, roles, whats_included, best_fit)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (plan_key) DO UPDATE SET
          number = EXCLUDED.number,
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          price_structure = EXCLUDED.price_structure,
          price_note = EXCLUDED.price_note,
          description = EXCLUDED.description,
          roles = EXCLUDED.roles,
          whats_included = EXCLUDED.whats_included,
          best_fit = EXCLUDED.best_fit,
          updated_at = CURRENT_TIMESTAMP;
      `, [pr.plan_key, pr.number, pr.title, pr.subtitle, pr.price_structure, pr.price_note, pr.description, pr.roles, pr.whats_included, pr.best_fit]);
    }

    // 5. Seed Articles
    for (const art of initialArticles) {
      await client.query(`
        INSERT INTO articles (article_key, number, slug, title, category, read_time, excerpt)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (article_key) DO UPDATE SET
          number = EXCLUDED.number,
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          read_time = EXCLUDED.read_time,
          excerpt = EXCLUDED.excerpt,
          updated_at = CURRENT_TIMESTAMP;
      `, [art.article_key, art.number, art.slug, art.title, art.category, art.read_time, art.excerpt]);
    }

    // 5. Seed Updates
    for (const upd of initialUpdates) {
      await client.query(`
        INSERT INTO updates (update_key, title, date, category, content, link_text, link_href)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (update_key) DO UPDATE SET
          title = EXCLUDED.title,
          date = EXCLUDED.date,
          category = EXCLUDED.category,
          content = EXCLUDED.content,
          link_text = EXCLUDED.link_text,
          link_href = EXCLUDED.link_href,
          updated_at = CURRENT_TIMESTAMP;
      `, [upd.update_key, upd.title, upd.date, upd.category, upd.content, upd.link_text, upd.link_href]);
    }

    // 6. Seed Case Studies
    for (const cs of initialCaseStudies) {
      await client.query(`
        INSERT INTO case_studies (case_key, slug, title, client, category, challenge, solution, outcome, metrics, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (case_key) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          client = EXCLUDED.client,
          category = EXCLUDED.category,
          challenge = EXCLUDED.challenge,
          solution = EXCLUDED.solution,
          outcome = EXCLUDED.outcome,
          metrics = EXCLUDED.metrics,
          date = EXCLUDED.date,
          updated_at = CURRENT_TIMESTAMP;
      `, [cs.case_key, cs.slug, cs.title, cs.client, cs.category, cs.challenge, cs.solution, cs.outcome, cs.metrics, cs.date]);
    }

    // 7. Seed News
    for (const nw of initialNews) {
      await client.query(`
        INSERT INTO news (news_key, title, date, category, content)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (news_key) DO UPDATE SET
          title = EXCLUDED.title,
          date = EXCLUDED.date,
          category = EXCLUDED.category,
          content = EXCLUDED.content,
          updated_at = CURRENT_TIMESTAMP;
      `, [nw.news_key, nw.title, nw.date, nw.category, nw.content]);
    }

    console.log('PostgreSQL: All 5 sections (Pricing, Articles, Updates, Case Studies, News) tables & seed records initialized successfully.');
    client.release();
  } catch (error) {
    console.error('PostgreSQL Initialization Error:', error);
  }
}

module.exports = {
  pool,
  initializeDatabase
};
