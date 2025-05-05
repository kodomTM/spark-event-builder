
import React from 'react';
import Hero from '@/components/Hero';
import EventsSection from '@/components/EventsSection';
import SignupForm from '@/components/SignupForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <div id="events">
        <EventsSection />
      </div>
      <div id="signup">
        <SignupForm />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
