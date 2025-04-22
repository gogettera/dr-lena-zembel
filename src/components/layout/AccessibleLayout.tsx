
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import AccessibilityWidget from '@/components/AccessibilityWidget';

interface AccessibleLayoutProps {
  children: React.ReactNode;
}

const AccessibleLayout: React.FC<AccessibleLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <AccessibilityWidget />
      <Toaster />
    </>
  );
};

export default AccessibleLayout;
