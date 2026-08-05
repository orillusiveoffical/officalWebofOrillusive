import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { FeaturedProductsSection } from '../components/sections/FeaturedProductsSection';
import { CapabilitiesSection } from '../components/sections/CapabilitiesSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { TechStackSection } from '../components/sections/TechStackSection';
import { WhyOrillusiveSection } from '../components/sections/WhyOrillusiveSection';
import { PhilosophySection } from '../components/sections/PhilosophySection';
import { CallToActionSection } from '../components/sections/CallToActionSection';

interface HomePageProps {
  onOpenInquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenInquiry }) => {
  return (
    <div className="bg-[#F7F7F5] text-[#111111] font-sans selection:bg-[#4F6B85] selection:text-white">
      <HeroSection onOpenInquiry={onOpenInquiry} />
      <AboutSection />
      <FeaturedProductsSection onOpenInquiry={onOpenInquiry} />
      <CapabilitiesSection />
      <ServicesSection />
      <ProcessSection />
      <TechStackSection />
      <WhyOrillusiveSection />
      <PhilosophySection />
      <CallToActionSection onOpenInquiry={onOpenInquiry} />
    </div>
  );
};

export default HomePage;
