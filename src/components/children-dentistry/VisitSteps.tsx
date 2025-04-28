
import React from "react";
import { CheckCircle, ArrowRight, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";

const VisitSteps = () => {
  const isMobile = useIsMobile();
  const { t, isRTL } = useLanguage();
  const steps = t('childrenDentistry.visitSteps.steps', { returnObjects: true });
  
  // Direction-aware arrow
  const Arrow = () => {
    const ArrowComponent = isRTL ? 
      <ArrowRight className="transform rotate-90 text-dental-orange/60" /> : 
      <ArrowRight className="transform rotate-90 text-dental-orange/60" />;
    
    return ArrowComponent;
  };

  return (
    <section id="visit-steps" className="py-14 md:py-20 px-4 bg-gradient-to-br from-[#FFDEE2]/60 to-[#FFF1F2]/80 scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-6 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          {t('childrenDentistry.visitSteps.title')}
        </h2>
        
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
                
                <div className="rounded-lg bg-white/80 backdrop-blur-sm p-4 border border-dental-beige/20 shadow-soft w-full md:w-[180px] text-center space-y-2">
                  <div className="font-bold text-dental-navy">{step.label}</div>
                  <div className="text-dental-navy/70 text-sm">{step.desc}</div>
                </div>
                
                {idx < steps.length - 1 && isMobile && (
                  <div className="flex justify-center w-full my-1">
                    <Arrow />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-dental-beige/30">
          <div className="flex items-center text-dental-navy">
            <Clock className={`${isRTL ? 'ml-2' : 'mr-2'} text-dental-orange`} />
            <span>{t('childrenDentistry.visitSteps.averageTime')}</span>
          </div>
          <div className="text-dental-navy/70 text-sm md:text-base font-medium">
            <CheckCircle className="inline-block w-4 h-4 mr-2 text-dental-orange" />
            {t('childrenDentistry.visitSteps.disclaimer')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitSteps;
