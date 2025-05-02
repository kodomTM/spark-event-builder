
import React from 'react';
import Hero from '@/components/Hero';
import EventsSection from '@/components/EventsSection';
import SignupForm from '@/components/SignupForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <EventsSection />
      <SignupForm />
      <Footer />
    </div>
  );
};

export default Index;
