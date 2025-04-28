
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { HelpCircle, Pill, Check, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Map of icons for different FAQ categories
const getFaqIcon = (index: number) => {
  const icons = [HelpCircle, Pill, Clock, Check, HelpCircle];
  const Icon = icons[index % icons.length];
  return <Icon className="ml-3 text-dental-orange flex-shrink-0" size={18} />;
};

const FAQ = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const faqItems = t('childrenDentistry.faq.items', { returnObjects: true });

  return (
    <section id="faq" className="py-14 md:py-20 px-4 bg-gradient-to-b from-dental-beige/10 to-white scroll-mt-24">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            {t('childrenDentistry.faq.title')}
          </h2>
          <p className="text-dental-navy/70 mx-auto mb-6 max-w-2xl opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            {t('childrenDentistry.faq.subtitle')}
          </p>
          <div className="w-16 h-1 bg-dental-orange/50 mx-auto opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]"></div>
        </div>
        
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item: { q: string; a: string }, i: number) => (
              <AccordionItem 
                key={i} 
                value={`faq-${i}`}
                className="bg-white rounded-xl mb-4 shadow-sm border border-dental-beige/30 overflow-hidden opacity-0 animate-[fade-in_0.5s_ease-out_forwards] hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-center text-right">
                    {getFaqIcon(i)}
                    <span className="font-bold text-dental-navy group-hover:text-dental-orange transition-colors">{item.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-dental-navy/80">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
