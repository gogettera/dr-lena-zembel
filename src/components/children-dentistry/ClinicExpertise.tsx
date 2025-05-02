
import React from "react";
import { Award, Smile, Star } from "lucide-react";
import DoctorPortrait from "@/components/shared/DoctorPortrait";
import { useLanguage } from "@/contexts/LanguageContext";
import TranslatedText from "@/components/ui/translated-text";

const ClinicExpertise = () => {
  const { t } = useLanguage();
  const features = t('childrenDentistry.clinicExpertise.features', [], { returnObjects: true }) || [];
  
  return (
    <section className="py-12 md:py-20 px-2 flex flex-col md:flex-row items-center gap-10 max-w-3xl mx-auto">
      <div className="md:w-1/3 flex justify-center mb-8 md:mb-0">
        <DoctorPortrait 
          style="medical" 
          width={180}
          height={220}
          className="border-2 border-dental-orange shadow"
        />
      </div>
      <div className="md:w-2/3 space-y-5 text-center md:text-right">
        <div className="inline-flex items-center gap-2 bg-dental-orange/10 text-dental-orange px-4 py-1 rounded-full text-sm mb-2">
          <Award className="h-5 w-5" />
          <TranslatedText textKey="childrenDentistry.clinicExpertise.experience" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-dental-navy mb-3 flex items-center justify-center md:justify-start gap-2">
          <Smile className="text-dental-orange w-7 h-7" />
          <TranslatedText textKey="childrenDentistry.clinicExpertise.title" />
        </h3>
        <TranslatedText
          textKey="childrenDentistry.clinicExpertise.description"
          as="p"
          className="text-lg text-dental-navy/80 mb-2"
        />
        <div className="flex flex-wrap gap-2 text-sm text-dental-navy/70 justify-center md:justify-start">
          {features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center gap-1">
              <Star className="h-4 w-4 text-dental-orange" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClinicExpertise;
