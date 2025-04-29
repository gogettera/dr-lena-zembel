
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  canonicalUrl?: string;
  jsonLd?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  image,
  url,
  canonicalUrl,
  jsonLd
}) => {
  // Default title
  const pageTitle = title || 'Dr. Lena Zembel Dental Clinic';
  
  // Default description
  const pageDescription = description || 'Professional dental care services in Tel Aviv';
  
  // Default image
  const pageImage = image || 'https://dr-zembel.com/lovable-uploads/f0d36601-8f51-4bd6-9ce4-071cd62aa140.png';
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      {image && <meta property="og:image" content={pageImage} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {image && <meta name="twitter:image" content={pageImage} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">
          {jsonLd}
        </script>
      )}
    </Helmet>
  );
};

export default MetaTags;
