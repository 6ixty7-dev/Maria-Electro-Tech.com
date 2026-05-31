import Navbar from '@/components/Navbar';
import BottomNavBar from '@/components/BottomNavBar';
import HeroSection from '@/components/HeroSection';
import WhyKochiTrustsSection from '@/components/WhyKochiTrustsSection';
import RealProcessSection from '@/components/RealProcessSection';
import ServicesGrid from '@/components/ServicesGrid';
import EmergencyWidget from '@/components/EmergencyWidget';
import PricingSection from '@/components/PricingSection';
import VoiceOfKochi from '@/components/VoiceOfKochi';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-surface">
      {/* Dynamic Floating Glass Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <HeroSection />

      {/* Dedicated Emergency Dispatch Support Banner */}
      <EmergencyWidget />

      {/* Grounded Service Cards Grid */}
      <ServicesGrid />

      {/* Kochi Local Trust Safety & Accreditation */}
      <WhyKochiTrustsSection />

      {/* 3-Step Workmanship Process explaining how it works */}
      <RealProcessSection />

      {/* Transparent Price Packages */}
      <PricingSection />

      {/* Google verified customer testimonials */}
      <VoiceOfKochi />

      {/* Collapsible Accordion FAQs */}
      <FAQSection />

      {/* Lead forms, Call details, & Ernakulam coordinates maps */}
      <ContactSection />

      {/* Footer directories */}
      <Footer />

      {/* Mobile-only app-like bottom navigation menu */}
      <BottomNavBar />
    </main>
  );
}
