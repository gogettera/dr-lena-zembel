
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { createLocalizedPath } from '@/utils/languageRoutes';
import { getTreatmentInfo } from '@/data/treatmentRegistry';
import { TranslatedText } from '@/components/ui/translated-text';
import { TreatmentOverview } from './TreatmentOverview';
import { TreatmentTabContent } from './TreatmentTabContent';

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
  
  const treatmentInfo = getTreatmentInfo(treatmentType);
  const hasLandingPage = treatmentInfo?.hasLandingPage || false;

  // Enhanced benefits getter
  const getTreatmentBenefits = (type: string) => {
    const fallbackBenefits: Record<string, string[]> = {
      'children-dentistry': [
        'טיפול עדין ומותאם במיוחד לילדים',
        'סביבה חמה ותומכת שמקטינה פחדים',
        'צוות מקצועי עם ניסיון רב ברפואת שיניים לילדים',
        'דגש על מניעה וחינוך לבריאות הפה לטווח ארוך'
      ],
      'root-canal': [
        'טיפולים מדויקים ומהירים',
        'ללא כאב עם טכנולוגיה מתקדמת',
        'הצלת שיניים יקרות במקום עקירה',
        'החזרת ביטחון לחייך ולאכילה'
      ],
      'aesthetic-treatments': [
        'הלבנת שיניים מתקדמת ובטוחה',
        'ציפויי חרסינה דקים וחזקים',
        'כתרים אסתטיים מהטכנולוgiה המתקדמת',
        'שתלים איכותיים עם הבטחה לתוצאות ארוכות טווח'
      ],
      'preventive-medicine': [
        'בדיקות מתקדמות לזיהוי מוקדם של בעיות',
        'ניקוי מקצועי המחזיר רעננות לפה',
        'הדרכה אישית לשמירה על בריאות הפה',
        'חיסכון בעלויות טיפול בעתיד'
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

  const tabs = [
    { id: 'overview', label: t('treatments.tabs.overview', 'סקירה כללית') },
    { id: 'procedure', label: t('treatments.tabs.procedure', 'תהליך הטיפול') },
    { id: 'benefits', label: t('treatments.tabs.benefits', 'יתרונות') },
    { id: 'faq', label: t('treatments.tabs.faq', 'שאלות נפוצות') },
    { id: 'testimonials', label: t('treatments.tabs.testimonials', 'המלצות') },
    { id: 'related', label: t('treatments.tabs.related', 'טיפולים קשורים') }
  ];

  return (
    <div className="w-full mt-4">
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
        
        <TabsContent value="overview" className="space-y-0">
          <TreatmentOverview 
            treatmentNameKey={treatmentNameKey}
            treatmentDescKey={treatmentDescKey}
            benefits={benefits}
          />
        </TabsContent>
        
        {tabs.slice(1).map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            <TreatmentTabContent 
              tabType={tab.id}
              treatmentType={treatmentType}
              benefits={benefits}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TreatmentTabs;
