# NoteNest Auth Starter

Minimal full-stack authentication starter with:
- React + Vite
- Express (ES Modules)
- MongoDB
- JWT (HTTP-only cookie)
- OTP via Brevo SMTP
- Dashboard protected route

## Setup

### Backend
```bash
cd backend
npm install
```

Create `.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587
MAIL_USER=your_brevo_smtp_user
MAIL_PASS=your_brevo_smtp_key
MAIL_FROM=Your App <your@email.com>
```

```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install
```

Create `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```
