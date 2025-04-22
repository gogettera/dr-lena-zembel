
import React from 'react';
import { Button } from "@/components/ui/button";

interface VideoActionsProps {
  onRemove: () => void;
  disabled?: boolean;
}

const VideoActions = ({ onRemove, disabled }: VideoActionsProps) => {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={onRemove}
      disabled={disabled}
    >
      Remove
    </Button>
  );
};

export default VideoActions;
