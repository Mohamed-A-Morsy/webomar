import React, { useEffect, useState } from 'react';
import axiosInstance from "@/axiosConfig/instance";
import { Button } from '@/components/ui/button';
import LoadingSpinner from '../components/ui/loader';
import { useTranslation } from "react-i18next";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";


interface Video {
  id: number; // Changed to number based on API response
  name: string;
  extension: string;
  data: string; // base64 encoded video data
  archive: boolean;
  videoCategoryId: number;
}

interface Category {
  id: number;
  name: string;
}

const Videos: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; 
  const [totalCount, setTotalCount] = useState(0);

  const getCategories = async () => {
    try {
      setLoading(true);
      const langParam = i18n.language === "en" ? "en" : "";
      const response = await axiosInstance.get(`VideoCategory/GetAll?language=${langParam}`);
      setCategories(response.data.data);


      // Set the selectedCategory to the ID of the first category if available
      if (response.data.data.length > 0) {
        setSelectedCategory(response.data.data[0].id);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
      setError("حدث خطأ أثناء تحميل فئات الفديوهات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, [i18n.language]);


  useEffect(() => {
    const fetchVideosAndCategories = async (page: number, size: number) => {
      if (selectedCategory === null) return; // Prevent fetching if no category is selected

      try {
        setLoading(true);
        const langParam = i18n.language === "en" ? "en" : "";
        const response = await axiosInstance.get(`/Video/GetVideosByCategory/${selectedCategory}?PageNumber=${page}&PageSize=${size}&language=${langParam}`);
        
        setVideos(response.data.data.result);
        setTotalCount(response.data.data.totalCount);
      } catch (error) {
        console.error("Error fetching videos", error);
        setError("حدث خطأ أثناء تحميل الفيديوهات.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideosAndCategories(currentPage , pageSize);
  }, [i18n.language, selectedCategory , currentPage]);

  console.log(videos)
  console.log(totalCount)


      const totalPages = Math.ceil(totalCount / pageSize);


  return (
    <section className="py-12 bg-gray-50" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary mb-4">{t("VideosGallery")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("FeaturedRecordingsOfTheClub'sVariousActivitiesAndEvents")}
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category.id}
                  onClick={() => {
                    setCurrentPage(1);
                    setSelectedCategory(category.id)}}
                  className={`mx-2 mb-2 ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-200'}`}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videos.map(video => {
                const videoSrc = `data:video/mp4;base64,${video.data}`;
                return (
                  <div
                    key={video.id}
                    className="overflow-hidden rounded-lg h-48 md:h-64 relative group cursor-pointer bg-black"
                    title={video.name}
                  >
                    <video
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                      muted
                      playsInline
                      src={videoSrc}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              })}
            </div>
          </>
        )}
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
    </section>
  );
};

export default Videos;
