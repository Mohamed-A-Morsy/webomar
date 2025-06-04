import React, { useEffect, useState } from 'react';
import axiosInstance from "@/axiosConfig/instance";
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loader';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useTranslation } from 'react-i18next';

interface Picture {
  id: string;
  src: string;
  alt: string;
  img: string;
  imageExtension: string;
}

interface Category {
  id: number;
  name: string;
}

const Gallery: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [pics, setPics] = useState<Picture[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Set the number of images per page
  const [totalCount, setTotalCount] = useState(0);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("ImageCategory/GetAll");
      setCategories(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedCategory(response.data.data[0].id); // Set the first category as default
      }
    } catch (error) {
      console.error("Error fetching categories", error);
      setError("حدث خطأ أثناء تحميل الفئات.");
    }
  };

  const fetchPicsByCategory = async (categoryId: number, page: number, size: number) => {
    try {
      const response = await axiosInstance.get(`Image/GetImagesByCategory/${categoryId}?PageNumber=${page}&PageSize=${size}`);
      console.log(response.data.data)
      setPics(response.data.data.result);
      setTotalCount(response.data.data.totalCount); // Assuming the API returns total count
    } catch (error) {
      console.error("Error fetching images", error);
      setError("حدث خطأ أثناء تحميل الصور.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== null) {
      setLoading(true);
      fetchPicsByCategory(selectedCategory, currentPage, pageSize);
    }
  }, [selectedCategory, currentPage]);

  const totalPages = Math.ceil(totalCount / pageSize);

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
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category.id}
                  onClick={() => {
                    setCurrentPage(1); // Reset to the first page when changing category
                    setSelectedCategory(category.id);
                  }}
                  className={`mx-2 mb-2 ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-200'}`}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pics.map((image) => (
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

            <Pagination className='mb-11 mt-11'>
               {i18n.language === "ar" ? 
                                        <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} /> : 
                                        <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} /> }
              <PaginationContent dir='ltr'>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index + 1}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
              {i18n.language === "ar" ?
                                        <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />  : 
                                        <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
                                    }
            </Pagination>
          </>
        )}
      </div>
    </section>
  );
};

export default Gallery;
