# Full-Stack Authentication Application

A complete full-stack web application with role-based authentication, featuring a Next.js frontend and Node.js/Express backend with PostgreSQL database.

## 📋 Deliverables

- ✅ **GitHub Repository** with clear documentation
- ✅ **Working Frontend URL**: https://inbotiqfrontend.vercel.app/
- ✅ **Working Backend URL**: https://inbotiq-assignment-backend-qiyi.onrender.com

---

## 🎯 Project Overview

This application implements a complete authentication system with:
- User registration with role selection (User or Admin)
- Secure JWT-based login
- Role-based access control
- Protected dashboard pages
- Production-ready deployment

---

## 🏗️ Project Structure

```
repository/
├── backend/                 # Express.js backend
│   ├── server.js           # Main server file
│   ├── routes/
│   │   └── auth.js         # Authentication endpoints
│   ├── middleware/
│   │   └── auth.js         # JWT verification & role guards
│   ├── utils/
│   │   └── validation.js   # Input validation
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── package.json
│   ├── .env.example
│   └── README.md           # Backend documentation
│
├── frontend/               # Next.js frontend
│   ├── app/
│   │   ├── page.tsx                    # Home page
│   │   ├── signup/page.tsx             # Signup page
│   │   ├── login/page.tsx              # Login page
│   │   └── dashboard/page.tsx          # Protected dashboard
│   ├── contexts/
│   │   └── AuthContext.tsx             # Auth state management
│   ├── lib/
│   │   └── auth.ts                     # Auth API client
│   ├── components/
│   ├── package.json
│   ├── .env.example
│   └── README.md           # Frontend documentation
│
└── README.md               # This file
```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user info | Yes |

### Request/Response Examples

**Signup**
```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}

Response:
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

**Login**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": { ... }
}
```

**Get Current User**
```
GET /api/auth/me
Headers: Authorization: Bearer <token>

Response:
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

---

## 🚀 Deployment URLs

| Component | URL | Platform |
|-----------|-----|----------|
| **Frontend** | https://inbotiqfrontend.vercel.app/ | Vercel |
| **Backend** | https://inbotiq-assignment-backend-qiyi.onrender.com | Render |

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: JWT
- **Password Hashing**: bcryptjs

### Frontend
- **Framework**: Next.js
- **Language**: TypeScript
- **UI Library**: Shadcn/ui + Tailwind CSS
- **Deployment**: Vercel

---

## 📝 Core Features

### ✅ Authentication
- User registration with email and password
- Role selection during signup (User or Admin)
- Secure password hashing with bcryptjs
- JWT-based authentication with 7-day expiration
- Protected routes requiring authentication

### ✅ Dashboard
- Welcome message displaying user name and role
- Protected route accessible only when logged in
- Role-specific content display
- Logout functionality

### ✅ Validation
- Email format validation
- Password minimum 6 characters
- Name minimum 2 characters
- Role must be USER or ADMIN

### ✅ Security
- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens for stateless authentication
- CORS configured for frontend domain
- Environment variables for sensitive data
- Input validation on all endpoints

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Git

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Configure .env with:
# - DATABASE_URL (from Neon/Supabase)
# - JWT_SECRET (random string)
# - FRONTEND_URL (http://localhost:3000 for dev)

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Configure .env.local with:
# - NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`


---

## 📦 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key-min-32-chars
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://inbotiqfrontend.vercel.app
```

### Frontend (.env)
```
NEXT_PUBLIC_BACKEND_URL=https://inbotiq-assignment-backend-qiyi.onrender.com
```

---

## 📊 Database Schema

### User Model
```prisma
model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  name      String
  password  String
  role      String  @default("USER")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🔐 Security Features

- ✅ Bcryptjs password hashing (10 rounds)
- ✅ JWT with expiration (7 days)
- ✅ CORS protection
- ✅ Environment variables for secrets
- ✅ Input validation and sanitization
- ✅ Protected API endpoints
- ✅ Secure token storage in localStorage


---

**Project Status**: ✅ Complete and Deployed
