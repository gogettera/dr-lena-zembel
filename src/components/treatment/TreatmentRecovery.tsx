
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, AlertTriangle, CheckCircle, Phone } from 'lucide-react';
import { TranslatedText } from '@/components/ui/translated-text';

interface TreatmentRecoveryProps {
  treatmentType: string;
}

const TreatmentRecovery: React.FC<TreatmentRecoveryProps> = ({ treatmentType }) => {
  const getRecoveryInfo = (type: string) => {
    const recoveryData: Record<string, {
      timeline: Array<{ period: string; description: string; }>;
      instructions: string[];
      warningSignsTitle: string;
      warningSigns: string[];
      followupTitle: string;
      followup: string[];
    }> = {
      'root-canal': {
        timeline: [
          {
            period: 'שעות 0-24',
            description: 'תחושת אי נוחות קלה עד בינונית. השתמשו במשככי כאבים לפי הוראות הרופא.'
          },
          {
            period: 'ימים 2-3',
            description: 'הכאב אמור להפחת משמעותית. המשיכו בהיגיינת פה עדינה.'
          },
          {
            period: 'שבוע 1',
            description: 'רוב האי נוחות אמורה לחלוף. ניתן לחזור לאכילה רגילה בזהירות.'
          },
          {
            period: 'שבועיים',
            description: 'השן אמורה להרגיש רגילה. חשוב לקבוע תור לביקורת מעקב.'
          }
        ],
        instructions: [
          'הימנעו מאכילה קשה או דביקה למשך 24 שעות',
          'השתמשו במשככי כאבים לפי הצורך (איבופרופן או פרצטמול)',
          'שטפו בעדינות במי מלח חמים 2-3 פעמים ביום',
          'המשיכו בצחצוח שיניים רגיל אך בעדינות באזור המטופל',
          'הימנעו מעישון ושתיית אלכוהול למשך 48 שעות',
          'לעסו בצד השני של הפה בימים הראשונים'
        ],
        warningSignsTitle: 'פנו לרופא מיידית במקרה של:',
        warningSigns: [
          'כאב חריף ומתגבר שלא נרגע עם משככי כאבים',
          'נפיחות קשה בפנים או בחניכיים',
          'חום גבוה מעל 38 מעלות',
          'הפרשה או ריח רע מהאזור המטופל',
          'אובדן הסתימה הזמנית',
          'רגישות יתר שנמשכת מעבר לשבוע'
        ],
        followupTitle: 'מעקב רפואי חשוב:',
        followup: [
          'ביקורת מעקב תיקבע תוך שבועיים מהטיפול',
          'הרופא יבדוק את תהליך הריפוי ויתאם את השלב הבא',
          'במקרים מסוימים יידרש טיפול נוסף או התקנת כתר',
          'חשוב לא לדחות את ביקורת המעקב'
        ]
      }
    };

    return recoveryData[type] || recoveryData['root-canal'];
  };

  const recoveryInfo = getRecoveryInfo(treatmentType);

  return (
    <Card className="shadow-soft hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 md:p-8 space-y-8">
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-dental-navy">
            <TranslatedText textKey="treatments.recovery.title" defaultText="תהליך ההחלמה" />
          </h3>
          <p className="text-dental-navy/70">
            <TranslatedText 
              textKey="treatments.recovery.description" 
              defaultText="מידע חשוב על תקופת ההחלמה לאחר טיפול שורש"
            />
          </p>
        </div>

        {/* Recovery Timeline */}
        <div>
          <h4 className="text-lg font-semibold text-dental-navy mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-dental-orange" />
            <TranslatedText textKey="treatments.recovery.timeline" defaultText="לוח זמנים להחלמה" />
          </h4>
          <div className="space-y-4">
            {recoveryInfo.timeline.map((item, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-lg bg-dental-beige/20">
                <div className="flex-shrink-0 w-20 text-sm font-semibold text-dental-orange">
                  {item.period}
                </div>
                <div className="flex-1 text-dental-navy/80">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Instructions */}
        <div>
          <h4 className="text-lg font-semibold text-dental-navy mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-dental-orange" />
            <TranslatedText textKey="treatments.recovery.instructions" defaultText="הוראות לאחר הטיפול" />
          </h4>
          <div className="grid gap-3">
            {recoveryInfo.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50 border border-green-100">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-dental-navy/80 text-sm">{instruction}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Signs */}
        <Alert className="border-red-200 bg-red-50/50">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertDescription>
            <div className="space-y-3">
              <h4 className="font-semibold text-red-800">
                {recoveryInfo.warningSignsTitle}
              </h4>
              <ul className="space-y-2">
                {recoveryInfo.warningSigns.map((sign, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-red-700">
                    <AlertTriangle className="h-3 w-3 text-red-600 flex-shrink-0 mt-0.5" />
                    {sign}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 mt-4 p-3 bg-red-100 rounded-lg">
                <Phone className="h-4 w-4 text-red-600" />
                <span className="text-sm font-semibold text-red-800">
                  חירום: 03-566-6915
                </span>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Follow-up */}
        <div className="bg-dental-orange/5 rounded-lg p-6 border border-dental-orange/20">
          <h4 className="text-lg font-semibold text-dental-navy mb-3">
            {recoveryInfo.followupTitle}
          </h4>
          <ul className="space-y-2">
            {recoveryInfo.followup.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-dental-navy/80 text-sm">
                <div className="w-2 h-2 bg-dental-orange rounded-full flex-shrink-0 mt-2"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Medical Disclaimer */}
        <div className="text-xs text-dental-navy/60 text-center p-4 bg-gray-50 rounded-lg border">
          <TranslatedText 
            textKey="treatments.medical.disclaimer" 
            defaultText="המידע כאן מיועד למטרות הסברה בלבד ואינו מהווה תחליף לייעוץ רפואי מקצועי"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentRecovery;
