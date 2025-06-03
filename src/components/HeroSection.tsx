import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axiosInstance from "./../axiosConfig/instance";
import { Autoplay } from "swiper/modules";
import LoadingSpinner from "./ui/loader";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const getNews = async () => {
    try {
      setLoading(true);
      const langParam = i18n.language === "en" ? "en" : "";
      const res = await axiosInstance.get(
        `ImageContents/GetAll?PageNumber=${currentPage}&PageSize=${pageSize}&language=${langParam}`
      );
      setNewsItems(res.data.data.result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

console.log(newsItems)

  useEffect(() => {
    getNews();
  }, [i18n.language]);

  if (loading) return <LoadingSpinner />;

  return (
    <Swiper
      modules={[Autoplay]}
      dir="rtl"
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3000, reverseDirection: true }}
      loop
      className="w-full mt-3 h-[400px] md:h-[500px] lg:h-[500px]"
    >
      {newsItems.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-full h-full bg-cover bg-center relative flex items-center justify-center"
            style={{
              backgroundImage: `url(data:image/${item.image.imageExtension};base64,${item.image.img})`,
            }}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="relative z-20 text-white text-center px-4 md:px-10 max-w-3xl">
              <h2 className="text-2xl md:text-4xl font-extrabold drop-shadow mb-4">
                {item.title}
              </h2>
              <p className="text-sm md:text-lg drop-shadow">
                {item.description}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
