
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Phone, MessageCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TranslatedText } from '@/components/ui/translated-text';

interface TreatmentFAQProps {
  treatmentType: string;
}

const TreatmentFAQ: React.FC<TreatmentFAQProps> = ({ treatmentType }) => {
  const [openItems, setOpenItems] = React.useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getFAQData = (type: string) => {
    const faqData: Record<string, Array<{ q: string; a: string; category?: string; }>> = {
      'root-canal': [
        {
          q: 'האם טיפול שורש כואב?',
          a: 'עם הטכנולוגיות המתקדמות והרדמה יעילה, הטיפול כמעט ללא כאב. רוב המטופלים מדווחים על חוויה נוחה ומופתעים מכמה הטיפול היה פשוט. אנו משתמשים בחומרי הרדמה איכותיים ובטכניקות מתקדמות להבטחת נוחות מרבית.',
          category: 'כאב ונוחות'
        },
        {
          q: 'כמה זמן לוקח טיפול שורש?',
          a: 'רוב הטיפולים נמשכים בין 90-140 דקות בביקור אחד. במקרים מורכבים יותר, הטיפול עלול להידרש לשני ביקורים. אנו מתאימים את לוח הזמנים בהתאם למורכבות המקרה ולנוחות המטופל.',
          category: 'משך טיפול'
        },
        {
          q: 'מה שיעור ההצלחה של טיפול שורש?',
          a: 'שיעור ההצלחה של טיפול שורש במרפאתנו עומד על 95-98%, בהתאם למחקרים קליניים. עם טיפול נכון ומעקב מתאים, השן יכולה להחזיק כל החיים. אנו מספקים מעקב רפואי מתמיד להבטחת הצלחת הטיפול.',
          category: 'תוצאות'
        },
        {
          q: 'מה עדיף - טיפול שורש או עקירה ושתל?',
          a: 'שימור השן הטבעית הוא תמיד האפשרות הטובה ביותר. שתל הוא פתרון מצוין, אך שן טבעית מספקת חוש מגע טבעי ותפקוד מושלם. טיפול שורש מציל שיניים במקום להחליפן.',
          category: 'אלטרנטיבות טיפול'
        },
        {
          q: 'מה קורה אחרי טיפול השורש?',
          a: 'לאחר הטיפול תהיה אי-נוחות קלה למספר ימים, זה נורמלי לחלוטין. רוב המטופלים חוזרים לפעילות רגילה למחרת. חשוב לקבוע תור מעקב להתקנת כתר או סתימה קבועה תוך 2-3 שבועות.',
          category: 'לאחר הטיפול'
        },
        {
          q: 'האם צריך כתר אחרי טיפול שורש?',
          a: 'ברוב המקרים כן, כיוון שהשן הופכת שבירה יותר לאחר הטיפול. כתר מחזק את השן ומגן עליה לטווח ארוך. אנו נקבע יחד איתכם את הפתרון הטוב ביותר בהתאם למצב השן הספציפי.',
          category: 'טיפול המשך'
        },
        {
          q: 'כמה עולה טיפול שורש?',
          a: 'עלות הטיפול משתנה בהתאם למורכבות המקרה ומספר השורשים. אנו מספקים הצעת מחיר מפורטת לאחר הבדיקה הראשונית. זכרו שזה השקעה בשימור שן לכל החיים.',
          category: 'עלויות'
        },
        {
          q: 'מה אם הטיפול לא יצליח?',
          a: 'במקרים נדירים שהטיפול אינו מצליח, ישנן אפשרויות טיפול נוספות כמו טיפול שורש חוזר או ניתוח קצה שורש. אנו נדון יחד על כל האפשרויות ונבחר בפתרון הטוב ביותר.',
          category: 'סיבוכים'
        }
      ]
    };

    return faqData[type] || faqData['root-canal'];
  };

  const faqItems = getFAQData(treatmentType);

  return (
    <Card className="shadow-soft hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-dental-navy">
            <TranslatedText textKey="treatments.faq" defaultText="שאלות נפוצות" />
          </h3>
          <p className="text-dental-navy/70">
            תשובות מקצועיות לשאלות הנפוצות ביותר על הטיפול
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <Collapsible
              key={index}
              open={openItems.includes(index)}
              onOpenChange={() => toggleItem(index)}
            >
              <CollapsibleTrigger asChild>
                <button className="w-full text-right p-4 bg-dental-beige/10 hover:bg-dental-beige/20 rounded-lg border border-dental-beige/30 hover:border-dental-orange/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-dental-navy group-hover:text-dental-orange transition-colors duration-300">
                        {item.q}
                      </h4>
                      {item.category && (
                        <span className="text-xs text-dental-navy/60 mt-1 block">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-dental-navy/60 transition-transform duration-300 ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 bg-white rounded-lg border border-dental-beige/20 mt-2">
                  <p className="text-dental-navy/80 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* Contact CTA */}
        <Alert className="border-dental-orange/30 bg-dental-orange/5">
          <AlertTriangle className="h-4 w-4 text-dental-orange" />
          <AlertDescription>
            <div className="space-y-3">
              <p className="text-dental-navy font-medium">
                יש לכם שאלות נוספות? אנחנו כאן לעזור!
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-dental-orange text-dental-orange hover:bg-dental-orange hover:text-white"
                  onClick={() => window.location.href = 'tel:03-566-6915'}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  התקשרו עכשיו
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-dental-orange text-dental-orange hover:bg-dental-orange hover:text-white"
                  onClick={() => window.open('https://wa.me/972515666915', '_blank')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Medical Disclaimer */}
        <div className="text-xs text-dental-navy/60 text-center p-4 bg-gray-50 rounded-lg border">
          <TranslatedText 
            textKey="treatments.medical.disclaimer" 
            defaultText="המידע כאן מיועד למטרות הסברה בלבד ואינו מהווה תחליף לייעוץ רפואי מקצועי מרופא שיניים מוסמך"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentFAQ;
