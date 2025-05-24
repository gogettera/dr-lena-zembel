
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Languages, FileText, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage your dental clinic website content and settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/translations">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Languages className="h-8 w-8 text-blue-500" />
                <div>
                  <CardTitle>Translation Management</CardTitle>
                  <CardDescription>
                    Audit and manage translations across all languages
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                View missing translation keys, completion status, and manage content across Hebrew, English, Russian, German, and Arabic.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card className="opacity-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-green-500" />
              <div>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>
                  Manage treatment pages and clinic information
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Coming soon: Edit treatment descriptions, doctor profiles, and clinic details.
            </p>
          </CardContent>
        </Card>

        <Card className="opacity-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-8 w-8 text-purple-500" />
              <div>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>
                  Configure website settings and preferences
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Coming soon: Manage contact information, opening hours, and site configuration.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
