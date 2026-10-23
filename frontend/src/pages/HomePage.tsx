import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { MarqueeBand } from '../components/MarqueeBand';
import { ServicesSection } from '../components/ServicesSection';
import { RegionalSection } from '../components/RegionalSection';
import { AboutSection } from '../components/AboutSection';
import { InsightsSection } from '../components/InsightsSection';
import { EnquireSection } from '../components/EnquireSection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  useEffect(() => {
    if (window.location.hash === '#enquire') {
      const timer = setTimeout(() => {
        const el = document.getElementById('enquire');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="site-shell">
      <SEO canonical="https://avantraconsulting.com/" />
      <Navbar />
      <HeroSection />
      <MarqueeBand />
      <ServicesSection />
      <RegionalSection />
      <AboutSection />
      <InsightsSection />
      <EnquireSection />
      <Footer />
    </main>
  );
};


