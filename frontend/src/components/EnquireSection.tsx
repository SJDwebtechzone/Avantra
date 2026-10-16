import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, CheckCircle2 } from 'lucide-react';

export const EnquireSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceError, setServiceError] = useState(false);
  const [workDetails, setWorkDetails] = useState('');

  const serviceOptions = [
    'Legal process outsourcing',
    'Remote staffing',
    'Bookkeeping & finance',
    'IT-enabled services',
    'Business consulting',
    'Not sure yet'
  ];

  const handleServiceChange = (service: string) => {
    setServiceError(false);
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      setServiceError(true);
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="enquire" className="contact-panel py-24 md:py-32">
      <div className="container-wide grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <div className="eyebrow">Start here</div>
          <h2 className="mt-5 max-w-[460px] text-[clamp(3.4rem,6vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.025em]">
            Bring us<br />
            <span className="serif italic text-[hsl(var(--accent))]">the knot.</span>
          </h2>
          <p className="mt-8 max-w-[340px] text-[15px] leading-[1.65] text-[hsl(var(--secondary-foreground)/.65)]">
            Tell us what is slowing the work down. We will come prepared, ask better questions and help you find the right next move.
          </p>

          <div className="mt-10 space-y-3 text-[13px]">
            <a href="tel:+916362328046" className="flex items-center gap-3" data-testid="link-phone">
              <Phone size={15} className="text-[hsl(var(--accent))]" /> +91 636 232 8046
            </a>
            <a href="mailto:info@avantraconsulting.com" className="flex items-center gap-3" data-testid="link-email">
              <Mail size={15} className="text-[hsl(var(--accent))]" /> info@avantraconsulting.com
            </a>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="form-success slide-reveal" data-testid="status-enquiry-success">
              <CheckCircle2 size={22} className="mb-5 text-[hsl(var(--accent))]" />
              <h3 className="serif text-4xl font-normal">We have your note.</h3>
              <p className="mt-3 max-w-[420px] text-[14px] text-[hsl(var(--secondary-foreground)/.66)]">
                Thank you for reaching out. The Avantra team will review your brief and get back to you soon.
              </p>
              <button 
                type="button" 
                className="line-link mt-7 text-[12px]" 
                onClick={() => {
                  setSubmitted(false);
                  setSelectedServices([]);
                  setWorkDetails('');
                }}
                data-testid="button-send-another"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" data-testid="form-enquiry">
              {/* Row 1: Full Name & Company Name */}
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="contact-label">Full name <span className="text-[hsl(var(--accent))]">*</span></span>
                  <input 
                    className="contact-field" 
                    name="name" 
                    required 
                    placeholder="Jane Smith" 
                    data-testid="input-name" 
                  />
                </label>
                <label className="block space-y-2">
                  <span className="contact-label">Company name <span className="text-[hsl(var(--accent))]">*</span></span>
                  <input 
                    className="contact-field" 
                    name="company" 
                    required 
                    placeholder="Your company name" 
                    data-testid="input-company" 
                  />
                </label>
              </div>

              {/* Row 2: Work Email & Phone Number */}
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="contact-label">Work email <span className="text-[hsl(var(--accent))]">*</span></span>
                  <input 
                    className="contact-field" 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="you@company.com" 
                    data-testid="input-email" 
                  />
                </label>
                <label className="block space-y-2">
                  <span className="contact-label">Phone number</span>
                  <input 
                    className="contact-field" 
                    type="tel" 
                    name="phone" 
                    placeholder="+1 555 000 0000" 
                    data-testid="input-phone" 
                  />
                </label>
              </div>

              {/* Row 3: Which services are you interested in? */}
              <div className="block space-y-3">
                <div className="flex justify-between items-center">
                  <span className="contact-label">Which services are you interested in? <span className="text-[hsl(var(--accent))]">*</span></span>
                  <span className="text-[11px] text-[hsl(var(--secondary-foreground)/.5)] font-mono">Select at least one</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 pt-1">
                  {serviceOptions.map((option) => {
                    const isChecked = selectedServices.includes(option);
                    return (
                      <label 
                        key={option} 
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-[hsl(var(--accent)/.12)] border-[hsl(var(--accent))] text-white' 
                            : 'bg-black/10 border-[hsl(var(--secondary-foreground)/.15)] text-[hsl(var(--secondary-foreground)/.8)] hover:border-[hsl(var(--accent)/.4)]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleServiceChange(option)}
                          className="h-4 w-4 rounded accent-[hsl(var(--accent))] cursor-pointer"
                        />
                        <span className="text-[14px] font-medium leading-tight">{option}</span>
                      </label>
                    );
                  })}
                </div>
                {serviceError && (
                  <p className="text-[12px] font-mono text-[hsl(var(--accent))] mt-2">
                    Please select at least one service option.
                  </p>
                )}
              </div>

              {/* Row 4: Tell us about the work you want to hand over */}
              <label className="block space-y-2">
                <div className="flex justify-between items-center">
                  <span className="contact-label">Tell us about the work you want to hand over <span className="text-[hsl(var(--accent))]">*</span></span>
                  <span className="text-[11px] font-mono text-[hsl(var(--secondary-foreground)/.5)]">{workDetails.length}/1000</span>
                </div>
                <textarea 
                  className="contact-field min-h-[110px] resize-y" 
                  name="message" 
                  required 
                  maxLength={1000}
                  value={workDetails}
                  onChange={(e) => setWorkDetails(e.target.value)}
                  placeholder="For example: drafting validation notices, monthly bookkeeping and reconciliations, or a full-time remote assistant." 
                  data-testid="input-message" 
                />
              </label>

              {/* Row 5: Submit Button & Subtext */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between pt-2">
                <button className="submit-button" type="submit" data-testid="button-submit-enquiry">
                  Send enquiry <ArrowRight size={16} className="ml-3" />
                </button>
                <span className="text-[11px] text-[hsl(var(--secondary-foreground)/.5)]">
                  Usually replies within one business day.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
