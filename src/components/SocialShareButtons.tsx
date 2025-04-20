
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Share2, MessageCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';

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
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  
  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="h-4 w-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2] hover:bg-[#1877F2]/90',
    },
    {
      name: 'Twitter',
      icon: <Twitter className="h-4 w-4" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#1DA1F2] hover:bg-[#1DA1F2]/90',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-[#0077B5] hover:bg-[#0077B5]/90',
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="h-4 w-4" />,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}%0A%0A${encodedDescription}`,
      color: 'bg-[#25D366] hover:bg-[#25D366]/90',
    }
  ];

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

  // If we're in compact mode and not showing all, just show the share button
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
        <Button
          key={link.name}
          onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
          variant="outline"
          size="sm"
          className={`rounded-full ${link.color} text-white`}
          aria-label={t('shareOn', { platform: link.name })}
        >
          {link.icon}
          {!compact && <span className="ml-2">{link.name}</span>}
        </Button>
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
