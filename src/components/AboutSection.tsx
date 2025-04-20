
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DoctorProfileCard from './about/DoctorProfileCard';
import PracticeValues from './about/PracticeValues';
import { CalendarDays } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dental-beige opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#1E3A8A_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Hero style introduction */}
        <div className="mb-16 animate-on-scroll opacity-0">
          <h2 className={`text-5xl font-bold text-dental-navy mb-6 ${isRTL ? 'text-end' : ''}`}>
            {t('aboutMe')}
          </h2>
          <div className={`h-1 w-24 bg-dental-orange mb-8 ${isRTL ? 'ml-auto' : ''}`}></div>
          <p className={`text-xl text-dental-navy/80 max-w-3xl ${isRTL ? 'text-end ml-auto' : ''}`}>
            {t('aboutMeIntro')}
          </p>
        </div>

        {/* Main content area with visual distinction */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Profile area */}
          <div className="lg:col-span-5 animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
            <DoctorProfileCard />
          </div>
          
          {/* Philosophy and values area */}
          <div className="lg:col-span-7 space-y-12">
            {/* Philosophy card with signature style */}
            <div className="relative bg-white rounded-2xl shadow-soft p-8 border border-dental-navy/10 animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="absolute -top-5 left-8 bg-dental-orange text-white rounded-full h-10 w-10 flex items-center justify-center">
                <span className="font-bold">Dr</span>
              </div>
              
              <div className="space-y-6 pt-2">
                <h3 className={`text-2xl font-bold text-dental-navy ${isRTL ? 'text-end' : ''}`}>
                  {t('doctorPhilosophy')}
                </h3>
                
                <div className={`${isRTL ? 'text-end' : ''}`}>
                  <p className="text-dental-navy/80 mb-4">
                    {t('doctorApproach')}
                  </p>
                  <p className="text-dental-navy/80 mb-4">
                    {t('doctorTreatments')}
                  </p>
                </div>
                
                <div className={`flex ${isRTL ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
                  <img 
                    src="/lovable-uploads/ee68f5b4-8d1b-4e34-9a10-4c4da455e913.png" 
                    alt="Signature" 
                    className="h-14 opacity-70"
                    style={{ 
                      clipPath: 'polygon(0% 20%, 100% 20%, 100% 100%, 0% 100%)',
                      height: '60px',
                      objectFit: 'cover',
                      objectPosition: 'bottom'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Values section with distinct visual treatment */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
              <PracticeValues />
            </div>
            
            {/* CTA button */}
            <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} animate-on-scroll opacity-0`} style={{ animationDelay: '0.8s' }}>
              <Button className="group" variant="orange" size="lg">
                <CalendarDays className={`h-5 w-5 transition-transform group-hover:scale-110 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('bookVisit')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
