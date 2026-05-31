import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import BottomNavBar from '@/components/BottomNavBar';
import Footer from '@/components/Footer';
import EmergencyWidget from '@/components/EmergencyWidget';
import { MOCK_BLOGS } from '../page';
import { CONTACT_INFO } from '@/lib/constants';
import { createClient } from '@supabase/supabase-js';

// Server-side safe Supabase JS client instantiation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface FullArticle {
  title: string;
  slug: string;
  desc: string;
  category: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  content: string;
  faqs: { q: string; a: string }[];
}

const FULL_ARTICLES: Record<string, FullArticle> = {
  'best-electrician-in-kochi-checklist': {
    title: 'Selecting the Best Electrician in Kochi: A Comprehensive Vetting Checklist',
    slug: 'best-electrician-in-kochi-checklist',
    desc: 'How to vet electrical contractors in Ernakulam. Learn about KSEB state licensing requirements, domestic safety vetting protocols, and transparent upfront quoting guides.',
    category: 'Electrical Safety',
    publishedAt: 'May 28, 2026',
    readTime: '5 min read',
    tags: ['electrician in Kochi', 'electrical repair in Ernakulam'],
    content: `
      <h2>The Importance of Professional Vetting in Ernakulam</h2>
      <p>When looking for an <strong>electrician in Kochi</strong>, the first rule of home maintenance is never to sacrifice safety for cost. High-voltage domestic short circuits represent a primary fire hazard in Ernakulam residential districts. Procuring certified professional support is paramount to shielding your family and assets.</p>

      <h3>1. Verify the Kerala KSEB State Licensing</h3>
      <p>Always confirm that the dispatching agency or individual technician holds verified accredited licenses. Certified technicians possess deep comprehension of domestic grid parameters and phase balancing, preventing future power surges.</p>

      <h3>2. Insist on Flat, Upfront Price Estimations</h3>
      <p>Generic contractors often hook customers with low visiting fees only to charge inflated labor rates once the distribution board is disassembled. Always prioritize agencies like Maria Electro Tech that practice strict upfront price declarations before any screwdrivers are touched.</p>

      <h3>3. Look for Workmanship Guarantees</h3>
      <p>Accountable electrical repair in Ernakulam must be backed by structural labor warranties. A standard 30-day structural guarantee indicates that the contractor stands behind their technical calibrations and respects your home.</p>
    `,
    faqs: [
      {
        q: 'Why is KSEB licensing critical for domestic electrical repair in Kochi?',
        a: 'Formal state licensing ensures the electrician has passed rigorous technical exams and understands safety codes, preventing hazardous wiring configurations.'
      },
      {
        q: 'How do I handle emergency power failures in Ernakulam?',
        a: 'Contact Maria Electro Tech central dispatches immediately. We maintain standby mobile units that typically arrive within 45 to 60 minutes.'
      }
    ]
  },
  'inverter-installation-cost-kerala-guide': {
    title: 'Understanding Domestic Inverter and UPS Installation Costs in Kerala',
    slug: 'inverter-installation-cost-kerala-guide',
    desc: 'Calculating domestic battery capacity loads and sizing metrics. An in-depth price analysis of concealed UPS rewiring and battery safety standards in Kerala homes.',
    category: 'Power Backup',
    publishedAt: 'May 15, 2026',
    readTime: '6 min read',
    tags: ['inverter installation cost Kerala', 'home backup solutions'],
    content: `
      <h2>Calculating Your Domestic Backup Sizing Metrics</h2>
      <p>With frequent summer load sheddings, calculating your exact <strong>inverter installation cost Kerala</strong> parameters will prevent complete household blackout stutters. Power backups are no longer luxury additions; they are essential systems for modern homes.</p>

      <h3>1. Standard Domestic Load Computations</h3>
      <p>Before installing batteries, count the absolute wattage required to power your critical appliances (fans, LED lights, computer routers). Sizing calculators help choose between a 900VA standard UPS or a larger 1500VA double-battery system.</p>

      <h3>2. Concealed UPS Double-Line Rewiring Costs</h3>
      <p>A major element of inverter installation costs in Kerala is the internal electrical panel rewiring. Separating critical load lines from heavy power sockets (ACs, geysers) requires precision work by licensed technicians to avoid DB bypass short circuits.</p>

      <h3>3. Quality Battery Water & Safeties</h3>
      <p>Ensure your utility room is well-ventilated. Standard tubular batteries require periodic distilled water top-ups and terminal cleaning to prolong life and ensure safety.</p>
    `,
    faqs: [
      {
        q: 'What is the average inverter installation cost in Kerala for a standard home?',
        a: 'The flat baseline service and panels rewiring by Maria Electro Tech starts at ₹499, excluding battery and inverter system costs which vary by capacity.'
      },
      {
        q: 'Can an inverter power an Air Conditioner in Kochi?',
        a: 'Standard domestic home inverters (900VA) cannot support AC loads. Heavy inductive loads require premium high-capacity solar hybrids or custom setups.'
      }
    ]
  },
  'detect-water-leaks-plumber-near-kakkanad': {
    title: 'How to Detect and Fix Hidden Water Leaks: Vetting a Plumber near Kakkanad',
    slug: 'detect-water-leaks-plumber-near-kakkanad',
    desc: 'Acoustic leak detection and plumbing diagnostics. Essential steps Kakkanad homeowners should follow before booking emergency plumbers near InfoPark or Rajagiri.',
    category: 'Plumbing Guides',
    publishedAt: 'May 02, 2026',
    readTime: '4 min read',
    tags: ['plumber near Kakkanad', 'leak detection Kochi'],
    content: `
      <h2>Solving Silent Water Damage in Kakkanad Estates</h2>
      <p>Finding a reliable <strong>plumber near Kakkanad</strong> can represent a significant challenge given the rapid growth of high-rise luxury apartments and duplex villas near InfoPark and Rajagiri. Silent internal pipe cracks represent a primary threat to ceiling concrete durability.</p>

      <h3>1. Identifying Silent Internal Pipeline Fractures</h3>
      <p>If your Ernakulam water utility bill rises unexpectedly, turn off all taps and inspect your master meter dials. If the dial rotates, you hold a concealed pipeline leak that requires acoustic diagnostic checks immediately.</p>

      <h3>2. Essential Questions to Ask Local Kakkanad Plumbers</h3>
      <p>Before allowing plumbers to break ceiling tiling, always inquire about their diagnostic equipment. Professional plumbers utilize thermal imagers or acoustic detectors instead of random hammer breaking, protecting your home surfaces.</p>

      <h3>3. 30-Day Labor Warranties</h3>
      <p>Ensure that bathroom sanitaryware replacements and joint sealant applications are backed by workmanship warranties to secure accountability against shoddy fixes.</p>
    `,
    faqs: [
      {
        q: 'How fast can a plumber reach Kakkanad InfoPark residential zones?',
        a: 'Maria Electro Tech dispatches mobile plumbers near Kakkanad with rapid priority emergency response in 45-60 minutes.'
      },
      {
        q: 'Are materials included in your basic plumbing prices?',
        a: 'No, our basic diagnostic and labor visit starts at ₹199. Materials are sourced transparently and invoiced with absolute accountability.'
      }
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  let title = '';
  let desc = '';
  let tags: string[] = [];

  try {
    const { data: dbBlog } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (dbBlog) {
      title = `${dbBlog.title} | Kochi Local SEO Guides`;
      desc = dbBlog.seo_description || dbBlog.content.replace(/<[^>]*>/g, '').substring(0, 150);
      tags = dbBlog.tags || [];
    }
  } catch (e) {
    console.warn('Metadata server query skipped, using fallback:', e);
  }

  if (!title) {
    const article = FULL_ARTICLES[slug];
    if (article) {
      title = `${article.title} | Kochi Local SEO Guides`;
      desc = article.desc;
      tags = article.tags;
    }
  }

  if (!title) return {};

  return {
    title,
    description: desc,
    keywords: tags
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let article: FullArticle | null = null;

  try {
    const { data: dbBlog } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (dbBlog) {
      article = {
        title: dbBlog.title,
        slug: dbBlog.slug,
        desc: dbBlog.seo_description || '',
        category: dbBlog.category,
        publishedAt: new Date(dbBlog.published_at || dbBlog.created_at).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        readTime: `${Math.ceil(dbBlog.content.split(/\s+/).length / 200)} min read`,
        tags: dbBlog.tags || [],
        content: dbBlog.content,
        faqs: [
          {
            q: `Are the services discussed in this guide available near Kochi?`,
            a: `Yes, absolutely. Maria Electro Tech offers KSEB-licensed, background-vetted dispatches near Kakkanad, Edappally, Vyttila, Aluva, Palarivattom, and all other Ernakulam neighborhoods.`
          },
          {
            q: `How do I book a certified technician?`,
            a: `You can instantly book a technician via WhatsApp or phone. Maria Electro Tech dispatch units typically respond within 45 to 60 minutes for priority emergencies.`
          }
        ]
      };
    }
  } catch (err) {
    console.warn('Blog Detail dynamic fetch failed, using offline fallback:', err);
  }

  if (!article) {
    article = FULL_ARTICLES[slug];
  }

  if (!article) notFound();

  // Dynamic FAQ schema script injection
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': article.faqs.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.a
      }
    }))
  };

  return (
    <main className="relative min-h-screen bg-surface">
      {/* Injected FAQ Page JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* Article Header */}
      <article className="pt-32 pb-16 max-w-3xl mx-auto px-6">
        <div className="space-y-6 border-b border-outline-variant/20 pb-8 mb-10">
          <div className="flex items-center gap-3 text-[10px] text-secondary font-extrabold uppercase select-none">
            <span className="text-primary font-bold">{article.category}</span>
            <span>•</span>
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight text-on-background tracking-tight">
            {article.title}
          </h1>
          <p className="text-secondary text-xs sm:text-sm italic leading-relaxed">
            {article.desc}
          </p>
        </div>

        {/* Article Content - Clean High-Contrast Typography */}
        <div 
          className="prose prose-sm sm:prose max-w-none text-on-surface-variant leading-relaxed text-xs sm:text-sm space-y-6 
            [&>h2]:text-lg [&>h2]:sm:text-xl [&>h2]:font-bold [&>h2]:text-on-background [&>h2]:pt-6
            [&>h3]:text-sm [&>h3]:sm:text-base [&>h3]:font-bold [&>h3]:text-on-background [&>h3]:pt-4
            [&>p]:text-secondary [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Dynamic Inline Services internal linking pathways */}
        <div className="mt-12 p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30 space-y-4">
          <h4 className="font-bold text-xs sm:text-sm text-on-background">Need Trusted Assistance?</h4>
          <p className="text-secondary text-xs leading-relaxed">
            Don't risk amateur fixes. Maria Electro Tech offers licensed, background-vetted dispatches throughout Ernakulam. Check out our certified services:
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/services/electrician" className="text-xs font-bold text-primary underline hover:text-primary-container">
              KSEB-Licensed Electrician
            </a>
            <span>•</span>
            <a href="/services/plumber" className="text-xs font-bold text-primary underline hover:text-primary-container">
              Expert Plumbing Diagnostics
            </a>
            <span>•</span>
            <a href="/services/inverter-installation" className="text-xs font-bold text-primary underline hover:text-primary-container">
              Battery UPS Installation
            </a>
          </div>
        </div>

        {/* Localized FAQ Schema Markup View */}
        <div className="mt-12 pt-8 border-t border-outline-variant/20 space-y-6">
          <h3 className="text-lg font-bold text-on-background">Quick Reference Guide</h3>
          <div className="space-y-4">
            {article.faqs.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-2">
                <h4 className="font-bold text-xs sm:text-sm text-on-background flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {f.q}
                </h4>
                <p className="text-secondary text-xs sm:text-sm leading-relaxed pl-3.5">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <EmergencyWidget />

      <Footer />

      <BottomNavBar />
    </main>
  );
}
