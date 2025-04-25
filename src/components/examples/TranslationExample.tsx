
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHebrewText } from '@/utils/hebrewUtils';
import HebrewText from '../shared/HebrewText';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TranslationExample: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const { formatNumber, formatDate } = useHebrewText();
  
  // Example of getting a nested object with returnObjects option
  const doctorInfo = t('info.doctorInfo', { returnObjects: true });
  
  // Example of using variables in translations - use a context option instead of name
  const greetingKey = 'Welcome, {{name}}!';
  const greetingWithName = t(greetingKey, { context: doctorInfo.name });
  
  // Example date formatting
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>
          <HebrewText tag="h2" className="text-2xl font-bold">
            {t('common.clinicDescription')}
          </HebrewText>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Simple string translation */}
        <HebrewText tag="p" className="text-lg">
          {t('common.dentistryWithLove')}
        </HebrewText>
        
        {/* Greeting with doctor's name */}
        <HebrewText tag="p">
          {greetingWithName}
        </HebrewText>
        
        {/* Accessing nested translations */}
        <div className="border-l-4 border-primary p-4">
          <HebrewText tag="h3" className="font-bold">
            {t('info.doctorInfo.name')}
          </HebrewText>
          <HebrewText tag="p">
            {t('info.doctorInfo.title')}
          </HebrewText>
          <HebrewText tag="p" className="text-sm text-gray-600">
            {t('info.doctorInfo.education')}
          </HebrewText>
        </div>
        
        {/* Example of number formatting */}
        <HebrewText tag="p">
          {t('treatments.patientExperiences')}: {formatNumber(1250)}
        </HebrewText>
        
        {/* Current date example */}
        <HebrewText tag="p" className="text-sm text-gray-500">
          {formattedDate}
        </HebrewText>
      </CardContent>
    </Card>
  );
};

export default TranslationExample;

