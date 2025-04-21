
export type TreatmentType = {
  icon: string;
  imageUrl: string;
  slug?: string;
  benefits?: {
    he: string[];
    en: string[];
    ru: string[];
    de: string[];
    ar: string[];
  };
  specialComponent?: boolean;
};

export const treatmentTypes: Record<string, TreatmentType> = {
  'children-dentistry': {
    icon: 'children.jpg',
    imageUrl: '/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg',
    slug: 'children-dentistry',
    specialComponent: true,
    benefits: {
      he: [
        'גישה מותאמת אישית וטיפול עדין',
        'סביבה נעימה ומרגיעה לילדים',
        'צוות מנוסה בהרגעת חרדות',
        'חוויה חיובית בכל ביקור',
        'טיפולים מונעים ומשמרים'
      ],
      en: [
        'Personalized approach and gentle treatment',
        'Pleasant and calming environment for children',
        'Experienced team in relieving anxieties',
        'Positive experience on every visit',
        'Preventive and preservative treatments'
      ],
      ru: [
        'Индивидуальный подход и бережное лечение',
        'Приятная и успокаивающая обстановка для детей',
        'Опытная команда по снятию тревожности',
        'Положительный опыт при каждом посещении',
        'Профилактические и сохраняющие процедуры'
      ],
      de: [
        'Personalisierter Ansatz und sanfte Behandlung',
        'Angenehme und beruhigende Umgebung für Kinder',
        'Erfahrenes Team zur Angstlinderung',
        'Positive Erfahrung bei jedem Besuch',
        'Vorbeugende und erhaltende Behandlungen'
      ],
      ar: [
        'نهج مخصص وعلاج لطيف',
        'بيئة لطيفة ومهدئة للأطفال',
        'فريق ذو خبرة في تخفيف القلق',
        'تجربة إيجابية في كل زيارة',
        'علاجات وقائية ومحافظة'
      ]
    }
  },
  'aesthetic-treatments': {
    icon: 'aesthetic.jpg',
    imageUrl: '/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg',
    slug: 'aesthetic-treatments',
    benefits: {
      he: [
        'טיפולים מתקדמים להלבנת שיניים',
        'ציפויי חרסינה איכותיים',
        'תוצאות טבעיות ומרשימות',
        'שיפור הביטחון העצמי',
        'זמן התאוששות מינימלי'
      ],
      en: [
        'Advanced teeth whitening treatments',
        'High-quality porcelain veneers',
        'Natural and impressive results',
        'Improved self-confidence',
        'Minimal recovery time'
      ],
      ru: [
        'Современные процедуры отбеливания зубов',
        'Высококачественные фарфоровые виниры',
        'Естественные и впечатляющие результаты',
        'Повышение уверенности в себе',
        'Минимальное время восстановления'
      ],
      de: [
        'Fortschrittliche Zahnaufhellungsbehandlungen',
        'Hochwertige Porzellanveneers',
        'Natürliche und beeindruckende Ergebnisse',
        'Verbessertes Selbstvertrauen',
        'Minimale Erholungszeit'
      ],
      ar: [
        'علاجات متطورة لتبييض الأسنان',
        'قشرة البورسلين عالية الجودة',
        'نتائج طبيعية ومثيرة للإعجاب',
        'تحسين الثقة بالنفس',
        'وقت التعافي الأدنى'
      ]
    }
  },
  'preventive-medicine': {
    icon: 'preventive.jpg',
    imageUrl: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg',
    slug: 'preventive-medicine',
    benefits: {
      he: [
        'בדיקות תקופתיות מקיפות',
        'טיפולי ניקוי והסרת אבנית',
        'איתור מוקדם של בעיות',
        'ייעוץ לשמירה על היגיינת הפה',
        'מניעת טיפולים מורכבים בעתיד'
      ],
      en: [
        'Comprehensive periodic examinations',
        'Cleaning and scaling treatments',
        'Early detection of problems',
        'Consultation for maintaining oral hygiene',
        'Prevention of complex treatments in the future'
      ],
      ru: [
        'Комплексные периодические осмотры',
        'Процедуры чистки и удаления зубного камня',
        'Раннее выявление проблем',
        'Консультации по поддержанию гигиены полости рта',
        'Предотвращение сложных процедур в будущем'
      ],
      de: [
        'Umfassende regelmäßige Untersuchungen',
        'Reinigungs- und Zahnsteinentfernungsbehandlungen',
        'Frühzeitige Erkennung von Problemen',
        'Beratung zur Aufrechterhaltung der Mundhygiene',
        'Vorbeugung komplexer Behandlungen in der Zukunft'
      ],
      ar: [
        'فحوصات دورية شاملة',
        'علاجات التنظيف وإزالة الترسبات',
        'الكشف المبكر عن المشاكل',
        'استشارة للحفاظ على نظافة الفم',
        'منع العلاجات المعقدة في المستقبل'
      ]
    }
  },
  'root-canal': {
    icon: 'root-canal.jpg',
    imageUrl: '/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg',
    slug: 'root-canal',
    benefits: {
      he: [
        'טיפול נטול כאבים',
        'שימור השן הטבעית',
        'מניעת זיהומים',
        'פרוצדורה מהירה ויעילה',
        'החזרת פונקציונליות מלאה'
      ],
      en: [
        'Painless treatment',
        'Preservation of the natural tooth',
        'Prevention of infections',
        'Quick and efficient procedure',
        'Restoration of full functionality'
      ],
      ru: [
        'Безболезненное лечение',
        'Сохранение естественного зуба',
        'Предотвращение инфекций',
        'Быстрая и эффективная процедура',
        'Восстановление полной функциональности'
      ],
      de: [
        'Schmerzlose Behandlung',
        'Erhaltung des natürlichen Zahns',
        'Verhinderung von Infektionen',
        'Schnelles und effizientes Verfahren',
        'Wiederherstellung der vollen Funktionalität'
      ],
      ar: [
        'علاج غير مؤلم',
        'الحفاظ على الأسنان الطبيعية',
        'منع العدوى',
        'إجراء سريع وفعال',
        'استعادة الوظائف الكاملة'
      ]
    }
  },
  'oral-rehabilitation': {
    icon: 'rehabilitation.jpg',
    imageUrl: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg',
    slug: 'oral-rehabilitation',
    benefits: {
      he: [
        'שיקום פונקציונלי מלא של הפה',
        'שיפור היכולת ללעוס ולדבר',
        'שחזורים באיכות גבוהה',
        'שימוש בטכנולוגיות מתקדמות',
        'תוצאות אסתטיות מרשימות'
      ],
      en: [
        'Complete functional rehabilitation of the mouth',
        'Improved ability to chew and speak',
        'High-quality restorations',
        'Use of advanced technologies',
        'Impressive aesthetic results'
      ],
      ru: [
        'Полная функциональная реабилитация полости рта',
        'Улучшенная способность жевать и говорить',
        'Высококачественные реставрации',
        'Использование передовых технологий',
        'Впечатляющие эстетические результаты'
      ],
      de: [
        'Vollständige funktionelle Rehabilitation des Mundes',
        'Verbesserte Fähigkeit zu kauen und zu sprechen',
        'Hochwertige Restaurationen',
        'Einsatz fortschrittlicher Technologien',
        'Beeindruckende ästhetische Ergebnisse'
      ],
      ar: [
        'إعادة التأهيل الوظيفي الكامل للفم',
        'تحسين القدرة على المضغ والتحدث',
        'ترميمات عالية الجودة',
        'استخدام التقنيات المتقدمة',
        'نتائج جمالية مثيرة للإعجاب'
      ]
    }
  },
  'orthodontics': {
    icon: 'orthodontics.jpg',
    imageUrl: '/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg',
    slug: 'orthodontics',
    benefits: {
      he: [
        'יישור שיניים לחיוך מושלם',
        'שיפור תפקוד לעיסה',
        'אפשרויות טיפול שקופות',
        'תוצאות מהירות ויעילות',
        'טיפול מותאם אישית'
      ],
      en: [
        'Teeth straightening for a perfect smile',
        'Improved chewing function',
        'Clear treatment options',
        'Fast and efficient results',
        'Personalized treatment'
      ],
      ru: [
        'Выпрямление зубов для идеальной улыбки',
        'Улучшенная функция жевания',
        'Прозрачные варианты лечения',
        'Быстрые и эффективные результаты',
        'Индивидуальное лечение'
      ],
      de: [
        'Zahnbegradigung für ein perfektes Lächeln',
        'Verbesserte Kaufunktion',
        'Durchsichtige Behandlungsoptionen',
        'Schnelle und effiziente Ergebnisse',
        'Personalisierte Behandlung'
      ],
      ar: [
        'تقويم الأسنان للحصول على ابتسامة مثالية',
        'وظيفة مضغ محسنة',
        'خيارات علاج شفافة',
        'نتائج سريعة وفعالة',
        'علاج مخصص'
      ]
    }
  }
};

