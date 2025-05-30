import React, { useEffect, useState } from 'react';
import axiosInstance from "@/axiosConfig/instance";
import { Button } from '@/components/ui/button';
import LoadingSpinner from '../components/ui/loader';
import { useTranslation } from "react-i18next";

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

  useEffect(() => {
    const fetchVideosAndCategories = async () => {
      try {
        setLoading(true);
        const langParam = i18n.language === "en" ? "en" : "";
        const response = await axiosInstance.get(`/VideoCategory/GetAllWithVideos?language=${langParam}`);
        
        // Flatten videos and categories as before
        setVideos(response.data.data.flatMap((category: any) => category.videos));
        setCategories(response.data.data.map((category: any) => ({ id: category.id, name: category.name })));
        setSelectedCategory(response.data.data[0]?.id || null);
      } catch (error) {
        console.error("Error fetching videos", error);
        setError("حدث خطأ أثناء تحميل الفيديوهات.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideosAndCategories();
  }, [i18n.language]);

  const filteredVideos = selectedCategory ? videos.filter(video => video.videoCategoryId === selectedCategory) : videos;

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
                  onClick={() => setSelectedCategory(category.id)}
                  className={`mx-2 mb-2 ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-200'}`}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredVideos.map(video => {
                // create video src URL from base64 data
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
                      {/* <source src={videoSrc} type="video/mp4" /> */}
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Videos;

