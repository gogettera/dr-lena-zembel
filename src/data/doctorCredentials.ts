
import { GraduationCap, Award, Users } from 'lucide-react';

export interface DoctorCredential {
  icon: any;
  title: string;
  details: string[];
}

export const doctorCredentials: DoctorCredential[] = [
  {
    icon: GraduationCap,
    title: 'השכלה רפואית',
    details: [
      'רופאת שיניים - אוניברסיטת תל אביב',
      'התמחות באנדודונטיה - גרמניה',
      'השתלמויות מתקדמות באירופה'
    ]
  },
  {
    icon: Award,
    title: 'הסמכות מקצועיות',
    details: [
      'חברה באיגוד הישראלי לרפואת שיניים',
      'הסמכה לטיפולי שורש מתקדמים',
      'רישיון משרד הבריאות'
    ]
  },
  {
    icon: Users,
    title: 'ניסיון קליני',
    details: [
      '13+ שנות ניסיון ברפואת שיניים',
      '2000+ טיפולי שורש מוצלחים',
      'מומחיות בטיפולים מורכבים'
    ]
  }
];
