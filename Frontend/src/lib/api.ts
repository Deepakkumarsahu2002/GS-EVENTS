const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export type GalleryItem = {
  _id: string;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
  id: string;
};

export type Testimonial = {
  _id: string;
  name: string;
  event_type: string | null;
  rating: number;
  message: string;
  created_at: string;
};

export type InvoiceItem = { name: string; quantity: number; price: number };
export type Invoice = {
  _id: string;
  id?: string;
  invoice_number: string;
  client_name: string;
  client_phone: string | null;
  client_email: string | null;
  event_date: string | null;
  event_type: string | null;
  event_venue: string | null;
  items: InvoiceItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes: string | null;
  status: string;
  created_at: string;
};

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('gs_events_token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'Request failed');
  }
  return response.status === 204 ? undefined as T : response.json();
};

export const api = {
  login: (email: string, password: string) => request<{ token: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  gallery: async () => (await request<Omit<GalleryItem, 'id'>[]>('/gallery')).map((item) => ({ ...item, id: item._id })),
  addGallery: (data: FormData) => request<GalleryItem>('/gallery', { method: 'POST', body: data }),
  deleteGallery: (id: string) => request<void>(`/gallery/${id}`, { method: 'DELETE' }),
  testimonials: () => request<Testimonial[]>('/testimonials'),
  invoices: () => request<Invoice[]>('/invoices'),
  addInvoice: (data: Omit<Invoice, '_id' | 'id' | 'created_at'>) => request<Invoice>('/invoices', { method: 'POST', body: JSON.stringify(data) }),
};

export const GALLERY_CATEGORIES = ['Weddings', 'Catering', 'Birthdays', 'Corporate', 'Private Ceremonies', 'Decorations'] as const;
export const EVENT_TYPES = ['Grand Wedding', 'Thread Ceremony', 'Birthday Party', 'Private Ceremony', 'Corporate Event', 'Catering Only'] as const;
