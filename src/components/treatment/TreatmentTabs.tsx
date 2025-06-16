
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { createLocalizedPath } from '@/utils/languageRoutes';
import TreatmentBenefits from './TreatmentBenefits';
import TreatmentFAQ from './TreatmentFAQ';
import TreatmentTestimonials from './TreatmentTestimonials';
import TreatmentProcedure from './TreatmentProcedure';
import RelatedTreatments from './RelatedTreatments';

interface TreatmentTabsProps {
  treatmentType: string;
  treatmentNameKey: string;
  treatmentDescKey: string;
}

const TreatmentTabs: React.FC<TreatmentTabsProps> = ({
  treatmentType,
  treatmentNameKey,
  treatmentDescKey
}) => {
  const { t, language } = useLanguage();

  // Helper to convert kebab-case to camelCase
  const kebabToCamel = (s: string) => s.replace(/-./g, x => x[1].toUpperCase());

  // Treatments that have dedicated landing pages
  const treatmentsWithLandingPages = [
    'children-dentistry',
    'aesthetic-treatments', 
    'orthodontics',
    'root-canal',
    'oral-rehabilitation',
    'preventive-medicine'
  ];

  const hasLandingPage = treatmentsWithLandingPages.includes(treatmentType);

  // Enhanced benefits getter with multiple fallback strategies
  const getTreatmentBenefits = (type: string) => {
    const camelCaseType = kebabToCamel(type);

    // Strategy 1: Try treatment-specific benefits
    const treatmentBenefits = t(`${camelCaseType}.benefits.items`, { returnObjects: true, returnNull: true });
    if (Array.isArray(treatmentBenefits) && treatmentBenefits.length > 0 && treatmentBenefits[0]?.title) {
      return treatmentBenefits.map((b: any) => b.title || "").filter(Boolean);
    }

    // Strategy 2: Try from treatments namespace
    const namespacedBenefits = t(`treatments.${camelCaseType}.benefits.items`, { returnObjects: true, returnNull: true });
    if (Array.isArray(namespacedBenefits) && namespacedBenefits.length > 0 && namespacedBenefits[0]?.title) {
      return namespacedBenefits.map((b: any) => b.title || "").filter(Boolean);
    }

    // Strategy 3: Generic treatment benefits
    const genericBenefits = t('treatments.benefits.items', { returnObjects: true, returnNull: true });
    if (Array.isArray(genericBenefits) && genericBenefits.length > 0 && genericBenefits[0]?.title) {
      return genericBenefits.map((b: any) => b.title || "").filter(Boolean);
    }

    // Strategy 4: Base individual benefit keys
    const individualBenefits = [
      t('treatments.benefits.professional', ''),
      t('treatments.benefits.modern', ''),
      t('treatments.benefits.comfortable', ''),
      t('treatments.benefits.effective', '')
    ].filter(Boolean);

    if (individualBenefits.length > 0) {
      return individualBenefits;
    }

    // Strategy 5: Hardcoded fallbacks per treatment type
    const fallbackBenefits: Record<string, string[]> = {
      'children-dentistry': [
        'טיפול עדין ומותאם במיוחד לילדים',
        'סביבה חמה ותומכת שמקטינה פחדים',
        'צוות מקצועי עם ניסיון רב ברפואת שיניים לילדים',
        'דגש על מניעה וחינוך לבריאות הפה לטווח ארוך'
      ],
      'aesthetic-treatments': [
        'הלבנת שיניים מתקדמת ובטוחה',
        'ציפויי חרסינה דקים וחזקים',
        'כתרים אסתטיים מהטכנולוגיה המתקדמת',
        'שתלים איכותיים עם הבטחה לתוצאות ארוכות טווח'
      ],
      'preventive-medicine': [
        'בדיקות מתקדמות לזיהוי מוקדם של בעיות',
        'ניקוי מקצועי המחזיר רעננות לפה',
        'הדרכה אישית לשמירה על בריאות הפה',
        'חיסכון בעלויות טיפול בעתיד'
      ],
      'root-canal': [
        'טיפולים מדויקים ומהירים',
        'ללא כאב עם טכנולוגיה מתקדמת',
        'הצלת שיניים יקרות במקום עקירה',
        'החזרת ביטחון לחייך ולאכילה'
      ],
      'oral-rehabilitation': [
        'שיפור משמעותי ביכולת הלעיסה והדיבור',
        'שחזור מראה טבעי ואסתטי של השיניים',
        'פתרון ארוך טווח לבעיות שיניים מורכבות',
        'שיפור בביטחון העצמי ובאיכות החיים'
      ],
      'orthodontics': [
        'יישור שיניים לכל הגילאים',
        'מגוון פתרונות: מסורתי וקשתיות שקופות',
        'תכנון אישי עם מעקב צמוד',
        'תוצאות מושלמות לחיוך בטוח'
      ]
    };

    return fallbackBenefits[type] || [
      'טיפול מקצועי ואיכותי',
      'צוות מנוסה ומיומן',
      'טכנולוגיה מתקדמת',
      'תוצאות מוכחות'
    ];
  };

  const benefits = getTreatmentBenefits(treatmentType);

  // Tab labels with fallbacks
  const getTabLabel = (key: string, fallback: string) => {
    const translated = t(`treatments.tabs.${key}`, fallback);
    return translated.includes('[he:') ? fallback : translated;
  };

  return (
    <div className="w-full mt-4">
      {hasLandingPage && (
        <div className="mb-6 p-4 bg-dental-beige/20 rounded-lg border border-dental-orange/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-dental-navy mb-1">
                {t('treatments.fullExperience', 'החוויה המלאה')}
              </h3>
              <p className="text-sm text-dental-navy/70">
                {t('treatments.viewCompleteLandingPage', 'צפו בדף הנחיתה המלא עם כל הפרטים והמידע')}
              </p>
            </div>
            <Link to={createLocalizedPath(language, `/treatments/${treatmentType}/landing`)}>
              <Button variant="orange" size="sm" className="flex items-center gap-2">
                {t('treatments.viewFullPage', 'צפו בדף המלא')}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex flex-wrap mb-4 gap-2">
          <TabsTrigger value="overview">{getTabLabel('overview', 'סקירה כללית')}</TabsTrigger>
          <TabsTrigger value="procedure">{getTabLabel('procedure', 'תהליך הטיפול')}</TabsTrigger>
          <TabsTrigger value="benefits">{getTabLabel('benefits', 'יתרונות')}</TabsTrigger>
          <TabsTrigger value="faq">{getTabLabel('faq', 'שאלות נפוצות')}</TabsTrigger>
          <TabsTrigger value="testimonials">{getTabLabel('testimonials', 'המלצות')}</TabsTrigger>
          <TabsTrigger value="related">{getTabLabel('related', 'טיפולים קשורים')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardContent className="pt-4">
              <h3 className="text-lg font-bold mb-2">{t(treatmentNameKey)}</h3>
              <p className="mb-4">{t(treatmentDescKey)}</p>
              <div className="mb-2">
                <b>{t('treatments.keyPoints', 'נקודות מפתח:')}</b>
                <ul className="ml-4 mt-1 list-disc">
                  {benefits.map((benefit, index) =>
                    benefit ? (
                      <li key={index}>{benefit}</li>
                    ) : null
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="procedure">
          <TreatmentProcedure treatmentType={treatmentType} />
        </TabsContent>
        
        <TabsContent value="benefits">
          <Card>
            <CardContent className="pt-4">
              <TreatmentBenefits benefits={benefits} showBooking={true} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq">
          <TreatmentFAQ treatmentType={treatmentType} />
        </TabsContent>
        
        <TabsContent value="testimonials">
          <TreatmentTestimonials treatmentType={treatmentType} />
        </TabsContent>
        
        <TabsContent value="related">
          <RelatedTreatments currentTreatment={treatmentType} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TreatmentTabs;
