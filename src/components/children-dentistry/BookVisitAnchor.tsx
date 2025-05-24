
import React from "react";
import { MapPin, Clock, ChevronsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { TranslatedText } from "@/components/ui/translated-text";

const BookVisitAnchor = () => {
  const { t } = useLanguage();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <section className="py-14 md:py-20 px-4 bg-[#D3E4FD]/40">
      <div className="container mx-auto max-w-3xl flex flex-col items-center text-center gap-8 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
        <h2 className="text-2xl font-bold text-dental-navy mb-4">
          <TranslatedText textKey="childrenDentistry.bookVisit.title" />
        </h2>
        <div className="text-dental-navy/80 text-lg mb-4">
          <TranslatedText textKey="childrenDentistry.bookVisit.subtitle" />
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-dental-beige/30">
            <MapPin className="h-5 w-5 text-dental-orange" />
            <span><TranslatedText textKey="childrenDentistry.bookVisit.address" /></span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-dental-beige/30">
            <Clock className="h-5 w-5 text-dental-orange" />
            <span><TranslatedText textKey="childrenDentistry.bookVisit.hours" /></span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://waze.com/ul?ll=32.050039,34.759208&navigate=yes"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button className="bg-dental-orange text-white font-bold text-lg py-3 px-7 rounded-full shadow-soft hover:bg-dental-orange/90 transition-all w-full">
              <TranslatedText textKey="childrenDentistry.bookVisit.wazeButton" />
            </Button>
          </a>
          
          <Button
            variant="outline"
            className="rounded-full border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white transition-all font-bold"
            onClick={scrollToTop}
          >
            <TranslatedText textKey="childrenDentistry.bookVisit.backToTop" />
            <ChevronsUp className="mr-1" size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookVisitAnchor;
