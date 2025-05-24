
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TranslationAuditReport } from '@/utils/translationAudit';

interface TranslationAuditLanguageProgressProps {
  auditData: TranslationAuditReport;
}

const TranslationAuditLanguageProgress: React.FC<TranslationAuditLanguageProgressProps> = ({ auditData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Translation Completion by Language</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(auditData.completionByLanguage).map(([language, percentage]) => (
            <div key={language} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
                <span className="text-sm text-gray-600">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationAuditLanguageProgress;
