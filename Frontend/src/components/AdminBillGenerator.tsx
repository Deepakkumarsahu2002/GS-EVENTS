import { useRef, useState } from 'react';
import { Download, Trash2 } from 'lucide-react';

type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID';
type EventType = 'HOUSEWARMING CEREMONY' | 'BABY SHOWER' | 'BIRTHDAY' | 'WEDDING' | 'OTHER';
type ServiceKey = 'DECORATION' | 'EVENT MANAGEMENT' | 'CATERING';

type ServiceItem = {
  category: ServiceKey;
  description: string;
  date: string;
  time: string;
  rate: number;
  quantity: number;
};

const studio = {
  name: 'GS EVENTS & CATERING',
  address: '',
  phone: '',
  email: '',
  bankName: '',
  accountName: '',
  accountNumber: '',
  ifsc: '',
  branch: '',
};

const serviceDefaults: Record<ServiceKey, string> = {
  DECORATION: 'Stage Decoration, Floral Setup, Lighting',
  'EVENT MANAGEMENT': 'Coordination, Setup, Anchor',
  CATERING: 'Buffet Service, Live Counters, Staff',
};

const defaultServices = (): ServiceItem[] => [
  { category: 'DECORATION', description: serviceDefaults.DECORATION, date: '', time: '18:00', rate: 0, quantity: 1 },
  { category: 'EVENT MANAGEMENT', description: serviceDefaults['EVENT MANAGEMENT'], date: '', time: '16:00', rate: 0, quantity: 1 },
  { category: 'CATERING', description: serviceDefaults.CATERING, date: '', time: '19:00', rate: 0, quantity: 1 },
];

