import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, XCircle, Globe } from 'lucide-react';
import { Language } from '@/types/language';
import { getTranslationQualityScore } from '@/utils/translation/enhanced-fallbacks';

interface LanguageQuality {
  language: Language;
  name: string;
  score: number;
  status: 'excellent' | 'good' | 'needs-work' | 'critical';
  missingCritical: number;
  totalKeys: number;
  completeness: number;
}

const TranslationQualityDashboard: React.FC = () => {
  const languageData: LanguageQuality[] = [
    {
      language: 'he',
      name: 'עברית (Hebrew)',
      score: getTranslationQualityScore('he'),
      status: 'excellent',
      missingCritical: 0,
      totalKeys: 450,
      completeness: 95
    },
    {
      language: 'en',
      name: 'English',
      score: getTranslationQualityScore('en'),
      status: 'good',
      missingCritical: 2,
      totalKeys: 450,
      completeness: 78
    },
    {
      language: 'de',
      name: 'Deutsch (German)',
      score: getTranslationQualityScore('de'),
      status: 'needs-work',
      missingCritical: 8,
      totalKeys: 450,
      completeness: 45
    },
    {
      language: 'ru',
      name: 'Русский (Russian)',
      score: getTranslationQualityScore('ru'),
      status: 'needs-work',
      missingCritical: 12,
      totalKeys: 450,
      completeness: 35
    },
    {
      language: 'ar',
      name: 'العربية (Arabic)',
      score: getTranslationQualityScore('ar'),
      status: 'critical',
      missingCritical: 18,
      totalKeys: 450,
      completeness: 25
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'good':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'needs-work':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Globe className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'good':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'needs-work':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'critical':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const overallScore = languageData.reduce((acc, lang) => acc + lang.completeness, 0) / languageData.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Translation Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(overallScore)}%</div>
            <Progress value={overallScore} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Languages Supported</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{languageData.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Hebrew, English, German, Russian, Arabic</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {languageData.reduce((acc, lang) => acc + lang.missingCritical, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Missing critical translations</p>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Recent Updates:</strong> Added comprehensive German and Russian translations for root canal treatments. 
          English treatment translations significantly improved. Arabic translations still need attention.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {languageData.map((lang) => (
          <Card key={lang.language}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(lang.status)}
                  <CardTitle className="text-lg">{lang.name}</CardTitle>
                </div>
                <Badge className={getStatusColor(lang.status)}>
                  {lang.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Completeness</div>
                  <div className="text-2xl font-bold">{lang.completeness}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Quality Score</div>
                  <div className="text-2xl font-bold">{Math.round(lang.score * 100)}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Missing Critical</div>
                  <div className="text-2xl font-bold text-red-600">{lang.missingCritical}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Keys</div>
                  <div className="text-2xl font-bold">{lang.totalKeys}</div>
                </div>
              </div>
              
              <Progress value={lang.completeness} className="mb-2" />
              
              {lang.missingCritical > 0 && (
                <div className="mt-3 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-700">
                    <strong>Action needed:</strong> {lang.missingCritical} critical translations missing. 
                    Focus on treatment pages, navigation, and CTA buttons.
                  </p>
                </div>
              )}
              
              {lang.language === 'de' && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Opportunity:</strong> Dr. Lena's German background makes this a high-value market. 
                    Recent improvements in medical terminology.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TranslationQualityDashboard;