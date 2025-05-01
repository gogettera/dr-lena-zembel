
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import DoctorPortrait from '@/components/shared/DoctorPortrait';
import { Badge } from '@/components/ui/badge';
import { useDirectionalStyles } from '@/utils/direction';

const DoctorProfile: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const dir = useDirectionalStyles();

  // Get doctor information from translations
  const doctorName = t('botoxTreatments.doctor.name');
  const doctorTitle = t('botoxTreatments.doctor.title');
  const doctorEducation = t('botoxTreatments.doctor.education');
  const doctorSpecialization = t('botoxTreatments.doctor.specialization');
  const treatmentApproach = t('botoxTreatments.doctor.approach');
  const approachQuote = t('botoxTreatments.doctor.approachQuote');

  // Get language names from translations
  const languages = [
    { code: 'he', name: t('botoxTreatments.languages.hebrew') },
    { code: 'en', name: t('botoxTreatments.languages.english') },
    { code: 'ru', name: t('botoxTreatments.languages.russian') },
    { code: 'de', name: t('botoxTreatments.languages.german') }
  ];

  return (
    <Container>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
        {/* Doctor Image */}
        <div className={`${isRTL ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              <DoctorPortrait 
                style="authority" 
                width={400} 
                height={540} 
                rounded="2xl"
              />
            </div>
            
            {/* Experience badge */}
            <div className={`absolute -bottom-5 ${isRTL ? '-right-5' : '-left-5'} bg-dental-orange text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg`}>
              <span className="text-2xl font-bold">10+</span>
              <span className="text-sm">{t('botoxTreatments.yearsExperience')}</span>
            </div>
            
            {/* Certifications */}
            <div className={`absolute -top-4 ${isRTL ? '-right-4' : '-left-4'} flex flex-col gap-2`}>
              <Badge className="bg-dental-navy text-white px-3 py-1 rounded-full">
                {doctorTitle}
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Doctor Info */}
        <div className={`${isRTL ? 'order-1 lg:order-2' : 'order-1 lg:order-1'} ${dir.textAlign}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            {t('botoxTreatments.doctorTitle')}
          </h2>
          
          <h3 className="text-2xl font-bold text-dental-navy mb-6">
            {doctorName}
          </h3>
          
          <p className="text-lg text-dental-navy/80 mb-4">
            {doctorEducation}
          </p>
          
          <p className="text-lg text-dental-navy/80 mb-6">
            {doctorSpecialization}
          </p>
          
          <div className={`bg-dental-beige/30 p-6 rounded-xl mb-6 ${dir.textAlign}`}>
            <h4 className="text-xl font-bold text-dental-navy mb-3">
              {treatmentApproach}
            </h4>
            <p className="text-dental-navy/80 italic">
              {approachQuote}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {languages.map(lang => (
              <Badge 
                key={lang.code} 
                className="bg-dental-beige/20 text-dental-navy px-3 py-1 rounded-full text-md"
              >
                {lang.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DoctorProfile;
