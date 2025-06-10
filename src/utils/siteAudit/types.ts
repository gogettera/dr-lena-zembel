
export type AuditSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AuditCategory = 'api' | 'translation' | 'performance' | 'security' | 'accessibility' | 'seo' | 'content' | 'ux';

export interface AuditIssue {
  id: string;
  category: AuditCategory;
  severity: AuditSeverity;
  title: string;
  description: string;
  file?: string;
  line?: number;
  fixSuggestion?: string;
  autoFixable?: boolean;
}

export interface AuditReport {
  timestamp: string;
  executionTime: number;
  totalIssues: number;
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lowIssues: number;
  issuesByCategory: Record<AuditCategory, AuditIssue[]>;
  overallScore: number; // 0-100
  recommendations: string[];
  categories: AuditCategory[];
  issues: AuditIssue[];
}

export interface AuditOptions {
  enabledCategories?: AuditCategory[];
  skipAutoFixable?: boolean;
  performanceThresholds?: {
    lcp?: number;
    fid?: number;
    cls?: number;
  };
}

export interface AuditConfig {
  enabledCategories: AuditCategory[];
  skipAutoFixable?: boolean;
  performanceThresholds?: {
    lcp?: number;
    fid?: number;
    cls?: number;
  };
}
