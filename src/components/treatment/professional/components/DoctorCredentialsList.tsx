
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { doctorCredentials } from '@/data/doctorCredentials';

const DoctorCredentialsList: React.FC = () => {
  return (
    <div className="space-y-6">
      {doctorCredentials.map((credential, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 border-dental-beige/30">
          <CardContent className="p-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-dental-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                <credential.icon className="h-6 w-6 text-dental-orange" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-dental-navy mb-3">{credential.title}</h3>
                <ul className="space-y-2">
                  {credential.details.map((detail, idx) => (
                    <li key={idx} className="text-dental-navy/70 text-sm flex items-start">
                      <span className="inline-block w-2 h-2 bg-dental-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DoctorCredentialsList;
