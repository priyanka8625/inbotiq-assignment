# Full-Stack Authentication Backend

A production-ready Node.js + Express backend with JWT authentication, role-based access control, and PostgreSQL database integration using Prisma.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL database (or Supabase/Neon free tier)

### Local Development Setup

1. **Clone and Install**
```bash
npm install
```

2. **Set up Environment Variables**
```bash
cp .env.example .env
```

Update `.env` with your database URL and JWT secret:
```
DATABASE_URL="postgresql://user:password@localhost:5432/authdb"
JWT_SECRET="your-secret-key-min-32-chars-for-production"
FRONTEND_URL="http://localhost:3000"
PORT=5000
```

3. **Setup Database**
```bash
# Run Prisma migrations
npm run migrate

# (Optional) View database in Prisma Studio
npm run studio
```

4. **Start Development Server**
```bash
npm run dev
```

Server runs at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── server.js                 # Main Express app
├── package.json
├── .env.example
├── .gitignore
├── routes/
│   └── auth.js              # Authentication endpoints
├── middleware/
│   └── auth.js              # JWT verification & role guards
├── utils/
│   └── validation.js        # Input validation
└── prisma/
    └── schema.prisma        # Database schema
```

## 🔌 API Endpoints

### POST `/api/auth/signup`
Register a new user with role selection
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

### POST `/api/auth/login`
Login with email and password
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

### GET `/api/auth/me`
Get current user (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

### GET `/api/health`
Health check endpoint
```json
{
  "status": "Backend is running"
}
```

## 🗄️ Database Setup

### Option 1: PostgreSQL (Local)
```bash
brew install postgresql  # macOS
# Windows/Linux: Download from postgresql.org

createdb authdb
psql authdb < schema.sql
```

### Option 2: Supabase (Recommended for Deployment)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the connection string
4. Paste it in `.env` as `DATABASE_URL`

### Option 3: Neon
1. Go to [neon.tech](https://neon.tech)
2. Create a new database
3. Copy the connection string
4. Paste it in `.env` as `DATABASE_URL`

## 🚀 Deployment Guide

### Deploy to Render

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial backend setup"
git push origin main
```

2. **Create Render Account**
- Go to [render.com](https://render.com)
- Sign up with GitHub

3. **Create New Web Service**
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Select the backend directory (if monorepo)
- Fill in settings:
  - **Name:** `fullstack-auth-backend`
  - **Environment:** Node
  - **Build Command:** `npm install`
  - **Start Command:** `npm start`
  - **Plan:** Free

4. **Add Environment Variables**
- Go to "Environment" tab
- Add each variable from `.env`:
  ```
  DATABASE_URL=<your-supabase-url>
  JWT_SECRET=<generate-strong-secret>
  NODE_ENV=production
  FRONTEND_URL=<your-frontend-url>
  ```

5. **Enable Auto-Deploy**
- Render will automatically deploy on git push

**Your Backend URL:** `https://fullstack-auth-backend.onrender.com`

### Deploy to Railway

1. **Push to GitHub** (same as above)

2. **Create Railway Account**
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

3. **Create New Project**
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your repository

4. **Configure**
- Railway auto-detects Node.js
- Add environment variables via dashboard
- Set start command in `package.json` (already done)

5. **Get URL**
- Railway generates a public URL automatically

### Deploy to Vercel Serverless

1. **Create `api/auth.js`** (wrapper for serverless)
```javascript
import server from '../server.js';

export default server;
```

2. **Update `vercel.json`**
```json
{
  "buildCommand": "npm install && npx prisma migrate deploy",
  "functions": {
    "api/**/*.js": {
      "memory": 1024,
      "maxDuration": 60
    }
  }
}
```

3. **Deploy**
```bash
npm install -g vercel
vercel
```

## 🔒 Security Best Practices

- ✅ Passwords hashed with bcryptjs (10 salt rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ CORS configured for specific origins
- ✅ Environment variables for secrets
- ✅ Input validation on all endpoints

**For Production:**
- Generate a strong JWT_SECRET (minimum 32 characters)
- Use HTTPS only
- Set `NODE_ENV=production`
- Use managed database (Supabase/Neon)
- Enable CSRF protection if needed

## 📦 Dependencies

- **express** - Web framework
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **@prisma/client** - Database ORM
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **nodemon** - Development auto-reload

## 🧪 Testing the API

### Using cURL

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456","role":"USER"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'

# Get Current User (replace TOKEN with actual JWT)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman
1. Create a new collection
2. Add requests for each endpoint
3. Use the `token` from signup/login response in Authorization header
4. Set Authorization type to "Bearer Token"

## 🤝 Frontend Integration

The frontend should:
1. Send JWT token in `Authorization: Bearer <token>` header
2. Store token in localStorage or secure cookie
3. Call `/api/auth/me` on app load to verify authentication
4. Redirect to login if token is invalid/expired

Example fetch call:
```javascript
const response = await fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 📝 Environment Variables Reference

| Variable | Example | Description |
|----------|---------|-------------|
| DATABASE_URL | postgresql://... | PostgreSQL connection string |
| JWT_SECRET | your-secret-key | Secret key for signing JWTs |
| NODE_ENV | production | development or production |
| PORT | 5000 | Server port |
| FRONTEND_URL | http://localhost:3000 | Frontend origin for CORS |

## 🐛 Troubleshooting

**Error: `DATABASE_URL not found`**
- Create `.env` file and add DATABASE_URL

**Error: `listen EADDRINUSE: address already in use :::5000`**
- Change PORT in `.env` or kill process using port 5000

**Error: `Prisma client not generated`**
```bash
npx prisma generate
```

**Error: `CORS error from frontend`**
- Update `FRONTEND_URL` in backend `.env`
- Redeploy backend

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Authentication Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

## 📄 License

MIT

---

**Need Help?**
- Check server logs: `npm run dev`
- Review `.env.example` for required variables
- Ensure database is running and accessible