
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-dental-beige flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-dental-navy rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-white text-4xl font-bold">DZ</span>
        </div>
        
        <h1 className="text-6xl font-bold text-dental-navy mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-dental-navy mb-4">Page Not Found</h2>
        <p className="text-dental-navy/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="orange" asChild>
            <Link to="/he">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="tel:035666915">
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
