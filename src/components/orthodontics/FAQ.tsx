
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TranslatedText from "@/components/ui/translated-text";

const FAQ = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  // Get FAQ items from translations
  const faqItems = t('orthodontics.faq.items', [], { returnObjects: true }) || [];

  return (
    <section id="faq" className="py-14 md:py-20 px-4 bg-white scroll-mt-24">
      <div className="container mx-auto max-w-3xl">
        <TranslatedText
          textKey="orthodontics.faq.title"
          as="h2"
          className="text-2xl font-bold text-[#6E59A5] mb-8 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
        />
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item: any, i: number) => (
              <AccordionItem 
                key={i} 
                value={`faq-${i}`}
                className="bg-[#E5DEFF]/30 rounded-xl mb-4 shadow-sm border border-[#E5DEFF]/70 overflow-hidden opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center text-right">
                    <BookOpen className="ml-3 text-[#9b87f5] flex-shrink-0" size={isMobile ? 18 : 22} />
                    <span className="font-bold text-[#6E59A5]">{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-[#6E59A5]/80">
                  {item.answer}
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
