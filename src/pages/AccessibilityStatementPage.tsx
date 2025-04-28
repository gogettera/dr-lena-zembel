
import React, { useEffect } from 'react';
import AccessibilityStatement from '@/components/AccessibilityStatement';
import AccessibleLayout from '@/components/layout/AccessibleLayout';

const AccessibilityStatementPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AccessibleLayout>
      <main className="pt-20">
        <AccessibilityStatement />
      </main>
    </AccessibleLayout>
  );
};

export default AccessibilityStatementPage;
