
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    // Log the 404 error for analytics
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Set the correct HTTP status code for 404 pages
    document.title = "404 - Page Not Found | Dr. Zembel";
    
    // This is the critical part - we use the document property to set the status code
    if (typeof window !== 'undefined') {
      // Create or select the meta tag for status code
      let metaStatus = document.querySelector('meta[name="http-status"]');
      if (!metaStatus) {
        metaStatus = document.createElement('meta');
        metaStatus.setAttribute('name', 'http-status');
        document.head.appendChild(metaStatus);
      }
      // Set the status code to 404
      metaStatus.setAttribute('content', '404');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dental-beige">
      <div className="text-center px-4 max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-dental-navy">404</h1>
        <p className="text-xl text-dental-muted mb-6">Oops! Page not found</p>
        <p className="mb-8 text-dental-muted">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button variant="orange" asChild>
            <Link to={`/${language}`}>Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
