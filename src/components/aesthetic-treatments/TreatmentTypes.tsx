
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/components/ui/section-header";

const TreatmentTypes: React.FC = () => {
  const treatments = [
    {
      title: "הלבנת שיניים",
      description: "טיפול מתקדם להלבנת שיניים באופן משמעותי, מתאים לכל סוגי ההכתמות ומעניק תוצאות מרשימות כבר מהטיפול הראשון.",
      icon: "✨",
    },
    {
      title: "ציפויי חרסינה",
      description: "ציפויי חרסינה דקים ועמידים המודבקים לחזית השן, מתקנים פגמים, סדקים, או שיניים לא סימטריות ויוצרים חיוך טבעי ויפה.",
      icon: "🌟",
    },
    {
      title: "כתרים וגשרים",
      description: "שחזורים מחרסינה באיכות גבוהה, המעניקים פתרון אסתטי לשיניים שבורות או חסרות תוך שמירה על מראה טבעי ותפקוד מלא.",
      icon: "👑",
    },
    {
      title: "שתלים דנטליים",
      description: "פתרון אסתטי ופונקציונלי להחלפת שיניים חסרות, המשתלב בצורה מושלמת עם שאר השיניים ומאפשר חיוך טבעי ומלא.",
      icon: "🔄",
    },
    {
      title: "שחזורי קומפוזיט",
      description: "שחזורים אסתטיים המותאמים לצבע השן הטבעי, מתקנים שיניים שבורות או פגומות ויוצרים מראה טבעי ובריא.",
      icon: "🖌️",
    },
    {
      title: "יישור שיניים שקוף",
      description: "טכנולוגיה מתקדמת ליישור שיניים באמצעות סדרה של מיישרים שקופים נשלפים, המציעה פתרון אסתטי ונוח לשיניים עקומות.",
      icon: "😁",
    }
  ];

  return (
    <section id="treatments" className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#E5DEFF]/60 to-white">
      <div className="container mx-auto">
        <SectionHeader
          title="סוגי טיפולים אסתטיים"
          subtitle="מגוון פתרונות מתקדמים להשגת חיוך מושלם"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {treatments.map((treatment, index) => (
            <Card 
              key={index} 
              className="border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start">
                  <div className="bg-dental-pink/20 w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <span className="text-2xl">{treatment.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dental-navy mb-2">{treatment.title}</h3>
                    <p className="text-dental-navy/70 text-sm md:text-base">{treatment.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentTypes;
