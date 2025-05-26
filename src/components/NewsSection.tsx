import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import axiosInstance from "./../axiosConfig/instance";
import LoadingSpinner from "./ui/loader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewsSection = () => {
  const [activePage, setActivePage] = useState(0);
  const itemsPerPage = 3;
  const [newsItems, setNewsItems] = useState([]);
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const visibleNews = newsItems.slice(
    activePage * itemsPerPage,
    activePage * itemsPerPage + itemsPerPage
  );

  const goToNextPage = () => {
    setActivePage((prev) => (prev + 1) % totalPages);
  };

  const goToPrevPage = () => {
    setActivePage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const getNews = async () => {
    try {
      setLoading(true);
      const langParam = i18n.language === "en" ? "en" : "";

      const res = await axiosInstance.get(
        `ImageContents/GetAll?language=${langParam}`
      );
      setNewsItems(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text, wordLimit = 25) => {
    const words = text?.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ...";
  };

  const handleReadMore = (id) => {
    navigate(`/news/${id}`);
  };

  useEffect(() => {
    getNews();
  }, [i18n.language]);

  if (loading) return <LoadingSpinner />;

  return (
    <section
      className="py-12 bg-gray-50"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-secondary relative">
            {t("latestNews")}
            <span className="absolute bottom-0 right-0 w-1/3 h-1 bg-primary mt-2"></span>
          </h2>

          <div  className={`flex space-x-2 ${i18n.language === "ar" ? "space-x-reverse" : ""}`}>
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevPage}
              className="border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              {i18n.language === "ar" ? <ChevronRight /> : <ChevronLeft />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextPage}
              className="border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              {i18n.language === "ar" ? <ChevronLeft /> : <ChevronRight />}{" "}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleNews.map((news) => (
            <Card
              key={news.id}
              className="news-card overflow-hidden border border-gray-200"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={`data:image/${news.image.imageExtension};base64,${news.image.img}`}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{news.title}</CardTitle>
                <CardDescription className="text-gray-500 text-sm">
                  {news.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{truncateText(news.description)}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="text-primary p-0 hover:text-primary-dark"
                  onClick={() => handleReadMore(news.id)}
                >
                  {t("readMore")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            className="bg-primary hover:bg-primary-dark text-white"
            onClick={() => navigate("/news")}
          >
            {t("viewAllNews")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
