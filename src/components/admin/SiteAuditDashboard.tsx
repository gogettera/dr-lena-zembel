
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  CheckCircle, 
  Play, 
  Download,
  RefreshCw,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Eye,
  Search,
  FileText
} from 'lucide-react';
import { runComprehensiveAudit, generateAuditReport } from '@/utils/siteAudit/core';
import { AuditReport, AuditIssue, AuditCategory } from '@/utils/siteAudit/types';

const SiteAuditDashboard: React.FC = () => {
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AuditCategory | 'all'>('all');

  const categoryIcons: Record<AuditCategory, React.ElementType> = {
    api: RefreshCw,
    translation: Globe,
    performance: Zap,
    security: Shield,
    accessibility: Eye,
    seo: Search,
    content: FileText,
    ux: TrendingUp
  };

  const severityColors = {
    critical: 'destructive',
    high: 'destructive',
    medium: 'secondary',
    low: 'outline'
  } as const;

  const runAudit = async () => {
    setIsRunning(true);
    try {
      const report = await runComprehensiveAudit();
      setAuditReport(report);
    } catch (error) {
      console.error('Audit failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const downloadReport = () => {
    if (!auditReport) return;
    
    const reportText = generateAuditReport(auditReport);
    const blob = new Blob([reportText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `site-audit-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFilteredIssues = (): AuditIssue[] => {
    if (!auditReport) return [];
    
    if (selectedCategory === 'all') {
      return Object.values(auditReport.issuesByCategory).flat();
    }
    
    return auditReport.issuesByCategory[selectedCategory] || [];
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  useEffect(() => {
    // Run initial audit on component mount
    runAudit();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Site Audit Dashboard</h1>
          <p className="text-gray-600">Comprehensive analysis of your website's health and performance</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={runAudit} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            {isRunning ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            {isRunning ? 'Running Audit...' : 'Run Audit'}
          </Button>
          {auditReport && (
            <Button 
              variant="outline" 
              onClick={downloadReport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Report
            </Button>
          )}
        </div>
      </div>

      {auditReport && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(auditReport.overallScore)}`}>
                  {auditReport.overallScore}/100
                </div>
                <Progress value={auditReport.overallScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{auditReport.criticalIssues}</div>
                <p className="text-xs text-muted-foreground">Require immediate attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{auditReport.highIssues}</div>
                <p className="text-xs text-muted-foreground">Should be fixed soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{auditReport.totalIssues}</div>
                <p className="text-xs text-muted-foreground">Across all categories</p>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          {auditReport.recommendations.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Key Recommendations:</strong>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  {auditReport.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Category Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Issues by Category</CardTitle>
              <CardDescription>
                Click on a category to view detailed issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(auditReport.issuesByCategory).map(([category, issues]) => {
                  const IconComponent = categoryIcons[category as AuditCategory];
                  const issueCount = issues.length;
                  
                  return (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="h-auto p-4 flex flex-col items-center gap-2"
                      onClick={() => setSelectedCategory(category as AuditCategory)}
                    >
                      <IconComponent className="w-6 h-6" />
                      <div className="text-sm font-medium capitalize">{category}</div>
                      <Badge variant={issueCount > 0 ? "destructive" : "outline"}>
                        {issueCount}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Issues */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {selectedCategory === 'all' ? 'All Issues' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Issues`}
                  </CardTitle>
                  <CardDescription>
                    {getFilteredIssues().length} issues found
                  </CardDescription>
                </div>
                <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as AuditCategory | 'all')}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="api">API</TabsTrigger>
                    <TabsTrigger value="translation">Translation</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="accessibility">A11y</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getFilteredIssues().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <p>No issues found in this category!</p>
                  </div>
                ) : (
                  getFilteredIssues().map((issue) => (
                    <Card key={issue.id} className="border-l-4 border-l-red-500">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{issue.title}</h4>
                              <Badge variant={severityColors[issue.severity]}>
                                {issue.severity}
                              </Badge>
                              {issue.autoFixable && (
                                <Badge variant="outline">Auto-fixable</Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-2">{issue.description}</p>
                            {issue.fixSuggestion && (
                              <div className="bg-blue-50 p-3 rounded-md">
                                <strong>Fix suggestion:</strong> {issue.fixSuggestion}
                              </div>
                            )}
                            {issue.file && (
                              <p className="text-sm text-gray-500 mt-2">
                                File: {issue.file}{issue.line ? `:${issue.line}` : ''}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {isRunning && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin mr-3" />
              <span className="text-lg">Running comprehensive site audit...</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SiteAuditDashboard;
