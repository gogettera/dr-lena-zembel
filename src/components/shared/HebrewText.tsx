
import React from 'react';
import { useHebrewText } from '@/utils/hebrewUtils';
import { cn } from '@/lib/utils';

interface HebrewTextProps {
  children: React.ReactNode;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  forceRTL?: boolean;
}

/**
 * A component for displaying text with proper Hebrew/RTL formatting
 * Automatically applies the correct text direction based on the current language
 */
const HebrewText: React.FC<HebrewTextProps> = ({
  children,
  className,
  tag = 'span',
  forceRTL = false,
}) => {
  const { getTextDirectionClass, isRTL } = useHebrewText();
  const textDirectionClass = getTextDirectionClass();
  
  // Determine if we should use RTL direction
  const shouldUseRTL = forceRTL || isRTL;
  
  // Dynamically create the component based on the tag prop
  const Component = tag as any;
  
  return (
    <Component 
      className={cn(textDirectionClass, className)} 
      dir={shouldUseRTL ? 'rtl' : 'ltr'}
    >
      {children}
    </Component>
  );
};

export default HebrewText;
