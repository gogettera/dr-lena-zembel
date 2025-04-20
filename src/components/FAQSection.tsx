
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/ui/section-header';

const FAQSection = () => {
  const { t } = useLanguage();

  const faqs = [
    { question: t('faqQuestion1'), answer: t('faqAnswer1') },
    { question: t('faqQuestion2'), answer: t('faqAnswer2') },
    { question: t('faqQuestion3'), answer: t('faqAnswer3') },
    { question: t('faqQuestion4'), answer: t('faqAnswer4') },
    { question: t('faqQuestion5'), answer: t('faqAnswer5') }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-dental-beige/20 via-white to-dental-pink/10">
      <div className="container mx-auto px-4">
        <SectionHeader
          title={t('frequentlyAskedQuestions')}
          subtitle={t('faqDescription')}
        />

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-dental-beige/20 px-6 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <span className="text-dental-navy text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-dental-navy/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
