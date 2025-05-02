
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="bg-gradient-event p-4">
        <h3 className="text-xl font-bold text-white">{event.title}</h3>
        <p className="text-white/80 text-sm">
          {formatDate(event.datetime)}
        </p>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-gray-600">
          {event.description || "Join us for this exciting event!"}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-gradient-event hover:opacity-90"
          asChild
        >
          <a href={event.ticket_url} target="_blank" rel="noopener noreferrer">
            Get Tickets
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
