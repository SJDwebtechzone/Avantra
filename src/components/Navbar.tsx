import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Hp } from '../data/servicesData';

export const Logo: React.FC<{ light?: boolean; className?: string }> = ({ light = false, className = '' }) => {
  return (
    <a 
      href="/#top" 
      data-testid="link-logo" 
      className={`inline-flex items-center transition-opacity hover:opacity-90 ${className}`} 
      aria-label="Avantra Consulting LLP - solutioning together"
    >
      <img
        src={light ? "/avantra-logo-white.svg" : "/avantra-logo.svg"}
        alt="Avantra Consulting LLP"
        className="h-8 sm:h-9 md:h-10 w-auto object-contain max-w-[230px] sm:max-w-[320px] md:max-w-none"
      />
    </a>
  );
};

export const Navbar: React.FC<{ light?: boolean }> = ({ light = false }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);
  const closeMenu = () => setActiveMenu(null);

  const headerBgClass = scrolled
    ? light
      ? 'bg-[#122842]/95 backdrop-blur-md shadow-md border-b border-white/10'
      : 'bg-[hsl(var(--background)/.92)] backdrop-blur-md shadow-sm border-b border-[hsl(var(--foreground)/.1)]'
    : light
      ? 'header-dark bg-transparent'
      : 'bg-transparent';

  return (
    <header className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${headerBgClass}`}>
      <div className="container-wide flex h-[70px] items-center justify-between">
        <Logo light={light} />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          <a href="/#top" className="nav-link" data-testid="link-home">Home</a>

          {Hp.map((y) => (
            <div key={y.label} className="nav-dropdown">
              <button 
                type="button" 
                className="nav-menu-trigger" 
                aria-expanded={activeMenu === y.label} 
                onClick={() => setActiveMenu((prev) => (prev === y.label ? null : y.label))}
                data-testid={`button-nav-${y.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {y.label} <ChevronDown size={13} />
              </button>

              {activeMenu === y.label && (
                <div className={`nav-menu-panel ${y.columns.length > 1 ? 'nav-menu-panel-wide' : ''}`}>
                  {y.columns.map((col) => (
                    <div key={col.label} className="nav-menu-column">
                      <div className="nav-menu-label">{col.label}</div>
                      {col.items.map(([itemLabel, itemHref]) => (
                        <a 
                          key={itemLabel} 
                          href={itemHref} 
                          onClick={closeMenu} 
                          className="nav-menu-item"
                        >
                          {itemLabel}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <a href="/#enquire" className="nav-cta px-4 py-3 text-[12px] font-bold" data-testid="link-enquire-nav">
            Schedule a Consultation
          </a>
        </nav>

        <button 
          type="button" 
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} 
          aria-expanded={mobileOpen} 
          className="flex h-10 w-10 items-center justify-center md:hidden" 
          onClick={() => setMobileOpen((prev) => !prev)}
          data-testid="button-mobile-menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="mobile-menu md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-4">
            <a href="/#top" onClick={closeMobile} className="nav-link py-2" data-testid="mobile-link-home">
              Home
            </a>
            {Hp.map((y) => (
              <div key={y.label} className="mobile-nav-group">
                <a href={y.href} onClick={closeMobile} className="mobile-nav-heading">
                  {y.label}
                </a>
                <div className="mobile-nav-items" style={{ paddingLeft: 0 }}>
                  {y.columns.flatMap((col) => col.items).map(([itemLabel, itemHref]) => (
                    <a 
                      key={`${y.label}-${itemLabel}`} 
                      href={itemHref} 
                      onClick={closeMobile} 
                      className="nav-link py-1"
                    >
                      {itemLabel}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <a href="/#enquire" onClick={closeMobile} className="nav-cta px-4 py-3 text-center text-[12px] font-bold" data-testid="mobile-link-enquire">
              Schedule a Consultation
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
