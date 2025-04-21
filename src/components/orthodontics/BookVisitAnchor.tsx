
import React from "react";
import { BookCheck, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookVisitAnchor = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-20 px-4 bg-[#9b87f5]/10">
      <div className="container mx-auto max-w-3xl flex flex-col items-center text-center gap-8 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
        <h2 className="text-2xl font-bold text-[#6E59A5] mb-4">
          הגיע הזמן לחייך בביטחון!
        </h2>
        <div className="text-[#6E59A5]/80 text-lg mb-4">
          נדאג לליווי אישי ומקצועי בכל שלב.
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-dental-beige/30">
            <BookOpen className="h-5 w-5 text-[#9b87f5]" />
            <span>חדרה 104, תל אביב</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-dental-beige/30">
            <BookCheck className="h-5 w-5 text-[#9b87f5]" />
            <span>ימים: ראשון–חמישי, שעות: 09:00–18:00</span>
          </div>
        </div>
        <Button
          className="bg-[#9b87f5] text-white font-bold text-lg py-3 px-7 rounded-full shadow-soft hover:bg-[#8B5CF6] transition-all w-full sm:w-auto"
        >
          בואו לקביעת ייעוץ ראשוני
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
