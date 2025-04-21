
import React, { useState } from "react";
import { Play } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import VideoModal from "@/components/video/VideoModal";

const VideoExplainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          title="מה באמת קורה בטיפול שיניים לילדים?"
          subtitle="סרטון הסבר קצר שיעזור לכם להבין את תהליך הטיפול והכנה לקראת הביקור הראשון"
        />

        <div className="mt-10 rounded-2xl overflow-hidden shadow-lg relative group cursor-pointer opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]" 
          onClick={() => setIsModalOpen(true)}>
          <div className="aspect-video bg-dental-navy/5 relative overflow-hidden">
            <img 
              src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg" 
              alt="סרטון הסבר על טיפולי שיניים לילדים" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-dental-navy/20 group-hover:bg-dental-navy/30 transition-colors">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-dental-orange fill-dental-orange" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dental-navy/80 to-transparent p-6 text-white">
            <h3 className="text-xl font-bold mb-2">המדריך המלא להורים</h3>
            <p className="text-white/90">הכנה מושלמת לביקור הראשון של הילד במרפאת שיניים</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]">
          <div className="bg-[#F1F0FB]/50 p-5 rounded-xl border border-dental-beige/30 shadow-sm text-center">
            <div className="text-2xl mb-3">🦷</div>
            <h4 className="font-bold text-dental-navy mb-2">הכנה לביקור ראשון</h4>
            <p className="text-dental-navy/80 text-sm">טיפים פרקטיים להכנת הילד לביקור הראשון, מה לומר ואיך להתכונן</p>
          </div>
          <div className="bg-[#F1F0FB]/50 p-5 rounded-xl border border-dental-beige/30 shadow-sm text-center">
            <div className="text-2xl mb-3">🧸</div>
            <h4 className="font-bold text-dental-navy mb-2">מה באמת קורה בטיפול</h4>
            <p className="text-dental-navy/80 text-sm">הצצה אל חדר הטיפולים ותהליך הבדיקה והטיפול במילים פשוטות ללא מונחים מפחידים</p>
          </div>
          <div className="bg-[#F1F0FB]/50 p-5 rounded-xl border border-dental-beige/30 shadow-sm text-center">
            <div className="text-2xl mb-3">🎯</div>
            <h4 className="font-bold text-dental-navy mb-2">שאלות ותשובות</h4>
            <p className="text-dental-navy/80 text-sm">מענה לחששות נפוצים של ילדים והורים לפני ביקור במרפאת שיניים</p>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoSrc="https://www.example.com/sample-video.mp4" // Replace with actual video
        posterSrc="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
        title="המדריך המלא לטיפולי שיניים לילדים"
        isYouTube={false}
      />
    </section>
  );
};

export default VideoExplainer;
