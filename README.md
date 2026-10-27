# ReWear — Give Your Clothes a Second Life

> An editorial, full-stack digital clothing upcycling, repair, and bespoke redesign platform built with Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, and Supabase PostgreSQL.

---

## 1. Project Overview

**ReWear** is a digital platform dedicated to circular fashion, wardrobe longevity, and bespoke garment transformation. Fast-fashion culture has conditioned consumers to treat clothing as disposable goods; ReWear provides an accessible, premium alternative by connecting individuals with master artisans who repair, alter, redesign, and upcycle pre-loved garments.

### Key Value Propositions
- **Bespoke Garment Transformations:** Explore an archive of real-world before-and-after projects (e.g. blown-out 90s Levi’s turned into structured tote bags, oversized poplin shirts recut into modern wrap blouses, distressed workwear repaired with Sashiko needlework).
- **Interactive Garment Life Finder:** A diagnostic recommendation engine that evaluates garment type, current fabric condition, desired aesthetic outcome, and budget to prescribe the optimal atelier service.
- **Transparent Service Catalog:** Indicative pricing, estimated turnaround times, and craft highlights across 6 core specialties (Repair & Mending, Fit Alterations, Creative Redesign, Denim Restoration, Embroidery & Patchwork, Upcycled Accessories).
- **Persistent Enquiry System:** A validated end-to-end booking flow where clients submit garment details, photos, and preferences, generating a unique tracking reference (`RW-2026-XXXX`) persisted to Supabase PostgreSQL.
- **Circular Fashion Manifesto:** Clear qualitative and sourced explanations (e.g. Ellen MacArthur Foundation Circular Fibres Initiative) comparing garment repair against virgin fast-fashion replacement.

---

## 2. Technology Stack & Architectural Decisions

| Layer | Technology | Rationale & Implementation |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Integrated full-stack architecture with Server Components for fast SEO prerendering and Client Components for dynamic interactions. |
| **Frontend UI** | React 19 & TypeScript | Strict type safety, clean component separation, robust prop interfaces across all sections. |
| **Styling & Theme** | Tailwind CSS v4 | Curated editorial fashion palette: Forest Green (`#173F35`), Warm Ivory (`#F8F5EF`), Muted Sage (`#B9C9B1`), Burnt Terracotta (`#C96F4A`), and Charcoal (`#252824`). |
| **Validation** | Zod | Unified client-side and server-side validation schema ensuring sanitized, trimmed, and bounded payload inputs. |
| **Database** | Supabase PostgreSQL | Relational database storage with Row-Level Security (RLS), custom indexes, and automatic timestamp triggers. |
| **Icons & Micro-Interactions** | Lucide React & Canvas-Confetti | Modern minimalist vector iconography and celebratory submission feedback. |
| **Deployment Target** | Vercel | Seamless edge deployment with zero-configuration serverless route handlers. |

---

## 3. Core Features & User Journeys

### A. Navigation & Sticky Header
- Persistent brand identity featuring a custom sewing needle, continuous thread loop, and terracotta knot emblem.
- Smooth navigation links with scroll spy indicators.
- Quick action CTA "Transform My Clothes" and "Check Enquiry Status" lookup tool.
- Fully accessible mobile drawer navigation for small viewports.

### B. Before-and-After Transformation Gallery
- Filterable showcase by category: **All**, **Repair**, **Alteration**, **Redesign**, and **Upcycling**.
- **Interactive Touch-Enabled Comparison Slider:** Users drag horizontally to inspect the garment before and after transformation.
- Detailed modal view with textile notes, circularity impact statements, and a "Request Similar Transformation" prefill trigger.

### C. "Find Your Garment's Next Life" Diagnostic Tool
- Four-step interactive configurator:
  1. Garment Type (Denim, Outerwear, Knitwear, Dresses, Shirts, Tops, Trousers)
  2. Current Condition (Minor tears, Broken zipper, Poor fit, Outdated silhouette, Heavy distress, Stained)
  3. Desired Outcome (Restore original, Modernize silhouette, Sashiko visible mending, Convert into accessory)
  4. Approximate Budget Comfort
- Generates live recommended atelier pathway, cost range, turnaround time, and specific justification.
- "Start This Transformation" button passes all diagnostic selections directly into the enquiry form.

### D. End-to-End Garment Enquiry System
- **Endpoint:** `POST /api/enquiries`
- **Fields:** Customer Name, Email, Phone (optional), Garment Type, Condition, Service Type, Budget, Preferred Timeframe, Description (10–1200 characters), Inspiration Image URL, Consent Checkbox.
- **Client & Server Validation:** Dual-layer Zod validation with field-level inline error announcements.
- **Anti-Duplicate Protection:** Disables submit button during active requests and debounces actions.
- **Persistence:** Direct insertion into Supabase PostgreSQL `public.enquiries` table (with resilient local storage fallback if database credentials are not yet configured).
- **Confirmation State:** Generates an authentic reference code (e.g., `RW-2026-YPRZ`), copy button, and summary breakdown.

### E. Real-Time Status Lookup
- **Endpoint:** `GET /api/enquiries?reference=RW-2026-XXXX`
- Allows clients to verify workflow status (`pending_review`, `in_review`, `quote_sent`, `completed`) by reference code. Pre-seeded demo codes `RW-2026-DEMO1` and `RW-2026-DEMO2` are available for immediate testing.

---

## 4. Local Installation & Development

### Prerequisites
- Node.js `v20.x` or later
- npm `10.x` or later

### Step 1: Clone and Install
```bash
git clone <your-repository-url>
cd topic7

# Install dependencies
npm install
```

