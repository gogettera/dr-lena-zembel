
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Globe, Share2, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface SocialMediaSettings {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  showSocialIcons: boolean;
}

interface MetaSettings {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: File | null;
}

const SiteSettings = () => {
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [ogImageFile, setOgImageFile] = useState<File | null>(null);
  const [ogImagePreview, setOgImagePreview] = useState<string>('');
  const { toast } = useToast();

  const socialForm = useForm<SocialMediaSettings>({
    defaultValues: {
      facebook: 'https://www.facebook.com/drzembel',
      instagram: 'https://www.instagram.com/lena.zembel/',
      linkedin: 'https://il.linkedin.com/in/lena-zembel',
      youtube: 'https://www.youtube.com/channel/UCyixFMfs8VjuTXaWzjD-BnQ/featured',
      twitter: '',
      showSocialIcons: true
    }
  });

  const metaForm = useForm<MetaSettings>({
    defaultValues: {
      title: 'דנטל לאב - מרפאת שיניים',
      description: 'מרפאה דנטלית מקומית עם טיפול אישי ומקצועי',
      ogTitle: 'דנטל לאב - מרפאת שיניים',
      ogDescription: 'הכירו את מרפאת השיניים דנטל לאב - טיפול אישי ומקצועי',
      ogImage: null
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG or JPG)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 1MB)
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

  const handleOgImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG or JPG)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
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

  const handleSubmitFavicon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faviconFile) return;

    try {
      const formData = new FormData();
      formData.append('file', faviconFile);
      
      // TODO: Implement file upload endpoint
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

  const onSocialSubmit = (data: SocialMediaSettings) => {
    console.log("Social Media Settings:", data);
    toast({
      title: "Social media settings updated",
      description: "Your social media links have been updated successfully.",
    });
  };

  const onMetaSubmit = (data: MetaSettings) => {
    console.log("Meta Settings:", data);
    
    // Handle OG image upload if present
    if (ogImageFile) {
      const formData = new FormData();
      formData.append('file', ogImageFile);
      // TODO: Implement file upload logic
    }
    
    toast({
      title: "SEO settings updated",
      description: "Your site's meta information has been updated successfully.",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
      
      <Tabs defaultValue="meta" className="space-y-4">
        <TabsList className="mb-4">
          <TabsTrigger value="meta">SEO & Meta</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="favicon">Favicon</TabsTrigger>
        </TabsList>

        <TabsContent value="meta" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">SEO & Meta Settings</h3>
            <p className="text-sm text-gray-600 mb-4">
              Configure how your site appears in search engines and when shared on social media.
            </p>

            <Form {...metaForm}>
              <form onSubmit={metaForm.handleSubmit(onMetaSubmit)} className="space-y-4">
                <FormField
                  control={metaForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        The title that appears in browser tabs and search results.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={metaForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
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
                  control={metaForm.control}
                  name="ogTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social Share Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={metaForm.control}
                  name="ogDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social Share Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Social Share Image</FormLabel>
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
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={handleOgImageChange}
                      className="cursor-pointer"
                    />
                    <FormDescription>
                      Recommended size: 1200x630 pixels (aspect ratio 1.91:1)
                    </FormDescription>
                  </div>
                </div>

                <Button type="submit" className="mt-4">
                  <Globe className="w-4 h-4 mr-2" />
                  Save SEO Settings
                </Button>
              </form>
            </Form>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Social Media Settings</h3>
            <p className="text-sm text-gray-600 mb-4">
              Manage your social media links and sharing options across the website.
            </p>

            <Form {...socialForm}>
              <form onSubmit={socialForm.handleSubmit(onSocialSubmit)} className="space-y-4">
                <FormField
                  control={socialForm.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook Page URL</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Facebook className="w-5 h-5 text-[#1877F2] mr-2" />
                          <Input {...field} placeholder="https://facebook.com/yourpage" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialForm.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram Profile URL</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Instagram className="w-5 h-5 text-[#E1306C] mr-2" />
                          <Input {...field} placeholder="https://instagram.com/yourprofile" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialForm.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile URL</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Linkedin className="w-5 h-5 text-[#0077B5] mr-2" />
                          <Input {...field} placeholder="https://linkedin.com/in/yourprofile" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialForm.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube Channel URL</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Youtube className="w-5 h-5 text-[#FF0000] mr-2" />
                          <Input {...field} placeholder="https://youtube.com/channel/yourchannelid" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialForm.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter Profile URL</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Twitter className="w-5 h-5 text-[#1DA1F2] mr-2" />
                          <Input {...field} placeholder="https://twitter.com/yourhandle" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialForm.control}
                  name="showSocialIcons"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-6">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Show Social Media Icons</FormLabel>
                        <FormDescription>
                          Toggle to show or hide social media icons in the website footer
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-4">
                  <Share2 className="w-4 h-4 mr-2" />
                  Save Social Media Settings
                </Button>
              </form>
            </Form>
          </div>
        </TabsContent>

        <TabsContent value="favicon" className="space-y-6">
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
                  onClick={handleSubmitFavicon}
                  disabled={!faviconFile}
                  className="w-full sm:w-auto"
                >
                  <Image className="w-4 h-4 mr-2" />
                  Update Favicon
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettings;
