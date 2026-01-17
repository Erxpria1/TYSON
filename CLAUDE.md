# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**TY-HAIR-DESIGN** is a React Native Expo mobile app for a barber shop appointment system. The app serves two user types:

- **Customers**: Book appointments, view appointment history
- **Barbers (Admin)**: Manage all appointments, view customer list

Anonymous users can also book via WhatsApp (the barber manually enters these appointments).

---

## Development Commands

```bash
# Start development server
npm start
# or: npx expo start

# Platform-specific (requires emulator/simulator)
npm run ios      # iOS Simulator (Mac only)
npm run android  # Android Emulator
npm run web      # Web browser

# Install new dependency
npx expo install <package>
```

Press `i`, `a`, or `w` in the Expo CLI to launch iOS, Android, or web respectively.

---

## Architecture

### Routing Structure (Expo Router)

The app uses Expo Router with file-based routing. Route groups `(auth)`, `(customer)`, and `(barber)` separate user flows:

```
app/
├── index.tsx              # Welcome/onboarding screen
├── _layout.tsx            # Root Stack Navigator (headerShown: false)
├── (auth)/
│   ├── _layout.tsx        # Auth Stack Navigator
│   ├── login.tsx          # Customer login
│   ├── register.tsx       # Customer registration
│   └── barber-login.tsx   # Barber admin login
├── (customer)/            # Customer Tab Navigator
│   ├── _layout.tsx
│   ├── dashboard.tsx
│   ├── appointments.tsx
│   ├── new-appointment.tsx
│   ├── services.tsx
│   ├── profile.tsx
│   └── whatsapp.tsx
└── (barber)/              # Barber Admin Tab Navigator
    ├── _layout.tsx
    ├── dashboard.tsx
    ├── appointments.tsx
    └── customers.tsx
```

### Firebase Integration

Firebase is configured in `lib/firebase.ts` using a singleton pattern. All Firebase exports (auth, db, messaging) should be imported from this file.

**Required environment variables:**
- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`

### Data Models

Core types are defined in `types/index.ts`:

- **Appointment**: Customer bookings with status (`pending | confirmed | cancelled | completed`)
- **User**: App users with role (`customer | barber`)
- **Service**: Haircut services with price and duration
- **BarberSettings**: Working hours, break times, appointment duration

### Design System

Colors are defined in `constants/colors.ts`:
- Primary: `#1a1a1a` (dark)
- Secondary: `#c9a962` (gold accent)
- Background: White/off-white

Services and haircuts are defined in `constants/services.ts`.

### Expo Configuration

Key settings in `app.json`:
- `newArchEnabled: true` - New React Native architecture
- `typedRoutes: true` - TypeScript route typing enabled
- Deep link scheme: `tyhairdesign://`

---

## Language Note

The README.md and some comments are in Turkish. User communications should match their language preference.
