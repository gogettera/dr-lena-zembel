
import React from "react";
import { useDoctorInfo } from "@/hooks/use-doctor-info";
import { TreatmentArea } from "@/types/doctor";
import DoctorPortrait from "@/components/shared/DoctorPortrait";
import { Icon } from 'lucide-react';

interface DoctorStoryProps {
  treatmentArea: TreatmentArea;
  icon: React.ElementType;
  titleColor?: string;
  tagBgColor?: string;
  tagTextColor?: string;
  cardBgColor?: string;
}

/**
 * Reusable Doctor Story component that pulls consistent information from doctorInfo
 * Always use this component for displaying doctor information to ensure consistency
 */
const DoctorStory: React.FC<DoctorStoryProps> = ({ 
  treatmentArea,
  icon: IconComponent,
  titleColor = "text-dental-navy",
  tagBgColor = "bg-dental-navy/5",
  tagTextColor = "text-dental-navy",
  cardBgColor = "bg-[#F1F0FB]"
}) => {
  const { getDoctorInfo, getDoctorSpecialty, getDoctorTags } = useDoctorInfo();
  const doctorInfo = getDoctorInfo();
  const specialty = getDoctorSpecialty(treatmentArea);
  const tags = getDoctorTags(treatmentArea);

  return (
    <section className="py-14 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:col-span-1 order-2 md:order-1">
            <div className="relative opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
              <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden">
                <DoctorPortrait 
                  style="medical" 
                  width={220} 
                  height={220} 
                  rounded="full"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                <IconComponent className="text-dental-orange h-6 w-6" />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 order-1 md:order-2">
            <div className={`${cardBgColor} rounded-2xl p-8 shadow-soft border border-dental-beige/40 text-right opacity-0 animate-[fade-in_0.5s_ease-out_0.2s_forwards]`}>
              <h2 className={`text-2xl font-bold ${titleColor} mb-4`}>{specialty.title}</h2>
              <p className="text-dental-navy/80 text-lg leading-relaxed mb-3">
                {specialty.description || doctorInfo.approach}
              </p>
              <p className="text-dental-navy/80 text-lg leading-relaxed mb-3">
                במרפאה, כל מטופל זוכה לתשומת לב מלאה וטיפול מותאם אישית.
              </p>
              
              <div className="flex flex-wrap gap-3 mt-6">
                {tags.map((tag, index) => (
                  <div key={index} className={`${tagBgColor} px-3 py-1 rounded text-sm ${tagTextColor}`}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorStory;
