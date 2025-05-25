import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsSection from "@/components/NewsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AdsSection from "@/components/AdsSection";
import SocialActivitiesSection from "@/components/SocialActivitiesSection";
import AdsPanner from "@/components/AdsPanner";

const Index = () => {
  return (
    <>
      <HeroSection />
      <NewsSection />
      <ActivitiesSection />
      <SocialActivitiesSection />
      <AdsSection />
      <GallerySection />
      <ContactSection />
    </>
  );
};

export default Index;
