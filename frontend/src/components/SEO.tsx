import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Avantra Consulting | Legal Process Outsourcing, Remote Staffing & Business Solutions',
  description = 'Avantra Consulting delivers high-impact legal process outsourcing (LPO), dedicated remote staffing, bookkeeping, IT-enabled services, and strategic consulting for growing global businesses.',
  canonical,
  keywords = 'legal process outsourcing, remote staffing, dedicated virtual assistant, bookkeeping outsourcing, IT enabled services, LPO services, remote team building, operations coordinator, legal drafting, paralegal support, Avantra Consulting',
  type = 'website',
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

    // Helper to safely remove unwanted preview tags
    const removeMetaTag = (selector: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.remove();
      }
    };

    // 2. Standard Search Engine SEO (Google, Bing, etc.)
    setMetaTag('meta[name="description"]', 'content', description);
    setMetaTag('meta[name="keywords"]', 'content', keywords);

    // 3. Open Graph Tags (Clean text-only preview, no image)
    setMetaTag('meta[property="og:title"]', 'content', formattedTitle);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:type"]', 'content', type);
    if (canonical) {
      setMetaTag('meta[property="og:url"]', 'content', canonical);
    }
    removeMetaTag('meta[property="og:image"]');

    // 4. Twitter Card Tags (Summary text, no image)
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary');
    setMetaTag('meta[name="twitter:title"]', 'content', formattedTitle);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    removeMetaTag('meta[name="twitter:image"]');

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
  }, [title, description, canonical, keywords, type]);

  return null;
};

export default SEO;
