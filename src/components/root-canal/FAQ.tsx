
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const isMobile = useIsMobile();
  const { t, language } = useLanguage();

  const faq = [
    {
      q: t("rootCanal.faq.q1", language === "he" 
        ? "מהו טיפול שורש ומדוע צריך אותו?" 
        : "What is a root canal treatment and why is it needed?"),
      a: t("rootCanal.faq.a1", language === "he"
        ? "טיפול שורש נועד להציל שן שסבלה מדלקת או זיהום בתעלת השורש ומאפשר שמירה על השן בפה."
        : "Root canal treatment is performed to save a tooth that suffered from inflammation or infection in the root canal, allowing you to keep the tooth in your mouth."),
    },
    {
      q: t("rootCanal.faq.q2", language === "he"
        ? "האם טיפול שורש כואב?"
        : "Is root canal treatment painful?"),
      a: t("rootCanal.faq.a2", language === "he"
        ? "הטיפול מתבצע לרוב בהרדמה מקומית ואמור להיות ללא כאב – במידת הצורך ניתנת גם תמיכה נוספת."
        : "The procedure is typically performed under local anesthesia and should be pain-free – extra support is provided if needed."),
    },
    {
      q: t("rootCanal.faq.q3", language === "he"
        ? "כמה זמן אורך טיפול שורש?"
        : "How long does a root canal take?"),
      a: t("rootCanal.faq.a3", language === "he"
        ? "טיפול שורש במקרים סטנדרטיים נמשך בין שעה אחת לשעתיים ולעיתים דורש מספר פגישות."
        : "A standard root canal takes between one and two hours, and sometimes requires several appointments."),
    },
    {
      q: t("rootCanal.faq.q4", language === "he"
        ? "האם יש מגבלות אחרי טיפול שורש?"
        : "Are there restrictions after root canal treatment?"),
      a: t("rootCanal.faq.a4", language === "he"
        ? "בימים הראשונים אחרי טיפול שורש מומלץ להימנע מאכילה בצד הטיפול ולשמור על היגיינה קפדנית."
        : "In the first days after a root canal, it is recommended to avoid chewing on the treated side and to maintain strict oral hygiene."),
    },
  ];

  return (
    <section id="faq" className="py-14 md:py-20 px-4 bg-white scroll-mt-24">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-[#6E59A5] mb-8 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          {t("rootCanal.faqTitle", language === "he" ? "שאלות נפוצות" : "Frequently Asked Questions")}
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
                    <HelpCircle className="ml-3 text-[#9b87f5] flex-shrink-0" size={isMobile ? 18 : 22} />
                    <span className="font-bold text-[#6E59A5]">{item.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-[#6E59A5]/80">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
export default FAQ;
