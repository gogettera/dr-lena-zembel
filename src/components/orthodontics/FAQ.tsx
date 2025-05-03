
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';

const FAQ = () => {
  const { t } = useLanguage();
  
  // Ensure we use correct options format with returnObjects set to true
  const faqItems = t('orthodontics.faq.items', { returnObjects: true }) || [];
  
  return (
    <section id="faq" className="py-16 bg-dental-beige/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-dental-navy text-center mb-12">
          <TranslatedText textKey="orthodontics.faq.title" />
        </h2>
        
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {Array.isArray(faqItems) && faqItems.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-dental-navy font-medium text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
