
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface DeferredContentProps {
  children: React.ReactNode;
  loading?: boolean;
}

const DeferredContent: React.FC<DeferredContentProps> = ({ children, loading = false }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 2000); // Defer loading by 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading || !shouldRender) {
    return (
      <div className="w-full h-64">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    );
  }

  return <>{children}</>;
};

export default DeferredContent;
