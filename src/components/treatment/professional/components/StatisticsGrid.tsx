
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TreatmentStat } from '@/data/treatmentWhyChooseUs';

interface StatisticsGridProps {
  stats: TreatmentStat[];
}

const StatisticsGrid: React.FC<StatisticsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
          <CardContent className="p-0">
            <div className="mb-4">
              <stat.icon className="h-8 w-8 text-dental-orange mx-auto mb-2" />
              <div className="text-3xl font-bold text-dental-navy mb-1">{stat.number}</div>
              <div className="text-sm text-dental-navy/70">{stat.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsGrid;
