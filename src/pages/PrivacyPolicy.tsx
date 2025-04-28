
import React from 'react';
import LegalPage from '@/components/legal/LegalPage';
import AccessibleLayout from '@/components/layout/AccessibleLayout';

const PrivacyPolicy = () => {
  return (
    <AccessibleLayout>
      <main>
        <LegalPage translationKey="privacyPolicy" />
      </main>
    </AccessibleLayout>
  );
};

export default PrivacyPolicy;
