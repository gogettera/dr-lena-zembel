
import React from 'react';
import { ArrowRight, CheckCircle, Calendar, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { NextGenImage } from '@/components/ui/next-gen-image';
import { TranslatedText } from '@/components/ui/translated-text';

const BrandSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he' || language === 'ar';
  
  return (
    <section id="patients" className="flex flex-col md:flex-row" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="md:w-1/2 bg-dental-navy text-white p-8 md:p-16 flex flex-col justify-center">
        <div className="opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <TranslatedText textKey="common.newLook" defaultText="Our New Clinic" />
          </h2>
          
          <p className="text-lg mb-8 leading-relaxed">
            <TranslatedText textKey="common.practiceFresh" defaultText="Our clinic has undergone a complete upgrade! New equipment, advanced technology, and a modern treatment environment await you." />
          </p>
          
          <div className="space-y-5 mb-10">
            {[
              { icon: CheckCircle, textKey: "common.experiencedDoctors", defaultText: "Experienced Team of Doctors" },
              { icon: Star, textKey: "common.advancedEquipment", defaultText: "Advanced Dental Equipment" },
              { icon: Clock, textKey: "common.shortWaits", defaultText: "Short Waiting Times" }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]`} 
                style={{ animationDelay: `${0.3 + index * 0.2}s` }}
              >
                <item.icon className={`h-6 w-6 text-dental-orange flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span className="text-white">
                  <TranslatedText textKey={item.textKey} defaultText={item.defaultText} />
                </span>
              </div>
            ))}
          </div>
          
          <Button 
            variant="orange" 
            size="lg" 
            className="rounded-full text-base hover:scale-105 transition-transform duration-300 shadow-lg opacity-0 animate-[fade-in_0.5s_ease-out_0.8s_forwards]"
          >
            <Calendar className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <TranslatedText textKey="common.bookNow" defaultText="Book Now" />
          </Button>
        </div>
      </div>
      
      <div className="md:w-1/2 bg-gradient-to-br from-dental-pink to-dental-beige relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/11fa7c9b-39fc-4d60-b09b-13f0578ebffe.png')] bg-contain bg-no-repeat bg-center opacity-10 mix-blend-overlay"></div>
        <div className="h-full flex items-center justify-center p-8">
          <div className="relative">
            <div className="absolute inset-0 bg-dental-orange rounded-xl blur-xl opacity-20 transform rotate-3"></div>
            <NextGenImage 
              src="/lovable-uploads/5f625d79-c4c0-4279-8df1-06890084db8c.png"
              alt={t("common.clinicImage", "Dental clinic image")}
              width={640}
              height={480}
              priority={false}
              className="relative max-h-full rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards] object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
