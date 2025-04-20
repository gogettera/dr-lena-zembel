import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { pdfStyles } from './pdfStyles';
import { websiteSections, websiteImages } from './pdfData';
import { Language } from '@/types/language';

// Register fonts for RTL languages
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v29/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVIUx6EQRjA.woff',
});

Font.register({
  family: 'Noto Sans Hebrew',
  src: 'https://fonts.gstatic.com/s/notosanshebrew/v40/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXd4uurP9kFcn7.woff',
});

interface WebsitePDFProps {
  translations: Record<string, string>;
  language: Language;
  includeImages?: boolean;
}

// Helper function to determine if a language is RTL
const isRTL = (language: Language): boolean => {
  return language === 'he' || language === 'ar';
};

export const WebsitePDF: React.FC<WebsitePDFProps> = ({ 
  translations, 
  language, 
  includeImages = true 
}) => {
  // Group translations by section based on keys
  const groupedTranslations: Record<string, Record<string, string>> = {};
  
  // Helper to determine which section a translation key belongs to
  const getSectionForKey = (key: string) => {
    if (key.includes('faq')) return 'faq';
    if (key.includes('doctor') || key.includes('about')) return 'about';
    if (key.includes('treatment')) return 'treatments';
    if (key.includes('testimonial') || key.includes('patient')) return 'testimonials';
    if (key.includes('contact') || key.includes('address') || key.includes('phone')) return 'contact';
    if (key.includes('home') || key.includes('practice') || key.includes('team')) return 'navbar';
    if (key.includes('follow') || key.includes('social') || key.includes('Facebook')) return 'social';
    if (key.includes('copyright') || key.includes('rights')) return 'footer';
    if (key.includes('video') || key.includes('clinic') || key.includes('tour')) return 'video';
    return 'general';
  };
  
  // Group translations by section
  Object.entries(translations).forEach(([key, value]) => {
    const section = getSectionForKey(key);
    if (!groupedTranslations[section]) {
      groupedTranslations[section] = {};
    }
    groupedTranslations[section][key] = value;
  });

  // Get relevant images for a section
  const getSectionImages = (sectionId: string) => {
    return websiteImages.filter(img => img.section === sectionId);
  };

  // Select the appropriate page style based on language
  const pageStyle = isRTL(language) ? pdfStyles.rtlPage : pdfStyles.page;
  const pageNumberStyle = isRTL(language) ? pdfStyles.rtlPageNumber : pdfStyles.pageNumber;
  
  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={pageStyle}>
        <View style={pdfStyles.coverPage}>
          <Text style={pdfStyles.coverTitle}>
            {translations['dentistryWithLove'] || 'Website Content Export'}
          </Text>
          <Text style={pdfStyles.coverSubtitle}>
            {`Full Website Export - ${new Date().toLocaleDateString()}`}
          </Text>
          {includeImages && (
            <Image
              src={websiteImages[1].src}
              style={{ width: 300, marginBottom: 30 }}
            />
          )}
          <Text style={pdfStyles.content}>
            {`Language: ${language.toUpperCase()}`}
          </Text>
        </View>
      </Page>
      
      {/* Table of Contents */}
      <Page size="A4" style={pageStyle}>
        <Text style={pdfStyles.title}>Table of Contents</Text>
        <View style={pdfStyles.tableOfContents}>
          {websiteSections.map((section, index) => (
            <Text key={section.id} style={pdfStyles.tocEntry}>
              {`${index + 1}. ${section.title} - ${section.description}`}
            </Text>
          ))}
        </View>
      </Page>
      
      {/* Content Pages - One page per major section */}
      {websiteSections.map((section) => (
        <Page key={section.id} size="A4" style={pageStyle}>
          <Text style={pdfStyles.title}>{section.title}</Text>
          <Text style={pdfStyles.subtitle}>{section.description}</Text>
          
          {/* Section images */}
          {includeImages && getSectionImages(section.id).map((img, i) => (
            <Image
              key={i}
              src={img.src}
              style={pdfStyles.image}
            />
          ))}
          
          {/* Section content */}
          {groupedTranslations[section.id] && Object.entries(groupedTranslations[section.id]).map(([key, value]) => (
            <View key={key} style={pdfStyles.section}>
              <Text style={pdfStyles.subheading}>{key}</Text>
              <Text style={pdfStyles.content}>{value}</Text>
            </View>
          ))}
          
          <Text style={pageNumberStyle} render={({ pageNumber }) => (
            `Page ${pageNumber}`
          )} fixed />
        </Page>
      ))}
    </Document>
  );
};
