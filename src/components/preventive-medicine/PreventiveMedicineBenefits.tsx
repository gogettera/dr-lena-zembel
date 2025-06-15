
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Calendar, LineChart, Search } from 'lucide-react';
import SectionHeader from '@/components/ui/section-header';

const PreventiveMedicineBenefits = () => {
  // יתרונות עם קופי מדויק
  const benefits = [
    {
      icon: Shield,
      title: "בריאות שמקדימה תרופה",
      description: "זיהוי מוקדם של בעיות – מונע טיפולים יקרים וכואבים בעתיד."
    },
    {
      icon: LineChart,
      title: "חיסכון בעלויות",
      description: "השקעה קטנה בשגרה – תחסוך לך בעיות גדולות וטיפולים קשים."
    },
    {
      icon: Calendar,
      title: "חיוך שמחזיק שנים",
      description: "בדיקות וניקוי סדירים שומרים על היופי והבריאות לכל החיים."
    },
    {
      icon: Search,
      title: "ליווי ותשומת לב אישית",
      description: "הצוות עוקב אחריך, מעדכן, דואג, ולצידך בזמינות מלאה תמיד."
    }
  ];

  return (
    <>
      <SectionHeader
        title="היתרונות בקליניקה של ד״ר זמבל"
        subtitle="בריאות, שלווה וחסכון – מהיום, הכל תלוי בך"
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-7 bg-white rounded-xl shadow-soft border border-dental-beige/30 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="bg-dental-beige/20 p-4 rounded-full mb-4">
                <benefit.icon className="h-8 w-8 text-dental-orange" />
              </div>
              <h3 className="text-xl font-bold text-dental-navy mb-3">{benefit.title}</h3>
              <p className="text-dental-navy/70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PreventiveMedicineBenefits;

