
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const faqItems = t('childrenDentistry.faq.items', { returnObjects: true });

  return (
    <section id="faq" className="py-14 md:py-20 px-4 bg-white scroll-mt-24">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-dental-navy mb-8 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          {t('childrenDentistry.faq.title')}
        </h2>
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item: { q: string; a: string }, i: number) => (
              <AccordionItem 
                key={i} 
                value={`faq-${i}`}
                className="bg-[#F1F0FB] rounded-xl mb-4 shadow-sm border border-dental-beige/30 overflow-hidden opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center text-right">
                    <HelpCircle className="ml-3 text-dental-orange flex-shrink-0" size={isMobile ? 18 : 22} />
                    <span className="font-bold text-dental-navy">{item.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-dental-navy/80">
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
