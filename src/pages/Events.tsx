import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EventCardsSection from "@/components/Events/EventCardsSection";
import EventCalendarSection from "@/components/Events/CalendarComponent";

const Events = () => {
  const { t, i18n } = useTranslation();

  return (
    <section
      className="py-12 bg-gray-50"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
       
        <EventCardsSection />
        <h2 className="text-3xl font-bold text-center mt-16 mb-10 text-gray-800">
          {t("Scheduleofupcomingevents")}
        </h2>
        <EventCalendarSection />
      </div>
    </section>
  );
};

export default Events;
