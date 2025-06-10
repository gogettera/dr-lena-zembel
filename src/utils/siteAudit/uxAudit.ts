
import { AuditIssue } from './types';

export function auditUXPatterns(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // Check for loading states
  const buttons = document.querySelectorAll('button');
  let hasLoadingStates = false;
  
  buttons.forEach(button => {
    if (button.disabled || button.getAttribute('aria-busy') === 'true') {
      hasLoadingStates = true;
    }
  });

  if (!hasLoadingStates && buttons.length > 0) {
    issues.push({
      id: 'ux-loading-states',
      category: 'ux',
      severity: 'medium',
      title: 'Missing Loading States',
      description: 'Interactive elements should show loading states during async operations',
      fixSuggestion: 'Add loading indicators and disabled states to buttons during async operations'
    });
  }

  // Check for error boundaries
  const hasErrorBoundary = document.querySelector('[data-error-boundary]');
  if (!hasErrorBoundary) {
    issues.push({
      id: 'ux-error-boundary',
      category: 'ux',
      severity: 'medium',
      title: 'Missing Error Boundaries',
      description: 'Application should implement error boundaries for graceful error handling',
      fixSuggestion: 'Wrap components with ErrorBoundary components to catch and display errors gracefully'
    });
  }

  // Check for responsive images
  const images = document.querySelectorAll('img');
  let responsiveImageCount = 0;
  
  images.forEach(img => {
    if (img.srcset || img.sizes) {
      responsiveImageCount++;
    }
  });

  if (images.length > 0 && responsiveImageCount / images.length < 0.5) {
    issues.push({
      id: 'ux-responsive-images',
      category: 'ux',
      severity: 'medium',
      title: 'Limited Responsive Images',
      description: `${Math.round((responsiveImageCount / images.length) * 100)}% of images are responsive`,
      fixSuggestion: 'Use responsive images with srcset and sizes attributes for better performance'
    });
  }

  // Check for form validation
  const forms = document.querySelectorAll('form');
  let hasValidation = false;
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      if (input.hasAttribute('required') || input.hasAttribute('pattern')) {
        hasValidation = true;
      }
    });
  });

  if (forms.length > 0 && !hasValidation) {
    issues.push({
      id: 'ux-form-validation',
      category: 'ux',
      severity: 'medium',
      title: 'Missing Form Validation',
      description: 'Forms should include proper validation attributes',
      fixSuggestion: 'Add required, pattern, and other validation attributes to form inputs'
    });
  }

  // Check for skip links
  const skipLink = document.querySelector('a[href="#main-content"], a[href="#content"]');
  if (!skipLink) {
    issues.push({
      id: 'ux-skip-link',
      category: 'ux',
      severity: 'low',
      title: 'Missing Skip Link',
      description: 'Page should include a skip link for keyboard navigation',
      fixSuggestion: 'Add a "Skip to main content" link at the beginning of the page'
    });
  }

  // Check for mobile-friendly touch targets
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
  let smallTargets = 0;
  
  interactiveElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
      smallTargets++;
    }
  });

  if (smallTargets > 0) {
    issues.push({
      id: 'ux-touch-targets',
      category: 'ux',
      severity: 'medium',
      title: 'Small Touch Targets',
      description: `${smallTargets} interactive elements are smaller than 44px (recommended minimum)`,
      fixSuggestion: 'Ensure interactive elements are at least 44x44px for mobile usability'
    });
  }

  return issues;
}

export function auditContentQuality(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // Check for placeholder text
  const placeholderText = document.body.innerText.toLowerCase();
  const placeholders = ['lorem ipsum', 'placeholder', 'todo', 'coming soon', 'under construction'];
  
  placeholders.forEach(placeholder => {
    if (placeholderText.includes(placeholder)) {
      issues.push({
        id: `content-placeholder-${placeholder.replace(' ', '-')}`,
        category: 'content',
        severity: 'high',
        title: 'Placeholder Content Detected',
        description: `Found placeholder text: "${placeholder}"`,
        fixSuggestion: 'Replace placeholder content with actual content'
      });
    }
  });

  // Check for broken links (simplified check)
  const links = document.querySelectorAll('a[href]');
  let suspiciousLinks = 0;
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#' || href === '' || href === 'javascript:void(0)') {
      suspiciousLinks++;
    }
  });

  if (suspiciousLinks > 0) {
    issues.push({
      id: 'content-empty-links',
      category: 'content',
      severity: 'medium',
      title: 'Empty or Placeholder Links',
      description: `Found ${suspiciousLinks} links with empty or placeholder hrefs`,
      fixSuggestion: 'Update links to point to actual destinations or remove them'
    });
  }

  // Check for very long paragraphs
  const paragraphs = document.querySelectorAll('p');
  let longParagraphs = 0;
  
  paragraphs.forEach(p => {
    if (p.textContent && p.textContent.length > 500) {
      longParagraphs++;
    }
  });

  if (longParagraphs > 0) {
    issues.push({
      id: 'content-long-paragraphs',
      category: 'content',
      severity: 'low',
      title: 'Long Paragraphs Detected',
      description: `Found ${longParagraphs} paragraphs longer than 500 characters`,
      fixSuggestion: 'Break long paragraphs into shorter, more readable chunks'
    });
  }

  return issues;
}
