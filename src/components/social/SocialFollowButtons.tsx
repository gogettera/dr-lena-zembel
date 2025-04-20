
import React from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const SocialFollowButtons = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
      <Button 
        variant="outline" 
        size="lg" 
        className="rounded-full border-dental-navy text-dental-navy hover:bg-dental-navy hover:text-white transition-colors duration-300"
        asChild
      >
        <a href="https://www.facebook.com/drzembel" target="_blank" rel="noopener noreferrer">
          <Facebook className="mr-2 h-5 w-5" />
          {t('followOnFacebook')}
        </a>
      </Button>
      
      <Button 
        variant="outline" 
        size="lg" 
        className="rounded-full border-[#E1306C] text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-colors duration-300"
        asChild
      >
        <a href="https://www.instagram.com/lena.zembel/" target="_blank" rel="noopener noreferrer">
          <Instagram className="mr-2 h-5 w-5" />
          Follow on Instagram
        </a>
      </Button>
    </div>
  );
};

export default SocialFollowButtons;

