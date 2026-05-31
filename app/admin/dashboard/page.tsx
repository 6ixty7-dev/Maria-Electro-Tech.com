'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MASTER_SERVICES, KOCHI_LOCALITIES, CONTACT_INFO } from '@/lib/constants';
import { createClient } from '@/lib/supabase';
import { uploadImageAsset, deleteImageAsset } from '@/lib/storage';

// Interfaces for our database entities
interface Blog {
  id?: string;
  title: string;
  slug: string;
  content: string;
  seo_description: string;
  image_url: string;
  storage_path: string;
  category: string;
  tags: string[];
  is_published: boolean;
  published_at?: string;
  created_at?: string;
}

interface FAQ {
  id?: string;
  question: string;
  answer: string;
  category: string;
  created_at?: string;
}

interface PricingPackage {
  id?: string;
  name: string;
  price: string;
  period: string;
  category: string;
  features: string[];
  is_popular: boolean;
  created_at?: string;
}

interface GalleryItem {
  id?: string;
  url: string;
  storage_path: string;
  category: string;
  alt_text: string;
  created_at?: string;
}

export default function AdminDashboard() {
  const { user, isAllowed, isLoading, signOut } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  // Navigation tab states
  const [activeTab, setActiveTab] = useState<'blogs' | 'pricing' | 'faqs' | 'gallery'>('blogs');

  // Real-time states
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [pricing, setPricing] = useState<PricingPackage[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // System status
  const [isSandbox, setIsSandbox] = useState(false);
  const [showSqlDrawer, setShowSqlDrawer] = useState(false);
  const [systemMessage, setSystemMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Loading indicator for queries
  const [fetching, setFetching] = useState(true);

  // Upload and operation processing states
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Editor Modals State
  const [activeBlogEdit, setActiveBlogEdit] = useState<Partial<Blog> | null>(null);
  const [activeFaqEdit, setActiveFaqEdit] = useState<Partial<FAQ> | null>(null);
  const [activePricingEdit, setActivePricingEdit] = useState<Partial<PricingPackage> | null>(null);
  const [activeGalleryUpload, setActiveGalleryUpload] = useState<{ category: string; alt_text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Route protection
  useEffect(() => {
    if (!isLoading && (!user || !isAllowed)) {
      router.push('/admin');
    }
  }, [user, isAllowed, isLoading, router]);

  // Read data on launch
  useEffect(() => {
    if (user && isAllowed) {
      loadDatabaseData();
    }
  }, [user, isAllowed]);

  // Display quick system alerts
  const alertSystem = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setSystemMessage({ type, text });
    setTimeout(() => setSystemMessage(null), 5000);
  };

  // Safe database fetch routine with failsafe sandboxing
  const loadDatabaseData = async () => {
    setFetching(true);
    let sandboxDetected = false;

    // 1. Fetch Blogs
    const { data: dbBlogs, error: blogsErr } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (blogsErr) {
      console.warn('Blogs table not found, switching to local cache:', blogsErr);
      sandboxDetected = true;
    }

    // 2. Fetch FAQs
    const { data: dbFaqs, error: faqsErr } = await supabase
      .from('faqs')
      .select('*')
      .order('created_at', { ascending: true });

    if (faqsErr) sandboxDetected = true;

    // 3. Fetch Pricing
    const { data: dbPricing, error: pricingErr } = await supabase
      .from('pricing')
      .select('*')
      .order('created_at', { ascending: true });

    if (pricingErr) sandboxDetected = true;

    // 4. Fetch Gallery
    const { data: dbGallery, error: galleryErr } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (galleryErr) sandboxDetected = true;

    setIsSandbox(sandboxDetected);

    if (sandboxDetected) {
      // Hydrate local cache backups from localStorage or static fallbacks
      const localB = localStorage.getItem('maria_blogs');
      const localF = localStorage.getItem('maria_faqs');
      const localP = localStorage.getItem('maria_pricing');
      const localG = localStorage.getItem('maria_gallery');

      setBlogs(localB ? JSON.parse(localB) : [
        {
          id: 'b1',
          title: 'Selecting the Best Electrician in Kochi',
          slug: 'best-electrician-in-kochi-checklist',
          content: 'How to vet electrical contractors in Ernakulam safely.',
          seo_description: 'Vetting checklist for KSEB licensing.',
          image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQnFes_q_GvRFDEjxYSnDZzGmnKUZyzjN9VdE0YIYTz-dIFp4qAeZBuHmy-EbX4tVdvQI_T3ID87p_a1B8bCZTtJLiRzhJHccJenmaOp5DyycRSB-ieMWKt0fQQhK8R7lXLxOj1HUAzUouVvVyJVSlfTswHWBLBot2GjCYDtzhcZ-MXSxZNX2XgKODZhG0hn9j8I1YCtkrHe_Xh9sv0DX1v58xsG0gmwJPU0jdKBF7svMXrr_yjwHgCI7hBMHigOr55Ywx1DzUxdQ',
          storage_path: 'mock/electrician.webp',
          category: 'Electrical Safety',
          tags: ['electrician in Kochi', 'electrical repair'],
          is_published: true,
          published_at: '2026-05-28'
        },
        {
          id: 'b2',
          title: 'Understanding Domestic Inverter Sizing in Kerala',
          slug: 'inverter-installation-cost-kerala-guide',
          content: 'Load calculators for UPS setups in summer times.',
          seo_description: 'Domestic UPS backup cost analysis.',
          image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANoEXiuzINK1QeW3C1ITs6Dd3LntiSmbagri4oeZkYOOVuaCM7InAhEmbtvx_rVrSk38cw37EVjmhk9J03w2C070JLivY1dkLS7PBzFDA6mBdE1V76fBrQ6e4thgwva6gim_EXFXRPSapLjomEM6Z1T9twDLfKZ_GF_I4wpdt0suNbzxb_P7OuMXoWz_z4BmSaX0vTW3rUfXalABDnI4HzEKo2f58aEe5o0BajCwHXMBsgkS0Ny0Ku0YnujDrxi1NUgXCHWJFS-pE',
          storage_path: 'mock/inverter.webp',
          category: 'Power Backup',
          tags: ['inverter installation cost Kerala'],
          is_published: true,
          published_at: '2026-05-15'
        }
      ]);

      setFaqs(localF ? JSON.parse(localF) : [
        { id: 'f1', question: 'What is your emergency response time in Kochi?', answer: 'We prioritize urgent dispatches within 45 to 60 minutes across major neighborhoods.', category: 'General' },
        { id: 'f2', question: 'Are your technicians licensed in Kerala?', answer: 'Yes, our electricians are accredited by KSEB guidelines with ID check cards.', category: 'Safety' }
      ]);

      setPricing(localP ? JSON.parse(localP) : [
        { id: 'p1', name: 'Basic Electrical Callout', price: '299', period: 'visit', category: 'Electrical', features: ['Short-circuit checkup', 'Luxury light fittings', 'Accountable billing invoice'], is_popular: true },
        { id: 'p2', name: 'Standard Plumbing Diagnostic', price: '199', period: 'visit', category: 'Plumbing', features: ['Acoustic pipe leak check', 'Sanitaryware replacements', '30-day labor warranty'], is_popular: false }
      ]);

      setGallery(localG ? JSON.parse(localG) : [
        { id: 'g1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAByPFsl6-Chcoq95QSEfAVaVhfKcBQqsnm85q7RnKMtQb6iGQbxmgUHNolXDm4nt1aPd5b9OIum_F3cp5UoverVlg-Ys_vIB9jSD_OeSvPIAmXB7AqSTikepHwRbbf06ayaI7lWlHDOfOvytOvZ_yszxYHXSXTemr20UlA4SvauQ7QDzZS-2mjf_5eb5tSTVr9sWoulfZlh6WvfCMBuIc75XmIIAXwCowvTpdp2OGABeCWbwCyuiIZzEfpyuezdpt6V7rEcOd4tlI', storage_path: 'mock/clean-fix.webp', category: 'before-after', alt_text: 'Tidy panel wiring calibration check' }
      ]);

      alertSystem('Offline Sandbox Active. Showing high-fidelity offline cache. Click Seeding script to install.', 'info');
    } else {
      setBlogs(dbBlogs || []);
      setFaqs(dbFaqs || []);
      setPricing(dbPricing || []);
      setGallery(dbGallery || []);
      alertSystem('Live Supabase synchronization complete.', 'success');
    }
    setFetching(false);
  };

  // Sync sandbox variables locally
  const syncSandbox = (type: 'blogs' | 'faqs' | 'pricing' | 'gallery', updatedData: any) => {
    localStorage.setItem(`maria_${type}`, JSON.stringify(updatedData));
  };

  // SQL Schema Script for copy-paste seeding
  const sqlSeedingScript = `-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create blogs table
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

-- 2. Create faqs table
create table if not exists public.faqs (
    id uuid default uuid_generate_v4() primary key,
    question text not null,
    answer text not null,
    category text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create pricing table
create table if not exists public.pricing (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    price text not null,
    period text,
    category text,
    features text[] default '{}'::text[],
    is_popular boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create gallery table
create table if not exists public.gallery (
    id uuid default uuid_generate_v4() primary key,
    url text not null,
    storage_path text not null,
    category text not null,
    alt_text text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and insert permissions for public reading
alter table public.blogs enable row level security;
alter table public.faqs enable row level security;
alter table public.pricing enable row level security;
alter table public.gallery enable row level security;

create policy "Read access" on public.blogs for select using (true);
create policy "Read access" on public.faqs for select using (true);
create policy "Read access" on public.pricing for select using (true);
create policy "Read access" on public.gallery for select using (true);

create policy "Admin access" on public.blogs for all using (true);
create policy "Admin access" on public.faqs for all using (true);
create policy "Admin access" on public.pricing for all using (true);
create policy "Admin access" on public.gallery for all using (true);
`;

  // Dynamic Blog Submission & Upload Flow
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBlogEdit?.title || !activeBlogEdit?.content) {
      alertSystem('Please fill in essential fields (Title & Content).', 'error');
      return;
    }

    setSubmitting(true);
    const blogForm = {
      title: activeBlogEdit.title,
      slug: activeBlogEdit.slug || activeBlogEdit.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      content: activeBlogEdit.content,
      seo_description: activeBlogEdit.seo_description || '',
      image_url: activeBlogEdit.image_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQnFes_q_GvRFDEjxYSnDZzGmnKUZyzjN9VdE0YIYTz-dIFp4qAeZBuHmy-EbX4tVdvQI_T3ID87p_a1B8bCZTtJLiRzhJHccJenmaOp5DyycRSB-ieMWKt0fQQhK8R7lXLxOj1HUAzUouVvVyJVSlfTswHWBLBot2GjCYDtzhcZ-MXSxZNX2XgKODZhG0hn9j8I1YCtkrHe_Xh9sv0DX1v58xsG0gmwJPU0jdKBF7svMXrr_yjwHgCI7hBMHigOr55Ywx1DzUxdQ',
      storage_path: activeBlogEdit.storage_path || '',
      category: activeBlogEdit.category || 'General Services',
      tags: activeBlogEdit.tags || [],
      is_published: activeBlogEdit.is_published || false,
    };

    if (isSandbox) {
      let updated: Blog[] = [];
      if (activeBlogEdit.id) {
        updated = blogs.map(b => b.id === activeBlogEdit.id ? { ...b, ...blogForm } : b);
      } else {
        const newB = { ...blogForm, id: Math.random().toString(36).substring(2, 9), created_at: new Date().toISOString() };
        updated = [newB, ...blogs];
      }
      setBlogs(updated);
      syncSandbox('blogs', updated);
      alertSystem('Blog saved in sandbox memory cache.', 'success');
      setActiveBlogEdit(null);
    } else {
      let res;
      if (activeBlogEdit.id) {
        res = await supabase.from('blogs').update(blogForm).eq('id', activeBlogEdit.id);
      } else {
        res = await supabase.from('blogs').insert([blogForm]);
      }

      if (res.error) {
        alertSystem(`Database Save Failed: ${res.error.message}`, 'error');
      } else {
        alertSystem('Blog article successfully saved in Supabase database.', 'success');
        loadDatabaseData();
        setActiveBlogEdit(null);
      }
    }
    setSubmitting(false);
  };

  // Dynamic Image Upload Trigger
  const handleUploadBlogImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alertSystem('Only image files are permitted.', 'error');
      return;
    }

    try {
      setUploadProgress(20);
      const categoryPath = activeBlogEdit?.category || 'general';
      const uploadRes = await uploadImageAsset(file, 'blogs', categoryPath);
      setUploadProgress(100);

      setActiveBlogEdit(prev => prev ? {
        ...prev,
        image_url: uploadRes.url,
        storage_path: uploadRes.storagePath
      } : null);

      alertSystem('WebP optimized featured image uploaded and attached.', 'success');
      setTimeout(() => setUploadProgress(null), 1000);
    } catch (err: any) {
      alertSystem(`Upload Failed: ${err.message}`, 'error');
      setUploadProgress(null);
    }
  };

  // Blog Deletion Flow
  const handleDeleteBlog = async (blog: Blog) => {
    if (!confirm(`Are you sure you want to delete "${blog.title}"?`)) return;

    if (isSandbox) {
      const updated = blogs.filter(b => b.id !== blog.id);
      setBlogs(updated);
      syncSandbox('blogs', updated);
      alertSystem('Blog deleted from sandbox memory cache.', 'success');
    } else {
      if (blog.storage_path) {
        try {
          await deleteImageAsset('blogs', blog.storage_path);
        } catch (e) {
          console.warn('Storage removal failed or was already absent:', e);
        }
      }

      const { error } = await supabase.from('blogs').delete().eq('id', blog.id);
      if (error) {
        alertSystem(`Delete failed: ${error.message}`, 'error');
      } else {
        alertSystem('Blog article deleted successfully.', 'success');
        loadDatabaseData();
      }
    }
  };

  // Dynamic Gallery Upload Trigger
  const handleSaveGallery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !activeGalleryUpload) return;

    const file = files[0];
    setSubmitting(true);
    setUploadProgress(30);

    try {
      const uploadRes = await uploadImageAsset(file, 'gallery', activeGalleryUpload.category);
      setUploadProgress(80);

      const newItem = {
        url: uploadRes.url,
        storage_path: uploadRes.storagePath,
        category: activeGalleryUpload.category,
        alt_text: activeGalleryUpload.alt_text || 'Maria Electro Tech technical service delivery'
      };

      if (isSandbox) {
        const newG = { ...newItem, id: Math.random().toString(36).substring(2, 9), created_at: new Date().toISOString() };
        const updated = [newG, ...gallery];
        setGallery(updated);
        syncSandbox('gallery', updated);
        alertSystem('Gallery image saved in offline cache.', 'success');
      } else {
        const { error } = await supabase.from('gallery').insert([newItem]);
        if (error) {
          throw new Error(error.message);
        }
        alertSystem('Gallery image uploaded to Supabase & logged in database.', 'success');
        loadDatabaseData();
      }
      setActiveGalleryUpload(null);
    } catch (err: any) {
      alertSystem(`Gallery upload failed: ${err.message}`, 'error');
    } finally {
      setUploadProgress(null);
      setSubmitting(false);
    }
  };

  // Gallery Deletion Flow
  const handleDeleteGallery = async (item: GalleryItem) => {
    if (!confirm('Are you sure you want to delete this gallery photo?')) return;

    if (isSandbox) {
      const updated = gallery.filter(g => g.id !== item.id);
      setGallery(updated);
      syncSandbox('gallery', updated);
      alertSystem('Gallery image removed from cache.', 'success');
    } else {
      try {
        await deleteImageAsset('gallery', item.storage_path);
      } catch (e) {
        console.warn('Storage photo deletion failed:', e);
      }

      const { error } = await supabase.from('gallery').delete().eq('id', item.id);
      if (error) {
        alertSystem(`Deletion failed: ${error.message}`, 'error');
      } else {
        alertSystem('Gallery record removed from database.', 'success');
        loadDatabaseData();
      }
    }
  };

  // Pricing CRUD Submission
  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePricingEdit?.name || !activePricingEdit?.price || !activePricingEdit?.category) {
      alertSystem('Fill in crucial Pricing parameters.', 'error');
      return;
    }

    setSubmitting(true);
    const form = {
      name: activePricingEdit.name,
      price: activePricingEdit.price,
      period: activePricingEdit.period || 'visit',
      category: activePricingEdit.category,
      features: activePricingEdit.features || [],
      is_popular: activePricingEdit.is_popular || false
    };

    if (isSandbox) {
      let updated: PricingPackage[] = [];
      if (activePricingEdit.id) {
        updated = pricing.map(p => p.id === activePricingEdit.id ? { ...p, ...form } : p);
      } else {
        const newP = { ...form, id: Math.random().toString(36).substring(2, 9), created_at: new Date().toISOString() };
        updated = [newP, ...pricing];
      }
      setPricing(updated);
      syncSandbox('pricing', updated);
      alertSystem('Pricing saved inside offline cache.', 'success');
      setActivePricingEdit(null);
    } else {
      let res;
      if (activePricingEdit.id) {
        res = await supabase.from('pricing').update(form).eq('id', activePricingEdit.id);
      } else {
        res = await supabase.from('pricing').insert([form]);
      }

      if (res.error) {
        alertSystem(`Pricing Save failed: ${res.error.message}`, 'error');
      } else {
        alertSystem('Pricing package saved inside Supabase.', 'success');
        loadDatabaseData();
        setActivePricingEdit(null);
      }
    }
    setSubmitting(false);
  };

  // Pricing Deletion
  const handleDeletePricing = async (pkg: PricingPackage) => {
    if (!confirm(`Are you sure you want to delete ${pkg.name}?`)) return;

    if (isSandbox) {
      const updated = pricing.filter(p => p.id !== pkg.id);
      setPricing(updated);
      syncSandbox('pricing', updated);
      alertSystem('Pricing package deleted from cache.', 'success');
    } else {
      const { error } = await supabase.from('pricing').delete().eq('id', pkg.id);
      if (error) {
        alertSystem(`Deletion failed: ${error.message}`, 'error');
      } else {
        alertSystem('Pricing package deleted successfully from DB.', 'success');
        loadDatabaseData();
      }
    }
  };

  // FAQ CRUD Submission
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFaqEdit?.question || !activeFaqEdit?.answer) {
      alertSystem('FAQ fields cannot be left empty.', 'error');
      return;
    }

    setSubmitting(true);
    const form = {
      question: activeFaqEdit.question,
      answer: activeFaqEdit.answer,
      category: activeFaqEdit.category || 'General'
    };

    if (isSandbox) {
      let updated: FAQ[] = [];
      if (activeFaqEdit.id) {
        updated = faqs.map(f => f.id === activeFaqEdit.id ? { ...f, ...form } : f);
      } else {
        const newF = { ...form, id: Math.random().toString(36).substring(2, 9), created_at: new Date().toISOString() };
        updated = [...faqs, newF];
      }
      setFaqs(updated);
      syncSandbox('faqs', updated);
      alertSystem('FAQ saved inside offline sandbox cache.', 'success');
      setActiveFaqEdit(null);
    } else {
      let res;
      if (activeFaqEdit.id) {
        res = await supabase.from('faqs').update(form).eq('id', activeFaqEdit.id);
      } else {
        res = await supabase.from('faqs').insert([form]);
      }

      if (res.error) {
        alertSystem(`FAQ Save failed: ${res.error.message}`, 'error');
      } else {
        alertSystem('FAQ article successfully synchronized live.', 'success');
        loadDatabaseData();
        setActiveFaqEdit(null);
      }
    }
    setSubmitting(false);
  };

  // FAQ Deletion
  const handleDeleteFaq = async (faq: FAQ) => {
    if (!confirm('Delete this FAQ entry?')) return;

    if (isSandbox) {
      const updated = faqs.filter(f => f.id !== faq.id);
      setFaqs(updated);
      syncSandbox('faqs', updated);
      alertSystem('FAQ deleted from sandbox memory cache.', 'success');
    } else {
      const { error } = await supabase.from('faqs').delete().eq('id', faq.id);
      if (error) {
        alertSystem(`Deletion failed: ${error.message}`, 'error');
      } else {
        alertSystem('FAQ deleted successfully.', 'success');
        loadDatabaseData();
      }
    }
  };

  // Helper copy operation
  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSeedingScript);
    alertSystem('SQL Schema Script copied to clipboard!', 'success');
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col justify-between relative">
      
      {/* Dynamic Alert Messages Banner */}
      <AnimatePresence>
        {systemMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-[200] px-6 py-3.5 rounded-full shadow-lg font-bold text-xs flex items-center gap-2.5 ${
              systemMessage.type === 'success' ? 'bg-primary text-white' :
              systemMessage.type === 'error' ? 'bg-red-600 text-white animate-shake' :
              'bg-surface-container-high border border-outline-variant/30 text-secondary'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {systemMessage.type === 'success' ? 'check_circle' :
               systemMessage.type === 'error' ? 'report' : 'info'}
            </span>
            {systemMessage.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="bg-white border-b border-outline-variant/30 px-6 md:px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center text-xl font-bold">
            ⚡
          </div>
          <div>
            <h1 className="font-display font-extrabold text-sm sm:text-base text-on-background leading-none">Maria Operations</h1>
            <p className="text-[9px] sm:text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">Kochi local CMS center</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold text-on-background leading-none">{user?.email || 'Admin'}</p>
            <p className="text-[9px] text-tertiary font-bold mt-1">Authorized Operations Manager</p>
          </div>
          <button
            onClick={signOut}
            className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-[11px] font-extrabold transition-colors select-none"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Sandbox Warning Banner */}
      {isSandbox && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-8 py-3 flex flex-wrap gap-3 items-center justify-between">
          <p className="text-xs text-amber-800 font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-base">warning</span>
            Supabase schema tables are not provisioned in the live database. Operating inside responsive LocalStorage Sandbox.
          </p>
          <button
            onClick={() => setShowSqlDrawer(true)}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-extrabold flex items-center gap-1 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-xs">database</span>
            Get Database Seeding Script
          </button>
        </div>
      )}

      {/* Main Panel Content */}
      <main className="max-w-7xl mx-auto w-full px-6 py-8 grow grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Navigation Bar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-outline-variant/20 shadow-sm space-y-1.5">
            <h3 className="font-extrabold text-[10px] uppercase tracking-wider text-secondary mb-3">Management Nodes</h3>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'blogs'
                  ? 'bg-primary text-white shadow-md shadow-primary/15'
                  : 'text-secondary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">edit_note</span>
              Manage Blog Articles
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'gallery'
                  ? 'bg-primary text-white shadow-md shadow-primary/15'
                  : 'text-secondary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">imagesmode</span>
              Manage Media Gallery
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'pricing'
                  ? 'bg-primary text-white shadow-md shadow-primary/15'
                  : 'text-secondary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">payments</span>
              Manage Baseline Pricing
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'faqs'
                  ? 'bg-primary text-white shadow-md shadow-primary/15'
                  : 'text-secondary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">help_outline</span>
              Manage Operations FAQs
            </button>
          </div>

          <div className="bg-primary text-white p-6 rounded-3xl shadow-sm space-y-4">
            <h4 className="font-bold text-xs sm:text-sm">Technical Dispatch Status</h4>
            <p className="text-[11px] text-white/80 leading-relaxed">
              Dispatch vehicles are currently active near Edappally, Kakkanad, and Vyttila. Operational queue parameters are locked and running smoothly.
            </p>
          </div>
        </div>

        {/* Right Operations Area */}
        <div className="lg:col-span-3 space-y-6">

          {fetching ? (
            <div className="bg-white p-20 rounded-3xl border border-outline-variant/20 flex flex-col items-center justify-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              <p className="text-xs text-secondary font-bold">Hydrating database records from Kochi dispatches...</p>
            </div>
          ) : (
            <>
              {/* MANAGING BLOGS ARTICLE LIST */}
              {activeTab === 'blogs' && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-on-background">Local Authority Articles</h2>
                      <p className="text-secondary text-xs mt-0.5">Write and edit SEO authority blogs to boost Kochi Google Business rankings.</p>
                    </div>
                    <button
                      onClick={() => setActiveBlogEdit({})}
                      className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl shadow-sm spring-hover transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      New Article
                    </button>
                  </div>

                  <div className="space-y-4">
                    {blogs.length === 0 ? (
                      <p className="text-center py-8 text-xs text-secondary font-bold">No articles currently published.</p>
                    ) : (
                      blogs.map((blog) => (
                        <div key={blog.id || blog.slug} className="flex justify-between items-center p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                          <div>
                            <h4 className="font-bold text-xs sm:text-sm text-on-background leading-tight">{blog.title}</h4>
                            <p className="text-[10px] text-secondary font-semibold mt-1">
                              Slug: /{blog.slug} • State: <span className={blog.is_published ? "text-tertiary font-bold" : "text-amber-600 font-bold"}>
                                {blog.is_published ? "Published" : "Draft"}
                              </span>
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setActiveBlogEdit(blog)}
                              className="p-2 bg-white border border-outline-variant/30 hover:border-primary text-secondary hover:text-primary rounded-lg text-xs font-bold flex items-center"
                            >
                              <span className="material-symbols-outlined text-base">edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(blog)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold flex items-center"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* GALLERY MANAGEMENT TAB */}
              {activeTab === 'gallery' && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-on-background">Operations Media Gallery</h2>
                      <p className="text-secondary text-xs mt-0.5">Upload service delivery photographs and before-after transformations to build visual trust.</p>
                    </div>
                    <button
                      onClick={() => setActiveGalleryUpload({ category: 'electrical', alt_text: '' })}
                      className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl shadow-sm spring-hover transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">cloud_upload</span>
                      Upload Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {gallery.length === 0 ? (
                      <p className="col-span-full text-center py-8 text-xs text-secondary font-bold">No gallery photos uploaded.</p>
                    ) : (
                      gallery.map((item) => (
                        <div key={item.id} className="relative group bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden aspect-video">
                          <img src={item.url} alt={item.alt_text} className="w-full h-full object-cover" />
                          <div className="absolute top-2 left-2 bg-black/60 text-white font-extrabold text-[9px] px-2 py-0.5 rounded">
                            {item.category.toUpperCase()}
                          </div>
                          <button
                            onClick={() => handleDeleteGallery(item)}
                            className="absolute bottom-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity flex items-center"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* PRICING CRUD MANAGEMENT */}
              {activeTab === 'pricing' && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-on-background">Baseline Service Pricing</h2>
                      <p className="text-secondary text-xs mt-0.5">CRUD fixed start rates and custom pricing tiers displayed across localized SEO modules.</p>
                    </div>
                    <button
                      onClick={() => setActivePricingEdit({ category: 'Electrical', features: [] })}
                      className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl shadow-sm spring-hover transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      Add Price Package
                    </button>
                  </div>

                  <div className="space-y-4">
                    {pricing.length === 0 ? (
                      <p className="text-center py-8 text-xs text-secondary font-bold">No pricing packages configured.</p>
                    ) : (
                      pricing.map((pkg) => (
                        <div key={pkg.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-xs sm:text-sm text-on-background">{pkg.name}</h4>
                              <span className="text-[9px] bg-primary/10 text-primary font-extrabold px-2 py-0.5 rounded-full">
                                {pkg.category}
                              </span>
                              {pkg.is_popular && (
                                <span className="text-[9px] bg-tertiary/10 text-tertiary font-extrabold px-2 py-0.5 rounded-full">
                                  POPULAR
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-secondary font-semibold mt-1">₹{pkg.price} per {pkg.period}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setActivePricingEdit(pkg)}
                              className="p-2 bg-white border border-outline-variant/30 hover:border-primary text-secondary hover:text-primary rounded-lg text-xs font-bold flex items-center"
                            >
                              <span className="material-symbols-outlined text-base">edit</span>
                            </button>
                            <button
                              onClick={() => handleDeletePricing(pkg)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold flex items-center"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* OPERATIONS FAQS CRUD */}
              {activeTab === 'faqs' && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-on-background">Operations FAQs</h2>
                      <p className="text-secondary text-xs mt-0.5">Manage the baseline informational accordions displayed on landing layouts.</p>
                    </div>
                    <button
                      onClick={() => setActiveFaqEdit({ category: 'General' })}
                      className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl shadow-sm spring-hover transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      Add FAQ
                    </button>
                  </div>

                  <div className="space-y-4">
                    {faqs.length === 0 ? (
                      <p className="text-center py-8 text-xs text-secondary font-bold">No FAQ modules found.</p>
                    ) : (
                      faqs.map((faq) => (
                        <div key={faq.id} className="flex justify-between items-center p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                          <div className="pr-4 truncate">
                            <h4 className="font-bold text-xs sm:text-sm text-on-background leading-tight">{faq.question}</h4>
                            <p className="text-[9px] text-secondary font-semibold mt-1">Category: {faq.category}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => setActiveFaqEdit(faq)}
                              className="p-2 bg-white border border-outline-variant/30 hover:border-primary text-secondary hover:text-primary rounded-lg text-xs font-bold flex items-center"
                            >
                              <span className="material-symbols-outlined text-base">edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteFaq(faq)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold flex items-center"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </main>

      {/* DETAILED BLOG CMS WRITER MODAL OVERLAY */}
      {activeBlogEdit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-6 space-y-6 relative max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <h3 className="text-base font-bold text-on-background">
                {activeBlogEdit.id ? 'Edit Authority Post' : 'Compose Authority Post'}
              </h3>
              <button onClick={() => setActiveBlogEdit(null)} className="material-symbols-outlined text-secondary hover:text-primary">
                close
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Article Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary font-bold"
                  value={activeBlogEdit.title || ''}
                  onChange={(e) => setActiveBlogEdit(prev => prev ? { ...prev, title: e.target.value } : null)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Article URL Slug (Auto-Generated if blank)</label>
                  <input
                    type="text"
                    placeholder="e.g. best-electrician-in-kochi-checklist"
                    className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary"
                    value={activeBlogEdit.slug || ''}
                    onChange={(e) => setActiveBlogEdit(prev => prev ? { ...prev, slug: e.target.value } : null)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Category</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary"
                    value={activeBlogEdit.category || ''}
                    onChange={(e) => setActiveBlogEdit(prev => prev ? { ...prev, category: e.target.value } : null)}
                  />
                </div>
              </div>

              {/* Drag and Drop WebP compress image uploader */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Featured Image (Optimized to WebP automatically)</label>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-16 rounded-xl bg-surface-container-low border border-outline-variant/30 overflow-hidden relative shrink-0">
                    {activeBlogEdit.image_url ? (
                      <img src={activeBlogEdit.image_url} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-secondary font-bold">Image</div>
                    )}
                  </div>
                  <div className="grow">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleUploadBlogImage}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-bold transition-all"
                    >
                      Choose Photo (WebP Converter)
                    </button>
                    {uploadProgress !== null && (
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-2">
                        <div className="bg-primary h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">SEO Short Description</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary h-16"
                  value={activeBlogEdit.seo_description || ''}
                  onChange={(e) => setActiveBlogEdit(prev => prev ? { ...prev, seo_description: e.target.value } : null)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Article Content (Supports standard HTML5 tags)</label>
                <textarea
                  required
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary h-36 font-mono"
                  placeholder="<h2>Subheading</h2><p>Article body contents...</p>"
                  value={activeBlogEdit.content || ''}
                  onChange={(e) => setActiveBlogEdit(prev => prev ? { ...prev, content: e.target.value } : null)}
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-xs font-bold text-on-background select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeBlogEdit.is_published || false}
                    onChange={(e) => setActiveBlogEdit(prev => prev ? { ...prev, is_published: e.target.checked } : null)}
                  />
                  Publish Article Immediately
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveBlogEdit(null)}
                    className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-secondary rounded-xl text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    {submitting ? 'Saving...' : 'Save Post'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* COMPREHENSIVE PRICING MODAL EDITOR */}
      {activePricingEdit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6 space-y-6"
          >
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <h3 className="text-base font-bold text-on-background">
                {activePricingEdit.id ? 'Edit Pricing Details' : 'Add Pricing Package'}
              </h3>
              <button onClick={() => setActivePricingEdit(null)} className="material-symbols-outlined text-secondary hover:text-primary">
                close
              </button>
            </div>

            <form onSubmit={handleSavePricing} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Package Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Basic Repair and Fitting"
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary font-bold"
                  value={activePricingEdit.name || ''}
                  onChange={(e) => setActivePricingEdit(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Starts-at Price (₹)</label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary font-bold"
                    value={activePricingEdit.price || ''}
                    onChange={(e) => setActivePricingEdit(prev => prev ? { ...prev, price: e.target.value } : null)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Billing Period</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. visit or point"
                    className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary"
                    value={activePricingEdit.period || ''}
                    onChange={(e) => setActivePricingEdit(prev => prev ? { ...prev, period: e.target.value } : null)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Category</label>
                  <select
                    className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary font-bold"
                    value={activePricingEdit.category || 'Electrical'}
                    onChange={(e) => setActivePricingEdit(prev => prev ? { ...prev, category: e.target.value } : null)}
                  >
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Inverter">Inverter</option>
                    <option value="CCTV">CCTV</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-bold text-on-background select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activePricingEdit.is_popular || false}
                      onChange={(e) => setActivePricingEdit(prev => prev ? { ...prev, is_popular: e.target.checked } : null)}
                    />
                    Mark as Popular
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Features Checklist (One per line)</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary h-24"
                  placeholder="Short circuit checkup&#10;Premium light fittings"
                  value={activePricingEdit.features?.join('\n') || ''}
                  onChange={(e) => setActivePricingEdit(prev => prev ? { ...prev, features: e.target.value.split('\n').filter(x => x.trim()) } : null)}
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-outline-variant/10 pt-3">
                <button
                  type="button"
                  onClick={() => setActivePricingEdit(null)}
                  className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-secondary rounded-xl text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  {submitting ? 'Saving...' : 'Save Package'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* OPERATIONS FAQS MODAL EDITOR */}
      {activeFaqEdit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6 space-y-6"
          >
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <h3 className="text-base font-bold text-on-background">
                {activeFaqEdit.id ? 'Edit FAQ Entry' : 'Create FAQ Entry'}
              </h3>
              <button onClick={() => setActiveFaqEdit(null)} className="material-symbols-outlined text-secondary hover:text-primary">
                close
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Question</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Do you charge diagnostic fees?"
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary font-bold"
                  value={activeFaqEdit.question || ''}
                  onChange={(e) => setActiveFaqEdit(prev => prev ? { ...prev, question: e.target.value } : null)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Answer</label>
                <textarea
                  required
                  placeholder="Write clear response..."
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary h-24"
                  value={activeFaqEdit.answer || ''}
                  onChange={(e) => setActiveFaqEdit(prev => prev ? { ...prev, answer: e.target.value } : null)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Category</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary"
                  value={activeFaqEdit.category || ''}
                  onChange={(e) => setActiveFaqEdit(prev => prev ? { ...prev, category: e.target.value } : null)}
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-outline-variant/10 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveFaqEdit(null)}
                  className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-secondary rounded-xl text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  {submitting ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* OPERATIONS GALLERY PHOTO UPLOAD MODAL */}
      {activeGalleryUpload && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl max-w-sm w-full p-6 space-y-6"
          >
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <h3 className="text-base font-bold text-on-background">Upload Project Picture</h3>
              <button onClick={() => setActiveGalleryUpload(null)} className="material-symbols-outlined text-secondary hover:text-primary">
                close
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Gallery Category Folder</label>
                <select
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary font-bold"
                  value={activeGalleryUpload.category}
                  onChange={(e) => setActiveGalleryUpload(prev => prev ? { ...prev, category: e.target.value } : null)}
                >
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="cctv">CCTV</option>
                  <option value="inverter">Inverter</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="before-after">Before-After transformations</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Alternative Alt Text</label>
                <input
                  type="text"
                  placeholder="e.g. Neat casing wires installation Kakkanad"
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-background focus:outline-none focus:border-primary"
                  value={activeGalleryUpload.alt_text}
                  onChange={(e) => setActiveGalleryUpload(prev => prev ? { ...prev, alt_text: e.target.value } : null)}
                />
              </div>

              {/* Upload Drop Zone Trigger */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-secondary mb-1.5">Select Image File</label>
                <div className="border-2 border-dashed border-outline-variant/50 rounded-2xl p-6 text-center bg-surface-container-low hover:bg-surface-container transition-colors relative cursor-pointer group">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleSaveGallery}
                    disabled={submitting}
                  />
                  <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-primary transition-colors">
                    cloud_upload
                  </span>
                  <p className="text-xs text-secondary font-bold mt-2">Drag and drop file or click to browse</p>
                  <p className="text-[9px] text-tertiary font-bold mt-1">Automatic resize and WebP conversion</p>
                </div>
                {uploadProgress !== null && (
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-3">
                    <div className="bg-primary h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* SCHEMA SEED DRAWER */}
      <AnimatePresence>
        {showSqlDrawer && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-surface-container-low max-w-xl w-full h-full p-6 shadow-2xl flex flex-col justify-between border-l border-outline-variant/20 relative"
            >
              <div className="space-y-4 grow overflow-y-auto">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
                  <h3 className="text-base font-bold text-on-background flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">database</span>
                    Database Seeding Schema Script
                  </h3>
                  <button onClick={() => setShowSqlDrawer(false)} className="material-symbols-outlined text-secondary hover:text-primary">
                    close
                  </button>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl space-y-2">
                  <h4 className="text-xs text-amber-900 font-extrabold">How to seed database:</h4>
                  <p className="text-[10px] text-amber-800 leading-relaxed font-semibold">
                    1. Copy the SQL script below.<br />
                    2. Go to your <a href="https://supabase.com" target="_blank" className="underline font-black hover:text-amber-950">Supabase Console Dashboard</a>.<br />
                    3. Open your project, click on **SQL Editor** in the side navigation panel.<br />
                    4. Paste the SQL script and hit **Run**.<br />
                    5. Once executed, reload this operations dashboard to instantly synchronize live!
                  </p>
                </div>

                <div className="relative font-mono text-[9px] bg-slate-900 text-slate-300 p-4 rounded-2xl overflow-x-auto max-h-[50vh] leading-relaxed border border-slate-800">
                  <button
                    onClick={handleCopySql}
                    className="absolute top-2 right-2 px-3 py-1 bg-slate-800 text-white rounded text-[8px] font-bold hover:bg-slate-700 active:scale-95 transition-all"
                  >
                    Copy SQL
                  </button>
                  <pre>{sqlSeedingScript}</pre>
                </div>
              </div>

              <div className="border-t border-outline-variant/20 pt-4 mt-4 flex justify-end">
                <button
                  onClick={() => setShowSqlDrawer(false)}
                  className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Finished Setup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-outline-variant/20 py-4 text-center text-[10px] text-secondary">
        Maria Operations System • Kochi Kerala • © {new Date().getFullYear()}
      </footer>

    </div>
  );
}
