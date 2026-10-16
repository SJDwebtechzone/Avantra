import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const StoryPage: React.FC = () => {
  return (
    <main className="site-shell bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen flex flex-col justify-between">
      <Navbar />

      <div className="pt-[80px]">
        {/* Story Section - Streamlined Layout Without Grid Space Gaps */}
        <section className="py-6 md:py-10">
          <div className="container-wide">
            
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--foreground)/.52)] mb-3">
              <a href="/" className="hover:text-[hsl(var(--accent))] transition-colors">Home</a>
              <span>/</span>
              <span className="mono text-[hsl(var(--accent))] font-semibold">Our Story</span>
            </div>

            {/* H1 Title */}
            <h1 className="text-[clamp(2.5rem,5.2vw,5.2rem)] font-normal leading-[.9] tracking-[-.035em]">
              One team.<br />
              <span className="serif italic text-[hsl(var(--secondary))]">Multiple capabilities.</span><br />
              Practical results.
            </h1>

            {/* Section Divider & Journey Eyebrow */}
            <div className="mt-6 mb-6 border-t border-[hsl(var(--foreground)/.14)] pt-4">
              <span className="eyebrow">OUR JOURNEY</span>
              <h2 className="mt-1 text-xl md:text-2xl font-light tracking-tight">
                How we became the <span className="serif italic text-[hsl(var(--secondary))]">one partner</span> that removes the seams.
              </h2>
            </div>

            {/* 4 Story Chapter Cards */}
            <div className="grid gap-6 md:grid-cols-2 items-stretch">
              
              {/* Card 01 */}
              <div className="group rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6 md:p-8 transition-all hover:border-[hsl(var(--accent))] hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[hsl(var(--foreground)/.1)] pb-3 mb-4">
                    <span className="serif text-2xl font-normal text-[hsl(var(--accent))]">01</span>
                    <span className="mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--foreground)/.5)] font-semibold">The Observation</span>
                  </div>
                  <h3 className="text-lg font-normal mb-3 leading-snug">
                    A Simple Observation in Demanding Work
                  </h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.65] text-[hsl(var(--foreground)/.75)]">
                    Avantra started with a simple observation: the firms and businesses doing the most demanding work were stitching together support from too many disconnected vendors — one for legal help, another for staffing, a different one again for the book-keeping or the tech — and losing time, context, and quality in the handoffs between them.
                  </p>
                </div>
              </div>

              {/* Card 02 */}
              <div className="group rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6 md:p-8 transition-all hover:border-[hsl(var(--accent))] hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[hsl(var(--foreground)/.1)] pb-3 mb-4">
                    <span className="serif text-2xl font-normal text-[hsl(var(--accent))]">02</span>
                    <span className="mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--foreground)/.5)] font-semibold">The Solution</span>
                  </div>
                  <h3 className="text-lg font-normal mb-3 leading-snug">
                    Removing Seams Since 2021
                  </h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.65] text-[hsl(var(--foreground)/.75)]">
                    Since 2021, our team in Bangalore has worked to be the one partner that removes those seams. That has meant pairing real operational expertise — legal, financial, technical — with something simpler and rarer: a single point of ownership for the whole brief, not just one slice of it.
                  </p>
                </div>
              </div>

              {/* Card 03 */}
              <div className="group rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6 md:p-8 transition-all hover:border-[hsl(var(--accent))] hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[hsl(var(--foreground)/.1)] pb-3 mb-4">
                    <span className="serif text-2xl font-normal text-[hsl(var(--accent))]">03</span>
                    <span className="mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--foreground)/.5)] font-semibold">The Reach</span>
                  </div>
                  <h3 className="text-lg font-normal mb-3 leading-snug">
                    Two Connected Practices
                  </h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.65] text-[hsl(var(--foreground)/.75)]">
                    Today that shows up as two connected practices: business services for US firms and companies — legal process outsourcing, remote staffing, bookkeeping and accounting, and IT-enabled services — and consulting, technology, and outsourcing support for organizations across India shaping their next stage of growth.
                  </p>
                </div>
              </div>

              {/* Card 04 */}
              <div className="group rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6 md:p-8 transition-all hover:border-[hsl(var(--accent))] hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[hsl(var(--foreground)/.1)] pb-3 mb-4">
                    <span className="serif text-2xl font-normal text-[hsl(var(--accent))]">04</span>
                    <span className="mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--foreground)/.5)] font-semibold">The Standard</span>
                  </div>
                  <h3 className="text-lg font-normal mb-3 leading-snug">
                    Our True Measure of Success
                  </h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.65] text-[hsl(var(--foreground)/.75)]">
                    What hasn't changed since day one is how we measure ourselves: not by whether the work got done, but by whether it got easier.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};
