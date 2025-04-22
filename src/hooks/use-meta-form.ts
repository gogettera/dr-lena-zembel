
import { useForm } from "react-hook-form";
import { useSiteMeta } from "@/hooks/use-site-meta";
import { useEffect } from "react";

export interface MetaFormData {
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

export const useMetaForm = () => {
  const { meta, loading: metaLoading } = useSiteMeta();
  
  const form = useForm<MetaFormData>({
    defaultValues: {
      title: 'My Dental Clinic',
      description: 'Professional dental care services in a modern and comfortable environment',
      ogTitle: 'My Dental Clinic',
      ogDescription: 'Professional dental care services in a modern and comfortable environment',
      ogImage: null,
      ogImageUrl: '',
      twitterTitle: 'My Dental Clinic',
      twitterDescription: 'Professional dental care services in a modern and comfortable environment',
      twitterCard: 'summary_large_image'
    }
  });

  // Load settings from meta when available
  useEffect(() => {
    if (meta) {
      form.reset({
        title: meta.title || 'My Dental Clinic',
        description: meta.description || 'Professional dental care services in a modern and comfortable environment',
        ogTitle: meta.og_title || 'My Dental Clinic',
        ogDescription: meta.og_description || 'Professional dental care services in a modern and comfortable environment',
        ogImage: null,
        ogImageUrl: meta.og_image_url || '',
        twitterTitle: meta.twitter_title || meta.og_title || 'My Dental Clinic',
        twitterDescription: meta.twitter_description || meta.og_description || 'Professional dental care services in a modern and comfortable environment',
        twitterCard: meta.twitter_card || 'summary_large_image'
      });
    }
  }, [meta, form]);

  return {
    form,
    metaLoading
  };
};
