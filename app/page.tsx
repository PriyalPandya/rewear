'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { TransformationGallery } from '@/components/transformations/TransformationGallery';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { GarmentFinder } from '@/components/sections/GarmentFinder';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { SustainabilitySection } from '@/components/sections/SustainabilitySection';
import { FeaturedStories } from '@/components/sections/FeaturedStories';
import { CustomerStories } from '@/components/sections/CustomerStories';
import { FAQSection } from '@/components/sections/FAQSection';
import { Footer } from '@/components/layout/Footer';
import { EnquiryModal } from '@/components/forms/EnquiryModal';
import { EnquiryLookupModal } from '@/components/forms/EnquiryLookupModal';
import { EnquiryFormData } from '@/lib/validations/enquiry';

export default function HomePage() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);
  const [enquiryPrefill, setEnquiryPrefill] = useState<Partial<EnquiryFormData> | undefined>(undefined);

  const handleOpenEnquiry = (prefill?: Partial<EnquiryFormData>) => {
    setEnquiryPrefill(prefill);
    setIsEnquiryModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryModalOpen(false);
    setEnquiryPrefill(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EF] text-[#252824]">
      {/* 1. Header & Navigation */}
      <Navbar
        onOpenEnquiry={handleOpenEnquiry}
        onOpenLookup={() => setIsLookupModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection onOpenEnquiry={handleOpenEnquiry} />

        {/* 3. Transformation Before & After Gallery */}
        <TransformationGallery onOpenEnquiry={handleOpenEnquiry} />

        {/* 4. Atelier Services Section */}
        <ServicesSection onOpenEnquiry={handleOpenEnquiry} />

        {/* 5. Interactive Garment Transformation Finder */}
        <GarmentFinder onOpenEnquiry={handleOpenEnquiry} />

        {/* 6. How It Works 4-Step Process */}
        <HowItWorks onOpenEnquiry={handleOpenEnquiry} />

        {/* 7. Why Choose ReWear & Fast-Fashion Comparison */}
        <WhyChooseUs />

        {/* 8. Sustainability & Circularity Manifesto */}
        <SustainabilitySection />

        {/* 9. Editorial Featured Stories */}
        <FeaturedStories onOpenEnquiry={handleOpenEnquiry} />

        {/* 10. Illustrative Customer Experiences */}
        <CustomerStories />

        {/* 11. Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* 12. Final Call-to-Action & Footer */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Interactive Modals */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={handleCloseEnquiry}
        initialData={enquiryPrefill}
      />

      <EnquiryLookupModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
      />
    </div>
  );
}
