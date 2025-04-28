
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const WhatsAppButton: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <a
      href="https://wa.me/972566666915"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg",
        "flex items-center justify-center hover:scale-110 transition-transform duration-300"
      )}
      aria-label={t('common.contactViaWhatsapp')}
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton;
