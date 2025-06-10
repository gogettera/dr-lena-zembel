import { AuditIssue, AuditOptions, AuditReport, AuditCategory } from './types';
import { runTranslationAudit } from './translationAudit';
import { auditAPIEndpoints, auditDatabaseHealth } from './apiAudit';
import { auditPerformance, auditCoreWebVitals } from './performanceAudit';
import { auditAccessibility } from './accessibilityAudit';
import { auditSEO } from './seoAudit';
import { auditConsoleUsage, auditErrorHandling } from './consoleAudit';
import { auditUXPatterns, auditContentQuality } from './uxAudit';

export async function runComprehensiveAudit(options: AuditOptions = {}): Promise<AuditReport> {
  const startTime = performance.now();
  const issues: AuditIssue[] = [];
  
  const enabledCategories = options.enabledCategories || [
    'translation', 'api', 'seo', 'accessibility', 'performance', 'security', 'content', 'ux'
  ];

  try {
    // Translation audit
    if (enabledCategories.includes('translation')) {
      const translationIssues = await runTranslationAudit();
      issues.push(...translationIssues);
    }

    // API and Database health audit
    if (enabledCategories.includes('api')) {
      const apiIssues = await auditAPIEndpoints();
      const dbIssues = await auditDatabaseHealth();
      issues.push(...apiIssues, ...dbIssues);
    }

    // Performance audit
    if (enabledCategories.includes('performance')) {
      const performanceIssues = auditPerformance();
      const webVitalsIssues = auditCoreWebVitals();
      issues.push(...performanceIssues, ...webVitalsIssues);
    }

    // Accessibility audit
    if (enabledCategories.includes('accessibility')) {
      const a11yIssues = auditAccessibility();
      issues.push(...a11yIssues);
    }

    // SEO audit
    if (enabledCategories.includes('seo')) {
      const seoIssues = auditSEO();
      issues.push(...seoIssues);
    }

    // Content audit
    if (enabledCategories.includes('content')) {
      const consoleIssues = auditConsoleUsage();
      const contentIssues = auditContentQuality();
      issues.push(...consoleIssues, ...contentIssues);
    }

    // UX audit
    if (enabledCategories.includes('ux')) {
      const uxIssues = auditUXPatterns();
      const errorHandlingIssues = auditErrorHandling();
      issues.push(...uxIssues, ...errorHandlingIssues);
    }

    // Security audit (basic checks)
    if (enabledCategories.includes('security')) {
      // Basic security checks from SEO audit
      const securityIssues = auditSEO().filter(issue => issue.category === 'security');
      issues.push(...securityIssues);
    }

  } catch (error) {
    issues.push({
      id: 'audit-system-error',
      category: 'api',
      severity: 'critical',
      title: 'Audit System Error',
      description: `Failed to complete audit: ${error instanceof Error ? error.message : 'Unknown error'}`,
      fixSuggestion: 'Check system configuration and try again'
    });
  }

  const endTime = performance.now();
  const executionTime = Math.round(endTime - startTime);

  // Calculate metrics
  const criticalIssues = issues.filter(issue => issue.severity === 'critical').length;
  const highIssues = issues.filter(issue => issue.severity === 'high').length;
  const mediumIssues = issues.filter(issue => issue.severity === 'medium').length;
  const lowIssues = issues.filter(issue => issue.severity === 'low').length;

  // Calculate overall score (0-100)
  const totalIssues = issues.length;
  const weightedScore = Math.max(0, 100 - (criticalIssues * 25 + highIssues * 10 + mediumIssues * 5 + lowIssues * 1));
  const overallScore = totalIssues === 0 ? 100 : Math.round(weightedScore);

  // Group issues by category
  const issuesByCategory: Record<AuditCategory, AuditIssue[]> = {
    api: [],
    translation: [],
    performance: [],
    security: [],
    accessibility: [],
    seo: [],
    content: [],
    ux: []
  };

  issues.forEach(issue => {
    issuesByCategory[issue.category].push(issue);
  });

  // Generate recommendations
  const recommendations: string[] = [];
  if (criticalIssues > 0) {
    recommendations.push(`Address ${criticalIssues} critical issues immediately`);
  }
  if (highIssues > 0) {
    recommendations.push(`Fix ${highIssues} high priority issues this week`);
  }
  if (overallScore < 70) {
    recommendations.push('Overall site health needs improvement');
  }

  return {
    timestamp: new Date().toISOString(),
    executionTime,
    totalIssues,
    criticalIssues,
    highIssues,
    mediumIssues,
    lowIssues,
    overallScore,
    issues,
    issuesByCategory,
    categories: enabledCategories,
    recommendations
  };
}

export function generateAuditReport(report: AuditReport): string {
  let markdown = `# Site Audit Report\n\n`;
  markdown += `**Generated:** ${report.timestamp}\n`;
  markdown += `**Execution Time:** ${report.executionTime}ms\n`;
  markdown += `**Overall Score:** ${report.overallScore}/100\n\n`;
  
  markdown += `## Summary\n`;
  markdown += `- **Total Issues:** ${report.totalIssues}\n`;
  markdown += `- **Critical:** ${report.criticalIssues}\n`;
  markdown += `- **High:** ${report.highIssues}\n`;
  markdown += `- **Medium:** ${report.mediumIssues}\n`;
  markdown += `- **Low:** ${report.lowIssues}\n\n`;

  if (report.recommendations.length > 0) {
    markdown += `## Recommendations\n`;
    report.recommendations.forEach(rec => {
      markdown += `- ${rec}\n`;
    });
    markdown += `\n`;
  }

  markdown += `## Issues by Category\n`;
  Object.entries(report.issuesByCategory).forEach(([category, issues]) => {
    if (issues.length > 0) {
      markdown += `\n### ${category.charAt(0).toUpperCase() + category.slice(1)} (${issues.length})\n`;
      issues.forEach(issue => {
        markdown += `\n**${issue.title}** (${issue.severity})\n`;
        markdown += `${issue.description}\n`;
        if (issue.fixSuggestion) {
          markdown += `*Fix:* ${issue.fixSuggestion}\n`;
        }
      });
    }
  });

  return markdown;
}
