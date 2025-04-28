
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";

const VisitSteps = () => {
  const isMobile = useIsMobile();
  const { t, isRTL } = useLanguage();
  const steps = t('childrenDentistry.visitSteps.steps', { returnObjects: true });
  
  return (
    <section id="visit-steps" className="py-14 md:py-20 px-4 bg-gradient-to-br from-white to-[#FDF4F0]/50 scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-6 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            {t('childrenDentistry.visitSteps.title')}
          </h2>
          <div className="w-24 h-1 bg-dental-orange/50 mx-auto mb-6 rounded-full opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]"></div>
        </div>
        
        <div className="relative mt-12">
          {/* Timeline line for desktop */}
          {!isMobile && (
            <div className="absolute top-[43px] left-[10%] right-[10%] h-2 bg-gradient-to-r from-dental-orange/10 via-dental-orange/40 to-dental-orange/10 rounded-full" />
          )}
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
            {steps.map((step: { icon: string; label: string; desc: string }, idx: number) => (
              <div 
                key={idx} 
                className="flex flex-col items-center gap-3 w-full md:w-auto relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-soft border border-dental-beige/30 p-1 z-10 transition-transform hover:scale-110 duration-300">
                  {step.icon}
                </div>
                
                <div className="rounded-lg bg-white/90 backdrop-blur-sm p-4 border border-dental-beige/20 shadow-soft w-full md:w-[180px] text-center space-y-2 transition-all duration-300 hover:shadow-md">
                  <div className="font-bold text-dental-navy">{step.label}</div>
                  <div className="text-dental-navy/70 text-sm">{step.desc}</div>
                </div>
                
                {idx < steps.length - 1 && isMobile && (
                  <div className="flex justify-center w-full my-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-dental-orange/60">
                      <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-dental-beige/30">
          <div className="flex items-center text-dental-navy">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`${isRTL ? 'ml-2' : 'mr-2'} text-dental-orange`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-medium">{t('childrenDentistry.visitSteps.averageTime')}</span>
          </div>
          <div className="text-dental-navy/70 text-sm md:text-base font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="inline-block w-4 h-4 mr-2 text-dental-orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {t('childrenDentistry.visitSteps.disclaimer')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitSteps;
