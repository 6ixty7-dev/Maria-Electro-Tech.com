import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import BottomNavBar from '@/components/BottomNavBar';
import Footer from '@/components/Footer';
import EmergencyWidget from '@/components/EmergencyWidget';
import VoiceOfKochi from '@/components/VoiceOfKochi';
import { MASTER_SERVICES, KOCHI_LOCALITIES, CONTACT_INFO, ServiceProfile } from '@/lib/constants';

interface Locality {
  key: string;
  name: string;
  landmarks: string[];
  coordinates: { lat: number; lng: number };
}

// Function to parse the slug into service and locality
function parseSlug(slug: string): { service: ServiceProfile; locality: Locality } | null {
  const parts = slug.split('-');
  if (parts.length < 2) return null;

  // Find a matching service key by joining prefix parts
  // e.g. 'inverter-installation-kochi' has service 'inverter-installation' and locality 'kochi'
  let service: ServiceProfile | null = null;
  let locality: Locality | null = null;
  let localityKey = parts[parts.length - 1];
  let serviceKey = parts.slice(0, parts.length - 1).join('-');

  // Check if service exists
  if (MASTER_SERVICES[serviceKey]) {
    service = MASTER_SERVICES[serviceKey];
  } else {
    // Attempt fallback splitting (last 2 parts for locality or alternate names)
    // If the service has hyphens, check all suffixes
    for (let i = 1; i < parts.length; i++) {
      const sKey = parts.slice(0, i).join('-');
      const lKey = parts.slice(i).join('-');
      if (MASTER_SERVICES[sKey]) {
        service = MASTER_SERVICES[sKey];
        localityKey = lKey;
        break;
      }
    }
  }

  if (!service) return null;

  // Match locality key
  const matchedLocality = KOCHI_LOCALITIES.find(
    l => l.key === localityKey || l.key.replace('-', '') === localityKey.replace('-', '')
  );

  if (matchedLocality) {
    locality = matchedLocality;
  } else if (localityKey === 'kochi' || localityKey === 'ernakulam') {
    locality = {
      key: localityKey,
      name: localityKey === 'kochi' ? 'Kochi' : 'Ernakulam',
      landmarks: ['Edappally Junction', 'Lulu Mall', 'Vyttila Hub', 'InfoPark Kakkanad'],
      coordinates: CONTACT_INFO.mapCoordinates
    };
  }

  if (!service || !locality) return null;

  return { service, locality };
}

// Next.js Dynamic Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const match = parseSlug(slug);
  if (!match) return {};

  const { service, locality } = match;
  const title = `Premium ${service.category} in ${locality.name} | Maria Electro Tech Kochi`;
  const desc = `Certified local ${service.name.toLowerCase()} in ${locality.name}, Kochi. Experienced, licensed technicians, 45-60 min priority emergency dispatch, upfront pricing, 30-day warranty. Book instantly!`;

  return {
    title,
    description: desc,
    keywords: [
      `${service.key} ${locality.key}`,
      `${service.name.toLowerCase()} in ${locality.name.toLowerCase()}`,
      `best ${service.key} in ${locality.name.toLowerCase()}`,
      `licensed ${service.key} near me`,
      `ernakulam ${service.key} repair`
    ],
    openGraph: {
      title,
      description: desc,
      type: 'website',
      url: `${CONTACT_INFO.whatsapp}/${slug}`
    }
  };
}

