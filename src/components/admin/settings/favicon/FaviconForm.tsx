
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Image, Loader2 } from "lucide-react";
import { validateImageFile, createFilePreview } from "@/utils/fileUtils";
import { FaviconPreview } from "./FaviconPreview";

interface FaviconFormProps {
  currentFaviconUrl: string;
  onUpdate: (file: File) => Promise<{ success: boolean, url: string }>;
}

export const FaviconForm = ({ currentFaviconUrl, onUpdate }: FaviconFormProps) => {
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(currentFaviconUrl);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast({
        title: "Invalid file",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    setFaviconFile(file);
    const preview = await createFilePreview(file);
    setPreviewUrl(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faviconFile) return;

    try {
      setIsLoading(true);
      console.log('Submitting favicon update...');
      
      const result = await onUpdate(faviconFile);
      
      if (result.success) {
        setPreviewUrl(result.url);
        toast({
          title: "Favicon updated",
          description: "The site favicon has been updated successfully.",
        });
      } else {
        throw new Error("Failed to update favicon");
      }
    } catch (error) {
      console.error('Error updating favicon:', error);
      toast({
        title: "Error",
        description: "Failed to update favicon. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="favicon-upload">Upload New Favicon</Label>
        <Input
          id="favicon-upload"
          type="file"
          accept="image/png,image/jpeg,image/svg+xml"
          onChange={handleFileChange}
          className="cursor-pointer mt-1"
          aria-label="Upload favicon"
          disabled={isLoading}
        />
        <p className="text-xs text-gray-500 mt-1">
          Recommended size: 32×32 pixels for PNG/JPG, scalable for SVG
        </p>
      </div>

      {previewUrl && previewUrl !== currentFaviconUrl && (
        <div className="my-2">
          <Label className="text-sm font-medium mb-2">Preview</Label>
          <div className="flex items-center gap-3">
            <FaviconPreview url={previewUrl} />
            <div className="flex items-center border border-gray-200 rounded px-2 py-1 bg-gray-50">
              <FaviconPreview url={previewUrl} isTabPreview />
              <span className="text-xs ml-1">Browser tab preview</span>
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={!faviconFile || isLoading}
        className="w-full sm:w-auto"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Updating...
          </>
        ) : (
          <>
            <Image className="w-4 h-4 mr-2" />
            Update Favicon
          </>
        )}
      </Button>
    </form>
  );
};
