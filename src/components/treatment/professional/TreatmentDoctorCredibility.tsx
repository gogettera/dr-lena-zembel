
import React from 'react';
import { TranslatedText } from '@/components/ui/translated-text';
import DoctorProfile from './components/DoctorProfile';
import DoctorCredentialsList from './components/DoctorCredentialsList';
import DoctorContactActions from './components/DoctorContactActions';

const TreatmentDoctorCredibility: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-navy mb-4">
            <TranslatedText textKey="treatments.doctor.title" defaultText="המומחיות שלנו" />
          </h2>
          <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
            <TranslatedText 
              textKey="treatments.doctor.subtitle" 
              defaultText="פגשו את ד״ר לנה זמבל - מומחית רפואת שיניים עם ניסיון בינלאומי"
            />
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <DoctorProfile />
          <div className="space-y-6">
            <DoctorCredentialsList />
            <DoctorContactActions />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentDoctorCredibility;
