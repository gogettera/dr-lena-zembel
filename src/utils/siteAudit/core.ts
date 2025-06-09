
import { AuditReport, AuditConfig, AuditIssue, AuditCategory } from './types';
import { auditAPIEndpoints, auditDatabaseHealth } from './apiAudit';
import { auditTranslations } from './translationAudit';
import { auditPerformance, auditCoreWebVitals } from './performanceAudit';
import { auditSecurity } from './securityAudit';
import { auditAccessibility } from './accessibilityAudit';
import { auditSEO } from './seoAudit';
import { auditContent } from './contentAudit';

const DEFAULT_CONFIG: AuditConfig = {
  enabledCategories: ['api', 'translation', 'performance', 'security', 'accessibility', 'seo', 'content'],
  skipAutoFixable: false,
  performanceThresholds: {
    lcp: 2.5,
    fid: 100,
    cls: 0.1
  }
};

export async function runComprehensiveAudit(config: Partial<AuditConfig> = {}): Promise<AuditReport> {
  const auditConfig = { ...DEFAULT_CONFIG, ...config };
  const allIssues: AuditIssue[] = [];

  console.log('🔍 Starting comprehensive site audit...');

  // Run audits based on enabled categories
  if (auditConfig.enabledCategories.includes('api')) {
    console.log('📡 Auditing API endpoints...');
    try {
      const apiIssues = await auditAPIEndpoints();
      const dbIssues = await auditDatabaseHealth();
      allIssues.push(...apiIssues, ...dbIssues);
    } catch (error) {
      console.error('API audit failed:', error);
      allIssues.push({
        id: 'audit-api-failed',
        category: 'api',
        severity: 'high',
        title: 'API Audit Failed',
        description: 'Unable to complete API audit',
        fixSuggestion: 'Check network connectivity and Supabase configuration'
      });
    }
  }

  if (auditConfig.enabledCategories.includes('translation')) {
    console.log('🌐 Auditing translations...');
    try {
      const translationIssues = auditTranslations();
      allIssues.push(...translationIssues);
    } catch (error) {
      console.error('Translation audit failed:', error);
      allIssues.push({
        id: 'audit-translation-failed',
        category: 'translation',
        severity: 'medium',
        title: 'Translation Audit Failed',
        description: 'Unable to complete translation audit',
        fixSuggestion: 'Check translation file structure and imports'
      });
    }
  }

  if (auditConfig.enabledCategories.includes('performance')) {
    console.log('⚡ Auditing performance...');
    try {
      const perfIssues = auditPerformance();
      const cwvIssues = auditCoreWebVitals();
      allIssues.push(...perfIssues, ...cwvIssues);
    } catch (error) {
      console.error('Performance audit failed:', error);
    }
  }

  if (auditConfig.enabledCategories.includes('security')) {
    console.log('🔒 Auditing security...');
    try {
      const securityIssues = auditSecurity();
      allIssues.push(...securityIssues);
    } catch (error) {
      console.error('Security audit failed:', error);
    }
  }

  if (auditConfig.enabledCategories.includes('accessibility')) {
    console.log('♿ Auditing accessibility...');
    try {
      const a11yIssues = auditAccessibility();
      allIssues.push(...a11yIssues);
    } catch (error) {
      console.error('Accessibility audit failed:', error);
    }
  }

  if (auditConfig.enabledCategories.includes('seo')) {
    console.log('🔍 Auditing SEO...');
    try {
      const seoIssues = auditSEO();
      allIssues.push(...seoIssues);
    } catch (error) {
      console.error('SEO audit failed:', error);
    }
  }

  if (auditConfig.enabledCategories.includes('content')) {
    console.log('📝 Auditing content...');
    try {
      const contentIssues = auditContent();
      allIssues.push(...contentIssues);
    } catch (error) {
      console.error('Content audit failed:', error);
    }
  }

  // Filter out auto-fixable issues if requested
  const filteredIssues = auditConfig.skipAutoFixable 
    ? allIssues.filter(issue => !issue.autoFixable)
    : allIssues;

  // Categorize issues
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

  filteredIssues.forEach(issue => {
    issuesByCategory[issue.category].push(issue);
  });

  // Count issues by severity
  const criticalIssues = filteredIssues.filter(i => i.severity === 'critical').length;
  const highIssues = filteredIssues.filter(i => i.severity === 'high').length;
  const mediumIssues = filteredIssues.filter(i => i.severity === 'medium').length;
  const lowIssues = filteredIssues.filter(i => i.severity === 'low').length;

  // Calculate overall score (0-100)
  const totalIssues = filteredIssues.length;
  const weightedScore = totalIssues === 0 ? 100 : Math.max(0, 100 - (
    (criticalIssues * 25) + 
    (highIssues * 15) + 
    (mediumIssues * 8) + 
    (lowIssues * 3)
  ));

  // Generate recommendations
  const recommendations = generateRecommendations(issuesByCategory, criticalIssues, highIssues);

  const report: AuditReport = {
    timestamp: new Date().toISOString(),
    totalIssues: totalIssues,
    criticalIssues,
    highIssues,
    mediumIssues,
    lowIssues,
    issuesByCategory,
    overallScore: Math.round(weightedScore),
    recommendations
  };

  console.log(`✅ Audit complete! Found ${totalIssues} issues. Overall score: ${report.overallScore}/100`);
  
  return report;
}

