import React, { useEffect, useState } from "react";
import stadium from "../../public/stadium.jpg";
import axiosInstance from "./../axiosConfig/instance";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const [aboutClub, setAboutClub] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { i18n } = useTranslation();
  const plainText = aboutClub?.details?.replace(/<[^>]+>/g, '') || '';


  const getAboutClub = async () => {
    try {
      setLoading(true);
      const langParam = i18n.language === "en" ? "en" : "";
      const response = await axiosInstance.get(
        `AboutUs/Get?language=${langParam}`
      );
      console.log(response.data.data);

      setAboutClub(response.data.data);
    } catch (error) {
      console.error("Error fetching about us", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAboutClub();
  }, [i18n.language]);

  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Stadium background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${stadium})`,
          backgroundPosition: "center 90%",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-secondary bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative h-full flex items-center">
        <div className="text-white max-w-2xl p-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {loading ? (
              <div className="h-8 w-64 bg-gray-300 animate-pulse rounded"></div>
            ) : (
              aboutClub?.title || "مركز التنمية الشبابية بالجزيرة"
            )}
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
                <div className="h-4 w-11/12 bg-gray-300 animate-pulse rounded"></div>
                <div className="h-4 w-10/12 bg-gray-300 animate-pulse rounded"></div>
              </div>
            ) : (
              plainText
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
