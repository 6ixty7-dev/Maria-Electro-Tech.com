import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import BottomNavBar from '@/components/BottomNavBar';
import Footer from '@/components/Footer';
import EmergencyWidget from '@/components/EmergencyWidget';
import VoiceOfKochi from '@/components/VoiceOfKochi';
import { MASTER_SERVICES, CONTACT_INFO } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = MASTER_SERVICES[slug];
  if (!service) return {};

  const title = `Premium ${service.name} in Kochi | Licensed ${service.category} Repairs`;
  const desc = `${service.description} Fast dispatch in Ernakulam. Upfront prices, background-checked KSEB electricians and plumbers with a 30-day labor warranty.`;

  return {
    title,
    description: desc,
    keywords: [
      `kochi ${service.key}`,
      `best ${service.name.toLowerCase()} in kochi`,
      `licensed ${service.category.toLowerCase()}`,
      `ernakulam ${service.key} contract`
    ],
    openGraph: {
      title,
      description: desc,
      type: 'website'
    }
  };
}

export default async function ServiceProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = MASTER_SERVICES[slug];
  if (!service) notFound();

  return (
    <main className="relative min-h-screen bg-surface">
      <Navbar />

      {/* Service Header Banner */}
      <section className="relative pt-32 pb-16 bg-surface-container-low border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] animate-pulse">{service.icon}</span>
              Kochi Professional Grade
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight text-on-background">
              Premium <span className="text-primary">{service.name}</span>
            </h1>
            <p className="text-secondary text-sm md:text-base leading-relaxed">
              {service.description} Backed by KSEB state licensing, verified professional checklists, and a clean workmanship guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={`https://wa.me/919847192829?text=Hello%20Maria%20Electro%20Tech,%20I%20would%20like%20to%20book%20a%20technician%20for%20${encodeURIComponent(service.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary hover:bg-primary-container text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg spring-hover active:scale-95 transition-all"
              >
                Book Service via WhatsApp
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                className="px-8 py-4 bg-white border border-outline-variant/30 text-primary rounded-2xl font-bold text-sm flex items-center justify-center gap-2 spring-hover active:scale-95 transition-all"
              >
                Call Support Team
              </a>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">{service.icon}</span>
              </div>
              <div>
                <p className="text-[10px] text-secondary font-bold leading-none">Baseline Service Price</p>
                <p className="font-extrabold text-xl text-primary mt-1">Starts at ₹{service.startsAt}</p>
              </div>
            </div>

            <h4 className="font-extrabold text-xs uppercase tracking-wider text-on-background border-t border-outline-variant/10 pt-4">
              Workmanship & Safety Checklist
            </h4>
            <ul className="space-y-3">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-tertiary text-lg mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span className="text-xs text-on-surface-variant leading-tight">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Emergency dispatch */}
      <EmergencyWidget />

      {/* Testimonials */}
      <VoiceOfKochi />

      <Footer />

      <BottomNavBar />
    </main>
  );
}
