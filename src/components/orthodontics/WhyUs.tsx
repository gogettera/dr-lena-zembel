
import React from "react";
import { BookCheck, BookHeart, BookOpen, BookUser } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import TranslatedText from "@/components/ui/translated-text";

const WhyUs = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  // Get items from translations
  const whyUsItems = t('orthodontics.whyUs.items', [], { returnObjects: true }) || [];
  
  // Map icons to items
  const icons = [
    <BookCheck key="bookcheck" className="text-[#9b87f5]" size={30} />,
    <BookHeart key="bookheart" className="text-[#9b87f5]" size={30} />,
    <BookOpen key="bookopen" className="text-[#9b87f5]" size={30} />,
    <BookUser key="bookuser" className="text-[#9b87f5]" size={30} />
  ];

  return (
    <section id="why-us" className="py-14 md:py-20 bg-[#FDF4F0]/60 scroll-mt-24">
      <div className="container mx-auto">
        <TranslatedText
          textKey="orthodontics.whyUs.title"
          as="h2" 
          className="text-2xl md:text-3xl font-bold text-[#6E59A5] mb-10 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
          {whyUsItems.map((item: any, i: number) => (
            <div 
              key={i}
              className="bg-white/80 rounded-2xl shadow-soft border border-dental-beige/40 p-6 text-center flex flex-col items-center group hover:shadow-lg transition-all duration-300 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-4 bg-[#D6BCFA]/40 rounded-full p-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {icons[i % icons.length]}
              </div>
              <div className="font-bold text-[#6E59A5] text-lg mb-3">{item.title}</div>
              <div className="text-[#6E59A5]/80 text-sm">{item.description}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-2xl mx-auto bg-[#E5DEFF]/20 rounded-2xl p-6 border border-dental-beige/30 opacity-0 animate-[fade-in_0.5s_ease-out_0.4s_forwards]">
          <div className="flex items-center mb-3">
            <BookHeart className="text-[#9b87f5] ml-3" size={24} />
            <TranslatedText
              textKey="orthodontics.whyUs.expertise.title"
              as="h3" 
              className="font-bold text-[#6E59A5] text-lg"
            />
          </div>
          <TranslatedText
            textKey="orthodontics.whyUs.expertise.description"
            as="p" 
            className="text-[#6E59A5]/80 text-sm md:text-base"
          />
        </div>
      </div>
    </section>
  );
};
export default WhyUs;
