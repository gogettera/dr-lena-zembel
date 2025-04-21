
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "@/components/ui/section-header";

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "כמה זמן נמשכים טיפולים אסתטיים שונים?",
      answer: "משך הטיפול משתנה בהתאם לסוג הטיפול. הלבנת שיניים יכולה להימשך שעה-שעתיים במרפאה. ציפויי חרסינה דורשים בדרך כלל 2-3 פגישות על פני שבועיים. שתלים דנטליים הם תהליך ארוך יותר שעשוי להימשך מספר חודשים. בפגישת הייעוץ הראשונית נוכל לתת לך הערכת זמן מדויקת יותר עבור הטיפול הספציפי שלך."
    },
    {
      question: "האם הטיפולים האסתטיים כואבים?",
      answer: "רוב הטיפולים האסתטיים מבוצעים תחת הרדמה מקומית ואינם כרוכים בכאב משמעותי. אנו מקפידים על נוחות המטופל ומציעים אפשרויות שונות כמו גז צחוק או סדציה למטופלים חרדים. לאחר הטיפול, ייתכן ותחווה רגישות קלה שחולפת תוך מספר ימים."
    },
    {
      question: "כמה זמן נמשכות התוצאות של טיפולים אסתטיים?",
      answer: "אורך חיי התוצאות משתנה בהתאם לסוג הטיפול. הלבנת שיניים יכולה להימשך 1-3 שנים, בהתאם להרגלי האכילה והשתייה. ציפויי חרסינה וכתרים יכולים להחזיק מעמד 10-15 שנים או יותר עם טיפול נכון. שתלים דנטליים מתוכננים להיות פתרון קבוע ויכולים להחזיק לכל החיים עם תחזוקה נאותה. בפגישת הייעוץ נספק מידע מפורט על תוחלת החיים הצפויה של הטיפול הספציפי שלך."
    },
    {
      question: "האם טיפולים אסתטיים מתאימים לכולם?",
      answer: "רוב האנשים הם מועמדים טובים לטיפולים אסתטיים, אך ההתאמה תלויה במצב בריאות הפה הכללי ובמצב השיניים הספציפי. לפני כל טיפול אסתטי, אנו מבצעים הערכה מקיפה כדי לוודא שהטיפול המבוקש הוא האפשרות הטובה ביותר עבורך. במקרים מסוימים, ייתכן שיהיה צורך בטיפולים מקדימים כמו טיפול חניכיים או טיפול שורש לפני ביצוע הטיפול האסתטי."
    },
    {
      question: "איך לשמור על תוצאות הטיפול האסתטי לאורך זמן?",
      answer: "לשמירה על התוצאות לאורך זמן, חשוב להקפיד על שגרת היגיינת פה קפדנית הכוללת צחצוח פעמיים ביום, שימוש בחוט דנטלי יומי ושטיפות פה. מומלץ להימנע ממזונות ומשקאות שעלולים להכתים (כמו קפה, תה, יין אדום) במיוחד אחרי טיפולי הלבנה. בנוסף, ביקורים קבועים למעקב וניקוי אצל שיננית אחת לחצי שנה חיוניים לשמירה על בריאות הפה ועל תוצאות הטיפול."
    },
    {
      question: "מה העלות של טיפולים אסתטיים?",
      answer: "עלות הטיפולים האסתטיים משתנה בהתאם לסוג הטיפול, מורכבותו והיקפו. הלבנת שיניים היא בדרך כלל הטיפול הזול ביותר, בעוד ששתלים ושיקום פה מלא הם היקרים יותר. בפגישת הייעוץ הראשונית, לאחר הערכת המצב, נוכל לתת לך הצעת מחיר מדויקת. אנו מציעים גם אפשרויות תשלום גמישות ותוכניות מימון כדי להקל על המטופלים שלנו."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 px-4 bg-gradient-to-br from-dental-beige/20 via-white to-white">
      <div className="container mx-auto">
        <SectionHeader
          title="שאלות נפוצות"
          subtitle="תשובות לשאלות הנפוצות ביותר על טיפולים אסתטיים"
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
