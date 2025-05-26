import React, { useState, useEffect } from 'react';
import axiosInstance from "../axiosConfig/instance";
import MembersChairman from './MembersChairman';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from "@/components/ui/loader";


const ChairMan = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [chairMan, setChairMan] = useState({
    id: null,
    name: '',
    speech: '',
    img: '',
    imageExtension: ''
  });

  const getChairmanspeech = async () => {
    try {
        setLoading(true)
    const langParam = i18n.language === "en" ? "en" : "";
      const response = await axiosInstance.get(`/ChairmanSpeech/Get?language=${langParam}`);
      setChairMan(response.data.data);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

     const truncateText = (htmlContent, maxLength) => {
    const defaultText = "No description available";
    if (!htmlContent) {
      return defaultText;
    }
    // Create a temporary DOM element to parse the HTML content
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlContent;
    const plainText =
      tempElement.textContent || tempElement.innerText || defaultText;

    if (plainText.length <= maxLength) {
      return plainText;
    }

    return plainText.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    getChairmanspeech();
  }, [i18n.language]);

  if (loading) return <LoadingSpinner />;

  return (
    <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div
        className="h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(data:image/${chairMan.imageExtension};base64,${chairMan.img})`,
          marginBottom: '100px'
        }}
      >
        <div className="h-full w-[800px] bg-black bg-opacity-30 flex justify-start items-center p-10">
          <div className="text-white">
            <h1 className='mb-4'>  ـــــــــ  {t("PresidentOfAl-JaziraClub")}</h1>
            {chairMan.name ? <h1 className="text-5xl mb-11 mr-11 font-semibold">{chairMan.name}</h1> : ''}
            {chairMan.speech ?  <p className="text-lg">{truncateText(chairMan.speech, 1000)}</p> : ''}
           
          </div>
        </div>
      </div>

      <MembersChairman />
    </div>
  );
};

export default ChairMan;
