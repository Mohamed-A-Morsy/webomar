import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/components/ui/loader";
import axiosInstance from "@/axiosConfig/instance";
import { Link } from "react-router-dom";

interface Hall {
  id: number;
  name: string;
  details: string;
  image: string;
  imageExtension: string;
}

const Halls = () => {
  const { t, i18n } = useTranslation();
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(false);

  const gethHalls = async () => {
    try {
      setLoading(true);

      const langParam = i18n.language === "en" ? "en" : "";
      const response = await axiosInstance.get(
        `/Hall/GetAll?language=${langParam}`
      );
      setHalls(response.data.data || []);
    } catch (error) {
      console.error("Error fetching halls", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    gethHalls();
  }, [i18n.language]);
  
  if (loading) return <LoadingSpinner />;

  return (
    <section
      className="py-12 bg-gray-50"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-secondary relative">
            {t("HallsAvailable")}{" "}
            <span className="absolute bottom-0 right-0 w-1/3 h-1 bg-primary mt-2"></span>
          </h2>
        </div>

        {halls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {halls.map((hall) => (
              <Card
                key={hall.id}
                className="overflow-hidden border border-gray-200"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={`data:image/jpeg;base64,${hall.image}`}
                    alt={hall.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{hall.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: hall.details }} />
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link
                    to={`/halls/${hall.id}`}
                    className="bg-secondary text-white w-[40%] py-2 rounded-lg hover:bg-secondary2 text-center"
                  >
                    {t("halldetails")}
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">{t("noHallsAvailable")}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Halls;
