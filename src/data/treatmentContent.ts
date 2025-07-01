
import { LucideIcon } from 'lucide-react';

export interface TreatmentContent {
  slug: string;
  hero: {
    title: string;
    subtitle: string;
    features: string[];
    imageUrl: string;
  };
  whyChooseUs: {
    title: string;
    subtitle: string;
    stats: Array<{
      number: string;
      label: string;
      icon: string;
    }>;
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  process: {
    title: string;
    subtitle: string;
    steps: Array<{
      title: string;
      description: string;
      duration?: string;
    }>;
  };
  benefits: {
    title: string;
    health: {
      title: string;
      items: string[];
    };
    aesthetic: {
      title: string;
      items: string[];
    };
  };
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      age: number;
      treatment: string;
      rating: number;
      date: string;
      text: string;
      verified: boolean;
    }>;
  };
}

export const treatmentContent: Record<string, TreatmentContent> = {
  'orthodontics': {
    slug: 'orthodontics',
    hero: {
      title: 'יישור שיניים מתקדם - חיוך ישר ובריא לכל הגילאים',
      subtitle: 'טיפולי יישור מותאמים עם טכנולוגיות חדישות לתוצאה מושלמת ונוחה',
      features: [
        'מתקנים שקופים (אינביזיליין)',
        'גישרונים אסתטיים',
        'תכנון תלת-ממדי מתקדם',
        'מעקב צמוד ומקצועי'
      ],
      imageUrl: '/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg'
    },
    whyChooseUs: {
      title: 'למה לבחור בנו ליישור שיניים?',
      subtitle: 'המומחיות, הטכנולוגיה והניסיון שמבטיחים לכם את התוצאה הטובה ביותר',
      stats: [
        { number: '1500+', label: 'מטופלי יישור מוצלחים', icon: 'Users' },
        { number: '97%', label: 'שביעות רצון', icon: 'Star' },
        { number: '13+', label: 'שנות ניסיון', icon: 'Clock' },
        { number: '3', label: 'התמחויות מתקדמות', icon: 'Award' }
      ],
      features: [
        {
          title: 'טכנולוגיית הדמיה 3D',
          description: 'תכנון מדויק של תנועת השיניים וחיזוי התוצאה המדויק',
          icon: 'Microscope'
        },
        {
          title: 'מתקנים שקופים מתקדמים',
          description: 'אינביזיליין ומתקנים אסתטיים לנוחות מירבית',
          icon: 'Shield'
        },
        {
          title: 'מומחיות ביישור מבוגרים',
          description: 'התמחות בטיפולי יישור למבוגרים ובני נוער',
          icon: 'Award'
        },
        {
          title: 'מעקב מתמיד',
          description: 'ביקורי מעקב סדירים והתאמות מדויקות',
          icon: 'Clock'
        }
      ]
    },
    process: {
      title: 'תהליך הטיפול המקצועי שלנו',
      subtitle: 'כל שלב מתוכנן בקפידה למען התוצאה הטובה ביותר',
      steps: [
        {
          title: 'בדיקה ראשונית מקיפה',
          description: 'בדיקה קלינית, צילומי רנטגן ותכנון הטיפול המתאים',
          duration: '60-90 דקות'
        },
        {
          title: 'התקנת המתקן',
          description: 'התקנה מדויקת ונוחה של מתקן היישור',
          duration: '60-120 דקות'
        },
        {
          title: 'ביקורי מעקב והתאמות',
          description: 'ביקורים סדירים להתאמת המתקן ומעקב התקדמות',
          duration: '30-45 דקות'
        }
      ]
    },
    benefits: {
      title: 'היתרונות הרפואיים של יישור שיניים',
      health: {
        title: 'יתרונות בריאותיים',
        items: [
          'שיפור היגיינת הפה והפחתת סיכון לעששת',
          'מניעת מחלות חניכיים',
          'הפחתת שחיקת שיניים לא תקינה',
          'שיפור תפקוד הלעיסה והעיכול'
        ]
      },
      aesthetic: {
        title: 'יתרונות אסתטיים',
        items: [
          'חיוך יפה וסימטרי',
          'שיפור פרופורציות הפנים',
          'עלייה בביטחון העצמי',
          'מראה צעיר יותר'
        ]
      }
    },
    faq: {
      title: 'שאלות נפוצות',
      items: [
        {
          question: 'האם יישור שיניים מתאים רק לילדים?',
          answer: 'לא! מבוגרים ובני נוער עוברים היום טיפולי יישור, והטכנולוגיות החדישות הופכות את התהליך לנוח ויעיל בכל גיל.'
        },
        {
          question: 'כמה זמן אורך טיפול ממוצע?',
          answer: 'רוב התהליכים נעים בין שנה לשנתיים, תלוי במורכבות ובשיטת היישור.'
        },
        {
          question: 'האם אפשר יישור סמוי?',
          answer: 'בהחלט. אנו מציעים מתקנים שקופים וטכניקות גישרונים סמויים - לפי צרכי המטופל.'
        },
        {
          question: 'האם יש כאב במהלך הטיפול?',
          answer: 'לעיתים יש אי נוחות בשעות הראשונות לאחר התקנת המתקן, אך היא חולפת במהירות.'
        }
      ]
    },
    testimonials: {
      title: 'מה אומרים המטופלים שלנו?',
      subtitle: 'עדויות אמיתיות של מטופלים שחוו את הטיפול המקצועי שלנו',
      items: [
        {
          name: 'שרה כ.',
          age: 28,
          treatment: 'יישור באינביזיליין',
          rating: 5,
          date: 'נובמבר 2024',
          text: 'הטיפול באינביזיליין היה מושלם! ד״ר זמבל הסבירה כל שלב, והתוצאה עברה את הציפיות. החיוך שלי השתנה לגמרי.',
          verified: true
        },
        {
          name: 'דוד ר.',
          age: 35,
          treatment: 'גישרונים קרמיים',
          rating: 5,
          date: 'אוקטובר 2024',
          text: 'בגיל 35 החלטתי ליישר שיניים. הצוות מקצועי והטיפול היה נוח. שנתיים אחרי והתוצאה מדהימה!',
          verified: true
        },
        {
          name: 'מיכל ל.',
          age: 16,
          treatment: 'גישרונים מתכתיים',
          rating: 5,
          date: 'ספטמבר 2024',
          text: 'הצוות הפך את הטיפול לחוויה נעימה. הכל מוסבר בסבלנות והתוצאה מעבר למה שחלמתי.',
          verified: true
        }
      ]
    }
  }
};

export const getTreatmentContent = (slug: string): TreatmentContent | null => {
  return treatmentContent[slug] || null;
};
