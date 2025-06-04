import React, { useEffect, useState } from 'react';
import axiosInstance from "@/axiosConfig/instance";
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react'; // Assuming you have Lucide or similar icon library
import LoadingSpinner from '@/components/ui/loader';

interface Picture {
  id: string;
  src: string;
  alt: string;
  img: string;
  imageExtension: string;
}

const Gallery: React.FC = () => {
  const [pics, setPics] = useState<Picture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchPics = async () => {
      try {
        const response = await axiosInstance.get("Image/GetAll");
        setPics(response.data.data.image);
      } catch (error) {
        console.error("Error fetching images", error);
        setError("حدث خطأ أثناء تحميل الصور.");
      } finally {
        setLoading(false);
      }
    };
    fetchPics();
  }, []);
  

  console.log(pics)

  const displayedPics = showAll ? pics : pics.slice(0, 8);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary mb-4">معرض الصور</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            لحظات مميزة من أنشطة وفعاليات النادي المختلفة
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <LoadingSpinner/>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {displayedPics.map((image) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-lg h-48 md:h-64 group relative cursor-pointer"
                >
                  <img
                    src={`data:image/${image.imageExtension};base64,${image.img}`}
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

                {pics.length > 6 && (
              <div className="text-center mt-8">
                <Button
                  className="bg-primary hover:bg-primary-dark text-white"
                  onClick={() => setShowAll((prev) => !prev)}
                >
                  {showAll ? 'عرض أقل' : 'عرض المزيد'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Gallery;
