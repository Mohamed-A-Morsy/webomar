
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Stadium background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1577223625816-5d0b29236321?q=80&w=2070&auto=format&fit=crop)', 
          backgroundPosition: 'center 30%' 
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-secondary bg-opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative h-full flex items-center">
        <div className="text-white max-w-2xl p-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4"> مركز التنمية الشبابية بالجزيرة</h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            عراقة وتاريخ منذ ١٩٤٥، نسعى دائما للتميز والإنجازات في جميع المجالات الرياضية.
            انضم إلينا الآن واكتشف عالم النادي المميز.
          </p>
       
          
         
         
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
