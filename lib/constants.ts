// Allowed Admin phone numbers for PIN-based Dashboard entrance
export const ALLOWED_ADMIN_PHONES = [
  '+919847192829', // Primary admin: Maria Electro Tech
];

// 4-digit admin PIN — change this to update access credentials
export const ADMIN_PIN = '9648';

// Legacy email whitelist (kept for reference, PIN auth is primary now)
export const ALLOWED_USERS: string[] = [];

// Kochi Localities / Neighborhoods
export const KOCHI_LOCALITIES = [
  {
    key: 'kakkanad',
    name: 'Kakkanad',
    landmarks: ['InfoPark', 'Rajagiri Campus', 'Kakkanad Junction', 'Collectorate'],
    coordinates: { lat: 10.0159, lng: 76.3419 }
  },
  {
    key: 'edappally',
    name: 'Edappally',
    landmarks: ['Lulu Mall', 'Edappally Toll', 'Amrita Hospital', 'Junction'],
    coordinates: { lat: 10.0261, lng: 76.3079 }
  },
  {
    key: 'vyttila',
    name: 'Vyttila',
    landmarks: ['Vyttila Mobility Hub', 'Gold Souk', 'Decathlon', 'Janatha'],
    coordinates: { lat: 9.9674, lng: 76.3216 }
  },
  {
    key: 'palarivattom',
    name: 'Palarivattom',
    landmarks: ['Palarivattom Junction', 'Pipeline Road', 'Civil Line Road'],
    coordinates: { lat: 10.0039, lng: 76.3073 }
  },
  {
    key: 'panampilly-nagar',
    name: 'Panampilly Nagar',
    landmarks: ['Panampilly Park', 'Main Avenue', 'Kadavanthra', 'KV Junction'],
    coordinates: { lat: 9.9616, lng: 76.2929 }
  },
  {
    key: 'aluva',
    name: 'Aluva',
    landmarks: ['Aluva Rajiv Gandhi Jetty', 'Manappuram', 'Metro Station', 'KSRTC Stand'],
    coordinates: { lat: 10.1076, lng: 76.3496 }
  },
  {
    key: 'fort-kochi',
    name: 'Fort Kochi',
    landmarks: ['Chinese Fishing Nets', 'Vasco da Gama Square', 'Santa Cruz Basilica'],
    coordinates: { lat: 9.9642, lng: 76.2427 }
  },
  {
    key: 'tripunithura',
    name: 'Tripunithura',
    landmarks: ['Hill Palace', 'Sree Poornathrayeesa Temple', 'Statue Junction'],
    coordinates: { lat: 9.9487, lng: 76.3475 }
  },
  {
    key: 'kadavanthra',
    name: 'Kadavanthra',
    landmarks: ['Kadavanthra Junction', 'Gandhinagar', 'Elamkulam'],
    coordinates: { lat: 9.9678, lng: 76.2965 }
  }
];

// Master Services Profiles
export interface ServiceProfile {
  key: string;
  name: string;
  category: string;
  title: string;
  description: string;
  startsAt: number;
  icon: string;
  features: string[];
}

export const MASTER_SERVICES: Record<string, ServiceProfile> = {
  'electrician': {
    key: 'electrician',
    name: 'Electrical Solutions',
    category: 'Electrical',
    title: 'Certified Electrician Services in Kochi',
    description: 'Smart rewiring, short-circuit troubleshooting, fancy light fittings, and safety inspections by certified local Kerala electricians.',
    startsAt: 299,
    icon: 'bolt',
    features: [
      'Complete home electrical diagnostics & short circuit fixing',
      'Installation of luxury chandeliers, premium switches, and smart home modules',
      'Certified DB board modifications & phase balancing',
      'Accountable, clean, and transparent billing system'
    ]
  },
  'plumber': {
    key: 'plumber',
    name: 'Plumbing Engineering',
    category: 'Plumbing',
    title: 'Professional Plumbing Services in Kochi',
    description: 'High-fidelity leak detection, luxury bathroom fittings, pressure pump calibrations, and drainage repairs.',
    startsAt: 199,
    icon: 'plumbing',
    features: [
      'Precision acoustic leak detection & internal pipe fixing',
      'Installation of premium sanitaryware (faucets, shower mixers, wall-hung toilets)',
      'Water pressure pump setup & pipeline scaling clearance',
      'Rapid response systems for burst pipe emergencies'
    ]
  },
  'inverter-installation': {
    key: 'inverter-installation',
    name: 'Power Backup & Inverters',
    category: 'Inverter',
    title: 'Premium Inverter & Battery Solutions in Kochi',
    description: 'Load calculations, neat UPS installations, clean wire management, and periodic battery health checkups.',
    startsAt: 499,
    icon: 'battery_charging_full',
    features: [
      'Accurate domestic load assessment & battery sizing calculations',
      'Pristine installation with concealed clean cabling runs',
      'Double-line bypass wiring & surge protector setups',
      'Annual maintenance checks & battery water replenishment'
    ]
  },
  'cctv-setup': {
    key: 'cctv-setup',
    name: 'Smart Surveillance & CCTV',
    category: 'CCTV',
    title: 'Smart CCTV Camera Installations in Kochi',
    description: 'High-definition camera mounts, secure storage configurations, mobile remote app integrations, and wire routing.',
    startsAt: 999,
    icon: 'videocam',
    features: [
      'Strategic camera placement grids to eliminate blind spots',
      'Secure high-end NVR/DVR storage server initialization',
      'Remote app sync for 24/7 smartphone viewing from anywhere',
      'Neat aesthetic casing-capping wire shielding'
    ]
  },
  'home-maintenance': {
    key: 'home-maintenance',
    name: 'Annual Maintenance Contracts (AMC)',
    category: 'Maintenance',
    title: 'Comprehensive Home Maintenance Plans in Kochi',
    description: 'Complete home maintenance protection plans with routine checkups, priority emergency dispatches, and structured service accountability.',
    startsAt: 4999,
    icon: 'home_repair_service',
    features: [
      'Four scheduled preventive maintenance visits per year',
      'Priority emergency dispatch across Ernakulam district',
      'Covers routine electrical inspections, switch checks, and faucet servicing',
      'Discounted materials & structured service accountability records'
    ]
  }
};

// Local Contact Details
export const CONTACT_INFO = {
  phone: '+91 98471 92829',
  whatsapp: 'https://wa.me/919847192829?text=Hello%20Maria%20Electro%20Tech,%20I%20would%20like%20to%20book%20a%20service.',
  email: 'support@mariaelectrotech.com',
  address: 'S.A. Road, Valanjambalam, Kochi, Kerala 682016',
  mapCoordinates: { lat: 9.9816, lng: 76.2999 }
};

// Trust Badges & Local Commitments
export const TRUST_BADGES = [
  { icon: 'bolt', title: 'Fast Response Support', desc: 'Priority emergency dispatch across Ernakulam district' },
  { icon: 'verified_user', title: 'Skilled & Verified Pros', desc: 'Experienced, background-checked technicians on every job' },
  { icon: 'payments', title: 'Transparent Pricing', desc: 'No hidden visit charges or surprise invoicing' },
  { icon: 'engineering', title: 'Professional Standards', desc: 'Quality workmanship with accountability on every project' }
];
