
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

// Define placeholder images until actual images are loaded
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80',
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
      setCurrentSlide((prev) => (prev + 1) % PLACEHOLDER_IMAGES.length);
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
        {PLACEHOLDER_IMAGES.map((image, index) => (
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
