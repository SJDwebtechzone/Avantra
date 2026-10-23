import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  type?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Avantra Consulting | Legal Process Outsourcing, Remote Staffing & Business Solutions',
  description = 'Avantra Consulting delivers high-impact legal process outsourcing (LPO), dedicated remote staffing, bookkeeping, IT-enabled services, and strategic consulting for growing global businesses.',
  canonical,
  keywords = 'legal process outsourcing, remote staffing, dedicated virtual assistant, bookkeeping outsourcing, IT enabled services, LPO services, remote team building, operations coordinator, legal drafting, paralegal support, Avantra Consulting',
  type = 'website',
  image = 'https://avantraconsulting.com/hero_banner.jpg',
}) => {
  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title.includes('Avantra') ? title : `${title} | Avantra Consulting`;
    document.title = formattedTitle;

    // Helper to set or create meta tags
    const setMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attrName, attrVal] = selector.replace(/[\[\]"]/g, '').split('=');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', 'content', description);
    setMetaTag('meta[name="keywords"]', 'content', keywords);

    // 3. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'content', formattedTitle);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:type"]', 'content', type);
    setMetaTag('meta[property="og:image"]', 'content', image);
    if (canonical) {
      setMetaTag('meta[property="og:url"]', 'content', canonical);
    }

    // 4. Twitter Card Tags
    setMetaTag('meta[name="twitter:title"]', 'content', formattedTitle);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    setMetaTag('meta[name="twitter:image"]', 'content', image);

    // 5. Canonical Link
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }
  }, [title, description, canonical, keywords, type, image]);

  return null;
};

export default SEO;
