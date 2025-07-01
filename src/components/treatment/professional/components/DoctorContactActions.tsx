
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';

const DoctorContactActions: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
      <Button 
        variant="orange" 
        size="lg"
        onClick={() => window.location.href = 'tel:03-566-6915'}
      >
        <Phone className="h-4 w-4 mr-2" />
        התקשרו עכשיו
      </Button>
      <Button 
        variant="outline" 
        size="lg"
        onClick={() => window.open('https://wa.me/972515666915', '_blank')}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        WhatsApp
      </Button>
    </div>
  );
};

export default DoctorContactActions;
