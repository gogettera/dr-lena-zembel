
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Section } from '@/components/ui/section';

interface LegalPageProps {
  translationKey: 'privacyPolicy' | 'termsOfService';
}

// Define the expected structure of our legal content
interface LegalContent {
  title: string;
  lastUpdated: string;
  sections: {
    intro: string;
    [key: string]: string | {
      title: string;
      content: string;
      items?: string[];
    };
  };
}

const LegalPage: React.FC<LegalPageProps> = ({ translationKey }) => {
  const { t } = useLanguage();
  // Cast the translation result to the expected type
  const content = t(`legal.${translationKey}`) as unknown as LegalContent;

  return (
    <Section background="white" className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-dental-navy mb-6">{content.title}</h1>
        <p className="text-sm text-gray-500 mb-8">{content.lastUpdated}</p>
        
        <div className="prose prose-blue max-w-none">
          <p className="mb-8">{content.sections.intro}</p>
          
          {Object.entries(content.sections).map(([key, section]) => {
            if (key === 'intro') return null;
            
            const sectionContent = section as {
              title: string;
              content: string;
              items?: string[];
            };

            return (
              <div key={key} className="mb-8">
                <h2 className="text-xl font-semibold text-dental-navy mb-4">
                  {sectionContent.title}
                </h2>
                <p className="mb-4">{sectionContent.content}</p>
                {sectionContent.items && (
                  <ul className="list-disc list-inside space-y-2">
                    {sectionContent.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default LegalPage;
