
import React, { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';

// Define the FAQ item interface
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const { t } = useLanguage();
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  
  useEffect(() => {
    // Fetch FAQ items with proper error handling
    const items = t('childrenDentistry.faq.items', { returnObjects: true });
    if (Array.isArray(items)) {
      setFaqItems(items);
    } else {
      console.error('Expected childrenDentistry.faq.items to be an array, got:', items);
      setFaqItems([]);
    }
  }, [t]);
  
  return (
    <section id="faq" className="py-16 bg-dental-beige/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-dental-navy text-center mb-12">
          <TranslatedText textKey="childrenDentistry.faq.title" />
        </h2>
        
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqItems.map((faq, index) => (
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
