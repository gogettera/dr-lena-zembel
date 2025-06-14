
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';
import DoctorPortrait from './DoctorPortrait';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Award, Users, Languages } from 'lucide-react';

interface DoctorProfileProps {
  variant?: 'full' | 'compact' | 'hero';
  showStats?: boolean;
  showSpecialties?: boolean;
  showLanguages?: boolean;
  className?: string;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({
  variant = 'full',
  showStats = true,
  showSpecialties = true,
  showLanguages = true,
  className = ''
}) => {
  const { t, isRTL } = useLanguage();

  const stats = [
    { icon: Award, key: 'experience', value: '13+', label: 'שנות ניסיון' },
    { icon: Users, key: 'patients', value: '5000+', label: 'מטופלים מרוצים' },
    { icon: Star, key: 'rating', value: '4.9/5', label: 'דירוג מטופלים' }
  ];

  const specialties = [
    'יישור שיניים למבוגרים וילדים',
    'רפואת שיניים לילדים',
    'טיפולי שורש מתקדמים',
    'אסתטיקה דנטלית',
    'טיפולי בוטוקס ומילוי',
    'רפואה מונעת'
  ];

  const languages = ['עברית', 'גרמנית', 'אנגלית', 'רוסית'];

  if (variant === 'compact') {
    return (
      <Card className={`bg-white/80 backdrop-blur-sm ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <DoctorPortrait 
              style="main" 
              width={80} 
              height={80} 
              className="flex-shrink-0"
            />
            <div>
              <h3 className="text-xl font-bold text-dental-navy">
                <TranslatedText textKey="doctor.profile.name" />
              </h3>
              <p className="text-dental-navy/70">
                <TranslatedText textKey="doctor.profile.title" />
              </p>
              <p className="text-sm text-dental-navy/60 mt-1">
                <TranslatedText textKey="doctor.profile.education.university" />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`text-center ${className}`}>
        <div className="relative inline-block mb-6">
          <DoctorPortrait 
            style="main" 
            width={200} 
            height={250} 
            className="mx-auto"
          />
          <div className="absolute -bottom-2 -right-2 bg-dental-orange text-white px-3 py-1 rounded-full text-sm font-bold">
            13+ שנים
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-dental-navy mb-2">
          <TranslatedText textKey="doctor.profile.name" />
        </h2>
        <p className="text-dental-navy/70 mb-4">
          <TranslatedText textKey="doctor.profile.subtitle" />
        </p>
        {showLanguages && (
          <div className="flex items-center justify-center gap-2 text-sm text-dental-navy/60">
            <Languages className="h-4 w-4" />
            <span>{languages.join(' • ')}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Profile Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/3">
          <DoctorPortrait 
            style="main" 
            width={300} 
            height={400} 
            className="w-full"
          />
        </div>
        
        <div className="md:w-2/3 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-dental-navy mb-2">
              <TranslatedText textKey="doctor.profile.name" />
            </h2>
            <p className="text-xl text-dental-navy/70 mb-4">
              <TranslatedText textKey="doctor.profile.subtitle" />
            </p>
            <div className="text-dental-navy/60">
              <p><strong>השכלה:</strong> <TranslatedText textKey="doctor.profile.education.degree" /> - <TranslatedText textKey="doctor.profile.education.university" /> (<TranslatedText textKey="doctor.profile.education.year" />)</p>
            </div>
          </div>

          {/* Philosophy Quote */}
          <Card className="bg-dental-beige/20 border-dental-orange/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-dental-navy mb-3">
                <TranslatedText textKey="doctor.profile.philosophy.title" />
              </h3>
              <blockquote className="text-dental-navy/80 italic">
                "<TranslatedText textKey="doctor.profile.philosophy.quote" />"
              </blockquote>
              <p className="text-sm text-dental-navy/60 mt-3">
                <TranslatedText textKey="doctor.profile.philosophy.approach" />
              </p>
            </CardContent>
          </Card>

          {/* Stats */}
          {showStats && (
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-dental-orange" />
                  </div>
                  <div className="text-2xl font-bold text-dental-navy">{stat.value}</div>
                  <div className="text-sm text-dental-navy/60">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Specializations */}
      {showSpecialties && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-dental-navy mb-4">התמחויות</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {specialties.map((specialty, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-dental-orange" />
                  <span className="text-dental-navy/80">{specialty}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Languages & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {showLanguages && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-dental-navy mb-4">שפות</h3>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <Badge key={index} variant="outline" className="mr-2">
                    {lang}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-dental-navy mb-4">הסמכות</h3>
            <div className="space-y-2 text-sm text-dental-navy/70">
              <p>• רישיון משרד הבריאות לעיסוק ברפואת שיניים</p>
              <p>• הסמכה בטיפולי בוטוקס וחומצה היאלורונית</p>
              <p>• השתלמויות מתמידות בטכנולוגיות מתקדמות</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorProfile;
