import React, { useState } from 'react';
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
import { TranslatedText } from '@/components/ui/translated-text';
import { TreatmentOverview } from './TreatmentOverview';

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
  const [activeTab, setActiveTab] = useState('overview');

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

    // Try treatment-specific benefits first
    const treatmentBenefits = t(`${camelCaseType}.benefits.items`, { returnObjects: true, returnNull: true });
    if (Array.isArray(treatmentBenefits) && treatmentBenefits.length > 0 && treatmentBenefits[0]?.title) {
      return treatmentBenefits.map((b: any) => b.title || "").filter(Boolean);
    }

    // Try from treatments namespace
    const namespacedBenefits = t(`treatments.${camelCaseType}.benefits.items`, { returnObjects: true, returnNull: true });
    if (Array.isArray(namespacedBenefits) && namespacedBenefits.length > 0 && namespacedBenefits[0]?.title) {
      return namespacedBenefits.map((b: any) => b.title || "").filter(Boolean);
    }

    // Generic fallbacks
    const genericBenefits = t('treatments.benefits.items', { returnObjects: true, returnNull: true });
    if (Array.isArray(genericBenefits) && genericBenefits.length > 0 && genericBenefits[0]?.title) {
      return genericBenefits.map((b: any) => b.title || "").filter(Boolean);
    }

    // Hardcoded fallbacks per treatment type
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

  // Enhanced tab labels with fallbacks
  const getTabLabel = (key: string, fallback: string) => {
    const translated = t(`treatments.tabs.${key}`, fallback);
    return translated.includes('[he:') ? fallback : translated;
  };

  const tabs = [
    { id: 'overview', label: getTabLabel('overview', 'סקירה כללית') },
    { id: 'procedure', label: getTabLabel('procedure', 'תהליך הטיפול') },
    { id: 'benefits', label: getTabLabel('benefits', 'יתרונות') },
    { id: 'faq', label: getTabLabel('faq', 'שאלות נפוצות') },
    { id: 'testimonials', label: getTabLabel('testimonials', 'המלצות') },
    { id: 'related', label: getTabLabel('related', 'טיפולים קשורים') }
  ];

  return (
    <div className="w-full mt-4">
      {/* Enhanced landing page banner */}
      {hasLandingPage && (
        <Card className="mb-8 border-dental-orange/30 bg-gradient-to-r from-dental-orange/5 to-dental-pink/5 hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center lg:text-right">
                <h3 className="font-bold text-lg md:text-xl text-dental-navy mb-2">
                  <TranslatedText textKey="treatments.fullExperience" defaultText="החוויה המלאה" />
                </h3>
                <p className="text-dental-navy/70 leading-relaxed">
                  <TranslatedText 
                    textKey="treatments.viewCompleteLandingPage" 
                    defaultText="צפו בדף הנחיתה המלא עם כל הפרטים והמידע" 
                  />
                </p>
              </div>
              <Link to={createLocalizedPath(language, `/treatments/${treatmentType}/landing`)}>
                <Button 
                  variant="orange" 
                  size="lg" 
                  className="flex items-center gap-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <TranslatedText textKey="treatments.viewFullPage" defaultText="צפו בדף המלא" />
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced tabs with mobile-friendly design */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile-optimized tab list */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <TabsList className="flex w-max min-w-full lg:w-full gap-1 p-1 bg-dental-beige/30 rounded-xl">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id}
                className="flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-dental-navy data-[state=active]:shadow-sm hover:bg-white/50"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {/* Enhanced tab content */}
        <TabsContent value="overview" className="space-y-0">
          <TreatmentOverview 
            treatmentNameKey={treatmentNameKey}
            treatmentDescKey={treatmentDescKey}
            benefits={benefits}
          />
        </TabsContent>
        
        <TabsContent value="procedure">
          <TreatmentProcedure treatmentType={treatmentType} />
        </TabsContent>
        
        <TabsContent value="benefits">
          <Card className="shadow-soft hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6 md:p-8">
              <TreatmentBenefits benefits={benefits} showBooking={false} />
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
