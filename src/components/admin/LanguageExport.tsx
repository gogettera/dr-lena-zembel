
import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image, Link, Font } from '@react-pdf/renderer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Download, FileText, Eye } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

type Language = 'he' | 'en' | 'ru' | 'de' | 'ar';

// Register fonts for RTL languages
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v29/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVIUx6EQRjA.woff',
});

Font.register({
  family: 'Noto Sans Hebrew',
  src: 'https://fonts.gstatic.com/s/notosanshebrew/v40/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXd4uurP9kFcn7.woff',
});

// Define the PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Open Sans',
  },
  rtlPage: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Noto Sans Hebrew',
    direction: 'rtl',
    textAlign: 'right',
  },
  section: {
    marginBottom: 20,
    borderBottom: '1px solid #EEEEEE',
    paddingBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#1a365d', // dental-navy equivalent
  },
  subheading: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#2c5282', // lighter navy
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a365d', // dental-navy equivalent
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4a5568',
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  coverPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  coverTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 20,
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 18,
    color: '#4a5568',
    marginBottom: 40,
    textAlign: 'center',
  },
  image: {
    width: '80%',
    marginHorizontal: 'auto',
    marginBottom: 15,
    borderRadius: 5,
  },
  gallery: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  galleryImage: {
    width: '48%',
    marginBottom: 10,
    borderRadius: 5,
  },
  tableOfContents: {
    marginTop: 20,
    marginBottom: 30,
  },
  tocEntry: {
    fontSize: 12,
    marginBottom: 5,
    color: '#2d3748',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: 'center',
    color: '#718096',
    borderTop: '1px solid #E2E8F0',
    paddingTop: 5,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 10,
    color: '#718096',
  },
  rtlPageNumber: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    fontSize: 10,
    color: '#718096',
  },
  fullPageSection: {
    marginBottom: 30,
  },
  layoutPreview: {
    border: '1px solid #E2E8F0',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F7FAFC',
    borderRadius: 5,
  },
  sectionDivider: {
    borderBottom: '1px dashed #CBD5E0',
    marginVertical: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1a365d',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  navItem: {
    color: 'white',
    fontSize: 10,
    marginHorizontal: 5,
  },
  hero: {
    backgroundColor: '#E6F7FF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  heroDescription: {
    fontSize: 10,
    marginBottom: 10,
  },
  componentPreview: {
    backgroundColor: '#F9FAFB',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

// Enhanced website sections to include in the export
const websiteSections = [
  { id: 'navbar', title: 'Navigation Bar', description: 'Main navigation menu' },
  { id: 'hero', title: 'Hero Section', description: 'Main introductory section with clinic overview' },
  { id: 'about', title: 'About Section', description: 'Information about the doctor and clinic' },
  { id: 'treatments', title: 'Treatments', description: 'Available dental treatments with descriptions' },
  { id: 'testimonials', title: 'Testimonials', description: 'Patient reviews and experiences' },
  { id: 'video', title: 'Video Section', description: 'Clinic tour video section' },
  { id: 'social', title: 'Social Media', description: 'Social media updates and links' },
  { id: 'faq', title: 'FAQ', description: 'Frequently asked questions about treatments and services' },
  { id: 'contact', title: 'Contact Information', description: 'How to reach the clinic, address and hours' },
  { id: 'footer', title: 'Footer', description: 'Footer with additional links and information' },
];

// Expanded website images to include
const websiteImages = [
  { 
    src: '/lovable-uploads/64779606-c19d-42d7-b1a4-48f853db3d43.jpg', 
    description: 'Doctor profile image',
    section: 'about'
  },
  { 
    src: '/lovable-uploads/e1744c6a-ff5f-4782-9828-6ede63335c7e.jpg', 
    description: 'Clinic showcase image',
    section: 'hero'
  },
  { 
    src: '/lovable-uploads/11fa7c9b-39fc-4d60-b09b-13f0578ebffe.png', 
    description: 'Logo background pattern',
    section: 'branding'
  },
  { 
    src: '/lovable-uploads/c1007b41-5fb4-451a-a540-744c4643c25e.png', 
    description: 'Clinic logo',
    section: 'navbar'
  },
  { 
    src: '/lovable-uploads/c4b49e3b-cd26-4669-b6f6-6f3750db21fa.jpg', 
    description: 'Treatment image',
    section: 'treatments'
  }
];

// Helper function to determine if a language is RTL
const isRTL = (language: Language): boolean => {
  return language === 'he' || language === 'ar';
};

// Create the PDF Document component
const WebsitePDF = ({ 
  translations, 
  language, 
  includeImages = true 
}: { 
  translations: Record<string, string>; 
  language: Language;
  includeImages?: boolean;
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
  const pageStyle = isRTL(language) ? styles.rtlPage : styles.page;
  const pageNumberStyle = isRTL(language) ? styles.rtlPageNumber : styles.pageNumber;
  
  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={pageStyle}>
        <View style={styles.coverPage}>
          <Text style={styles.coverTitle}>
            {translations['dentistryWithLove'] || 'Website Content Export'}
          </Text>
          <Text style={styles.coverSubtitle}>
            {`Full Website Export - ${new Date().toLocaleDateString()}`}
          </Text>
          {includeImages && (
            <Image
              src={websiteImages[1].src}
              style={{ width: 300, marginBottom: 30 }}
            />
          )}
          <Text style={styles.content}>
            {`Language: ${language.toUpperCase()}`}
          </Text>
        </View>
      </Page>
      
      {/* Table of Contents */}
      <Page size="A4" style={pageStyle}>
        <Text style={styles.title}>Table of Contents</Text>
        <View style={styles.tableOfContents}>
          {websiteSections.map((section, index) => (
            <Text key={section.id} style={styles.tocEntry}>
              {`${index + 1}. ${section.title} - ${section.description}`}
            </Text>
          ))}
          <Text style={styles.tocEntry}>
            {`${websiteSections.length + 1}. Complete Website Layout Preview`}
          </Text>
          <Text style={styles.tocEntry}>
            {`${websiteSections.length + 2}. Image Gallery`}
          </Text>
          <Text style={styles.tocEntry}>
            {`${websiteSections.length + 3}. All Translations`}
          </Text>
        </View>
      </Page>
      
      {/* Full Website Layout Preview */}
      <Page size="A4" style={pageStyle}>
        <Text style={styles.title}>Complete Website Layout Preview</Text>
        <Text style={styles.subtitle}>Visual representation of the entire website</Text>
        
        {/* Navbar Preview */}
        <View style={styles.layoutPreview}>
          <Text style={styles.subheading}>Navigation Bar</Text>
          <View style={styles.navbar}>
            <Text style={styles.navItem}>{translations['home'] || 'Home'}</Text>
            <Text style={styles.navItem}>{translations['about'] || 'About'}</Text>
            <Text style={styles.navItem}>{translations['treatments'] || 'Treatments'}</Text>
            <Text style={styles.navItem}>{translations['contact'] || 'Contact'}</Text>
          </View>
        </View>
        
        {/* Hero Section Preview */}
        <View style={styles.layoutPreview}>
          <Text style={styles.subheading}>Hero Section</Text>
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>{translations['dentistryWithLove'] || 'Dentistry with Love'}</Text>
            <Text style={styles.heroDescription}>{translations['localDental'] || 'Local dental clinic description'}</Text>
            {includeImages && websiteImages[1] && (
              <Image src={websiteImages[1].src} style={{ width: '100%', height: 100, objectFit: 'cover' }} />
            )}
          </View>
        </View>
        
        {/* About Section Preview */}
        <View style={styles.layoutPreview}>
          <Text style={styles.subheading}>About Section</Text>
          <View style={styles.componentPreview}>
            {includeImages && websiteImages[0] && (
              <Image src={websiteImages[0].src} style={{ width: 80, height: 80 }} />
            )}
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{translations['doctorName'] || 'Dr. Name'}</Text>
            <Text style={{ fontSize: 10 }}>{translations['aboutMe'] || 'About the doctor'}</Text>
          </View>
        </View>
        
        {/* Treatments Preview */}
        <View style={styles.layoutPreview}>
          <Text style={styles.subheading}>Treatments Section</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <View style={{ width: '48%', padding: 5, backgroundColor: '#F0F9FF', borderRadius: 3 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{translations['childrenDentistry'] || 'Children Dentistry'}</Text>
            </View>
            <View style={{ width: '48%', padding: 5, backgroundColor: '#F0F9FF', borderRadius: 3 }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{translations['aestheticTreatments'] || 'Aesthetic Treatments'}</Text>
            </View>
          </View>
        </View>
        
        <Text style={pageNumberStyle} render={({ pageNumber }) => (
          `Page ${pageNumber}`
        )} fixed />
      </Page>
      
      {/* Content Pages - One page per major section */}
      {websiteSections.map((section) => (
        <Page key={section.id} size="A4" style={pageStyle}>
          <Text style={styles.title}>{section.title}</Text>
          <Text style={styles.subtitle}>{section.description}</Text>
          
          {/* Section images */}
          {includeImages && getSectionImages(section.id).map((img, i) => (
            <Image
              key={i}
              src={img.src}
              style={styles.image}
            />
          ))}
          
          {/* Section content */}
          {groupedTranslations[section.id] && Object.entries(groupedTranslations[section.id]).map(([key, value]) => (
            <View key={key} style={styles.section}>
              <Text style={styles.subheading}>{key}</Text>
              <Text style={styles.content}>{value}</Text>
            </View>
          ))}
          
          <Text style={pageNumberStyle} render={({ pageNumber }) => (
            `Page ${pageNumber}`
          )} fixed />
        </Page>
      ))}
      
      {/* Image Gallery Page */}
      {includeImages && (
        <Page size="A4" style={pageStyle}>
          <Text style={styles.title}>Image Gallery</Text>
          <View style={styles.gallery}>
            {websiteImages.map((img, i) => (
              <View key={i} style={{ width: '48%', marginBottom: 20 }}>
                <Image src={img.src} style={styles.galleryImage} />
                <Text style={{ fontSize: 10, textAlign: 'center' }}>{img.description}</Text>
              </View>
            ))}
          </View>
          
          <Text style={pageNumberStyle} render={({ pageNumber }) => (
            `Page ${pageNumber}`
          )} fixed />
        </Page>
      )}
      
      {/* All Translations Page */}
      <Page size="A4" style={pageStyle}>
        <Text style={styles.title}>Complete Translations Reference</Text>
        <Text style={styles.subtitle}>All website text content</Text>
        
        {Object.entries(translations).map(([key, value]) => (
          <View key={key} style={styles.section}>
            <Text style={styles.subheading}>{key}</Text>
            <Text style={styles.content}>{value}</Text>
          </View>
        ))}
        
        <Text style={pageNumberStyle} render={({ pageNumber }) => (
          `Page ${pageNumber}`
        )} fixed />
      </Page>
    </Document>
  );
};

const LanguageExport = () => {
  const { language } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [includeImages, setIncludeImages] = useState(true);
  const [progress, setProgress] = useState(0);

  const loadTranslations = async (lang: Language) => {
    setIsLoading(true);
    setProgress(10);
    try {
      const content = await import(`../../translations/${lang}.json`);
      setTranslations(content.default);
      setProgress(100);
      toast({
        title: "Translations loaded",
        description: `Successfully loaded translations for ${lang}`,
      });
    } catch (error) {
      toast({
        title: "Error loading translations",
        description: "Failed to load translations",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  useEffect(() => {
    loadTranslations(selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value as Language);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Select
          value={selectedLanguage}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="he">Hebrew</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
            <SelectItem value="ru">Russian</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {isLoading && (
        <div className="space-y-2">
          <div className="flex items-center">
            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Preparing export...</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      
      <div className="flex flex-col gap-5">
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="include-images" 
            checked={includeImages} 
            onChange={() => setIncludeImages(!includeImages)} 
            className="rounded border-gray-300 text-dental-navy focus:ring-dental-navy"
          />
          <label htmlFor="include-images" className="text-sm font-medium">
            Include images in export
          </label>
        </div>
      
        <Tabs defaultValue="download" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="download">Download PDF</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="download" className="space-y-4">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Export Complete Website Content</h3>
              <p className="text-sm text-gray-600 mb-4">
                Generate a comprehensive PDF with all website content, organized by sections.
                This includes all text content, images, and layout information.
              </p>
              
              <PDFDownloadLink
                document={<WebsitePDF translations={translations} language={selectedLanguage} includeImages={includeImages} />}
                fileName={`website-export-${selectedLanguage}.pdf`}
                className="inline-block"
              >
                {({ loading, error }) => (
                  <Button disabled={loading || isLoading || Object.keys(translations).length === 0}>
                    <Download className="mr-2 h-4 w-4" />
                    {loading ? "Generating PDF..." : "Download Complete Website PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
              
              {Object.keys(translations).length === 0 && !isLoading && (
                <p className="text-sm text-red-500 mt-2">
                  No translations loaded. Please select a language.
                </p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-medium mb-3">PDF Preview</h3>
              <p className="text-sm text-gray-600 mb-4">
                Preview what will be included in your PDF export.
              </p>
              
              <div className="space-y-4">
                <div className="border rounded p-4">
                  <h4 className="font-medium">Cover Page</h4>
                  <p className="text-sm text-gray-600">Title: {translations['dentistryWithLove'] || 'Website Content Export'}</p>
                  <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Language: {selectedLanguage.toUpperCase()}</p>
                  <p className="text-sm text-gray-600">RTL Support: {isRTL(selectedLanguage) ? 'Yes' : 'No'}</p>
                </div>
                
                <div className="border rounded p-4">
                  <h4 className="font-medium">Full Website Layout Preview:</h4>
                  <p className="text-sm text-gray-600">Visual representation of the full website structure</p>
                </div>
                
                <div className="border rounded p-4">
                  <h4 className="font-medium">Website Sections Included:</h4>
                  <ul className="text-sm text-gray-600 list-disc ml-5 mt-2">
                    {websiteSections.map(section => (
                      <li key={section.id}>{section.title} - {section.description}</li>
                    ))}
                    <li>Complete Translations Reference</li>
                    {includeImages && <li>Image Gallery</li>}
                  </ul>
                </div>
                
                {includeImages && (
                  <div className="border rounded p-4">
                    <h4 className="font-medium">Images Included:</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {websiteImages.map((img, i) => (
                        <div key={i} className="w-20 h-20 relative">
                          <img 
                            src={img.src} 
                            alt={img.description} 
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LanguageExport;
