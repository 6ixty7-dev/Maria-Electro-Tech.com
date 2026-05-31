# Google OAuth & Authentication Setup Guide
This guide details how to resolve the `Unsupported provider` authentication error by properly configuring **Google OAuth Credentials** inside your Google Cloud Console and enabling the **Google Provider** in your Supabase Auth settings.

---

## 1. Google Cloud Console Configuration

To authorize Google Sign-in on your Vercel deployment and local computer, you must create a secure OAuth Client ID in your Google Cloud platform.

### Step-by-Step Google Console Setup:
1. Log in to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select your existing project from the top dropdown.
3. Search for **APIs & Services** in the top search bar and click on it.
4. Sidetrack to **OAuth consent screen** in the left sidebar:
   *   Select **External** user type.
   *   Fill in your app details (*App name*: "Maria Electro Tech", *User support email*, *Developer contact information*).
   *   Click **Save and Continue** until finished, then click **Publish App** to move it out of Testing state into Production mode.
5. Click on **Credentials** in the left sidebar.
6. Click on **+ Create Credentials** at the top and select **OAuth client ID**.
7. Configure the credentials:
   *   **Application type**: Web application
   *   **Name**: "Maria Electro Tech Gateway"
8. Under **Authorized JavaScript origins**, add:
   *   `http://localhost:3000` *(For local testing)*
   *   `https://maria-electro-tech-com.vercel.app` *(For production Vercel deployment)*
9. Under **Authorized redirect URIs**, add the exact callback path supplied by your Supabase project instance:
   *   `https://awlczafyfztchfedsmcr.supabase.co/auth/v1/callback`
10. Click **Create**.
11. A popup will reveal your **Client ID** and **Client Secret**. Copy these parameters immediately—they will be entered into your Supabase Dashboard.

---

## 2. Supabase Authentication Setup

Now you must enable the Google Authentication provider inside your Supabase project so it recognizes the login requests from your app.

### Step-by-Step Supabase Console Setup:
1. Log in to your [Supabase Dashboard](https://supabase.com).
2. Open your project console.
3. Click on the **Authentication** tab in the left-side navigation panel.
4. Click on **Providers** under the settings block in the left sidebar.
5. Locate the **Google** provider card in the list and click to expand it.
6. Configure the parameters:
   *   **Google enabled**: **Toggle ON (Active)**.
   *   **Client ID**: Paste the Client ID generated in step 11 above.
   *   **Client Secret**: Paste the Client Secret generated in step 11 above.
7. Click **Save** at the bottom.

---

## 3. Register Redirect URLs in Supabase

To ensure that Supabase knows where to redirect the user session after Google signs them in, you must whitelist the login callback URLs in your Supabase Auth settings.

### Step-by-Step URL Whitelisting:
1. Inside the Supabase **Authentication** console, click on **URL Configuration** in the left sidebar.
2. Under **Site URL**, insert:
   *   `https://maria-electro-tech-com.vercel.app` *(Or your custom domain in the future)*
3. Under **Redirect URLs**, click **Add URL** and add the callback routes for development and production:
   *   `http://localhost:3000/auth/callback` *(For local development)*
   *   `https://maria-electro-tech-com.vercel.app/auth/callback` *(For Vercel deployment)*
4. Click **Save**.

---

## 4. Verification Check

Once both Google Developer Console and Supabase Auth settings are configured, try logging in again at `/admin`:
1. Click **Authentication with Google**.
2. Select your whitelisted email account on the Google Prompt page.
3. Upon validation, you should be redirected smoothly to `/admin/dashboard` with a successful session!
