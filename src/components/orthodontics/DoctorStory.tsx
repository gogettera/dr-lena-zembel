
import React from "react";
import { BookUser } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";

const DoctorStory = () => {
  return (
    <section className="py-14 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:col-span-1 order-2 md:order-1">
            <div className="relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
              <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border-4 border-[#E5DEFF] shadow-lg">
                <OptimizedImage
                  src="/images/ortho-doctor.jpg"
                  alt="ד״ר יעל ישור שיניים"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                <BookUser className="text-[#9b87f5] h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="bg-[#F1F0FB] rounded-2xl p-8 shadow-soft border border-dental-beige/40 text-right opacity-0 animate-[fade-in_0.5s_ease-out_0.2s_forwards]">
              <h2 className="text-2xl font-bold text-[#6E59A5] mb-4">הסיפור של ד"ר יעל</h2>
              <p className="text-[#6E59A5]/80 text-lg leading-relaxed mb-3">
                יישור שיניים הוא לא רק אסתטיקה – הוא תהליך של העצמה וחיזוק הביטחון העצמי. עם מעל 15 שנות ניסיון, ד"ר יעל מאמינה בקשר אישי ובתוכנית טיפול מותאמת לכל מטופל.
              </p>
              <p className="text-[#6E59A5]/80 text-lg leading-relaxed mb-3">
                במרפאה, כל מטופל ומטופלת מקבלים תמיכה, הבנה ושקיפות לאורך כל הדרך.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="bg-[#E5DEFF]/50 px-3 py-1 rounded text-sm text-[#6E59A5]">
                  15 שנות ניסיון
                </div>
                <div className="bg-[#E5DEFF]/50 px-3 py-1 rounded text-sm text-[#6E59A5]">
                  טכנולוגיות חדשניות
                </div>
                <div className="bg-[#E5DEFF]/50 px-3 py-1 rounded text-sm text-[#6E59A5]">
                  יחס אישי וחם
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DoctorStory;
