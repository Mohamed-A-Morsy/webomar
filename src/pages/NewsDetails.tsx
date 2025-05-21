import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from './../axiosConfig/instance';
import LoadingSpinner from "@/components/ui/loader";


const NewsDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axiosInstance.get(`ImageContents/get?id=${id}`)
      .then(res => setItem(res.data.data))
      .catch(console.error);
  }, [id]);

  if (!item) return   <LoadingSpinner  />
;

  return (
    <div className="container mx-auto px-4 py-12">
      <img
        className="w-full max-h-[450px] object-cover rounded-xl mb-8"
        src={`data:image/${item.image.imageExtension};base64,${item.image.img}`}
        alt={item.title}
      />

      <h1 className="text-3xl font-bold text-secondary mb-4">{item.title}</h1>
      <p className="text-gray-500 mb-8">{item.date}</p>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: item.description }}
      />

      <Button onClick={() => window.history.back()} className="mt-10">
        عودة
      </Button>
    </div>
  );
};

export default NewsDetails;
