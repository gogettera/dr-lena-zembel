
import { AuditIssue } from './types';

export function auditSEO(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // Check for basic meta tags
  const title = document.querySelector('title');
  if (!title || title.textContent.trim().length === 0) {
    issues.push({
      id: 'seo-title-missing',
      category: 'seo',
      severity: 'critical',
      title: 'Missing Page Title',
      description: 'Page is missing a title tag',
      fixSuggestion: 'Add a descriptive title tag to the page head'
    });
  } else if (title.textContent.length > 60) {
    issues.push({
      id: 'seo-title-long',
      category: 'seo',
      severity: 'medium',
      title: 'Page Title Too Long',
      description: `Title is ${title.textContent.length} characters (recommended: under 60)`,
      fixSuggestion: 'Shorten the title to under 60 characters for better search results'
    });
  }

  // Check meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription || !metaDescription.getAttribute('content')) {
    issues.push({
      id: 'seo-meta-desc-missing',
      category: 'seo',
      severity: 'high',
      title: 'Missing Meta Description',
      description: 'Page is missing a meta description',
      fixSuggestion: 'Add a meta description tag with a compelling summary of the page content'
    });
  } else {
    const descLength = metaDescription.getAttribute('content')?.length || 0;
    if (descLength > 160) {
      issues.push({
        id: 'seo-meta-desc-long',
        category: 'seo',
        severity: 'medium',
        title: 'Meta Description Too Long',
        description: `Meta description is ${descLength} characters (recommended: 150-160)`,
        fixSuggestion: 'Shorten meta description to 150-160 characters'
      });
    } else if (descLength < 120) {
      issues.push({
        id: 'seo-meta-desc-short',
        category: 'seo',
        severity: 'low',
        title: 'Meta Description Too Short',
        description: `Meta description is ${descLength} characters (recommended: 150-160)`,
        fixSuggestion: 'Expand meta description to 150-160 characters for better search visibility'
      });
    }
  }

  // Check for H1 tag
  const h1Tags = document.querySelectorAll('h1');
  if (h1Tags.length === 0) {
    issues.push({
      id: 'seo-h1-missing',
      category: 'seo',
      severity: 'high',
      title: 'Missing H1 Tag',
      description: 'Page is missing an H1 heading tag',
      fixSuggestion: 'Add an H1 tag with the main topic of the page'
    });
  } else if (h1Tags.length > 1) {
    issues.push({
      id: 'seo-multiple-h1',
      category: 'seo',
      severity: 'medium',
      title: 'Multiple H1 Tags',
      description: `Page has ${h1Tags.length} H1 tags (recommended: 1)`,
      fixSuggestion: 'Use only one H1 tag per page and use H2-H6 for subheadings'
    });
  }

  // Check for Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');

  if (!ogTitle) {
    issues.push({
      id: 'seo-og-title',
      category: 'seo',
      severity: 'medium',
      title: 'Missing Open Graph Title',
      description: 'Page lacks og:title for social media sharing',
      fixSuggestion: 'Add og:title meta tag for better social media appearance'
    });
  }

  if (!ogDescription) {
    issues.push({
      id: 'seo-og-description',
      category: 'seo',
      severity: 'medium',
      title: 'Missing Open Graph Description',
      description: 'Page lacks og:description for social media sharing',
      fixSuggestion: 'Add og:description meta tag for social media previews'
    });
  }

  if (!ogImage) {
    issues.push({
      id: 'seo-og-image',
      category: 'seo',
      severity: 'low',
      title: 'Missing Open Graph Image',
      description: 'Page lacks og:image for social media sharing',
      fixSuggestion: 'Add og:image meta tag with a relevant image for social media'
    });
  }

  // Check for canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    issues.push({
      id: 'seo-canonical',
      category: 'seo',
      severity: 'medium',
      title: 'Missing Canonical URL',
      description: 'Page lacks a canonical URL to prevent duplicate content issues',
      fixSuggestion: 'Add a canonical link tag to specify the preferred URL'
    });
  }

  // Check for structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredData.length === 0) {
    issues.push({
      id: 'seo-structured-data',
      category: 'seo',
      severity: 'low',
      title: 'Missing Structured Data',
      description: 'Page lacks structured data markup for search engines',
      fixSuggestion: 'Add JSON-LD structured data for better search engine understanding'
    });
  }

  // Check internal links
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href*="' + window.location.hostname + '"]');
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  
  if (internalLinks.length === 0) {
    issues.push({
      id: 'seo-no-internal-links',
      category: 'seo',
      severity: 'medium',
      title: 'No Internal Links',
      description: 'Page has no internal links to other pages on the site',
      fixSuggestion: 'Add relevant internal links to improve site navigation and SEO'
    });
  }

  // Check for rel="noopener" on external links
  externalLinks.forEach((link, index) => {
    const rel = link.getAttribute('rel');
    if (!rel || !rel.includes('noopener')) {
      issues.push({
        id: `seo-external-link-${index}`,
        category: 'security',
        severity: 'medium',
        title: 'External Link Missing rel="noopener"',
        description: 'External link lacks rel="noopener" security attribute',
        fixSuggestion: 'Add rel="noopener" to external links for security',
        autoFixable: true
      });
    }
  });

  return issues;
}
