
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';

interface TranslationAuditHeaderProps {
  onRefresh: () => void;
  onDownloadReport: () => void;
  isRefreshing: boolean;
}

const TranslationAuditHeader: React.FC<TranslationAuditHeaderProps> = ({
  onRefresh,
  onDownloadReport,
  isRefreshing
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Translation Audit</h2>
        <p className="text-gray-600 mt-1">
          Comprehensive analysis of missing translation keys across all treatment pages
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onRefresh}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button onClick={onDownloadReport} variant="outline" size="sm">
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
  );
};

export default TranslationAuditHeader;
