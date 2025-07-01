
interface TreatmentSEO {
  title: string;
  description: string;
  keywords: string[];
  structuredData: Record<string, any>;
}

export const generateTreatmentSEO = (treatmentSlug: string, treatmentName: string): TreatmentSEO => {
  const baseKeywords = [
    'רופא שיניים',
    'מרפאת שיניים',
    'טיפול שיניים',
    'ד״ר לנה זמבל',
    'יפו',
    'תל אביב'
  ];

  const treatmentKeywords: Record<string, string[]> = {
    'orthodontics': [
      'יישור שיניים',
      'אינביזיליין',
      'גישרונים',
      'יישור למבוגרים',
      'מתקנים שקופים'
    ],
    'children-dentistry': [
      'רפואת שיניים לילדים',
      'רופא שיניים לילדים',
      'טיפול שיניים ילדים',
      'מניעה לילדים'
    ],
    'aesthetic-treatments': [
      'ציפויי חרסינה',
      'הלבנת שיניים',
      'אסתטיקה דנטלית',
      'חיוך הוליוודי'
    ],
    'preventive-medicine': [
      'רפואה מונעת',
      'ניקוי שיניים',
      'בדיקת שיניים',
      'מניעת עששת'
    ],
    'root-canal': [
      'טיפול שורש',
      'כאב שיניים',
      'הצלת שן',
      'טיפול ללא כאב'
    ],
    'oral-rehabilitation': [
      'שיקום הפה',
      'שתלים דנטליים',
      'כתרים',
      'גשרים'
    ],
    'botox-treatments': [
      'בוטוקס',
      'טיפולים אסתטיים',
      'הרמת גבות',
      'קמטים'
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": treatmentName,
    "description": `טיפול ${treatmentName} במרפאת ד״ר לנה זמבל ביפו`,
    "performer": {
      "@type": "Dentist",
      "name": "ד״ר לנה זמבל",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "רחוב בן צבי 2",
        "addressLocality": "יפו",
        "addressCountry": "IL"
      },
      "telephone": "03-566-6915"
    },
    "availableService": {
      "@type": "MedicalService",
      "name": treatmentName,
      "provider": {
        "@type": "Dentist",
        "name": "ד״ר לנה זמבל"
      }
    }
  };

  return {
    title: `${treatmentName} - מרפאת ד״ר לנה זמבל | יפו`,
    description: `טיפול ${treatmentName} מקצועי ומתקדם במרפאת ד״ר לנה זמבל ביפו. 13+ שנות ניסיון, טכנולוגיה מתקדמת ותוצאות מוכחות.`,
    keywords: [...baseKeywords, ...(treatmentKeywords[treatmentSlug] || [])],
    structuredData
  };
};

export const applyTreatmentSEO = (seoData: TreatmentSEO): void => {
  // Update title
  document.title = seoData.title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', seoData.description);
  }
  
  // Update keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
  metaKeywords.setAttribute('name', 'keywords');
  metaKeywords.setAttribute('content', seoData.keywords.join(', '));
  if (!document.querySelector('meta[name="keywords"]')) {
    document.head.appendChild(metaKeywords);
  }
  
  // Add structured data
  let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
  if (!structuredDataScript) {
    structuredDataScript = document.createElement('script');
    structuredDataScript.type = 'application/ld+json';
    document.head.appendChild(structuredDataScript);
  }
  structuredDataScript.textContent = JSON.stringify(seoData.structuredData);
};
