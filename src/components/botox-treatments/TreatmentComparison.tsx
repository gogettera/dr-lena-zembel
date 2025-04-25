
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TreatmentComparison as TreatmentComparisonType } from '@/types/botox-treatments';
import { useDirectionalStyles } from '@/utils/direction';

const TreatmentComparison: React.FC = () => {
  const { t } = useLanguage();
  const dir = useDirectionalStyles();
  
  // Default comparison data in case translations aren't available
  const defaultComparisonData: TreatmentComparisonType = {
    title: "Compare Our Treatments",
    botoxTitle: "Botox",
    hyaluronicTitle: "Hyaluronic Acid",
    features: [
      {
        name: "Treatment Duration",
        botox: "15-20 minutes",
        hyaluronic: "20-40 minutes"
      },
      {
        name: "Pain Level",
        botox: "Minimal",
        hyaluronic: "Minimal to moderate"
      },
      {
        name: "Results Duration",
        botox: "3-6 months",
        hyaluronic: "6-18 months"
      }
    ]
  };

  // Safely get comparison data from translations or use defaults
  let comparisonData: TreatmentComparisonType = defaultComparisonData;
  try {
    const translatedComparison = t('botoxTreatments.treatmentComparison', { returnObjects: true });
    if (translatedComparison && typeof translatedComparison !== 'string' && !Array.isArray(translatedComparison)) {
      comparisonData = translatedComparison as TreatmentComparisonType;
    }
  } catch (error) {
    console.error('Error parsing treatment comparison:', error);
  }

  // Get title as string to avoid object rendering issues
  const comparisonTitle = typeof t('botoxTreatments.comparisonTitle') === 'string' 
    ? t('botoxTreatments.comparisonTitle') as string 
    : 'Treatment Comparison';
  
  // Get features text as string
  const featuresText = typeof t('features') === 'string' 
    ? t('features') as string 
    : "Features";

  return (
    <Container>
      <SectionHeader 
        title={comparisonTitle}
        subtitle={comparisonData.title}
      />
      
      <div className="mt-12 overflow-x-auto">
        <Table className={`border-collapse w-full bg-white rounded-xl shadow-md ${dir.textAlign}`}>
          <TableHeader>
            <TableRow className="bg-dental-beige/30">
              <TableHead className="w-1/3 p-4 font-bold text-dental-navy">
                {featuresText}
              </TableHead>
              <TableHead className="w-1/3 p-4 font-bold text-dental-navy">
                {comparisonData.botoxTitle}
              </TableHead>
              <TableHead className="w-1/3 p-4 font-bold text-dental-navy">
                {comparisonData.hyaluronicTitle}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonData.features.map((feature, index) => (
              <TableRow 
                key={index}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-dental-beige/10'} border-b border-dental-beige/20`}
              >
                <TableCell className="p-4 font-medium text-dental-navy">
                  {feature.name}
                </TableCell>
                <TableCell className="p-4 text-dental-navy/80">
                  {feature.botox}
                </TableCell>
                <TableCell className="p-4 text-dental-navy/80">
                  {feature.hyaluronic}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
};

export default TreatmentComparison;
