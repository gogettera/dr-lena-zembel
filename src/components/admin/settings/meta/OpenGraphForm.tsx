
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { MetaFormData } from "@/hooks/use-meta-form";
import { validateImageFile, createFilePreview } from "@/utils/fileUtils";
import { useToast } from "@/hooks/use-toast";

interface OpenGraphFormProps {
  form: UseFormReturn<MetaFormData>;
  loading: boolean;
  ogImagePreview: string;
  setOgImagePreview: (url: string) => void;
}

export const OpenGraphForm = ({ form, loading, ogImagePreview, setOgImagePreview }: OpenGraphFormProps) => {
  const { toast } = useToast();

  const handleOgImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file, 2);
    if (!validation.valid) {
      toast({
        title: "Invalid file",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    form.setValue('ogImage', file);
    const preview = await createFilePreview(file);
    setOgImagePreview(preview);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-4 w-4 text-dental-navy" />
        <p className="text-sm text-gray-600">
          Open Graph settings control how your site appears when shared on Facebook, LinkedIn, and other social platforms.
        </p>
      </div>

      <FormField
        control={form.control}
        name="ogTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Social Share Title</FormLabel>
            <FormControl>
              <Input {...field} disabled={loading} />
            </FormControl>
            <FormDescription>
              Title for social media shares (can differ from the browser title)
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ogDescription"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel>Social Share Description</FormLabel>
            <FormControl>
              <Textarea {...field} disabled={loading} />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="mt-4">
        <FormLabel>Social Share Image</FormLabel>
        <div className="mt-1 mb-3">
          {ogImagePreview && (
            <div className="mb-3 border rounded p-2 inline-block">
              <img
                src={ogImagePreview}
                alt="Open Graph preview"
                className="max-w-full h-auto max-h-48 border rounded"
              />
            </div>
          )}
          
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <FormLabel className="text-sm text-gray-600">Upload Image</FormLabel>
              <Input
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleOgImageChange}
                className="cursor-pointer mt-1"
                disabled={loading}
              />
            </div>
            
            <div>
              <FormLabel className="text-sm text-gray-600">Or Enter Image URL</FormLabel>
              <Input
                type="text"
                value={form.getValues().ogImageUrl}
                onChange={e => {
                  form.setValue('ogImageUrl', e.target.value);
                  if (e.target.value) setOgImagePreview(e.target.value);
                }}
                placeholder="https://example.com/og-image.jpg"
                disabled={loading}
                className="mt-1"
              />
            </div>
          </div>
          
          <FormDescription className="mt-2">
            Recommended size: 1200×630 pixels (aspect ratio 1.91:1)
          </FormDescription>
        </div>
      </div>
    </Card>
  );
};
