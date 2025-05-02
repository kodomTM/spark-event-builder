
export interface Event {
  id: string;
  title: string;
  description: string | null;
  datetime: string;
  ticket_url: string;
  created_at: string;
}

// Add a new type for event creation that makes only the required fields mandatory
export interface CreateEventInput {
  title: string;
  datetime: string;
  ticket_url: string;
  description?: string | null;
}
