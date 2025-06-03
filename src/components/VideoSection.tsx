import React, { useEffect, useState } from 'react';
import axiosInstance from "@/axiosConfig/instance";
import { Button } from '@/components/ui/button';
import LoadingSpinner from '../components/ui/loader';
import YouTube from "react-youtube";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";


interface Video {
  id: string;
  url: string;
  archive: boolean;
}

const VideoSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [alldesplayVideos , setAllDesplayVideos] = useState([])
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const opts = {
    height: "255",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    },
  };

  useEffect(() => {
    const fetchPics = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/Video/GetAll?PageNumber=${currentPage}&PageSize=${pageSize}`);
        setVideos(response.data.data);
        setAllDesplayVideos(response.data.data.result)
        setTotalCount(response.data.data.totalCount);
      } catch (error) {
        console.error("Error fetching videos", error);
        setError("حدث خطأ أثناء تحميل الفيديوهات.");
      } finally {
        setLoading(false);
      }
    };
    fetchPics();
  }, []);

  console.log(videos)

  const getVideoIdFromUrl = (url: string): string | null => {
    const fullUrlMatch = url.match(/[?&]v=([^?&]+)/);
    if (fullUrlMatch) return fullUrlMatch[1];

    const shortFormatMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortFormatMatch) return shortFormatMatch[1];

    return null;
  };

  const getYoutubeWatchUrl = (url: string): string | null => {
    const videoId = getVideoIdFromUrl(url);
    if (videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return null;
  };

  const displayedVideo = alldesplayVideos.slice(0, 4);

  return (
    <section className="py-12 bg-gray-50"  dir={i18n.language === "ar" ? "rtl" : "ltr"}>
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
           
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {displayedVideo.map((video) => {
                const videoId = getVideoIdFromUrl(video.url);
                const watchUrl = getYoutubeWatchUrl(video.url);

                if (!videoId || !watchUrl) return null;

                return (
                  <div
                    key={video.id}
                    className="overflow-hidden rounded-lg h-48 md:h-64 group relative cursor-pointer"
                    onClick={() => window.open(watchUrl, "_blank", "noopener noreferrer")}
                    title="افتح الفيديو على يوتيوب"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') window.open(watchUrl, "_blank", "noopener noreferrer");
                    }}
                  >
                    
                    <YouTube
                      videoId={videoId}
                      opts={opts}
                      onError={(e) => console.error("YouTube Error", e)}
                      iframeClassName="pointer-events-none" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <p className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2">
                        اضغط لفتح الفيديو على يوتيوب
                      </p>
                    </div>
                  </div>
                );
              })}
            </div> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedVideo.map(video => {
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


            <div className="text-center mt-8">
              <Button
                className="bg-primary hover:bg-primary-dark text-white"
               onClick={() => navigate("/videos")}
              >
                عرض المزيد
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default VideoSection;

