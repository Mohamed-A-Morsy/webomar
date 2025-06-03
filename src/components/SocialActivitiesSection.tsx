import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "./../axiosConfig/instance";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const ActivityIcon = () => (
  <div className="text-primary mx-auto">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      <path
        strokeWidth="2"
        d="M12 7 9 9.5l.5 4L12 17l2.5-3.5.5-4L12 7zm0 0v6"
      />
    </svg>
  </div>
);

const CARD_WIDTH = 200;

const SocialActivitiesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const [ActivityTypes, setActivityTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const getActivityTypes = async (page: number, size: number) => {
    try {
      const res = await axiosInstance.get(`ActivityType/GetAll?PageNumber=${page}&PageSize=${size}`);
      setActivityTypes(res.data.data.result);
      setTotalCount(res.data.data.totalCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActivityTypes(currentPage, pageSize);
  }, [currentPage]);

  const handleCardClick = (activity: any) => {
    navigate("/activities-by-type", {
      state: { games: activity.games, typeName: activity.name },
    });
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <section className="py-16 bg-gray-50 my-3">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            {t("socialActivities")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("socialDescription")}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-10">
          <Button onClick={() => scrollRef.current?.scrollBy({ left: CARD_WIDTH, behavior: "smooth" })}>▶</Button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth gap-6 no-scrollbar w-full"
            style={{ width: CARD_WIDTH * 6 }}
          >
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-100 animate-pulse rounded-lg p-4 flex-shrink-0"
                    style={{ width: CARD_WIDTH - 12, height: 140 }}
                  ></div>
                ))
              : ActivityTypes.map((activity, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCardClick(activity)}
                    className="bg-gray-50 rounded-lg p-4 text-center flex-shrink-0 cursor-pointer hover:shadow-lg transition"
                    style={{ width: CARD_WIDTH - 12 }}
                  >
                    <ActivityIcon />
                    <h3 className="mt-3 font-semibold text-secondary">
                      {activity.name}
                    </h3>
                  </div>
                ))}
          </div>

          <Button onClick={() => scrollRef.current?.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" })}>◀</Button>
        </div>

        <Pagination className='mb-11'>
           {i18n.language === "ar" ? 
                  <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="pagination-button"  /> : 
                  <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="pagination-button"  /> }
          <PaginationContent dir='ltr'>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className="pagination-count"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
          {i18n.language === "ar" ?
              <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="pagination-button"  />  : 
              <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="pagination-button" />
                                 }
        </Pagination>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pagination-button {
          background-color: white; /* Default background color */
          color: green; /* Text color */
          transition: background-color 0.3s; /* Smooth transition */
        }
        .pagination-button:hover {
          background-color: #2c9a4f; /* Background color on hover */
          color: white;
        }
        .pagination-count {
          background-color: white; /* Default background color */
          color: green; /* Text color */
          transition: background-color 0.3s; /* Smooth transition */
        }
        .pagination-count:hover {
          background-color: #2c9a4f; /* Background color on hover */
          color: white;
        }
      `}</style>
    </section>
  );
};

export default SocialActivitiesSection;
