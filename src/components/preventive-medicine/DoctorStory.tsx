
import React from "react";
import { Shield } from "lucide-react";
import SharedDoctorStory from '@/components/shared/DoctorStory';

const DoctorStory = () => {
  return (
    <SharedDoctorStory 
      treatmentArea="preventiveMedicine"
      icon={Shield}
      titleColor="text-dental-navy"
      tagBgColor="bg-dental-navy/5"
      tagTextColor="text-dental-navy"
      cardBgColor="bg-[#F1F0FB]"
    />
  );
};

export default DoctorStory;
