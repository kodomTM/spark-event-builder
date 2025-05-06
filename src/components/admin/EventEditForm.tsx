
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getEventById, updateEvent } from '@/lib/api';
import { Event, UpdateEventInput } from '@/types/event';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface EventEditFormProps {
  eventId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onEventUpdated: (event: Event) => void;
}

const EventEditForm: React.FC<EventEditFormProps> = ({ 
  eventId, 
  isOpen, 
  onClose, 
  onEventUpdated 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState('');
  const [ticketUrl, setTicketUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingEvent, setFetchingEvent] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return;
      
      try {
        setFetchingEvent(true);
        const eventData = await getEventById(eventId);
        
        setTitle(eventData.title);
        setDescription(eventData.description || '');
        // Format datetime for input element
        setDatetime(eventData.datetime.slice(0, 16)); // YYYY-MM-DDThh:mm format
        setTicketUrl(eventData.ticket_url);
      } catch (error) {
        console.error('Fetch event error:', error);
        toast.error('Failed to fetch event details');
        onClose();
      } finally {
        setFetchingEvent(false);
      }
    };

    if (isOpen && eventId) {
      fetchEvent();
    }
  }, [eventId, isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventId) return;
    
    if (!title.trim() || !datetime.trim() || !ticketUrl.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      const eventInput: UpdateEventInput = {
        title,
        datetime,
        ticket_url: ticketUrl,
        description: description || null,
      };
      
      const updatedEvent = await updateEvent(eventId, eventInput);
      
      toast.success('Event updated successfully');
      onEventUpdated(updatedEvent);
      onClose();
    } catch (error) {
      console.error('Update event error:', error);
      toast.error('Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !loading && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gradient-event">Edit Event</DialogTitle>
        </DialogHeader>
        
        {fetchingEvent ? (
          <div className="flex justify-center p-8">
            <div className="w-8 h-8 border-4 border-event border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="edit-title">Event Title *</Label>
              <Input
                id="edit-title"
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Enter event description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-datetime">Date and Time *</Label>
              <Input
                id="edit-datetime"
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-ticketUrl">Ticket URL *</Label>
              <Input
                id="edit-ticketUrl"
                placeholder="Enter ticket URL"
                value={ticketUrl}
                onChange={(e) => setTicketUrl(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-event hover:opacity-90"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </span>
                ) : (
                  'Update Event'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventEditForm;
