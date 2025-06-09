
import { AuditIssue } from './types';

export function auditAccessibility(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // Check for missing alt text on images
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.alt || img.alt.trim() === '') {
      issues.push({
        id: `a11y-img-alt-${index}`,
        category: 'accessibility',
        severity: 'high',
        title: 'Image Missing Alt Text',
        description: `Image at ${img.src} is missing descriptive alt text`,
        fixSuggestion: 'Add meaningful alt text describing the image content',
        autoFixable: false
      });
    }
  });

  // Check for form inputs without labels
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach((input, index) => {
    const id = input.id;
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);
    const hasAriaLabel = input.getAttribute('aria-label');
    const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
    
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push({
        id: `a11y-input-label-${index}`,
        category: 'accessibility',
        severity: 'high',
        title: 'Form Input Missing Label',
        description: 'Form input has no associated label for screen readers',
        fixSuggestion: 'Add a label element or aria-label attribute',
        autoFixable: false
      });
    }
  });

  // Check for heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  headings.forEach((heading, index) => {
    const currentLevel = parseInt(heading.tagName.charAt(1));
    
    if (index === 0 && currentLevel !== 1) {
      issues.push({
        id: 'a11y-h1-first',
        category: 'accessibility',
        severity: 'medium',
        title: 'Page Should Start with H1',
        description: 'Page does not start with an H1 heading',
        fixSuggestion: 'Ensure the first heading on the page is an H1'
      });
    }
    
    if (currentLevel > previousLevel + 1 && previousLevel !== 0) {
      issues.push({
        id: `a11y-heading-skip-${index}`,
        category: 'accessibility',
        severity: 'medium',
        title: 'Heading Level Skipped',
        description: `Heading jumps from H${previousLevel} to H${currentLevel}`,
        fixSuggestion: 'Use heading levels in sequential order'
      });
    }
    
    previousLevel = currentLevel;
  });

  // Check for color contrast (basic check)
  const buttons = document.querySelectorAll('button, a');
  buttons.forEach((button, index) => {
    const styles = window.getComputedStyle(button);
    const bgColor = styles.backgroundColor;
    const textColor = styles.color;
    
    // This is a simplified check - in a real audit, you'd use a proper contrast calculation
    if (bgColor === 'rgb(255, 255, 255)' && textColor === 'rgb(255, 255, 255)') {
      issues.push({
        id: `a11y-contrast-${index}`,
        category: 'accessibility',
        severity: 'high',
        title: 'Poor Color Contrast',
        description: 'Button or link may have insufficient color contrast',
        fixSuggestion: 'Ensure text and background colors meet WCAG contrast requirements'
      });
    }
  });

  // Check for focus indicators
  const focusableElements = document.querySelectorAll('button, a, input, textarea, select, [tabindex]');
  const hasFocusStyles = Array.from(document.styleSheets).some(sheet => {
    try {
      return Array.from(sheet.cssRules).some(rule => 
        rule.cssText && rule.cssText.includes(':focus')
      );
    } catch (e) {
      return false; // Can't access external stylesheets
    }
  });

  if (!hasFocusStyles && focusableElements.length > 0) {
    issues.push({
      id: 'a11y-focus-styles',
      category: 'accessibility',
      severity: 'medium',
      title: 'Missing Focus Indicators',
      description: 'Interactive elements may lack visible focus indicators',
      fixSuggestion: 'Add CSS focus styles for keyboard navigation',
      autoFixable: false
    });
  }

  // Check for ARIA roles and landmarks
  const main = document.querySelector('main, [role="main"]');
  if (!main) {
    issues.push({
      id: 'a11y-main-landmark',
      category: 'accessibility',
      severity: 'medium',
      title: 'Missing Main Landmark',
      description: 'Page lacks a main landmark for screen readers',
      fixSuggestion: 'Add a <main> element or role="main" to identify the main content area'
    });
  }

  const nav = document.querySelector('nav, [role="navigation"]');
  if (!nav) {
    issues.push({
      id: 'a11y-nav-landmark',
      category: 'accessibility',
      severity: 'low',
      title: 'Missing Navigation Landmark',
      description: 'Page lacks a navigation landmark',
      fixSuggestion: 'Add a <nav> element or role="navigation" to identify navigation areas'
    });
  }

  return issues;
}
