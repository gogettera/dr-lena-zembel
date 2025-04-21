
import React from "react";
import { Calendar, Syringe } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookVisitAnchor = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-20 px-4 bg-[#9b87f5]/10">
      <div className="container mx-auto max-w-3xl flex flex-col items-center text-center gap-8 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
        <h2 className="text-2xl font-bold text-[#6E59A5] mb-4">
          רוצים סיום מהיר לכאב?
        </h2>
        <div className="text-[#6E59A5]/80 text-lg mb-4">
          לקביעת תור דחוף או שאלה – אנחנו כאן!
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-dental-beige/30">
            <Calendar className="h-5 w-5 text-[#9b87f5]" />
            <span>טיפולים מהיום להיום לפי זמינות</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-dental-beige/30">
            <Syringe className="h-5 w-5 text-[#9b87f5]" />
            <span>צוות רגיש ותומך, כל הדרך</span>
          </div>
        </div>
        <Button
          className="bg-[#9b87f5] text-white font-bold text-lg py-3 px-7 rounded-full shadow-soft hover:bg-[#8B5CF6] transition-all w-full sm:w-auto"
        >
          לקביעת ייעוץ חינם
        </Button>
        <Button
          variant="outline"
          className="rounded-full border-[#6E59A5] text-[#6E59A5] hover:bg-[#6E59A5] hover:text-white transition-all font-bold"
          onClick={scrollToTop}
        >
          חזרה למעלה
        </Button>
      </div>
    </section>
  );
};
export default BookVisitAnchor;
