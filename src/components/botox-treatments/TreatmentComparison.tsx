
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
  const comparisonData = t('botoxTreatments.treatmentComparison', { returnObjects: true }) as TreatmentComparisonType;

  return (
    <Container>
      <SectionHeader 
        title={t('botoxTreatments.comparisonTitle')}
        subtitle={comparisonData.title}
      />
      
      <div className="mt-12 overflow-x-auto">
        <Table className={`border-collapse w-full bg-white rounded-xl shadow-md ${dir.textAlign}`}>
          <TableHeader>
            <TableRow className="bg-dental-beige/30">
              <TableHead className="w-1/3 p-4 font-bold text-dental-navy">
                {t('features')}
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
