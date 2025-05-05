
import React from 'react';
import HeroSlideshow from './HeroSlideshow';

const Hero = () => {
  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSignup = () => {
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  return <HeroSlideshow scrollToEvents={scrollToEvents} scrollToSignup={scrollToSignup} />;
};

export default Hero;
