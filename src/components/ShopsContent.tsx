import React, { useEffect, useState } from "react";
import axiosInstance from "@/axiosConfig/instance";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "./ui/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Shop {
  id: number;
  name: string;
  productType: string;
  details: string | null;
  image: string;
  archive: boolean;
}

const ShopsContent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Set your desired page size
  const [totalCount, setTotalCount] = useState(0);
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

  const fetchCards = async (page: number, size: number) => {
    try {
      setLoading(true);
      const langParam = i18n.language === "en" ? "en" : "";
      const response = await axiosInstance.get(
        `/Shop/GetAll?language=${langParam}&PageNumber=${page}&PageSize=${size}`
      );
      setShops(response.data.data.shops || []);
      setTotalCount(response.data.data.totalCount); // Assuming your API returns totalCount
    } catch (error) {
      console.error("Error fetching shops", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards(currentPage, pageSize);
  }, [currentPage, i18n.language]);

  if (loading) return <LoadingSpinner />;

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleFlip = (id: number) => {
    setFlippedCardId((prev) => (prev === id ? null : id));
  };

  const truncateText = (htmlContent: string | null, maxLength: number) => {
    const defaultText = "No description available";
    if (!htmlContent) {
      return defaultText;
    }
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlContent;
    const plainText = tempElement.textContent || tempElement.innerText || defaultText;
    if (plainText.length <= maxLength) {
      return plainText;
    }
    return plainText.substring(0, maxLength) + "...";
  };

  return (
    <>
      <div className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            {t("InvestWisely")}
          </h1>
          <p className="text-white text-center max-w-2xl mx-auto mb-4">
            {t("YourInvestmentInCommercialStoreAtTheYouthDevelopmentCenterinAl-Jazirah")}
          </p>
          <p className="text-white text-center max-w-2xl mx-auto">
            {t("willachievewhatyouwant")}
          </p>
        </div>
      </div>
      <div
        id="sportContent"
        className=""
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {shops.map((item) => {
            const isFlipped = flippedCardId === item.id;
            return (
              <Card
                key={item.id}
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                onClick={() => handleFlip(item.id)}
              >
                {/* Front Side */}
                <div className="h-48 overflow-hidden">
                  {item?.image ? (
                    <img
                      src={`data:image/jpeg;base64,${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-48">
                      <h1>لا يوجد صورة</h1>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                  <CardDescription className="text-gray-500 text-sm">
                    {item.productType}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {truncateText(item.details, 40)}
                </CardContent>
                <CardFooter>
                  {/* Optional footer content */}
                </CardFooter>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-secondary mb-2 text-center">
                      {truncateText(item.details, 1000)}
                    </h3>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Pagination */}
        <Pagination className="mb-11 mt-11">
          {i18n.language === "ar" ? (
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          ) : (
            <PaginationPrevious
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
            />
          )}
          <PaginationContent dir="ltr">
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
          {i18n.language === "ar" ? (
            <PaginationPrevious
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
            />
          ) : (
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          )}
        </Pagination>
      </div>
      <style>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
};

export default ShopsContent;
