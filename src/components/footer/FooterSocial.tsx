
import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import { useSocialLinks } from '@/hooks/use-social-links';

const iconMap: { [key: string]: React.ReactNode } = {
  facebook: <Facebook size={20} />,
  instagram: <Instagram size={20} />,
  linkedin: <Linkedin size={20} />,
  youtube: <Youtube size={20} />,
  twitter: <Twitter size={20} />,
};

const FooterSocial = () => {
  const { links, loading } = useSocialLinks();

  if (loading || !links || links.showSocialIcons === false) return null;

  // Only show icons for links that are not empty
  const entries = Object.entries(links).filter(([key, value]) =>
    ['facebook', 'instagram', 'linkedin', 'youtube', 'twitter'].includes(key) &&
    value
  );

  if (entries.length === 0) return null;

  return (
    <div className="flex gap-4 mt-1">
      {entries.map(([key, value]) => (
        <a
          key={key}
          href={value as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dental-navy hover:text-dental-orange transition-colors"
          aria-label={key.charAt(0).toUpperCase() + key.slice(1)}
        >
          {iconMap[key]}
        </a>
      ))}
    </div>
  );
};

export default FooterSocial;
