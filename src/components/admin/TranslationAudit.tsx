
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { auditTranslationKeys, generateTranslationReport } from '@/utils/translationAudit';
import TranslationAuditHeader from './translation-audit/TranslationAuditHeader';
import TranslationAuditSummary from './translation-audit/TranslationAuditSummary';
import TranslationAuditLanguageProgress from './translation-audit/TranslationAuditLanguageProgress';
import TranslationAuditTabs from './translation-audit/TranslationAuditTabs';

const TranslationAudit: React.FC = () => {
  const [auditData, setAuditData] = useState(auditTranslationKeys());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const refreshAudit = async () => {
    setIsRefreshing(true);
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAuditData(auditTranslationKeys());
      toast({
        title: "Audit Refreshed",
        description: "Translation audit has been updated with the latest data.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh audit data.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const downloadReport = () => {
    const report = generateTranslationReport();
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translation-audit-report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <TranslationAuditHeader
        onRefresh={refreshAudit}
        onDownloadReport={downloadReport}
        isRefreshing={isRefreshing}
      />

      <TranslationAuditSummary auditData={auditData} />

      <TranslationAuditLanguageProgress auditData={auditData} />

      <TranslationAuditTabs auditData={auditData} />
    </div>
  );
};

export default TranslationAudit;
