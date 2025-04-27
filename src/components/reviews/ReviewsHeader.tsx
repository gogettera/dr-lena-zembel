
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

interface ReviewsHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

const ReviewsHeader = ({ onRefresh, isRefreshing }: ReviewsHeaderProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-bold text-dental-navy">
        {t('patientExperiences')}
      </h3>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh} 
        disabled={isRefreshing}
      >
        {isRefreshing ? (
          <RefreshCw className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <RefreshCw className="h-4 w-4 mr-2" />
        )}
        {t('refreshReviews')}
      </Button>
    </div>
  );
};

export default ReviewsHeader;
