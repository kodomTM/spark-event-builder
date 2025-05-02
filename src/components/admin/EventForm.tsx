
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addEvent } from '@/lib/api';
import { Event } from '@/types/event';

interface EventFormProps {
  onEventAdded: (event: Event) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onEventAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState('');
  const [ticketUrl, setTicketUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !datetime.trim() || !ticketUrl.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      const newEvent = await addEvent({
        title,
        description,
        datetime,
        ticket_url: ticketUrl,
      });
      
      toast.success('Event added successfully');
      onEventAdded(newEvent);
      
      // Reset form
      setTitle('');
      setDescription('');
      setDatetime('');
      setTicketUrl('');
    } catch (error) {
      console.error('Add event error:', error);
      toast.error('Failed to add event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-event/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gradient-event">Add New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="datetime">Date and Time *</Label>
            <Input
              id="datetime"
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ticketUrl">Ticket URL *</Label>
            <Input
              id="ticketUrl"
              placeholder="Enter ticket URL"
              value={ticketUrl}
              onChange={(e) => setTicketUrl(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-event hover:opacity-90"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Event...
              </span>
            ) : (
              'Add Event'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
