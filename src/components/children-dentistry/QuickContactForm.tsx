
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { TranslatedText } from "@/components/ui/translated-text";

const QuickContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // We'll just log for now (no backend)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: t('childrenDentistry.contact.success.title'),
        description: t('childrenDentistry.contact.success.description'),
        variant: "default",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        const form = e.target as HTMLFormElement;
        form.reset();
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-14 md:py-20 px-4 bg-white scroll-mt-24">
      <div className="container mx-auto max-w-lg">

        <h2 className="text-2xl font-bold text-dental-navy mb-6 text-center opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
          <Mail className="inline-block ml-2 text-dental-orange" />
          <TranslatedText textKey="childrenDentistry.contact.title" />
        </h2>
        
        <form 
          onSubmit={handleSubmit} 
          className="bg-[#F1F0FB] rounded-2xl p-8 shadow-soft border border-dental-beige/30 flex flex-col gap-5 opacity-0 animate-[fade-in_0.5s_ease-out_0.2s_forwards]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-dental-navy font-medium mb-1">
                <TranslatedText textKey="childrenDentistry.contact.form.parentName" />
              </label>
              <Input 
                type="text" 
                required 
                disabled={loading || submitted} 
                className="bg-white/80 border-dental-beige/50 focus:border-dental-orange focus:ring-dental-orange/20"
              />
            </div>
            <div>
              <label className="block text-dental-navy font-medium mb-1">
                <TranslatedText textKey="childrenDentistry.contact.form.childName" />
              </label>
              <Input 
                type="text" 
                required 
                disabled={loading || submitted} 
                className="bg-white/80 border-dental-beige/50 focus:border-dental-orange focus:ring-dental-orange/20"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-dental-navy font-medium mb-1">
                <TranslatedText textKey="childrenDentistry.contact.form.age" />
              </label>
              <Input 
                type="number" 
                min={1} 
                max={18} 
                required 
                disabled={loading || submitted} 
                className="bg-white/80 border-dental-beige/50 focus:border-dental-orange focus:ring-dental-orange/20"
              />
            </div>
            <div>
              <label className="block text-dental-navy font-medium mb-1">
                <TranslatedText textKey="childrenDentistry.contact.form.phone" />
              </label>
              <Input 
                type="tel" 
                required 
                disabled={loading || submitted} 
                className="bg-white/80 border-dental-beige/50 focus:border-dental-orange focus:ring-dental-orange/20"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-dental-navy font-medium mb-1">
              <TranslatedText textKey="childrenDentistry.contact.form.message" />
            </label>
            <Textarea 
              className="resize-none bg-white/80 border-dental-beige/50 focus:border-dental-orange focus:ring-dental-orange/20" 
              rows={3} 
              disabled={loading || submitted} 
            />
          </div>
          
          <div className="text-sm text-dental-navy/70 italic">
            <TranslatedText textKey="childrenDentistry.contact.form.privacy" />
          </div>
          
          <Button
            type="submit"
            disabled={loading || submitted}
            variant="orange"
            className="rounded-full font-bold text-lg px-8 mt-3 min-h-12 relative overflow-hidden"
          >
            {loading ? (
              <span className="flex items-center">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" />
                <TranslatedText textKey="childrenDentistry.contact.form.sending" />
              </span>
            ) : submitted ? (
              <span className="flex items-center">
                <Check className="mr-2" size={18} />
                <TranslatedText textKey="childrenDentistry.contact.form.success" />
              </span>
            ) : (
              <span className="flex items-center">
                <Send className="mr-2" size={18} />
                <TranslatedText textKey="childrenDentistry.contact.form.submitButton" />
              </span>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default QuickContactForm;
