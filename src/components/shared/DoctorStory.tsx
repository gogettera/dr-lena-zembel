
import React from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import { NextGenImage } from "@/components/ui/next-gen-image";
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/ui/translated-text';

interface DoctorStoryProps {
  treatmentArea: string;
  icon: LucideIcon;
  titleColor: string;
  tagBgColor: string;
  tagTextColor: string;
  cardBgColor: string;
}

const DoctorStory: React.FC<DoctorStoryProps> = ({
  treatmentArea,
  icon: Icon,
  titleColor,
  tagBgColor,
  tagTextColor,
  cardBgColor
}) => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl">
          <div className={cn("absolute top-4 right-4 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium z-10", tagBgColor, tagTextColor)}>
            <Icon size={18} />
            <TranslatedText textKey={`${treatmentArea}.doctorStory.tagText`} defaultText="המומחים שלנו" />
          </div>
          
          {/* Main content area */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Doctor image */}
            <div className="md:w-1/3 relative">
              <NextGenImage
                src="/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg"
                alt={t(`${treatmentArea}.doctorStory.imageAlt`, "תמונה של ד\"ר לנה זמבל")}
                width={400}
                height={500}
                className="w-full h-60 md:h-full object-cover md:rounded-r-3xl"
                priority
              />
            </div>
            
            {/* Content */}
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
              <div className={cn("text-xl md:text-2xl font-bold mb-4", titleColor)}>
                <TranslatedText textKey={`${treatmentArea}.doctorStory.title`} defaultText="ד״ר לנה זמבל" />
              </div>
              <div className="mb-4 text-zinc-600">
                <TranslatedText textKey={`${treatmentArea}.doctorStory.education`} defaultText="בוגרת בית הספר לרפואת שיניים באוניברסיטת קלן, גרמניה" />
              </div>
              <div className="space-y-4 text-zinc-700">
                <p>
                  <TranslatedText textKey={`${treatmentArea}.doctorStory.approach`} defaultText="הגישה שלי מתבססת על יצירת חוויה נעימה וחיובית, תוך מתן טיפול מקצועי ועדין המתאים אישית לכל מטופל ומטופלת." />
                </p>
                <p>
                  <TranslatedText textKey={`${treatmentArea}.doctorStory.experience`} defaultText="בעלת ניסיון של למעלה מ-15 שנה בתחום, עם התמחות מיוחדת בטיפולי יישור שיניים למבוגרים ונוער." />
                </p>
              </div>
              
              {/* Expertise tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                <div className={cn("px-3 py-1 rounded-full text-xs", tagBgColor, tagTextColor)}>
                  <TranslatedText textKey={`${treatmentArea}.doctorStory.expertise1`} defaultText="מומחיות בטיפולי יישור מתקדמים" />
                </div>
                <div className={cn("px-3 py-1 rounded-full text-xs", tagBgColor, tagTextColor)}>
                  <TranslatedText textKey={`${treatmentArea}.doctorStory.expertise2`} defaultText="גישה עדינה ומרגיעה" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial card */}
          <div className={cn("mx-6 mb-6 p-5 rounded-2xl relative", cardBgColor)}>
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-white">
                <NextGenImage
                  src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg"
                  alt={t('common.patientPhoto', "תמונת מטופל/ת")}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium mb-1">
                  <TranslatedText textKey={`${treatmentArea}.doctorStory.testimonialName`} defaultText="טל כהן" />
                </div>
                <div className="text-sm text-zinc-600">
                  <TranslatedText textKey={`${treatmentArea}.doctorStory.testimonial`} defaultText="ד״ר לנה טיפלה בי לאורך כל התהליך באכפתיות ובסבלנות יוצאת דופן. השיניים שלי ישרות לחלוטין עכשיו ואני לא מפסיקה לחייך!" />
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
