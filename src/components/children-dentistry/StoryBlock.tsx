
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { StarIcon } from "lucide-react";

const StoryBlock: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-10 md:py-16 px-4 bg-white">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-dental-beige/20 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-soft">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-dental-orange/5 rounded-full transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D3E4FD]/20 rounded-full transform -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10 text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-dental-orange/10 p-3 rounded-full">
                <StarIcon className="h-8 w-8 text-dental-orange" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-dental-navy mb-6 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
              {t('childrenDentistry.story.title')}
            </h2>
            
            <p className="text-dental-navy/80 text-lg leading-relaxed opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
              {t('childrenDentistry.story.content')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryBlock;
