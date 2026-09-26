import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { LogOut, Images, FileText, Plus, Trash2, Loader2, Upload, X, Download } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api, GALLERY_CATEGORIES, EVENT_TYPES, type GalleryItem, type Invoice, type InvoiceItem } from '@/lib/api';
import AdminBillGenerator from '@/components/AdminBillGenerator';

type Tab = 'gallery' | 'invoices';

export default function AdminDashboard() {
  const { isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('gallery');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!isAdmin) return <Navigate to="/admin-login" replace />;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo%20(2).png" alt="GS Events and Catering" className="h-14 w-36 object-contain object-left" />
            <div>
              <h1 className="font-serif text-lg font-bold text-neutral-900">Admin Dashboard</h1>
              <p className="text-xs text-neutral-500">GS Events and Catering</p>
            </div>
          </div>
          <button
            onClick={async () => { await signOut(); navigate('/'); }}
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab('gallery')}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
              tab === 'gallery' ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <Images className="h-4 w-4" /> Gallery Management
          </button>
          <button
            onClick={() => setTab('invoices')}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
              tab === 'invoices' ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <FileText className="h-4 w-4" /> Invoice Generator
          </button>
        </div>

        {tab === 'gallery' ? <GalleryManager /> : <InvoiceManager />}
      </div>
    </div>
  );
}

