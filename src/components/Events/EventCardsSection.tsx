import React, { useEffect, useState } from "react";
import axiosInstance from "@/axiosConfig/instance";
import { useTranslation } from "react-i18next";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import LoadingSpinner from "../ui/loader";

const EventCardsSection = () => {
  const { t, i18n } = useTranslation();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; 
  const [totalCount, setTotalCount] = useState(0);

  const getUpcomingEvents = async (page, size) => {
    try {
      setLoading(true);
      const lang = i18n.language === "ar" ? "" : "en";
      const response = await axiosInstance.get(
        `/Event/UpComingEvents?language=${lang}&PageNumber=${page}&PageSize=${size}`
      );
      setUpcomingEvents(response.data.data.events || []);
      setTotalCount(response.data.data.totalCount); // Assuming the API returns totalCount
    } catch (error) {
      console.error("Error fetching upcoming events", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(upcomingEvents)
  useEffect(() => {
    getUpcomingEvents(currentPage, pageSize);
  }, [currentPage, i18n.language]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length <= maxLength
      ? text
      : text.substring(0, maxLength) + "...";
  };

  if (loading) return <LoadingSpinner />; // You can replace this with a loading spinner

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        {t("upcomingevents")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={`data:image/jpeg;base64,${event.image}`}
                alt={event.name}
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.name}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  {t("common:startdate")}: {event.startDate}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  {t("common:enddate")}: {event.endDate}
                </p>
                <p className="text-gray-700 mt-2 text-sm">
                  {truncateText(event.description, 100)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg">
            {t("noUpcomingEvents")}
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination className='mb-11 mt-11'>
        {i18n.language === "ar" ? 
                    <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} /> : 
                    <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} /> }
        <PaginationContent dir='ltr'>
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
         {i18n.language === "ar" ?
                    <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />  : 
                    <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
                  }
      </Pagination>
    </>
  );
};

export default EventCardsSection;
