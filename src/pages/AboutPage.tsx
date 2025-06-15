
import React from 'react';
import { Award, Heart, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';
import DoctorPortrait from '@/components/shared/DoctorPortrait';

const AboutPage: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        <div className="py-16">
          {/* Hero Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-dental-navy mb-6">
              <TranslatedText textKey="about.aboutMe" />
            </h1>
            <p className="text-xl text-dental-navy/70 max-w-3xl mx-auto">
              <TranslatedText textKey="about.aboutMeIntro" />
            </p>
          </div>

          {/* Doctor Profile */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
            <div className="space-y-6 md:order-2">
              <h2 className="text-3xl font-bold text-dental-navy mb-3">
                <TranslatedText textKey="about.doctorProfile" />
              </h2>
              <p className="text-lg text-dental-navy/80 leading-relaxed">
                <TranslatedText textKey="about.aboutMeClinic" />
              </p>
              <p className="text-dental-navy/70">
                <TranslatedText textKey="about.aboutMeLanguages" />
              </p>
            </div>
            <div className="flex justify-center md:order-1">
              <div className="w-80 h-80 rounded-xl shadow-soft bg-dental-beige flex items-center justify-center overflow-hidden">
                <DoctorPortrait style="main" width={320} height={380} className="object-cover w-full h-full" priority />
              </div>
            </div>
          </div>

          {/* Approach Section */}
          <div className="mb-16">
            <Card className="bg-dental-beige/40 border-none">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-dental-navy mb-4">
                  <TranslatedText textKey="about.personalApproach" />
                </h3>
                <blockquote className="italic text-dental-navy/80 text-lg mb-2">
                  “<TranslatedText textKey="about.personalApproachText" />”
                </blockquote>
                <p className="text-dental-navy/70">
                  <TranslatedText textKey="about.professionalBackground" /> – <TranslatedText textKey="about.educationDetails" />
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Specializations */}
          <div className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-dental-navy mb-4">
                  <TranslatedText textKey="about.specializations" />
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-dental-navy/90">
                  {(require('@/translations/he/about.json').specializationsList || []).map((area: string, idx: number) => (
                    <li key={idx}>{area}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-dental-navy mb-6">
              <TranslatedText textKey="about.values.title" />
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {(require('@/translations/he/about.json').values.list || []).map(
                (val: {title: string, description: string}, idx: number) => (
                <Card key={idx} className="bg-white/70">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-dental-navy mb-2">{val.title}</h3>
                    <p className="text-dental-navy/70">{val.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="mb-16">
            <Card className="bg-dental-beige/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-dental-navy mb-4">
                  <TranslatedText textKey="about.myStory.title" />
                </h3>
                <p className="text-dental-navy/80 text-lg">
                  <TranslatedText textKey="about.myStory.content" />
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;

