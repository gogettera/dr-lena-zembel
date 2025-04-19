
import React from 'react';

const TestimonialSection = () => {
  return (
    <section id="team" className="bg-dental-beige py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-dental-navy mb-12">
          מטופלים מספרים עם חיוך
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/4 mb-8 md:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
              alt="מטופל מרוצה" 
              className="w-48 h-48 object-cover rounded-full mx-auto shadow-md"
            />
          </div>
          
          <div className="md:w-1/2 px-4 md:px-8 text-center md:text-right mb-8 md:mb-0">
            <div className="bg-white rounded-xl p-6 shadow-md relative">
              <svg className="w-10 h-10 text-dental-orange absolute top-4 right-4 opacity-30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <p className="text-dental-navy text-lg mb-6 relative z-10">
                אני בטיפולים שהוא חופשיים מעיניים. אבל מההתחלה זה הרגיש אחרת. הצוות סופר אכפתי, הסביר לי כל פרט ושלב בתהליך והרגשתי שבאמת מקשיבים לי. בזכות הטיפול לא כאב ממש בכלל, ואני שלוש שנים אחרי וממשיך להגיע לביקורות וכל ביקור מרגיש נעים.
              </p>
              
              <div className="text-dental-navy font-bold">
                איתי שלום
              </div>
              
              <div className="text-dental-navy text-sm">
                תל אביב, מהנדס תוכנה
              </div>
            </div>
          </div>
          
          <div className="md:w-1/4">
            <img 
              src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
              alt="מטופלת מרוצה" 
              className="w-48 h-48 object-cover rounded-full mx-auto shadow-md"
            />
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
            alt="מטופל נוסף" 
            className="w-48 h-48 object-cover rounded-full mx-auto shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
