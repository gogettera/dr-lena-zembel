import React from 'react';
import { websiteSections, websiteImages } from './pdfData';
import { Language } from '@/types/language';

interface ExportPreviewProps {
  translations: Record<string, string>;
  selectedLanguage: Language;
  includeImages: boolean;
}

const ExportPreview: React.FC<ExportPreviewProps> = ({
  translations,
  selectedLanguage,
  includeImages,
}) => {
  return (
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
          <p className="text-sm text-gray-600">RTL Support: {selectedLanguage === 'he' || selectedLanguage === 'ar' ? 'Yes' : 'No'}</p>
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
  );
};

export default ExportPreview;
