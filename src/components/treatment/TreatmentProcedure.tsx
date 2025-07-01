
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, Microscope, Shield, Stethoscope } from 'lucide-react';
import { TranslatedText } from '@/components/ui/translated-text';

interface TreatmentProcedureProps {
  treatmentType: string;
}

const TreatmentProcedure: React.FC<TreatmentProcedureProps> = ({ treatmentType }) => {
  const getProcedureSteps = (type: string) => {
    const procedures: Record<string, Array<{
      step: number;
      title: string;
      description: string;
      duration: string;
      icon: React.ReactNode;
      medicalNotes?: string;
    }>> = {
      'root-canal': [
        {
          step: 1,
          title: 'בדיקה וצילום רנטגן דיגיטלי',
          description: 'בדיקה קלינית מקיפה וצילום רנטגן תלת-ממדי (CBCT) להערכת מצב השורש ותכנון הטיפול המדויק',
          duration: '15-20 דקות',
          icon: <Microscope className="h-5 w-5 text-dental-orange" />,
          medicalNotes: 'שימוש בטכנולוגיית רנטגן דיגיטלי עם חשיפה מופחתת ב-90%'
        },
        {
          step: 2,
          title: 'הרדמה מקומית מתקדמת',
          description: 'הרדמה עדינה ויעילה באמצעות חומרי הרדמה איכותיים ובטוחים לטיפול נוח לחלוטין',
          duration: '5-10 דקות',
          icon: <Shield className="h-5 w-5 text-dental-orange" />,
          medicalNotes: 'שימוש בחומרי הרדמה ללא אפינפרין במקרים מתאימים'
        },
        {
          step: 3,
          title: 'פתיחה ונקיון תעלות השורש',
          description: 'פתיחת השן והסרת הרקמה הפגועה והנגועה מתעלות השורש באמצעות מכשור מתקדם',
          duration: '30-45 דקות',
          icon: <Stethoscope className="h-5 w-5 text-dental-orange" />,
          medicalNotes: 'שימוש במכשירי רוטרי מתקדמים מתוצרת גרמניה'
        },
        {
          step: 4,
          title: 'חיטוי וחיקוי תעלות השורש',
          description: 'ניקוי יסודי וחיטוי התעלות באמצעות חומרי חיטוי מתקדמים להבטחת הדבקה מלאה',
          duration: '20-30 דקות',
          icon: <CheckCircle className="h-5 w-5 text-dental-orange" />,
          medicalNotes: 'שימוש בחומרי חיטוי בטוחים ויעילים כנגד חיידקים עמידים'
        },
        {
          step: 5,
          title: 'מילוי ואיטום התעלות',
          description: 'מילוי התעלות בחומר איטום ביולוגי ושחזור השן לתפקוד ומראה מלאים',
          duration: '25-35 דקות',
          icon: <Shield className="h-5 w-5 text-dental-orange" />,
          medicalNotes: 'שימוש בחומרי מילוי מתקדמים עם תכונות אנטי-בקטריאליות'
        }
      ]
    };

    return procedures[type] || procedures['root-canal'];
  };

  const procedureSteps = getProcedureSteps(treatmentType);
  const totalDuration = treatmentType === 'root-canal' ? '90-140 דקות' : '60-90 דקות';

  return (
    <Card className="shadow-soft hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 md:p-8 space-y-8">
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-dental-navy">
            <TranslatedText textKey="treatments.procedure.title" defaultText="תהליך הטיפול המקצועי" />
          </h3>
          <p className="text-dental-navy/70 mb-4">
            <TranslatedText 
              textKey="treatments.procedure.note" 
              defaultText="כל טיפול מותאם אישית לצרכי המטופל הספציפיים על פי פרוטוקולים רפואיים מתקדמים"
            />
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock className="h-4 w-4 text-dental-orange" />
            <Badge variant="outline" className="border-dental-orange text-dental-orange">
              משך כולל: {totalDuration}
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          {procedureSteps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < procedureSteps.length - 1 && (
                <div className="absolute right-4 top-12 w-0.5 h-16 bg-dental-beige/60"></div>
              )}
              
              <div className="flex gap-4 p-4 rounded-lg bg-gradient-to-l from-dental-beige/10 to-transparent border border-dental-beige/30 hover:border-dental-orange/30 transition-colors duration-300">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-dental-orange/10 rounded-full flex items-center justify-center mb-2">
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary" className="text-xs">
                      שלב {step.step}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-dental-navy text-base">
                      {step.title}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-dental-navy/60">
                      <Clock className="h-3 w-3" />
                      <span>{step.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-dental-navy/80 text-sm leading-relaxed mb-3">
                    {step.description}
                  </p>
                  
                  {step.medicalNotes && (
                    <div className="flex items-start gap-2 p-2 bg-blue-50/50 rounded border border-blue-100">
                      <AlertCircle className="h-3 w-3 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-700">
                        <strong>הערה רפואית:</strong> {step.medicalNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Medical Standards Notice */}
        <div className="bg-green-50/50 rounded-lg p-4 border border-green-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-800 mb-1">
                תקני רפואה ובטיחות
              </h4>
              <p className="text-sm text-green-700">
                כל הטיפולים מבוצעים בהתאם לתקני משרד הבריאות והנחיות האיגוד הישראלי לרפואת שיניים. 
                המרפאה עוברת ביקורות איכות שנתיות ומקיימת פרוטוקולי סטריליזציה מחמירים.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentProcedure;
