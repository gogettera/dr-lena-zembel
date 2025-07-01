
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface EnhancedTreatmentFAQProps {
  title: string;
  items: FAQItem[];
}

const EnhancedTreatmentFAQ: React.FC<EnhancedTreatmentFAQProps> = ({
  title,
  items
}) => {
  return (
    <section className="py-16 bg-gradient-to-b from-dental-beige/20 to-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-dental-orange/10 rounded-full px-4 py-2 mb-4">
            <HelpCircle className="h-5 w-5 text-dental-orange" />
            <span className="text-dental-orange font-medium">שאלות ותשובות</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            {title}
          </h2>
          <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
            תשובות מקצועיות לשאלות הנפוצות ביותר על הטיפול
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-dental-beige/30 rounded-lg px-6 bg-white shadow-sm">
                <AccordionTrigger className="text-dental-navy font-semibold text-right hover:text-dental-orange transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-dental-navy/80 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-dental-beige/30 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-dental-navy mb-2">
              יש לכם שאלה נוספת?
            </h3>
            <p className="text-dental-navy/70 mb-4">
              נשמח לענות ולתת לכם ייעוץ מקצועי ללא התחייבות
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => window.location.href = 'tel:03-566-6915'}
                className="flex-1 bg-dental-orange text-white py-2 px-4 rounded-lg font-medium hover:bg-dental-orange/90 transition-colors"
              >
                התקשרו עכשיו
              </button>
              <button 
                onClick={() => window.open('https://wa.me/972515666915', '_blank')}
                className="flex-1 border border-dental-orange text-dental-orange py-2 px-4 rounded-lg font-medium hover:bg-dental-orange/10 transition-colors"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTreatmentFAQ;
