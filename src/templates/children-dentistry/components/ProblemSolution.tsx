
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, X } from 'lucide-react';

const ProblemSolution: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-white to-[#F1F0FB]/50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-12 text-center">
          {t('childrenAdLanding.problem.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Item 1 */}
          <div className="rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
            <div className="bg-dental-navy text-white p-4 flex items-center justify-between">
              <span className="font-semibold">
                {t('childrenAdLanding.problem.item1.problem')}
              </span>
              <X className="w-5 h-5" />
            </div>
            <div className="bg-white p-4 flex items-center justify-between">
              <span className="font-semibold text-dental-navy">
                {t('childrenAdLanding.problem.item1.solution')}
              </span>
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div className="p-4 bg-dental-beige/20">
              <img 
                src="/lovable-uploads/23038120-1edf-4bff-9e78-5a73c0f15161.png" 
                alt=""
                className="h-40 w-full object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* Item 2 */}
          <div className="rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
            <div className="bg-dental-navy text-white p-4 flex items-center justify-between">
              <span className="font-semibold">
                {t('childrenAdLanding.problem.item2.problem')}
              </span>
              <X className="w-5 h-5" />
            </div>
            <div className="bg-white p-4 flex items-center justify-between">
              <span className="font-semibold text-dental-navy">
                {t('childrenAdLanding.problem.item2.solution')}
              </span>
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div className="p-4 bg-dental-beige/20">
              <img 
                src="/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg" 
                alt=""
                className="h-40 w-full object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* Item 3 */}
          <div className="rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
            <div className="bg-dental-navy text-white p-4 flex items-center justify-between">
              <span className="font-semibold">
                {t('childrenAdLanding.problem.item3.problem')}
              </span>
              <X className="w-5 h-5" />
            </div>
            <div className="bg-white p-4 flex items-center justify-between">
              <span className="font-semibold text-dental-navy">
                {t('childrenAdLanding.problem.item3.solution')}
              </span>
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div className="p-4 bg-dental-beige/20">
              <img 
                src="/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg" 
                alt=""
                className="h-40 w-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
