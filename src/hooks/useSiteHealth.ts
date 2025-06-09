
import { useState, useEffect } from 'react';
import { runComprehensiveAudit } from '@/utils/siteAudit/core';
import { AuditReport } from '@/utils/siteAudit/types';

export function useSiteHealth() {
  const [report, setReport] = useState<AuditReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const runHealthCheck = async () => {
    setIsLoading(true);
    try {
      const auditReport = await runComprehensiveAudit({
        enabledCategories: ['api', 'translation', 'security']
      });
      setReport(auditReport);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Health check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getHealthStatus = (): 'healthy' | 'warning' | 'critical' => {
    if (!report) return 'warning';
    
    if (report.criticalIssues > 0) return 'critical';
    if (report.highIssues > 3 || report.overallScore < 70) return 'warning';
    return 'healthy';
  };

  useEffect(() => {
    // Run initial health check
    runHealthCheck();
    
    // Set up periodic health checks (every 30 minutes)
    const interval = setInterval(runHealthCheck, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    report,
    isLoading,
    lastUpdated,
    runHealthCheck,
    healthStatus: getHealthStatus()
  };
}
