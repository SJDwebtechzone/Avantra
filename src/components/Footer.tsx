import React from 'react';
import { MapPin } from 'lucide-react';
import { Logo } from './Navbar';
import { ScrollToTop } from './ScrollToTop';

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="dark-panel border-t border-[hsl(var(--primary-foreground)/.15)] pb-8 pt-14">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-[1.3fr_.7fr_.9fr]">
            <div>
              <Logo light={true} />
              <p className="mt-6 max-w-[280px] text-[13px] leading-[1.65] text-[hsl(var(--primary-foreground)/.85)]">
                Legal process outsourcing and business consulting, thoughtfully delivered from Bangalore to the teams that need it.
              </p>
            </div>

            <div>
              <div className="eyebrow">Explore</div>
              <div className="mt-5 flex flex-col gap-3">
                <a className="footer-link" href="/#about" data-testid="footer-link-about">About Us</a>
                <a className="footer-link" href="/services" data-testid="footer-link-services">Services</a>
                <a className="footer-link" href="/#regions" data-testid="footer-link-regions">Solutions by Region</a>
                <a className="footer-link" href="/#insights" data-testid="footer-link-insights">Insights</a>
                <a className="footer-link" href="/#enquire" data-testid="footer-link-enquire">Schedule a Consultation</a>
              </div>
            </div>

            <div>
              <div className="eyebrow">Find us</div>
              <address className="mt-5 flex items-start gap-3 text-[13px] not-italic leading-[1.55] text-[hsl(var(--primary-foreground)/.88)]">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" />
                <span>
                  No 17/1, 4th Main Road,<br />
                  8th Cross, Nandini Layout II Block,<br />
                  Bangalore - 560 096, Karnataka, India
                </span>
              </address>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-[hsl(var(--primary-foreground)/.15)] pt-5 text-[10px] uppercase tracking-[.12em] text-[hsl(var(--primary-foreground)/.72)] md:flex-row md:items-center md:justify-between">
            <span>
              © {new Date().getFullYear()}{' '}
              <a
                href="https://devspectra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[hsl(var(--accent))] transition-colors cursor-pointer underline decoration-transparent hover:decoration-current underline-offset-4"
              >
                DevSpectra
              </a>
            </span>
            <span>Expertise you can count on, results you can trust.</span>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </>
  );
};
