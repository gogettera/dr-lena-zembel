
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { TranslationAuditReport } from '@/utils/translationAudit';

interface TranslationAuditSummaryProps {
  auditData: TranslationAuditReport;
}

const TranslationAuditSummary: React.FC<TranslationAuditSummaryProps> = ({ auditData }) => {
  const overallCompletion = Math.round(
    ((auditData.totalKeysChecked - auditData.missingKeys.length) / auditData.totalKeysChecked) * 100
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overall Completion</p>
              <p className="text-2xl font-bold text-gray-900">{overallCompletion}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Missing Keys</p>
              <p className="text-2xl font-bold text-gray-900">{auditData.missingKeys.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Keys</p>
              <p className="text-2xl font-bold text-gray-900">{auditData.totalKeysChecked}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">
                {auditData.missingKeys.filter(k => k.priority === 'high').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranslationAuditSummary;