function generateRecommendations(
  issuesByCategory: Record<AuditCategory, AuditIssue[]>,
  criticalIssues: number,
  highIssues: number
): string[] {
  const recommendations: string[] = [];

  if (criticalIssues > 0) {
    recommendations.push('🚨 Address critical security and functionality issues immediately');
  }

  if (highIssues > 0) {
    recommendations.push('⚠️ Fix high-priority issues that affect user experience and SEO');
  }

  // Category-specific recommendations
  if (issuesByCategory.api.length > 0) {
    recommendations.push('📡 Review API integrations and database connectivity');
  }

  if (issuesByCategory.translation.length > 0) {
    recommendations.push('🌐 Complete missing translations for better internationalization');
  }

  if (issuesByCategory.accessibility.length > 0) {
    recommendations.push('♿ Improve accessibility to reach a wider audience and meet compliance requirements');
  }

  if (issuesByCategory.performance.length > 0) {
    recommendations.push('⚡ Optimize performance for better user experience and search rankings');
  }

  if (issuesByCategory.seo.length > 0) {
    recommendations.push('🔍 Enhance SEO elements to improve search engine visibility');
  }

  if (recommendations.length === 0) {
    recommendations.push('🎉 Great job! Your site is in excellent condition. Consider regular audits to maintain quality.');
  }

  return recommendations;
}

export function generateAuditReport(report: AuditReport): string {
  let output = `# Site Audit Report\n\n`;
  output += `**Generated:** ${new Date(report.timestamp).toLocaleString()}\n`;
  output += `**Overall Score:** ${report.overallScore}/100\n\n`;

  // Summary
  output += `## Summary\n`;
  output += `- 🔴 Critical: ${report.criticalIssues}\n`;
  output += `- 🟠 High: ${report.highIssues}\n`;
  output += `- 🟡 Medium: ${report.mediumIssues}\n`;
  output += `- 🟢 Low: ${report.lowIssues}\n`;
  output += `- **Total Issues:** ${report.totalIssues}\n\n`;

  // Recommendations
  if (report.recommendations.length > 0) {
    output += `## Recommendations\n`;
    report.recommendations.forEach(rec => {
      output += `- ${rec}\n`;
    });
    output += '\n';
  }

  // Issues by category
  Object.entries(report.issuesByCategory).forEach(([category, issues]) => {
    if (issues.length > 0) {
      output += `## ${category.charAt(0).toUpperCase() + category.slice(1)} Issues (${issues.length})\n\n`;
      
      issues.forEach(issue => {
        const severityIcon = {
          critical: '🔴',
          high: '🟠',
          medium: '🟡',
          low: '🟢'
        }[issue.severity];
        
        output += `### ${severityIcon} ${issue.title}\n`;
        output += `**Severity:** ${issue.severity}\n`;
        output += `**Description:** ${issue.description}\n`;
        if (issue.fixSuggestion) {
          output += `**Fix:** ${issue.fixSuggestion}\n`;
        }
        if (issue.file) {
          output += `**File:** ${issue.file}${issue.line ? `:${issue.line}` : ''}\n`;
        }
        output += '\n';
      });
    }
  });

  return output;
}
