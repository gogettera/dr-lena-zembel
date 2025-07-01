
import { AuditIssue } from './types';

export function auditConsoleUsage(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // Check for console statements in production code
  const consolePatterns = [
    /console\.log\(/g,
    /console\.warn\(/g,
    /console\.error\(/g,
    /console\.debug\(/g,
    /console\.info\(/g
  ];

  // This is a simplified check - in a real scenario, you'd scan the actual source files
  const hasConsoleStatements = consolePatterns.some(pattern => 
    document.documentElement.innerHTML.match(pattern)
  );

  if (hasConsoleStatements) {
    issues.push({
      id: 'console-statements',
      category: 'content',
      severity: 'low',
      title: 'Console Statements in Production',
      description: 'Console statements found that should be removed in production',
      fixSuggestion: 'Remove or replace console statements with proper logging'
    });
  }

  return issues;
}

export function auditErrorHandling(): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // Check for error boundaries
  const hasErrorBoundary = document.querySelector('[data-error-boundary]') || 
                          document.querySelector('.error-boundary');
  
  if (!hasErrorBoundary) {
    issues.push({
      id: 'missing-error-boundary',
      category: 'ux',
      severity: 'medium',
      title: 'Missing Error Boundaries',
      description: 'Application lacks error boundaries for graceful error handling',
      fixSuggestion: 'Implement ErrorBoundary components to catch and handle React errors'
    });
  }

  // Check for loading states
  const loadingElements = document.querySelectorAll('[data-loading], .loading, .spinner');
  if (loadingElements.length === 0) {
    issues.push({
      id: 'missing-loading-states',
      category: 'ux',
      severity: 'low',
      title: 'Limited Loading States',
      description: 'Few loading indicators found for async operations',
      fixSuggestion: 'Add loading states for better user experience during data fetching'
    });
  }

  return issues;
}
