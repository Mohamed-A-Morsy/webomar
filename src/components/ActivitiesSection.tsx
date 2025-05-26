import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "./../axiosConfig/instance";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

  const getActivityTypes = async () => {
    try {
      const res = await axiosInstance.get("GameType/GetAll");
      setActivityTypes(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActivityTypes();
  }, []);

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

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ActivitiesSection;
