import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');
  const origin = new URL(request.url).origin;

  // 1. Capture OAuth Redirect Failures
  if (error) {
    console.error('OAuth Callback Error:', error, error_description);
    return NextResponse.redirect(
      `${origin}/admin?error=${encodeURIComponent(error_description || error)}`
    );
  }

  // 2. Exchange Authorization Code for Session Parameters
  if (code) {
    const supabase = createClient();
    try {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        console.error('Code-to-Session exchange failure:', exchangeError);
        return NextResponse.redirect(
          `${origin}/admin?error=${encodeURIComponent(exchangeError.message)}`
        );
      }
    } catch (e: any) {
      console.error('Token swap exception:', e);
      return NextResponse.redirect(
        `${origin}/admin?error=${encodeURIComponent(e.message || 'Session swap failure')}`
      );
    }
  }

  // 3. Redirect successfully to dashboard
  return NextResponse.redirect(`${origin}/admin/dashboard`);
}
