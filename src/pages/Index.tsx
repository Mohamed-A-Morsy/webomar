import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsSection from "@/components/NewsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import VideoSection from "@/components/VideoSection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <NewsSection />
      <ActivitiesSection />
      <GallerySection />
      <VideoSection />
      <ContactSection />
    </>
  );
};

export default Index;
