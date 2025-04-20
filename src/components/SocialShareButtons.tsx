
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Share2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { ShareButton } from './share/ShareButton';
import { useShareLinks } from './share/useShareLinks';

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ 
  url = window.location.href,
  title = document.title,
  description = '',
  compact = false,
  className = ''
}) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  
  const shareLinks = useShareLinks(url, title, description);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: t('linkCopied'),
        description: t('linkCopiedDesc'),
      });
    } catch (err) {
      toast({
        title: t('copyError'),
        description: t('copyErrorDesc'),
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setShowAll(true);
        }
      }
    } else {
      setShowAll(true);
    }
  };

  if (compact && !showAll) {
    return (
      <div className={className}>
        <Button 
          onClick={handleShare} 
          variant="outline" 
          size="sm" 
          className="rounded-full"
        >
          <Share2 className="h-4 w-4 mr-2" />
          {t('share')}
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {shareLinks.map((link) => (
        <ShareButton
          key={link.name}
          name={link.name}
          icon={link.icon}
          url={link.url}
          color={link.color}
          compact={compact}
          onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
          ariaLabel={t('shareOn', { platform: link.name })}
        />
      ))}
      
      <Button
        onClick={copyToClipboard}
        variant="outline"
        size="sm"
        className="rounded-full"
        aria-label={t('copyLink')}
      >
        <Share2 className="h-4 w-4" />
        {!compact && <span className="ml-2">{t('copyLink')}</span>}
      </Button>
    </div>
  );
};

export default SocialShareButtons;
