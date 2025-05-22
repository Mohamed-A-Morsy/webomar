import React, { useEffect, useState } from "react";
import axiosInstance from "@/axiosConfig/instance";
import DOMPurify from "dompurify";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "./ui/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';

interface Shop {
  id: number;
  name: string;
  productType: string;
  details: string | null;
  image: string;
  archive: boolean;
}

const ShopsContent: React.FC = () => {
     const { t } = useTranslation();
      const { i18n } = useTranslation();
  const [shops, setShops] = useState<Shop[]>([]);
  console.log(shops);

  const langDir = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('lang') === 'ar' ? '' : 'en';

  const sanitizeHtml = (htmlContent: string) => {
    return DOMPurify.sanitize(htmlContent);
  };
    const [loading, setLoading] = useState(false);
  

    const fetchCards = async () => {
      try {
        setLoading(true);
        const langParam = i18n.language === "en" ? "en" : "";
        const response = await axiosInstance.get(`/Shop/GetAll?language=${langParam}`);
        console.log(response.data);
        setShops(response.data.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }finally{
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCards();
  }, [langDir]);


  const truncateText = (text: string | null, maxLength: number): string => {
    if (!text) {
      return "";
    }
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

    if (loading) return <LoadingSpinner />;


  return (
    <>
    <div className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white text-center mb-4">{t("InvestWisely")}</h1>
            <p className="text-white text-center max-w-2xl mx-auto mb-4">
                {t("YourInvestmentInCommercialStoreAtTheYouthDevelopmentCenterinAl-Jazirah")}
            </p>
            <p className="text-white text-center max-w-2xl mx-auto">{t("willachievewhatyouwant")}</p>
          </div>
        </div>
    <div id="sportContent" className="" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="w-[85%] m-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 py-20">

        {
          shops.map((item) => (
          item.archive === false && (
            <Card
                             key={item.id}
                             className="news-card overflow-hidden border border-gray-200"
                        >
                             <div className="h-48 overflow-hidden">
                                {
                                    item?.image ? 
                                    <img
                                     src={`data:image/jpeg;base64,${item.image}`}
                                     alt={item.name}
                                     className="w-full h-full object-covtransition-transform duration-500 hover:scale-110"
                                    /> : 
                                    <div className='flex  items-center justify-center h-48'>
                                        <h1>

                                        لا يوجد صورة
                                        </h1>
                                    </div>

                                }
                             </div>
                             <CardHeader>
                              <CardTitle className="text-xl"><h1>{item?.name}</h1></CardTitle>
                              <CardDescription className="text-gray-500 text-l">
                                <h1>
                                {item?.productType}
                                </h1>
                             </CardDescription>
                             </CardHeader>
                            <CardContent>
                             <p>{item?.details}</p>
                            </CardContent>
                                      <CardFooter>
                                        <Button
                                          variant="link"
                                          className="text-primary p-0 hover:text-primary-dark"
                                          
                                        >
                                            <Link to="">
                                        قراءة المزيد
                                            </Link>
                                        </Button>
                                      </CardFooter>
                                    </Card>
          )
        ))
        }


        {/* {shops.map((item) => (
          item.archive === false && (
            <div
              className="rounded-md flex flex-col overflow-hidden"
              style={{
                boxShadow: "8px 8px 5px lightgray",
                height: "400px" // Set the fixed height for the card
              }}
              key={item.id}
            >
              <div className="bg-secondary w-full h-[220px] ">
                <img src={`data:image/jpeg;base64,${item.image}`} className="w-full h-full" alt="" width={450} height={450} />
              </div>

              <div className="px-4 py-6 flex-grow">
                <div className="flex flex-row-reverse justify-between mb-4">
                  <h3 className="font-bold text-xl text-white">{item.name}</h3>
                  <span className="text-gray-400">{item.productType}</span>
                </div>
                <div className="text-right mb-4 text-text-black flex-grow overflow-auto">
                  <div
                    className="text-right text-black"
                    dangerouslySetInnerHTML={{ __html: item.details ? sanitizeHtml(item.details) : "" }}
                  />
                </div>
              </div>
            </div>
          )
        ))} */}
      </div>
    </div>
    </>
  );
};

export default ShopsContent;
