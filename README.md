# GS Events & Catering

GS Events & Catering is a full-stack event management website for a business specializing in weddings, birthdays, corporate events, private ceremonies, and catering services. The project is split into a React frontend and an Express backend with MongoDB persistence and Cloudinary media support.

## Overview

This application includes:

- Public marketing pages for services, gallery, testimonials, and contact information
- Admin authentication for protected dashboard actions
- Gallery upload and deletion with Cloudinary storage
- Invoice generation and downloadable PDF billing documents
- Backend API for gallery, testimonial, and invoice data

## Live Deployment

The project is currently deployed in production with the following endpoints:

- Frontend: https://gs-events-7ja.pages.dev
- Backend: https://gs-events.onrender.com
- Health check: https://gs-events.onrender.com/api/health

Use the Render backend URL as the API base for the live frontend configuration.

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide icons
- html2pdf.js for PDF invoice export

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT-based admin authentication
- Cloudinary image upload
- Multer for multipart file upload
- bcryptjs for password hashing

## Project Structure

```text
GS_EVENTS_2/
├─ README.md
├─ Backend/
│  ├─ README.md
│  ├─ package.json
│  └─ src/
│     ├─ models.js
│     └─ server.js
├─ Frontend/
│  ├─ package.json
│  ├─ index.html
│  ├─ vite.config.ts
│  ├─ tailwind.config.js
│  ├─ postcss.config.js
│  ├─ eslint.config.js
│  ├─ public/
│  └─ src/
│     ├─ App.tsx
│     ├─ main.tsx
│     ├─ index.css
│     ├─ components/
│     ├─ context/
│     ├─ lib/
│     ├─ pages/
│     └─ types/
└─ .gitignore
```

## Features

### Public website
The frontend contains marketing pages for:

- Home page with hero banner, stats, featured services, and testimonials
- About page
- Services page showing event management and catering offerings
- Gallery page with category-based portfolio items
- Contact page for enquiry workflow

### Admin dashboard
Protected admin routes are available at:

- `/admin-login`
- `/admin`

The admin dashboard supports:

- Login with email and password
- Gallery management with image upload and removal
- Category-based gallery filtering
- PDF invoice generation for event billing

### Backend API
The API is served from the Express backend and supports:

- Health check: `GET /api/health`
- Admin login: `POST /api/auth/login`
- Gallery listing: `GET /api/gallery`
- Gallery creation: `POST /api/gallery` (admin only)
- Gallery deletion: `DELETE /api/gallery/:id` (admin only)
- Testimonials: `GET /api/testimonials`
- Invoice listing: `GET /api/invoices` (admin only)
- Invoice creation: `POST /api/invoices` (admin only)

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 18 or newer
- npm
- MongoDB Atlas connection string or a local MongoDB instance
- Cloudinary account credentials
- A terminal or command prompt

## Environment Configuration

### Backend `.env`
Create a file at `Backend/.env` with the following variables:

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/gs-events
JWT_SECRET=replace_with_a_long_secure_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=StrongPassword123
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Notes:

- `MONGODB_URI` should point to your MongoDB Atlas database.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` are used to create or update the admin account automatically when the backend starts.
- `JWT_SECRET` is required for issuing admin login tokens.
- Cloudinary credentials are used when uploading gallery images.

### Frontend `.env`
Create a file at `Frontend/.env` if you need to override the default API URL:

```env
VITE_API_URL=https://gs-events.onrender.com/api
```

For local development, use:

```env
VITE_API_URL=http://localhost:5000/api
```

If this is not set, the frontend defaults to `http://localhost:5000/api`.

## Local Development Setup

### 1. Install backend dependencies

```powershell
cd Backend
npm install
```

### 2. Start the backend

```powershell
cd Backend
npm run dev
```

This starts the Express API with file watching enabled.

### 3. Install frontend dependencies

```powershell
cd Frontend
npm install
```

### 4. Start the frontend

```powershell
cd Frontend
npm run dev
```

This starts the Vite development server. By default it runs on:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## Production Build

### Frontend build

```powershell
cd Frontend
npm run build
```

This creates a production build in the `dist` folder.

### Frontend preview

```powershell
cd Frontend
npm run preview
```

### Backend production start

```powershell
cd Backend
npm run start
```

## Admin Account

On server startup, the backend ensures an admin record exists using the configured `ADMIN_EMAIL` and `ADMIN_PASSWORD` values.

Default login flow:

1. Visit `/admin-login`
2. Sign in using the admin email and password from the backend `.env`
3. Access the protected admin dashboard

The backend stores a hashed password and issues a JWT token for authenticated requests.

## API Behavior

### Authentication
The backend requires a Bearer token for protected admin routes.

Example header:

```http
Authorization: Bearer <jwt_token>
```

### Gallery upload flow
When an admin uploads a gallery image:

1. The frontend sends the image as `multipart/form-data`
2. The backend validates the file type and size
3. The backend uploads the image to Cloudinary
4. Cloudinary returns a public URL and public ID
5. The metadata is stored in MongoDB

### Invoice generation
The frontend includes a bill generator that exports invoices as PDFs using `html2pdf.js`. It creates styled billing documents for event type, service categories, payment details, and balance due calculations.

The backend also exposes invoice endpoints for storing and retrieving invoice records in MongoDB for admin use.

## Routes and Pages

### Frontend public routing
- `/` — Home page
- `/about` — About page
- `/services` — Event services
- `/gallery` — Portfolio gallery
- `/contact` — Contact inquiry page

### Admin routing
- `/admin-login` — Admin sign-in page
- `/admin` — Protected dashboard

## Database Models

The backend has the following Mongoose models in `Backend/src/models.js`:

- `GalleryItem`
  - title
  - image_url
  - public_id
  - category
  - created_at

- `Testimonial`
  - name
  - event_type
  - rating
  - message
  - created_at

- `Invoice`
  - invoice_number
  - client_name
  - client_phone
  - client_email
  - event_date
  - event_type
  - event_venue
  - items
  - subtotal
  - tax_rate
  - tax_amount
  - total
  - notes
  - status
  - created_at

- `Admin`
  - email
  - password_hash
  - role
  - created_at

## Common Troubleshooting

### MongoDB connection failures
If the backend cannot connect to MongoDB:

- Confirm the `MONGODB_URI` is valid
- Ensure your MongoDB Atlas cluster allows access from your current IP
- Verify the database credentials are correct
- Check whether the backend has network access to MongoDB

### Cloudinary upload issues
If gallery uploads fail:

- Check `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`
- Confirm the Cloudinary account is active
- Ensure the uploaded file type is an image and under the 10MB limit

### Port conflicts
If the backend reports that the port is already in use:

- Stop the existing backend process
- Or change `PORT` in `Backend/.env`

### Frontend API not reachable
If the frontend cannot talk to the backend:

- Check whether the backend is running
- Confirm `VITE_API_URL` matches the backend URL
- Ensure CORS configuration allows your frontend origin

## Useful Commands

From the project root:

```powershell
# Backend
cd Backend
npm install
npm run dev
npm run start

# Frontend
cd Frontend
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Notes

- The gallery media is stored in Cloudinary, while MongoDB stores metadata and admin records.
- The frontend is designed for a polished event-management marketing experience.
- The admin dashboard is the primary control center for content updates and invoice export.

## License

This project does not currently declare a license in the repository. If you plan to distribute or deploy it publicly, add a license file and document the licensing terms clearly.

## Maintainer

This project is intended for GS Events & Catering operational use and admin management. Update credentials and environment configuration before deploying to production.
