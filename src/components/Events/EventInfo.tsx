import React from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const EventInfo = ({ events, selectedDate, eventFound }) => {
  const { t } = useTranslation();

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length <= maxLength
      ? text
      : text.substring(0, maxLength) + "...";
  };

  const filteredEvents = events.filter(
    (event) => event.startDate === format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <>
      {eventFound ? (
        filteredEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-md flex flex-col overflow-hidden mb-4 shadow-md"
          >
            <img
              src={`data:image/jpeg;base64,${event.image}`}
              alt="event"
              className="w-full h-80 object-cover"
            />
            <div className="text-center pt-4 pb-6 px-6 bg-gray-200">
              <h3 className="text-2xl text-gray-800">{event.name}</h3>
              <p
                className="text-sm pt-2 pb-4 text-black"
                dangerouslySetInnerHTML={{
                  __html: truncateText(event.description, 100),
                }}
              />
              <Link
                to={`/Events/${event.id}`}
                className="bg-secondary text-white w-[40%] py-2 rounded-lg hover:bg-secondary2 inline-block"
              >
                {t("eventdetails")}
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full">
          <p className="text-gray-400 text-lg">
            {t("Therearenoeventsfor")} {format(selectedDate, "yyyy-MM-dd")}
          </p>
        </div>
      )}
    </>
  );
};

export default EventInfo;
