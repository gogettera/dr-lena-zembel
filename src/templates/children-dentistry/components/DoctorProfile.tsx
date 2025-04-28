
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { EnhancedImage } from '@/components/ui/enhanced-image';

const DoctorProfile: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="doctor" className="py-16 md:py-20 px-4 bg-gradient-to-br from-[#FDF4F0] to-white scroll-mt-24">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="w-full lg:w-2/5">
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-dashed border-dental-orange/30 -z-10 translate-x-3 translate-y-3"></div>
              <EnhancedImage
                src="/lovable-uploads/461f9da9-a7b8-4127-9111-c45b5742bdcf.png"
                alt={t('childrenAdLanding.doctor.imageAlt')}
                className="rounded-2xl shadow-md"
                aspectRatio={3/4}
                objectFit="cover"
              />
            </div>
          </div>
          
          <div className="w-full lg:w-3/5">
            <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-6">
              {t('childrenAdLanding.doctor.title')}
            </h2>
            
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-dental-beige/30 mb-8 text-lg">
              <p className="italic text-dental-navy/80 leading-relaxed">
                "{t('childrenAdLanding.doctor.message')}"
              </p>
            </div>
            
            <div className="flex items-center">
              <div>
                <h3 className="text-xl font-bold text-dental-navy">ד"ר לנה זמבל</h3>
                <p className="text-dental-navy/70">מומחית לרפואת שיניים לילדים</p>
              </div>
              <img 
                src="/lovable-uploads/73010fad-f7db-4f4e-ac26-5de0dd04eea8.png" 
                alt={t('childrenAdLanding.doctor.signatureAlt')}
                className="h-16 ml-auto" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
