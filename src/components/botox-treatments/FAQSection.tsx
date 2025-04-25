
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQItem } from '@/types/botox-treatments';
import { useDirectionalStyles } from '@/utils/direction';

const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const dir = useDirectionalStyles();
  const faqItems = t('botoxTreatments.faqItems', { returnObjects: true }) as FAQItem[];

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.faqTitle')}
        subtitle={t('botoxTreatments.faqSubtitle')}
      />
      
      <div className="max-w-3xl mx-auto mt-12">
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className={`border border-dental-beige/30 rounded-xl px-6 overflow-hidden ${dir.textAlign}`}
            >
              <AccordionTrigger className="text-lg font-medium text-dental-navy py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-dental-navy/80 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-lg text-dental-navy/70 mb-6">
          {t('botoxTreatments.faqCallout')}
        </p>
        <div className={`flex justify-center space-x-4 ${dir.spaceDir}`}>
          <a 
            href={`tel:${t('clinicInfo.phone')}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-dental-orange hover:bg-dental-orange/90"
          >
            {t('botoxTreatments.callUs')}
          </a>
          <a 
            href="#booking"
            className="inline-flex items-center justify-center px-6 py-3 border border-dental-orange text-base font-medium rounded-full text-dental-orange bg-white hover:bg-dental-beige/10"
          >
            {t('botoxTreatments.bookAppointment')}
          </a>
        </div>
      </div>
    </Container>
  );
};

export default FAQSection;
