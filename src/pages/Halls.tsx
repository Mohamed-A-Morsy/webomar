import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import axiosInstance from "./../axiosConfig/instance";

interface Hall {
  id: number;
  name: string;
  details: string;
  image: string;
  imageExtension: string;
}

const Halls = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [halls, setHalls] = useState<Hall[]>([]);

  const getImageUrl = (base64Data, extension) => {
    return `data:image/${extension.replace(".", "")};base64,${base64Data}`;
  };
  const gethHalls = async () => {
    try {
      const langParam = i18n.language === "en" ? "en" : "";
      const response = await axiosInstance.get(
        `/Hall/GetAll?language=${langParam}`
      );
      console.log(response.data.data);
      setHalls(response.data.data || []);
    } catch (error) {
      console.error("Error fetching halls", error);
    }
  };
  useEffect(() => {
    gethHalls();
  }, [i18n.language]);
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
                    src={getImageUrl(hall.image, hall.imageExtension)}
                    alt={hall.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{hall.name}</CardTitle>
                  <CardDescription className="text-gray-500 text-sm">
                    {/* You can add capacity if available in the API response */}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: hall.details }} />
                </CardContent>
                {/* <CardFooter>
                  <Button
                    variant="link"
                    className="text-primary p-0 hover:text-primary-dark"
                  >
                    {t("bookingDetails")}
                  </Button>
                </CardFooter> */}
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
