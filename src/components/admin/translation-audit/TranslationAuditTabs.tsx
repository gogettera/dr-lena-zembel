
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TranslationAuditReport, MissingTranslationKey } from '@/utils/translationAudit';
import { Language } from '@/types/language';

interface TranslationAuditTabsProps {
  auditData: TranslationAuditReport;
}

const TranslationAuditTabs: React.FC<TranslationAuditTabsProps> = ({ auditData }) => {
  const languageColors: Record<Language, string> = {
    he: 'bg-blue-100 text-blue-800',
    en: 'bg-green-100 text-green-800',
    ru: 'bg-red-100 text-red-800',
    de: 'bg-yellow-100 text-yellow-800',
    ar: 'bg-purple-100 text-purple-800'
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const groupedMissingKeys = useMemo(() => {
    return auditData.missingKeys.reduce((acc, key) => {
      if (!acc[key.category]) {
        acc[key.category] = [];
      }
      acc[key.category].push(key);
      return acc;
    }, {} as Record<string, MissingTranslationKey[]>);
  }, [auditData.missingKeys]);

  return (
    <Tabs defaultValue="by-category" className="w-full">
      <TabsList>
        <TabsTrigger value="by-category">By Category</TabsTrigger>
        <TabsTrigger value="by-priority">By Priority</TabsTrigger>
        <TabsTrigger value="by-language">By Language</TabsTrigger>
      </TabsList>

      <TabsContent value="by-category">
        <div className="space-y-4">
          {Object.entries(groupedMissingKeys).map(([category, keys]) => (
            <Card key={category}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <Badge variant="secondary">{keys.length} missing</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {keys.map((key) => (
                    <div key={key.key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{key.key}</code>
                        <div className="flex gap-2 mt-2">
                          <Badge className={priorityColors[key.priority]} variant="outline">
                            {key.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {key.missingInLanguages.map(lang => (
                          <Badge key={lang} className={languageColors[lang]} variant="secondary">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="by-priority">
        {(['high', 'medium', 'low'] as const).map(priority => {
          const priorityKeys = auditData.missingKeys.filter(k => k.priority === priority);
          if (priorityKeys.length === 0) return null;

          return (
            <Card key={priority} className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg capitalize">{priority} Priority</CardTitle>
                  <Badge variant="secondary">{priorityKeys.length} missing</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {priorityKeys.map((key) => (
                    <div key={key.key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{key.key}</code>
                        <p className="text-sm text-gray-600 mt-1">{key.category}</p>
                      </div>
                      <div className="flex gap-1">
                        {key.missingInLanguages.map(lang => (
                          <Badge key={lang} className={languageColors[lang]} variant="secondary">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </TabsContent>

      <TabsContent value="by-language">
        {(['he', 'en', 'ru', 'de', 'ar'] as Language[]).map(language => {
          const languageKeys = auditData.missingKeys.filter(k => 
            k.missingInLanguages.includes(language)
          );
          if (languageKeys.length === 0) return null;

          return (
            <Card key={language} className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{language.toUpperCase()}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{languageKeys.length} missing</Badge>
                    <Badge className={languageColors[language]} variant="secondary">
                      {auditData.completionByLanguage[language]}% complete
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {languageKeys.map((key) => (
                    <div key={key.key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{key.key}</code>
                        <div className="flex gap-2 mt-2">
                          <Badge className={priorityColors[key.priority]} variant="outline">
                            {key.priority}
                          </Badge>
                          <Badge variant="outline">{key.category}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </TabsContent>
    </Tabs>
  );
};

export default TranslationAuditTabs;
