
import React from 'react';
import LegalPage from '@/components/legal/LegalPage';
import AccessibleLayout from '@/components/layout/AccessibleLayout';

const TermsOfService = () => {
  return (
    <AccessibleLayout>
      <main>
        <LegalPage translationKey="termsOfService" />
      </main>
    </AccessibleLayout>
  );
};

export default TermsOfService;
