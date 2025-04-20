
import { Language } from '@/contexts/LanguageContext';

export type FAQ = {
  question: string;
  answer: string;
};

export const getFAQs = (language: Language): FAQ[] => {
  switch (language) {
    case 'he':
      return [
        {
          question: "האם הטיפולים כואבים?",
          answer: "אנחנו עושים הכל כדי שלא תרגישו כאב. במרפאה שלנו משתמשים בטכנולוגיות מתקדמות, הרדמה מקומית יעילה, וסבלנות אינסופית."
        },
        {
          question: "איך מתכוננים לטיפול?",
          answer: "אין צורך בהכנה מיוחדת. מומלץ להגיע רגועים ולהביא מסמכים רפואיים קודמים אם יש."
        },
        {
          question: "האם אתם מקבלים ילדים?",
          answer: "בהחלט! אנחנו מתמחים בטיפולי ילדים, עם גישה עדינה ומותאמת אישית בסביבה ידידותית."
        },
        {
          question: "מה העלות של הטיפולים?",
          answer: "המחיר משתנה לפי סוג הטיפול. אנחנו מספקים הצעת מחיר מפורטת בפגישת הייעוץ הראשונה."
        }
      ];
    case 'en':
      return [
        {
          question: "Are the treatments painful?",
          answer: "We do everything to minimize pain. Our clinic uses advanced technologies, effective local anesthesia, and has endless patience."
        },
        {
          question: "How should I prepare for treatment?",
          answer: "No special preparation is needed. Just come relaxed and bring any previous medical documents if you have them."
        },
        {
          question: "Do you treat children?",
          answer: "Absolutely! We specialize in pediatric dentistry with a gentle, personalized approach in a friendly environment."
        },
        {
          question: "What are the treatment costs?",
          answer: "Costs vary by treatment type. We provide a detailed quote during your first consultation."
        }
      ];
    // ... Add other languages similarly
    default:
      return [];
  }
};
