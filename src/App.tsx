
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageRoute from "@/components/LanguageRoute";
import LanguageHome from "./pages/LanguageHome";
import LanguageTreatmentPage from "./pages/LanguageTreatmentPage";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import { getBrowserLanguage } from "@/utils/languageRoutes";

const queryClient = new QueryClient();

const App = () => {
  const defaultLanguage = getBrowserLanguage();
  
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <a href="#main-content" className="skip-to-content">
              Skip to main content
            </a>
            <div className="min-h-screen w-full">
              <Routes>
                {/* Redirect root to language-specific home page */}
                <Route path="/" element={<Navigate to={`/${defaultLanguage}`} replace />} />
                
                {/* Admin panel route */}
                <Route path="/admin" element={<AdminPanel />} />
                
                {/* Language-specific routes */}
                <Route path="/:lang" element={<LanguageRoute />}>
                  <Route index element={<LanguageHome />} />
                  <Route path="treatments/:treatmentType" element={<LanguageTreatmentPage />} />
                </Route>
                
                {/* Handle 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
