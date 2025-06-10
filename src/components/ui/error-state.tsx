
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  showHomeLink?: boolean;
  onRetry?: () => void;
  onGoHome?: () => void;
  className?: string;
  variant?: 'default' | 'minimal' | 'centered';
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'שגיאה',
  message = 'משהו השתבש. אנא נסה שוב.',
  showRetry = true,
  showHomeLink = false,
  onRetry,
  onGoHome,
  className,
  variant = 'default'
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = '/';
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={cn('text-center py-4', className)}>
        <p className="text-sm text-gray-600 mb-2">{message}</p>
        {showRetry && (
          <Button variant="outline" size="sm" onClick={handleRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            נסה שוב
          </Button>
        )}
      </div>
    );
  }

  if (variant === 'centered') {
    return (
      <div className={cn('flex flex-col items-center justify-center min-h-[400px] text-center', className)}>
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6 max-w-md">{message}</p>
        <div className="flex gap-3">
          {showRetry && (
            <Button onClick={handleRetry}>
              <RefreshCw className="w-4 h-4 mr-2" />
              נסה שוב
            </Button>
          )}
          {showHomeLink && (
            <Button variant="outline" onClick={handleGoHome}>
              <Home className="w-4 h-4 mr-2" />
              חזרה לדף הבית
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Alert className={cn('border-red-200 bg-red-50', className)}>
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800">
        <div className="mb-3">
          <strong className="block mb-1">{title}</strong>
          {message}
        </div>
        <div className="flex gap-2">
          {showRetry && (
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RefreshCw className="w-4 h-4 mr-2" />
              נסה שוב
            </Button>
          )}
          {showHomeLink && (
            <Button variant="outline" size="sm" onClick={handleGoHome}>
              <Home className="w-4 h-4 mr-2" />
              דף הבית
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};
