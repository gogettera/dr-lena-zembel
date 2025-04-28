
import React from "react";
import { NextGenImage } from "@/components/ui/next-gen-image";
import { useLanguage } from "@/contexts/LanguageContext";
import { StarIcon } from "lucide-react";

const DoctorSpotlight: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4 bg-white scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-br from-dental-beige/20 to-white rounded-3xl p-6 md:p-8 shadow-soft overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle id="pattern-circle" cx="10" cy="10" r="1.5" fill="#1E3A8A"></circle>
              </pattern>
              <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
            </svg>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="md:w-2/5">
              <div className="relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
                <div className="absolute inset-0 bg-dental-orange/10 rounded-full transform -translate-x-2 translate-y-2"></div>
                <div className="relative">
                  <NextGenImage
                    src="/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
                    alt={t('childrenDentistry.doctorSpotlight.imageAlt')}
                    width={300}
                    height={300}
                    className="rounded-full border-4 border-white shadow-lg object-cover"
                    priority={false}
                  />
                </div>
              </div>
            </div>

            <div className="md:w-3/5 space-y-4">
              <div className="flex items-center gap-2 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
                <StarIcon className="h-6 w-6 text-dental-orange" />
                <h2 className="text-2xl md:text-3xl font-bold text-dental-navy">
                  {t('childrenDentistry.doctorSpotlight.title')}
                </h2>
              </div>

              <p className="text-lg text-dental-navy/80 opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]">
                {t('childrenDentistry.doctorSpotlight.message')}
              </p>

              <div className="pt-4 opacity-0 animate-[fade-in_0.5s_ease-out_0.7s_forwards]">
                <NextGenImage
                  src="/lovable-uploads/c1007b41-5fb4-451a-a540-744c4643c25e.png"
                  alt={t('childrenDentistry.doctorSpotlight.signatureAlt')}
                  width={180}
                  height={60}
                  className="h-14 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSpotlight;
