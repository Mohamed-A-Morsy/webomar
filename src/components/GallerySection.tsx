
import React from 'react';
import { Button } from '@/components/ui/button';

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1508098682722-e99c1a7329d0?q=80&w=1000&auto=format&fit=crop",
    alt: "ملعب النادي",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
    alt: "تدريبات الفريق",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=1000&auto=format&fit=crop",
    alt: "أكاديمية الشباب",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1502904550040-7534597429ae?q=80&w=1000&auto=format&fit=crop",
    alt: "بطولة كأس النادي",
  },
];

const GallerySection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary mb-4">معرض الصور</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            لحظات مميزة من أنشطة وفعاليات النادي المختلفة
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-lg h-48 md:h-64 group relative cursor-pointer">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button className="bg-primary hover:bg-primary-dark text-white">
            المزيد من الصور
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
