
import { AuditIssue } from './types';

export function auditContent(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // Check for broken links
  const links = document.querySelectorAll('a[href]');
  links.forEach((link, index) => {
    const href = link.getAttribute('href');
    if (href) {
      // Check for empty href
      if (href.trim() === '' || href === '#') {
        issues.push({
          id: `content-empty-link-${index}`,
          category: 'content',
          severity: 'medium',
          title: 'Empty or Placeholder Link',
          description: 'Link has empty or placeholder href attribute',
          fixSuggestion: 'Provide a meaningful destination for the link or remove it'
        });
      }
      
      // Check for javascript: links (potential security issue)
      if (href.toLowerCase().startsWith('javascript:')) {
        issues.push({
          id: `content-js-link-${index}`,
          category: 'security',
          severity: 'medium',
          title: 'JavaScript Link Detected',
          description: 'Link uses javascript: protocol which can be a security risk',
          fixSuggestion: 'Replace with proper event handlers or standard links'
        });
      }
    }
  });

  // Check for images without proper sources
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.src || img.src.includes('placeholder') || img.src.includes('example')) {
      issues.push({
        id: `content-placeholder-img-${index}`,
        category: 'content',
        severity: 'medium',
        title: 'Placeholder Image Detected',
        description: 'Image appears to be a placeholder and should be replaced',
        fixSuggestion: 'Replace with actual content image'
      });
    }
  });

  // Check for Lorem Ipsum or placeholder text
  const textNodes = getTextNodes(document.body);
  textNodes.forEach((node, index) => {
    const text = node.textContent?.toLowerCase() || '';
    if (text.includes('lorem ipsum') || 
        text.includes('placeholder') || 
        text.includes('coming soon') ||
        text.includes('todo') ||
        text.includes('tbd')) {
      issues.push({
        id: `content-placeholder-text-${index}`,
        category: 'content',
        severity: 'medium',
        title: 'Placeholder Text Detected',
        description: 'Placeholder text found that should be replaced with actual content',
        fixSuggestion: 'Replace placeholder text with real content'
      });
    }
  });

  // Check for very short content
  const mainContent = document.querySelector('main, .main-content, #main-content');
  if (mainContent) {
    const textLength = mainContent.textContent?.length || 0;
    if (textLength < 200) {
      issues.push({
        id: 'content-too-short',
        category: 'content',
        severity: 'medium',
        title: 'Insufficient Content',
        description: `Main content is only ${textLength} characters (recommended: 300+)`,
        fixSuggestion: 'Add more descriptive and valuable content to the page'
      });
    }
  }

  // Check for missing contact information
  const hasPhone = document.body.textContent?.includes('+') || 
                   document.body.textContent?.includes('phone') ||
                   document.querySelector('a[href^="tel:"]');
  const hasEmail = document.querySelector('a[href^="mailto:"]') ||
                   document.body.textContent?.includes('@');

  if (!hasPhone && !hasEmail) {
    issues.push({
      id: 'content-no-contact',
      category: 'content',
      severity: 'high',
      title: 'Missing Contact Information',
      description: 'Page lacks visible contact information (phone or email)',
      fixSuggestion: 'Add contact information to improve user trust and accessibility'
    });
  }

  return issues;
}

function getTextNodes(element: Element): Text[] {
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT
  );

  let node;
  while (node = walker.nextNode()) {
    if (node.textContent && node.textContent.trim().length > 10) {
      textNodes.push(node as Text);
    }
  }

  return textNodes;
}
