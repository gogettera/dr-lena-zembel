import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Globe, Users, Award } from 'lucide-react';
import { NextGenImage } from '@/components/ui/next-gen-image';
import { TranslatedText } from '@/components/ui/translated-text';

const DoctorStorySection: React.FC = () => {
  const achievements = [
    {
      icon: Globe,
      title: 'השכלה בינלאומית',
      description: 'בוגרת אוניברסיטת קלן הנחשבת, גרמניה'
    },
    {
      icon: Users,
      title: 'מטופלים מרוצים',
      description: 'יותר מ-2000 מטופלים קיבלו טיפול מעולה'
    },
    {
      icon: Award,
      title: 'מומחיות מוכחת',
      description: '13 שנות ניסיון בטיפולים מתקדמים'
    },
    {
      icon: Heart,
      title: 'יחס אישי',
      description: 'כל מטופל מקבל יחס מותאם אישית'
    }
  ];

  return (
    <section className="premium-section bg-white">
      <div className="premium-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Doctor Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative inline-block">
              {/* Multiple layered backgrounds for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-dental-primary/10 to-dental-coral/10 rounded-3xl blur-xl transform rotate-3 scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-dental-mint/10 to-dental-gold/10 rounded-3xl blur-lg transform -rotate-2 scale-102"></div>
              
              <div className="relative premium-card border-0 shadow-floating">
                <NextGenImage
                  src="/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
                  alt="ד״ר לנה זמבל - רופאת שיניים מומחית"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover rounded-3xl"
                  priority
                />
                
                {/* Floating achievement badge */}
                <div className="absolute -bottom-8 -right-8 premium-glass p-6 rounded-2xl shadow-floating max-w-[280px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-dental-gold/10 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-dental-gold" />
                    </div>
                    <div>
                      <div className="text-dental-navy font-bold">98% הצלחה</div>
                      <div className="text-sm text-dental-navy/70">בטיפולים מורכבים</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-dental-navy mb-6 animate-premium-slide-up">
                <TranslatedText textKey="trust.doctor.title" defaultText="פגשו את ד״ר לנה זמבל" />
              </h2>
              <p className="premium-text-large text-dental-navy/80 mb-6 animate-delay-200">
                <TranslatedText 
                  textKey="trust.doctor.intro" 
                  defaultText="המומחית שמביאה יחד את הטוב של שני עולמות - הדיוק והטכנולוגיה הגרמנית, עם החום והיחס האישי הישראלי"
                />
              </p>
            </div>

            {/* Personal story */}
            <Card className="premium-card bg-gradient-to-br from-dental-cream/30 to-white mb-8 animate-delay-300">
              <CardContent className="p-8">
                <blockquote className="premium-text-body text-dental-navy leading-relaxed italic">
                  <TranslatedText 
                    textKey="trust.doctor.quote" 
                    defaultText="״החלום שלי תמיד היה לשלב בין המצוינות הרפואית הגבוהה ביותר לבין יחס אנושי וחם. כל מטופל שמגיע אליי מקבל לא רק טיפול רפואי מתקדם, אלא גם הבנה, סבלנות ודאגה אמיתית לרווחתו. זו לא עבודה בשבילי - זו שליחות.״"
                  />
                </blockquote>
                <div className="mt-4 text-dental-primary font-semibold">
                  - ד״ר לנה זמבל
                </div>
              </CardContent>
            </Card>

            {/* Achievements grid */}
            <div className="grid grid-cols-2 gap-4 animate-delay-400">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-4 premium-card">
                  <div className="w-10 h-10 bg-dental-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <achievement.icon className="h-5 w-5 text-dental-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-dental-navy text-sm mb-1">
                      {achievement.title}
                    </div>
                    <div className="text-xs text-dental-navy/70 leading-tight">
                      {achievement.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="mt-8 animate-delay-500">
              <div className="premium-text-small text-dental-navy/70 mb-2">מדברת שפות:</div>
              <div className="flex flex-wrap gap-2">
                {['עברית', 'גרמנית', 'אנגלית', 'רוסית'].map((language, index) => (
                  <span key={index} className="bg-dental-primary/10 text-dental-primary px-3 py-1 rounded-full text-xs font-medium">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorStorySection;