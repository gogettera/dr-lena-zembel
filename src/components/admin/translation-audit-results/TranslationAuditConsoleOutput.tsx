
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TreatmentAudit {
  treatment: string;
  audit: {
    missingKeys: { priority: string }[];
    totalKeysChecked: number;
  };
}

interface TranslationAuditConsoleOutputProps {
  allAudits: TreatmentAudit[];
}

const TranslationAuditConsoleOutput: React.FC<TranslationAuditConsoleOutputProps> = ({ allAudits }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Console Output</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-60">
          <div>🔍 TRANSLATION AUDIT RESULTS</div>
          <div>{'='}</div>
          <br />
          {allAudits.map(({ treatment, audit }) => (
            <div key={treatment}>
              <div>📄 {treatment.toUpperCase()}:</div>
              <div>   Missing: {audit.missingKeys.length}/{audit.totalKeysChecked}</div>
              <div>   Completion: {Math.round(((audit.totalKeysChecked - audit.missingKeys.length) / audit.totalKeysChecked) * 100)}%</div>
              <div>   High Priority: {audit.missingKeys.filter(k => k.priority === 'high').length}</div>
              <br />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationAuditConsoleOutput;
