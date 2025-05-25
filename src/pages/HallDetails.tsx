import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig/instance";
import DOMPurify from "dompurify";
import LoadingSpinner from "@/components/ui/loader";
import BackButton from "@/components/ui/BackButton";

interface Hall {
  id: number;
  name: string;
  details: string;
  image: string;
}
const HallDetails = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const [hall, setHall] = useState<Hall | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const langParam = i18n.language === "en" ? "en" : "";

    axiosInstance
      .get(`/Hall/Get/${id}?language=${langParam}`)
      .then((res) => setHall(res.data.data))
      .catch((err) => console.error("Error fetching event", err))
      .finally(() => setLoading(false));
  }, [id, i18n.language]);

  const sanitizeHtml = (html: string) => DOMPurify.sanitize(html);
  if (loading) return <LoadingSpinner />;
  return (
    <div
      className="bg-[url('/assets/signBackground.png')] min-h-screen pt-20 text-white px-4"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">
        <BackButton />
        {hall && (
          <>
            <img
              src={`data:image/jpeg;base64,${hall.image}`}
              alt="Event"
              className="w-full h-[60vh] object-cover rounded-lg"
            />
            <h2 className="text-3xl font-bold mt-6 mb-4">{hall.name}</h2>
            <div
              className="text-sm text-black"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(hall.details),
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HallDetails;
