
import React from 'react';
import { Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { TranslatedText } from '@/components/ui/translated-text';
import { Card, CardContent } from '@/components/ui/card';

interface ProcessStep {
  title: string;
  description: string;
  duration?: string;
}

interface EnhancedTreatmentProcessProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

const EnhancedTreatmentProcess: React.FC<EnhancedTreatmentProcessProps> = ({
  title,
  subtitle,
  steps
}) => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-dental-beige/20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            {title}
          </h2>
          <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute top-8 left-8 right-8 h-0.5 bg-dental-beige/50 hidden md:block" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="w-16 h-16 bg-dental-navy rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto md:mx-0 relative z-10">
                  {index + 1}
                </div>

                {/* Step Card */}
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-dental-beige/30">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-dental-navy mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-dental-navy/70 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {step.duration && (
                      <div className="flex items-center gap-2 text-dental-orange">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">{step.duration}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-6 md:hidden">
                    <ArrowLeft className="h-6 w-6 text-dental-navy/30 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-dental-orange/10 rounded-full px-6 py-3">
            <CheckCircle className="h-5 w-5 text-dental-orange" />
            <span className="text-dental-navy font-medium">
              כל טיפול מבוצע לפי פרוטוקולים רפואיים מחמירים ומותאם לצרכים הספציפיים של כל מטופל
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTreatmentProcess;
