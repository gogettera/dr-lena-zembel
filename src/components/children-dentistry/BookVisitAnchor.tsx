
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BookVisitAnchor: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="book-visit" className="py-16 md:py-20 px-4 bg-gradient-to-br from-dental-beige/30 to-white scroll-mt-24">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-dental-beige/30 relative overflow-hidden">
          {/* Decorative blob */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-dental-orange/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#D3E4FD]/30 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-2 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
              {t('childrenDentistry.bookVisit.title')}
            </h2>
            
            <p className="text-dental-navy/80 max-w-lg mx-auto mb-2 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
              {t('childrenDentistry.bookVisit.description')}
            </p>
            
            <div className="pt-4 flex flex-col md:flex-row gap-4 justify-center opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]">
              <Button 
                variant="orange" 
                size="lg" 
                className="group rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg w-full md:w-auto"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                {t('bookNow')}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full text-lg border-2 border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white transition-all duration-300 w-full md:w-auto"
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('contactUs')}
              </Button>
            </div>
            
            <p className="text-sm text-dental-navy/60 opacity-0 animate-[fade-in_0.5s_ease-out_0.7s_forwards]">
              {t('childrenDentistry.bookVisit.followUp')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookVisitAnchor;
