
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
  canonicalUrl: string;
  googleAnalyticsId: string;
  facebookPixelId: string;
}

export const useMetaForm = () => {
  const { meta, loading: metaLoading } = useSiteMeta();

  const form = useForm<MetaFormData>({
    defaultValues: {
      title: 'דר לנה - מרפאת שיניים - יפו - תל אביב',
      description: 'מרפאת שיניים מודרנית ביפו תל אביב בהובלת ד"ר לנה. טיפול שיניים ברמה גבוהה למשפחות ולקוחות פרטיים באווירה אישית ונעימה.',
      ogTitle: 'דר לנה - מרפאת שיניים - יפו - תל אביב',
      ogDescription: 'מרפאת שיניים מודרנית ביפו תל אביב בהובלת ד"ר לנה. טיפול שיניים ברמה גבוהה למשפחות ולקוחות פרטיים באווירה אישית ונעימה.',
      ogImage: null,
      ogImageUrl: '',
      twitterTitle: 'דר לנה - מרפאת שיניים - יפו - תל אביב',
      twitterDescription: 'מרפאת שיניים מודרנית ביפו תל אביב בהובלת ד"ר לנה. טיפול שיניים ברמה גבוהה למשפחות ולקוחות פרטיים באווירה אישית ונעימה.',
      twitterCard: 'summary_large_image',
      canonicalUrl: 'https://dr-zembel.com/',
      googleAnalyticsId: '',
      facebookPixelId: '',
    }
  });

  useEffect(() => {
    if (meta) {
      form.reset({
        title: meta.title,
        description: meta.description,
        ogTitle: meta.og_title,
        ogDescription: meta.og_description,
        ogImage: null,
        ogImageUrl: meta.og_image_url || '',
        twitterTitle: meta.twitter_title || meta.og_title,
        twitterDescription: meta.twitter_description || meta.og_description,
        twitterCard: meta.twitter_card,
        canonicalUrl: meta.canonical_url || 'https://dr-zembel.com/',
        googleAnalyticsId: meta.google_analytics_id || '',
        facebookPixelId: meta.facebook_pixel_id || '',
      });
    }
  }, [meta, form]);

  return {
    form,
    metaLoading
  };
};
