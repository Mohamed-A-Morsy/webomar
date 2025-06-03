import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "./../axiosConfig/instance";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import LoadingSpinner from "@/components/ui/loader";


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

const ActivitiesSection = () => {
  const { i18n, t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ActivityTypes, setActivityTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [allActivityies , setAllActivities] = useState([])
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const getActivityTypes = async (page, size) => {
    try {
      const res = await axiosInstance.get(`GameType/GetAll?PageNumber=${page}&PageSize=${size}`);
      setAllActivities(res.data.data)
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

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };
  const handleCardClick = (activity: any) => {
    navigate("/games-by-type", {
      state: { games: activity.games, typeName: activity.name },
    });
  };



   if (loading) return <LoadingSpinner />;
   
    // Calculate the current jobs to display
    const indexOfLastJob = currentPage * pageSize;
    const indexOfFirstJob = indexOfLastJob - pageSize;
    const currentJobs = ActivityTypes?.slice(indexOfFirstJob, indexOfLastJob);
    

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <section
      className="py-16 bg-white"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">
          {t("sportsActivities")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
           {t("activitiesDescription")}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-10">
          <Button
            onClick={() =>
              scrollByAmount(i18n.language === "ar" ? -CARD_WIDTH : CARD_WIDTH)
            }
          >
            {i18n.language === "ar" ?  "▶": "◀" }
          </Button>

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
          <Button
            onClick={() =>
              scrollByAmount(i18n.language === "ar" ? CARD_WIDTH : -CARD_WIDTH)
            }
          >
            {i18n.language === "ar" ?  "◀" :"▶" }
          </Button>
        </div>
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
            .pagination-count{
            background-color: white; /* Default background color */
             color: green; /* Text color */
             transition: background-color 0.3s; /* Smooth transition */
            }
             .pagination-count:hover{
              background-color: #2c9a4f; /* Background color on hover */
            color: white;
             }

      `}</style>
    </section>
  );
};

export default ActivitiesSection;
