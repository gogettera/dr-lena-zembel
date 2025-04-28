
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { PhoneOutgoing } from "lucide-react";

const CtaSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="booking" className="py-14 md:py-20 px-4 bg-gradient-to-tr from-[#FFDEE2]/50 to-white scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft relative overflow-hidden border border-dental-beige/20">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-dental-orange/5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D3E4FD]/20 rounded-full transform -translate-x-1/4 translate-y-1/4"></div>
          
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
              {t('childrenAdLanding.finalCta.title')}
            </h2>
            
            <p className="text-lg text-dental-navy/80 max-w-2xl mx-auto mb-8 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
              {t('childrenAdLanding.finalCta.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 opacity-0 animate-[fade-in_0.5s_ease-out_0.6s_forwards]">
              <Button 
                variant="orange" 
                size="lg" 
                className="rounded-full px-8 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                {t('childrenAdLanding.finalCta.cta')}
              </Button>
              
              <a 
                href="tel:03-566-6915" 
                className="flex items-center justify-center gap-2 text-dental-navy hover:text-dental-orange transition-colors duration-300"
              >
                <PhoneOutgoing size={16} />
                <span>03-566-6915</span>
              </a>
            </div>
            
            <p className="text-dental-navy/60 text-sm pt-6 opacity-0 animate-[fade-in_0.5s_ease-out_0.9s_forwards]">
              {t('childrenAdLanding.finalCta.phone')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
