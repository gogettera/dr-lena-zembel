
import React from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TranslatedText } from "@/components/ui/translated-text";

const OralRehabilitationBookingCTA = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <section className="py-10 bg-dental-orange/10">
      <div className="container mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-dental-navy mb-4 animate-fade-in">
          <TranslatedText 
            textKey="oralRehabilitation.bookingCTA.title" 
            defaultText="התחילו את הדרך לחיוך מושלם - קבעו פגישת ייעוץ"
          />
        </h3>
        <p className="mb-7 text-lg text-dental-navy/80 max-w-xl mx-auto animate-fade-in">
          <TranslatedText 
            textKey="oralRehabilitation.bookingCTA.description" 
            defaultText="השאירו פרטים עוד היום או התקשרו אלינו. נשמח ללוות אתכם בדרך למראה וחיים חדשים."
          />
        </p>
        <Button
          variant="orange"
          size="lg"
          className="rounded-full text-lg px-8 py-3 font-semibold shadow-md hover:scale-105 transition-all duration-300 animate-fade-in"
        >
          <Phone className={`h-5 w-5 ${isRTL ? 'ml-0 mr-2' : 'ml-2'}`} /> 
          <TranslatedText textKey="common.bookVisit" />
        </Button>
        <div className="text-sm text-dental-navy/50 mt-3">
          <TranslatedText 
            textKey="oralRehabilitation.bookingCTA.phoneNumber" 
            defaultText="או חייגו: 03-566-6915"
          />
        </div>
      </div>
    </section>
  );
};

export default OralRehabilitationBookingCTA;
