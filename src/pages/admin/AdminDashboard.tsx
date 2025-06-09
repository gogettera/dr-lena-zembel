
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Globe, Shield, Zap, Users, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminRoute from '@/components/AdminRoute';
import { useSiteHealth } from '@/hooks/useSiteHealth';

const AdminDashboard: React.FC = () => {
  const { healthStatus, report, lastUpdated } = useSiteHealth();

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <AdminRoute element={
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your dental clinic website</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Site Health Overview */}
          <Card className={`border-2 ${getHealthColor(healthStatus)}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Site Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold capitalize">{healthStatus}</div>
                {report && (
                  <div className="text-sm text-gray-600">
                    Score: {report.overallScore}/100
                  </div>
                )}
                {lastUpdated && (
                  <div className="text-xs text-gray-500">
                    Last checked: {lastUpdated.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          {report && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Issues Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-red-600">Critical:</span>
                      <span className="font-medium">{report.criticalIssues}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-600">High:</span>
                      <span className="font-medium">{report.highIssues}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Medium:</span>
                      <span className="font-medium">{report.mediumIssues}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Translation Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    Translation issues: {report.issuesByCategory.translation?.length || 0}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Site Audit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Comprehensive site health monitoring and issue detection
              </p>
              <Link to="/admin/site-audit">
                <Button className="w-full">
                  View Full Audit
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Translations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Manage translations and multilingual content
              </p>
              <Link to="/admin/translations">
                <Button className="w-full">
                  Manage Translations
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Site Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Configure site metadata, social media, and clinic information
              </p>
              <Link to="/admin/settings">
                <Button className="w-full">
                  Site Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Monitor site performance and Core Web Vitals
              </p>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Content Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Manage images, videos, and content
              </p>
              <Link to="/admin/content">
                <Button className="w-full">
                  Manage Content
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    } />
  );
};

export default AdminDashboard;
