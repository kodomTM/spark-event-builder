
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import AdminHeader from '@/components/admin/AdminHeader';
import EventForm from '@/components/admin/EventForm';
import EventsTable from '@/components/admin/EventsTable';
import EventEditForm from '@/components/admin/EventEditForm';
import MailingListTable from '@/components/admin/MailingListTable';
import { checkAdminAuthentication, getEvents, getMailingList } from '@/lib/api';
import { Event } from '@/types/event';
import { MailingListEntry } from '@/types/mailingList';

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [mailingList, setMailingList] = useState<MailingListEntry[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingMailingList, setLoadingMailingList] = useState(true);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await checkAdminAuthentication();
        if (!isAuthenticated) {
          toast.error('Please login to access the dashboard');
          navigate('/admin');
        } else {
          fetchData();
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast.error('Authentication error');
        navigate('/admin');
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoadingEvents(true);
      setLoadingMailingList(true);
      
      const [eventsData, mailingListData] = await Promise.all([
        getEvents(),
        getMailingList()
      ]);
      
      setEvents(eventsData);
      setMailingList(mailingListData);
    } catch (error) {
      console.error('Fetch data error:', error);
      toast.error('Failed to load data');
    } finally {
      setLoadingEvents(false);
      setLoadingMailingList(false);
    }
  };

  const handleEventAdded = (event: Event) => {
    setEvents([...events, event]);
  };

  const handleEventUpdated = (updatedEvent: Event) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleEventDeleted = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminHeader />
      
      <div className="flex-grow">
        <div className="container px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <EventForm onEventAdded={handleEventAdded} />
            </div>
            
            <div className="lg:col-span-2 space-y-8">
              <EventsTable 
                events={events}
                onEventDeleted={handleEventDeleted}
                onEditEvent={setEditingEventId}
              />
              
              <MailingListTable 
                entries={mailingList}
                loading={loadingMailingList}
              />
            </div>
          </div>
        </div>
      </div>
      
      <EventEditForm 
        eventId={editingEventId}
        isOpen={!!editingEventId}
        onClose={() => setEditingEventId(null)}
        onEventUpdated={handleEventUpdated}
      />
    </div>
  );
};

export default Dashboard;
