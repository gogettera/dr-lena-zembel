
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
    { 
      question: "האם הטיפולים כואבים?", 
      answer: "אנחנו עושים הכל כדי שלא תרגישו כאב. במרפאה שלנו משתמשים בטכנולוגיות מתקדמות, הרדמה מקומית יעילה, וסבלנות אינסופית. רבים מהמטופלים שלנו מופתעים כמה זה היה פשוט." 
    },
    { 
      question: "איך מתכוננים לפגישה הראשונה?", 
      answer: "מגיעים רגועים – ואנחנו נדאג לכל השאר. אין צורך בהכנה מיוחדת. אם יש לכם מסמכים רפואיים קודמים – נשמח אם תביאו." 
    },
    { 
      question: "האם אתם מקבלים ילדים?", 
      answer: "בוודאי! אנחנו מתמחים בטיפולי ילדים, עם גישה עדינה, סבלנית ומותאמת אישית. המרפאה עצמה עוצבה כדי להרגיש כמו מקום כיפי ולא מאיים." 
    },
    { 
      question: "כמה עולה טיפול?", 
      answer: "המחיר תלוי בסוג הטיפול – אבל אצלנו הכל שקוף מראש. תקבלו הצעת מחיר ברורה כבר בפגישה הראשונה, בלי הפתעות." 
    },
    { 
      question: "מה אם אני מפחד מרופא שיניים?", 
      answer: "אתם לא לבד. הרבה מהמטופלים שלנו התחילו עם חשש – וסיימו עם חיוך. אנחנו מתאימים את הקצב ואת הגישה בדיוק לפי הצורך שלכם." 
    },
    { 
      question: "האם אתם עובדים עם ביטוחים?", 
      answer: "כן, אנחנו עובדים עם רוב חברות הביטוח. נשמח לבדוק את הזכאות שלכם עוד לפני ההגעה." 
    }
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

