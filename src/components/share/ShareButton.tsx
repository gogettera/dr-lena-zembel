
import React from 'react';
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

interface ShareButtonProps {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
  compact?: boolean;
  onClick: () => void;
  ariaLabel: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  name,
  icon,
  color,
  compact,
  onClick,
  ariaLabel
}) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="sm"
      className={`rounded-full ${color} text-white`}
      aria-label={ariaLabel}
    >
      {icon}
      {!compact && <span className="ml-2">{name}</span>}
    </Button>
  );
};
