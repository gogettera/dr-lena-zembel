
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TreatmentAudit {
  treatment: string;
  audit: {
    missingKeys: { priority: string }[];
    totalKeysChecked: number;
  };
}

interface TranslationAuditAllTreatmentsSummaryProps {
  allAudits: TreatmentAudit[];
}

const TranslationAuditAllTreatmentsSummary: React.FC<TranslationAuditAllTreatmentsSummaryProps> = ({
  allAudits
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Treatments Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allAudits.map(({ treatment, audit }) => {
            const completion = Math.round(((audit.totalKeysChecked - audit.missingKeys.length) / audit.totalKeysChecked) * 100);
            const statusColor = completion >= 90 ? 'text-green-600' : completion >= 70 ? 'text-yellow-600' : 'text-red-600';
            
            return (
              <div key={treatment} className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2 capitalize">{treatment.replace('-', ' ')}</h4>
                <div className={`text-2xl font-bold ${statusColor}`}>{completion}%</div>
                <div className="text-sm text-gray-600">
                  {audit.missingKeys.length} missing / {audit.totalKeysChecked} total
                </div>
                <div className="mt-2">
                  <Badge variant="destructive" size="sm">
                    {audit.missingKeys.filter(k => k.priority === 'high').length} high priority
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationAuditAllTreatmentsSummary;
