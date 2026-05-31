'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase';
import { DEFAULT_SITE_MEDIA } from '@/lib/siteMedia';

interface MediaItem {
  section_key: string;
  image_url: string;
  alt_text: string;
  storage_path: string | null;
}

interface MediaManagerProps {
  isSandbox: boolean;
  alertSystem: (text: string, type?: 'success' | 'error' | 'info') => void;
}

const SECTION_DESCRIPTIONS: Record<string, { title: string; category: string; desc: string }> = {
  hero_main: {
    title: 'Hero Cover Image',
    category: 'Home Hero',
    desc: 'The large main visual displayed at the top of the homepage in the right column.',
  },
  trust_team: {
    title: 'Technician Team Photo',
    category: 'Trust Spotlight',
    desc: 'Featured photo at the bottom of the "Why Kochi Trusts Us" segment.',
  },
  service_electrical: {
    title: 'Electrical Service Cover',
    category: 'Service Cards',
    desc: 'Cover image for the Electrical Solutions card in the Services grid.',
  },
  service_plumbing: {
    title: 'Plumbing Service Cover',
    category: 'Service Cards',
    desc: 'Cover image for the Plumbing Engineering card in the Services grid.',
  },
  service_cctv: {
    title: 'CCTV Setup Cover',
    category: 'Service Cards',
    desc: 'Cover image for the Smart Surveillance & CCTV card in the Services grid.',
  },
  service_inverter: {
    title: 'Inverter Installation Cover',
    category: 'Service Cards',
    desc: 'Cover image for the Power Backup & Inverters card in the Services grid.',
  },
  service_maintenance: {
    title: 'AMC Maintenance Cover',
    category: 'Service Cards',
    desc: 'Cover image for the Annual Maintenance Contracts (AMC) card in the Services grid.',
  },
};

export default function MediaManager({ isSandbox, alertSystem }: MediaManagerProps) {
  const [mediaItems, setMediaItems] = useState<Record<string, MediaItem>>({});
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadKey, setActiveUploadKey] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadMedia();
  }, [isSandbox]);

  const loadMedia = async () => {
    setLoading(true);
    const mapped: Record<string, MediaItem> = {};
    
    // Seed standard keys first with fallbacks
    Object.entries(DEFAULT_SITE_MEDIA).forEach(([key, fallback]) => {
      mapped[key] = {
        section_key: key,
        image_url: fallback.image_url,
        alt_text: fallback.alt_text,
        storage_path: null,
      };
    });

    if (isSandbox) {
      const localM = localStorage.getItem('maria_site_media');
      if (localM) {
        const parsed = JSON.parse(localM);
        Object.entries(parsed).forEach(([key, value]: any) => {
          mapped[key] = value;
        });
      }
      setMediaItems(mapped);
    } else {
      try {
        const { data, error } = await supabase
          .from('site_media')
          .select('*');

        if (!error && data) {
          data.forEach((row) => {
            mapped[row.section_key] = {
              section_key: row.section_key,
              image_url: row.image_url,
              alt_text: row.alt_text || SECTION_DESCRIPTIONS[row.section_key]?.title || 'Website media asset',
              storage_path: row.storage_path,
            };
          });
        }
        setMediaItems(mapped);
      } catch (err) {
        console.error('Failed to load site_media from Supabase:', err);
      }
    }
    setLoading(false);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, sectionKey: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alertSystem('Only image files are permitted.', 'error');
      return;
    }

    setUploadingKey(sectionKey);
    alertSystem(`Uploading new image for ${SECTION_DESCRIPTIONS[sectionKey]?.title || sectionKey}...`, 'info');

    if (isSandbox) {
      // In sandbox mode, mock the upload using a local object URL
      const tempUrl = URL.createObjectURL(file);
      const updatedMedia = { ...mediaItems };
      updatedMedia[sectionKey] = {
        section_key: sectionKey,
        image_url: tempUrl,
        alt_text: `Sandbox upload for ${sectionKey}`,
        storage_path: `sandbox/${file.name}`,
      };
      setMediaItems(updatedMedia);
      
      // Store in sandbox memory
      const sandboxPayload: Record<string, any> = {};
      Object.entries(updatedMedia).forEach(([k, v]) => {
        if (v.storage_path && v.storage_path.startsWith('sandbox/')) {
          sandboxPayload[k] = v;
        }
      });
      localStorage.setItem('maria_site_media', JSON.stringify(sandboxPayload));

      alertSystem('Image updated in sandbox memory cache!', 'success');
      setUploadingKey(null);
    } else {
      // Upload using the server route API
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bucket', 'site-media');
        formData.append('sectionKey', sectionKey);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (!response.ok || result.error) {
          throw new Error(result.error || 'Server upload failed.');
        }

        alertSystem('Image uploaded successfully and database synced!', 'success');
        loadMedia();
      } catch (err: any) {
        alertSystem(`Upload failed: ${err.message || err}`, 'error');
      } finally {
        setUploadingKey(null);
        setActiveUploadKey(null);
      }
    }
  };

  const triggerFileSelect = (sectionKey: string) => {
    setActiveUploadKey(sectionKey);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 100);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm space-y-6">
      
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => activeUploadKey && handleUploadImage(e, activeUploadKey)}
        accept="image/*"
        className="hidden"
      />

      {/* Tab Header */}
      <div className="border-b border-outline-variant/10 pb-5">
        <h2 className="text-lg font-bold text-on-background flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">photo_library</span>
          Website Media Manager
        </h2>
        <p className="text-secondary text-xs mt-0.5">
          Replace layout images and cover photos across the entire site without writing code or editing files.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-xs text-secondary font-bold">Synchronizing website images and media tags...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {Object.entries(SECTION_DESCRIPTIONS).map(([key, details]) => {
            const item = mediaItems[key];
            const isUploading = uploadingKey === key;

            return (
              <div
                key={key}
                className="bg-surface-container-low p-5 rounded-3xl border border-outline-variant/10 hover:border-primary/15 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Card Section Header */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[9px] bg-primary/10 text-primary font-extrabold px-2.5 py-1 rounded-full select-none uppercase tracking-wider">
                        {details.category}
                      </span>
                      <h3 className="font-bold text-xs sm:text-sm text-on-background mt-2 leading-none">
                        {details.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Descriptions */}
                  <p className="text-secondary text-[11px] leading-relaxed">
                    {details.desc}
                  </p>
                  
                  {/* Media Thumbnail Container */}
                  <div className="relative rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm aspect-video bg-white flex items-center justify-center">
                    {isUploading ? (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-2 text-white">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                        <span className="text-[10px] font-bold">Uploading WebP...</span>
                      </div>
                    ) : null}
                    
                    <img
                      src={item?.image_url}
                      alt={item?.alt_text || details.title}
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                    />

                    {/* Quick overlay action */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex justify-between items-center border-t border-outline-variant/5">
                  <span className="text-[9px] text-secondary font-semibold italic truncate max-w-[150px]">
                    Key: {key}
                  </span>
                  
                  <button
                    onClick={() => triggerFileSelect(key)}
                    disabled={isUploading}
                    className="px-4 py-2 bg-white border border-outline-variant/30 hover:border-primary text-primary hover:text-primary-container text-xs font-extrabold rounded-xl transition-all shadow-sm flex items-center gap-1 cursor-pointer select-none active:scale-95 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">cloud_upload</span>
                    Replace Image
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
