import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesPreview from '../components/home/ServicesPreview';
import FleetShowcase from '../components/home/FleetShowcase';
import WhyChooseUs from '../components/home/WhyChooseUs';
import AirportCoverage from '../components/home/AirportCoverage';

const HomePage = () => {
  return (
    <div className="relative overflow-x-hidden bg-[#0B0B0C] text-white">
      {/* 1. Hero with Jet, Chauffeur, Mercedes S-Class, Trust Bar & Scroll Indicator */}
      <HeroSection />

      {/* 2. Our Services (Light Background #F7F5F0, 2-column header, 4 luxury service cards) */}
      <ServicesPreview />

      {/* 3. Our Fleet (Dark #0B0B0C, Cadillac Escalade front, Executive Sedan & Luxury SUV cards) */}
      <FleetShowcase />

      {/* 4. Why Choose Everest (Light #F7F5F0, 4 circular features, rear leather cabin passenger) */}
      <WhyChooseUs />

      {/* 5. Airport Transportation (Dark #0B0B0C, Runway backdrop, 5 airport glass cards: MDT, PHL, JFK, LGA, EWR) */}
      <AirportCoverage />
    </div>
  );
};

export default HomePage;
