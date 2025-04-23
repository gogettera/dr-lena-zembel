
import React from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSocialLinks } from '@/hooks/use-social-links';

const SOCIALS = [
  {
    key: 'facebook',
    icon: <Facebook className="mr-2 h-5 w-5 text-[#1877F2]" />,
    label: 'followOnFacebook',
  },
  {
    key: 'instagram',
    icon: <Instagram className="mr-2 h-5 w-5 text-[#E1306C]" />,
    label: 'followOnInstagram',
  },
  {
    key: 'linkedin',
    icon: <Linkedin className="mr-2 h-5 w-5 text-[#0077B5]" />,
    label: 'followOnLinkedin',
  },
  {
    key: 'youtube',
    icon: <Youtube className="mr-2 h-5 w-5 text-[#FF0000]" />,
    label: 'followOnYoutube',
  },
  {
    key: 'twitter',
    icon: <Twitter className="mr-2 h-5 w-5 text-[#1DA1F2]" />,
    label: 'followOnTwitter',
  },
];

const SocialFollowButtons = () => {
  const { t } = useLanguage();
  const { links, loading } = useSocialLinks();

  if (loading || !links || links.showSocialIcons === false) return null;

  return (
    <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
      {SOCIALS.map(({ key, icon, label }) =>
        links[key as keyof typeof links] ? (
          <Button
            key={key}
            variant="outline"
            size="lg"
            className={`rounded-full transition-colors duration-300 ${
              key === 'facebook'
                ? 'border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white'
                : key === 'instagram'
                ? 'border-[#E1306C] text-[#E1306C] hover:bg-[#E1306C] hover:text-white'
                : key === 'linkedin'
                ? 'border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white'
                : key === 'youtube'
                ? 'border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000] hover:text-white'
                : key === 'twitter'
                ? 'border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white'
                : ''
            }`}
            asChild
          >
            <a href={links[key as keyof typeof links] as string} target="_blank" rel="noopener noreferrer">
              {icon}
              {t(label)}
            </a>
          </Button>
        ) : null
      )}
    </div>
  );
};

export default SocialFollowButtons;
