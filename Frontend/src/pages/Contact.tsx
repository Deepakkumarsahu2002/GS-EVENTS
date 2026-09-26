import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2, MessageCircle } from 'lucide-react';

const whatsappLink = 'https://wa.me/917978512963?text=Hi%20GS%20Events%20and%20Catering%2C%20I%20want%20to%20book%20an%20event.';
const callLink = 'tel:+919937078889';
const emailLink = 'mailto:rozexeventmanagement@gmail.com';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Grand Wedding',
    date: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const buildWhatsAppMessage = () => {
    const details = [
      `Name: ${form.name || 'Not provided'}`,
      `Phone: ${form.phone || 'Not provided'}`,
      `Email: ${form.email || 'Not provided'}`,
      `Event Type: ${form.eventType}`,
      `Event Date: ${form.date || 'Not provided'}`,
      `Message: ${form.message || 'No additional details provided'}`,
    ];

    return encodeURIComponent(details.join('\n'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const message = buildWhatsAppMessage();
    const waUrl = `${whatsappLink}&text=${message}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', eventType: 'Grand Wedding', date: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 300);
  };

  const contactInfo = [
    { icon: Phone, label: 'Call Us', value: '+91 99370 78889', sub: 'Mon-Sat, 9am-8pm', href: callLink },
    { icon: Phone, label: 'Call Us', value: '+91 79785 12963', sub: 'Alternate contact number', href: 'tel:+917978512963' },
    { icon: Mail, label: 'Email Us', value: 'rozexeventmanagement@gmail.com', sub: 'We reply within 24 hours', href: emailLink },
    { icon: MapPin, label: 'Visit Us', value: 'Gandhinagar 5th Lane West, Berhampur', sub: 'Serving all of Odisha and beyond', href: '#' },
    { icon: MessageCircle, label: 'WhatsApp', value: '+91 79785 12963', sub: 'Quick chat for bookings', href: whatsappLink },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-neutral-900 via-primary-950 to-neutral-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-600/15 rounded-full blur-3xl" />
        <div className="container-max relative px-4 sm:px-6 md:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-400">Get in Touch</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            Contact Us
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-2xl mx-auto">
            Have an event in mind? Let's talk. Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                const content = (
                  <div className="flex gap-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-100 transition-all hover:border-primary-200 hover:shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{info.label}</p>
                      <p className="font-semibold text-neutral-900 mt-1">{info.value}</p>
                      <p className="text-sm text-neutral-500 mt-0.5">{info.sub}</p>
                    </div>
                  </div>
                );

                if (info.href && info.href !== '#') {
                  return (
                    <a key={i} href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel={info.href.startsWith('http') ? 'noreferrer' : undefined} className="block">
                      {content}
                    </a>
                  );
                }

                return <div key={i}>{content}</div>;
              })}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-neutral-50 rounded-3xl p-8 md:p-10 border border-neutral-100">
                {status === 'sent' ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success-100 mb-5">
                      <CheckCircle2 className="h-10 w-10 text-success-600" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">Message Sent!</h3>
                    <p className="text-neutral-600 max-w-md">
                      Thank you for reaching out. Our team will get back to you within 24 hours to discuss your event.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Event Type</label>
                        <select
                          value={form.eventType}
                          onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        >
                          <option>Grand Wedding</option>
                          <option>Thread Ceremony</option>
                          <option>Birthday Party</option>
                          <option>Private Ceremony</option>
                          <option>Corporate Event</option>
                          <option>Catering Only</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Event Date</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Tell us about your event</label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                        placeholder="Number of guests, venue, budget, special requests..."
                      />
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="btn-primary flex-1 disabled:opacity-60"
                      >
                        {status === 'sending' ? (
                          <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                        ) : (
                          <><MessageCircle className="h-4 w-4" /> WhatsApp Us</>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
