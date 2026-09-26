import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  image_url: { type: String, required: true },
  public_id: { type: String, required: true },
  category: { type: String, required: true, default: 'Decorations' },
  created_at: { type: Date, default: Date.now },
}, { versionKey: false });

gallerySchema.index({ category: 1 });

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  event_type: String,
  rating: { type: Number, required: true, default: 5, min: 1, max: 5 },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
}, { versionKey: false });

const invoiceSchema = new mongoose.Schema({
  invoice_number: { type: String, required: true },
  client_name: { type: String, required: true },
  client_phone: String,
  client_email: String,
  event_date: Date,
  event_type: String,
  event_venue: String,
  items: { type: Array, default: [] },
  subtotal: { type: Number, default: 0 },
  tax_rate: { type: Number, default: 0 },
  tax_amount: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  notes: String,
  status: { type: String, enum: ['draft', 'sent', 'paid'], default: 'draft' },
  created_at: { type: Date, default: Date.now },
}, { versionKey: false });

invoiceSchema.index({ created_at: -1 });

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password_hash: { type: String, required: true },
  role: { type: String, default: 'admin' },
  created_at: { type: Date, default: Date.now },
}, { versionKey: false });

export const GalleryItem = mongoose.model('GalleryItem', gallerySchema, 'gallery_items');
export const Testimonial = mongoose.model('Testimonial', testimonialSchema, 'testimonials');
export const Invoice = mongoose.model('Invoice', invoiceSchema, 'invoices');
export const Admin = mongoose.model('Admin', adminSchema, 'admins');
