
import { AuditIssue } from './types';

export function auditSecurity(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // Check for HTTPS
  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
    issues.push({
      id: 'security-https',
      category: 'security',
      severity: 'critical',
      title: 'Site Not Using HTTPS',
      description: 'Site is not served over HTTPS, which is required for security',
      fixSuggestion: 'Configure SSL certificate and redirect HTTP to HTTPS'
    });
  }

  // Check for inline scripts (potential XSS risk)
  const inlineScripts = document.querySelectorAll('script:not([src])');
  if (inlineScripts.length > 0) {
    issues.push({
      id: 'security-inline-scripts',
      category: 'security',
      severity: 'medium',
      title: 'Inline Scripts Detected',
      description: `Found ${inlineScripts.length} inline script(s) which may pose XSS risks`,
      fixSuggestion: 'Move scripts to external files and implement Content Security Policy'
    });
  }

  // Check for external scripts from untrusted domains
  const externalScripts = document.querySelectorAll('script[src]');
  const untrustedDomains = ['eval.js', 'malicious.com']; // Example - extend as needed
  
  externalScripts.forEach((script, index) => {
    const src = script.getAttribute('src');
    if (src && untrustedDomains.some(domain => src.includes(domain))) {
      issues.push({
        id: `security-untrusted-script-${index}`,
        category: 'security',
        severity: 'high',
        title: 'Untrusted External Script',
        description: `Script loaded from potentially untrusted source: ${src}`,
        fixSuggestion: 'Remove untrusted scripts or verify their safety'
      });
    }
  });

  // Check for forms without CSRF protection indicators
  const forms = document.querySelectorAll('form');
  forms.forEach((form, index) => {
    const method = form.getAttribute('method')?.toLowerCase();
    if (method === 'post') {
      const hasCSRFToken = form.querySelector('input[name*="csrf"], input[name*="token"]');
      if (!hasCSRFToken) {
        issues.push({
          id: `security-csrf-${index}`,
          category: 'security',
          severity: 'medium',
          title: 'Form Missing CSRF Protection',
          description: 'POST form may lack CSRF protection',
          fixSuggestion: 'Implement CSRF tokens for form submissions'
        });
      }
    }
  });

  // Check for password inputs without proper attributes
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  passwordInputs.forEach((input, index) => {
    const autocomplete = input.getAttribute('autocomplete');
    if (!autocomplete || (!autocomplete.includes('current-password') && !autocomplete.includes('new-password'))) {
      issues.push({
        id: `security-password-autocomplete-${index}`,
        category: 'security',
        severity: 'low',
        title: 'Password Input Missing Autocomplete',
        description: 'Password input lacks proper autocomplete attribute',
        fixSuggestion: 'Add autocomplete="current-password" or "new-password" as appropriate'
      });
    }
  });

  // Check for sensitive data exposure in HTML
  const htmlContent = document.documentElement.outerHTML.toLowerCase();
  const sensitivePatterns = [
    /api[_-]?key[s]?\s*[:=]\s*['"][^'"]+['"]/gi,
    /secret[s]?\s*[:=]\s*['"][^'"]+['"]/gi,
    /password[s]?\s*[:=]\s*['"][^'"]+['"]/gi,
    /token[s]?\s*[:=]\s*['"][^'"]+['"]/gi
  ];

  sensitivePatterns.forEach((pattern, index) => {
    if (pattern.test(htmlContent)) {
      issues.push({
        id: `security-exposed-data-${index}`,
        category: 'security',
        severity: 'critical',
        title: 'Sensitive Data Exposed in HTML',
        description: 'Potential API keys, secrets, or passwords found in HTML source',
        fixSuggestion: 'Remove sensitive data from client-side code and use environment variables'
      });
    }
  });

  // Check for Content Security Policy
  const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  const cspHeader = ''; // Would need server-side check for actual CSP headers
  
  if (!cspMeta && !cspHeader) {
    issues.push({
      id: 'security-no-csp',
      category: 'security',
      severity: 'medium',
      title: 'Missing Content Security Policy',
      description: 'Site lacks Content Security Policy for XSS protection',
      fixSuggestion: 'Implement Content Security Policy headers or meta tags'
    });
  }

  return issues;
}
