
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, GraduationCap, Award } from 'lucide-react';
import OptimizedImage from '@/components/ui/optimized-image';
import { useDoctorPortrait } from '@/hooks/use-doctor-portrait';

const DoctorProfile: React.FC = () => {
  const { getDoctorPortraitPath, getDoctorName, getDoctorTitle } = useDoctorPortrait();

  return (
    <div className="text-center lg:text-right">
      <div className="relative inline-block mb-6">
        <OptimizedImage
          src={getDoctorPortraitPath('authority')}
          alt={getDoctorName()}
          className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <div className="absolute -bottom-4 -right-4 bg-dental-orange text-white rounded-full p-3">
          <Award className="h-6 w-6" />
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-dental-navy mb-2">{getDoctorName()}</h3>
        <p className="text-lg text-dental-orange font-semibold mb-4">{getDoctorTitle()}</p>
        
        <div className="flex flex-wrap justify-center lg:justify-end gap-2 mb-6">
          <Badge variant="outline" className="border-dental-navy text-dental-navy">
            <MapPin className="h-3 w-3 mr-1" />
            תל אביב
          </Badge>
          <Badge variant="outline" className="border-dental-navy text-dental-navy">
            <Users className="h-3 w-3 mr-1" />
            13+ שנות ניסיון
          </Badge>
          <Badge variant="outline" className="border-dental-navy text-dental-navy">
            <GraduationCap className="h-3 w-3 mr-1" />
            השכלה גרמנית
          </Badge>
        </div>

        <p className="text-dental-navy/80 leading-relaxed mb-6">
          ד״ר לנה זמבל מביאה יחד מומחיות קלינית מתקדמת, טכנולוגיה חדישה ויחס אישי חם. 
          עם השכלה רפואית מובילה ובניסיון עשיר בטיפולים מורכבים, היא מתמחה בהפיכת 
          טיפולי שורש לחוויה נוחה ומוצלחת.
        </p>
      </div>
    </div>
  );
};

export default DoctorProfile;
