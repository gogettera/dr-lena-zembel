
import React from 'react';
import { Award, Heart, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';

const AboutPage: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        <div className="py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-dental-navy mb-6">
              <TranslatedText textKey="navigation.about" />
            </h1>
            <p className="text-xl text-dental-navy/70 max-w-3xl mx-auto">
              <TranslatedText textKey="common.dentistryWithLove" />
            </p>
          </div>

          {/* Doctor Profile */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-dental-navy">
                <TranslatedText textKey="common.clinicName" />
              </h2>
              <p className="text-lg text-dental-navy/80 leading-relaxed">
                With years of experience in modern dentistry, Dr. Lena Zembel brings expertise, 
                compassion, and the latest dental technology to provide exceptional care for patients 
                of all ages.
              </p>
              <p className="text-dental-navy/70">
                Our clinic specializes in comprehensive dental care, from preventive treatments 
                to advanced aesthetic procedures. We believe in creating a comfortable, welcoming 
                environment where patients feel at ease during their dental visits.
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-dental-beige rounded-lg flex items-center justify-center">
                <p className="text-dental-navy/50">Doctor Photo</p>
              </div>
            </div>
          </div>

          {/* Values & Approach */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="w-12 h-12 text-dental-orange mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-dental-navy mb-2">
                  Patient Care
                </h3>
                <p className="text-dental-navy/70 text-sm">
                  Every patient receives personalized attention and care tailored to their unique needs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-dental-orange mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-dental-navy mb-2">
                  Excellence
                </h3>
                <p className="text-dental-navy/70 text-sm">
                  We maintain the highest standards of dental care using modern equipment and techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-dental-orange mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-dental-navy mb-2">
                  Family Friendly
                </h3>
                <p className="text-dental-navy/70 text-sm">
                  We welcome patients of all ages and specialize in creating positive dental experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-dental-orange mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-dental-navy mb-2">
                  Convenience
                </h3>
                <p className="text-dental-navy/70 text-sm">
                  Flexible scheduling and efficient appointments that respect your valuable time.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Clinic Information */}
          <div className="bg-dental-beige/30 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-dental-navy mb-4">
                <TranslatedText textKey="navigation.practice" />
              </h2>
              <p className="text-lg text-dental-navy/70">
                <TranslatedText textKey="common.practiceFresh" />
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-xl font-semibold text-dental-navy mb-3">
                  Modern Equipment
                </h3>
                <p className="text-dental-navy/70">
                  State-of-the-art dental technology for precise diagnosis and comfortable treatments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-dental-navy mb-3">
                  Sterilization Standards
                </h3>
                <p className="text-dental-navy/70">
                  The highest levels of cleanliness and sterilization protocols for your safety.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-dental-navy mb-3">
                  Comfortable Environment
                </h3>
                <p className="text-dental-navy/70">
                  A welcoming, relaxing atmosphere designed to reduce dental anxiety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
