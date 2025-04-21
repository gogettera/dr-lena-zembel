
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { HelpCircle } from "lucide-react";

const faq = [
  {
    q: "באיזה גיל כדאי להתחיל טיפולי שיניים?",
    a: "בדרך כלל מומלץ סביב גיל שנתיים וחצי – או לאחר בקיעת השיניים הראשונות. ביקור מוקדם עוזר להרגיל את הילד לסביבת המרפאה ולבנות חוויה חיובית מההתחלה.",
  },
  {
    q: "מה אם הילד לא משתף פעולה?",
    a: "זה בסדר גמור – יש לנו שיטות רכות, מבוססות גישה פסיכולוגית לילדים. אנחנו מתאימים את הטיפול לקצב של הילד, ולפעמים מתחילים רק בהיכרות קצרה ומשחק בביקור הראשון.",
  },
  {
    q: "האם אפשר להגיע רק להתייעצות?",
    a: "בוודאי. אין התחייבות להמשך טיפול. התייעצות ראשונית היא הזדמנות טובה לשאול שאלות, לפגוש את הצוות ולבחון אם המרפאה מתאימה לכם ולילדכם.",
  },
  {
    q: "איך מכינים את הילד לביקור הראשון?",
    a: "מומלץ לשוחח עם הילד על הביקור בצורה חיובית וקלילה, להדגיש שמדובר בביקור להכיר את דוקטור השיניים וספירת השיניים. הימנעו ממונחים מפחידים או סיפורי חוויות שליליות.",
  },
  {
    q: "האם הורים יכולים להיות נוכחים בטיפול?",
    a: "כמובן. אנחנו מעודדים נוכחות הורית בחדר הטיפולים, במיוחד עם ילדים צעירים. עם זאת, לעתים ילדים בוגרים יותר משתפים פעולה טוב יותר כשהם נכנסים לבד.",
  },
];

const FAQ = () => {
  const isMobile = useIsMobile();

  return (
    <section id="faq" className="py-14 md:py-20 px-4 bg-white scroll-mt-24">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-dental-navy mb-8 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          שאלות נפוצות
        </h2>
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, i) => (
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
