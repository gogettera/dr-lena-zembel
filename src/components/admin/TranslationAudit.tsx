
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { auditTranslationKeys, generateTranslationReport, auditSpecificTreatment, MissingTranslationKey } from '@/utils/translationAudit';
import { Language } from '@/types/language';

const TranslationAudit: React.FC = () => {
  const [auditData, setAuditData] = useState(auditTranslationKeys());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

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

  const groupedMissingKeys = useMemo(() => {
    return auditData.missingKeys.reduce((acc, key) => {
      if (!acc[key.category]) {
        acc[key.category] = [];
      }
      acc[key.category].push(key);
      return acc;
    }, {} as Record<string, MissingTranslationKey[]>);
  }, [auditData.missingKeys]);

  const overallCompletion = Math.round(
    ((auditData.totalKeysChecked - auditData.missingKeys.length) / auditData.totalKeysChecked) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Translation Audit</h2>
          <p className="text-gray-600 mt-1">
            Comprehensive analysis of missing translation keys across all treatment pages
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={refreshAudit}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={downloadReport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Link to="/admin/audit-results">
            <Button variant="default" size="sm">
              View Detailed Results
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
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

      {/* Language Completion */}
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

      {/* Detailed Results */}
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
    </div>
  );
};

export default TranslationAudit;
