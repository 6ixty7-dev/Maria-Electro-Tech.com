# Supabase Connection & Setup Guide
This document details how to initialize and configure your **Supabase** backend for production deployment of the **Maria Electro Tech** platform.

---

## 1. Database Table Initialization

You need to execute the database initialization script to create tables (`blogs`, `faqs`, `pricing`, `gallery`), enable RLS, and populate pre-seeded Kochi guides and starter rates.

### Step-by-Step Table Setup:
1. Log in to your [Supabase Dashboard](https://supabase.com).
2. Open your target project console.
3. Click on the **SQL Editor** tab in the left-side navigation panel.
4. Click on **New Query** to create a blank editor panel.
5. Open [supabase/schema.sql](file:///c:/Users/Sixty7/Downloads/Maria%20Electro%20Tech/supabase/schema.sql) in your code workspace and copy the entire contents.
6. Paste the SQL script into the Supabase SQL Editor and click **Run** (or press `Cmd + Enter` / `Ctrl + Enter`).
7. Confirm that the execution logs show a green success badge.

---

## 2. Storage Buckets Configuration

To support featured blog banners, project photos, and dynamic metadata, you must initialize four public storage buckets inside Supabase Storage.

### Step-by-Step Bucket Creation:
1. Sidetrack to the **Storage** tab in your Supabase project console.
2. Click on **New Bucket** and configure the first bucket:
   *   **Bucket Name**: `blogs`
   *   **Public Bucket**: **Enabled (Toggle On)**. *(This ensures your blog readers can load images directly without expiring access token parameters)*.
3. Repeat this process to create three more **Public** buckets:
   *   `gallery` (Stores project photographs categorized by service)
   *   `services` (Stores master service profile assets)
   *   `seo-assets` (Stores OpenGraph layouts and SEO media)

---

## 3. Storage Row-Level Security (RLS) Policies

To prevent unauthorized public uploads while letting authorized administrators write, modify, and delete media, you must apply the following storage policies.

### Step-by-Step Storage Policies Configuration:
1. Inside the **Storage** console, click on **Policies** in the sidebar.
2. Under each created bucket (`blogs`, `gallery`, `services`, `seo-assets`), click on **New Policy** -> **Create a policy from scratch**.

#### Policy A: Public Read Access (For Anonymous Users)
*   **Policy Name**: `Allow public anonymous read access`
*   **Allowed Operations**: Select `SELECT` only.
*   **Target Roles**: Select `public` / `anon`.
*   **Expression (SQL)**: Set to `true` (Or click the template option for "Provide read access to everyone").

#### Policy B: Admin Write Access (For Authorized Logged-In Admins)
*   **Policy Name**: `Allow authenticated admin write and modify`
*   **Allowed Operations**: Select `INSERT`, `UPDATE`, and `DELETE`.
*   **Target Roles**: Select `authenticated`.
*   **Expression (SQL)**: Set to `true` (Requires auth.role() = 'authenticated').

*Note: The upload system automatically compresses files to lightweight WebP files and creates organized folders (e.g. `blogs/2026/june/filename.webp`) to optimize speeds.*

---

## 4. Admin Account Permissions Setup

The operations panel `/admin/dashboard` is secured using Google OAuth session checkers and a strict whitelist validation process.

### Step-by-Step Administrative Whitelisting:
1. Open [lib/constants.ts](file:///c:/Users/Sixty7/Downloads/Maria%20Electro%20Tech/lib/constants.ts) in your codebase.
2. Locate the `ALLOWED_USERS` array at the top of the file:
   ```typescript
   export const ALLOWED_USERS = [
     'mariaelectrotech.kochi@gmail.com',
     'admin@mariaelectrotech.com',
     'your.email@gmail.com', // Replace with your target Google Account email
   ];
   ```
3. Add the exact Google account email addresses of your team collaborators.
4. When logging in at `/admin`, users will authenticate via Google OAuth. If their email is whitelisted in this array, they gain access to the dashboard; otherwise, they are redirected to a secure Lockout Screen.
