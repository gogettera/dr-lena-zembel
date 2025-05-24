
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TranslationAuditResults from '@/components/admin/TranslationAuditResults';

const TranslationAuditPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/admin/translations">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Translation Management
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Translation Audit</h1>
        <p className="text-gray-600">
          Comprehensive analysis of missing translation keys across all treatment pages
        </p>
      </div>

      <TranslationAuditResults />
    </div>
  );
};

export default TranslationAuditPage;
