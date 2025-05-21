
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">نادي الرياضة الأول</h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            عراقة وتاريخ منذ ١٩٤٥، نسعى دائما للتميز والإنجازات في جميع المجالات الرياضية.
            انضم إلينا الآن واكتشف عالم النادي المميز.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-accent hover:bg-accent-dark text-secondary font-bold">انضم الآن</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">جولة في النادي</Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="text-center">
              <p className="text-3xl font-bold">٧٨</p>
              <p className="text-sm opacity-75">عام من التاريخ</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">١٢٥</p>
              <p className="text-sm opacity-75">بطولة محلية</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">٤٥</p>
              <p className="text-sm opacity-75">بطولة دولية</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">٥٠٠٠+</p>
              <p className="text-sm opacity-75">عضو نشط</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
