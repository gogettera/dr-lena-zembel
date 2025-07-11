
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTreatmentInfo } from '@/data/treatmentRegistry';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/BackToTop';
import TreatmentHero from './TreatmentHero';
import TreatmentContent from './TreatmentContent';
import RootCanalLanding from '@/components/root-canal/RootCanalLanding';

const TreatmentPageWrapper: React.FC = () => {
  const { treatmentType, subpage } = useParams<{ treatmentType: string; subpage?: string }>();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get treatment info
  const treatmentInfo = treatmentType ? getTreatmentInfo(treatmentType) : null;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [treatmentType]);

  useEffect(() => {
    if (treatmentType && treatmentInfo) {
      document.title = `${t(treatmentInfo.nameKey)} | Dental Love`;
    }
  }, [treatmentType, treatmentInfo, t]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20">
          <LoadingSkeleton variant="card" className="h-64 mb-8" />
          <div className="container mx-auto px-4 space-y-6">
            <LoadingSkeleton variant="text" lines={3} />
            <LoadingSkeleton variant="card" className="h-96" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!treatmentType) {
    return <Navigate to="/" replace />;
  }

  if (!treatmentInfo) {
    return <Navigate to="/404" replace />;
  }

  // Handle legacy /landing routes with redirects
  if (subpage === 'landing') {
    return <Navigate to={`/treatments/${treatmentType}`} replace />;
  }

  // All treatments now use the enhanced landing system
  if (!subpage) {
    return <RootCanalLanding />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <TreatmentHero 
            treatment={{
              icon: treatmentInfo.icon,
              imageUrl: treatmentInfo.imageUrl,
              slug: treatmentInfo.slug
            }}
            treatmentNameKey={treatmentInfo.nameKey}
            treatmentDescKey={treatmentInfo.descKey}
          />
          <TreatmentContent 
            treatment={{
              icon: treatmentInfo.icon,
              imageUrl: treatmentInfo.imageUrl,
              slug: treatmentInfo.slug
            }}
            treatmentNameKey={treatmentInfo.nameKey}
            treatmentDescKey={treatmentInfo.descKey}
            treatmentType={treatmentType}
          />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ErrorBoundary>
  );
};

export default TreatmentPageWrapper;
