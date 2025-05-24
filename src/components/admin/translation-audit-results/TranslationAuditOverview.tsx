
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface TranslationAuditOverviewProps {
  missingKeysCount: number;
  totalKeysCount: number;
}

const TranslationAuditOverview: React.FC<TranslationAuditOverviewProps> = ({
  missingKeysCount,
  totalKeysCount
}) => {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertDescription>
        <strong>Translation Audit Complete!</strong> Found missing keys across all treatment pages. 
        Children-dentistry has {missingKeysCount} missing keys out of {totalKeysCount} total keys.
      </AlertDescription>
    </Alert>
  );
};

export default TranslationAuditOverview;
