-- ========================================================
-- Avantra Consulting PostgreSQL Database Backup
-- Database: avantra_db
-- Date: 2026-10-26T05:34:36.927Z
-- ========================================================

CREATE TABLE IF NOT EXISTS admin_auth (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  reset_token VARCHAR(255),
  reset_token_expiry TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pricing (
  id SERIAL PRIMARY KEY,
  plan_key VARCHAR(100) UNIQUE NOT NULL,
  number VARCHAR(10) NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  price_structure VARCHAR(255) NOT NULL,
  price_note VARCHAR(255),
  description TEXT NOT NULL,
  roles TEXT[] NOT NULL,
  whats_included TEXT[],
  best_fit TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  article_key VARCHAR(100) UNIQUE NOT NULL,
  number VARCHAR(10) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  read_time VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
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
  metrics VARCHAR(255) NOT NULL,
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

-- --------------------------------------------------------
-- Table Data: admin_auth (1 rows)
-- --------------------------------------------------------
INSERT INTO admin_auth (id, username, email, password, reset_token, reset_token_expiry, updated_at) VALUES (1, 'admin', 'ramyiezhil.1010@gmail.com', 'avantra@2026', NULL, NULL, '2026-10-23T05:39:47.356Z') ON CONFLICT DO NOTHING;

-- --------------------------------------------------------
-- Table Data: pricing (3 rows)
-- --------------------------------------------------------
INSERT INTO pricing (id, plan_key, number, title, subtitle, price_structure, price_note, description, roles, whats_included, best_fit, created_at, updated_at) VALUES (1, 'full-time-remote', '01', 'Full-Time Remote Employees', 'Transparent pricing, built around the hire', 'Custom', 'Based on role, experience & location', 'Every hire is different, so we don''t force it into a flat rate. Pricing is set around the role, location, experience level, and what the job actually needs to run — no subscriptions, no long-term contracts, no surprises.', '{"Paralegal and Secretarial","Book-keeping","Accountant","IT related services"}', '{"End-to-end recruitment","Pre-vetted candidate shortlists","Interview coordination","Onboarding support","A dedicated account manager","Monthly employee management","Ongoing performance check-ins"}', '{"Companies hiring long-term remote talent","Legal and operational roles","Teams that need full-time stability and real integration, not a stopgap"}', '2026-10-22T16:31:59.297Z', '2026-10-26T05:34:28.794Z') ON CONFLICT DO NOTHING;
INSERT INTO pricing (id, plan_key, number, title, subtitle, price_structure, price_note, description, roles, whats_included, best_fit, created_at, updated_at) VALUES (2, 'virtual-assistant', '02', 'Virtual Assistant Pricing', 'Reliable daily support, without the full-time overhead', '$500–$900 USD', 'Estimated Monthly Salary', 'Our most requested option — built for founders, operators, and growing teams that need dependable day-to-day help without hiring in-house.', '{"Executive Assistant","Admin Assistant","Customer Support","Data Entry & Research","Scheduling & Operations"}', '{"eCommerce & Amazon operations","Real estate coordination","Daily inbox & calendar management","Customer communications & research"}', '{"Amazon and eCommerce businesses","Real estate teams and agencies","Customer-support-heavy operations","Founders who need reliable daily support without adding headcount"}', '2026-10-22T16:31:59.341Z', '2026-10-26T05:34:28.795Z') ON CONFLICT DO NOTHING;
INSERT INTO pricing (id, plan_key, number, title, subtitle, price_structure, price_note, description, roles, whats_included, best_fit, created_at, updated_at) VALUES (3, 'operations-coordinator', '03', 'Operations Coordinator', 'Keeps daily operations moving, so you don''t have to', '$1000–$1300 USD', 'Estimated Monthly Salary', 'A dependable hire for teams whose schedules, documentation, and vendor relationships need one steady owner — someone who keeps the daily mechanics of the business running without you having to manage it yourself.', '{"Professional services firms","Growing operations teams","Multi-vendor businesses","Founders scaling past ad hoc processes"}', '{"Workflow & SOP standardisation","Cross-team vendor management","Documentation & tracking pipelines","Weekly operational reporting"}', '{"Businesses juggling multiple moving parts across teams or vendors","Companies ready to replace inbox-and-spreadsheet coordination with real process","Operations that have outgrown one person doing everything informally","Leaders who want the day-to-day owned by someone else, not managed by them"}', '2026-10-22T16:31:59.344Z', '2026-10-26T05:34:28.795Z') ON CONFLICT DO NOTHING;

-- --------------------------------------------------------
-- Table Data: articles (5 rows)
-- --------------------------------------------------------
INSERT INTO articles (id, article_key, number, slug, title, category, read_time, excerpt, content, created_at, updated_at) VALUES (1, 'lpo-what-it-covers', '1', 'what-legal-process-outsourcing-covers', 'What Legal Process Outsourcing Really Covers (and What It Doesn''t)', 'Legal Support', '5 min', 'LPO isn''t about replacing your attorneys. It''s about giving them back the hours they lose to drafting, tracking and filing. Here''s where outsourcing fits and where it doesn''t.', NULL, '2026-10-17T11:04:13.044Z', '2026-10-26T05:34:28.796Z') ON CONFLICT DO NOTHING;
INSERT INTO articles (id, article_key, number, slug, title, category, read_time, excerpt, content, created_at, updated_at) VALUES (2, 'remote-staff-freelancers-agency', '2', 'remote-staff-vs-freelancers-vs-agency', 'Remote Staff, Freelancers or an Agency? Choosing the Right Model', 'Remote Staffing', '5 min', 'Each model solves a different problem. We compare cost, control, continuity and risk so you can pick the one that fits.', NULL, '2026-10-17T11:04:13.046Z', '2026-10-26T05:34:28.796Z') ON CONFLICT DO NOTHING;
INSERT INTO articles (id, article_key, number, slug, title, category, read_time, excerpt, content, created_at, updated_at) VALUES (3, 'closing-books-five-days', '3', 'five-day-month-end-close', 'Closing Your Books in Five Days: A Monthly Routine That Works', 'Finance & Bookkeeping', '5 min', 'A slow month-end close means decisions made on old numbers. A simple five-day routine for small and mid-sized businesses.', NULL, '2026-10-17T11:04:13.047Z', '2026-10-26T05:34:28.797Z') ON CONFLICT DO NOTHING;
INSERT INTO articles (id, article_key, number, slug, title, category, read_time, excerpt, content, created_at, updated_at) VALUES (4, 'how-we-onboard-new-client', '4', 'how-we-onboard-new-clients', 'How We Onboard a New Client: Our Five-Step Process', 'Working With Us', '4 min', 'From the first questionnaire to ongoing optimization, here''s exactly what happens when you start working with Avantra.', NULL, '2026-10-17T11:04:13.048Z', '2026-10-26T05:34:28.797Z') ON CONFLICT DO NOTHING;
INSERT INTO articles (id, article_key, number, slug, title, category, read_time, excerpt, content, created_at, updated_at) VALUES (5, 'keeping-client-data-safe', '5', 'data-security-when-outsourcing', 'Keeping Client Data Safe When You Outsource', 'Technology', '5 min', 'Outsourcing shouldn''t mean giving up control of your data. The safeguards to ask any provider about, including us.', NULL, '2026-10-17T11:04:13.048Z', '2026-10-26T05:34:28.798Z') ON CONFLICT DO NOTHING;

-- --------------------------------------------------------
-- Table Data: updates (4 rows)
-- --------------------------------------------------------
INSERT INTO updates (id, update_key, title, date, category, content, link_text, link_href, created_at, updated_at) VALUES (1, 'online-client-questionnaire', 'New: Online Client Questionnaire', 'September 2026', 'Service Update', 'New clients can now complete our onboarding questionnaire online before the first call. It takes about 5 minutes and helps us prepare a tailored proposal and draft SLA faster.', 'Start the questionnaire →', '/get-started', '2026-10-17T11:04:13.048Z', '2026-10-26T05:34:28.799Z') ON CONFLICT DO NOTHING;
INSERT INTO updates (id, update_key, title, date, category, content, link_text, link_href, created_at, updated_at) VALUES (2, 'monthly-reporting-bookkeeping', 'Monthly Reporting Now Included for All Bookkeeping Clients', 'September 2026', 'Service Update', 'Every bookkeeping client now receives a month-end pack by business day 6: profit and loss, balance sheet, cash summary and a short note on key movements. No change to pricing.', NULL, NULL, '2026-10-17T11:04:13.049Z', '2026-10-26T05:34:28.800Z') ON CONFLICT DO NOTHING;
INSERT INTO updates (id, update_key, title, date, category, content, link_text, link_href, created_at, updated_at) VALUES (3, 'regulation-f-reminders', 'Industry Update: Regulation F Reminders for Collection Files', 'September 2026', 'Industry Update', 'Regulation F, which implements the FDCPA, sets specific rules on validation notices, call frequency and electronic communication opt-outs, and requires records to be kept for three years. Our legal support team has refreshed its file checklist to match. Read the full checklist in our article, FDCPA and Regulation F: A Practical Checklist for Notice Drafting.', NULL, NULL, '2026-10-17T11:04:13.050Z', '2026-10-26T05:34:28.800Z') ON CONFLICT DO NOTHING;
INSERT INTO updates (id, update_key, title, date, category, content, link_text, link_href, created_at, updated_at) VALUES (4, 'extended-support-hours', 'Extended Support Hours for North American Clients', 'October 2026', 'Service Update', 'To better serve clients in North American region our team now provides coverage from 9:00 AM EST to 3:30 PM EST, for 5 days a week. Your account manager will confirm any changes to your schedule.', NULL, NULL, '2026-10-17T11:04:13.051Z', '2026-10-26T05:34:28.802Z') ON CONFLICT DO NOTHING;

-- --------------------------------------------------------
-- Table Data: case_studies (4 rows)
-- --------------------------------------------------------
INSERT INTO case_studies (id, case_key, slug, title, client, category, challenge, solution, outcome, metrics, date, created_at, updated_at) VALUES (1, 'cross-border-tax-structuring', 'cross-border-tax-structuring-fintech', 'Cross-Border Entity & Tax Structuring for US-India FinTech', 'Global FinTech Operator', 'Finance & Legal', 'A fast-growing US FinTech needed to establish a dedicated engineering & compliance hub in Bangalore while navigating transfer pricing, dual-jurisdiction tax treaties, and Delaware corporate governance.', 'Avantra deployed a joint US-India corporate advisory team to draft master service agreements, implement IRS & RBI compliance workflows, and establish an automated reconciliation engine.', 'Saved $180,000 in redundant entity structuring costs and achieved full regulatory clearance across both jurisdictions within 90 days.', '90-Day Clearance · $180k Saved', 'Q3 2026', '2026-10-17T11:04:13.052Z', '2026-10-26T05:34:28.803Z') ON CONFLICT DO NOTHING;
INSERT INTO case_studies (id, case_key, slug, title, client, category, challenge, solution, outcome, metrics, date, created_at, updated_at) VALUES (2, 'high-volume-paralegal-roster', 'high-volume-paralegal-scaling', 'Scaling Paralegal Capacity for Multi-State Debt Defense Practice', 'New York Consumer Litigation Firm', 'Legal Support', 'The firm was handling 800+ monthly case filings across New York and New Jersey. In-house attorneys spent 40% of their billable hours drafting routine validation notices and filing motions.', 'Avantra placed 6 dedicated senior paralegals trained in FDCPA & Regulation F protocols directly into the firm''s Clio and case management portals under strict US data encryption standards.', 'Turnaround dropped from 72 hours to under 8 hours with zero missed statutory deadlines, freeing senior attorneys to double their active caseload.', '8-Hour Turnaround · 0 Missed Deadlines', 'August 2026', '2026-10-17T11:04:13.059Z', '2026-10-26T05:34:28.804Z') ON CONFLICT DO NOTHING;
INSERT INTO case_studies (id, case_key, slug, title, client, category, challenge, solution, outcome, metrics, date, created_at, updated_at) VALUES (3, 'five-day-month-end-close', 'five-day-close-implementation', 'Streamlining Month-End Close from 21 Days to 5 Days', 'Multi-Entity SaaS Enterprise', 'Finance & Bookkeeping', 'Leadership received financial reports 3 weeks after month-end, creating blind spots in cash flow planning and investor burn rate metrics across 4 operating subsidiaries.', 'Avantra''s certified QuickBooks & accounting specialists restructured chart-of-accounts mapping, automated Stripe-to-bank daily matching, and introduced a 5-day closing checklist.', 'Clean financial packages delivered by Business Day 5 every month, giving executive leadership real-time clarity on operating runway.', '76% Faster Close · Day 5 Delivery', 'July 2026', '2026-10-17T11:04:13.060Z', '2026-10-26T05:34:28.805Z') ON CONFLICT DO NOTHING;
INSERT INTO case_studies (id, case_key, slug, title, client, category, challenge, solution, outcome, metrics, date, created_at, updated_at) VALUES (4, 'dedicated-remote-tech-staffing', 'dedicated-remote-technical-staffing', 'Full-Cycle Remote Engineering & Cloud Operations Staffing', 'Healthcare Logistics Provider', 'Remote Staffing & Technology', 'Urgent requirement for SOC2-compliant HIPAA data pipeline specialists with high retention and immediate availability in US Eastern Time overlap.', 'Avantra screened, vetted, and onboarded a 5-engineer dedicated squad in Bangalore equipped with enterprise VPNs, encrypted work laptops, and continuous activity monitoring.', 'Position fill time reduced from 90 days to 14 days, with 100% staff retention over 18 consecutive months and 55% reduction in total cost of hiring.', '14-Day Placement · 55% Cost Reduction', 'May 2026', '2026-10-17T11:04:13.062Z', '2026-10-26T05:34:28.805Z') ON CONFLICT DO NOTHING;

-- --------------------------------------------------------
-- Table Data: news (4 rows)
-- --------------------------------------------------------
INSERT INTO news (id, news_key, title, date, category, content, created_at, updated_at) VALUES (1, 'launches-new-website', 'Avantra Consulting Launches New Website', 'October 2026', 'Company News', 'We''re pleased to launch our new website, designed to make it easier to find the right service, understand how we work and get in touch. Visitors can now explore our legal process outsourcing, remote staffing, bookkeeping, IT-enabled services and consulting offerings in one place, read practical articles from our team, and start onboarding with our online client questionnaire.', '2026-10-17T11:04:13.063Z', '2026-10-26T05:34:28.806Z') ON CONFLICT DO NOTHING;
INSERT INTO news (id, news_key, title, date, category, content, created_at, updated_at) VALUES (2, 'five-year-business-milestone', 'Avantra Marks Five Year in Business Milestone', 'October 2026', 'Company News', 'This October 2026, Avantra Consulting reached "five years in business". We want to thank our clients, who trust us with their work every day, and our team, who make "solutioning together" real. Here''s to the next chapter.', '2026-10-17T11:04:13.066Z', '2026-10-26T05:34:28.807Z') ON CONFLICT DO NOTHING;
INSERT INTO news (id, news_key, title, date, category, content, created_at, updated_at) VALUES (3, 'partners-with-front-source-technologies', 'Avantra Partners with Front Source Technologies Private Limited', 'June 2024', 'Partnerships', 'Avantra Consulting has partnered with Front Source Technologies Private Limited to offer certified bookkeeping on QuickBooks Online and other IT enabled services. This partnership brings multiple capabilities under one leadership and one integrated platform, allowing clients to access a broader range of solutions while reducing costs, simplifying coordination, and improving operational efficiency.', '2026-10-17T11:04:13.067Z', '2026-10-26T05:34:28.807Z') ON CONFLICT DO NOTHING;
INSERT INTO news (id, news_key, title, date, category, content, created_at, updated_at) VALUES (4, 'expanded-paralegal-support', 'Expanded Paralegal Support for Bankruptcy and Debt Defense Matters', 'January 2022', 'Services', 'Avantra has expanded its legal support team to meet growing demand from firms handling bankruptcy, FDCPA and debt defense matters. Our paralegals now support notice drafting, case management, document preparation and deadline tracking for firms across New York & New Jersey states. Firms can start with a single workflow and scale as volumes change.', '2026-10-17T11:04:13.069Z', '2026-10-26T05:34:28.808Z') ON CONFLICT DO NOTHING;

-- --------------------------------------------------------
-- Table Data: enquiries (5 rows)
-- --------------------------------------------------------
INSERT INTO enquiries (id, name, company, email, phone, services, message, email_sent, created_at) VALUES (1, 'Jane Smith', 'Acme Global Legal Corp', 'jane.smith@acmeglobal.com', '+1 555 234 5678', '{"Legal process outsourcing","Remote staffing"}', 'Testing automated enquiry routing to ramyiezhil.1010@gmail.com. We require 2 full-time remote paralegals for legal drafting and FDCPA compliance.', true, '2026-10-23T09:26:04.299Z') ON CONFLICT DO NOTHING;
INSERT INTO enquiries (id, name, company, email, phone, services, message, email_sent, created_at) VALUES (2, 'Robert Vance', 'Vance Litigation Partners', 'rvance@vancelaw.com', '+1 212 555 0199', '{"Legal process outsourcing","Bookkeeping & finance"}', 'Need dedicated bankruptcy workflow support and monthly reconciliations.', true, '2026-10-23T09:27:46.058Z') ON CONFLICT DO NOTHING;
INSERT INTO enquiries (id, name, company, email, phone, services, message, email_sent, created_at) VALUES (3, 'Ramya Ezhil', 'Avantra Client Demo', 'ramyiezhil.1010@gmail.com', '+91 98765 43210', '{"Legal process outsourcing","Remote staffing","Bookkeeping & finance"}', 'Hello! This is a real test submission to verify that the enquiry details arrive directly in the inbox at ramyiezhil.1010@gmail.com.', true, '2026-10-23T11:58:40.900Z') ON CONFLICT DO NOTHING;
INSERT INTO enquiries (id, name, company, email, phone, services, message, email_sent, created_at) VALUES (4, 'Ramya B', 'sbdf', 'ramyashan.1010@gmail.com', '9789247362', '{"Remote staffing"}', 'testing', true, '2026-10-23T13:17:19.022Z') ON CONFLICT DO NOTHING;
INSERT INTO enquiries (id, name, company, email, phone, services, message, email_sent, created_at) VALUES (5, 'jothy', 'devspectra', 'ramyashan@gmail.com', '9597804073', '{"Legal process outsourcing"}', 'testing', true, '2026-10-26T05:30:55.026Z') ON CONFLICT DO NOTHING;

-- --------------------------------------------------------
-- Reset Primary Key Sequences
-- --------------------------------------------------------
SELECT setval(pg_get_serial_sequence('admin_auth', 'id'), COALESCE(MAX(id), 1)) FROM admin_auth;
SELECT setval(pg_get_serial_sequence('pricing', 'id'), COALESCE(MAX(id), 1)) FROM pricing;
SELECT setval(pg_get_serial_sequence('articles', 'id'), COALESCE(MAX(id), 1)) FROM articles;
SELECT setval(pg_get_serial_sequence('updates', 'id'), COALESCE(MAX(id), 1)) FROM updates;
SELECT setval(pg_get_serial_sequence('case_studies', 'id'), COALESCE(MAX(id), 1)) FROM case_studies;
SELECT setval(pg_get_serial_sequence('news', 'id'), COALESCE(MAX(id), 1)) FROM news;
SELECT setval(pg_get_serial_sequence('enquiries', 'id'), COALESCE(MAX(id), 1)) FROM enquiries;
