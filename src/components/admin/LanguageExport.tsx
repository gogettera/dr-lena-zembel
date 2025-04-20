
import React, { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

type Language = 'he' | 'en' | 'ru' | 'de' | 'ar';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
  }
});

const TranslationPDF = ({ translations }: { translations: Record<string, string> }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Website Content Export</Text>
      {Object.entries(translations).map(([key, value]) => (
        <View key={key} style={styles.section}>
          <Text style={styles.heading}>{key}</Text>
          <Text style={styles.content}>{value}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const LanguageExport = () => {
  const { language } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  const loadTranslations = async (lang: Language) => {
    try {
      const content = await import(`../../translations/${lang}.json`);
      setTranslations(content.default);
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
    }
  };

  React.useEffect(() => {
    loadTranslations(selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value as Language);
  };

  return (
    <div className="space-y-4">
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
        
        <PDFDownloadLink
          document={<TranslationPDF translations={translations} />}
          fileName={`translations-${selectedLanguage}.pdf`}
        >
          {({ loading }) => (
            <Button disabled={loading}>
              <Download className="mr-2 h-4 w-4" />
              {loading ? "Generating PDF..." : "Download PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default LanguageExport;
