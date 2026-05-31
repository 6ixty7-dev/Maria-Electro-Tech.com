import { createClient } from './supabase';

/**
 * Client-Side Canvas WebP Compression Converter
 * Intercepts JPG/PNG uploads, scales high-res dimensions (max width 1920px),
 * compresses quality to 80%, and outputs lightweight WebP Blob binary.
 */
export async function compressImageToWebP(file: File, maxWidth = 1920, quality = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // If it's not a browser environment, return original
    if (typeof window === 'undefined') {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio and constrain to maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context not available'));
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas contents to WebP blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('WebP compression failed'));
            }
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Automated Bucket Check and Public Creation
 * Tries to verify if the bucket exists; if not, attempts to auto-create
 * the bucket with public access policies.
 */
export async function ensureBucketExists(bucketName: string) {
  const supabase = createClient();
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) {
      console.warn('Supabase storage query error:', listError);
      return;
    }
    
    const exists = buckets?.some(b => b.name === bucketName);
    if (!exists) {
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        allowedMimeTypes: ['image/webp', 'image/png', 'image/jpeg', 'image/gif'],
      });
      if (createError) {
        console.warn(`Note: Could not automatically create bucket "${bucketName}" due to RLS permissions. Please ensure it is created manually in your Supabase Dashboard under Storage.`, createError);
      } else {
        console.log(`Supabase bucket "${bucketName}" was successfully verified/created.`);
      }
    }
  } catch (err) {
    console.warn(`Dynamic bucket check failed for ${bucketName}:`, err);
  }
}

/**
 * Organized Folder Path Generator
 * Formats:
 * - blogs: blogs/YYYY/month-name/filename-uuid.webp
 * - gallery: gallery/{category}/filename-uuid.webp
 * - services: services/{category}/filename-uuid.webp
 * - seo-assets: seo-assets/{folder}/filename-uuid.webp
 */
export function generateStoragePath(bucket: string, subfolder: string, originalName: string): string {
  const cleanName = originalName
    .toLowerCase()
    .replace(/\.[^/.]+$/, "") // strip extension
    .replace(/[^a-z0-9_-]/g, "-") // replace symbols with hyphen
    .replace(/-+/g, "-") // clear consecutive hyphens
    .replace(/^-+|-+$/g, ""); // strip start/end hyphens

  const uuid = Math.random().toString(36).substring(2, 9);
  const date = new Date();

  if (bucket === 'blogs') {
    const year = date.getFullYear();
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const month = months[date.getMonth()];
    return `${year}/${month}/${cleanName}-${uuid}.webp`;
  }

  // Format categories cleanly
  const folder = subfolder.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
  return `${folder}/${cleanName}-${uuid}.webp`;
}

/**
 * Master Upload Handler
 * Compresses image, ensures target bucket exists, uploads asset, and resolves public access URLs.
 */
export async function uploadImageAsset(
  file: File,
  bucket: string,
  subfolder: string
): Promise<{ url: string; storagePath: string }> {
  // 1. Verify/create the bucket
  await ensureBucketExists(bucket);

  // 2. Compress image client-side to lightweight WebP
  let uploadData: Blob | File = file;
  if (file.type.startsWith('image/')) {
    try {
      uploadData = await compressImageToWebP(file);
    } catch (e) {
      console.warn('Canvas WebP compression failed, uploading original:', e);
    }
  }

  // 3. Generate structured folder path
  const storagePath = generateStoragePath(bucket, subfolder, file.name);

  // 4. Upload to Supabase Storage
  const supabase = createClient();
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(storagePath, uploadData, {
      contentType: 'image/webp',
      cacheControl: '31536000', // Cache assets aggressively for high speed
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Supabase upload failed: ${uploadError.message}`);
  }

  // 5. Retrieve Public CDN Access URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  if (!data?.publicUrl) {
    throw new Error('Could not resolve public URL from storage.');
  }

  return {
    url: data.publicUrl,
    storagePath
  };
}

/**
 * Image Deletion Handler
 */
export async function deleteImageAsset(bucket: string, storagePath: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.storage.from(bucket).remove([storagePath]);
  if (error) {
    throw new Error(`Supabase asset removal failed: ${error.message}`);
  }
}