const fieldClass = 'w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20';
const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export default function AdminBillGenerator() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [eventType, setEventType] = useState<EventType>('WEDDING');
  const [eventTypeOther, setEventTypeOther] = useState('');
  const [clientName, setClientName] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${new Date().getFullYear()}-001`);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<InvoiceStatus>('DRAFT');
  const [advancePaid, setAdvancePaid] = useState(0);
  const [paymentNotes, setPaymentNotes] = useState('');
  const [remarks, setRemarks] = useState('');
  const [services, setServices] = useState<ServiceItem[]>(defaultServices());
  const [isDownloading, setIsDownloading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const activeCategories = services.map((item) => item.category);
  const subtotal = services.reduce((sum, item) => sum + item.rate * item.quantity, 0);
  const eventLabel = eventType === 'OTHER' ? eventTypeOther || 'OTHER' : eventType;
  const balanceDue = Math.max(subtotal - advancePaid, 0);

  const updateService = (category: ServiceKey, key: keyof ServiceItem, value: string | number) => {
    setServices((current) => current.map((item) => item.category === category
      ? { ...item, [key]: key === 'rate' || key === 'quantity' ? Number(value) || 0 : value }
      : item));
  };

  const toggleCategory = (category: ServiceKey) => {
    setServices((current) => {
      if (current.some((item) => item.category === category)) return current.filter((item) => item.category !== category);
      return [...current, { category, description: serviceDefaults[category], date: invoiceDate, time: '18:00', rate: 0, quantity: 1 }];
    });
  };

  const handleDownload = async () => {
    if (!previewRef.current || isDownloading) return;
    setIsDownloading(true);
    setMessage(null);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf().set({
        margin: 0.15,
        filename: `invoice-${invoiceNumber || 'draft'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff', width: 794, windowWidth: 794 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      }).from(previewRef.current).save();
      setMessage('Invoice downloaded successfully.');
    } catch (error) {
      console.error('PDF generation error:', error);
      setMessage('Unable to download the invoice. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[440px_minmax(0,1fr)]">
      <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="font-serif text-xl tracking-wide text-neutral-900">Bill Generator</h2>
          <p className="mt-2 text-sm text-neutral-500">Create and download a client invoice without saving it online.</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Event Type</label>
            <select className={`mt-2 ${fieldClass}`} value={eventType} onChange={(e) => setEventType(e.target.value as EventType)}>
              <option>HOUSEWARMING CEREMONY</option><option>BABY SHOWER</option><option>BIRTHDAY</option><option>WEDDING</option><option>OTHER</option>
            </select>
            {eventType === 'OTHER' && <input className={`mt-2 ${fieldClass}`} value={eventTypeOther} onChange={(e) => setEventTypeOther(e.target.value)} placeholder="Specify event type" />}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Service Categories</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {(['DECORATION', 'EVENT MANAGEMENT', 'CATERING'] as ServiceKey[]).map((category) => (
                <button key={category} type="button" onClick={() => toggleCategory(category)} className={`rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-wider transition-colors ${activeCategories.includes(category) ? 'border-primary-600 bg-primary-600 text-white' : 'border-neutral-200 text-neutral-600 hover:border-primary-300'}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          {services.map((item) => (
            <div key={item.category} className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">{item.category}</p>
                <button type="button" onClick={() => toggleCategory(item.category)} className="text-neutral-400 hover:text-error-600" aria-label={`Remove ${item.category}`}><Trash2 className="h-4 w-4" /></button>
              </div>
              <textarea rows={2} value={item.description} onChange={(e) => updateService(item.category, 'description', e.target.value)} className={fieldClass} placeholder="Description" />
              <div className="mt-3 grid grid-cols-2 gap-3">
                <input type="date" value={item.date} onChange={(e) => updateService(item.category, 'date', e.target.value)} className={fieldClass} />
                <input type="time" value={item.time} onChange={(e) => updateService(item.category, 'time', e.target.value)} className={fieldClass} />
                <input type="number" min="0" value={item.rate} onChange={(e) => updateService(item.category, 'rate', e.target.value)} className={fieldClass} placeholder="Rate" />
                <input type="number" min="1" value={item.quantity} onChange={(e) => updateService(item.category, 'quantity', e.target.value)} className={fieldClass} placeholder="Qty" />
              </div>
            </div>
          ))}

          <div className="grid gap-3 sm:grid-cols-2">
            <input value={clientName} onChange={(e) => setClientName(e.target.value)} className={fieldClass} placeholder="Client name" />
            <input value={mobile} onChange={(e) => setMobile(e.target.value)} className={fieldClass} placeholder="Mobile" />
            <input value={location} onChange={(e) => setLocation(e.target.value)} className={`sm:col-span-2 ${fieldClass}`} placeholder="Location / Venue" />
            <input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className={fieldClass} placeholder="Invoice number" />
            <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className={fieldClass} />
            <select value={status} onChange={(e) => setStatus(e.target.value as InvoiceStatus)} className={fieldClass}><option>DRAFT</option><option>SENT</option><option>PAID</option></select>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Payment Information</p>
            <input type="number" min="0" value={advancePaid} onChange={(e) => setAdvancePaid(Number(e.target.value) || 0)} className={`mt-3 ${fieldClass}`} placeholder="Advance paid" />
            <textarea rows={2} value={paymentNotes} onChange={(e) => setPaymentNotes(e.target.value)} className={`mt-3 ${fieldClass}`} placeholder="Payment notes" />
          </div>
          <textarea rows={3} value={remarks} onChange={(e) => setRemarks(e.target.value)} className={fieldClass} placeholder="Remarks" />
        </div>
      </div>

      <div className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-serif text-xl tracking-wide text-neutral-900">Live Preview</h2>
          <button type="button" onClick={handleDownload} disabled={isDownloading} className="btn-primary !px-4 !py-2.5 disabled:opacity-60">
            <Download className="h-4 w-4" /> {isDownloading ? 'Downloading...' : 'Download PDF'}
          </button>
        </div>
        {message && <p className="mb-4 rounded-lg bg-primary-50 px-3 py-2 text-sm text-primary-700">{message}</p>}
        <div className="overflow-x-auto">
          <div ref={previewRef} className="mx-auto w-[794px] overflow-hidden border border-[#eadfce] bg-white text-[#1e1a17] shadow-xl" style={{ fontFamily: 'Segoe UI, Arial, sans-serif', lineHeight: 1.45 }}>
            <div className="border-b border-[#e7d7b5] p-6">
              <div className="flex justify-between gap-6">
                <div>
                  <div className="font-serif text-2xl font-bold tracking-wide text-[#b8863b]">{studio.name}</div>
                  {studio.address && <p className="mt-1 text-[11px] text-[#6b5d4b]">{studio.address}</p>}
                  {(studio.phone || studio.email) && <p className="text-[11px] text-[#6b5d4b]">{[studio.phone, studio.email].filter(Boolean).join(' · ')}</p>}
                </div>
                <div className="text-right"><p className="text-[10px] font-bold uppercase tracking-widest text-[#8d7a65]">Invoice</p><p className="font-serif text-xl font-bold text-[#b8863b]">BILL</p></div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
                <div className="border border-[#e7d7b5] bg-[#fffaf2] p-3"><p className="text-[10px] font-bold uppercase tracking-widest text-[#8d7a65]">Bill To</p>{clientName ? <p className="mt-2 font-serif text-xl font-bold">{clientName}</p> : null}{mobile ? <p className="text-[11px]">{mobile}</p> : null}{location ? <p className="text-[11px]">{location}</p> : null}{eventLabel && <p className="mt-1 text-[11px] font-semibold text-[#b8863b]">{eventLabel}</p>}</div>
                <div className="border border-[#e7d7b5] bg-[#fffaf2] p-3 text-[11px]"><div className="grid grid-cols-[1fr_auto] gap-2"><span className="text-[#7d6955]">Invoice No.</span><strong>{invoiceNumber || ''}</strong><span className="text-[#7d6955]">Invoice Date</span><strong>{invoiceDate || ''}</strong><span className="text-[#7d6955]">Status</span><strong>{status}</strong></div></div>
              </div>
              <table className="mt-5 w-full border border-[#e7d7b5] text-[10px]"><thead className="bg-[#f7efe2]"><tr>{['Service', 'Description', 'Date', 'Time', 'Rate', 'Qty', 'Amount'].map((heading) => <th key={heading} className="p-2 text-left text-[9px] uppercase tracking-wider text-[#6b5849]">{heading}</th>)}</tr></thead><tbody>{services.map((item) => <tr key={item.category} className="border-t border-[#f0e0c3]"><td className="p-2 font-semibold">{item.category}</td><td className="p-2">{item.description}</td><td className="p-2">{item.date || '--'}</td><td className="p-2">{item.time}</td><td className="p-2 text-right">{money(item.rate)}</td><td className="p-2 text-center">{item.quantity}</td><td className="p-2 text-right font-semibold">{money(item.rate * item.quantity)}</td></tr>)}<tr className="bg-[#f9f3e8] font-bold"><td colSpan={6} className="p-2 text-right">Sum Total</td><td className="p-2 text-right">{money(subtotal)}</td></tr></tbody></table>
              <div className="mt-5 grid grid-cols-[1.1fr_0.9fr] gap-4"><div className="border border-[#e7d7b5] bg-[#fffaf2] p-3 text-[11px]"><p className="text-[10px] font-bold uppercase tracking-wider text-[#8d7a65]">Payment Information</p>{studio.bankName && <p className="mt-2"><strong>Bank:</strong> {studio.bankName}</p>}{studio.accountName && <p><strong>Account Name:</strong> {studio.accountName}</p>}{studio.accountNumber && <p><strong>Account Number:</strong> {studio.accountNumber}</p>}{studio.ifsc && <p><strong>IFSC:</strong> {studio.ifsc}</p>}{studio.branch && <p><strong>Branch:</strong> {studio.branch}</p>}{paymentNotes && <p className="mt-2"><strong>Notes:</strong> {paymentNotes}</p>}</div><div className="border border-[#e7d7b5] bg-[#fffaf2] p-3 text-[11px]"><p className="text-[10px] font-bold uppercase tracking-wider text-[#8d7a65]">Totals</p><div className="mt-2 grid grid-cols-[1fr_auto] gap-2"><span>Subtotal</span><strong>{money(subtotal)}</strong><span>Total Amount</span><strong>{money(subtotal)}</strong><span>Advance Paid</span><strong>{money(advancePaid)}</strong><span className="font-bold text-[#b8863b]">Balance Due</span><strong className="text-[#b8863b]">{money(balanceDue)}</strong></div></div></div>
              {remarks && <div className="mt-5 border border-[#e7d7b5] bg-[#fffaf2] p-3 text-[11px]"><p className="text-[10px] font-bold uppercase tracking-wider text-[#8d7a65]">Remarks</p><p className="mt-2 whitespace-pre-wrap">{remarks}</p></div>}
            </div>
            <div className="page-break-before-always border-t border-[#e7d7b5] p-6" style={{ pageBreakBefore: 'always' }}><h2 className="font-serif text-lg font-bold text-[#b8863b]">Terms & Conditions</h2><p className="mt-3 text-[11px] leading-relaxed"><strong>Contract Terms:</strong> All services are subject to final confirmation, scheduling, and vendor availability. Any additions or modifications must be approved in writing.</p><p className="mt-2 text-[11px] leading-relaxed"><strong>Cancellation Policy:</strong> Deposits are non-refundable once the booking has been confirmed. Any cancellation after confirmation follows the agreed cancellation schedule.</p><div className="mt-10 grid grid-cols-2 gap-6 text-[11px]"><div className="border-t border-[#b58b43] pt-2">Customer Signature</div><div className="border-t border-[#b58b43] pt-2">Authorised Signature</div></div><p className="mt-32 text-center text-xs italic text-[#7d6955]">Thank you for your business!</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
