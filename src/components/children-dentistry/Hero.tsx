
import React from "react";
import { HeartHandshake } from "lucide-react";
import { NextGenImage } from "@/components/ui/next-gen-image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export const ChildrenDentistryHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative py-16 md:py-24 px-4 bg-gradient-to-br from-[#FFDEE2] via-[#FFE8EB] to-[#FFF1F3] overflow-hidden scroll-mt-24"
    >
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-dental-orange/10 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-[#D3E4FD]/40 pointer-events-none" />
      <div className="absolute -bottom-16 left-1/4 w-48 h-48 rounded-full bg-dental-beige/30 pointer-events-none" />

      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]" style={{width: '350px', height: '350px', maxWidth: '100%'}}>
              <NextGenImage
                src="/lovable-uploads/f0d36601-8f51-4bd6-9ce4-071cd62aa140.png"
                alt={t('childrenDentistry.hero.imageAlt')}
                className="rounded-3xl shadow-lg object-cover border-4 border-white"
                width={350}
                height={350}
                priority={true}
              />
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <HeartHandshake 
                  className="h-24 w-24 md:h-32 md:w-32 text-dental-orange bg-white/80 backdrop-blur-sm rounded-full border-4 border-white shadow-lg p-4
                            animate-pulse transition-transform duration-300"
                  aria-label="Care & Trust"
                  strokeWidth={2.2}
                />
              </div>
            </div>
          </div>

          <div className="md:w-1/2 text-center md:text-right flex flex-col items-center md:items-end">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-dental-navy font-[Heebo] leading-snug opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
              {t('childrenDentistry.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-dental-navy/80 mb-8 max-w-md opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
              {t('childrenDentistry.hero.description')}
            </p>
            <Button 
              variant="orange" 
              size="lg" 
              className="rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg opacity-0 animate-[fade-in_0.5s_ease-out_0.6s_forwards]"
            >
              {t('bookNow')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChildrenDentistryHero;
