
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle } from 'lucide-react';

interface ComparisonFeature {
  name: string;
  botox: string;
  hyaluronic: string;
}

interface TreatmentComparison {
  title: string;
  botoxTitle: string;
  hyaluronicTitle: string;
  features: ComparisonFeature[];
}

const TreatmentComparison: React.FC = () => {
  const { t } = useLanguage();
  // Fix: Cast the result to TreatmentComparison
  const comparison = t('botoxTreatments.treatmentComparison', { returnObjects: true }) as TreatmentComparison;

  return (
    <Container>
      <SectionHeader 
        title={comparison.title}
        subtitle="השוואה בין שני סוגי הטיפולים המובילים שלנו"
      />
      
      <div className="mt-12 overflow-auto">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-dental-navy text-white">
              <TableHead className="p-3 text-right min-w-[200px] text-white">{t('treatments')}</TableHead>
              <TableHead className="p-3 text-center min-w-[180px] text-white">{comparison.botoxTitle}</TableHead>
              <TableHead className="p-3 text-center min-w-[180px] text-white">{comparison.hyaluronicTitle}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparison.features.map((feature, index) => (
              <TableRow key={index} className={index % 2 === 0 ? 'bg-dental-beige/10' : 'bg-white'}>
                <TableCell className="p-3 text-right font-medium text-dental-navy border-b border-dental-beige/30">
                  {feature.name}
                </TableCell>
                <TableCell className="p-3 text-center border-b border-dental-beige/30">
                  {feature.botox}
                </TableCell>
                <TableCell className="p-3 text-center border-b border-dental-beige/30">
                  {feature.hyaluronic}
                </TableCell>
              </TableRow>
            ))}
            
            {/* Additional comparison features */}
            <TableRow className="bg-white">
              <TableCell className="p-3 text-right font-medium text-dental-navy border-b border-dental-beige/30">
                הפיכות הטיפול
              </TableCell>
              <TableCell className="p-3 text-center border-b border-dental-beige/30">
                <div className="flex justify-center">
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
                <span className="text-sm text-dental-navy/70 block mt-1">לא הפיך</span>
              </TableCell>
              <TableCell className="p-3 text-center border-b border-dental-beige/30">
                <div className="flex justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-sm text-dental-navy/70 block mt-1">ניתן להמיס</span>
              </TableCell>
            </TableRow>
            
            <TableRow className="bg-dental-beige/10">
              <TableCell className="p-3 text-right font-medium text-dental-navy border-b border-dental-beige/30">
                מטרת הטיפול
              </TableCell>
              <TableCell className="p-3 text-center border-b border-dental-beige/30">
                הרפיית שרירים והפחתת קמטים
              </TableCell>
              <TableCell className="p-3 text-center border-b border-dental-beige/30">
                מילוי נפח והענקת לחות
              </TableCell>
            </TableRow>
            
            <TableRow className="bg-white">
              <TableCell className="p-3 text-right font-medium text-dental-navy border-b border-dental-beige/30">
                מחיר ממוצע לטיפול
              </TableCell>
              <TableCell className="p-3 text-center border-b border-dental-beige/30">
                ₪1,000-2,000
              </TableCell>
              <TableCell className="p-3 text-center border-b border-dental-beige/30">
                ₪1,500-3,000
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-dental-navy/60">
          * המידע לעיל הינו לצורך השוואה כללית בלבד. התאמת הטיפול האישית תקבע בפגישת ייעוץ.
        </p>
      </div>
    </Container>
  );
};

export default TreatmentComparison;
