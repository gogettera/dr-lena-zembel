
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/ui/section-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "כל כמה זמן מומלץ לבצע בדיקה וניקוי?",
      answer: "מומלץ להגיע לבדיקה וניקוי מקצועי פעם בחצי שנה. במקרים מסוימים נמליץ על תדירות שונה בהתאם לצרכים האישיים."
    },
    {
      question: "האם ניקוי שיניים מקצועי עלול לפגוע בשיניים?",
      answer: "לא. ניקוי מקצועי מבוצע בעדינות ובטכניקות מתקדמות, ומסייע לשמירה על בריאות השיניים והחניכיים."
    },
    {
      question: "האם טיפולי מניעה מכוסים על ידי ביטוח?",
      answer: "רוב קופות החולים וביטוחי השיניים מכסים טיפולי מניעה בסיסיים. נשמח לבדוק עבורך את הזכאות."
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-white via-dental-beige/10 to-white">
      <div className="container mx-auto">
        <SectionHeader
          title="שאלות נפוצות"
          subtitle="תשובות לשאלות הנפוצות ביותר על רפואה מונעת"
        />

        <div className="max-w-3xl mx-auto mt-12">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border border-dental-beige/20 px-6 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <span className="text-dental-navy text-right font-medium">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-dental-navy/70 text-right">
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

export default FAQ;
