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
    <main className="relative min-h-screen bg-[#faf9fe] overflow-x-hidden">
      {/* Seamless Continuous Background Gradient Canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf9fe] via-[#f4f3f8] to-[#ffffff] pointer-events-none -z-10" />

      {/* Multi-stage High-Performance Background Glow Accents */}
      <div className="absolute top-[8%] left-[-15%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-primary/4 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[32%] right-[-15%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-primary/4 rounded-full blur-[110px] sm:blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[60%] left-[-15%] w-[480px] sm:w-[650px] h-[480px] sm:h-[650px] bg-primary/4 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[82%] right-[-10%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-primary/3 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none -z-10" />

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
