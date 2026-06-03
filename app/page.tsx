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
      <div className="absolute top-[8%] left-[-15%] w-[280px] sm:w-[450px] md:w-[600px] h-[280px] sm:h-[450px] md:h-[600px] bg-primary/4 rounded-full blur-[80px] sm:blur-[100px] md:blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[32%] right-[-15%] w-[300px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[500px] md:h-[700px] bg-primary/4 rounded-full blur-[80px] sm:blur-[110px] md:blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[60%] left-[-15%] w-[280px] sm:w-[480px] md:w-[650px] h-[280px] sm:h-[480px] md:h-[650px] bg-primary/4 rounded-full blur-[80px] sm:blur-[100px] md:blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[82%] right-[-10%] w-[280px] sm:w-[450px] md:w-[600px] h-[280px] sm:h-[450px] md:h-[600px] bg-primary/3 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none -z-10" />

      {/* Dynamic Floating Glass Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <HeroSection />

      {/* Google verified customer testimonials */}
      <VoiceOfKochi />

      {/* Dedicated Emergency Dispatch Support Banner */}
      <EmergencyWidget />

      {/* Kochi Local Trust Safety & Accreditation */}
      <WhyKochiTrustsSection />

      {/* Grounded Service Cards Grid */}
      <ServicesGrid />

      {/* Transparent Price Packages */}
      <PricingSection />

      {/* 3-Step Workmanship Process explaining how it works */}
      <RealProcessSection />

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
