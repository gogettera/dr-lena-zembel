
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Form schema
const socialMediaFormSchema = z.object({
  facebook: z.string().nullable(),
  facebook_page_id: z.string().nullable(),
  instagram: z.string().nullable(),
  twitter: z.string().nullable(),
  linkedin: z.string().nullable(),
  youtube: z.string().nullable(),
  show_social_icons: z.boolean().default(true),
});

type SocialMediaFormValues = z.infer<typeof socialMediaFormSchema>;

export function useSocialMediaSettingsForm() {
  const [loading, setLoading] = useState(false);

  // Initialize form
  const form = useForm<SocialMediaFormValues>({
    resolver: zodResolver(socialMediaFormSchema),
    defaultValues: {
      facebook: '',
      facebook_page_id: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      show_social_icons: true,
    },
  });

  // Fetch existing settings
  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('site_social')
          .select('*')
          .eq('id', 1)
          .single();

        if (error) {
          console.error('Error fetching social media settings', error);
          return;
        }

        // Map database fields to form fields
        form.reset({
          facebook: data.facebook || '',
          facebook_page_id: data.facebook_page_id || '',
          instagram: data.instagram || '',
          twitter: data.twitter || '',
          linkedin: data.linkedin || '',
          youtube: data.youtube || '',
          show_social_icons: typeof data.show_social_icons === 'boolean' ? data.show_social_icons : true,
        });
      } catch (err) {
        console.error('Error in fetching social media settings', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, [form]);

  // Form submission handler
  const onSubmit = async (values: SocialMediaFormValues) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('site_social')
        .upsert({
          id: 1,
          facebook: values.facebook,
          facebook_page_id: values.facebook_page_id,
          instagram: values.instagram,
          twitter: values.twitter,
          linkedin: values.linkedin,
          youtube: values.youtube,
          show_social_icons: values.show_social_icons,
          updated_at: new Date(),
        });

      if (error) throw error;

      toast.success({
        title: 'Settings saved',
        description: 'Social media settings have been updated',
      });
    } catch (error) {
      console.error('Error saving social media settings', error);
      toast.error({
        title: 'Error saving settings',
        description: error.message || 'Please try again',
      });
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, onSubmit };
}
