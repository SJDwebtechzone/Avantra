import React from 'react';
import { useRoute } from 'wouter';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LpoInfographic } from '../components/LpoInfographic';
import { StaffingModelsInfographic } from '../components/StaffingModelsInfographic';
import { FiveDayCloseInfographic } from '../components/FiveDayCloseInfographic';
import { OnboardingProcessInfographic } from '../components/OnboardingProcessInfographic';
import { DataSecurityInfographic } from '../components/DataSecurityInfographic';
import { articlesData } from '../data/articlesData';
import { ArrowLeft, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const [, params] = useRoute('/articles/:slug');
  const slug = params?.slug;

  const article = articlesData.find((a) => a.slug === slug) || articlesData[0];
  const isArticleTwo = slug === 'remote-staff-vs-freelancers-vs-agency';
  const isArticleThree = slug === 'five-day-month-end-close' || slug === 'closing-your-books-in-five-days';
  const isArticleFour = slug === 'how-we-onboard-new-clients' || slug === 'how-we-onboard-a-new-client';
  const isArticleFive = slug === 'data-security-when-outsourcing' || slug === 'keeping-client-data-safe-when-you-outsource';

  if (isArticleFive) {
    return (
      <main className="site-shell bg-[hsl(var(--background))]">
        <Navbar />

        {/* Article Hero */}
        <section className="pt-32 pb-12 border-b border-[hsl(var(--foreground)/.1)]">
          <div className="container-wide">
            <a href="/articles" className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.1em] text-[hsl(var(--accent))] hover:underline mb-8">
              <ArrowLeft size={14} /> Back to Articles
            </a>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[11px] uppercase tracking-[0.14em] font-mono font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.1)] px-3 py-1 rounded-full">
                Technology
              </span>
              <span className="flex items-center gap-1 text-[12px] text-[hsl(var(--foreground)/.5)]">
                <Clock size={13} /> 5 min read
              </span>
            </div>

            <h1 className="text-[clamp(2.4rem,4.8vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[hsl(var(--foreground))] max-w-[950px]">
              Keeping Client Data Safe When You Outsource
            </h1>

            <p className="mt-6 text-[18px] md:text-[20px] leading-[1.6] text-[hsl(var(--foreground)/.72)] max-w-[850px] font-light">
              The data security safeguards to ask any outsourcing provider about, from access control and devices to confidentiality agreements and audit trails.
            </p>
          </div>
        </section>

        {/* Infographic Graphic Banner */}
        <section className="py-8 bg-[hsl(var(--muted))] border-b border-[hsl(var(--foreground)/.1)]">
          <div className="container-wide max-w-[1100px]">
            <DataSecurityInfographic />
          </div>
        </section>

        {/* Article Body Content */}
        <section className="py-16 md:py-24">
          <div className="container-wide max-w-[900px]">
            <div className="prose prose-lg max-w-none text-[17px] md:text-[18px] leading-[1.75] text-[hsl(var(--foreground)/.8)] space-y-8">
              
              <p className="text-[20px] leading-[1.6] text-[hsl(var(--foreground))] font-normal">
                For law firms, accountants and any business holding customer information, the first question about outsourcing is usually, "Is our data safe?" It should be. Confidentiality obligations don't transfer to your provider; they stay with you. So the right partner is one who makes it easy to show that the data is protected.
              </p>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  Questions to Ask Any Provider
                </h2>
                
                <div className="mt-6 space-y-8">
                  <div>
                    <h3 className="text-[20px] font-bold text-[hsl(var(--foreground))] mb-3">Access</h3>
                    <ul className="space-y-3 pl-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                        <span>Does each team member have their own login, with access limited to what their role needs?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                        <span>Is multi-factor authentication required on every system?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                        <span>Can access be removed immediately when someone leaves?</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-bold text-[hsl(var(--foreground))] mb-3">Devices and networks</h3>
                    <ul className="space-y-3 pl-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                        <span>Are staff working on managed devices with encryption, up-to-date software and endpoint protection?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                        <span>Is removable storage (USB drives) disabled?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                        <span>Is work done inside your systems, or are files copied out to the provider's?</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-bold text-[hsl(var(--foreground))] mb-3">People</h3>
                    <ul className="space-y-3 pl-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                        <span>Does every team member sign a confidentiality agreement?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                        <span>Are background checks completed before someone works on client files?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                        <span>Is there regular training on data protection and phishing?</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-bold text-[hsl(var(--foreground))] mb-3">Accountability</h3>
                    <ul className="space-y-3 pl-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                        <span>Are actions logged so you can see who accessed what and when?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                        <span>Is there a written incident response process, and how quickly will you be told about a problem?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                        <span>Are these commitments written into your contract and SLA?</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  How We Approach It
                </h2>
                <p className="mt-4 text-[19px] leading-[1.6]">
                  At Avantra, security is agreed at kickoff, not after. Our team works within your systems through secure, logged access, on managed devices with MFA, under signed confidentiality agreements.
                </p>
              </div>

              {/* Inline Call to Action Box */}
              <div className="mt-12 p-8 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--foreground)/.15)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[hsl(var(--accent))] font-medium">Vendor Audit</span>
                  <h3 className="text-[20px] font-normal text-[hsl(var(--foreground))] mt-1">
                    Have a security questionnaire for vendors?
                  </h3>
                </div>
                <a href="/#enquire" className="nav-cta px-6 py-3.5 text-[13px] font-bold inline-flex items-center gap-2 shrink-0">
                  Send it to us <ArrowRight size={15} />
                </a>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  if (isArticleFour) {
    return (
      <main className="site-shell bg-[hsl(var(--background))]">
        <Navbar />

        {/* Article Hero */}
        <section className="pt-32 pb-12 border-b border-[hsl(var(--foreground)/.1)]">
          <div className="container-wide">
            <a href="/articles" className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.1em] text-[hsl(var(--accent))] hover:underline mb-8">
              <ArrowLeft size={14} /> Back to Articles
            </a>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[11px] uppercase tracking-[0.14em] font-mono font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.1)] px-3 py-1 rounded-full">
                Working With Us
              </span>
              <span className="flex items-center gap-1 text-[12px] text-[hsl(var(--foreground)/.5)]">
                <Clock size={13} /> 4 min read
              </span>
            </div>

            <h1 className="text-[clamp(2.4rem,4.8vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[hsl(var(--foreground))] max-w-[950px]">
              How We Onboard a New Client: Our Five-Step Process
            </h1>

            <p className="mt-6 text-[18px] md:text-[20px] leading-[1.6] text-[hsl(var(--foreground)/.72)] max-w-[850px] font-light">
              From client questionnaire to ongoing optimization, see Avantra Consulting's five-step onboarding process and what to expect at each stage.
            </p>
          </div>
        </section>

        {/* Infographic Graphic Banner */}
        <section className="py-8 bg-[hsl(var(--muted))] border-b border-[hsl(var(--foreground)/.1)]">
          <div className="container-wide max-w-[1100px]">
            <OnboardingProcessInfographic />
          </div>
        </section>

        {/* Article Body Content */}
        <section className="py-16 md:py-24">
          <div className="container-wide max-w-[900px]">
            <div className="prose prose-lg max-w-none text-[17px] md:text-[18px] leading-[1.75] text-[hsl(var(--foreground)/.8)] space-y-8">
              
              <p className="text-[20px] leading-[1.6] text-[hsl(var(--foreground))] font-normal">
                Starting with a new partner is easier when you know what happens next. Whether you're outsourcing legal support, building a remote team or handing over your bookkeeping, every Avantra engagement follows the same five steps.
              </p>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  1. Client Questionnaire
                </h2>
                <p className="mt-4">
                  We start by understanding your business: the work you want to hand over, your current tools, volumes, deadlines and the standards you hold your team to. The questionnaire takes about 5 minutes and means our first conversation is about solutions, not basics.
                </p>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  2. SLA Creation
                </h2>
                <p className="mt-4">
                  Together we write a service level agreement covering scope, turnaround times, quality checks, communication channels and reporting. You'll know exactly what we deliver, when, and how it will be measured.
                </p>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  3. Kickoff Meeting
                </h2>
                <p className="mt-4">
                  We introduce your dedicated team, walk through access and security, confirm the first deliverables and agree on check-in times. You'll leave with a clear plan for the first 30 days.
                </p>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  4. Deliverables and Follow-Up
                </h2>
                <p className="mt-4">
                  Work begins, usually with a pilot so you can review quality before volumes increase. We follow up regularly, collect feedback and adjust quickly.
                </p>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  5. Experience Optimization
                </h2>
                <p className="mt-4">
                  Once the work is running smoothly, we look for improvements: better templates, automation, faster turnaround or new areas we can support. Solutioning together doesn't stop after onboarding.
                </p>
              </div>

              {/* Inline Call to Action Box */}
              <div className="mt-12 p-8 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--foreground)/.15)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[hsl(var(--accent))] font-medium">Onboarding Questionnaire</span>
                  <h3 className="text-[20px] font-normal text-[hsl(var(--foreground))] mt-1">
                    Ready to start with step one?
                  </h3>
                </div>
                <a href="/#enquire" className="nav-cta px-6 py-3.5 text-[13px] font-bold inline-flex items-center gap-2 shrink-0">
                  Complete the client questionnaire <ArrowRight size={15} />
                </a>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  if (isArticleThree) {
    return (
      <main className="site-shell bg-[hsl(var(--background))]">
        <Navbar />

        {/* Article Hero */}
        <section className="pt-32 pb-12 border-b border-[hsl(var(--foreground)/.1)]">
          <div className="container-wide">
            <a href="/articles" className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.1em] text-[hsl(var(--accent))] hover:underline mb-8">
              <ArrowLeft size={14} /> Back to Articles
            </a>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[11px] uppercase tracking-[0.14em] font-mono font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.1)] px-3 py-1 rounded-full">
                Finance &amp; Bookkeeping
              </span>
              <span className="flex items-center gap-1 text-[12px] text-[hsl(var(--foreground)/.5)]">
                <Clock size={13} /> 5 min read
              </span>
            </div>

            <h1 className="text-[clamp(2.4rem,4.8vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[hsl(var(--foreground))] max-w-[950px]">
              Closing Your Books in Five Days: A Monthly Routine That Works
            </h1>

            <p className="mt-6 text-[18px] md:text-[20px] leading-[1.6] text-[hsl(var(--foreground)/.72)] max-w-[850px] font-light">
              A practical five-day month-end close routine for small and mid-sized businesses: reconciliations, reviews and reports, without the scramble.
            </p>
          </div>
        </section>

        {/* Infographic Graphic Banner */}
        <section className="py-8 bg-[hsl(var(--muted))] border-b border-[hsl(var(--foreground)/.1)]">
          <div className="container-wide max-w-[1100px]">
            <FiveDayCloseInfographic />
          </div>
        </section>

        {/* Article Body Content */}
        <section className="py-16 md:py-24">
          <div className="container-wide max-w-[900px]">
            <div className="prose prose-lg max-w-none text-[17px] md:text-[18px] leading-[1.75] text-[hsl(var(--foreground)/.8)] space-y-8">
              
              <p className="text-[20px] leading-[1.6] text-[hsl(var(--foreground))] font-normal">
                If your books for September are finished in late October, every decision you make in between is based on old numbers. A faster, predictable month-end close gives owners and managers information while it can still change the outcome. Here's a five-day routine that works for most small and mid-sized businesses.
              </p>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  Before Month End: Keep It Clean As You Go
                </h2>
                <ul className="mt-4 space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                    <span>Record transactions weekly, not monthly.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                    <span>Attach receipts and invoices at the time of entry.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                    <span>Keep a running list of open questions for the business owner, rather than saving them for close.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  Day 1: Cut-Off and Capture
                </h2>
                <p className="mt-4">
                  Confirm all sales invoices and supplier bills for the month are entered. Record payroll and any recurring journal entries.
                </p>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  Day 2: Reconcile
                </h2>
                <p className="mt-4">
                  Reconcile every bank, credit card and loan account to statements. Clear or explain every unmatched item.
                </p>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  Day 3: Review Balances
                </h2>
                <p className="mt-4">
                  Review accounts receivable and accounts payable ageing. Follow up on overdue invoices. Record accruals, prepayments and depreciation.
                </p>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  Day 4: Check and Correct
                </h2>
                <p className="mt-4">
                  Compare the month to budget and to the prior month. Investigate anything that moved unexpectedly. Most errors are found here, not by an auditor at year end.
                </p>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  Day 5: Report
                </h2>
                <p className="mt-4">
                  Produce the profit and loss statement, balance sheet and cash flow summary, with a short note explaining the key movements. Lock the period so nothing changes after reporting.
                </p>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  Make It Repeatable
                </h2>
                <p className="mt-4">
                  A close routine only works if it happens every month, which is hard when the person doing it is also running the business. Our bookkeeping and finance team runs this process for clients on a fixed schedule, with a named contact and a clear report at the end.
                </p>
              </div>

              {/* Inline Call to Action Box */}
              <div className="mt-12 p-8 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--foreground)/.15)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[hsl(var(--accent))] font-medium">Bookkeeping Quote</span>
                  <h3 className="text-[20px] font-normal text-[hsl(var(--foreground))] mt-1">
                    Want your numbers on time, every month?
                  </h3>
                </div>
                <a href="/#enquire" className="nav-cta px-6 py-3.5 text-[13px] font-bold inline-flex items-center gap-2 shrink-0">
                  Get a bookkeeping quote <ArrowRight size={15} />
                </a>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  if (isArticleTwo) {
    return (
      <main className="site-shell bg-[hsl(var(--background))]">
        <Navbar />

        {/* Article Hero */}
        <section className="pt-32 pb-12 border-b border-[hsl(var(--foreground)/.1)]">
          <div className="container-wide">
            <a href="/articles" className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.1em] text-[hsl(var(--accent))] hover:underline mb-8">
              <ArrowLeft size={14} /> Back to Articles
            </a>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[11px] uppercase tracking-[0.14em] font-mono font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.1)] px-3 py-1 rounded-full">
                Remote Staffing
              </span>
              <span className="flex items-center gap-1 text-[12px] text-[hsl(var(--foreground)/.5)]">
                <Clock size={13} /> 5 min read
              </span>
            </div>

            <h1 className="text-[clamp(2.4rem,4.8vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[hsl(var(--foreground))] max-w-[950px]">
              Remote Staff, Freelancers or an Agency? Choosing the Right Model
            </h1>

            <p className="mt-6 text-[18px] md:text-[20px] leading-[1.6] text-[hsl(var(--foreground)/.72)] max-w-[850px] font-light">
              Compare dedicated remote staff, freelancers and agencies on cost, control, continuity and risk to choose the right model for your business.
            </p>
          </div>
        </section>

        {/* Graphic Visual Banner - Code Rendered Infographic */}
        <section className="py-8 bg-[hsl(var(--muted))] border-b border-[hsl(var(--foreground)/.1)]">
          <div className="container-wide max-w-[1100px]">
            <StaffingModelsInfographic />
          </div>
        </section>

        {/* Article Body Content */}
        <section className="py-16 md:py-24">
          <div className="container-wide max-w-[900px]">
            <div className="prose prose-lg max-w-none text-[17px] md:text-[18px] leading-[1.75] text-[hsl(var(--foreground)/.8)] space-y-8">
              
              <p className="text-[20px] leading-[1.6] text-[hsl(var(--foreground))] font-normal">
                When a business needs more hands, there are three common ways to get them without hiring locally: freelancers, an agency or outsourced vendor, or dedicated remote staff. Each solves a different problem. Picking the wrong one is how companies end up overpaying, losing knowledge, or managing a revolving door.
              </p>

              {/* Table: The Three Models at a Glance */}
              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  The Three Models at a Glance
                </h2>
                
                <div className="mt-6 overflow-x-auto rounded-xl border border-[hsl(var(--foreground)/.15)] shadow-sm bg-white">
                  <table className="w-full text-left border-collapse text-[14px] md:text-[15px]">
                    <thead>
                      <tr className="bg-[#1e3a5f] text-white">
                        <th className="py-3.5 px-4 font-semibold border-b border-r border-white/20">Feature</th>
                        <th className="py-3.5 px-4 font-semibold border-b border-r border-white/20">Freelancers</th>
                        <th className="py-3.5 px-4 font-semibold border-b border-r border-white/20">Agency / project vendor</th>
                        <th className="py-3.5 px-4 font-semibold border-b">Dedicated remote staff</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[hsl(var(--foreground)/.1)] text-[hsl(var(--foreground)/.8)]">
                      <tr className="hover:bg-[hsl(var(--foreground)/.02)]">
                        <td className="py-4 px-4 font-semibold bg-[hsl(var(--muted))] border-r border-[hsl(var(--foreground)/.1)]">Best for</td>
                        <td className="py-4 px-4 border-r border-[hsl(var(--foreground)/.1)]">One-off or specialist tasks</td>
                        <td className="py-4 px-4 border-r border-[hsl(var(--foreground)/.1)]">Defined projects with a clear end</td>
                        <td className="py-4 px-4 font-medium text-[hsl(var(--accent))]">Ongoing, day-to-day work</td>
                      </tr>
                      <tr className="hover:bg-[hsl(var(--foreground)/.02)]">
                        <td className="py-4 px-4 font-semibold bg-[hsl(var(--muted))] border-r border-[hsl(var(--foreground)/.1)]">Control over daily work</td>
                        <td className="py-4 px-4 border-r border-[hsl(var(--foreground)/.1)]">Low</td>
                        <td className="py-4 px-4 border-r border-[hsl(var(--foreground)/.1)]">Low to medium</td>
                        <td className="py-4 px-4 font-medium text-[hsl(var(--accent))]">High: they work as part of your team</td>
                      </tr>
                      <tr className="hover:bg-[hsl(var(--foreground)/.02)]">
                        <td className="py-4 px-4 font-semibold bg-[hsl(var(--muted))] border-r border-[hsl(var(--foreground)/.1)]">Continuity</td>
                        <td className="py-4 px-4 border-r border-[hsl(var(--foreground)/.1)]">Varies by person</td>
                        <td className="py-4 px-4 border-r border-[hsl(var(--foreground)/.1)]">Team may rotate</td>
                        <td className="py-4 px-4 font-medium text-[hsl(var(--accent))]">Same people, building knowledge over time</td>
                      </tr>
                      <tr className="hover:bg-[hsl(var(--foreground)/.02)]">
                        <td className="py-4 px-4 font-semibold bg-[hsl(var(--muted))] border-r border-[hsl(var(--foreground)/.1)]">Cost model</td>
                        <td className="py-4 px-4 border-r border-[hsl(var(--foreground)/.1)]">Per task or hour</td>
                        <td className="py-4 px-4 border-r border-[hsl(var(--foreground)/.1)]">Per project or retainer</td>
                        <td className="py-4 px-4 font-medium text-[hsl(var(--accent))]">Predictable monthly cost</td>
                      </tr>
                      <tr className="hover:bg-[hsl(var(--foreground)/.02)]">
                        <td className="py-4 px-4 font-semibold bg-[hsl(var(--muted))] border-r border-[hsl(var(--foreground)/.1)]">Admin burden on you</td>
                        <td className="py-4 px-4 border-r border-[hsl(var(--foreground)/.1)]">Sourcing, vetting, paying each person</td>
                        <td className="py-4 px-4 border-r border-[hsl(var(--foreground)/.1)]">Low</td>
                        <td className="py-4 px-4 font-medium text-[hsl(var(--accent))]">Low when the provider handles HR and payroll</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  When Dedicated Remote Staff Make Sense
                </h2>
                <p className="mt-4">
                  Choose dedicated staff when the work is ongoing, needs knowledge of your systems and clients, and benefits from the same person doing it every day. Think bookkeeping, case management, customer support, or back-office administration.
                </p>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  What a Good Staffing Partner Should Handle
                </h2>
                <p className="mt-4">
                  The value of a staffing partner is everything that happens around the work:
                </p>
                <ul className="mt-4 space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                    <span><strong>Recruitment and vetting</strong> against your role description.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                    <span><strong>Training on your tools and processes</strong> before and after go-live.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                    <span><strong>Payroll, benefits and HR administration</strong>, so you pay one predictable invoice.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                    <span><strong>Replacement cover</strong> if someone leaves or is unavailable.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                    <span><strong>Performance tracking</strong> against agreed goals.</span>
                  </li>
                </ul>
                <p className="mt-6 italic text-[hsl(var(--foreground)/.75)]">
                  At Avantra, our Virtual Staffing Solutions include training and payroll management as standard, so your remote team members are productive quickly and stay that way.
                </p>
              </div>

              <div className="pt-6">
                <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                  A Simple Rule of Thumb
                </h2>
                <p className="mt-4 text-[19px] font-medium text-[hsl(var(--foreground))] leading-[1.6] bg-[hsl(var(--muted))] p-6 rounded-xl border border-[hsl(var(--foreground)/.1)]">
                  If you need it once, use a freelancer. If you need it finished, use an agency. If you need it done every day, build a dedicated remote team.
                </p>
              </div>

              {/* Inline Call to Action Box */}
              <div className="mt-12 p-8 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--foreground)/.15)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[hsl(var(--accent))] font-medium">Next Steps</span>
                  <h3 className="text-[20px] font-normal text-[hsl(var(--foreground))] mt-1">
                    Tell us about the role you need to fill.
                  </h3>
                </div>
                <a href="/#enquire" className="nav-cta px-6 py-3.5 text-[13px] font-bold inline-flex items-center gap-2 shrink-0">
                  Request a staffing proposal <ArrowRight size={15} />
                </a>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  {/* Article 1 Default View */}
  return (
    <main className="site-shell bg-[hsl(var(--background))]">
      <Navbar />

      {/* Article Hero */}
      <section className="pt-32 pb-12 border-b border-[hsl(var(--foreground)/.1)]">
        <div className="container-wide">
          <a href="/articles" className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.1em] text-[hsl(var(--accent))] hover:underline mb-8">
            <ArrowLeft size={14} /> Back to Articles
          </a>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[11px] uppercase tracking-[0.14em] font-mono font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/.1)] px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-[12px] text-[hsl(var(--foreground)/.5)]">
              <Clock size={13} /> {article.readTime} read
            </span>
          </div>

          <h1 className="text-[clamp(2.4rem,4.8vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[hsl(var(--foreground))] max-w-[950px]">
            {article.title}
          </h1>

          <p className="mt-6 text-[18px] md:text-[20px] leading-[1.6] text-[hsl(var(--foreground)/.72)] max-w-[850px] font-light">
            Legal process outsourcing gives attorneys back the hours lost to drafting, tracking and filing. Learn what LPO covers, what stays in-house, and how to start.
          </p>
        </div>
      </section>

      {/* Graphic Visual Banner - Code Rendered Infographic */}
      <section className="py-8 bg-[hsl(var(--muted))] border-b border-[hsl(var(--foreground)/.1)]">
        <div className="container-wide max-w-[1100px]">
          <LpoInfographic />
        </div>
      </section>

      {/* Article Body Content */}
      <section className="py-16 md:py-24">
        <div className="container-wide max-w-[900px]">
          <div className="prose prose-lg max-w-none text-[17px] md:text-[18px] leading-[1.75] text-[hsl(var(--foreground)/.8)] space-y-8">
            
            <p className="text-[20px] leading-[1.6] text-[hsl(var(--foreground))] font-normal">
              Most law firms don't have a legal problem. They have a capacity problem. Attorneys and in-house paralegals spend a large share of their week on work that is necessary but repetitive: drafting standard notices, updating case management systems, chasing documents and preparing files for review. Legal process outsourcing (LPO) moves that work to a trained, supervised team so your people can focus on the work only they can do.
            </p>

            <div className="pt-6">
              <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                What LPO Covers
              </h2>
              <p className="mt-4">
                A good LPO partner handles defined, repeatable tasks under your firm's direction. At Avantra, that typically includes:
              </p>
              <ul className="mt-4 space-y-3 pl-2">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))] shrink-0" />
                  <span><strong>Notice and document drafting</strong> from your approved templates, such as validation notices, demand letters and standard pleadings.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))] shrink-0" />
                  <span><strong>Case management</strong> including data entry, status updates, deadline tracking and file preparation in your existing system.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))] shrink-0" />
                  <span><strong>FDCPA and debt defense support</strong> such as organizing account records, preparing response packages and flagging items for attorney review.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))] shrink-0" />
                  <span><strong>Bankruptcy support</strong> including gathering schedules, organizing creditor information and preparing documents for filing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))] shrink-0" />
                  <span><strong>Research and summarization</strong> for attorney review.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                What Stays With Your Attorneys
              </h2>
              <p className="mt-4">
                Outsourcing doesn't change who is responsible for the legal work. Under ABA Model Rule 5.3, lawyers remain responsible for supervising non-lawyer assistance, wherever that help sits. So legal advice, final review, signatures, court appearances and client counseling stay in-house. Our role is to deliver accurate, review-ready work and make supervision easy, not to replace judgment.
              </p>
            </div>

            <div className="pt-6">
              <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                Signs Your Firm is Ready
              </h2>
              <ul className="mt-4 space-y-3 pl-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                  <span>Attorneys are doing their own data entry or document formatting.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                  <span>Your team falls behind whenever volume spikes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                  <span>Hiring a full-time paralegal doesn't make sense for the workload, but the backlog keeps growing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 text-[hsl(var(--accent))] shrink-0" />
                  <span>Deadlines are tracked in spreadsheets and inboxes rather than one system.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <h2 className="text-[24px] md:text-[28px] font-normal tracking-[-0.015em] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/.12)] pb-3">
                How to Start Without Risk
              </h2>
              <p className="mt-4">
                Start with one well-defined workflow, for example drafting a single notice type. Agree on turnaround times and quality checks in a written service level agreement (SLA), run a short pilot, measure the results, then expand. That is exactly how our onboarding is designed.
              </p>
            </div>

            {/* Inline Call to Action Box */}
            <div className="mt-12 p-8 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--foreground)/.15)] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[hsl(var(--accent))] font-medium">Next Steps</span>
                <h3 className="text-[20px] font-normal text-[hsl(var(--foreground))] mt-1">
                  Want to see which of your workflows could move first?
                </h3>
              </div>
              <a href="/#enquire" className="nav-cta px-6 py-3.5 text-[13px] font-bold inline-flex items-center gap-2 shrink-0">
                Book a free consultation <ArrowRight size={15} />
              </a>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
