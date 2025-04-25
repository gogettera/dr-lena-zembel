
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LanguageRoute from '@/components/LanguageRoute';
import AccessibleLayout from '@/components/layout/AccessibleLayout';
import LanguageBotoxTreatmentsPage from '@/pages/LanguageBotoxTreatmentsPage';
import BotoxTreatmentsPage from '@/pages/BotoxTreatmentsPage';
import PreventiveMedicinePage from '@/pages/PreventiveMedicinePage';
import NotFound from '@/pages/NotFound';
import { getBrowserLanguage } from '@/utils/languageRoutes';
import Index from '@/pages/Index';
import LanguageHome from '@/pages/LanguageHome';

function App() {
  return (
    <Routes>
      {/* Root path - redirect to browser language */}
      <Route path="/" element={<Navigate to={`/${getBrowserLanguage()}`} replace />} />
      
      {/* Direct root path handler - alternative to above */}
      <Route index element={<Index />} />

      {/* Language routes */}
      <Route path="/:lang" element={<LanguageRoute />}>
        <Route element={<AccessibleLayout />}>
          <Route index element={<LanguageHome />} />
          <Route path="treatments/botox-treatments" element={<LanguageBotoxTreatmentsPage />} />
          <Route path="treatments/preventive-medicine" element={<PreventiveMedicinePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {/* Legacy direct routes (for backward compatibility) */}
      <Route path="/" element={<AccessibleLayout />}>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/treatments/botox-treatments" element={<BotoxTreatmentsPage />} />
        <Route path="/treatments/preventive-medicine" element={<PreventiveMedicinePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
