
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Globe, Loader2, Image, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validateImageFile, createFilePreview } from "@/utils/fileUtils";
import { useLanguage } from '@/contexts/LanguageContext';

interface MetaSettings {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: File | null;
  ogImageUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterCard: string;
}

export const MetaSettings = () => {
  const [ogImageFile, setOgImageFile] = useState<File | null>(null);
  const [ogImagePreview, setOgImagePreview] = useState<string>('');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();

  const form = useForm<MetaSettings>({
    defaultValues: {
      title: '',
      description: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: null,
      ogImageUrl: '',
      twitterTitle: '',
      twitterDescription: '',
      twitterCard: 'summary_large_image'
    }
  });

  // Load settings from the database when mounted
  useEffect(() => {
    const loadMeta = async () => {
      setLoading(true);
      try {
        let { data, error } = await supabase.from('site_meta').select('*').eq('id', 1).maybeSingle();
        
        if (!data && !error) {
          // Row doesn't exist: insert default with id=1
          const { error: insertError } = await supabase.from('site_meta').insert([{ 
            id: 1, 
            title: '', 
            description: '', 
            og_title: '', 
            og_description: '', 
            og_image_url: null,
            twitter_title: '',
            twitter_description: '',
            twitter_card: 'summary_large_image'
          }]);
          
          if (insertError) {
            toast({
              title: "Couldn't initialize SEO settings",
              description: insertError.message,
              variant: "destructive"
            });
            setLoading(false);
            return;
          }
          
          const res = await supabase.from('site_meta').select('*').eq('id', 1).maybeSingle();
          data = res.data;
        }
        
        if (data) {
          form.reset({
            title: data.title || '',
            description: data.description || '',
            ogTitle: data.og_title || '',
            ogDescription: data.og_description || '',
            ogImage: null,
            ogImageUrl: data.og_image_url || '',
            twitterTitle: data.twitter_title || data.og_title || '',
            twitterDescription: data.twitter_description || data.og_description || '',
            twitterCard: data.twitter_card || 'summary_large_image'
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
      } catch (err) {
        console.error('Error loading meta settings:', err);
        toast({
          title: "Error loading settings",
          description: "Failed to retrieve meta settings",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadMeta();
  }, [toast, form]);

  const handleOgImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file, 2); // 2MB limit
    if (!validation.valid) {
      toast({
        title: "Invalid file",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    setOgImageFile(file);
    const preview = await createFilePreview(file);
    setOgImagePreview(preview);
  };

  const onSubmit = async (data: MetaSettings) => {
    setLoading(true);
    try {
      // For now, using object URL for demo purposes
      // In production, you'd upload to a storage bucket
      const og_image_url = ogImageFile 
        ? URL.createObjectURL(ogImageFile) 
        : data.ogImageUrl || '';
      
      // Clean values for upsert
      const cleanValues = {
        id: 1,
        title: data.title || '',
        description: data.description || '',
        og_title: data.ogTitle || '',
        og_description: data.ogDescription || '',
        og_image_url: og_image_url || null,
        twitter_title: data.twitterTitle || data.ogTitle || '',
        twitter_description: data.twitterDescription || data.ogDescription || '',
        twitter_card: data.twitterCard || 'summary_large_image',
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('site_meta')
        .upsert(cleanValues, { onConflict: 'id' });
        
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
        
        // Update HTML meta tags in real time
        updateMetaTags(cleanValues);
      }
    } catch (err) {
      console.error('Error saving meta settings:', err);
      toast({
        title: "Error saving settings",
        description: "Failed to save meta settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to update meta tags in real time
  const updateMetaTags = (data: any) => {
    // Update basic meta tags
    updateMetaTag('title', data.title);
    updateMetaTag('description', data.description);
    
    // Update Open Graph meta tags
    updateMetaTag('og:title', data.og_title);
    updateMetaTag('og:description', data.og_description);
    updateMetaTag('og:image', data.og_image_url);
    
    // Update Twitter meta tags
    updateMetaTag('twitter:title', data.twitter_title);
    updateMetaTag('twitter:description', data.twitter_description);
    updateMetaTag('twitter:card', data.twitter_card);
    updateMetaTag('twitter:image', data.og_image_url);
  };
  
  // Helper to update a specific meta tag
  const updateMetaTag = (name: string, content: string) => {
    if (!content) return;
    
    // Handle title tag specially
    if (name === 'title') {
      document.title = content;
      return;
    }
    
    // For all other meta tags
    const attr = name.startsWith('og:') ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attr}="${name}"]`);
    
    if (meta) {
      meta.setAttribute('content', content);
    } else {
      meta = document.createElement('meta');
      meta.setAttribute(attr, name);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">SEO & Meta Settings</h3>
        <p className="text-sm text-gray-600 mb-4">
          Configure how your site appears in search engines and when shared on social media.
        </p>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic SEO</TabsTrigger>
            <TabsTrigger value="opengraph">Open Graph</TabsTrigger>
            <TabsTrigger value="twitter">Twitter Cards</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <TabsContent value="basic">
                <Card className="p-4">
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
                      <FormItem className="mt-4">
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
                </Card>
              </TabsContent>
              
              <TabsContent value="opengraph">
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
              </TabsContent>
              
              <TabsContent value="twitter">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="h-4 w-4 text-dental-navy" />
                    <p className="text-sm text-gray-600">
                      Twitter Card settings control how your site appears when shared on Twitter.
                    </p>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="twitterCard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter Card Type</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full p-2 border border-gray-300 rounded"
                            value={field.value}
                            onChange={field.onChange}
                            disabled={loading}
                          >
                            <option value="summary">Summary (Small Image)</option>
                            <option value="summary_large_image">Summary with Large Image</option>
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="twitterTitle"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Twitter Title</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={loading} />
                        </FormControl>
                        <FormDescription>
                          Leave blank to use Open Graph title
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitterDescription"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Twitter Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} disabled={loading} />
                        </FormControl>
                        <FormDescription>
                          Leave blank to use Open Graph description
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <div className="mt-4">
                    <FormLabel>Twitter Image</FormLabel>
                    <p className="text-sm text-gray-500 mt-1">
                      Twitter will use the Open Graph image you've set in the previous tab.
                    </p>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="preview">
                <Card className="p-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-medium mb-2">Search Engine Preview</h4>
                      <div className="border rounded p-4 bg-white">
                        <div className="text-blue-800 text-lg font-medium overflow-hidden text-ellipsis">
                          {form.watch('title') || 'Your Website Title'}
                        </div>
                        <div className="text-green-700 text-sm overflow-hidden text-ellipsis">
                          example.com
                        </div>
                        <div className="text-gray-600 text-sm mt-1 overflow-hidden text-ellipsis">
                          {form.watch('description') || 'Your website description will appear here in search results. Make it compelling to improve click-through rates.'}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium mb-2">Social Media Preview</h4>
                      <div className="border rounded p-4 bg-white">
                        <div className="border-b pb-2 text-gray-500 text-xs">example.com</div>
                        {ogImagePreview && (
                          <div className="my-2">
                            <img 
                              src={ogImagePreview} 
                              alt="Social media preview" 
                              className="w-full h-auto rounded max-h-60 object-cover" 
                            />
                          </div>
                        )}
                        <div className="font-bold mt-2">
                          {form.watch('ogTitle') || form.watch('title') || 'Your Open Graph Title'}
                        </div>
                        <div className="text-gray-600 text-sm mt-1">
                          {form.watch('ogDescription') || form.watch('description') || 'Your social media description will appear here when your site is shared on platforms like Facebook and LinkedIn.'}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <div className="pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Globe className="w-4 h-4 mr-2" />
                      Save SEO Settings
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </div>
    </div>
  );
};
