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
        },
        {
          question: "האם יש אפשרות לתשלומים?",
          answer: "כן, אנחנו מציעים מגוון אפשרויות תשלום ופריסה נוחה כדי להקל על המטופלים שלנו."
        }
      ];
    case 'ar':
      return [
        {
          question: "هل العلاجات مؤلمة؟",
          answer: "نحن نبذل قصارى جهدنا لتجنب الألم. نستخدم في عيادتنا تقنيات متقدمة وتخدير موضعي فعال، مع صبر لا نهائي."
        },
        {
          question: "كيف أستعد للعلاج؟",
          answer: "لا حاجة لتحضير خاص. يُنصح بالحضور في حالة استرخاء وإحضار أي وثائق طبية سابقة إن وجدت."
        },
        {
          question: "هل تعالجون الأطفال?",
          answer: "بالتأكيد! نحن متخصصون في علاج الأطفال، مع نهج لطيف ومخصص في بيئة ودية."
        },
        {
          question: "ما هي تكلفة العلاجات?",
          answer: "تختلف الأسعار حسب نوع العلاج. نقدم عرض أسعار مفصل في الاستشارة الأولى."
        },
        {
          question: "هل هناك خيارات للدفع؟",
          answer: "نعم، نقدم مجموعة متنوعة من خيارات الدفع وخطط الدفع المريحة لمساعدة مرضانا."
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
    case 'ru':
      return [
        {
          question: "Болезненны ли процедуры?",
          answer: "Мы делаем все возможное, чтобы вы не чувствовали боли. В нашей клинике используются передовые технологии, эффективная местная анестезия и бесконечное терпение."
        },
        {
          question: "Как подготовиться к лечению?",
          answer: "Особой подготовки не требуется. Рекомендуется прийти в спокойном состоянии и принести предыдущие медицинские документы, если они есть."
        },
        {
          question: "Принимаете ли вы детей?",
          answer: "Безусловно! Мы специализируемся на лечении детей, используя мягкий и индивидуальный подход в дружественной обстановке."
        },
        {
          question: "Какова стоимость лечения?",
          answer: "Цена варьируется в зависимости от типа лечения. Мы предоставляем подробную смету на первой консультации."
        },
        {
          question: "Есть ли возможность оплаты в рассрочку?",
          answer: "Да, мы предлагаем различные варианты оплаты и удобные планы рассрочки, чтобы помочь нашим пациентам."
        }
      ];
    case 'de':
      return [
        {
          question: "Sind die Behandlungen schmerzhaft?",
          answer: "Wir tun alles dafür, dass Sie keine Schmerzen spüren. In unserer Praxis verwenden wir fortschrittliche Technologien, effektive lokale Betäubung und haben unendliche Geduld."
        },
        {
          question: "Wie bereite ich mich auf die Behandlung vor?",
          answer: "Keine besondere Vorbereitung erforderlich. Es wird empfohlen, entspannt zu erscheinen und frühere medizinische Unterlagen mitzubringen, falls vorhanden."
        },
        {
          question: "Behandeln Sie auch Kinder?",
          answer: "Absolut! Wir sind spezialisiert auf Kinderbehandlungen mit einem sanften und personalisierten Ansatz in einer freundlichen Umgebung."
        },
        {
          question: "Was kosten die Behandlungen?",
          answer: "Die Preise variieren je nach Behandlungsart. Wir erstellen Ihnen einen detaillierten Kostenvoranschlag beim ersten Beratungsgespräch."
        },
        {
          question: "Gibt es Zahlungsoptionen?",
          answer: "Ja, wir bieten verschiedene Zahlungsoptionen und bequeme Ratenpläne an, um unseren Patienten entgegenzukommen."
        }
      ];
    default:
      return [];
  }
};