### Step 2: Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
> **Note:** If you run the project without setting Supabase keys, ReWear will automatically operate in **Local Prototype Fallback Mode**, ensuring all form submissions, validations, reference generation, and status lookups work seamlessly during local testing.

### Step 3: Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Verify Production Build
```bash
npm run build
npm run start
```

---

## 5. Supabase Database Configuration & Migration

### Setting Up Supabase
1. Create a free project at [supabase.com](https://supabase.com).
2. Navigate to **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/20261026_create_enquiries.sql` from this repository.
4. Paste the SQL and execute it.

### Database Schema Highlights
```sql
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_code VARCHAR(32) NOT NULL UNIQUE,
  customer_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(40),
  garment_type VARCHAR(100) NOT NULL,
  garment_condition VARCHAR(120) NOT NULL,
  service_type VARCHAR(120) NOT NULL,
  budget_range VARCHAR(80) NOT NULL,
  preferred_timeframe VARCHAR(80) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  status VARCHAR(40) NOT NULL DEFAULT 'pending_review',
  admin_notes TEXT,
  estimated_quote NUMERIC(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);
```

### Row Level Security (RLS)
- **Insert Policy:** Allows anonymous public clients to insert validated enquiries.
- **Select Policy:** Allows retrieval by unique reference code for customer tracking while restricting broad table scraping.

---

## 6. API Documentation

### 1. Submit an Enquiry
- **Method:** `POST`
- **Route:** `/api/enquiries`
- **Content-Type:** `application/json`

#### Example Request Body
```json
{
  "customer_name": "Elena Vance",
  "email": "elena.vance@example.com",
  "phone": "+91 98765 01928",
  "garment_type": "Denim & Jeans",
  "garment_condition": "Heavy distress / fabric thinning",
  "service_type": "Upcycled Bags & Accessories",
  "budget_range": "₹699 - ₹1,499 (Standard Alteration / Mending)",
  "preferred_timeframe": "Standard (7 - 10 business days)",
  "description": "Pair of vintage 90s Levi 501 jeans with blown knees. Want them transformed into a heavy-duty tote bag.",
  "image_url": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
  "consent": true
}
```

#### Example 201 Created Response
```json
{
  "success": true,
  "message": "Enquiry successfully submitted and saved to database.",
  "storage": "supabase",
  "enquiry": {
    "id": "e4b2d358-1f19-4a92-9a0d-83b6f0e381ab",
    "reference_code": "RW-2026-YPRZ",
    "customer_name": "Elena Vance",
    "service_type": "Upcycled Bags & Accessories",
    "garment_type": "Denim & Jeans",
    "status": "pending_review",
    "created_at": "2026-10-26T20:25:52.120Z"
  }
}
```

#### Example 422 Validation Error Response
```json
{
  "success": false,
  "error": "Validation failed. Please verify your inputs.",
  "fieldErrors": {
    "email": "Please enter a valid email address",
    "description": "Please describe your garment and desired transformation (min 10 characters)"
  }
}
```

### 2. Lookup Enquiry Status
- **Method:** `GET`
- **Route:** `/api/enquiries?reference=RW-2026-YPRZ`
- **Response:**
```json
{
  "success": true,
  "enquiry": {
    "reference_code": "RW-2026-YPRZ",
    "customer_name": "Elena Vance",
    "garment_type": "Denim & Jeans",
    "service_type": "Upcycled Bags & Accessories",
    "status": "pending_review",
    "budget_range": "₹699 - ₹1,499 (Standard Alteration / Mending)",
    "created_at": "2026-10-26T20:25:52.120Z"
  },
  "storage": "supabase"
}
```

---

## 7. Deployment Instructions (Vercel)

1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (your deployed Vercel domain)
5. Click **Deploy**. Vercel will build and deploy the Next.js application automatically.

---

## 8. Verification & Testing Checklist

| Test Item | Verification Status | Notes |
|---|---|---|
| Local Production Build | **PASSED** | `npm run build` succeeds with zero errors across all static & dynamic routes. |
| Production Server Execution | **PASSED** | `next start` runs cleanly on port 3000. |
| Interactive Transformation Sliders | **PASSED** | Touch and mouse drag reveal before/after states smoothly. |
| Transformation Filtering | **PASSED** | Filters dynamically by Repair, Alteration, Redesign, Upcycling. |
| Garment Life Finder Diagnostic | **PASSED** | Real-time calculation of recommended service, cost, and turnaround. |
| Pre-filled Enquiry Modals | **PASSED** | Selecting any transformation card or recommendation pre-fills form fields. |
| Client Validation (Zod) | **PASSED** | Rejects invalid email, short descriptions, and missing consent with field errors. |
| Server Validation (Zod) | **PASSED** | Returns HTTP 422 with structured `fieldErrors` on bad payloads. |
| Backend Persistence | **PASSED** | Submissions generate unique reference codes and save to database storage. |
| Real-time Enquiry Tracking | **PASSED** | `GET /api/enquiries?reference=...` retrieves records accurately. |
| Custom 404 Page | **PASSED** | Route `/_not-found` displays branded error pattern with return CTA. |

---

## 9. Disclosures & References

- **AI Assistance Disclosure:** AI assistance was utilized during development for architectural ideation, schema formulation, and responsive layout styling. All application logic, database schemas, validation rules, and components were reviewed, refined, and tested for production readiness.
- **External Citations & Data Sources:**
  - Environmental statistics and clothing lifetime research cited from the **Ellen MacArthur Foundation Circular Fibres Initiative** and **WRAP UK Sustainable Clothing Action Plan**.
  - Photography sourced from [Unsplash](https://unsplash.com) under the Unsplash License for illustrative demonstration purposes.
  - Testimonials and sample project reviews are labeled as illustrative demonstrations.