export default async function ServiceLocalityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const match = parseSlug(slug);
  if (!match) notFound();

  const { service, locality } = match;

  // Locality-specific FAQ array
  const localFAQs = [
    {
      q: `How fast can your ${service.name.toLowerCase()} reach ${locality.name}?`,
      a: `For bookings in ${locality.name}, our dispatch center is strategically placed to route a certified technician to your address near ${locality.landmarks.slice(0, 2).join(' or ')} within 45 to 60 minutes in case of emergency failures.`
    },
    {
      q: `Do you charge a visiting fee for inspections in ${locality.name}?`,
      a: `No, we do not believe in surprise charges. Our basic service fee starts at a flat ₹${service.startsAt}. You receive a direct digital estimate of the repair before any work starts. You only pay for successful resolutions.`
    },
    {
      q: `What workmanship guarantees apply to services in ${locality.name}?`,
      a: `All our labor is backed by a 30-day structural workmanship guarantee. If the exact same issue recurs near ${locality.name} within 30 days, our uniformed technician returns to rectify it immediately without labor charges.`
    }
  ];

  // Dynamic JSON-LD structured schema script
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `Maria Electro Tech - ${service.name} ${locality.name}`,
    'description': `Certified local ${service.name.toLowerCase()} in ${locality.name}, Kochi. Backed by KSEB state licensing and a 30-day labor warranty.`,
    'telephone': CONTACT_INFO.phone,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': CONTACT_INFO.address,
      'addressLocality': locality.name,
      'addressRegion': 'Kerala',
      'postalCode': '682024',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': locality.coordinates.lat,
      'longitude': locality.coordinates.lng
    },
    'url': `https://mariaelectrotech.com/${slug}`,
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': locality.name
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `${service.name} Services`,
      'itemListElement': service.features.map((feat, idx) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': feat
        },
        'priceSpecification': {
          '@type': 'UnitPriceSpecification',
          'price': service.startsAt,
          'priceCurrency': 'INR'
        }
      }))
    }
  };

  return (
    <main className="relative min-h-screen bg-surface">
      {/* Injected JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* Hero / Header banner for the localized landing page */}
      <section className="relative pt-32 pb-16 bg-surface-container-low border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] animate-pulse">location_on</span>
              Standby in {locality.name}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight text-on-background tracking-tight">
              Premium <span className="text-primary">{service.name}</span> in <span className="text-primary">{locality.name}</span>
            </h1>
            <p className="text-secondary text-sm md:text-base leading-relaxed">
              Looking for a dependable, background-vetted specialist in {locality.name}, Kochi? Maria Electro Tech brings licensed, uniformed professionals backed by a 30-day labor warranty right to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={`https://wa.me/919847192829?text=Hello%20Maria%20Electro%20Tech,%20I%20need%20a%20${encodeURIComponent(service.name)}%20in%20${encodeURIComponent(locality.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary hover:bg-primary-container text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg spring-hover active:scale-95 transition-all"
              >
                Book {service.category} via WhatsApp
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                className="px-8 py-4 bg-white border border-outline-variant/30 text-primary rounded-2xl font-bold text-sm flex items-center justify-center gap-2 spring-hover active:scale-95 transition-all"
              >
                Call Dispatch Center
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-on-background">Kochi Locality Service Parameters</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-xl select-none shrink-0">speed</span>
                <div>
                  <h4 className="font-bold text-xs text-on-background">Estimated Arrival Time</h4>
                  <p className="text-[11px] text-secondary mt-0.5">
                    Within 45 to 60 minutes across {locality.name} neighborhoods (InfoPark, Lulu, or junctions).
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-xl select-none shrink-0">verified</span>
                <div>
                  <h4 className="font-bold text-xs text-on-background">Certified & Background Vetted</h4>
                  <p className="text-[11px] text-secondary mt-0.5">
                    State KSEB-licensing safety compliance and direct identity-vetted employees.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-xl select-none shrink-0">payments</span>
                <div>
                  <h4 className="font-bold text-xs text-on-background">Flat Pricing Structure</h4>
                  <p className="text-[11px] text-secondary mt-0.5">
                    Flat ₹{service.startsAt} baseline repair charges with a 30-day labor guarantee.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Emergency dispatch */}
      <EmergencyWidget />

      {/* service features detail */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-on-background">
              Why {locality.name} Homes Choose Our {service.category} Solutions
            </h2>
            <p className="text-secondary text-sm leading-relaxed">
              We understand the local electrical grids and sanitary water pressure levels specific to Ernakulam houses and luxury apartments. We operate with strict tidiness promises.
            </p>
            <ul className="space-y-3">
              {service.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-tertiary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-on-surface-variant leading-tight">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/25 space-y-4">
            <h3 className="font-bold text-base text-on-background">Coverage Radius in {locality.name}</h3>
            <p className="text-secondary text-xs leading-relaxed">
              Our dispatch vehicles patrol key anchors near {locality.name} to ensure fast response. We actively cover landmarks including:
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {locality.landmarks.map((mark, i) => (
                <span key={i} className="bg-white border border-outline-variant/30 text-secondary px-3.5 py-1.5 rounded-full text-[10px] font-bold">
                  📍 {mark}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verified Reviews */}
      <VoiceOfKochi />

      {/* Collapsible Local accordion FAQs */}
      <section className="py-16 bg-surface border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <h2 className="text-2xl font-display font-bold tracking-tight text-center text-on-background">
            FAQs for {service.category} Services in {locality.name}
          </h2>
          <div className="space-y-4">
            {localFAQs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-2">
                <h4 className="font-bold text-xs sm:text-sm text-on-background flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {faq.q}
                </h4>
                <p className="text-secondary text-xs sm:text-sm leading-relaxed pl-3.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <BottomNavBar />
    </main>
  );
}
