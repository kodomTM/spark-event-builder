
import { supabase } from '@/integrations/supabase/client';
import { Event, CreateEventInput, UpdateEventInput } from '@/types/event';
import { MailingListEntry } from '@/types/mailingList';

// Public API functions
export const getEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('datetime', { ascending: true })
    .gte('datetime', new Date().toISOString()); // Only future events
  
  if (error) throw error;
  return data || [];
};

export const addToMailingList = async (name: string, email: string): Promise<void> => {
  // Check if email already exists
  const { data: existingData } = await supabase
    .from('mailing_list')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  
  if (existingData) {
    throw new Error('duplicate');
  }
  
  const { error } = await supabase
    .from('mailing_list')
    .insert([{ name, email }]);
  
  if (error) throw error;
};

// Admin API functions
export const loginAdmin = async (email: string, password: string): Promise<void> => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
};

export const logoutAdmin = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getMailingList = async (): Promise<MailingListEntry[]> => {
  const { data, error } = await supabase
    .from('mailing_list')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const addEvent = async (eventData: CreateEventInput): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .insert(eventData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateEvent = async (id: string, eventData: UpdateEventInput): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .update(eventData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getEventById = async (id: string): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

export const checkAdminAuthentication = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession();
  
  return !!data.session;
};

// Export mailing list to different formats
export const exportMailingListToCSV = (entries: MailingListEntry[]): string => {
  // Create CSV header
  const csvContent = [
    'Name,Email,Signup Date',
    ...entries.map(entry => 
      `"${entry.name.replace(/"/g, '""')}","${entry.email}","${new Date(entry.created_at).toLocaleDateString()}"`
    )
  ].join('\n');
  
  return csvContent;
};

export const exportMailingListToJSON = (entries: MailingListEntry[]): string => {
  return JSON.stringify(entries, null, 2);
};

export const exportMailingListToTXT = (entries: MailingListEntry[]): string => {
  return entries.map(entry => `${entry.name} <${entry.email}>`).join('\n');
};
