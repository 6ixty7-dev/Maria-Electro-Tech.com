import { NextResponse } from 'next/server';

/**
 * Auth Callback Route
 *
 * NOTE: Phone/OTP authentication in Supabase is handled entirely client-side
 * via supabase.auth.verifyOtp(). This route is kept for future use
 * (e.g., magic links, email confirmation) but is not part of the primary
 * admin auth flow.
 *
 * If you switch to email magic links or OAuth in the future,
 * restore the session exchange logic here.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = new URL(request.url).origin;
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  if (error) {
    console.error('Auth Callback Error:', error, error_description);
    return NextResponse.redirect(
      `${origin}/admin?error=${encodeURIComponent(error_description || error)}`
    );
  }

  // Default redirect — go to admin (which will redirect to dashboard if session exists)
  return NextResponse.redirect(`${origin}/admin`);
}
