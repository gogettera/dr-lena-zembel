
import { AuditIssue } from './types';

export function auditPerformance(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // Check for Web Vitals thresholds
  if ('PerformanceObserver' in window) {
    try {
      // Check for images without proper optimization
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        // Check for missing alt text
        if (!img.alt || img.alt.trim() === '') {
          issues.push({
            id: `perf-img-alt-${index}`,
            category: 'accessibility',
            severity: 'medium',
            title: 'Image Missing Alt Text',
            description: `Image at ${img.src} is missing alt text`,
            fixSuggestion: 'Add descriptive alt text for accessibility and SEO',
            autoFixable: false
          });
        }

        // Check for images without loading optimization
        if (!img.loading) {
          issues.push({
            id: `perf-img-loading-${index}`,
            category: 'performance',
            severity: 'low',
            title: 'Image Missing Loading Optimization',
            description: `Image at ${img.src} could benefit from lazy loading`,
            fixSuggestion: 'Add loading="lazy" attribute to improve performance',
            autoFixable: true
          });
        }

        // Check for large images
        if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
          issues.push({
            id: `perf-img-size-${index}`,
            category: 'performance',
            severity: 'medium',
            title: 'Large Image Detected',
            description: `Image at ${img.src} is very large (${img.naturalWidth}x${img.naturalHeight})`,
            fixSuggestion: 'Optimize image size and consider using responsive images',
            autoFixable: false
          });
        }
      });
    } catch (error) {
      issues.push({
        id: 'perf-audit-error',
        category: 'performance',
        severity: 'low',
        title: 'Performance Audit Error',
        description: 'Unable to complete performance audit',
        fixSuggestion: 'Check browser compatibility and console errors'
      });
    }
  }

  // Check for unused CSS (simplified check)
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  if (stylesheets.length > 5) {
    issues.push({
      id: 'perf-css-count',
      category: 'performance',
      severity: 'low',
      title: 'Multiple CSS Files',
      description: `Found ${stylesheets.length} CSS files which may impact loading`,
      fixSuggestion: 'Consider bundling CSS files to reduce HTTP requests'
    });
  }

  // Check for JavaScript errors in console
  const originalConsoleError = console.error;
  let jsErrors = 0;
  console.error = (...args) => {
    jsErrors++;
    originalConsoleError.apply(console, args);
  };

  if (jsErrors > 0) {
    issues.push({
      id: 'perf-js-errors',
      category: 'performance',
      severity: 'high',
      title: 'JavaScript Errors Detected',
      description: `Found ${jsErrors} JavaScript errors in console`,
      fixSuggestion: 'Review and fix JavaScript errors to improve user experience'
    });
  }

  return issues;
}

export function auditCoreWebVitals(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // This would typically integrate with tools like Lighthouse or PageSpeed Insights
  // For now, we'll provide basic checks
  
  if ('PerformanceObserver' in window) {
    try {
      // Check for potential LCP issues
      const largeElements = document.querySelectorAll('img, video, div');
      let largestElement = null;
      let largestSize = 0;

      largeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const size = rect.width * rect.height;
        if (size > largestSize) {
          largestSize = size;
          largestElement = element;
        }
      });

      if (largestElement && largestElement.tagName === 'IMG') {
        const img = largestElement as HTMLImageElement;
        if (!img.loading || img.loading !== 'eager') {
          issues.push({
            id: 'cwv-lcp-img',
            category: 'performance',
            severity: 'medium',
            title: 'LCP Image Not Optimized',
            description: 'Largest Contentful Paint element should be eagerly loaded',
            fixSuggestion: 'Add loading="eager" to the largest above-fold image'
          });
        }
      }
    } catch (error) {
      // Silently handle errors in performance measurement
    }
  }

  return issues;
}