function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState<{ title: string; image_url: File | ''; category: string }>({ title: '', image_url: '', category: GALLERY_CATEGORIES[0] });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  const load = () => {
    setLoading(true);
    api.gallery().then(setItems).catch(() => undefined).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.image_url) return;
    setSubmitting(true);
    setError(null);
    const payload = new FormData();
    payload.append('title', newItem.title);
    payload.append('category', newItem.category);
    payload.append('image', newItem.image_url);
    try {
      await api.addGallery(payload);
      setShowAdd(false);
      setNewItem({ title: '', image_url: '', category: GALLERY_CATEGORIES[0] });
      load();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to upload photo');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo from the gallery?')) return;
    try {
      await api.deleteGallery(id);
      load();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to delete photo');
    }
  };

  const filtered = filter === 'All' ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Gallery Photos</h2>
          <p className="text-sm text-neutral-500 mt-1">{items.length} photos in the gallery</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" /> Add Photo
        </button>
      </div>
      {error && <div className="mb-6 rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700">{error}</div>}

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['All', ...GALLERY_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              filter === cat ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary-500" /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-100 shadow-sm">
              <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs font-medium text-white truncate">{item.title}</p>
                <span className="text-[10px] text-primary-300">{item.category}</span>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-error-500/80 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-error-600"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-neutral-900">Add Gallery Photo</h3>
              <button onClick={() => setShowAdd(false)} className="text-neutral-400 hover:text-neutral-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  placeholder="Grand Wedding Stage"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Gallery Image *</label>
                <input
                  type="file"
                  required
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => setNewItem({ ...newItem, image_url: e.target.files?.[0] || '' })}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  placeholder="Choose an image"
                />
                <p className="text-xs text-neutral-400 mt-1">JPG, PNG, or WebP up to 10 MB</p>
              </div>
              {newItem.image_url && typeof newItem.image_url !== 'string' && (
                <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100">
                  <img src={URL.createObjectURL(newItem.image_url)} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category *</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                >
                  {GALLERY_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Add to Gallery
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function InvoiceManager() {
  void InvoiceForm;
  void InvoiceView;
  return <AdminBillGenerator />;
}

function InvoiceForm({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    client_name: '',
    client_phone: '',
    client_email: '',
    event_date: '',
    event_type: EVENT_TYPES[0] as string,
    event_venue: '',
    notes: '',
    tax_rate: 5,
  });
  const [items, setItems] = useState<InvoiceItem[]>([{ name: '', quantity: 1, price: 0 }]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const taxAmount = (subtotal * form.tax_rate) / 100;
  const total = subtotal + taxAmount;

  const handleAddItem = () => setItems([...items, { name: '', quantity: 1, price: 0 }]);
  const handleRemoveItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const handleItemChange = (idx: number, field: keyof InvoiceItem, value: string | number) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: field === 'name' ? value : Number(value) };
    setItems(updated);
  };

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `GS-${year}${month}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const validItems = items.filter((i) => i.name.trim() && i.quantity > 0);
    if (validItems.length === 0) {
      setError('Add at least one valid line item');
      setSubmitting(false);
      return;
    }

    try {
      await api.addInvoice({
      invoice_number: generateInvoiceNumber(),
      client_name: form.client_name,
      client_phone: form.client_phone || null,
      client_email: form.client_email || null,
      event_date: form.event_date || null,
      event_type: form.event_type,
      event_venue: form.event_venue || null,
      items: validItems,
      subtotal,
      tax_rate: form.tax_rate,
      tax_amount: taxAmount,
      total,
      notes: form.notes || null,
      status: 'draft',
      });
      onSaved();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to create invoice');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl my-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 sticky top-0 bg-white rounded-t-2xl z-10">
          <h3 className="font-serif text-xl font-bold text-neutral-900">Create Invoice</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600"><X className="h-5 w-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Client Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Client Name *</label>
              <input type="text" required value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" placeholder="Client name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone</label>
              <input type="tel" value={form.client_phone} onChange={(e) => setForm({ ...form, client_phone: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" placeholder="+91 98765 43210" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
              <input type="email" value={form.client_email} onChange={(e) => setForm({ ...form, client_email: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" placeholder="client@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Event Date</label>
              <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Event Type</label>
              <select value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all">
                {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Venue</label>
              <input type="text" value={form.event_venue} onChange={(e) => setForm({ ...form, event_venue: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" placeholder="Venue address" />
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-neutral-700">Line Items</label>
              <button type="button" onClick={handleAddItem} className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
                <Plus className="h-4 w-4" /> Add Item
              </button>
            </div>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <input type="text" value={item.name} onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                    className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 outline-none transition-all"
                    placeholder="Item description" />
                  <input type="number" min="1" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                    className="w-20 rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 outline-none transition-all"
                    placeholder="Qty" />
                  <input type="number" min="0" value={item.price} onChange={(e) => handleItemChange(idx, 'price', e.target.value)}
                    className="w-28 rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 outline-none transition-all"
                    placeholder="Price (₹)" />
                  <span className="w-24 text-right text-sm font-medium text-neutral-700 py-2">₹{(item.quantity * item.price).toLocaleString('en-IN')}</span>
                  {items.length > 1 && (
                    <button type="button" onClick={() => handleRemoveItem(idx)} className="p-2 text-neutral-400 hover:text-error-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-neutral-50 rounded-xl p-5 space-y-2">
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-neutral-600">
              <span>Tax Rate (%)</span>
              <input type="number" min="0" max="100" value={form.tax_rate} onChange={(e) => setForm({ ...form, tax_rate: Number(e.target.value) })}
                className="w-20 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-right focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 outline-none" />
            </div>
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Tax Amount</span><span>₹{taxAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-bold text-neutral-900 pt-2 border-t border-neutral-200">
              <span>Total</span><span>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Notes</label>
            <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
              placeholder="Payment terms, additional info..." />
          </div>

          {error && <div className="rounded-xl bg-error-50 border border-error-200 px-4 py-3 text-sm text-error-700">{error}</div>}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />} Generate Invoice
          </button>
        </form>
      </div>
    </div>
  );
}

function InvoiceView({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) {
  const handlePrint = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head><title>${invoice.invoice_number}</title>
      <style>
        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
        body { padding: 40px; color: #1a1a1a; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
        .logo { width: 220px; height: 90px; object-fit: contain; object-position: left center; }
        .logo-sub { font-size: 11px; color: #666; letter-spacing: 2px; text-transform: uppercase; }
        .invoice-title { font-size: 28px; font-weight: 700; color: #333; }
        .invoice-meta { text-align: right; font-size: 13px; color: #666; line-height: 1.8; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 8px; }
        .client-info { font-size: 14px; line-height: 1.6; color: #333; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999; padding: 12px; border-bottom: 2px solid #eee; }
        td { padding: 12px; border-bottom: 1px solid #eee; font-size: 14px; }
        .right { text-align: right; }
        .totals { margin-left: auto; width: 300px; }
        .totals div { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
        .totals .grand { font-size: 18px; font-weight: 700; border-top: 2px solid #333; padding-top: 12px; margin-top: 8px; }
        .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center; }
      </style></head><body>
      <div class="header">
        <div>
          <img class="logo" src="${window.location.origin}/logo%20(2).png" alt="GS Events and Catering">
          <div class="logo-sub">Events · Decor · Catering</div>
        </div>
        <div class="invoice-meta">
          <div class="invoice-title">INVOICE</div>
          <div>${invoice.invoice_number}</div>
          <div>${new Date(invoice.created_at).toLocaleDateString('en-IN')}</div>
        </div>
      </div>
      <div class="section">
        <div class="section-title">Bill To</div>
        <div class="client-info">
          <strong>${invoice.client_name}</strong><br>
          ${invoice.client_phone || ''} ${invoice.client_phone ? '<br>' : ''}
          ${invoice.client_email || ''} ${invoice.client_email ? '<br>' : ''}
          ${invoice.event_venue ? '<br>' + invoice.event_venue : ''}
        </div>
      </div>
      <div class="section">
        <div class="section-title">Event Details</div>
        <div class="client-info">
          ${invoice.event_type || 'N/A'}<br>
          ${invoice.event_date ? 'Date: ' + new Date(invoice.event_date).toLocaleDateString('en-IN') : ''}
        </div>
      </div>
      <table>
        <thead><tr><th>Description</th><th class="right">Qty</th><th class="right">Price</th><th class="right">Amount</th></tr></thead>
        <tbody>
          ${invoice.items.map((item: InvoiceItem) => `<tr><td>${item.name}</td><td class="right">${item.quantity}</td><td class="right">₹${item.price.toLocaleString('en-IN')}</td><td class="right">₹${(item.quantity * item.price).toLocaleString('en-IN')}</td></tr>`).join('')}
        </tbody>
      </table>
      <div class="totals">
        <div><span>Subtotal</span><span>₹${Number(invoice.subtotal).toLocaleString('en-IN')}</span></div>
        <div><span>Tax (${invoice.tax_rate}%)</span><span>₹${Number(invoice.tax_amount).toLocaleString('en-IN')}</span></div>
        <div class="grand"><span>Total</span><span>₹${Number(invoice.total).toLocaleString('en-IN')}</span></div>
      </div>
      ${invoice.notes ? `<div class="section"><div class="section-title">Notes</div><div class="client-info">${invoice.notes}</div></div>` : ''}
      <div class="footer">Thank you for choosing GS Events and Catering! · +91 98765 43210 · info@gsevents.in</div>
      </body></html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl my-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h3 className="font-serif text-xl font-bold text-neutral-900">Invoice {invoice.invoice_number}</h3>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
              <Download className="h-4 w-4" /> Print
            </button>
            <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 p-2"><X className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between mb-8">
            <div>
              <img src="/logo%20(2).png" alt="GS Events and Catering" className="h-20 w-48 object-contain object-left" />
            </div>
            <div className="text-right text-sm text-neutral-600">
              <div className="font-semibold text-neutral-900">{invoice.invoice_number}</div>
              <div>{new Date(invoice.created_at).toLocaleDateString('en-IN')}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Bill To</p>
              <p className="font-semibold text-neutral-900">{invoice.client_name}</p>
              {invoice.client_phone && <p className="text-sm text-neutral-600">{invoice.client_phone}</p>}
              {invoice.client_email && <p className="text-sm text-neutral-600">{invoice.client_email}</p>}
              {invoice.event_venue && <p className="text-sm text-neutral-600">{invoice.event_venue}</p>}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Event</p>
              <p className="text-sm text-neutral-900">{invoice.event_type || 'N/A'}</p>
              {invoice.event_date && <p className="text-sm text-neutral-600">{new Date(invoice.event_date).toLocaleDateString('en-IN')}</p>}
            </div>
          </div>

          <table className="w-full mb-6">
            <thead>
              <tr className="border-b-2 border-neutral-200">
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-400 py-3">Description</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wider text-neutral-400 py-3">Qty</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wider text-neutral-400 py-3">Price</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wider text-neutral-400 py-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} className="border-b border-neutral-100">
                  <td className="py-3 text-sm text-neutral-700">{item.name}</td>
                  <td className="py-3 text-sm text-neutral-700 text-right">{item.quantity}</td>
                  <td className="py-3 text-sm text-neutral-700 text-right">₹{item.price.toLocaleString('en-IN')}</td>
                  <td className="py-3 text-sm font-medium text-neutral-900 text-right">₹{(item.quantity * item.price).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ml-auto max-w-xs space-y-2">
            <div className="flex justify-between text-sm text-neutral-600"><span>Subtotal</span><span>₹{Number(invoice.subtotal).toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between text-sm text-neutral-600"><span>Tax ({invoice.tax_rate}%)</span><span>₹{Number(invoice.tax_amount).toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between font-bold text-neutral-900 pt-2 border-t border-neutral-200"><span>Total</span><span>₹{Number(invoice.total).toLocaleString('en-IN')}</span></div>
          </div>

          {invoice.notes && (
            <div className="mt-6 pt-4 border-t border-neutral-200">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Notes</p>
              <p className="text-sm text-neutral-600">{invoice.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
