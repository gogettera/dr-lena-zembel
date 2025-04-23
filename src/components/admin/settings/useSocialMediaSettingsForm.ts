

import { useForm } from "react-hook-form";
import React from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SocialMediaSettingsFormFields {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  showSocialIcons: boolean;
}

export function useSocialMediaSettingsForm() {
  const { toast } = useToast();

  const form = useForm<SocialMediaSettingsFormFields>({
    defaultValues: {
      facebook: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      twitter: '',
      showSocialIcons: true,
    },
  });

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      let { data, error } = await supabase
        .from('site_social')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      // Handle not found case: insert a blank row first
      if (!data && !error) {
        const { error: insertError } = await supabase.from('site_social').insert([{ id: 1 }]);
        if (insertError) {
          toast({
            title: "Couldn't initialize social settings",
            description: insertError.message,
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        const res = await supabase.from('site_social').select('*').eq('id', 1).maybeSingle();
        data = res.data;
      }

      if (data) {
        form.reset({
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          linkedin: data.linkedin || '',
          youtube: data.youtube || '',
          twitter: data.twitter || '',
          showSocialIcons: typeof data.show_social_icons === "boolean" ? data.show_social_icons : true
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

  const onSubmit = async (fields: SocialMediaSettingsFormFields) => {
    setLoading(true);
    try {
      const updateObj = {
        id: 1,
        facebook: fields.facebook || '',
        instagram: fields.instagram || '',
        linkedin: fields.linkedin || '',
        youtube: fields.youtube || '',
        twitter: fields.twitter || '',
        show_social_icons: typeof fields.showSocialIcons === 'boolean' ? fields.showSocialIcons : true,
        updated_at: new Date().toISOString()
      };
      const { error } = await supabase
        .from('site_social')
        .upsert(updateObj, { onConflict: 'id' });
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

  return { form, loading, onSubmit };
}
