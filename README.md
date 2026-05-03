# VoyageVert - Travel Agency Web Application

A complete, production-ready travel agency web application built with React, TypeScript, Tailwind CSS, and React Router.

## 🎯 Features

### User Interface
- ✅ Home Page with hero section, search, popular trips, testimonials
- ✅ Trips Listing with filters (city, price range, search)
- ✅ Trip Details with full information and reviews
- ✅ Booking System with form validation and price calculation
- ✅ User Dashboard (view bookings, manage profile, cancel bookings)
- ✅ Authentication (Login/Register with role-based access)

### Admin Dashboard
- ✅ Dashboard with KPIs (bookings, users, revenue, active trips)
- ✅ Manage Trips (CRUD operations)
- ✅ Manage Users (view, delete)
- ✅ Manage Bookings (update status)
- ✅ Manage Reviews (view, delete)
- ✅ Manage Payments (verify, track)

### Authentication
- Role-based access control (Admin/User)
- Protected routes
- Persistent login with localStorage

## 🎨 Design System

**Colors:**
- Primary: `#103713` (Phthalo Green)
- Secondary: `#628B35` (Maximum Green)
- Background: `#E2DBD0` (Bone)
- Accent: Milk tones

**Typography:**
- Font: Inter (Google Fonts)
- Modern, clean hierarchy

**UI Style:**
- Rounded corners (`rounded-xl`)
- Subtle shadows
- Smooth transitions
- Fully responsive

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main app with routing
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation with auth
│   │   ├── Footer.tsx          # Footer component
│   │   ├── SearchBar.tsx       # Search functionality
│   │   ├── TripCard.tsx        # Reusable trip card
│   │   ├── TestimonialCard.tsx # Review card
│   │   ├── ProtectedRoute.tsx  # Route protection
│   │   └── ui/                 # Shadcn UI components
│   ├── pages/
│   │   ├── Home.tsx            # Landing page
│   │   ├── Trips.tsx           # Trip listing with filters
│   │   ├── TripDetails.tsx     # Single trip page
│   │   ├── Booking.tsx         # Booking form
│   │   ├── Login.tsx           # Login page
│   │   ├── Register.tsx        # Registration page
│   │   ├── DashboardUser.tsx   # User dashboard
│   │   └── DashboardAdmin.tsx  # Admin dashboard
│   ├── context/
│   │   └── AuthContext.tsx     # Authentication context
│   └── data/
│       ├── trips.ts            # Trip data
│       ├── users.ts            # User data
│       ├── bookings.ts         # Booking data
│       └── reviews.ts          # Review data
└── styles/
    ├── theme.css               # Design tokens
    └── fonts.css               # Font imports
```

## 🚀 Getting Started

The application is already set up and running! No installation needed.

### Demo Accounts

**Admin Account:**
- Email: `admin@voyagevert.com`
- Password: `admin123`
- Access: Full admin dashboard with CRUD operations

**User Account:**
- Email: `user@example.com`
- Password: `user123`
- Access: User dashboard with bookings

## 🧭 Navigation Flow

```
Home (/) 
  → Trips (/trips)
    → Trip Details (/trip/:id)
      → Booking (/booking/:id) [Protected]
  
Login (/login)
  → Admin Dashboard (/dashboard/admin) [Admin Only]
  → User Dashboard (/dashboard/user) [User Only]

Register (/register)
  → User Dashboard (/dashboard/user)
```

## 🔐 Authentication

- **Context-based** authentication with React Context API
- **Role-based routing** (admin/user)
- **Protected routes** that redirect to login
- **Persistent sessions** using localStorage

## 📊 Data Structure

All data is stored in TypeScript files ready for backend integration:

- **Trips**: 6 Moroccan destinations
- **Users**: 3 demo accounts (1 admin, 2 users)
- **Bookings**: 3 sample bookings
- **Reviews**: 3 customer testimonials

## 🎨 UI Components

Built with **shadcn/ui** and customized with the green theme:
- Buttons, Inputs, Labels
- Cards, Badges
- Sliders, Selects
- Tables

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Adaptive layouts for all screen sizes

## 🔄 State Management

- **Authentication**: React Context
- **Form State**: React useState
- **Routing**: React Router v7

## 🎯 Key Features Explained

### User Flow
1. Browse trips on home page
2. View all trips with filters
3. Click trip to see details
4. Book trip (requires login)
5. Manage bookings in dashboard

### Admin Flow
1. Login as admin
2. Access admin dashboard
3. View statistics
4. Manage trips (add/edit/delete)
5. Manage users and bookings
6. Monitor payments and reviews

## 🛠️ Backend Integration Ready

The frontend is structured to easily connect to a MERN backend:

- All data models are TypeScript interfaces
- API integration points are clearly marked
- Authentication ready for JWT tokens
- Form submissions prepared for API calls

## 📝 Notes

- No backend required - fully functional frontend
- All CRUD operations show alerts (ready for API integration)
- Data persists in memory during session
- Auth state persists in localStorage

## 🎓 Technologies Used

- **React 18** with TypeScript
- **React Router v7** for routing
- **Tailwind CSS v4** for styling
- **shadcn/ui** for components
- **Lucide React** for icons
- **Vite** for build tooling

---

**Built with ❤️ for VoyageVert Travel Agency**
