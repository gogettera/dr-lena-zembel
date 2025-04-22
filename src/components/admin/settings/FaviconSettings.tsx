
import React, { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { FaviconPreview } from './favicon/FaviconPreview';
import { FaviconForm } from './favicon/FaviconForm';
import { useFavicon } from '@/hooks/use-favicon';
import { Label } from "@/components/ui/label";

export const FaviconSettings = () => {
  const [currentFaviconUrl, setCurrentFaviconUrl] = useState<string>('');
  const { isFetching, fetchFavicon, updateFavicon } = useFavicon();

  useEffect(() => {
    const loadFavicon = async () => {
      console.log('Loading favicon...');
      const url = await fetchFavicon();
      console.log('Favicon URL loaded:', url);
      setCurrentFaviconUrl(url);
    };
    loadFavicon();
  }, [fetchFavicon]);

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Favicon</h3>
      <p className="text-sm text-gray-600 mb-4">
        Upload a new favicon for your website. Use PNG, JPG or SVG format, maximum size 1MB.
        The favicon will appear in browser tabs and bookmarks.
      </p>

      {isFetching ? (
        <div className="flex justify-center my-6">
          <Loader2 className="h-6 w-6 animate-spin text-dental-navy" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Label className="text-sm font-medium mb-2">Current Favicon</Label>
            <Card className="p-4 flex flex-col items-center justify-center">
              {currentFaviconUrl ? (
                <>
                  <FaviconPreview url={currentFaviconUrl} />
                  <span className="text-xs text-gray-500">Current favicon</span>
                </>
              ) : (
                <div className="text-sm text-gray-500 py-4">
                  No favicon set
                </div>
              )}
              {/* Example upload image */}
              <div className="w-full flex flex-col items-center mt-4">
                <span className="text-xs text-gray-400 mb-1">Example image for upload:</span>
                <img
                  src="/lovable-uploads/0220ac9e-7ca5-472e-9bcc-e630090c6ff2.png"
                  alt="Example upload"
                  className="w-20 h-20 rounded-full object-cover border border-gray-200 shadow"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            </Card>
          </div>

          <div className="w-full md:w-2/3">
            <FaviconForm 
              currentFaviconUrl={currentFaviconUrl}
              onUpdate={async (file) => {
                const result = await updateFavicon(file);
                if (result.success) {
                  setCurrentFaviconUrl(result.url);
                }
                return result;
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