export const getTreatmentNameKey = (treatmentType: string): string => {
  switch(treatmentType) {
    case 'children-dentistry': return 'childrenDentistry';
    case 'aesthetic-treatments': return 'aestheticTreatments';
    case 'preventive-medicine': return 'preventiveMedicine';
    case 'root-canal': return 'rootCanal';
    case 'oral-rehabilitation': return 'oralRehabilitation';
    case 'orthodontics': return 'orthodontics';
    default: return '';
  }
};

export const getTreatmentDescKey = (treatmentType: string): string => {
  switch(treatmentType) {
    case 'children-dentistry': return 'childrenDentistryDesc';
    case 'aesthetic-treatments': return 'aestheticTreatmentsDesc';
    case 'preventive-medicine': return 'preventiveMedicineDesc';
    case 'root-canal': return 'rootCanalDesc';
    case 'oral-rehabilitation': return 'oralRehabilitationDesc';
    case 'orthodontics': return 'orthodonticsDesc';
    default: return '';
  }
};

// Helper to get benefits for a specific treatment and language
export const getTreatmentBenefits = (treatmentType: string, language: string): string[] => {
  const treatment = treatmentTypes[treatmentType];
  if (treatment?.benefits && treatment.benefits[language as keyof typeof treatment.benefits]) {
    return treatment.benefits[language as keyof typeof treatment.benefits];
  }
  // Fallback to Hebrew if the requested language is not available
  return treatment?.benefits?.he || [];
};
