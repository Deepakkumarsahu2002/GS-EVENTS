import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Admin, GalleryItem, Testimonial, Invoice } from './models.js';

const app = express();
const port = process.env.PORT || 5000;
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const asyncHandler = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
const allowedOrigins = new Set([
  'https://www.gseventsandcatering.in',
  'https://gs-events-7ja.pages.dev',
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.CLIENT_ORIGIN,
].filter(Boolean));

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const uploadToCloudinary = (buffer) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream({ folder: 'gs-events/gallery', resource_type: 'image' }, (error, result) => {
    if (error) reject(error); else resolve({ image_url: result.secure_url, public_id: result.public_id });
  });
  stream.end(buffer);
});

const ensureAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || !process.env.JWT_SECRET) throw new Error('ADMIN_EMAIL, ADMIN_PASSWORD, and JWT_SECRET are required');
  const password_hash = await bcrypt.hash(password, 12);
  await Admin.findOneAndUpdate(
    { email },
    { $set: { password_hash, role: 'admin' } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  console.log(`Admin account ready for ${email}`);
};

app.get('/api/health', (_req, res) => {
  const databaseState = ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown';
  const healthy = databaseState === 'connected';
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    database: databaseState,
  });
});

app.post('/api/auth/login', asyncHandler(async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const admin = email ? await Admin.findOne({ email }) : null;
  const valid = admin && await bcrypt.compare(req.body.password || '', admin.password_hash);
  if (!valid) return res.status(401).json({ message: 'Invalid email or password' });
  res.json({ token: jwt.sign({ email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '8h' }) });
}));

app.get('/api/gallery', asyncHandler(async (_req, res) => res.json(await GalleryItem.find().sort({ created_at: -1 }))));
app.post('/api/gallery', requireAuth, upload.single('image'), asyncHandler(async (req, res) => {
  if (!req.body.title?.trim() || !req.file) return res.status(400).json({ message: 'Title and image are required' });
  if (!req.file.mimetype.startsWith('image/')) return res.status(400).json({ message: 'Only image files are allowed' });
  const uploadResult = await uploadToCloudinary(req.file.buffer);
  const item = await GalleryItem.create({ title: req.body.title.trim(), category: req.body.category, ...uploadResult });
  res.status(201).json(item);
}));
app.delete('/api/gallery/:id', requireAuth, asyncHandler(async (req, res) => {
  const item = await GalleryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Gallery photo not found' });
  if (item.public_id) await cloudinary.uploader.destroy(item.public_id, { resource_type: 'image' });
  await item.deleteOne();
  res.status(204).end();
}));

app.get('/api/testimonials', asyncHandler(async (_req, res) => res.json(await Testimonial.find().sort({ created_at: -1 }))));
app.get('/api/invoices', requireAuth, asyncHandler(async (_req, res) => res.json(await Invoice.find().sort({ created_at: -1 }))));
app.post('/api/invoices', requireAuth, asyncHandler(async (req, res) => res.status(201).json(await Invoice.create(req.body))));

app.use((error, _req, res, _next) => res.status(500).json({ message: error.message || 'Server error' }));

const start = async () => {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      console.log(`Connecting to MongoDB (attempt ${attempt}/3)...`);
      await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
      console.log('MongoDB connected');
      await ensureAdmin();
      const server = app.listen(port, () => console.log(`Backend listening on http://localhost:${port}`));
      server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
          console.error(`Port ${port} is already in use. Stop the other backend process before restarting.`);
        } else {
          console.error('Backend failed to start:', error.message);
        }
        process.exit(1);
      });
      return;
    } catch (error) {
      console.error(`MongoDB connection failed: ${error.message}`);
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
  console.error('MongoDB is unavailable. Check DNS/internet access and MongoDB Atlas Network Access, then restart the backend.');
  process.exit(1);
};

start();
