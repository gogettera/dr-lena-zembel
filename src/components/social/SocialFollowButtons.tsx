
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram } from 'lucide-react';
import { useSocialLinks } from '@/hooks/use-social-links';

const SocialFollowButtons = () => {
  const { t } = useLanguage();
  const { links, loading } = useSocialLinks();
  
  // Default URLs in case the database settings aren't available yet
  const facebookUrl = links?.facebook || 'https://facebook.com/drzembel';
  const instagramUrl = links?.instagram || 'https://instagram.com';
  
  return (
    <div className="flex justify-center gap-4 mt-10">
      <Button
        variant="outline"
        className="bg-white flex items-center gap-2 border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors"
        onClick={() => window.open(facebookUrl, '_blank')}
      >
        <Facebook size={18} />
        {t('social.followButtons.facebook')}
      </Button>
      
      {links?.instagram && (
        <Button
          variant="outline"
          className="bg-white flex items-center gap-2 border-[#E1306C] text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-colors"
          onClick={() => window.open(instagramUrl, '_blank')}
        >
          <Instagram size={18} />
          {t('social.followButtons.instagram')}
        </Button>
      )}
    </div>
  );
};

export default SocialFollowButtons;
