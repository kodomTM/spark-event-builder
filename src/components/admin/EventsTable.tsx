
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { deleteEvent } from '@/lib/api';
import { Event } from '@/types/event';
import { formatDate } from '@/lib/utils';

interface EventsTableProps {
  events: Event[];
  onEventDeleted: (id: string) => void;
}

const EventsTable: React.FC<EventsTableProps> = ({ events, onEventDeleted }) => {
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        onEventDeleted(id);
        toast.success('Event deleted successfully');
      } catch (error) {
        console.error('Delete event error:', error);
        toast.error('Failed to delete event');
      }
    }
  };

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-center text-gray-500">No events found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gradient-event">
          Events ({events.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="py-2 px-3 text-left">Title</th>
                <th className="py-2 px-3 text-left">Date/Time</th>
                <th className="py-2 px-3 text-left hidden sm:table-cell">Tickets</th>
                <th className="py-2 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr 
                  key={event.id} 
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-3">{event.title}</td>
                  <td className="py-3 px-3">{formatDate(event.datetime)}</td>
                  <td className="py-3 px-3 hidden sm:table-cell">
                    <a 
                      href={event.ticket_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-event hover:underline"
                    >
                      Link
                    </a>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsTable;
