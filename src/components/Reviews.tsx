
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

type Review = {
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string;
  relative_time_description: string;
};

const MOCK_REVIEWS: Review[] = [
  {
    author_name: "איתי שלום",
    rating: 5,
    text: "אני בטיפולים שהוא חופשיים מעיניים. אבל מההתחלה זה הרגיש אחרת. הצוות סופר אכפתי, הסביר לי כל פרט ושלב בתהליך והרגשתי שבאמת מקשיבים לי.",
    profile_photo_url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    relative_time_description: "תל אביב, מהנדס תוכנה"
  },
  {
    author_name: "שירה לוי",
    rating: 5,
    text: "טיפול מקצועי ואישי. ממליצה בחום!",
    profile_photo_url: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    relative_time_description: "לפני שבוע"
  },
  {
    author_name: "דניאל כהן",
    rating: 5,
    text: "המרפאה מדהימה והצוות מקצועי ואדיב. שמחה שמצאתי אותם!",
    profile_photo_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    relative_time_description: "לפני חודש"
  },
];

const Reviews = () => {
  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {MOCK_REVIEWS.map((review, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="bg-white rounded-xl shadow-md mx-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.profile_photo_url}
                    alt={`תמונת פרופיל של ${review.author_name}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-dental-navy">{review.author_name}</h4>
                    <div className="text-dental-orange">{renderStars(review.rating)}</div>
                  </div>
                </div>
                <p className="text-dental-navy mb-4">{review.text}</p>
                <div className="text-sm text-gray-500">{review.relative_time_description}</div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};

export default Reviews;
