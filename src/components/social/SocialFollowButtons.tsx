
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram } from 'lucide-react';

const SocialFollowButtons = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-center gap-4 mt-10">
      <Button
        variant="outline"
        className="bg-white flex items-center gap-2 border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors"
        onClick={() => window.open('https://facebook.com', '_blank')}
      >
        <Facebook size={18} />
        {t('social.followButtons.facebook', 'עקבו אחרינו בפייסבוק')}
      </Button>
      <Button
        variant="outline"
        className="bg-white flex items-center gap-2 border-[#E1306C] text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-colors"
        onClick={() => window.open('https://instagram.com', '_blank')}
      >
        <Instagram size={18} />
        {t('social.followButtons.instagram', 'עקבו אחרינו באינסטגרם')}
      </Button>
    </div>
  );
};

export default SocialFollowButtons;
