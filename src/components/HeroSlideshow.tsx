
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

// Array of event images
const EVENT_IMAGES = [
  '/lovable-uploads/1e7a480b-248c-4115-a2b1-10d2154a9575.png',
  '/lovable-uploads/f0ae96d6-e490-4287-9e56-24bd3a810cd1.png',
  '/lovable-uploads/3d8c70a8-17d1-4779-913d-0750d08069e3.png',
  '/lovable-uploads/1fa788d8-efc0-4dcf-abc5-25bd73ad3972.png',
  '/lovable-uploads/f9f19459-0b54-435b-8d52-a71a474ab68e.png',
  '/lovable-uploads/768a60d0-4ffb-4351-85a4-cf09f753ddb5.png',
  '/lovable-uploads/ded49108-a3af-42c4-bb33-4e664277e198.png',
  '/lovable-uploads/4c874de5-ba41-4026-a78f-0fc5ef988710.png',
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
      
      {/* Carousel */}
      <Carousel className="w-full h-full">
        <CarouselContent className="h-[90vh]">
          {EVENT_IMAGES.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full">
                <img 
                  src={image} 
                  alt={`Event scene ${index + 1}`} 
                  className="object-cover w-full h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom navigation arrows */}
        <CarouselPrevious className="absolute left-4 bg-black/30 border-event hover:bg-black/70 text-event z-20" />
        <CarouselNext className="absolute right-4 bg-black/30 border-event hover:bg-black/70 text-event z-20" />
      </Carousel>
      
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
              className="border-2 border-event hover:bg-event/20 text-white px-8 py-6 text-lg"
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
