
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Image, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { validateImageFile, createFilePreview } from "@/utils/fileUtils";

export const FaviconSettings = () => {
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [currentFaviconUrl, setCurrentFaviconUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  // Fetch current favicon setting
  useEffect(() => {
    const fetchFavicon = async () => {
      try {
        setIsFetching(true);
        const { data, error } = await supabase
          .from('site_meta')
          .select('favicon_url')
          .eq('id', 1)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data?.favicon_url) {
          setCurrentFaviconUrl(data.favicon_url);
          setPreviewUrl(data.favicon_url);
        }
      } catch (error) {
        console.error('Error fetching favicon:', error);
        toast({
          title: "Failed to load current favicon",
          description: "Couldn't retrieve the current favicon setting.",
          variant: "destructive",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchFavicon();
  }, [toast]);

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
    const previewUrl = await createFilePreview(file);
    setPreviewUrl(previewUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faviconFile) return;

    try {
      setIsLoading(true);
      
      // For now, we're just storing the URL in the database
      // In a real implementation, you would upload to a storage bucket
      const faviconUrl = URL.createObjectURL(faviconFile);
      
      // Update site_meta table with the favicon URL
      const { error } = await supabase
        .from('site_meta')
        .upsert({
          id: 1, 
          favicon_url: faviconUrl,
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'id' 
        });

      if (error) throw error;
      
      setCurrentFaviconUrl(faviconUrl);
      
      toast({
        title: "Favicon updated",
        description: "The site favicon has been updated successfully.",
      });
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
                  <div className="border border-gray-200 rounded p-2 bg-gray-50 mb-2">
                    <img 
                      src={currentFaviconUrl} 
                      alt="Current favicon" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <span className="text-xs text-gray-500">Current favicon</span>
                </>
              ) : (
                <div className="text-sm text-gray-500 py-4">
                  No favicon set
                </div>
              )}
            </Card>
          </div>

          <div className="w-full md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="favicon-upload" className="text-sm font-medium">Upload New Favicon</Label>
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
                    <div className="border border-gray-200 rounded p-2 bg-gray-50">
                      <img
                        src={previewUrl}
                        alt="Favicon preview"
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <div className="flex items-center border border-gray-200 rounded px-2 py-1 bg-gray-50">
                      <div className="w-4 h-4 mr-1">
                        <img
                          src={previewUrl}
                          alt="Tab preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs">Browser tab preview</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                onClick={handleSubmit}
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
          </div>
        </div>
      )}
    </div>
  );
};
