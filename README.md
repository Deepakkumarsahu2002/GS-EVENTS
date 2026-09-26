# GS Events and Catering

The project is split into two applications:

- `Frontend`: Vite, React, TypeScript, and Tailwind UI
- `Backend`: Express API, MongoDB Atlas persistence, JWT admin auth, and Cloudinary image uploads

## Run locally

1. Configure `Backend/.env` with the required MongoDB, JWT, admin, and Cloudinary settings.
2. Install and start the API:

```powershell
cd Backend
npm install
npm run dev
```

3. Configure `Frontend/.env` with `VITE_API_URL` if the API is not on port 4000.
4. Install and start the UI:

```powershell
cd Frontend
npm install
npm run dev
```

The gallery admin upload sends images to the backend, which uploads them to Cloudinary and stores the resulting URL in MongoDB.
