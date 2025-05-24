
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LanguageRoute from '@/components/LanguageRoute';
import AccessibleLayout from '@/components/layout/AccessibleLayout';
import LanguageBotoxTreatmentsPage from '@/pages/LanguageBotoxTreatmentsPage';
import LanguageTreatmentPage from '@/pages/LanguageTreatmentPage';
import BotoxTreatmentsPage from '@/pages/BotoxTreatmentsPage';
import PreventiveMedicinePage from '@/pages/PreventiveMedicinePage';
import NotFound from '@/pages/NotFound';
import { getBrowserLanguage } from '@/utils/languageRoutes';
import Index from '@/pages/Index';
import LanguageHome from '@/pages/LanguageHome';
import ChildrenDentistryLanding from '@/components/children-dentistry/ChildrenDentistryLanding';

function App() {
  return (
    <Routes>
      {/* Root path - redirect to browser language */}
      <Route path="/" element={<Navigate to={`/${getBrowserLanguage()}`} replace />} />
      
      {/* Direct root path handler - alternative to above */}
      <Route index element={<Index />} />

      {/* Language routes */}
      <Route path="/:lang" element={<LanguageRoute />}>
        <Route element={<AccessibleLayout><Outlet /></AccessibleLayout>}>
          <Route index element={<LanguageHome />} />
          <Route path="treatments/botox-treatments" element={<LanguageBotoxTreatmentsPage />} />
          <Route path="treatments/children-dentistry/landing" element={
            <div className="bg-white">
              <main className="pt-0">
                <ChildrenDentistryLanding />
              </main>
            </div>
          } />
          <Route path="treatments/:treatmentType" element={<LanguageTreatmentPage />} />
          <Route path="treatments/preventive-medicine" element={<PreventiveMedicinePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {/* Legacy direct routes (for backward compatibility) */}
      <Route element={<AccessibleLayout><Outlet /></AccessibleLayout>}>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/treatments/botox-treatments" element={<BotoxTreatmentsPage />} />
        <Route path="/treatments/preventive-medicine" element={<PreventiveMedicinePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
