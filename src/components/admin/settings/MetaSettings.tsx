
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MetaSettings {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: File | null;
  ogImageUrl?: string | null;
}

const DB_META_MAP = {
  title: "title",
  description: "description",
  ogTitle: "og_title",
  ogDescription: "og_description",
  ogImageUrl: "og_image_url",
};

export const MetaSettings = () => {
  const [ogImageFile, setOgImageFile] = React.useState<File | null>(null);
  const [ogImagePreview, setOgImagePreview] = React.useState<string>('');
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<MetaSettings>({
    defaultValues: {
      title: '',
      description: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: null,
      ogImageUrl: ''
    }
  });

  // Load settings from the database when mounted
  React.useEffect(() => {
    const loadMeta = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('site_meta').select('*').maybeSingle();
      if (data) {
        form.reset({
          title: data.title,
          description: data.description,
          ogTitle: data.og_title,
          ogDescription: data.og_description,
          ogImage: null,
          ogImageUrl: data.og_image_url || ''
        });
        if (data.og_image_url) setOgImagePreview(data.og_image_url);
      }
      if (error) {
        toast({
          title: "Error loading site meta",
          description: error.message,
          variant: "destructive"
        });
      }
      setLoading(false);
    };
    loadMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOgImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Open Graph image must be less than 2MB",
        variant: "destructive",
      });
      return;
    }

    setOgImageFile(file);
    const url = URL.createObjectURL(file);
    setOgImagePreview(url);
  };

  const onSubmit = async (data: MetaSettings) => {
    setLoading(true);
    try {
      // For now, just save URL string (no upload flow implemented)
      const og_image_url = ogImageFile ? ogImagePreview : data.ogImageUrl || '';
      // Try upsert (single row, id always 1)
      const { error } = await supabase
        .from('site_meta')
        .upsert({
          id: 1,
          title: data.title,
          description: data.description,
          og_title: data.ogTitle,
          og_description: data.ogDescription,
          og_image_url,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
      if (error) {
        toast({
          title: "Failed to save SEO settings",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "SEO settings updated",
          description: "Your site's meta information has been updated successfully.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">SEO & Meta Settings</h3>
        <p className="text-sm text-gray-600 mb-4">
          Configure how your site appears in search engines and when shared on social media.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} />
                  </FormControl>
                  <FormDescription>
                    The title that appears in browser tabs and search results.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={loading} />
                  </FormControl>
                  <FormDescription>
                    A brief description of your site for search engines (150-160 characters recommended).
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="border-t pt-4 mt-4">
              <h4 className="text-md font-medium mb-2">Open Graph Settings</h4>
              <p className="text-sm text-gray-600 mb-4">
                These settings control how your site appears when shared on social media.
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ogDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Share Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={loading} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Social Share Image (URL only for now)</FormLabel>
              <div className="mt-1 mb-3">
                {ogImagePreview && (
                  <div className="mb-3">
                    <img
                      src={ogImagePreview}
                      alt="Open Graph preview"
                      className="w-64 h-auto border rounded"
                    />
                  </div>
                )}
                <Input
                  type="text"
                  value={form.getValues().ogImageUrl}
                  onChange={e => form.setValue('ogImageUrl', e.target.value)}
                  placeholder="https://example.com/og-image.jpg"
                  disabled={loading}
                />
                {/*
                <Input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleOgImageChange}
                  className="cursor-pointer"
                  disabled={loading}
                />
                */}
                <FormDescription>
                  Enter an image URL for Open Graph (upload flow not implemented)<br />
                  Recommended size: 1200x630 pixels (aspect ratio 1.91:1)
                </FormDescription>
              </div>
            </div>

            <Button type="submit" disabled={loading}>
              <Globe className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save SEO Settings"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
