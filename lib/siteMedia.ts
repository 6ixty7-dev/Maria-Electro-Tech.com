import { createClient } from './supabase';

export interface SiteMediaItem {
  section_key: string;
  image_url: string;
  alt_text: string | null;
  storage_path: string | null;
}

export const DEFAULT_SITE_MEDIA: Record<string, { image_url: string; alt_text: string }> = {
  hero_main: {
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQnFes_q_GvRFDEjxYSnDZzGmnKUZyzjN9VdE0YIYTz-dIFp4qAeZBuHmy-EbX4tVdvQI_T3ID87p_a1B8bCZTtJLiRzhJHccJenmaOp5DyycRSB-ieMWKt0fQQhK8R7lXLxOj1HUAzUouVvVyJVSlfTswHWBLBot2GjCYDtzhcZ-MXSxZNX2XgKODZhG0hn9j8I1YCtkrHe_Xh9sv0DX1v58xsG0gmwJPU0jdKBF7svMXrr_yjwHgCI7hBMHigOr55Ywx1DzUxdQ',
    alt_text: 'Professional electrical and plumbing service dispatch in Kochi',
  },
  trust_team: {
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANoEXiuzINK1QeW3C1ITs6Dd3LntiSmbagri4oeZkYOOVuaCM7InAhEmbtvx_rVrSk38cw37EVjmhk9J03w2C070JLivY1dkLS7PBzFDA6mBdE1V76fBrQ6e4thgwva6gim_EXFXRPSapLjomEM6Z1T9twDLfKZ_GF_I4wpdt0suNbzxb_P7OuMXoWz_z4BmSaX0vTW3rUfXalABDnI4HzEKo2f58aEe5o0BajCwHXMBsgkS0Ny0Ku0YnujDrxi1NUgXCHWJFS-pE',
    alt_text: 'Maria Electro Tech certified technician team in Kochi',
  },
  service_electrical: {
    image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
    alt_text: 'Certified electrical maintenance service',
  },
  service_plumbing: {
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    alt_text: 'Professional plumbing repairs and diagnostic leak check',
  },
  service_cctv: {
    image_url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop',
    alt_text: 'Discreet CCTV surveillance systems setup',
  },
  service_inverter: {
    image_url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=800&auto=format&fit=crop',
    alt_text: 'Domestic inverter and battery backup systems installation',
  },
  service_maintenance: {
    image_url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop',
    alt_text: 'Comprehensive AMC preventative maintenance audits',
  },
};

/**
 * Fetch a single site_media URL by section_key, falling back to default.
 */
export async function getSiteMediaUrl(sectionKey: string): Promise<string> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('site_media')
      .select('image_url')
      .eq('section_key', sectionKey)
      .maybeSingle();

    if (error || !data?.image_url) {
      return DEFAULT_SITE_MEDIA[sectionKey]?.image_url || '';
    }
    return data.image_url;
  } catch (err) {
    console.error(`Error fetching site media for ${sectionKey}:`, err);
    return DEFAULT_SITE_MEDIA[sectionKey]?.image_url || '';
  }
}

/**
 * Fetch all site_media records and map them, filling in defaults for missing items.
 */
export async function getAllSiteMedia(): Promise<Record<string, { image_url: string; alt_text: string }>> {
  const supabase = createClient();
  const mediaMap = { ...DEFAULT_SITE_MEDIA };

  try {
    const { data, error } = await supabase
      .from('site_media')
      .select('section_key, image_url, alt_text');

    if (!error && data) {
      data.forEach((item) => {
        mediaMap[item.section_key] = {
          image_url: item.image_url,
          alt_text: item.alt_text || DEFAULT_SITE_MEDIA[item.section_key]?.alt_text || '',
        };
      });
    }
  } catch (err) {
    console.error('Error fetching all site media:', err);
  }

  return mediaMap;
}
