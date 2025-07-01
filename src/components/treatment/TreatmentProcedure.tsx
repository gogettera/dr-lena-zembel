
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TranslatedText } from '@/components/ui/translated-text';

interface TreatmentProcedureProps {
  treatmentType: string;
}

const TreatmentProcedure: React.FC<TreatmentProcedureProps> = ({ treatmentType }) => {
  const getProcedureSteps = (type: string) => {
    const procedures: Record<string, Array<{ title: string; description: string }>> = {
      'root-canal': [
        {
          title: 'בדיקה ואבחון מדויק',
          description: 'צילום רנטגן דיגיטלי להבנה מדויקת של מצב השן'
        },
        {
          title: 'הרדמה עדינה ויעילה',
          description: 'הרדמה מקומית שמבטיחה טיפול נוח לחלוטין'
        },
        {
          title: 'ניקוי וחיטוי השורש',
          description: 'הסרת הרקמה הפגועה וניקוי יסודי של תעלות השורש'
        },
        {
          title: 'סתימה וחיזוק השן',
          description: 'מילוי התעלות וחיזוק השן לעמידות לטווח ארוך'
        }
      ],
      'children-dentistry': [
        {
          title: 'היכרות ובניית אמון',
          description: 'פגישה ראשונית עם הילד והורים לבניית אמון וביטחון'
        },
        {
          title: 'בדיקה עדינה',
          description: 'בדיקת פה מתאימה לגיל עם הסברים פשוטים וידידותיים'
        },
        {
          title: 'טיפול מותאם',
          description: 'ביצוע הטיפול הנדרש בעדינות ובקצב המתאים לילד'
        },
        {
          title: 'חינוך והדרכה',
          description: 'הדרכת הילד וההורים לשמירה על בריאות הפה'
        }
      ],
      'aesthetic-treatments': [
        {
          title: 'ייעוץ והתאמה אישית',
          description: 'בחינת הצרכים האסתטיים ותכנון הטיפול המתאים'
        },
        {
          title: 'הכנת השיניים',
          description: 'הכנה מדויקת של השיניים לקבלת הטיפול האסתטי'
        },
        {
          title: 'ביצוע הטיפול',
          description: 'יישום הטיפול האסתטי בטכנולוגיה מתקדמת'
        },
        {
          title: 'גימור והתאמות',
          description: 'התאמות אחרונות להשגת תוצאה מושלמת'
        }
      ]
    };

    return procedures[type] || [
      {
        title: 'בדיקה ראשונית',
        description: 'הערכת מצב הפה והשיניים'
      },
      {
        title: 'תכנון הטיפול',
        description: 'הכנת תוכנית טיפול מותאמת אישית'
      },
      {
        title: 'ביצוע הטיפול',
        description: 'טיפול מקצועי ומדויק'
      },
      {
        title: 'מעקב והדרכה',
        description: 'הדרכה לשמירה על התוצאות'
      }
    ];
  };

  const steps = getProcedureSteps(treatmentType);

  return (
    <Card className="shadow-soft hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-dental-navy">
          <TranslatedText textKey="treatments.procedure.title" defaultText="תהליך הטיפול" />
        </h3>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4 p-4 rounded-lg bg-dental-beige/20 hover:bg-dental-beige/30 transition-colors duration-300">
              <div className="flex-shrink-0 w-8 h-8 bg-dental-orange text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-dental-navy mb-2">{step.title}</h4>
                <p className="text-dental-navy/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-dental-orange/5 rounded-lg border border-dental-orange/20">
          <p className="text-sm text-dental-navy/80 text-center">
            <TranslatedText 
              textKey="treatments.procedure.note" 
              defaultText="כל טיפול מותאם אישית לצרכי המטופל הספציפיים"
            />
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentProcedure;
