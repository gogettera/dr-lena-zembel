
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Clock, Mail, Car, Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClinicInfoProps {
  variant?: 'full' | 'compact' | 'contact';
  showMap?: boolean;
  showHours?: boolean;
  showFeatures?: boolean;
  className?: string;
}

const ClinicInfo: React.FC<ClinicInfoProps> = ({
  variant = 'full',
  showMap = true,
  showHours = true,
  showFeatures = true,
  className = ''
}) => {
  const { t, isRTL } = useLanguage();

  const contactInfo = [
    { icon: MapPin, key: 'address', value: 'דרך בן צבי 2, צפון יפו' },
    { icon: Phone, key: 'phone', value: '03-566-6915' },
    { icon: Mail, key: 'email', value: 'info@drzembel.co.il' }
  ];

  const hours = [
    { days: 'ראשון - חמישי', time: '09:00-18:00' },
    { days: 'שישי', time: '09:00-13:00' },
    { days: 'שבת', time: 'סגור' }
  ];

  const features = [
    { icon: Car, title: 'חניה נוחה', desc: 'חניה זמינה בסביבת המרפאה' },
    { icon: Accessibility, title: 'נגישות מלאה', desc: 'מרפאה נגישה לכיסאות גלגלים' }
  ];

  if (variant === 'compact') {
    return (
      <Card className={`bg-white/80 backdrop-blur-sm ${className}`}>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-dental-navy mb-4">פרטי התקשרות</h3>
          <div className="space-y-3">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-dental-orange" />
                <span className="text-dental-navy/80">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'contact') {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Contact Information */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-dental-navy mb-6">
              <TranslatedText textKey="contact.clinicInfo" />
            </h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-dental-orange/10 p-3 rounded-full">
                    <item.icon className="h-5 w-5 text-dental-orange" />
                  </div>
                  <div>
                    <span className="text-dental-navy font-medium">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Opening Hours */}
        {showHours && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-dental-navy mb-6">
                <TranslatedText textKey="contact.openingHours" />
              </h3>
              <div className="space-y-3">
                {hours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-dental-beige/30 last:border-b-0">
                    <span className="text-dental-navy font-medium">{schedule.days}</span>
                    <span className="text-dental-navy/70">{schedule.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-dental-orange/10 rounded-lg">
                <p className="text-sm text-dental-navy/80">
                  <TranslatedText textKey="contact.emergencyNote" />
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="orange" size="lg" className="w-full">
            <Phone className="h-5 w-5 mr-2" />
            <TranslatedText textKey="common.call" />
          </Button>
          <Button variant="outline" size="lg" className="w-full">
            <TranslatedText textKey="common.whatsapp" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Clinic Information */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-dental-navy mb-6">
            <TranslatedText textKey="clinic.facilities.title" />
          </h2>
          <p className="text-dental-navy/70 mb-6">
            <TranslatedText textKey="clinic.facilities.subtitle" />
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-dental-orange/10 p-3 rounded-full">
                    <item.icon className="h-6 w-6 text-dental-orange" />
                  </div>
                  <div>
                    <span className="text-dental-navy font-medium text-lg">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {showHours && (
              <div>
                <h3 className="text-lg font-bold text-dental-navy mb-4">
                  <Clock className="h-5 w-5 inline mr-2" />
                  שעות פעילות
                </h3>
                <div className="space-y-2">
                  {hours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-dental-navy/70">{schedule.days}</span>
                      <span className="text-dental-navy font-medium">{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Clinic Features */}
      {showFeatures && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-dental-orange/10 p-3 rounded-full">
                    <feature.icon className="h-6 w-6 text-dental-orange" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dental-navy mb-2">{feature.title}</h3>
                    <p className="text-dental-navy/70">{feature.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClinicInfo;
