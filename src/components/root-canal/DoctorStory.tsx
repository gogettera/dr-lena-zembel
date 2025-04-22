
import React from "react";
import { Bandage } from "lucide-react";
import SharedDoctorStory from '@/components/shared/DoctorStory';

const DoctorStory = () => {
  return (
    <SharedDoctorStory 
      treatmentArea="rootCanal"
      icon={Bandage}
      titleColor="text-[#6E59A5]"
      tagBgColor="bg-[#E5DEFF]/50"
      tagTextColor="text-[#6E59A5]"
      cardBgColor="bg-[#F1F0FB]"
    />
  );
};

export default DoctorStory;
