
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { auditSpecificTreatment, generateDetailedTreatmentReport, MissingTranslationKey } from '@/utils/translationAudit';

const TranslationAuditResults: React.FC = () => {
  // Run audit for children-dentistry specifically
  const childrenDentistryAudit = auditSpecificTreatment('children-dentistry');
  
  // Run audits for all treatments
  const allTreatments = [
    'children-dentistry',
    'aesthetic-treatments',
    'orthodontics',
    'root-canal',
    'oral-rehabilitation',
    'preventive-medicine'
  ];

  const allAudits = allTreatments.map(treatment => ({
    treatment,
    audit: auditSpecificTreatment(treatment)
  }));

  const languageColors: Record<string, string> = {
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

  return (
    <div className="space-y-6">
      {/* Overall Summary */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Translation Audit Complete!</strong> Found missing keys across all treatment pages. 
          Children-dentistry has {childrenDentistryAudit.missingKeys.length} missing keys out of {childrenDentistryAudit.totalKeysChecked} total keys.
        </AlertDescription>
      </Alert>

      {/* Children-Dentistry Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Children-Dentistry Missing Keys ({childrenDentistryAudit.missingKeys.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Language Completion */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {Object.entries(childrenDentistryAudit.completionByLanguage).map(([lang, percentage]) => (
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
              {childrenDentistryAudit.missingKeys
                .filter(key => key.priority === 'high')
                .slice(0, 10) // Show first 10
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
              {childrenDentistryAudit.missingKeys.filter(k => k.priority === 'high').length > 10 && (
                <p className="text-sm text-gray-600">
                  ... and {childrenDentistryAudit.missingKeys.filter(k => k.priority === 'high').length - 10} more high priority keys
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Treatments Summary */}
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

      {/* Critical Missing Keys Across All Treatments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-700">Critical Missing Keys (All Treatments)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allAudits.flatMap(({ treatment, audit }) => 
              audit.missingKeys
                .filter(key => key.priority === 'high')
                .map(key => ({ ...key, treatment }))
            )
            .slice(0, 20) // Show top 20 critical issues
            .map((key, index) => (
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

      {/* Console Log Output */}
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
    </div>
  );
};

// Console logging for immediate feedback
const logAuditResults = () => {
  const treatments = [
    'children-dentistry',
    'aesthetic-treatments', 
    'orthodontics',
    'root-canal',
    'oral-rehabilitation',
    'preventive-medicine'
  ];

  console.group('🔍 COMPREHENSIVE TRANSLATION AUDIT');
  
  treatments.forEach(treatment => {
    const audit = auditSpecificTreatment(treatment);
    const completion = Math.round(((audit.totalKeysChecked - audit.missingKeys.length) / audit.totalKeysChecked) * 100);
    
    console.group(`📄 ${treatment.toUpperCase()}`);
    console.log(`Total Keys: ${audit.totalKeysChecked}`);
    console.log(`Missing Keys: ${audit.missingKeys.length}`);
    console.log(`Completion: ${completion}%`);
    console.log(`High Priority Missing: ${audit.missingKeys.filter(k => k.priority === 'high').length}`);
    
    // Show first 5 high priority missing keys
    const highPriority = audit.missingKeys.filter(k => k.priority === 'high').slice(0, 5);
    if (highPriority.length > 0) {
      console.log('Top Missing Keys:');
      highPriority.forEach(key => {
        console.log(`  ❌ ${key.key} (missing in: ${key.missingInLanguages.join(', ')})`);
      });
    }
    console.groupEnd();
  });
  
  console.groupEnd();
};

// Run the audit immediately
logAuditResults();

export default TranslationAuditResults;
