# Breckenridge Green Café

A premium, state-of-the-art web application and brand showcase for **Breckenridge Green Café** (BG Cafe), Williamsburg's premier cannabis-infused wellness cafe at 319 Wythe Ave, Brooklyn, NY.

Developed as a modern, single-page application (SPA) with a serverless Node.js backend linked to a **Neon serverless Postgres database** and **Neon Auth**.

---

## 🚀 Live Deployments

* **Vercel (Full-Stack - Live):** [breckenridge-cafe.vercel.app](https://breckenridge-cafe.vercel.app/) *(Exposes both frontend UI and Node.js database API routes)*
* **Surge (Static - Live):** [breckenridge-cafe-brooklyn.surge.sh](http://breckenridge-cafe-brooklyn.surge.sh)
* **GitHub Pages (Static - Live):** [arigitshub.github.io/breckenridge-cafe/](https://arigitshub.github.io/breckenridge-cafe/)

---

## 💎 Features

* **High-End Dark-Emerald Aesthetic:** Custom typography (Outfit & Playfair Display), rich neon gradients, glassmorphism, scroll indicators, and floating CSS-animated micro-bubble elements.
* **Interactive Infusion Lab:** A client-side drink form visualizer. Select base beverages (Espresso, Matcha, Chamomile) and add active cannabinoids (CBD, CBG). Watch the simulated cup's liquid color shift and release bubbles relative to the dosage.
* **Postgres Database Save:** Logged-in users can write their customized blends directly to the database.
* **Neon Auth Registration:** Secure email/password login and sign-up integration powered by Neon Auth (Better Auth under the hood).
* **Cross-Device Performance:** Safe-area padding boundaries for physical notches, 48px minimal touch target guidelines, and Leaflet map touch dragging fallbacks to protect mobile scroll hijacking.
* **Leaflet Dark Map:** Customized open-source map using CartoDB Dark Matter tiles, styled with dark-mode invert filters.

---

## 🛠️ Full-Stack Architecture

### 1. Database Schema
Authentication tables exist in the `neon_auth` schema. Custom user creations are saved to the `public.user_blends` table:

```sql
CREATE TABLE public.user_blends (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    drink VARCHAR(100) NOT NULL,
    infusion VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Backend API (Serverless Routes)
* **`POST /api/save-blend`:** Authenticates the user and inserts their selected `drink` and `infusion` into `public.user_blends`.
* **`GET /api/get-blends`:** Retrieves all saved creations associated with a specific user email.

### 3. Frontend Authentication
The login forms hook into Neon Auth's REST API endpoints:
* **Sign Up:** `POST https://ep-rapid-haze-aqjqgb95.neonauth.us-east-1.aws.neon.tech/neondb/auth/sign-up/email`
* **Sign In:** `POST https://ep-rapid-haze-aqjqgb95.neonauth.us-east-1.aws.neon.tech/neondb/auth/sign-in/email`
* **Sign Out:** `POST https://ep-rapid-haze-aqjqgb95.neonauth.us-east-1.aws.neon.tech/neondb/auth/sign-out`

---

## 💻 Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Arigitshub/breckenridge-cafe.git
   cd breckenridge-cafe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the local static server:
   ```bash
   npm start
   ```
4. Access the site in your browser at `http://localhost:5000`.
