
import React from 'react';
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button';
import { Toaster } from '@/components/ui/toaster';
import { useLanguage } from '@/contexts/LanguageContext';
import MetaTags from '@/components/MetaTags';

interface LandingLayoutProps {
  children: React.ReactNode;
  meta?: {
    title?: string;
    description?: string;
    titleKey?: string;
    descriptionKey?: string;
    jsonLd?: string;
  };
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children, meta }) => {
  const { t, isRTL } = useLanguage();
  
  // Get title and description from translation keys if provided
  const title = meta?.titleKey ? t(meta.titleKey) : meta?.title;
  const description = meta?.descriptionKey ? t(meta.descriptionKey) : meta?.description;
  
  return (
    <div className="flex flex-col min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <MetaTags title={title} description={description} jsonLd={meta?.jsonLd} />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <ScrollToTopButton />
      <Toaster />
    </div>
  );
};

export default LandingLayout;
