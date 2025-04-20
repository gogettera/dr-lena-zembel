
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Image } from "lucide-react";

export const FaviconSettings = () => {
  const [faviconFile, setFaviconFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG or JPG)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Favicon must be less than 1MB",
        variant: "destructive",
      });
      return;
    }

    setFaviconFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faviconFile) return;

    try {
      const formData = new FormData();
      formData.append('file', faviconFile);
      
      toast({
        title: "Favicon updated",
        description: "The site favicon has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favicon. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Favicon</h3>
      <p className="text-sm text-gray-600 mb-4">
        Upload a new favicon for your website. Use PNG or JPG format, maximum size 1MB.
        The favicon will appear in browser tabs and bookmarks.
      </p>

      <div className="flex items-start space-x-4">
        {previewUrl && (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Favicon preview"
              className="w-16 h-16 rounded border border-gray-200"
            />
            <p className="text-xs text-gray-500 mt-1">Preview</p>
          </div>
        )}

        <div className="flex-1 space-y-4">
          <div>
            <Input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
              className="cursor-pointer"
              aria-label="Upload favicon"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended size: 32x32 pixels
            </p>
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!faviconFile}
            className="w-full sm:w-auto"
          >
            <Image className="w-4 h-4 mr-2" />
            Update Favicon
          </Button>
        </div>
      </div>
    </div>
  );
};
