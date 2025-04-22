
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const { t, language } = useLanguage();

  const testimonials =
    language === "he"
      ? [
          {
            name: t("testimonials.patientTestimonial1.name", "ענת מ."),
            text: t(
              "testimonials.patientTestimonial1.text",
              "הגעתי בחשש, אך הרופא הסביר כל שלב בסבלנות. עברתי טיפול שורש ללא כאב, ממליץ בחום."
            ),
          },
          {
            name: t("testimonials.patientTestimonial2.name", "רוני ש."),
            text: t(
              "testimonials.patientTestimonial2.text",
              "שירות מעולה, קיבלתי תמיכה מהצוות גם אחרי הטיפול. תודה רבה!"
            ),
          },
        ]
      : [
          {
            name: t("testimonials.patientTestimonial1.name", "Anat M."),
            text: t(
              "testimonials.patientTestimonial1.text",
              "I came in worried, but the doctor explained every step patiently. I underwent root canal with no pain – highly recommended."
            ),
          },
          {
            name: t("testimonials.patientTestimonial2.name", "Roni S."),
            text: t(
              "testimonials.patientTestimonial2.text",
              "Excellent service, received support from the team even after the treatment. Thank you so much!"
            ),
          },
        ];

  const sectionTitle = language === "he" ? t("testimonials", "המלצות מטופלים") : t("testimonials", "Patient Testimonials");

  return (
    <section className="py-14 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-[#6E59A5] mb-8 text-center">
          {sectionTitle}
        </h2>
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#F1F0FB] rounded-xl shadow p-6 flex flex-col items-end border border-dental-beige/30 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <div className="text-[#6E59A5]/80 text-lg mb-2 text-right">
                "{testimonial.text}"
              </div>
              <div className="text-[#6E59A5] font-bold">{testimonial.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
