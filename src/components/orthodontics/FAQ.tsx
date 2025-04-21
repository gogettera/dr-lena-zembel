
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { BookOpen } from "lucide-react";

const faq = [
  {
    q: "האם יישור שיניים מתאים רק לילדים?",
    a: "לא! גם מבוגרים ונערים עוברים בימינו יישור שיניים והטכנולוגיות החדשניות הופכות את התהליך לנוח ויעיל בכל גיל."
  },
  {
    q: "כמה זמן נמשך טיפול ממוצע?",
    a: "רוב התהליכים נעים בין שנה לשנתיים, תלוי במורכבות ובשיטת היישור."
  },
  {
    q: "האם אפשר לבצע יישור בלתי נראה?",
    a: "בהחלט. אנחנו מציעים קשתיות שקופות וטכניקות סמכים בלתי נראים – בהתאם לצרכי המטופל."
  },
  {
    q: "האם יש כאבים בטיפול?",
    a: "לעיתים יש אי נוחות בשעות הראשונות לאחר התקנת המכשירים, אך היא מתמתנת במהירות."
  },
  {
    q: "איך שומרים על התוצאה?",
    a: "לאחר סיום התהליך מקבלים סד/קיבוע, והסבר מלא לשמירה על השיניים הישרות לאורך זמן."
  },
];

const FAQ = () => {
  const isMobile = useIsMobile();
  return (
    <section id="faq" className="py-14 md:py-20 px-4 bg-white scroll-mt-24">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-[#6E59A5] mb-8 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          שאלות נפוצות
        </h2>
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, i) => (
              <AccordionItem 
                key={i} 
                value={`faq-${i}`}
                className="bg-[#E5DEFF]/30 rounded-xl mb-4 shadow-sm border border-[#E5DEFF]/70 overflow-hidden opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center text-right">
                    <BookOpen className="ml-3 text-[#9b87f5] flex-shrink-0" size={isMobile ? 18 : 22} />
                    <span className="font-bold text-[#6E59A5]">{item.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-[#6E59A5]/80">
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
