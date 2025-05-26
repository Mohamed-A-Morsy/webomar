import React, { useEffect, useState } from "react";
import axiosInstance from "@/axiosConfig/instance";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react"; // Loading spinner icon
import LoadingSpinner from "./ui/loader";
import { useTranslation } from "react-i18next";

interface Picture {
  id: string;
  src: string;
  alt: string;
  img: string;
  imageExtension: string;
}

const GallerySection: React.FC = () => {
  const { t } = useTranslation();
  const [pics, setPics] = useState<Picture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPics = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/Image/GetAll");
        setPics(response.data.data);
      } catch (error) {
        console.error("Error fetching images", error);
        setError("حدث خطأ أثناء تحميل الصور.");
      } finally {
        setLoading(false);
      }
    };
    fetchPics();
  }, []);

  const displayedPics = pics.slice(0, 4);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            {" "}
            {t("photoGallery")}{" "}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("photoDescription")}{" "}
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <LoadingSpinner />
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

            <div className="text-center mt-8">
              <Button
                className="bg-primary hover:bg-primary-dark text-white"
                onClick={() => navigate("/gallery")}
              >
                {t("morePhotos")}{" "}
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
