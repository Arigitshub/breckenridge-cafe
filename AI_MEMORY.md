# Breckenridge Green Café — Development Memory & Project State

This document serves as a persistent record of the project requirements, architecture, custom design decisions, and active state to preserve context across development sessions.

---

## 🌿 Core Philosophy & Scope
* **Niche Focus**: Artisanal Brooklyn-roasted coffee, premium espresso, and high-end hemp-derived cannabinoids (joints, CBG, CBN, CBD infusions, edibles, vape carts, and top-shelf flower).
* **Strict Constraint**: **No food, crêpes, or eats**. The menu and branding are strictly dedicated to coffee, beverages, and cannabinoids.
* **Design Aesthetic**: High-end dark mode. Dark emerald green (`#040605`) backgrounds, gold/brass accents, glassmorphic panels, glowing neon-green borders, Outfit & Playfair Display typography, and smooth micro-interactions.

---

## 🎨 Premium Visual Elements & Micro-Reactions
The site incorporates advanced custom animations and responsive details to maximize wow factor:
1. **Preloader Reveal**: A sliding curtain reveal animation that moves the preloader panel upwards (`translateY(-100%)`) with an elegant cubic-bezier transition, scaling out the logo container.
2. **Ken Burns Hero**: The landing section background image slowly zooms out on page load (`transform: scale(1.1)` to `1.0` over 12 seconds) for a cinematic, parallax-like entrance.
3. **Ambient Background Glows**: Two large, blurry radial-gradient light fields (emerald green and gold) slowly drift in opposite directions behind the content sections to add spatial depth.
4. **Card Shimmer Sweep**: Any `.glass-card` elements sweep a subtle light-reflection glare overlay on mouse hover.
5. **3D Parallax Card Tilt**: Shop cards and featured items rotate dynamically in 3D space relative to the cursor coordinates on hover (max 8-degree tilt limit).
6. **Active State Pulse**: Active tab selection cards and infusion cards breathe with an animated neon-green border-pulse transition.
7. **Pouring Stream Animation**: Clicking a beverage option in the Infusion Lab triggers a colored pouring-liquid stream animation that flows down from above the cup, accompanied by a physical cup-shaking and glow reaction.
8. **Interactive Scientific Tooltips**: Hovering over CBD, CBG, or CBN labels reveals a blur-backed, glowing tooltip box describing their biological benefits.
9. **Cart Badge Wiggle & +1 float**: Adding products triggers a bounce/wiggle wiggle on the cart icon and spawns a floating green `+1` badge that floats up and fades away.

---

## 🛠️ Technical Architecture & Integrations

### 1. Backend Serverless Routes (`/api`)
Hosted on Vercel as serverless Node.js endpoints using the `pg` client to query the Neon database:
* **`POST /api/save-blend`**: Inserts a user's custom lab blend (`drink`, `infusion`) linked to their email into `public.user_blends`.
* **`GET /api/get-blends`**: Returns saved creations associated with a specific email.
* **Neon Auth endpoints**: Handles standard user sign-up, sign-in, and sign-out mapping.

### 2. Database Schema
Custom user creations are saved to the `public.user_blends` table:
```sql
CREATE TABLE public.user_blends (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    drink VARCHAR(100) NOT NULL,
    infusion VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Cross-Domain Environment Routing
* Static mirrors (like Surge or GitHub Pages) automatically route all database and auth operations to the Vercel API backend by checking `window.location.hostname`.
* CORS configurations map static domains back to the Vercel endpoint.

---

## 📡 Live Deployments & URLs
* **Vercel (Full-Stack / API / Web)**: [breckenridge-cafe.vercel.app](https://breckenridge-cafe.vercel.app/)
* **Surge (Static Frontend Mirror)**: [breckenridge-cafe-brooklyn.surge.sh](https://breckenridge-cafe-brooklyn.surge.sh/)
* **GitHub Repository**: [github.com/Arigitshub/breckenridge-cafe](https://github.com/Arigitshub/breckenridge-cafe)

---

## 📋 Active Configuration State
* **Contact Phone**: `+1 (516) 244-4856` (Displayed as phone only, no email address listed yet).
* **Menu Products (7 Items)**:
  1. Full-Spectrum CBD Oil
  2. CBG Cognitive Capsules
  3. CBN Deep Sleep Tincture (Custom blue/purple bottle mockup)
  4. Delta-9 THC Gummies (Edibles)
  5. Live Resin THC Vape Pen
  6. Gold-Leaf Pre-Roll Joints
  7. Top-Shelf Hemp Flower (Custom green jar mockup)
* **Pre-Infused Specialty Drinks**:
  - CBG Focus Nitro Cold Brew ($7.50)
  - CBD Active Recovery Latte ($8.00)
  - CBN Dreamtime Rosewater Tea ($7.00)
