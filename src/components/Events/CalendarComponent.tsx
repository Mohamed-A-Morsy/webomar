import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import axiosInstance from "@/axiosConfig/instance";
import { useTranslation } from "react-i18next";
import EventInfo from "./EventInfo";

const EventCalendarSection = () => {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventFound, setEventFound] = useState(false);

  useEffect(() => {
    const lang = i18n.language === "ar" ? "" : "en";
    axiosInstance
      .get(`/Event/GetAll?language=${lang}`)
      .then((res) => setEvents(res.data.data.events))
      .catch((err) => console.error(err));
  }, [i18n.language]);

  console.log(events)
  useEffect(() => {
    const selectedEvent = events.find(
      (event) => event.startDate === format(selectedDate, "yyyy-MM-dd")
    );
    setEventFound(selectedEvent !== undefined);
  }, [selectedDate, events]);

  const getTileClassName = ({ date }) => {
    const event = events.find(
      (event) => event.startDate === format(date, "yyyy-MM-dd")
    );
    return event ? "bg-blue-200 rounded-full" : "";
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Calendar
        value={selectedDate}
        onChange={(value) => {
          if (value instanceof Date) {
            setSelectedDate(value);
          }
        }}
        tileClassName={getTileClassName}
        className="rounded-xl shadow border text-center p-4"
      />
      <div className="bg-white shadow rounded-xl p-6 h-full">
        <EventInfo
          events={events}
          selectedDate={selectedDate}
          eventFound={eventFound}
        />
      </div>
    </div>
  );
};

export default EventCalendarSection;
