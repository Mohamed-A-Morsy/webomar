import { useTranslation } from "react-i18next";
import axiosInstance from "@/axiosConfig/instance";
import { useEffect, useState } from "react";

const NewsTicker = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [newsContent, setNewsContent] = useState([]);

  useEffect(() => {
    const langParam = i18n.language === "en" ? "en" : "";

    axiosInstance
      .get(`/NewsLettres/GetActiveNews?language=${langParam}`)
      .then((res) => setNewsContent(res.data.data))
      .catch((err) => console.error("Error fetching event", err));
  }, [i18n.language]);
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary text-white py-1 overflow-hidden whitespace-nowrap z-50">
      <div
        className={`text-sm px-4 ${
          isArabic ? "animate-marquee-rtl" : "animate-marquee"
        }`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {newsContent
          .filter((item) => !item.isDeleted)
          .map((item, index) => (
            <div
              key={index}
              style={{ display: "inline-block", marginRight: "20px" }}
            >
              {item.newsLetter}
            </div>
          ))}{" "}
      </div>
    </div>
  );
};

export default NewsTicker;
