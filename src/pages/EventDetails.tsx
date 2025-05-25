import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import axiosInstance from "../axiosConfig/instance";
import BackButton from "@/components/ui/BackButton";
import LoadingSpinner from "@/components/ui/loader";

interface Event {
  id: number;
  name: string;
  description: string;
  image: string;
}

const EventDetails: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const lang = sessionStorage.getItem("lang") === "ar" ? "" : "en";
    axiosInstance
      .get(`/Event/Get/${id}?language=${lang}`)
      .then((res) => setEvent(res.data.data))
      .catch((err) => console.error("Error fetching event", err))
      .finally(() => setLoading(false));
  }, [id]);

  const sanitizeHtml = (html: string) => DOMPurify.sanitize(html);
  if (loading) return <LoadingSpinner />;
  return (
    <div className="bg-[url('/assets/signBackground.png')] min-h-screen pt-20 text-white px-4">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        {event ? (
          <>
            <img
              src={`data:image/jpeg;base64,${event.image}`}
              alt="Event"
              className="w-full h-[60vh] object-cover rounded-lg"
            />
            <h2 className="text-3xl font-bold mt-6 mb-4">{event.name}</h2>
            <div
              className="text-sm text-black"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(event.description),
              }}
            />
          </>
        ) : (
          <p className="text-black text-center">جاري تحميل تفاصيل الحدث...</p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
