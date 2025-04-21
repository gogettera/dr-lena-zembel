
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const QuickContactForm = () => {
  const [loading, setLoading] = useState(false);
  // We'll just log for now (no backend)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("הטופס נשלח!");
      setLoading(false);
    }, 500);
  };
  return (
    <section className="py-14 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-2xl font-bold text-dental-navy mb-6 text-center">טופס יצירת קשר מהיר</h2>
        <form onSubmit={handleSubmit} className="bg-[#F1F0FB] rounded-2xl p-8 shadow-soft border border-dental-beige/30 flex flex-col gap-5">
          <div>
            <label className="block text-dental-navy font-medium mb-1">שם ההורה</label>
            <Input type="text" required disabled={loading} />
          </div>
          <div>
            <label className="block text-dental-navy font-medium mb-1">שם הילד</label>
            <Input type="text" required disabled={loading} />
          </div>
          <div>
            <label className="block text-dental-navy font-medium mb-1">גיל</label>
            <Input type="number" min={1} max={18} required disabled={loading} />
          </div>
          <div>
            <label className="block text-dental-navy font-medium mb-1">טלפון</label>
            <Input type="tel" required disabled={loading} />
          </div>
          <div>
            <label className="block text-dental-navy font-medium mb-1">מה חשוב שנדע לקראת הביקור?</label>
            <Textarea className="resize-none" rows={3} disabled={loading} />
          </div>
          <Button
            type="submit"
            disabled={loading}
            variant="orange"
            className="rounded-full font-bold text-lg px-8 mt-3"
          >
            שולחים חיוך
          </Button>
        </form>
      </div>
    </section>
  );
};

export default QuickContactForm;
