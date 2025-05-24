
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TreatmentAudit {
  treatment: string;
  audit: {
    missingKeys: Array<{
      key: string;
      priority: string;
      missingInLanguages: string[];
    }>;
  };
}

interface TranslationAuditCriticalKeysProps {
  allAudits: TreatmentAudit[];
}

const TranslationAuditCriticalKeys: React.FC<TranslationAuditCriticalKeysProps> = ({ allAudits }) => {
  const languageColors: Record<string, string> = {
    he: 'bg-blue-100 text-blue-800',
    en: 'bg-green-100 text-green-800',
    ru: 'bg-red-100 text-red-800',
    de: 'bg-yellow-100 text-yellow-800',
    ar: 'bg-purple-100 text-purple-800'
  };

  const criticalKeys = allAudits.flatMap(({ treatment, audit }) => 
    audit.missingKeys
      .filter(key => key.priority === 'high')
      .map(key => ({ ...key, treatment }))
  ).slice(0, 20);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-700">Critical Missing Keys (All Treatments)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {criticalKeys.map((key, index) => (
            <div key={`${key.treatment}-${key.key}`} className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">{key.treatment}</Badge>
                  <code className="text-sm bg-white px-2 py-1 rounded block">{key.key}</code>
                </div>
                <div className="flex gap-1">
                  {key.missingInLanguages.map(lang => (
                    <Badge key={lang} className={languageColors[lang]} variant="secondary" size="sm">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationAuditCriticalKeys;
