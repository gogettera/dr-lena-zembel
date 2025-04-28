
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Reviews */}
          <div className="w-full md:w-1/3 p-5 rounded-xl bg-[#FDF4F0] text-center">
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-dental-orange text-dental-orange" />
              ))}
            </div>
            <p className="text-dental-navy font-medium">
              "{t('childrenAdLanding.trust.testimonial1.text')}"
            </p>
            <p className="text-sm text-dental-navy/60 mt-2">
              {t('childrenAdLanding.trust.testimonial1.author')}
            </p>
          </div>
          
          {/* Certification */}
          <div className="w-full md:w-1/3 p-5 rounded-xl bg-[#FFDEE2]/20 text-center">
            <img 
              src="/lovable-uploads/c1007b41-5fb4-451a-a540-744c4643c25e.png" 
              alt={t('childrenAdLanding.trust.certification')}
              className="h-12 mx-auto mb-2 opacity-80" 
            />
            <p className="text-dental-navy font-medium">
              {t('childrenAdLanding.trust.certification')}
            </p>
          </div>
          
          {/* More Reviews */}
          <div className="w-full md:w-1/3 p-5 rounded-xl bg-[#D3E4FD]/20 text-center">
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-dental-orange text-dental-orange" />
              ))}
            </div>
            <p className="text-dental-navy font-medium">
              "{t('childrenAdLanding.trust.testimonial2.text')}"
            </p>
            <p className="text-sm text-dental-navy/60 mt-2">
              {t('childrenAdLanding.trust.testimonial2.author')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
