
import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Download, FileText, AlertCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { WebsitePDF } from './pdf/WebsitePDF';
import ExportPreview from './pdf/ExportPreview';
import { Language } from '@/types/language';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LanguageExport = () => {
  const { language } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [includeImages, setIncludeImages] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadTranslations = async (lang: Language) => {
    setIsLoading(true);
    setError(null);
    setProgress(10);
    try {
      const content = await import(`../../translations/${lang}.json`);
      
      // Process translations to ensure all values are strings
      const processedTranslations: Record<string, string> = {};
      Object.entries(content.default).forEach(([key, value]) => {
        processedTranslations[key] = typeof value === 'string' ? value : JSON.stringify(value);
      });
      
      setTranslations(processedTranslations);
      setProgress(100);
      toast({
        title: "Translations loaded",
        description: `Successfully loaded translations for ${lang}`,
      });
    } catch (error) {
      setError("Failed to load translations. Please try again.");
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

  const renderPDFDownloadLink = () => {
    if (Object.keys(translations).length === 0) {
      return (
        <Button disabled className="opacity-50">
          <Download className="mr-2 h-4 w-4" />
          Download Complete Website PDF
        </Button>
      );
    }

    return (
      <PDFDownloadLink
        document={<WebsitePDF translations={translations} language={selectedLanguage} includeImages={includeImages} />}
        fileName={`website-export-${selectedLanguage}.pdf`}
        className="inline-block"
      >
        {({ loading, error }) => {
          if (error) {
            console.error("PDF generation error:", error);
            return (
              <Button variant="destructive">
                <AlertCircle className="mr-2 h-4 w-4" />
                Error Generating PDF
              </Button>
            );
          }
          return (
            <Button disabled={loading || isLoading}>
              <Download className="mr-2 h-4 w-4" />
              {loading ? "Generating PDF..." : "Download Complete Website PDF"}
            </Button>
          );
        }}
      </PDFDownloadLink>
    );
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
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
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
              
              {renderPDFDownloadLink()}
              
              {Object.keys(translations).length === 0 && !isLoading && (
                <p className="text-sm text-red-500 mt-2">
                  No translations loaded. Please select a language.
                </p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <ExportPreview 
              translations={translations}
              selectedLanguage={selectedLanguage}
              includeImages={includeImages}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LanguageExport;
