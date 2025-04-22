
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Calendar, LineChart, Search } from 'lucide-react';
import SectionHeader from '@/components/ui/section-header';

const PreventiveMedicineBenefits = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Shield,
      title: 'מניעת בעיות',
      description: 'מניעת עששת ובעיות חניכיים מבעוד מועד'
    },
    {
      icon: LineChart,
      title: 'חיסכון כלכלי',
      description: 'חיסכון משמעותי בהוצאות על טיפולי שיניים'
    },
    {
      icon: Calendar,
      title: 'שמירה לטווח ארוך',
      description: 'שמירה על חיוך בריא ומראה אסתטי לאורך זמן'
    },
    {
      icon: Search,
      title: 'איתור מוקדם',
      description: 'איתור מוקדם של בעיות פוטנציאליות'
    }
  ];

  return (
    <>
      <SectionHeader
        title="היתרונות של רפואה מונעת"
        subtitle="מניעה היא המפתח לבריאות שיניים מושלמת"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-soft border border-dental-beige/30 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
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
