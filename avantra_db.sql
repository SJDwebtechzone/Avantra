--
-- PostgreSQL database dump
--

\restrict l1ACyDPiTPvGVLf8vK8eafRbXQ3wXpYo1XCWKtCyzxnalncGqJEks1jZ8veFGYK

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.updates DROP CONSTRAINT IF EXISTS updates_update_key_key;
ALTER TABLE IF EXISTS ONLY public.updates DROP CONSTRAINT IF EXISTS updates_pkey;
ALTER TABLE IF EXISTS ONLY public.pricing DROP CONSTRAINT IF EXISTS pricing_plan_key_key;
ALTER TABLE IF EXISTS ONLY public.pricing DROP CONSTRAINT IF EXISTS pricing_pkey;
ALTER TABLE IF EXISTS ONLY public.news DROP CONSTRAINT IF EXISTS news_pkey;
ALTER TABLE IF EXISTS ONLY public.news DROP CONSTRAINT IF EXISTS news_news_key_key;
ALTER TABLE IF EXISTS ONLY public.enquiries DROP CONSTRAINT IF EXISTS enquiries_pkey;
ALTER TABLE IF EXISTS ONLY public.case_studies DROP CONSTRAINT IF EXISTS case_studies_slug_key;
ALTER TABLE IF EXISTS ONLY public.case_studies DROP CONSTRAINT IF EXISTS case_studies_pkey;
ALTER TABLE IF EXISTS ONLY public.case_studies DROP CONSTRAINT IF EXISTS case_studies_case_key_key;
ALTER TABLE IF EXISTS ONLY public.articles DROP CONSTRAINT IF EXISTS articles_slug_key;
ALTER TABLE IF EXISTS ONLY public.articles DROP CONSTRAINT IF EXISTS articles_pkey;
ALTER TABLE IF EXISTS ONLY public.articles DROP CONSTRAINT IF EXISTS articles_article_key_key;
ALTER TABLE IF EXISTS ONLY public.admin_auth DROP CONSTRAINT IF EXISTS admin_auth_username_key;
ALTER TABLE IF EXISTS ONLY public.admin_auth DROP CONSTRAINT IF EXISTS admin_auth_pkey;
ALTER TABLE IF EXISTS ONLY public.admin_auth DROP CONSTRAINT IF EXISTS admin_auth_email_key;
ALTER TABLE IF EXISTS public.updates ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.pricing ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.news ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.enquiries ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.case_studies ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.articles ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.admin_auth ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.updates_id_seq;
DROP TABLE IF EXISTS public.updates;
DROP SEQUENCE IF EXISTS public.pricing_id_seq;
DROP TABLE IF EXISTS public.pricing;
DROP SEQUENCE IF EXISTS public.news_id_seq;
DROP TABLE IF EXISTS public.news;
DROP SEQUENCE IF EXISTS public.enquiries_id_seq;
DROP TABLE IF EXISTS public.enquiries;
DROP SEQUENCE IF EXISTS public.case_studies_id_seq;
DROP TABLE IF EXISTS public.case_studies;
DROP SEQUENCE IF EXISTS public.articles_id_seq;
DROP TABLE IF EXISTS public.articles;
DROP SEQUENCE IF EXISTS public.admin_auth_id_seq;
DROP TABLE IF EXISTS public.admin_auth;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_auth (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    reset_token character varying(255),
    reset_token_expiry timestamp with time zone,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.admin_auth OWNER TO postgres;

--
-- Name: admin_auth_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_auth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_auth_id_seq OWNER TO postgres;

--
-- Name: admin_auth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_auth_id_seq OWNED BY public.admin_auth.id;


--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    article_key character varying(100) NOT NULL,
    number character varying(10) NOT NULL,
    slug character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    category character varying(100) NOT NULL,
    read_time character varying(50) DEFAULT '5 min'::character varying NOT NULL,
    excerpt text NOT NULL,
    content text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.articles_id_seq OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: case_studies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.case_studies (
    id integer NOT NULL,
    case_key character varying(100) NOT NULL,
    slug character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    client character varying(255) NOT NULL,
    category character varying(100) NOT NULL,
    challenge text NOT NULL,
    solution text NOT NULL,
    outcome text NOT NULL,
    metrics character varying(255),
    date character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.case_studies OWNER TO postgres;

--
-- Name: case_studies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.case_studies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.case_studies_id_seq OWNER TO postgres;

--
-- Name: case_studies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.case_studies_id_seq OWNED BY public.case_studies.id;


--
-- Name: enquiries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enquiries (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    company character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(100),
    services text[],
    message text NOT NULL,
    email_sent boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.enquiries OWNER TO postgres;

--
-- Name: enquiries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enquiries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.enquiries_id_seq OWNER TO postgres;

--
-- Name: enquiries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enquiries_id_seq OWNED BY public.enquiries.id;


--
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id integer NOT NULL,
    news_key character varying(100) NOT NULL,
    title character varying(255) NOT NULL,
    date character varying(100) NOT NULL,
    category character varying(100) NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.news OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.news_id_seq OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- Name: pricing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pricing (
    id integer NOT NULL,
    plan_key character varying(100) NOT NULL,
    number character varying(10) NOT NULL,
    title character varying(255) NOT NULL,
    subtitle character varying(255),
    price_structure character varying(255) NOT NULL,
    price_note character varying(255),
    description text NOT NULL,
    roles text[] DEFAULT '{}'::text[],
    whats_included text[] DEFAULT '{}'::text[],
    best_fit text[] DEFAULT '{}'::text[],
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.pricing OWNER TO postgres;

--
-- Name: pricing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pricing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pricing_id_seq OWNER TO postgres;

--
-- Name: pricing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pricing_id_seq OWNED BY public.pricing.id;


--
-- Name: updates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.updates (
    id integer NOT NULL,
    update_key character varying(100) NOT NULL,
    title character varying(255) NOT NULL,
    date character varying(100) NOT NULL,
    category character varying(100) NOT NULL,
    content text NOT NULL,
    link_text character varying(255),
    link_href character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.updates OWNER TO postgres;

--
-- Name: updates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.updates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.updates_id_seq OWNER TO postgres;

--
-- Name: updates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.updates_id_seq OWNED BY public.updates.id;


--
-- Name: admin_auth id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_auth ALTER COLUMN id SET DEFAULT nextval('public.admin_auth_id_seq'::regclass);


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Name: case_studies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.case_studies ALTER COLUMN id SET DEFAULT nextval('public.case_studies_id_seq'::regclass);


--
-- Name: enquiries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enquiries ALTER COLUMN id SET DEFAULT nextval('public.enquiries_id_seq'::regclass);


--
-- Name: news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Name: pricing id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pricing ALTER COLUMN id SET DEFAULT nextval('public.pricing_id_seq'::regclass);


--
-- Name: updates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.updates ALTER COLUMN id SET DEFAULT nextval('public.updates_id_seq'::regclass);


--
-- Data for Name: admin_auth; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admin_auth VALUES (22, 'admin', 'info@avantraconsulting.com', 'avantra2026', NULL, NULL, '2026-10-26 17:02:10.880766+05:30');


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.articles VALUES (1, 'lpo-what-it-covers', '1', 'what-legal-process-outsourcing-covers', 'What Legal Process Outsourcing Really Covers (and What It Doesn''t)', 'Legal Support', '5 min', 'LPO isn''t about replacing your attorneys. It''s about giving them back the hours they lose to drafting, tracking and filing. Here''s where outsourcing fits and where it doesn''t.', NULL, '2026-10-17 16:34:13.044109+05:30', '2026-10-26 17:05:52.917171+05:30');
INSERT INTO public.articles VALUES (2, 'remote-staff-freelancers-agency', '2', 'remote-staff-vs-freelancers-vs-agency', 'Remote Staff, Freelancers or an Agency? Choosing the Right Model', 'Remote Staffing', '5 min', 'Each model solves a different problem. We compare cost, control, continuity and risk so you can pick the one that fits.', NULL, '2026-10-17 16:34:13.046524+05:30', '2026-10-26 17:05:52.917999+05:30');
INSERT INTO public.articles VALUES (3, 'closing-books-five-days', '3', 'five-day-month-end-close', 'Closing Your Books in Five Days: A Monthly Routine That Works', 'Finance & Bookkeeping', '5 min', 'A slow month-end close means decisions made on old numbers. A simple five-day routine for small and mid-sized businesses.', NULL, '2026-10-17 16:34:13.04722+05:30', '2026-10-26 17:05:52.918929+05:30');
INSERT INTO public.articles VALUES (4, 'how-we-onboard-new-client', '4', 'how-we-onboard-new-clients', 'How We Onboard a New Client: Our Five-Step Process', 'Working With Us', '4 min', 'From the first questionnaire to ongoing optimization, here''s exactly what happens when you start working with Avantra.', NULL, '2026-10-17 16:34:13.048074+05:30', '2026-10-26 17:05:52.919696+05:30');
INSERT INTO public.articles VALUES (5, 'keeping-client-data-safe', '5', 'data-security-when-outsourcing', 'Keeping Client Data Safe When You Outsource', 'Technology', '5 min', 'Outsourcing shouldn''t mean giving up control of your data. The safeguards to ask any provider about, including us.', NULL, '2026-10-17 16:34:13.048492+05:30', '2026-10-26 17:05:52.920457+05:30');


--
-- Data for Name: case_studies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.case_studies VALUES (3, 'five-day-month-end-close', 'five-day-close-implementation', 'Streamlining Month-End Close from 21 Days to 5 Days', 'Multi-Entity SaaS Enterprise', 'Finance & Bookkeeping', 'Leadership received financial reports 3 weeks after month-end, creating blind spots in cash flow planning and investor burn rate metrics across 4 operating subsidiaries.', 'Avantra''s certified QuickBooks & accounting specialists restructured chart-of-accounts mapping, automated Stripe-to-bank daily matching, and introduced a 5-day closing checklist.', 'Clean financial packages delivered by Business Day 5 every month, giving executive leadership real-time clarity on operating runway.', '76% Faster Close · Day 5 Delivery', 'July 2026', '2026-10-17 16:34:13.06059+05:30', '2026-10-26 17:05:52.925931+05:30');
INSERT INTO public.case_studies VALUES (4, 'dedicated-remote-tech-staffing', 'dedicated-remote-technical-staffing', 'Full-Cycle Remote Engineering & Cloud Operations Staffing', 'Healthcare Logistics Provider', 'Remote Staffing & Technology', 'Urgent requirement for SOC2-compliant HIPAA data pipeline specialists with high retention and immediate availability in US Eastern Time overlap.', 'Avantra screened, vetted, and onboarded a 5-engineer dedicated squad in Bangalore equipped with enterprise VPNs, encrypted work laptops, and continuous activity monitoring.', 'Position fill time reduced from 90 days to 14 days, with 100% staff retention over 18 consecutive months and 55% reduction in total cost of hiring.', '14-Day Placement · 55% Cost Reduction', 'May 2026', '2026-10-17 16:34:13.062239+05:30', '2026-10-26 17:05:52.927156+05:30');
INSERT INTO public.case_studies VALUES (1, 'cross-border-tax-structuring', 'cross-border-tax-structuring-fintech', 'Cross-Border Entity & Tax Structuring for US-India FinTech', 'Global FinTech Operator', 'Finance & Legal', 'A fast-growing US FinTech needed to establish a dedicated engineering & compliance hub in Bangalore while navigating transfer pricing, dual-jurisdiction tax treaties, and Delaware corporate governance.', 'Avantra deployed a joint US-India corporate advisory team to draft master service agreements, implement IRS & RBI compliance workflows, and establish an automated reconciliation engine.', 'Saved $180,000 in redundant entity structuring costs and achieved full regulatory clearance across both jurisdictions within 90 days.', '90-Day Clearance · $180k Saved', 'Q3 2026', '2026-10-17 16:34:13.052912+05:30', '2026-10-26 17:05:52.924281+05:30');
INSERT INTO public.case_studies VALUES (2, 'high-volume-paralegal-roster', 'high-volume-paralegal-scaling', 'Scaling Paralegal Capacity for Multi-State Debt Defense Practice', 'New York Consumer Litigation Firm', 'Legal Support', 'The firm was handling 800+ monthly case filings across New York and New Jersey. In-house attorneys spent 40% of their billable hours drafting routine validation notices and filing motions.', 'Avantra placed 6 dedicated senior paralegals trained in FDCPA & Regulation F protocols directly into the firm''s Clio and case management portals under strict US data encryption standards.', 'Turnaround dropped from 72 hours to under 8 hours with zero missed statutory deadlines, freeing senior attorneys to double their active caseload.', '8-Hour Turnaround · 0 Missed Deadlines', 'August 2026', '2026-10-17 16:34:13.059165+05:30', '2026-10-26 17:05:52.925095+05:30');


--
-- Data for Name: enquiries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.enquiries VALUES (1, 'Jane Smith', 'Acme Global Legal Corp', 'jane.smith@acmeglobal.com', '+1 555 234 5678', '{"Legal process outsourcing","Remote staffing"}', 'Testing automated enquiry routing to ramyiezhil.1010@gmail.com. We require 2 full-time remote paralegals for legal drafting and FDCPA compliance.', true, '2026-10-23 14:56:04.299737+05:30');
INSERT INTO public.enquiries VALUES (2, 'Robert Vance', 'Vance Litigation Partners', 'rvance@vancelaw.com', '+1 212 555 0199', '{"Legal process outsourcing","Bookkeeping & finance"}', 'Need dedicated bankruptcy workflow support and monthly reconciliations.', true, '2026-10-23 14:57:46.058181+05:30');
INSERT INTO public.enquiries VALUES (3, 'Ramya Ezhil', 'Avantra Client Demo', 'ramyiezhil.1010@gmail.com', '+91 98765 43210', '{"Legal process outsourcing","Remote staffing","Bookkeeping & finance"}', 'Hello! This is a real test submission to verify that the enquiry details arrive directly in the inbox at ramyiezhil.1010@gmail.com.', true, '2026-10-23 17:28:40.900639+05:30');
INSERT INTO public.enquiries VALUES (4, 'Ramya B', 'sbdf', 'ramyashan.1010@gmail.com', '9789247362', '{"Remote staffing"}', 'testing', true, '2026-10-23 18:47:19.022139+05:30');
INSERT INTO public.enquiries VALUES (5, 'jothy', 'devspectra', 'ramyashan@gmail.com', '9597804073', '{"Legal process outsourcing"}', 'testing', true, '2026-10-26 11:00:55.026761+05:30');


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.news VALUES (1, 'launches-new-website', 'Avantra Consulting Launches New Website', 'October 2026', 'Company News', 'We''re pleased to launch our new website, designed to make it easier to find the right service, understand how we work and get in touch. Visitors can now explore our legal process outsourcing, remote staffing, bookkeeping, IT-enabled services and consulting offerings in one place, read practical articles from our team, and start onboarding with our online client questionnaire.', '2026-10-17 16:34:13.063717+05:30', '2026-10-26 17:05:52.928746+05:30');
INSERT INTO public.news VALUES (2, 'five-year-business-milestone', 'Avantra Marks Five Year in Business Milestone', 'October 2026', 'Company News', 'This October 2026, Avantra Consulting reached "five years in business". We want to thank our clients, who trust us with their work every day, and our team, who make "solutioning together" real. Here''s to the next chapter.', '2026-10-17 16:34:13.066012+05:30', '2026-10-26 17:05:52.93031+05:30');
INSERT INTO public.news VALUES (3, 'partners-with-front-source-technologies', 'Avantra Partners with Front Source Technologies Private Limited', 'June 2024', 'Partnerships', 'Avantra Consulting has partnered with Front Source Technologies Private Limited to offer certified bookkeeping on QuickBooks Online and other IT enabled services. This partnership brings multiple capabilities under one leadership and one integrated platform, allowing clients to access a broader range of solutions while reducing costs, simplifying coordination, and improving operational efficiency.', '2026-10-17 16:34:13.067222+05:30', '2026-10-26 17:05:52.931164+05:30');
INSERT INTO public.news VALUES (4, 'expanded-paralegal-support', 'Expanded Paralegal Support for Bankruptcy and Debt Defense Matters', 'January 2022', 'Services', 'Avantra has expanded its legal support team to meet growing demand from firms handling bankruptcy, FDCPA and debt defense matters. Our paralegals now support notice drafting, case management, document preparation and deadline tracking for firms across New York & New Jersey states. Firms can start with a single workflow and scale as volumes change.', '2026-10-17 16:34:13.069119+05:30', '2026-10-26 17:05:52.932132+05:30');


--
-- Data for Name: pricing; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pricing VALUES (1, 'full-time-remote', '01', 'Full-Time Remote Employees', 'Transparent pricing, built around the hire', 'Custom', 'Based on role, experience & location', 'Every hire is different, so we don''t force it into a flat rate. Pricing is set around the role, location, experience level, and what the job actually needs to run — no subscriptions, no long-term contracts, no surprises.', '{"Paralegal and Secretarial",Book-keeping,Accountant,"IT related services"}', '{"End-to-end recruitment","Pre-vetted candidate shortlists","Interview coordination","Onboarding support","A dedicated account manager","Monthly employee management","Ongoing performance check-ins"}', '{"Companies hiring long-term remote talent","Legal and operational roles","Teams that need full-time stability and real integration, not a stopgap"}', '2026-10-22 22:01:59.297707+05:30', '2026-10-26 17:05:52.888671+05:30');
INSERT INTO public.pricing VALUES (2, 'virtual-assistant', '02', 'Virtual Assistant Pricing', 'Reliable daily support, without the full-time overhead', '$500–$900 USD', 'Estimated Monthly Salary', 'Our most requested option — built for founders, operators, and growing teams that need dependable day-to-day help without hiring in-house.', '{"Executive Assistant","Admin Assistant","Customer Support","Data Entry & Research","Scheduling & Operations"}', '{"eCommerce & Amazon operations","Real estate coordination","Daily inbox & calendar management","Customer communications & research"}', '{"Amazon and eCommerce businesses","Real estate teams and agencies","Customer-support-heavy operations","Founders who need reliable daily support without adding headcount"}', '2026-10-22 22:01:59.341861+05:30', '2026-10-26 17:05:52.915226+05:30');
INSERT INTO public.pricing VALUES (3, 'operations-coordinator', '03', 'Operations Coordinator', 'Keeps daily operations moving, so you don''t have to', '$1000–$1300 USD', 'Estimated Monthly Salary', 'A dependable hire for teams whose schedules, documentation, and vendor relationships need one steady owner — someone who keeps the daily mechanics of the business running without you having to manage it yourself.', '{"Professional services firms","Growing operations teams","Multi-vendor businesses","Founders scaling past ad hoc processes"}', '{"Workflow & SOP standardisation","Cross-team vendor management","Documentation & tracking pipelines","Weekly operational reporting"}', '{"Businesses juggling multiple moving parts across teams or vendors","Companies ready to replace inbox-and-spreadsheet coordination with real process","Operations that have outgrown one person doing everything informally","Leaders who want the day-to-day owned by someone else, not managed by them"}', '2026-10-22 22:01:59.344602+05:30', '2026-10-26 17:05:52.91631+05:30');


--
-- Data for Name: updates; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.updates VALUES (1, 'online-client-questionnaire', 'New: Online Client Questionnaire', 'September 2026', 'Service Update', 'New clients can now complete our onboarding questionnaire online before the first call. It takes about 5 minutes and helps us prepare a tailored proposal and draft SLA faster.', 'Start the questionnaire →', '/get-started', '2026-10-17 16:34:13.0489+05:30', '2026-10-26 17:05:52.921295+05:30');
INSERT INTO public.updates VALUES (2, 'monthly-reporting-bookkeeping', 'Monthly Reporting Now Included for All Bookkeeping Clients', 'September 2026', 'Service Update', 'Every bookkeeping client now receives a month-end pack by business day 6: profit and loss, balance sheet, cash summary and a short note on key movements. No change to pricing.', NULL, NULL, '2026-10-17 16:34:13.049977+05:30', '2026-10-26 17:05:52.922183+05:30');
INSERT INTO public.updates VALUES (3, 'regulation-f-reminders', 'Industry Update: Regulation F Reminders for Collection Files', 'September 2026', 'Industry Update', 'Regulation F, which implements the FDCPA, sets specific rules on validation notices, call frequency and electronic communication opt-outs, and requires records to be kept for three years. Our legal support team has refreshed its file checklist to match. Read the full checklist in our article, FDCPA and Regulation F: A Practical Checklist for Notice Drafting.', NULL, NULL, '2026-10-17 16:34:13.050439+05:30', '2026-10-26 17:05:52.922918+05:30');
INSERT INTO public.updates VALUES (4, 'extended-support-hours', 'Extended Support Hours for North American Clients', 'October 2026', 'Service Update', 'To better serve clients in North American region our team now provides coverage from 9:00 AM EST to 3:30 PM EST, for 5 days a week. Your account manager will confirm any changes to your schedule.', NULL, NULL, '2026-10-17 16:34:13.051323+05:30', '2026-10-26 17:05:52.923597+05:30');


--
-- Name: admin_auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_auth_id_seq', 27, true);


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_id_seq', 231, true);


--
-- Name: case_studies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.case_studies_id_seq', 184, true);


--
-- Name: enquiries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enquiries_id_seq', 5, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 184, true);


--
-- Name: pricing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pricing_id_seq', 108, true);


--
-- Name: updates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.updates_id_seq', 184, true);


--
-- Name: admin_auth admin_auth_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_auth
    ADD CONSTRAINT admin_auth_email_key UNIQUE (email);


--
-- Name: admin_auth admin_auth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_auth
    ADD CONSTRAINT admin_auth_pkey PRIMARY KEY (id);


--
-- Name: admin_auth admin_auth_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_auth
    ADD CONSTRAINT admin_auth_username_key UNIQUE (username);


--
-- Name: articles articles_article_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_article_key_key UNIQUE (article_key);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: articles articles_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_slug_key UNIQUE (slug);


--
-- Name: case_studies case_studies_case_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.case_studies
    ADD CONSTRAINT case_studies_case_key_key UNIQUE (case_key);


--
-- Name: case_studies case_studies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.case_studies
    ADD CONSTRAINT case_studies_pkey PRIMARY KEY (id);


--
-- Name: case_studies case_studies_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.case_studies
    ADD CONSTRAINT case_studies_slug_key UNIQUE (slug);


--
-- Name: enquiries enquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enquiries
    ADD CONSTRAINT enquiries_pkey PRIMARY KEY (id);


--
-- Name: news news_news_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_news_key_key UNIQUE (news_key);


--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- Name: pricing pricing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pricing
    ADD CONSTRAINT pricing_pkey PRIMARY KEY (id);


--
-- Name: pricing pricing_plan_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pricing
    ADD CONSTRAINT pricing_plan_key_key UNIQUE (plan_key);


--
-- Name: updates updates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.updates
    ADD CONSTRAINT updates_pkey PRIMARY KEY (id);


--
-- Name: updates updates_update_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.updates
    ADD CONSTRAINT updates_update_key_key UNIQUE (update_key);


--
-- PostgreSQL database dump complete
--

\unrestrict l1ACyDPiTPvGVLf8vK8eafRbXQ3wXpYo1XCWKtCyzxnalncGqJEks1jZ8veFGYK

