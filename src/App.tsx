
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LanguageRoute from '@/components/LanguageRoute';
import Index from '@/pages/Index';
import LanguageHome from '@/pages/LanguageHome';
import TreatmentPage from '@/pages/TreatmentPage';
import LanguageTreatmentPage from '@/pages/LanguageTreatmentPage';
import PreventiveMedicinePage from '@/pages/PreventiveMedicinePage';
import NotFound from '@/pages/NotFound';
import AccessibilityStatementPage from '@/pages/AccessibilityStatementPage';
import { useEffect } from 'react';
import { setupDirectionByLanguage } from '@/utils/direction';
import { getBrowserLanguage } from '@/utils/languageRoutes';
import AdminPanel from '@/pages/AdminPanel';
import AdminRoute from '@/components/AdminRoute';

import './App.css';

function App() {
  // Setup initial direction based on browser language
  useEffect(() => {
    const browserLang = getBrowserLanguage();
    setupDirectionByLanguage(browserLang);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Root route - redirects to browser language or default to Hebrew */}
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        <Route path="/accessibility-statement" element={<AccessibilityStatementPage />} />
        
        {/* Language-specific routes */}
        <Route path="/:lang" element={<LanguageRoute />}>
          <Route index element={<LanguageHome />} />
          <Route path="treatments/:treatmentType" element={<LanguageTreatmentPage />} />
          <Route path="preventive-medicine" element={<PreventiveMedicinePage />} />
          <Route path="accessibility-statement" element={<AccessibilityStatementPage />} />
        </Route>

        {/* Catch all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
