
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Facebook, Instagram, Linkedin, Share2, Twitter, Youtube } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

interface SocialMediaSettings {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  showSocialIcons: boolean;
}

export const SocialMediaSettings = () => {
  const { toast } = useToast();

  const form = useForm<SocialMediaSettings>({
    defaultValues: {
      facebook: 'https://www.facebook.com/drzembel',
      instagram: 'https://www.instagram.com/lena.zembel/',
      linkedin: 'https://il.linkedin.com/in/lena-zembel',
      youtube: 'https://www.youtube.com/channel/UCyixFMfs8VjuTXaWzjD-BnQ/featured',
      twitter: '',
      showSocialIcons: true
    }
  });

  const onSubmit = (data: SocialMediaSettings) => {
    console.log("Social Media Settings:", data);
    toast({
      title: "Social media settings updated",
      description: "Your social media links have been updated successfully.",
    });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Social Media Settings</h3>
      <p className="text-sm text-gray-600 mb-4">
        Manage your social media links and sharing options across the website.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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

          <Button type="submit">
            <Share2 className="w-4 h-4 mr-2" />
            Save Social Media Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};
