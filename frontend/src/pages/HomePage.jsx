import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TrustBar from '../components/home/TrustBar';
import ServicesPreview from '../components/home/ServicesPreview';
import FleetShowcase from '../components/home/FleetShowcase';
import WhyChooseUs from '../components/home/WhyChooseUs';
import AirportCoverage from '../components/home/AirportCoverage';
import ServiceAreasMap from '../components/home/ServiceAreasMap';
import HowItWorks from '../components/home/HowItWorks';
import ExperienceValues from '../components/home/ExperienceValues';
import CtaBanner from '../components/home/CtaBanner';

const HomePage = () => {
  return (
    <div className="relative">
      <HeroSection />
      <TrustBar />
      <ServicesPreview />
      <FleetShowcase />
      <WhyChooseUs />
      <AirportCoverage />
      <ServiceAreasMap />
      <HowItWorks />
      <ExperienceValues />
      <CtaBanner />
    </div>
  );
};

export default HomePage;
