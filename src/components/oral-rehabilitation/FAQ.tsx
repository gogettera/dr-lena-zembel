
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const { t } = useLanguage();

  const faqs = t('oralRehabilitation.faq', [
    {
      question: 'כמה זמן נמשך תהליך שיקום הפה?',
      answer: 'התהליך משתנה בהתאם להיקף השיקום הנדרש. טיפול בסיסי יכול להימשך מספר שבועות, בעוד שיקום מורכב עשוי להימשך מספר חודשים. בפגישת הייעוץ נוכל לתת הערכת זמן מדויקת יותר.'
    },
    {
      question: 'האם התהליך כואב?',
      answer: 'הטיפולים מתבצעים תחת הרדמה מקומית ובשיטות מתקדמות המבטיחות נוחות מרבית. במקרה הצורך, ניתן לשלב סדציה או טיפול בגז צחוק.'
    },
    {
      question: 'כמה זמן מחזיק שיקום פה?',
      answer: 'עם טיפול ותחזוקה נכונים, שיקום פה יכול להחזיק 15-20 שנה ואף יותר. חשוב להקפיד על היגיינת פה טובה וביקורות תקופתיות.'
    }
  ]);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
          {t('frequentlyAskedQuestions')}
        </h2>
        <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
          {t('faqDescription')}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-dental-beige/30 rounded-lg overflow-hidden bg-white"
            >
              <AccordionTrigger className="px-6 py-4 text-dental-navy font-medium text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-dental-navy/80">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
