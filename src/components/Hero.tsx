
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-event/10 to-event-secondary/30 z-0"></div>
      <div className="absolute w-64 h-64 rounded-full bg-event-light/50 -top-20 -right-20 blur-3xl"></div>
      <div className="absolute w-64 h-64 rounded-full bg-event-light/50 -bottom-20 -left-20 blur-3xl"></div>
      
      <div className="container relative z-10 px-4 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-event animate-pulse-light">
          BanditBoyzWorld <span className="text-foreground">Events</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-8">
          Unforgettable experiences that ignite connections, inspire minds, and create lasting memories.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={scrollToEvents}
            className="bg-gradient-event hover:opacity-90 text-white font-semibold px-8 py-6 text-lg event-shadow"
          >
            Explore Events
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-event hover:bg-event-light px-8 py-6 text-lg"
            onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join Mailing List
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
