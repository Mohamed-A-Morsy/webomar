import React, { useEffect, useState } from "react";
import axiosInstance from "@/axiosConfig/instance";
import { useTranslation } from "react-i18next";

const EventCardsSection = () => {
  const { t, i18n } = useTranslation();
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const lang = i18n.language === "ar" ? "" : "en";
    axiosInstance
      .get(`/Event/UpComingEvents?language=${lang}`)
      .then((res) => setUpcomingEvents(res.data.data))
      .catch((err) => console.error(err));
  }, [i18n.language]);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length <= maxLength
      ? text
      : text.substring(0, maxLength) + "...";
  };

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
    </>
  );
};

export default EventCardsSection;
