
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Accessibility, 
  Eye
} from 'lucide-react';

// Add: Control popover open state to custom-style overlay
const AccessibilityWidget: React.FC = () => {
  const { t } = useLanguage();
  const [fontSize, setFontSize] = useState<number>(100);
  const [contrast, setContrast] = useState<boolean>(false);
  const [open, setOpen] = useState(false); // track open state

  // Apply font size to html element
  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  // Apply high contrast mode
  const toggleHighContrast = () => {
    const newContrastValue = !contrast;
    setContrast(newContrastValue);

    if (newContrastValue) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  // Reset all accessibility settings
  const resetSettings = () => {
    setFontSize(100);
    setContrast(false);
    document.documentElement.style.fontSize = '100%';
    document.body.classList.remove('high-contrast');
  };

  // --- Custom: render white bg overlay when popover open ---
  // Place overlay only on popover open
  const Overlay = () => (
    <div
      className="fixed inset-0 z-40 bg-white transition-opacity duration-200"
      style={{ pointerEvents: 'none' }} // overlay does not block popover or other UI
      aria-hidden="true"
    />
  );

  return (
    <>
      {open && <Overlay />}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 border-dental-navy/30 hover:border-dental-navy/60 fixed bottom-24 right-6 z-50 bg-white shadow-md"
            aria-label={t('accessibility.toggle', 'אפשרויות נגישות')}
          >
            <Accessibility className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 border-dental-navy/20" align="start">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dental-navy">
              {t('accessibility.title', 'אפשרויות נגישות')}
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="font-size" className="text-sm">
                  {t('accessibility.fontSize', 'גודל טקסט')}
                </label>
                <span className="text-sm">
                  {fontSize}%
                </span>
              </div>
              <Slider
                id="font-size"
                value={[fontSize]}
                min={100}
                max={200}
                step={10}
                onValueChange={handleFontSizeChange}
                aria-label={t('accessibility.fontSize', 'גודל טקסט')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {t('accessibility.highContrast', 'ניגודיות גבוהה')}
              </span>
              <Button
                variant={contrast ? "default" : "outline"}
                size="sm"
                onClick={toggleHighContrast}
                aria-pressed={contrast}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                {contrast ? t('accessibility.on', 'מופעל') : t('accessibility.off', 'כבוי')}
              </Button>
            </div>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={resetSettings}
              size="sm"
            >
              {t('accessibility.reset', 'איפוס הגדרות')}
            </Button>
            
            <hr className="border-dental-beige" />
            
            <div className="text-xs text-dental-navy/70">
              <a 
                href="/accessibility-statement" 
                className="underline text-dental-orange hover:text-dental-navy"
              >
                {t('accessibility.statement', 'הצהרת נגישות')}
              </a>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AccessibilityWidget;
