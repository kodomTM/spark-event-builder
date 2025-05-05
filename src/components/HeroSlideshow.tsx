
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

// Import images directly with correct path format
import eventImage1 from '/lovable-uploads/de6094d7-2c00-442c-b45c-fc4334c34f01.png';
import eventImage2 from '/lovable-uploads/e1316911-3364-418e-8f59-91fc69f410f1.png';
import eventImage3 from '/lovable-uploads/73922f66-9318-46e9-a572-00ddf70e2a1a.png';
import eventImage4 from '/lovable-uploads/7bb2be15-0aa7-450f-b9ab-b42d5367ab75.png';
import eventImage5 from '/lovable-uploads/3905ed35-d497-4a66-b0ee-5a8eb9414288.png';
import eventImage6 from '/lovable-uploads/f8cd5021-d1cf-48a7-8dd5-bc8a9674ddb8.png';
import eventImage7 from '/lovable-uploads/04405d29-d12b-4c65-a8a5-672edae063c2.png';
import eventImage8 from '/lovable-uploads/af233ef8-b42e-421f-af53-a123dc11418b.png';

// Array of event images
const EVENT_IMAGES = [
  eventImage1,
  eventImage2,
  eventImage3,
  eventImage4,
  eventImage5,
  eventImage6,
  eventImage7,
  eventImage8,
];

interface HeroSlideshowProps {
  scrollToEvents: () => void;
  scrollToSignup: () => void;
}

const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ scrollToEvents, scrollToSignup }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % EVENT_IMAGES.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Dark overlay for all slides */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      
      {/* Gold accent elements */}
      <div className="absolute w-64 h-64 rounded-full bg-event/40 -top-20 -right-20 blur-3xl z-0"></div>
      <div className="absolute w-64 h-64 rounded-full bg-event/40 -bottom-20 -left-20 blur-3xl z-0"></div>
      
      {/* Slideshow */}
      <div className="w-full h-full">
        {EVENT_IMAGES.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-5' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={image} 
              alt={`Event scene ${index + 1}`} 
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-event to-event-light animate-pulse-light">
            BanditBoyzWorld <span className="text-white">Events</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
            Unforgettable experiences that ignite connections, inspire minds, and create lasting memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToEvents}
              className="bg-event hover:bg-event-light text-black font-semibold px-8 py-6 text-lg"
            >
              Explore Events
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-event hover:bg-event/20 text-black px-8 py-6 text-lg"
              onClick={scrollToSignup}
            >
              Join Mailing List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideshow;
