
import React from "react";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 bg-[#FFDEE2] overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20 rtl">
        <div className="md:w-1/2 text-center md:text-right">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-dental-navy font-[Heebo] leading-snug">
            ילדים שמחים – טיפולי שיניים באהבה ובסבלנות
          </h1>
          <p className="text-lg md:text-xl text-dental-navy/80 mb-8">
            במרפאה של ד"ר לנה זמבל אנחנו לא מטפלים רק בשיניים – אנחנו בונים ביטחון, שקט נפשי וחוויות טובות לילדים ולהורים.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end">
            <Button variant="orange" size="lg" className="rounded-full font-bold text-lg px-8 shadow-soft hover:shadow-glow transition-all">
              קבעו תור אונליין
            </Button>
            <Button variant="outline" size="lg" className="rounded-full font-bold text-lg px-8 border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white transition-all">
              נחזור אליכם עם חיוך :)
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
              alt="ילדה מחייכת על כיסא טיפולים"
              className="rounded-3xl shadow-lg w-[340px] md:w-[420px] h-auto object-cover border-4 border-white"
              style={{fontFamily: "Heebo"}}
            />
            <Smile className="absolute -top-8 rtl:-right-8 left-1/2 -translate-x-1/2 h-14 w-14 text-dental-orange bg-white rounded-full border shadow-lg p-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
