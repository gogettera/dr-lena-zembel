
import React from "react";
import { Bandage } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";

const DoctorStory = () => (
  <section className="py-14 md:py-20 px-4 bg-white">
    <div className="container mx-auto max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex justify-center md:col-span-1 order-2 md:order-1">
          <div className="relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border-4 border-[#E5DEFF] shadow-lg">
              <OptimizedImage
                src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
                alt="ד״ר לנה זמבל - מומחית לטיפולי שורש"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
              <Bandage className="text-[#9b87f5] h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="md:col-span-2 order-1 md:order-2">
          <div className="bg-[#F1F0FB] rounded-2xl p-8 shadow-soft border border-dental-beige/40 text-right opacity-0 animate-[fade-in_0.5s_ease-out_0.2s_forwards]">
            <h2 className="text-2xl font-bold text-[#6E59A5] mb-4">המומחית שלנו לטיפולי שורש</h2>
            <p className="text-[#6E59A5]/80 text-lg leading-relaxed mb-3">
              עם שנים של ניסיון מקצועי בתחום האנדודונטיה – ד״ר לנה זמבל רואה בכל טיפול הזדמנות ליצור שינוי מהותי באיכות חיי המטופל.
            </p>
            <p className="text-[#6E59A5]/80 text-lg leading-relaxed mb-3">
              הגישה שלה: הקשבה, שקיפות והתאמת פתרון אישי לכל מטופל ומטופלת.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="bg-[#E5DEFF]/50 px-3 py-1 rounded text-sm text-[#6E59A5]">
                תכנון אישי לכל מקרה
              </div>
              <div className="bg-[#E5DEFF]/50 px-3 py-1 rounded text-sm text-[#6E59A5]">
                טיפולים ללא כאב
              </div>
              <div className="bg-[#E5DEFF]/50 px-3 py-1 rounded text-sm text-[#6E59A5]">
                ניסיון רב שנים
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DoctorStory;
