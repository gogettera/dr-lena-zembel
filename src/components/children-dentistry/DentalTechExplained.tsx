
import React from "react";
import SectionHeader from "@/components/ui/section-header";
import OptimizedImage from "@/components/ui/optimized-image";

const DentalTechExplained = () => {
  return (
    <section id="dental-tech" className="py-16 px-4 bg-white scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          title="טכנולוגיה חדשנית בשירות הקטנטנים"
          subtitle="כלים ושיטות מתקדמות שהופכים את חווית טיפול השיניים לחיובית ונעימה"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            <h3 className="text-xl font-bold text-dental-navy mb-4">הדמיות ממוחשבות ידידותיות לילדים</h3>
            <p className="text-dental-navy/80 mb-4">
              השימוש בטכנולוגיית צילום מתקדמת מאפשר לנו לבצע הדמיות והערכות מדויקות עם פחות קרינה וללא אי-נוחות. 
              אנו מציגים לילדים את התמונות בצורה ידידותית ומקרבת, כך שהם הופכים לשותפים פעילים בטיפול.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#FFDEE2]/50 rounded-full p-2 flex-shrink-0">
                  <span className="text-lg">🔍</span>
                </div>
                <div>
                  <h4 className="font-bold text-dental-navy">מצלמה תוך-פה זעירה</h4>
                  <p className="text-sm text-dental-navy/70">מאפשרת לילדים "לראות מה שהרופא רואה" ולהבין את הצורך בטיפול</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#FFDEE2]/50 rounded-full p-2 flex-shrink-0">
                  <span className="text-lg">📱</span>
                </div>
                <div>
                  <h4 className="font-bold text-dental-navy">צילומי רנטגן דיגיטליים</h4>
                  <p className="text-sm text-dental-navy/70">פחות קרינה, תוצאות מיידיות, ואפשרות להסביר להורים ולילדים בזמן אמת</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#FFDEE2]/50 rounded-full p-2 flex-shrink-0">
                  <span className="text-lg">🖥️</span>
                </div>
                <div>
                  <h4 className="font-bold text-dental-navy">סריקה תלת-ממדית</h4>
                  <p className="text-sm text-dental-navy/70">ללא צורך בחומרי מטבע לא נעימים, נוח במיוחד לילדים רגישים או בעלי רפלקס הקאה</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]">
            <div className="relative">
              <div className="w-full h-full absolute -top-5 -right-5 bg-dental-beige/20 rounded-2xl transform rotate-3"></div>
              <div className="w-full h-full absolute -bottom-5 -left-5 bg-[#D3E4FD]/30 rounded-2xl transform -rotate-2"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-md border border-dental-beige/30">
                <OptimizedImage
                  src="/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg"
                  alt="טכנולוגיה דיגיטלית במרפאת שיניים לילדים"
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 opacity-0 animate-[fade-in_0.5s_ease-out_0.7s_forwards]">
          <div className="bg-[#F1F0FB]/60 rounded-2xl p-6 border border-dental-beige/30">
            <h3 className="text-xl font-bold text-dental-navy mb-4">טכנולוגיות להפחתת כאב וחרדה</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/80 p-5 rounded-xl shadow-sm border border-dental-beige/20 text-center">
                <div className="text-2xl mb-3">🧙‍♂️</div>
                <h4 className="font-bold text-dental-navy mb-2">The Wand</h4>
                <p className="text-dental-navy/80 text-sm">
                  מערכת אלחוש ממוחשבת המזריקה את חומר ההרדמה בקצב איטי ומבוקר, מפחיתה תחושת לחץ וכאב. נראית כמו "שרביט קסמים" ולא כמו מזרק מפחיד.
                </p>
              </div>
              
              <div className="bg-white/80 p-5 rounded-xl shadow-sm border border-dental-beige/20 text-center">
                <div className="text-2xl mb-3">😊</div>
                <h4 className="font-bold text-dental-navy mb-2">גז צחוק</h4>
                <p className="text-dental-navy/80 text-sm">
                  סדציה קלה ובטוחה שמרגיעה את הילד ומפחיתה חרדה. הילד נשאר ער ומשתף פעולה, אך רגוע יותר. האפקט חולף תוך דקות בודדות מסיום הטיפול.
                </p>
              </div>
              
              <div className="bg-white/80 p-5 rounded-xl shadow-sm border border-dental-beige/20 text-center">
                <div className="text-2xl mb-3">🎮</div>
                <h4 className="font-bold text-dental-navy mb-2">הדחה קוגניטיבית</h4>
                <p className="text-dental-navy/80 text-sm">
                  משקפי תלת-ממד או טאבלטים המציגים תכנים אהובים ומסיחים את דעת הילד במהלך הטיפול. מפחית משמעותית את תחושת החרדה והכאב הנתפס.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalTechExplained;
