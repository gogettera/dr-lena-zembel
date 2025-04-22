
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

  // Load settings from meta when available
  useEffect(() => {
    if (meta) {
      form.reset({
        title: meta.title || '',
        description: meta.description || '',
        ogTitle: meta.og_title || '',
        ogDescription: meta.og_description || '',
        ogImage: null,
        ogImageUrl: meta.og_image_url || '',
        twitterTitle: meta.twitter_title || meta.og_title || '',
        twitterDescription: meta.twitter_description || meta.og_description || '',
        twitterCard: meta.twitter_card || 'summary_large_image'
      });
    }
  }, [meta, form]);

  return {
    form,
    metaLoading
  };
};
