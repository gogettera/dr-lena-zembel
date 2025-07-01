
import { Users, Star, Clock, Award, Shield, Microscope } from 'lucide-react';

export interface TreatmentStat {
  icon: any;
  number: string;
  label: string;
}

export interface TreatmentFeature {
  icon: any;
  title: string;
  description: string;
}

export interface TreatmentWhyChooseUsData {
  stats: TreatmentStat[];
  features: TreatmentFeature[];
}

export const treatmentWhyChooseUsData: Record<string, TreatmentWhyChooseUsData> = {
  'root-canal': {
    stats: [
      { icon: Users, number: '2000+', label: 'טיפולי שורש מוצלחים' },
      { icon: Star, number: '98%', label: 'שיעור הצלחה' },
      { icon: Clock, number: '13+', label: 'שנות ניסיון' },
      { icon: Award, number: '4', label: 'הסמכות מקצועיות' }
    ],
    features: [
      {
        icon: Microscope,
        title: 'טכנולוגיה מתקדמת מגרמניה',
        description: 'מכשור רוטרי מתקדם ומיקרוסקופ דנטלי לדיוק מירבי'
      },
      {
        icon: Shield,
        title: 'הרדמה ללא כאב',
        description: 'טכנולוגיות הרדמה מתקדמות המבטיחות נוחות מלאה'
      },
      {
        icon: Award,
        title: 'מומחיות רפואית מוכחת',
        description: 'הכשרה בגרמניה והשתלמויות מתמידות באירופה'
      },
      {
        icon: Clock,
        title: 'זמינות לחירום',
        description: 'מענה רפואי זמין 24/7 למקרי חירום'
      }
    ]
  },
  'orthodontics': {
    stats: [
      { icon: Users, number: '1500+', label: 'מטופלי יישור מוצלחים' },
      { icon: Star, number: '97%', label: 'שביעות רצון' },
      { icon: Clock, number: '13+', label: 'שנות ניסיון' },
      { icon: Award, number: '3', label: 'התמחויות מתקדמות' }
    ],
    features: [
      {
        icon: Microscope,
        title: 'טכנולוגיית הדמיה 3D',
        description: 'תכנון מדויק של תנועת השיניים וחיזוי התוצאה'
      },
      {
        icon: Shield,
        title: 'מתקנים שקופים מתקדמים',
        description: 'אינביזיליין ומתקנים אסתטיים לנוחות מירבית'
      },
      {
        icon: Award,
        title: 'מומחיות ביישור מבוגרים',
        description: 'התמחות בטיפולי יישור למבוגרים ובני נוער'
      },
      {
        icon: Clock,
        title: 'מעקב מתמיד',
        description: 'ביקורי מעקב סדירים והתאמות מדויקות'
      }
    ]
  }
};

export const getWhyChooseUsData = (treatmentType: string): TreatmentWhyChooseUsData => {
  return treatmentWhyChooseUsData[treatmentType] || treatmentWhyChooseUsData['root-canal'];
};
