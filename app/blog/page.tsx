import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BottomNavBar from '@/components/BottomNavBar';
import Footer from '@/components/Footer';
import EmergencyWidget from '@/components/EmergencyWidget';
import { createClient } from '@supabase/supabase-js';

// Server-side safe Supabase JS client instantiation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Highly optimized local search articles
export const MOCK_BLOGS = [
  {
    title: 'Selecting the Best Electrician in Kochi: A Comprehensive Vetting Checklist',
    slug: 'best-electrician-in-kochi-checklist',
    desc: 'How to vet electrical contractors in Ernakulam. Learn about KSEB state licensing requirements, domestic safety vetting protocols, and transparent upfront quoting guides.',
    category: 'Electrical Safety',
    publishedAt: 'May 28, 2026',
    readTime: '5 min read',
    tags: ['electrician in Kochi', 'electrical repair in Ernakulam']
  },
  {
    title: 'Understanding Domestic Inverter and UPS Installation Costs in Kerala',
    slug: 'inverter-installation-cost-kerala-guide',
    desc: 'Calculating domestic battery capacity loads and sizing metrics. An in-depth price analysis of concealed UPS rewiring and battery safety standards in Kerala homes.',
    category: 'Power Backup',
    publishedAt: 'May 15, 2026',
    readTime: '6 min read',
    tags: ['inverter installation cost Kerala', 'home backup solutions']
  },
  {
    title: 'How to Detect and Fix Hidden Water Leaks: Vetting a Plumber near Kakkanad',
    slug: 'detect-water-leaks-plumber-near-kakkanad',
    desc: 'Acoustic leak detection and plumbing diagnostics. Essential steps Kakkanad homeowners should follow before booking emergency plumbers near InfoPark or Rajagiri.',
    category: 'Plumbing Guides',
    publishedAt: 'May 02, 2026',
    readTime: '4 min read',
    tags: ['plumber near Kakkanad', 'leak detection Kochi']
  }
];

export const metadata: Metadata = {
  title: 'Local Home Service Resources & SEO Guides | Maria Electro Tech Kochi',
  description: 'High-authority local maintenance guides for Kochi homeowners. Expert insights on electrical safety, inverter load calculations, leak detection, and CCTV placement in Ernakulam.',
  keywords: ['electrician in Kochi', 'plumber near Kakkanad', 'inverter installation cost Kerala']
};

export default async function BlogCatalogPage() {
  let blogs = MOCK_BLOGS;

  try {
    const { data: dbBlogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && dbBlogs && dbBlogs.length > 0) {
      blogs = dbBlogs.map(item => ({
        title: item.title,
        slug: item.slug,
        desc: item.seo_description || item.content.replace(/<[^>]*>/g, '').substring(0, 150),
        category: item.category,
        publishedAt: new Date(item.published_at || item.created_at).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        readTime: `${Math.ceil(item.content.split(/\s+/).length / 200)} min read`,
        tags: item.tags || []
      }));
    }
  } catch (err) {
    console.warn('Failed to fetch blogs from Supabase, using mock fallback:', err);
  }

  return (
    <main className="relative min-h-screen bg-surface">
      <Navbar />

      {/* Hero Catalog Header */}
      <section className="relative pt-32 pb-16 bg-surface-container-low border-b border-outline-variant/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <p className="text-primary font-bold text-xs uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full w-fit mx-auto">
            Kochi Authority Center
          </p>
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-on-background">
            Expert Home Engineering <span className="text-primary">Guides & Advice</span>
          </h1>
          <p className="text-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Highly-focused local search insights on electrical, plumbing, and inverter diagnostics, designed for homeowners who value precision, safety, and accountability in Kochi.
          </p>
        </div>
      </section>

      {/* dynamic articles list */}
      <section className="py-16 max-w-4xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 gap-8">
          {blogs.map((blog, idx) => (
            <article
              key={idx}
              className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-all spring-hover flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] text-secondary font-extrabold uppercase">
                  <span className="text-primary font-bold">{blog.category}</span>
                  <span>•</span>
                  <span>{blog.publishedAt}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-on-background leading-tight hover:text-primary transition-colors">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h2>
                <p className="text-secondary text-xs sm:text-sm leading-relaxed">
                  {blog.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-outline-variant/5">
                {blog.tags.map((t, tid) => (
                  <span key={tid} className="bg-surface-container-low text-secondary px-2.5 py-1 rounded-full text-[10px] font-bold">
                    🏷️ {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <EmergencyWidget />

      <Footer />

      <BottomNavBar />
    </main>
  );
}
