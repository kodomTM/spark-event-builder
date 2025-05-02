
import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { getEvents } from '@/lib/api';
import { Event } from '@/types/event';

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-16 bg-gray-50">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          <span className="text-gradient-event">Upcoming</span> Events
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover our lineup of exciting events and secure your tickets today!
        </p>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-event border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center p-8 bg-gray-100 rounded-lg">
            <p className="text-gray-600">No upcoming events at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
