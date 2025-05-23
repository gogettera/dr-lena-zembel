
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
import AestheticTreatmentsLanding from '@/components/aesthetic-treatments/AestheticTreatmentsLanding';
import OrthodonticsLanding from '@/components/orthodontics/OrthodonticsLanding';
import RootCanalLanding from '@/components/root-canal/RootCanalLanding';
import OralRehabilitationLanding from '@/components/oral-rehabilitation/OralRehabilitationLanding';
import PreventiveMedicineLanding from '@/components/preventive-medicine/PreventiveMedicineLanding';
import AdminDashboard from '@/pages/admin/index';
import TranslationsAdminPage from '@/pages/admin/TranslationsAdminPage';
import TranslationAuditPage from '@/pages/admin/TranslationAuditPage';

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
          
          {/* Dedicated treatment landing pages */}
          <Route path="treatments/children-dentistry/landing" element={
            <div className="bg-white">
              <main className="pt-0">
                <ChildrenDentistryLanding />
              </main>
            </div>
          } />
          <Route path="treatments/aesthetic-treatments/landing" element={
            <div className="bg-white">
              <main className="pt-0">
                <AestheticTreatmentsLanding />
              </main>
            </div>
          } />
          <Route path="treatments/orthodontics/landing" element={
            <div className="bg-white">
              <main className="pt-0">
                <OrthodonticsLanding />
              </main>
            </div>
          } />
          <Route path="treatments/root-canal/landing" element={
            <div className="bg-white">
              <main className="pt-0">
                <RootCanalLanding />
              </main>
            </div>
          } />
          <Route path="treatments/oral-rehabilitation/landing" element={
            <div className="bg-white">
              <main className="pt-0">
                <OralRehabilitationLanding />
              </main>
            </div>
          } />
          <Route path="treatments/preventive-medicine/landing" element={
            <div className="bg-white">
              <main className="pt-0">
                <PreventiveMedicineLanding />
              </main>
            </div>
          } />
          
          {/* Tab-based treatment pages */}
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
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/translations" element={<TranslationsAdminPage />} />
        <Route path="/admin/audit-results" element={<TranslationAuditPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
