
import React from 'react';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/ui/translated-text';

const ContactPage: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        <div className="py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-dental-navy mb-4">
              <TranslatedText textKey="navigation.contact" />
            </h1>
            <p className="text-lg text-dental-navy/70 max-w-2xl mx-auto">
              Get in touch with our professional dental team. We're here to help you achieve your best smile.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-dental-orange" />
                    Phone & WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-dental-navy">Clinic Phone</p>
                      <a 
                        href="tel:035666915" 
                        className="text-dental-orange hover:underline text-lg"
                      >
                        03-566-6915
                      </a>
                    </div>
                    <div>
                      <p className="font-medium text-dental-navy">WhatsApp</p>
                      <a 
                        href="https://wa.me/972566691503" 
                        className="text-dental-orange hover:underline text-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp Appointment
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-dental-orange" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-dental-navy mb-3">
                    Professional Dental Clinic<br />
                    North Jaffa<br />
                    Tel Aviv, Israel
                  </p>
                  <Button variant="outline" asChild>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View on Map
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-dental-orange" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sunday - Thursday</span>
                      <span className="font-medium">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday</span>
                      <span className="font-medium">9:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Contact Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <TranslatedText textKey="common.bookVisit" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-dental-navy/70">
                    Ready to schedule your appointment? Contact us through your preferred method:
                  </p>
                  
                  <div className="grid gap-3">
                    <Button 
                      variant="orange" 
                      size="lg" 
                      className="w-full" 
                      asChild
                    >
                      <a href="tel:035666915">
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </a>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full" 
                      asChild
                    >
                      <a 
                        href="https://wa.me/972566691503" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        WhatsApp Appointment
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-dental-navy/70 mb-4">
                    For dental emergencies outside regular hours, please call our emergency line.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="tel:035666915">
                      Emergency Line
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Insurance & Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-dental-navy/70">
                    We accept most dental insurance plans and offer flexible payment options. 
                    Contact us to verify your coverage and discuss payment plans.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
