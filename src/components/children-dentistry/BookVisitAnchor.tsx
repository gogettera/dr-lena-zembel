
import React from "react";
import { MapPin, Clock } from "lucide-react";

const BookVisitAnchor = () => (
  <section className="py-14 md:py-20 px-4 bg-[#D3E4FD]/40">
    <div className="container mx-auto max-w-3xl flex flex-col items-center text-center gap-8">
      <h2 className="text-2xl font-bold text-dental-navy mb-4">
        הביקור הראשון של הילד יכול להשפיע על כל החיים. בואו נתחיל אותו נכון.
      </h2>
      <div className="text-dental-navy/80 text-lg mb-4">
        צוות המרפאה שלנו כאן כדי לעזור, לתמוך וללוות.
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-dental-orange" />
          <span>דרך בן-צבי 2, תל אביב-יפו</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-dental-orange" />
          <span>ראשון עד חמישי: 09:00-19:00 | שישי: 09:00-13:00</span>
        </div>
      </div>
      <a
        href="https://waze.com/ul?ll=32.050039,34.759208&navigate=yes"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full md:w-auto"
      >
        <button className="bg-dental-orange text-white font-bold text-lg py-3 px-7 rounded-full shadow-soft hover:bg-dental-orange/90 transition-all">
          נווטו אלינו ב-Waze
        </button>
      </a>
    </div>
  </section>
);

export default BookVisitAnchor;
