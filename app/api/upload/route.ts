import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client with service role key for admin privileges
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Supabase environment variables are not configured on the server.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const bucket = formData.get('bucket') as string | null;
    const sectionKey = formData.get('sectionKey') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided in the request.' }, { status: 400 });
    }

    if (!bucket || !['site-media', 'gallery'].includes(bucket)) {
      return NextResponse.json({ error: 'Invalid or missing storage bucket.' }, { status: 400 });
    }

    // Create admin client to bypass standard RLS policies for uploads
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const fileBuffer = await file.arrayBuffer();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    
    // Construct a clean, predictable filename or path
    let storagePath = '';
    if (bucket === 'site-media' && sectionKey) {
      storagePath = `${sectionKey}.${fileExtension}`;
    } else {
      // For general gallery or fallback, use a unique timestamped path
      storagePath = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    }

    // Upload file to Supabase Storage bucket
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(storagePath, fileBuffer, {
        contentType: file.type || 'image/jpeg',
        upsert: true,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json({ error: `Storage upload failed: ${uploadError.message}` }, { status: 500 });
    }

    // Retrieve public URL of the uploaded image
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(storagePath);

    const publicUrl = publicUrlData.publicUrl;

    // If sectionKey is provided and bucket is 'site-media', let's automatically update site_media table
    if (bucket === 'site-media' && sectionKey) {
      const { error: dbError } = await supabaseAdmin
        .from('site_media')
        .upsert(
          {
            section_key: sectionKey,
            image_url: publicUrl,
            storage_path: storagePath,
            alt_text: `CMS updated ${sectionKey}`,
          },
          { onConflict: 'section_key' }
        );

      if (dbError) {
        console.error('DB site_media update error:', dbError);
        return NextResponse.json({ 
          error: `File uploaded but database sync failed: ${dbError.message}`,
          imageUrl: publicUrl,
          storagePath 
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      imageUrl: publicUrl,
      storagePath,
    });
  } catch (err: any) {
    console.error('Upload handler exception:', err);
    return NextResponse.json({ error: `Server exception: ${err.message || err}` }, { status: 500 });
  }
}
