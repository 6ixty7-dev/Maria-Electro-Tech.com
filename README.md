# Maria Electro Tech - Local Services SEO Platform & CMS
> Premium local services platform engineered for **Maria Electro Tech**—Kochi’s elite partner for certified electrical, plumbing, inverter, CCTV, and home maintenance solutions.

Built with a state-of-the-art tech stack, this application balances high-craft **Apple-inspired design aesthetics** (selective liquid glassmorphism, responsive spring-based hover dynamics) with the **grounded warmth, accountability, and high readability** required by Kerala customers.

---

## 🚀 Key Highlights & Features

*   **⚡ Balanced Polish & Grounded Readability**: High-contrast,Solid content panels with crisp typography to guarantee legibility for non-tech-savvy users, combined with selective glassmorphic widgets (scroll-compacting floating `Navbar`, mobile bottom tab `BottomNavBar`, emergency badges, and review sliders).
*   **📍 Infinite Local SEO Resolver (`/[service]-[locality]`)**: A highly scalable dynamic resolver routing pattern catches locality-based queries (e.g. `/electrician-kakkanad`, `/plumber-edappally`, `/inverter-installation-kochi`) on-demand, injecting custom landmarks, targeted copy grids, and localized coordinates schema data to boost Google search rankings.
*   **🔧 Secure Administrative Gateway & operations CMS (`/admin`)**: Clean Google OAuth protected gate whitelists operations managers. Provides fully responsive managers:
    *   *Blog CMS*: Compose guides with inline images and featured banners.
    *   *Media Gallery CMS*: Categorize and review project dispatches with alt descriptions.
    *   *Pricing Grid CMS*: Control baseline start-rates dynamically across frontend grids.
    *   *FAQ Accordions CRUD*: Edit operational customer dispatches instantly.
*   **📸 Dynamic WebP Client Compressor**: Advanced media pipeline in `lib/storage.ts` that intercepts JPEG/PNG uploads, resizes high-res images to standard sizes, and translates them to lightweight WebP files before sending to Supabase Storage, optimizing page speed on mobile networks.
*   **🛡️ Dynamic Sandbox Failsafe**: If backend tables are not seeded yet, the admin dashboard alerts managers and runs in a stateful browser sandbox (`localStorage`), letting you preview and test the complete CMS.
*   **📈 Built for 90+ Lighthouse Performance**: Dynamic image loading, lightweight CSS-backed blurs, optimized hydration loops, dynamic sitemaps, and robots.txt generation.

---

## 🛠️ Tech Stack & Conventions

*   **Core**: [Next.js 16 (App Router)](https://nextjs.org/) (Turbopack compiler), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/).
*   **Styles**: [Tailwind CSS v4](https://tailwindcss.com/) `@theme` configurations (fully responsive fluid transitions, HSL color tokens).
*   **Motion**: [Framer Motion 12](https://www.framer.com/motion/) (subtle section fades, tactile spring-click hover states).
*   **Database & Auth**: [Supabase SSR Client](https://supabase.com/) (`@supabase/ssr` session authentication, OAuth redirects).
*   **SEO Schema**: Automated LocalBusiness, Service, and FAQPage JSON-LD structured injections.

---

## 📂 Repository Folder Structure

The directory structure is organized cleanly to isolate configurations, dynamic routing pages, reusable modules, and setup docs:
```text
/app               # Next.js App Router (Layouts, routes, dynamic SEO catch-alls)
  ├── [slug]       # Locality resolver Catch-all route ([service]-[locality])
  ├── admin        # Admin gate & Dashboard tabs (Blogs, Pricing, FAQs, Media Gallery)
  ├── auth         # Supabase OAuth callbacks
  ├── blog         # Authority guides and reader articles
  ├── services     # Master service category detail sheets
  ├── globals.css  # CSS custom utility variables & Tailwind configurations
/components        # Grounded homepage, Navbar, Footer, and Emergency modules
/docs              # Technical setup guides and Storage bucket instructions
/hooks             # Authentication and lifecycle hooks (useAuth)
/lib               # Central constants, landmarks list, & Supabase setup clients
/public            # Local assets, SVG indicators, and verification tags
/supabase          # Relational database schema scripts and seed data files
/types             # Unified type definitions (Blog, FAQ, Pricing, Gallery, etc.)
```

---

## ⚙️ Quick Start Installation

Follow these steps to spin up the development environment:

### 1. Clone & Bootstrap Dependencies
```bash
# Navigate to the workspace directory
cd "Maria Electro Tech"

# Install all locked production packages
npm install
```

### 2. Configure Environment Parameters
Create a `.env.local` file in your root folder:
```bash
cp .env.example .env.local
```
Supply your live Supabase database URL and public keys:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.anon-key
```

### 3. Spin Up Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 🗄️ Database & Storage Setup

To transition the site from its mock/sandbox state into a live dynamic synchronized environment, follow the steps detailed in [docs/supabase-setup.md](file:///c:/Users/Sixty7/Downloads/Maria%20Electro%20Tech/docs/supabase-setup.md):
1.  **Provison Tables**: Copy [supabase/schema.sql](file:///c:/Users/Sixty7/Downloads/Maria%20Electro%20Tech/supabase/schema.sql) and execute it in your **Supabase SQL Editor** to create database tables, indexes, and write initial seed packages.
2.  **Create Storage Buckets**: Sidetrack to the **Storage** console and create four **Public** buckets: `blogs`, `gallery`, `services`, `seo-assets`.
3.  **Assign Policies**: Set bucket RLS parameters allowing public read and authenticated write access.
4.  **Whitelist Admins**: Append your team's Google account emails to the `ALLOWED_USERS` whitelist array inside `lib/constants.ts` to authorize operations dashboard access.

---

## 🏗️ Production Compilations & Builds

Always execute TypeScript compilation checks and production bundle builds before pushed revisions:

```bash
# Verify 100% static type safety checks
npx tsc --noEmit

# Compile Next.js production builds
npm run build
```

---

## ☁️ Vercel Deployment Instructions

Deploying the Maria Electro Tech platform to Vercel is extremely straightforward:

1.  **GitHub Push**: Initialize a Git repository, commit your changes, and push to a remote GitHub repository.
2.  **Vercel Import**: Go to [Vercel](https://vercel.com), click **Add New Project**, and import your GitHub repository.
3.  **Configure Parameters**: In the **Environment Variables** deployment drawer, insert your active keys:
    *   `NEXT_PUBLIC_SUPABASE_URL`
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   `NEXT_PUBLIC_SITE_URL` (Matches your vercel deployment domain)
4.  **Deploy**: Click **Deploy**. Vercel will build the Turbopack pages and host your Kochi local service authority platform instantly!

---

## 📈 Scalability & Future Roadmaps

This platform is architected for long-term scalability and business growth:
1.  **Google Maps API Integration**: Leverage the centralized `lat/lng` coordinates inside `KOCHI_LOCALITIES` (`lib/constants.ts`) to easily load interactive map widgets in customer sections.
2.  **SMS Dispatch Integrations**: Trigger webhook notifications (e.g. Twilio) on database row insertions to page technicians immediately upon bookings.
3.  **Local Landing Scale**: Easily add new towns in `lib/constants.ts` under `KOCHI_LOCALITIES`. The system instantly resolves new routes, generates SEO parameters, updates `sitemap.xml`, and creates Schema metadata automatically!
