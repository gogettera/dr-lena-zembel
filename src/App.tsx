
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageRoute from '@/components/LanguageRoute';
import AccessibleLayout from '@/components/layout/AccessibleLayout';
import LanguageBotoxTreatmentsPage from '@/pages/LanguageBotoxTreatmentsPage';
import BotoxTreatmentsPage from '@/pages/BotoxTreatmentsPage';
import PreventiveMedicinePage from '@/pages/PreventiveMedicinePage';
import NotFound from '@/pages/NotFound';
import { getBrowserLanguage } from '@/utils/languageRoutes';

function App() {
  return (
    <LanguageProvider>
      <Routes>
        {/* Default redirect to browser language */}
        <Route path="/" element={<Navigate to={`/${getBrowserLanguage()}`} replace />} />

        {/* Language routes */}
        <Route path="/:lang" element={<LanguageRoute />}>
          <Route element={<AccessibleLayout />}>
            <Route path="treatments/botox-treatments" element={<LanguageBotoxTreatmentsPage />} />
            <Route path="treatments/preventive-medicine" element={<PreventiveMedicinePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Legacy direct routes (for backward compatibility) */}
        <Route element={<AccessibleLayout />}>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/treatments/botox-treatments" element={<BotoxTreatmentsPage />} />
          <Route path="/treatments/preventive-medicine" element={<PreventiveMedicinePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}

export default App;
