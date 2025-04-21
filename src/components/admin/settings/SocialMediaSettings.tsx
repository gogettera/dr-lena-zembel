
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Facebook, Instagram, Linkedin, Share2, Twitter, Youtube } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";

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
      facebook: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      twitter: '',
      showSocialIcons: true
    }
  });

  const [loading, setLoading] = React.useState(false);

  // Load settings from DB on mount
  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('site_social').select('*').maybeSingle();
      if (data) {
        form.reset({
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          linkedin: data.linkedin || '',
          youtube: data.youtube || '',
          twitter: data.twitter || '',
          showSocialIcons: data.show_social_icons ?? true
        });
      }
      if (error) {
        toast({
          title: "Error loading social settings",
          description: error.message,
          variant: "destructive"
        });
      }
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: SocialMediaSettings) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('site_social')
        .upsert({
          id: 1,
          facebook: data.facebook,
          instagram: data.instagram,
          linkedin: data.linkedin,
          youtube: data.youtube,
          twitter: data.twitter,
          show_social_icons: data.showSocialIcons,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      if (error) {
        toast({
          title: "Error saving social media settings",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Social media settings updated",
          description: "Your social media links have been updated successfully.",
        });
      }
    } finally {
      setLoading(false);
    }
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
                    <Input {...field} placeholder="https://facebook.com/yourpage" disabled={loading} />
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
                    <Input {...field} placeholder="https://instagram.com/yourprofile" disabled={loading} />
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
                    <Input {...field} placeholder="https://linkedin.com/in/yourprofile" disabled={loading} />
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
                    <Input {...field} placeholder="https://youtube.com/channel/yourchannelid" disabled={loading} />
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
                    <Input {...field} placeholder="https://twitter.com/yourhandle" disabled={loading} />
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
                    disabled={loading}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            <Share2 className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Social Media Settings"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
