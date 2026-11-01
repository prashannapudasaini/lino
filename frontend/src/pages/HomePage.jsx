import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesPreview from '../components/home/ServicesPreview';
import FleetShowcase from '../components/home/FleetShowcase';
import WhyChooseUs from '../components/home/WhyChooseUs';
import AirportCoverage from '../components/home/AirportCoverage';

const HomePage = () => {
  return (
    <div className="relative overflow-x-hidden">
      {/* 1. Hero with integrated trust strip */}
      <HeroSection />

      {/* 2. Services Overview (Light background) */}
      <ServicesPreview />

      {/* 3. Featured Fleet Showcase (Dark background) */}
      <FleetShowcase />

      {/* 4. Why Choose Everest / Experience (Light background) */}
      <WhyChooseUs />

      {/* 5. Seamless Airport Transfers (Dark background) */}
      <AirportCoverage />
    </div>
  );
};

export default HomePage;
