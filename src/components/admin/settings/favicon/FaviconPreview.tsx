
import React from 'react';
import { Card } from "@/components/ui/card";

interface FaviconPreviewProps {
  url: string;
  isTabPreview?: boolean;
}

export const FaviconPreview = ({ url, isTabPreview = false }: FaviconPreviewProps) => {
  if (!url) {
    return (
      <div className="text-sm text-gray-500 py-4">
        No favicon set
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded p-2 bg-gray-50 mb-2">
      <img 
        src={url} 
        alt={isTabPreview ? "Tab preview" : "Current favicon"} 
        className={isTabPreview ? "w-4 h-4 object-contain" : "w-16 h-16 object-contain"}
      />
    </div>
  );
};
