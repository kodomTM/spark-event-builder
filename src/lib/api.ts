
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types/event';
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

export const addEvent = async (eventData: Partial<Event>): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .insert([eventData])
    .select()
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
