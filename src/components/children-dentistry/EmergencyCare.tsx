
import React from "react";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const EmergencyCare = () => {
  return (
    <section id="emergency-care" className="py-16 px-4 bg-[#FFDEE2]/30 scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          title="טיפול במקרי חירום דנטליים אצל ילדים"
          subtitle="מידע חיוני להורים: מה לעשות כשיש כאב, חבלה או מצב דחוף הדורש התייחסות מיידית"
        />

        <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-dental-beige/30 p-6 md:p-8 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-red-500 h-7 w-7 flex-shrink-0" />
            <h3 className="text-xl font-bold text-dental-navy">מה נחשב מצב חירום דנטלי אצל ילדים?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-dental-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-dental-navy">כאב שיניים חזק</h4>
                  <p className="text-sm text-dental-navy/80">כאב שאינו מגיב למשככי כאבים, מפריע לאכילה או לשינה</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-dental-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-dental-navy">חבלה לשיניים</h4>
                  <p className="text-sm text-dental-navy/80">שן שנשברה, התנדנדה או נעקרה בעקבות נפילה או מכה</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-dental-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-dental-navy">נפיחות</h4>
                  <p className="text-sm text-dental-navy/80">נפיחות בפנים, בלסת או בחניכיים, במיוחד אם מלווה בחום</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-dental-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-dental-navy">דימום מתמשך</h4>
                  <p className="text-sm text-dental-navy/80">דימום מהחניכיים או מכתר שן שאינו נפסק לאחר 10 דקות של לחץ</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-dental-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-dental-navy">זיהום</h4>
                  <p className="text-sm text-dental-navy/80">סימני זיהום כמו מוגלה, ריח רע מהפה או כאב פועם</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-dental-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-dental-navy">חפץ תקוע</h4>
                  <p className="text-sm text-dental-navy/80">חפץ זר שנתקע בין השיניים וגורם לכאב או אי-נוחות</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F1F0FB]/60 rounded-xl p-5 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-dental-orange h-6 w-6 flex-shrink-0" />
              <h4 className="font-bold text-dental-navy">זמן הוא גורם קריטי בחירום דנטלי</h4>
            </div>
            <p className="text-dental-navy/80">
              בחבלה לשיניים, במיוחד במקרה של שן שנעקרה, ה-30 דקות הראשונות קריטיות להצלחת הטיפול. אם שן נעקרה לחלוטין, שמרו עליה בחלב או ברוק (בפה הילד אם הוא מספיק גדול) והגיעו מיד למרפאה. <strong>לעולם אל תנקו את השורש</strong> של שן שנעקרה!
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-dental-beige/30">
              <AccordionTrigger className="text-dental-navy font-bold py-4">
                מה לעשות עד שמגיעים למרפאה?
              </AccordionTrigger>
              <AccordionContent className="text-dental-navy/80 pb-4">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-bold text-dental-navy mb-1">כאב שיניים:</h5>
                    <p className="text-sm">
                      ניתן לתת משכך כאבים המתאים לגיל הילד לפי הוראות היצרן. שטיפת פה עדינה במי מלח פושרים יכולה להקל.
                      הימנעו מהנחת אספירין ישירות על החניכיים או השן - זה עלול לגרום לכוויה כימית.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-dental-navy mb-1">שן שנשברה:</h5>
                    <p className="text-sm">
                      שטפו את הפה במים פושרים. אם יש דימום, הניחו גזה או מטלית נקייה ולחצו בעדינות. שמרו על חלקי השן שנשברו
                      בכלי סגור עם חלב, מי ברז או רוק, והביאו אותם למרפאה.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-dental-navy mb-1">שן שנעקרה:</h5>
                    <p className="text-sm">
                      החזיקו את השן בכתר (החלק העליון) ולא בשורש. אל תשפשפו או תנקו את השורש. אם אפשרי, הכניסו את השן בעדינות חזרה לחור ממנו נעקרה. 
                      אם לא, שימו אותה בכלי עם חלב או תמיסת מלח מיוחדת לשימור שיניים (אם יש). כשל אפשרות אחרת, ילדים בוגרים יכולים להחזיק את השן בפה (בין הלחי והחניכיים).
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-dental-beige/30">
              <AccordionTrigger className="text-dental-navy font-bold py-4">
                נוהל חירום במרפאה שלנו
              </AccordionTrigger>
              <AccordionContent className="text-dental-navy/80 pb-4">
                <div className="space-y-4">
                  <p>
                    במקרי חירום אנו משתדלים לקבל את הילד בהקדם האפשרי, בדרך כלל באותו יום. התקשרו למספר החירום שלנו 
                    <strong> 03-566-6915</strong> והשאירו פרטים. צוות המרפאה יחזור אליכם בהקדם עם הנחיות.
                  </p>
                  <p>
                    בכל מקרה של חבלה לראש המלווה בבחילות, הקאות, בלבול או אובדן הכרה - פנו מיד לחדר מיון. בריאות הילד קודמת לכל, 
                    ורק לאחר שיקבל אישור רפואי נטפל בבעיות השיניים.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b-0">
              <AccordionTrigger className="text-dental-navy font-bold py-4">
                ערכת חירום דנטלית ביתית מומלצת
              </AccordionTrigger>
              <AccordionContent className="text-dental-navy/80 pb-4">
                <p className="mb-4">הכינו ערכת חירום דנטלית ביתית שתכיל:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>מספר הטלפון של המרפאה ומספר החירום שלנו</li>
                  <li>גזות סטריליות</li>
                  <li>כלי קטן עם מכסה הרמטי (לאחסון שן שנעקרה)</li>
                  <li>משככי כאבים מותאמים לגיל הילד</li>
                  <li>מי מלח (כפית מלח בכוס מים פושרים) - הכינו טרי בעת הצורך</li>
                  <li>כפפות חד פעמיות</li>
                  <li>מטליות נקיות</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default EmergencyCare;
