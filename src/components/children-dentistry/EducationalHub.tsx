
import React from "react";
import { Calendar, Clock, Tooth, AlertTriangle } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EducationalHub = () => {
  return (
    <section id="educational-hub" className="py-16 px-4 bg-[#F1F0FB]/60 scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          title="מרכז המידע להורים"
          subtitle="מידע מקצועי שיעזור לכם לשמור על בריאות השיניים של הילדים"
        />
        
        <div className="mt-12 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
          <Tabs defaultValue="age-guidelines" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-[#FFDEE2]/30 p-1 rounded-lg">
              <TabsTrigger value="age-guidelines" className="data-[state=active]:bg-white">התפתחות שיניים לפי גיל</TabsTrigger>
              <TabsTrigger value="prevention" className="data-[state=active]:bg-white">מניעת עששת</TabsTrigger>
              <TabsTrigger value="habits" className="data-[state=active]:bg-white">הרגלים והתנהגות</TabsTrigger>
              <TabsTrigger value="nutrition" className="data-[state=active]:bg-white">תזונה נכונה</TabsTrigger>
            </TabsList>
            
            <div className="bg-white mt-6 rounded-xl shadow-md border border-dental-beige/30 overflow-hidden">
              <TabsContent value="age-guidelines" className="p-6">
                <h3 className="text-xl font-bold text-dental-navy mb-4">התפתחות שיניים ומה לצפות בכל גיל</h3>
                
                <div className="space-y-6 mt-4">
                  <div className="flex gap-4">
                    <div className="bg-[#FFDEE2]/30 rounded-full p-3 h-fit">
                      <Calendar className="h-6 w-6 text-dental-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dental-navy mb-1">תינוקות (0-2 שנים)</h4>
                      <p className="text-dental-navy/80 text-sm">
                        בתקופה זו מתחילות לבקוע שיני החלב הראשונות. חשוב להתחיל בניקוי חלל הפה עם מטלית רכה ומים ולהימנע מבקבוק עם משקאות ממותקים בלילה. 
                        הביקור הראשון במרפאה מומלץ בסביבות גיל שנה, או כשמופיעה השן הראשונה.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-[#FFDEE2]/30 rounded-full p-3 h-fit">
                      <Calendar className="h-6 w-6 text-dental-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dental-navy mb-1">פעוטות (2-5 שנים)</h4>
                      <p className="text-dental-navy/80 text-sm">
                        בגיל 3 רוב שיני החלב כבר נמצאות בפה. זו התקופה להקניית הרגלי צחצוח קבועים פעמיים ביום עם משחת שיניים המכילה פלואוריד בכמות מתאימה לגיל. 
                        חשוב לערוך ביקורת אצל רופא שיניים כל חצי שנה.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-[#FFDEE2]/30 rounded-full p-3 h-fit">
                      <Calendar className="h-6 w-6 text-dental-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dental-navy mb-1">ילדי בית ספר (6-12 שנים)</h4>
                      <p className="text-dental-navy/80 text-sm">
                        תקופת החלפת השיניים, כאשר שיני החלב נושרות ומפנות מקום לשיניים הקבועות. בגיל 6 בוקעות גם טוחנות קבועות ראשונות. 
                        זהו הזמן המתאים לשקול איטום חריצים למניעת עששת ולהתחיל להקפיד על צחצוח עצמאי ושימוש בחוט דנטלי.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="prevention" className="p-6">
                <h3 className="text-xl font-bold text-dental-navy mb-4">שיטות מתקדמות למניעת עששת</h3>
                
                <div className="space-y-6 mt-4">
                  <div className="flex gap-4">
                    <div className="bg-[#D3E4FD]/50 rounded-full p-3 h-fit">
                      <Tooth className="h-6 w-6 text-dental-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dental-navy mb-1">איטומי חריצים</h4>
                      <p className="text-dental-navy/80 text-sm">
                        שכבת הגנה מיוחדת המיושמת על פני השטח של השיניים האחוריות, סותמת את החריצים הטבעיים שבהן ומונעת הצטברות חיידקים. 
                        טיפול קצר וללא כאב המפחית משמעותית את הסיכון לעששת.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-[#D3E4FD]/50 rounded-full p-3 h-fit">
                      <Tooth className="h-6 w-6 text-dental-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dental-navy mb-1">טיפולי פלואוריד מקצועיים</h4>
                      <p className="text-dental-navy/80 text-sm">
                        יישום של ג'ל או וארניש פלואוריד בריכוז גבוה על השיניים לחיזוק האמייל ומניעת עששת. 
                        מומלץ לבצע כל 3-6 חודשים לילדים ברמת סיכון גבוהה לעששת.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-[#D3E4FD]/50 rounded-full p-3 h-fit">
                      <Tooth className="h-6 w-6 text-dental-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dental-navy mb-1">שיטת CAMBRA (Caries Management By Risk Assessment)</h4>
                      <p className="text-dental-navy/80 text-sm">
                        גישה מתקדמת המבוססת על הערכת סיכון אישית לעששת. הטיפול והמניעה מותאמים במיוחד לכל ילד בהתאם לגורמי הסיכון האישיים שלו,
                        כולל הרגלי צחצוח, תזונה, ומצב חלל הפה.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="habits" className="p-6">
                <h3 className="text-xl font-bold text-dental-navy mb-4">הרגלים והשפעתם על בריאות הפה</h3>
                
                <div className="space-y-6 mt-4">
                  <div className="flex gap-4">
                    <div className="bg-[#FEF7CD]/80 rounded-full p-3 h-fit">
                      <Clock className="h-6 w-6 text-dental-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dental-navy mb-1">מציצת אצבע ומוצץ</h4>
                      <p className="text-dental-navy/80 text-sm">
                        מציצה ממושכת עלולה להשפיע על התפתחות הלסתות ויישור השיניים. מומלץ לגמול מהרגלים אלו עד גיל 3, 
                        ובהחלט לפני גיל 5, כדי למנוע השפעות ארוכות טווח על מנשך הקבע.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-[#FEF7CD]/80 rounded-full p-3 h-fit">
                      <Clock className="h-6 w-6 text-dental-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dental-navy mb-1">לחיצת שיניים וחריקה</h4>
                      <p className="text-dental-navy/80 text-sm">
                        גם ילדים יכולים לסבול מברוקסיזם (חריקת שיניים), במיוחד בזמן שינה. זה עלול לגרום לשחיקת אמייל השן ולכאבי ראש. 
                        אם תבחינו בקולות חריקה בלילה, חשוב לדווח על כך לרופא השיניים.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-[#FEF7CD]/80 rounded-full p-3 h-fit">
                      <Clock className="h-6 w-6 text-dental-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dental-navy mb-1">נשימת פה</h4>
                      <p className="text-dental-navy/80 text-sm">
                        ילדים הנושמים דרך הפה באופן קבוע נמצאים בסיכון גבוה יותר לעששת, דלקות חניכיים, ובעיות התפתחותיות. 
                        נשימת פה עלולה להיגרם מחסימה באף או הרגל, וחשוב לטפל בגורם השורש.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nutrition" className="p-6">
                <h3 className="text-xl font-bold text-dental-navy mb-4">תזונה נכונה לשיניים בריאות</h3>
                
                <div className="space-y-6 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#F2FCE2]/70 p-5 rounded-xl border border-dental-beige/30">
                      <h4 className="font-bold text-dental-navy mb-3">מזונות מחזקים</h4>
                      <ul className="space-y-2 text-dental-navy/80 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>מוצרי חלב: גבינות, יוגורט, חלב - עשירים בסידן</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>ירקות ופירות פריכים: תפוחים, גזר, סלרי - מנקים באופן טבעי</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>שומנים בריאים: אבוקדו, שמן זית, אגוזים - מפחיתים דלקת</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>מים: השתייה הטובה ביותר לשטיפת חיידקים וחומציות</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#FFDEE2]/30 p-5 rounded-xl border border-dental-beige/30">
                      <h4 className="font-bold text-dental-navy mb-3">מזונות לצמצום</h4>
                      <ul className="space-y-2 text-dental-navy/80 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="text-red-500">✗</span>
                          <span>ממתקים דביקים: סוכריות טופי, מרשמלו - נדבקים לשיניים</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-red-500">✗</span>
                          <span>משקאות מוגזים ומתוקים: מכילים חומצה וסוכר</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-red-500">✗</span>
                          <span>חטיפים מעובדים: מכילים פחמימות פשוטות שמתפרקות לסוכרים</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-red-500">✗</span>
                          <span>פירות מיובשים: עתירי סוכר ונדבקים לשיניים</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-[#D3E4FD]/30 p-5 rounded-xl border border-dental-beige/30 mt-4">
                    <h4 className="font-bold text-dental-navy mb-3">עצות מעשיות</h4>
                    <ul className="space-y-2 text-dental-navy/80 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-dental-orange">•</span>
                        <span>הגבילו צריכת ממתקים וחטיפים ל"זמן ממתק" מוגדר - עדיף אחרי ארוחה כשייצור הרוק מוגבר</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-dental-orange">•</span>
                        <span>הציעו חטיפים בריאים כמו חתיכות ירקות, גבינה או אגוזים לא ממותקים</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-dental-orange">•</span>
                        <span>עודדו שתיית מים אחרי ארוחות ונשנושים</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-dental-orange">•</span>
                        <span>הימנעו מאכילה או שתייה (למעט מים) אחרי צחצוח לילה</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default EducationalHub;
