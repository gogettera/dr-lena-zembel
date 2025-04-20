
import { useMemo } from 'react';
import { Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';

export const useShareLinks = (url: string, title: string, description: string) => {
  return useMemo(() => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    return [
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
  }, [url, title, description]);
};
