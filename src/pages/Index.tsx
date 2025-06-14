
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Hebrew homepage as default
    navigate('/he', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dental-beige">
      <div className="text-center">
        <div className="w-16 h-16 bg-dental-navy rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl font-bold">DZ</span>
        </div>
        <p className="text-dental-navy">Loading Dr. Zembel Dental Clinic...</p>
      </div>
    </div>
  );
};

export default Index;
