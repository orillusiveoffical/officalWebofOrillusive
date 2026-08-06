import { useEffect } from 'react';
import { SEO_CONFIG, type PageSEO } from '../data/seoData';

/**
 * SEOHead — Dynamically updates document `<head>` meta tags for SEO.
 *
 * Manages: title, description, keywords, canonical URL,
 * Open Graph tags, and Twitter Card tags on a per-page basis.
 *
 * Usage:
 *   <SEOHead page={PAGE_SEO.home} />
 */

interface SEOHeadProps {
  page: PageSEO;
  /** Optional override for the OG image path (relative to siteUrl) */
  ogImage?: string;
}

function setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export const SEOHead: React.FC<SEOHeadProps> = ({ page, ogImage }) => {
  useEffect(() => {
    const fullUrl = `${SEO_CONFIG.siteUrl}${page.canonicalPath}`;
    const imageUrl = `${SEO_CONFIG.siteUrl}${ogImage || SEO_CONFIG.defaultOgImage}`;

    // ── Page Title ──
    document.title = page.title;

    // ── Standard Meta Tags ──
    setMetaTag('description', page.description);
    setMetaTag('keywords', page.keywords);
    setMetaTag('author', SEO_CONFIG.siteName);
    setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // ── Canonical URL ──
    setLinkTag('canonical', fullUrl);

    // ── Open Graph ──
    setMetaTag('og:title', page.title, 'property');
    setMetaTag('og:description', page.description, 'property');
    setMetaTag('og:url', fullUrl, 'property');
    setMetaTag('og:type', page.ogType || 'website', 'property');
    setMetaTag('og:site_name', SEO_CONFIG.siteName, 'property');
    setMetaTag('og:locale', SEO_CONFIG.locale, 'property');
    setMetaTag('og:image', imageUrl, 'property');
    setMetaTag('og:image:width', '1200', 'property');
    setMetaTag('og:image:height', '630', 'property');
    setMetaTag('og:image:alt', `${SEO_CONFIG.siteName} — ${SEO_CONFIG.siteTagline}`, 'property');

    // ── Twitter Card ──
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:site', SEO_CONFIG.twitterHandle);
    setMetaTag('twitter:title', page.title);
    setMetaTag('twitter:description', page.description);
    setMetaTag('twitter:image', imageUrl);
    setMetaTag('twitter:image:alt', `${SEO_CONFIG.siteName} — ${SEO_CONFIG.siteTagline}`);
  }, [page, ogImage]);

  return null; // This component only manages <head> side effects
};

export default SEOHead;
