
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Share2, MessageCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-[#25D366] hover:bg-[#25D366]/90',
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        toast({
          title: "Link copied!",
          description: "The link has been copied to your clipboard.",
        });
      },
      () => {
        toast({
          title: "Failed to copy",
          description: "Could not copy the link to clipboard.",
          variant: "destructive",
        });
      }
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: url,
      })
      .catch((error) => console.log('Error sharing', error));
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
          Share
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          onClick={() => window.open(link.url, '_blank')}
          variant="outline"
          size="sm"
          className={`rounded-full ${link.color} text-white`}
          aria-label={`Share on ${link.name}`}
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
        aria-label="Copy link"
      >
        <Share2 className="h-4 w-4" />
        {!compact && <span className="ml-2">Copy Link</span>}
      </Button>
    </div>
  );
};

export default SocialShareButtons;
