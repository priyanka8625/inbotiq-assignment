# Role-Based Authentication Application

A full-stack web application featuring secure role-based authentication with Next.js, TypeScript, and modern UI components.

## Features

- **User Authentication**: Secure signup and login with JWT token-based authentication
- **Role-Based Access Control**: Support for User and Admin roles with different permissions
- **Protected Routes**: Dashboard accessible only when logged in
- **Modern UI**: Built with Shadcn UI and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type Safety**: Full TypeScript implementation

## Tech Stack

### Frontend
- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: React Context API



## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Backend API server running (see API Endpoints section)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables

Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Replace `http://localhost:5000` with your backend API URL.

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Protected dashboard page
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── signup/
│   │   └── page.tsx          # Signup page with role selection
│   ├── layout.tsx            # Root layout with AuthProvider
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # Shadcn UI components
│   └── ProtectedRoute.tsx    # Route protection component
├── contexts/
│   └── AuthContext.tsx       # Authentication context provider
├── lib/
│   ├── auth.ts               # Authentication service and utilities
│   └── utils.ts              # Utility functions
└── .env.example              # Example environment variables
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Usage

### Sign Up
1. Navigate to `/signup`
2. Fill in your name, email, and password
3. Select your role (User or Admin)
4. Click "Sign Up"
5. You'll be redirected to the dashboard

### Login
1. Navigate to `/login`
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to the dashboard

### Dashboard
- View your profile information
- See your role and permissions
- Admin users see additional admin-specific features
- Logout button in the navigation


## Security Features

- JWT token-based authentication
- Protected routes with automatic redirect
- Secure password handling (backend)
- Token stored in localStorage
- Authorization header for API requests
- Role-based access control

