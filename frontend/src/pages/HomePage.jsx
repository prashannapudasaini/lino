import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TrustBar from '../components/home/TrustBar';
import ServicesPreview from '../components/home/ServicesPreview';
import FleetShowcase from '../components/home/FleetShowcase';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Available247Bar from '../components/home/Available247Bar';
import AirportCoverage from '../components/home/AirportCoverage';
import HowItWorks from '../components/home/HowItWorks';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaBanner from '../components/home/CtaBanner';

const HomePage = () => {
  return (
    <div className="relative overflow-x-hidden bg-[#0B0B0C] text-white">
      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. Trusted Client Logos & 4 Feature Values */}
      <TrustBar />

      {/* 3. Our Services (Luxury Panoramic Interior + 3-Column Editorial Layout) */}
      <ServicesPreview />

      {/* 4. Featured Automotive Fleet Showcase */}
      <FleetShowcase />

      {/* 5. Why Choose Everest (Dramatic Himalayan Mountain Panorama Backdrop + 3 Gold Metrics) */}
      <WhyChooseUs />

      {/* 6. Available 24/7 Strip */}
      <Available247Bar />

      {/* 7. Seamless Airport Transfers (MDT, PHL, JFK, LGA, EWR) */}
      <AirportCoverage />

      {/* 8. Four-Step Booking Process */}
      <HowItWorks />

      {/* 9. Testimonials (Atmospheric Alpine Mountain Twilight Backdrop) */}
      <TestimonialsSection />

      {/* 10. Final Call to Action */}
      <CtaBanner />
    </div>
  );
};

export default HomePage;
