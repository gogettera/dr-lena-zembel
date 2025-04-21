
import React from "react";
import { Button } from "@/components/ui/button";
import { Smile, Heart, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import OptimizedImage from "@/components/ui/optimized-image";

const Hero = () => {
  const isMobile = useIsMobile();

  const scrollToNextSection = () => {
    const whyUsSection = document.getElementById("why-us");
    if (whyUsSection) {
      whyUsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative py-16 md:py-24 px-4 bg-[#FFDEE2] overflow-hidden scroll-mt-24">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-dental-orange/10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-[#D3E4FD]/40" />
      
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20 rtl relative z-10">
        <div className="md:w-1/2 text-center md:text-right">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-dental-navy font-[Heebo] leading-snug opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            ילדים שמחים – טיפולי שיניים באהבה ובסבלנות
          </h1>
          <p className="text-lg md:text-xl text-dental-navy/80 mb-8 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            במרפאה של ד"ר לנה זמבל אנחנו לא מטפלים רק בשיניים – אנחנו בונים ביטחון, שקט נפשי וחוויות טובות לילדים ולהורים.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]">
            <Button 
              variant="orange" 
              size="lg" 
              className="rounded-full font-bold text-lg px-8 shadow-soft hover:shadow-glow transition-all"
              id="book-appointment"
            >
              קבעו תור אונליין
              <Smile className="mr-2" size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full font-bold text-lg px-8 border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white transition-all"
            >
              נחזור אליכם עם חיוך :)
              <Heart className="mr-2" size={20} />
            </Button>
          </div>
          
          <div className="hidden md:flex justify-center mt-20 opacity-0 animate-[fade-in_0.5s_ease-out_0.8s_forwards]">
            <Button
              variant="ghost"
              className="flex items-center text-dental-navy/70 hover:text-dental-navy transition-colors"
              onClick={scrollToNextSection}
            >
              גלו עוד
              <ChevronDown className="mr-1 animate-bounce" size={18} />
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="relative opacity-0 animate-[fade-in_0.5s_ease-out_0.2s_forwards]">
            <OptimizedImage
              src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
              alt="ילדה מחייכת על כיסא טיפולים"
              className="rounded-3xl shadow-lg w-[340px] md:w-[420px] h-auto object-cover border-4 border-white"
              style={{fontFamily: "Heebo"}}
            />
            <Smile className="absolute -top-8 rtl:-right-8 left-1/2 -translate-x-1/2 h-14 w-14 text-dental-orange bg-white rounded-full border shadow-lg p-2 animate-pulse" />
            
            {/* Floating badges */}
            <div className="absolute -left-4 md:-left-8 top-1/3 bg-white shadow-soft rounded-lg px-4 py-2 border border-dental-beige/50 opacity-0 animate-[fade-in_0.5s_ease-out_0.6s_forwards]">
              <div className="font-bold text-dental-navy">חוויה מרגיעה</div>
            </div>
            <div className="absolute -right-4 md:-right-12 bottom-1/4 bg-white shadow-soft rounded-lg px-4 py-2 border border-dental-beige/50 opacity-0 animate-[fade-in_0.5s_ease-out_0.8s_forwards]">
              <div className="font-bold text-dental-navy">אווירה נעימה</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
