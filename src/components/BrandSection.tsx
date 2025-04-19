
import React from 'react';
import { ArrowRight } from 'lucide-react';

const BrandSection = () => {
  return (
    <section id="patients" className="flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-dental-navy text-white p-8 md:p-16 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          מראה חדש, אותה רמת טיפול.
        </h2>
        
        <p className="text-lg mb-8 leading-relaxed">
          המרפאה שלנו עברה ריענון.<br />
          עם צוות חדש ומקצועי, אנחנו עושים כמה שינויים קטנים —<br />
          אבל הטיפול האכפתי והיחס האישי נשארים בדיוק אותו הדבר.
        </p>
        
        <div className="space-y-4">
          <a href="#more" className="flex items-center text-lg hover:text-dental-orange transition-colors">
            <span>ספרו לי עוד</span>
            <ArrowRight className="mr-2 h-5 w-5" />
          </a>
          
          <a href="#about" className="flex items-center text-lg hover:text-dental-orange transition-colors">
            <span>עלינו</span>
            <ArrowRight className="mr-2 h-5 w-5" />
          </a>
          
          <a href="#treatments" className="flex items-center text-lg hover:text-dental-orange transition-colors">
            <span>טיפולים</span>
            <ArrowRight className="mr-2 h-5 w-5" />
          </a>
        </div>
        
        <div className="mt-12">
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 48 48" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-dental-orange"
          >
            <circle cx="24" cy="24" r="24" fill="currentColor" />
            <path d="M24 14C18.48 14 14 18.48 14 24C14 29.52 18.48 34 24 34C29.52 34 34 29.52 34 24C34 18.48 29.52 14 24 14ZM28.66 19.76L24.26 27.46C24.1 27.72 23.84 27.9 23.54 27.96C23.46 27.98 23.38 28 23.3 28C23.08 28 22.86 27.92 22.68 27.78L19.28 25.18C18.92 24.9 18.86 24.38 19.14 24.02C19.42 23.66 19.94 23.6 20.3 23.88L23.06 26.02L27.02 19.04C27.26 18.64 27.78 18.52 28.18 18.76C28.58 19 28.9 19.36 28.66 19.76Z" fill="white" />
          </svg>
        </div>
      </div>
      
      <div className="md:w-1/2 bg-dental-pink">
        <div className="h-full flex items-center justify-center p-8">
          <img 
            src="/lovable-uploads/11fa7c9b-39fc-4d60-b09b-13f0578ebffe.png" 
            alt="רופאת שיניים במרפאה" 
            className="max-h-full rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
