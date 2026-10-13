# NagrikOne — Deep Codebase Analysis & Implementation Plan

## Current Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router, `use client` pages)
- **Database**: PostgreSQL via Prisma ORM (v6.19.3)
- **Styling**: Tailwind CSS v3 + custom CSS in `globals.css`
- **Fonts**: Plus Jakarta Sans + JetBrains Mono (Google Fonts)
- **Icons**: Lucide React
- **Validation**: Zod
- **Auth**: Custom session system (PBKDF2 passwords, HMAC token hashing)
- **3D**: Custom CSS/SVG-based components (`NovaHeroCore`, `ServiceCards3D`)
- **No Three.js / no Framer Motion** — animations are CSS-only

### Current Authentication System
**Working**: Password-based register/login is FULLY implemented:
- `lib/auth/passwordAuth.ts` — PBKDF2 hashing, `registerCitizen()`, `loginCitizen()`
- `lib/auth/session.ts` — HMAC token, 14-day session cookies
- `app/api/auth/register/route.ts` — POST endpoint
- `app/api/auth/login/route.ts` — POST endpoint
- `app/api/auth/session/route.ts` — GET (check session) + DELETE (logout)

**OTP system**: Exists in `lib/auth/otp.ts` + `app/api/auth/otp/route.ts` — fully working backend, but UI has it exposed as "SMS OTP" tab.

### Current Issues to Fix
1. **AuthModal** (components/AuthModal.tsx): Has 3 tabs — Sign In, Create Account, **SMS OTP** (must remove SMS OTP tab from UI)
2. **Login Page** (app/login/page.tsx): Same 3-tab structure with SMS OTP tab visible
3. **Sign Up missing**: Confirm password, Terms checkbox, show/hide password toggle
4. **Sign In missing**: Show/hide password toggle, proper Forgot Password placeholder
5. **Both pages**: Need premium visual redesign with 3D animated elements

### Database Schema (Key Models)
- `User`: id, name, email (unique), phone (unique), role, isActive, passwordHash field NOT in DB schema (stored in memory/session only — critical!)
- `Session`: tokenHash, userId, expiresAt
- `OtpVerification`: preserved for future use

> **CRITICAL**: The `passwordHash` field is NOT in the Prisma User model! It's only in the in-memory fallback store. This means password auth only works until server restarts. Need to add `passwordHash String?` to User model.

## Files to Change

### 1. Prisma Schema — Add passwordHash to User
`prisma/schema.prisma` → Add `passwordHash String?` to User model

### 2. Password Auth — Save hash to DB
`lib/auth/passwordAuth.ts` → Save passwordHash in DB during register, read from DB during login

### 3. AuthModal — Remove OTP tab, Add premium UI
`components/AuthModal.tsx` → Full premium redesign, remove OTP tab

### 4. Login Page — Premium redesign
`app/login/page.tsx` → Full premium redesign matching AuthModal

### 5. Global CSS — Add new animation utilities
`app/globals.css` → Add 3D animation keyframes, glass effects, orb animations

### 6. Navbar — Minor polish
`components/Navbar.tsx` → Sign Up button → link to `/login?tab=signup`

## Visual Design System

### Color Palette
- Background: `#030712` (deep midnight navy)  
- Card surfaces: `from-[#081322] to-[#040914]`
- Accent: `#06b6d4` (cyan), `#3b82f6` (blue), `#a855f7` (violet hints)
- Text: `#f8fafc` primary, `#94a3b8` muted

### New Auth Page Layout: Two-Column Split
- **Left**: Animated 3D visual — floating orbs, civic network illustration, NagrikOne branding
- **Right**: Glassmorphism auth card with form

### 3D Animations (CSS-only, no heavy libs)
- Slow-rotating gradient orbs using `@keyframes`
- Floating civic network nodes (SVG + CSS)
- Parallax tilt on auth card (CSS perspective)
- Smooth tab transitions with `transition-all`
- Field focus animations (border glow)
- Button press feedback (scale transform)

## Implementation Order
1. Fix Prisma schema (add passwordHash)
2. Update passwordAuth.ts to persist hash
3. Rewrite AuthModal (remove OTP tab, premium UI)
4. Rewrite login page (premium two-column layout)
5. Enhance globals.css (3D animation utilities)
6. Run db:push to apply schema changes
7. Install deps if needed
8. Build/lint check
