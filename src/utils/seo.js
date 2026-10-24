/**
 * src/utils/seo.js
 * Utility to synchronize SEO tags (canonical, OG, Twitter) based on siteConfig.siteUrl and page meta.
 */

import { siteConfig } from '../data/siteConfig';

export function updatePageSeo({
  title = "Mohammad Zaid Sayeed | AI & Data Science Developer",
  description = "AI & Data Science student building projects in AI, machine learning, data analytics and business software. Open to internships and entry-level roles.",
  path = "/",
} = {}) {
  // Update document title
  document.title = title;

  // Update meta description
  let descTag = document.querySelector('meta[name="description"]');
  if (descTag) {
    descTag.setAttribute('content', description);
  }

  // Update Open Graph and Twitter titles and descriptions
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', title);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', description);

  const baseUrl = siteConfig.siteUrl ? siteConfig.siteUrl.replace(/\/+$/, '') : '';

  // Canonical tag handling
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (baseUrl) {
    const fullUrl = `${baseUrl}${path === '/' ? '' : path}`;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', fullUrl);

    // Update og:url
    let ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (!ogUrlTag) {
      ogUrlTag = document.createElement('meta');
      ogUrlTag.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlTag);
    }
    ogUrlTag.setAttribute('content', fullUrl);

    // Update og:image and twitter:image to absolute URLs
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', `${baseUrl}/og-image.png`);

    const twImg = document.querySelector('meta[name="twitter:image"]');
    if (twImg) twImg.setAttribute('content', `${baseUrl}/og-image.png`);
  } else {
    // If baseUrl is empty, remove canonical if present and keep relative og:image
    if (canonicalTag) {
      canonicalTag.remove();
    }
    const ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (ogUrlTag) {
      ogUrlTag.remove();
    }
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', '/og-image.png');

    const twImg = document.querySelector('meta[name="twitter:image"]');
    if (twImg) twImg.setAttribute('content', '/og-image.png');
  }
}
