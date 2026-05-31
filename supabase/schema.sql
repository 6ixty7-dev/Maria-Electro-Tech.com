-- ==========================================
-- Maria Electro Tech Database Schema Seeding
-- PostgreSQL Script for Supabase SQL Editor
-- ==========================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create blogs Table (SEO Local Authority Center)
create table if not exists public.blogs (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    slug text not null unique,
    content text not null,
    seo_description text,
    image_url text,
    storage_path text,
    category text,
    tags text[] default '{}'::text[],
    is_published boolean default false not null,
    published_at timestamp with time zone default timezone('utc'::text, now()),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create faqs Table (Dispatch Information Accordions)
create table if not exists public.faqs (
    id uuid default uuid_generate_v4() primary key,
    question text not null,
    answer text not null,
    category text default 'General',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create pricing Table (Dynamic Price Packages)
create table if not exists public.pricing (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    price text not null,
    period text default 'visit',
    category text not null,
    features text[] default '{}'::text[],
    is_popular boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create gallery Table (Technical Service Delivery Photos)
create table if not exists public.gallery (
    id uuid default uuid_generate_v4() primary key,
    url text not null,
    storage_path text not null,
    category text not null, -- 'electrical', 'plumbing', 'cctv', 'inverter', 'maintenance', 'before-after'
    alt_text text default 'Maria Electro Tech technical service delivery',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create admin_users Table (Whitelisted Operations Administrators)
create table if not exists public.admin_users (
    id uuid default uuid_generate_v4() primary key,
    email text not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Create reviews Table (Manual/Google Imported Local Reviews)
create table if not exists public.reviews (
    id uuid default uuid_generate_v4() primary key,
    reviewer_name text not null,
    rating integer not null check (rating >= 1 and rating <= 5),
    review_text text not null,
    review_date date not null default current_date,
    avatar_url text,
    is_published boolean default true not null,
    source text default 'Google',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Create site_media Table (CMS-Managed Website Images)
create table if not exists public.site_media (
    id uuid default uuid_generate_v4() primary key,
    section_key text not null unique,
    image_url text not null,
    storage_path text,
    alt_text text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row-Level Security (RLS)
alter table public.blogs enable row level security;
alter table public.faqs enable row level security;
alter table public.pricing enable row level security;
alter table public.gallery enable row level security;
alter table public.admin_users enable row level security;
alter table public.reviews enable row level security;
alter table public.site_media enable row level security;

-- Drop existing policies if any to prevent duplicates
drop policy if exists "Allow public read blogs" on public.blogs;
drop policy if exists "Allow admin modify blogs" on public.blogs;
drop policy if exists "Allow public read faqs" on public.faqs;
drop policy if exists "Allow admin modify faqs" on public.faqs;
drop policy if exists "Allow public read pricing" on public.pricing;
drop policy if exists "Allow admin modify pricing" on public.pricing;
drop policy if exists "Allow public read gallery" on public.gallery;
drop policy if exists "Allow admin modify gallery" on public.gallery;
drop policy if exists "Allow public read admin_users" on public.admin_users;
drop policy if exists "Allow admin modify admin_users" on public.admin_users;
drop policy if exists "Allow public read reviews" on public.reviews;
drop policy if exists "Allow admin modify reviews" on public.reviews;
drop policy if exists "Allow public read site_media" on public.site_media;
drop policy if exists "Allow admin modify site_media" on public.site_media;

-- 1. Policies for blogs Table
create policy "Allow public read blogs" on public.blogs 
    for select using (true);
create policy "Allow admin modify blogs" on public.blogs 
    for all using (auth.role() = 'authenticated');

-- 2. Policies for faqs Table
create policy "Allow public read faqs" on public.faqs 
    for select using (true);
create policy "Allow admin modify faqs" on public.faqs 
    for all using (auth.role() = 'authenticated');

-- 3. Policies for pricing Table
create policy "Allow public read pricing" on public.pricing 
    for select using (true);
create policy "Allow admin modify pricing" on public.pricing 
    for all using (auth.role() = 'authenticated');

-- 4. Policies for gallery Table
create policy "Allow public read gallery" on public.gallery 
    for select using (true);
create policy "Allow admin modify gallery" on public.gallery 
    for all using (auth.role() = 'authenticated');

-- 5. Policies for admin_users Table
create policy "Allow public read admin_users" on public.admin_users 
    for select using (true);
create policy "Allow admin modify admin_users" on public.admin_users 
    for all using (auth.role() = 'authenticated');

-- 6. Policies for reviews Table
create policy "Allow public read reviews" on public.reviews 
    for select using (true);
create policy "Allow admin modify reviews" on public.reviews 
    for all using (auth.role() = 'authenticated');

-- 7. Policies for site_media Table
create policy "Allow public read site_media" on public.site_media 
    for select using (true);
create policy "Allow admin modify site_media" on public.site_media 
    for all using (auth.role() = 'authenticated');

-- ==========================================
-- Starter Seed Data
-- ==========================================

-- Seed Pricing Packages
insert into public.pricing (name, price, period, category, features, is_popular) values
('Basic Electrical callout', '149', 'visit', 'Electrical', array['Professional, vetted electrician', 'Transparent diagnostic check', 'Safety standards inspection', 'Upfront pricing before work'], false),
('Advanced Plumbing repair', '299', 'visit', 'Plumbing', array['Highly experienced plumber', 'Pipe-pressure diagnostics', 'High-quality replacement materials', 'Reliable service standards'], true),
('CCTV Camera Setup', '999', 'point', 'CCTV', array['Full mobile app camera sync', 'Discreet conduit cabling runs', 'Angle adjustments & blindspot analysis', 'Complimentary storage review'], false),
('AMC Plan (Elite Care)', '4999', 'year', 'Maintenance', array['4 Periodic preventive inspections', 'Zero visit charges for emergency dispatches', 'Full house electrical & water safety check', 'Priority technician booking slots'], false)
on conflict do nothing;

-- Seed Dispatch FAQs
insert into public.faqs (question, answer, category) values
('What is your emergency response time in Kochi?', 'For major power failures, electrical short circuits, or critical plumbing leaks within Ernakulam, we prioritize urgent dispatches. Our mobile emergency support technicians typically reach Edappally, Kakkanad, Vyttila, Palarivattom, and Kadavanthra within 45 to 60 minutes.', 'General'),
('Are your electricians and plumbers certified in Kerala?', 'Yes, absolutely. Every single technician is a background-vetted, experienced professional. Our team holds formal technical certifications and adheres strictly to domestic safety standards and Kerala electrical guidelines.', 'Safety'),
('Do you stand behind your workmanship?', 'We pride ourselves on professional workmanship and high quality standards. If you experience any issues related to our repair, contact us and we will promptly return to inspect and resolve any service deficiency under our standard professional care.', 'Warranty'),
('How do you charge for parts and materials?', 'We practice complete billing transparency. Our base charges are fixed and flat. If parts are required, we explain the diagnostic issue first, provide an upfront estimate, and source high-quality materials. You are also welcome to procure the parts yourself.', 'Billing')
on conflict do nothing;

-- Seed whitelisted Operations Administrators
insert into public.admin_users (email) values
('mariaelectrotech.kochi@gmail.com'),
('admin@mariaelectrotech.com')
on conflict do nothing;

-- Seed Blogs (SEO Local Authority Articles)
insert into public.blogs (title, slug, content, seo_description, image_url, storage_path, category, tags, is_published) values
(
  'Selecting the Best Electrician in Kochi: A Comprehensive Vetting Checklist',
  'best-electrician-in-kochi-checklist',
  '<h2>The Importance of Professional Vetting in Ernakulam</h2><p>When looking for an <strong>electrician in Kochi</strong>, the first rule of home maintenance is never to sacrifice safety for cost. High-voltage domestic short circuits represent a primary fire hazard in Ernakulam residential districts. Procuring certified professional support is paramount to shielding your family and assets.</p><h3>1. Verify Technical Certifications and Experience</h3><p>Always confirm that the dispatching agency or individual technician has verified professional qualifications. Certified technicians possess deep comprehension of domestic grid parameters and phase balancing, preventing future power surges.</p><h3>2. Insist on Flat, Upfront Price Estimations</h3><p>Generic contractors often hook customers with low visiting fees only to charge inflated labor rates once the distribution board is disassembled. Always prioritize agencies like Maria Electro Tech that practice strict upfront price declarations before any screwdrivers are touched.</p><h3>3. Look for Reliable Workmanship Standards</h3><p>Accountable electrical repair in Ernakulam must be backed by professional service standards. Our commitment to high quality workmanship indicates that our team stands behind their technical calibrations and respects your home.</p>',
  'How to vet electrical contractors in Ernakulam. Learn about technical certification requirements, domestic safety vetting protocols, and transparent upfront quoting guides.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQnFes_q_GvRFDEjxYSnDZzGmnKUZyzjN9VdE0YIYTz-dIFp4qAeZBuHmy-EbX4tVdvQI_T3ID87p_a1B8bCZTtJLiRzhJHccJenmaOp5DyycRSB-ieMWKt0fQQhK8R7lXLxOj1HUAzUouVvVyJVSlfTswHWBLBot2GjCYDtzhcZ-MXSxZNX2XgKODZhG0hn9j8I1YCtkrHe_Xh9sv0DX1v58xsG0gmwJPU0jdKBF7svMXrr_yjwHgCI7hBMHigOr55Ywx1DzUxdQ',
  'mock/electrician.webp',
  'Electrical Safety',
  array['electrician in Kochi', 'electrical repair in Ernakulam'],
  true
),
(
  'Understanding Domestic Inverter and UPS Installation Costs in Kerala',
  'inverter-installation-cost-kerala-guide',
  '<h2>Calculating Your Domestic Backup Sizing Metrics</h2><p>With frequent summer load sheddings, calculating your exact <strong>inverter installation cost Kerala</strong> parameters will prevent complete household blackout stutters. Power backups are no longer luxury additions; they are essential systems for modern homes.</p><h3>1. Standard Domestic Load Computations</h3><p>Before installing batteries, count the absolute wattage required to power your critical appliances (fans, LED lights, computer routers). Sizing calculators help choose between a 900VA standard UPS or a larger 1500VA double-battery system.</p><h3>2. Concealed UPS Double-Line Rewiring Costs</h3><p>A major element of inverter installation costs in Kerala is the internal electrical panel rewiring. Separating critical load lines from heavy power sockets (ACs, geysers) requires precision work by certified technicians to avoid DB bypass short circuits.</p><h3>3. Quality Battery Water & Safeties</h3><p>Ensure your utility room is well-ventilated. Standard tubular batteries require periodic distilled water top-ups and terminal cleaning to prolong life and ensure safety.</p>',
  'Calculating domestic battery capacity loads and sizing metrics. An in-depth price analysis of concealed UPS rewiring and battery safety standards in Kerala homes.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuANoEXiuzINK1QeW3C1ITs6Dd3LntiSmbagri4oeZkYOOVuaCM7InAhEmbtvx_rVrSk38cw37EVjmhk9J03w2C070JLivY1dkLS7PBzFDA6mBdE1V76fBrQ6e4thgwva6gim_EXFXRPSapLjomEM6Z1T9twDLfKZ_GF_I4wpdt0suNbzxb_P7OuMXoWz_z4BmSaX0vTW3rUfXalABDnI4HzEKo2f58aEe5o0BajCwHXMBsgkS0Ny0Ku0YnujDrxi1NUgXCHWJFS-pE',
  'mock/inverter.webp',
  'Power Backup',
  array['inverter installation cost Kerala', 'home backup solutions'],
  true
),
(
  'How to Detect and Fix Hidden Water Leaks: Vetting a Plumber near Kakkanad',
  'detect-water-leaks-plumber-near-kakkanad',
  '<h2>Solving Silent Water Damage in Kakkanad Estates</h2><p>Finding a reliable <strong>plumber near Kakkanad</strong> can represent a significant challenge given the rapid growth of high-rise luxury apartments and duplex villas near InfoPark and Rajagiri. Silent internal pipe cracks represent a primary threat to ceiling concrete durability.</p><h3>1. Identifying Silent Internal Pipeline Fractures</h3><p>If your Ernakulam water utility bill rises unexpectedly, turn off all taps and inspect your master meter dials. If the dial rotates, you hold a concealed pipeline leak that requires acoustic diagnostic checks immediately.</p><h3>2. Essential Questions to Ask Local Kakkanad Plumbers</h3><p>Before allowing plumbers to break ceiling tiling, always inquire about their diagnostic equipment. Professional plumbers utilize thermal imagers or acoustic detectors instead of random hammer breaking, protecting your home surfaces.</p><h3>3. High Workmanship Standards</h3><p>Ensure that bathroom sanitaryware replacements and joint sealant applications are backed by professional service standards to secure accountability against shoddy fixes.</p>',
  'Acoustic leak detection and plumbing diagnostics. Essential steps Kakkanad homeowners should follow before booking emergency plumbers near InfoPark or Rajagiri.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBeSWKmuFLvzXD9NZbisfbki1_7T6FtRthvExcLY05_g8ceYDj0qvSNn3pJapWDnfrzge29zdH1SmxlEzq9SV87GTjfAUNlnhBhxRcihHBRwPBmxhWrGFwuWW2jI_WV8uxMqbGyupFdGxFAZNE6XSNnvOyRZFySN8xxzW6x6j7RdARvUE_yoPxlL2n5L87TOVjvrIgOLfWzk0DnortxHWZJ5Q7ZaCZwgxb6iDbyARZR1hvSJyGMkD4ZlZkSfoSxjbisrJ4E9EjyZSM',
  'mock/plumber.webp',
  'Plumbing Guides',
  array['plumber near Kakkanad', 'leak detection Kochi'],
  true
)
on conflict do nothing;

-- Seed Google Reviews Fallbacks
insert into public.reviews (reviewer_name, rating, review_text, review_date, avatar_url, is_published, source) values
('Ananthakrishnan G.', 5, 'Excellent service! They arrived within an hour for a major short circuit in our house in Kadavanthra. The electrician was highly professional, diagnosed the issue quickly, and resolved it with upfront pricing. Highly recommended!', '2026-04-15', null, true, 'Google'),
('Riya Mathew', 5, 'Very reliable plumbers in Kochi. Fixed a concealed leak in our Kakkanad apartment using proper diagnostic sensors without breaking the entire wall. Transparent billing and very professional behavior.', '2026-05-10', null, true, 'Google'),
('Faisal Rahman', 5, 'Maria Electro Tech team installed a double-battery UPS inverter system at our home in Edappally. Clean cabling, excellent service, and clear instructions. Perfect solution for summer power cuts.', '2026-05-22', null, true, 'Google'),
('Saritha Nair', 4, 'Booked their AMC Elite Care plan for our villa in Vyttila. The team is professional, conducted a thorough electrical and plumbing safety audit. Very satisfied with their systematic approach.', '2026-03-29', null, true, 'Google'),
('George Varghese', 5, 'Top notch CCTV camera installation in Palarivattom. Clean conduit routing and precise setup. The technician was polite and explained the mobile app syncing perfectly.', '2026-04-02', null, true, 'Google'),
('Meera Pillai', 5, 'Emergency plumbing callout for a broken flush valve late evening. They resolved it efficiently. Very reasonable rate compared to local independent plumbers who usually overcharge.', '2026-05-15', null, true, 'Google')
on conflict (id) do nothing;

-- Seed Default Site Media (Fallback section images from current design system)
insert into public.site_media (section_key, image_url, alt_text) values
('hero_main', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQnFes_q_GvRFDEjxYSnDZzGmnKUZyzjN9VdE0YIYTz-dIFp4qAeZBuHmy-EbX4tVdvQI_T3ID87p_a1B8bCZTtJLiRzhJHccJenmaOp5DyycRSB-ieMWKt0fQQhK8R7lXLxOj1HUAzUouVvVyJVSlfTswHWBLBot2GjCYDtzhcZ-MXSxZNX2XgKODZhG0hn9j8I1YCtkrHe_Xh9sv0DX1v58xsG0gmwJPU0jdKBF7svMXrr_yjwHgCI7hBMHigOr55Ywx1DzUxdQ', 'Professional electrical and plumbing service dispatch in Kochi'),
('trust_team', 'https://lh3.googleusercontent.com/aida-public/AB6AXuANoEXiuzINK1QeW3C1ITs6Dd3LntiSmbagri4oeZkYOOVuaCM7InAhEmbtvx_rVrSk38cw37EVjmhk9J03w2C070JLivY1dkLS7PBzFDA6mBdE1V76fBrQ6e4thgwva6gim_EXFXRPSapLjomEM6Z1T9twDLfKZ_GF_I4wpdt0suNbzxb_P7OuMXoWz_z4BmSaX0vTW3rUfXalABDnI4HzEKo2f58aEe5o0BajCwHXMBsgkS0Ny0Ku0YnujDrxi1NUgXCHWJFS-pE', 'Maria Electro Tech certified technician team in Kochi'),
('service_electrical', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop', 'Certified electrical maintenance service'),
('service_plumbing', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop', 'Professional plumbing repairs and diagnostic leak check'),
('service_cctv', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop', 'Discreet CCTV surveillance systems setup'),
('service_inverter', 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=800&auto=format&fit=crop', 'Domestic inverter and battery backup systems installation'),
('service_maintenance', 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop', 'Comprehensive AMC preventative maintenance audits')
on conflict (section_key) do update set image_url = excluded.image_url;
