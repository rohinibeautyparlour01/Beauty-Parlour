# Rohini Beauty Parlour – MERN Website

```
client-rohini/
├── client/   React (Vite) front-end  → deploy to Vercel
└── server/   Express + MongoDB + Twilio API → deploy to Vercel (separate project) or Render/Railway
```

## 1. Run locally
```bash
# API
cd server && cp .env.example .env     # fill in values
npm install && npm run dev            # http://localhost:5000

# Website
cd client && npm install && npm run dev   # http://localhost:5173
```

## 2. MongoDB
Create a free cluster on MongoDB Atlas → Database Access (user) → Network Access (allow 0.0.0.0/0 for Vercel) → copy the connection string into `MONGODB_URI`.

## 3. Twilio WhatsApp automation
1. Twilio Console → Messaging → Try it out → *Send a WhatsApp message* (Sandbox).
2. Each customer/owner phone must first send the sandbox "join <word>" message to the sandbox number (production needs an approved WhatsApp sender).
3. Put `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` and `OWNER_WHATSAPP` in `server/.env`.
4. Sandbox settings → "When a message comes in": `https://<your-api>.vercel.app/api/whatsapp/webhook` (POST).

What is automated:
- Booking form → saved in MongoDB → WhatsApp **alert to the owner** + **confirmation to the customer**.
- Anyone who WhatsApps your Twilio number gets an **instant auto-reply** from the same chatbot (services, bridal, pricing, timings, booking).
- Production: set `TWILIO_VALIDATE_WEBHOOK=true` and `PUBLIC_SERVER_URL`.

## 4. Deploy on Vercel
**API** – Import the `server` folder as a new Vercel project (it contains `vercel.json`). Add all variables from `server/.env.example`. Set `CLIENT_URL` to your front-end URL.

**Website** – Import the `client` folder as another project (Framework: Vite). Add env vars:
`VITE_API_URL` (API URL, no trailing slash), `VITE_WHATSAPP_NUMBER`, `VITE_PHONE`, `VITE_PHONE_DISPLAY`, optional `VITE_MAP_EMBED_URL`.

## 5. Customise
- Texts, services, FAQs, testimonials: `client/src/data.js`
- Phone, email, address, hours: `client/src/config.js` (+ `server/.env`)
- Chatbot answers: `server/utils/chatbot.js`
- View bookings: `GET /api/bookings` with header `x-admin-key: <ADMIN_KEY>`

## Notes
- Gallery / hero / bridal photos are random related stock photos from loremflickr.com (keyword-based). Replace them with Rohini's real client photos: put files in `client/public/images/` and pass `src` in `SmartImg`, or swap the URL in `SmartImg.jsx`. If an image fails to load, the gold gradient shows instead.
- The About page section intentionally has no photos.
