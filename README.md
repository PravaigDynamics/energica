# Energica Owner's Portal

A complete, production-ready single-page React application for Energica motorcycle owners.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Demo Login
- **Admin Access**: email: `admin@energica.com` / password: `admin`
- **Guest Access**: Click "Continue as Guest"

## 🎯 Features

### ✅ Authentication System
- Email/Password login
- Google OAuth
- Facebook OAuth
- Anonymous guest login
- Persistent login state
- Admin access (admin@energica.com)

### ✅ Dashboard
- Interactive 3D motorcycle viewer (drag to rotate)
- Active bike details display
- My Garage section with bike cards
- Add/Delete bikes
- Quick status cards
- Trophy cabinet with badges

### ✅ Garage Management
- Add new bikes with full details
- Delete bikes with confirmation
- Switch between bikes
- Real-time Firebase sync
- Model options: EGO+ RS, Eva Ribelle, EsseEsse9

### ✅ Shop (Bottega)
- Filter by category: ALL, CORSA, STRADA, STILE
- Product cards with icons, prices, descriptions
- "Add to Cart" functionality
- Responsive grid layout

### ✅ Service Page
- Warranty status display
- Resource buttons (Manuals, Parts, Telemetry, DIY Guides)
- WhatsApp live support integration

### ✅ Patron Program
- Current tier display (GOLD)
- Progress tracking (3/5 referrals)
- Unique referral code: ENER-8892
- Share link button
- Tier benefits list

### ✅ News Feed
- Latest news articles
- Source badges (Instagram, Press Release, Community)
- Featured images
- Timestamps
- Social media links

### ✅ Admin God Mode
- Total owners statistics
- Fleet uptime metrics
- User registry table
- Role and status badges
- Purple themed interface

### ✅ Responsive Design
- Mobile-first approach
- Desktop sidebar navigation
- Mobile bottom navigation with elevated home button
- Hamburger menu for mobile
- Breakpoints: 768px (tablet), 1024px (desktop)

## 🎨 Design System

### Colors
- Background: `#000000` (black)
- Surface: `#18181b` (zinc-950)
- Border: `#27272a` (zinc-800)
- Primary: `#84cc16` (lime-500)
- Text: `#e4e4e7` (zinc-200)
- Admin: `#9333ea` (purple-500)

### Components
- All components are inline in App.jsx
- Three.js 3D viewer with drag-to-rotate
- Custom EnergicaLogo SVG
- Custom GoogleIcon SVG
- Lucide React icons throughout

## 🔥 Firebase Setup (Optional)

The app works in demo mode without Firebase. To enable real database functionality:

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password, Google, Facebook)
3. Create a Firestore database
4. Replace the demo config in App.jsx:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Firestore Structure
```
artifacts/
└── energica-portal/
    └── users/
        └── {userId}/
            └── garage/
                └── {bikeId}
                    ├── model: string
                    ├── vin: string
                    ├── year: number
                    ├── color: string
                    ├── kms: string
                    ├── trim: string
                    └── createdAt: timestamp
```

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 🛠️ Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** (CDN) - Styling
- **Three.js** (CDN) - 3D graphics
- **Firebase** (CDN) - Backend & Auth
- **Lucide React** - Icons

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## 🎮 User Guide

### Adding a Bike
1. Click the "+" button in the garage section
2. Fill in bike details (Model, VIN, Year, Color, Kilometers, Trim)
3. Click "Add Bike"

### Switching Bikes
- Click on any bike card in the "My Garage" section
- The active bike will be highlighted with lime border

### Deleting a Bike
- Click the trash icon on a bike card
- Confirm the deletion

### Navigating
- **Desktop**: Use the left sidebar
- **Mobile**: Use bottom navigation (home button is elevated in center)
- **Mobile Menu**: Tap hamburger icon (top-left) for account settings

### Admin Access
- Login with `admin@energica.com` / `admin`
- Access "God Mode" from navigation
- View user statistics and registry

## 📄 License

Proprietary - Energica Motor Company

## 🤝 Support

For issues or questions, contact support@energica.com
