
import React from 'react';
import { EnhancedImage } from '@/components/ui/enhanced-image';
import { useDoctorPortrait, PortraitStyle } from '@/hooks/use-doctor-portrait';

interface DoctorPortraitProps {
  style?: PortraitStyle;
  className?: string;
  width?: number;
  height?: number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  border?: boolean;
  priority?: boolean;
}

const DoctorPortrait: React.FC<DoctorPortraitProps> = ({
  style = 'main',
  className = '',
  width = 300,
  height = 400,
  rounded = '2xl',
  border = true,
  priority = false,
}) => {
  const { getDoctorPortraitPath, getDoctorName, getDoctorTitle } = useDoctorPortrait();
  
  const doctorName = getDoctorName();
  const portraitPath = getDoctorPortraitPath(style);
  
  // Border styles based on style context
  const borderStyles = {
    main: border ? 'border-4 border-dental-orange/20' : '',
    medical: border ? 'border-4 border-dental-beige/70' : '',
    authority: border ? 'border-4 border-white/90' : '',
  };

  return (
    <EnhancedImage
      src={portraitPath}
      alt={`${doctorName} - ${style === 'medical' ? getDoctorTitle() : 'תמונת פרופיל'}`}
      width={width}
      height={height}
      rounded={rounded}
      className={`shadow-md ${borderStyles[style]} ${className}`}
      objectFit="cover"
      priority={priority}
    />
  );
};

export default DoctorPortrait;
