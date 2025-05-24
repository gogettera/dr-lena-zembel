
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { MissingTranslationKey } from '@/utils/translationAudit';

interface TranslationAuditTreatmentDetailProps {
  audit: {
    missingKeys: MissingTranslationKey[];
    totalKeysChecked: number;
    completionByLanguage: Record<string, number>;
  };
}

const TranslationAuditTreatmentDetail: React.FC<TranslationAuditTreatmentDetailProps> = ({ audit }) => {
  const languageColors: Record<string, string> = {
    he: 'bg-blue-100 text-blue-800',
    en: 'bg-green-100 text-green-800',
    ru: 'bg-red-100 text-red-800',
    de: 'bg-yellow-100 text-yellow-800',
    ar: 'bg-purple-100 text-purple-800'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Children-Dentistry Missing Keys ({audit.missingKeys.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Language Completion */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {Object.entries(audit.completionByLanguage).map(([lang, percentage]) => (
              <div key={lang} className="text-center">
                <Badge className={languageColors[lang]} variant="secondary">
                  {lang.toUpperCase()}
                </Badge>
                <div className="text-sm font-medium mt-1">{percentage}%</div>
              </div>
            ))}
          </div>

          {/* High Priority Missing Keys */}
          <div className="space-y-3">
            <h4 className="font-semibold text-red-700">High Priority Missing Keys:</h4>
            {audit.missingKeys
              .filter(key => key.priority === 'high')
              .slice(0, 10)
              .map((key) => (
              <div key={key.key} className="p-3 bg-red-50 rounded-lg border border-red-200">
                <code className="text-sm bg-white px-2 py-1 rounded">{key.key}</code>
                <div className="flex gap-1 mt-2">
                  {key.missingInLanguages.map(lang => (
                    <Badge key={lang} className={languageColors[lang]} variant="secondary" size="sm">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
            {audit.missingKeys.filter(k => k.priority === 'high').length > 10 && (
              <p className="text-sm text-gray-600">
                ... and {audit.missingKeys.filter(k => k.priority === 'high').length - 10} more high priority keys
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationAuditTreatmentDetail;
