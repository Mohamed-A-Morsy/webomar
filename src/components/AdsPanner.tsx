import React, { useState } from "react";
import axiosInstance from "./../axiosConfig/instance";

interface AdsPannerProps {
  imageUrl: string;
  altText?: string;
}

export default function AdsPanner() {
  const [advertisingImage, setAdvertisingImage] = useState([]);
  const getAdvertisingImage = async () => {
    try {
      const response = await axiosInstance.get(
        "AdvertisingImage/GetAdvertisingImage"
      );
      setAdvertisingImage(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  React.useEffect(() => {
    getAdvertisingImage();
  }, []);
  return (
    <div className="w-full bg-slate-100 py-4 px-4 ">
      <div className="max-w-screen-xl mx-auto">
        <img
          src={advertisingImage[0]?.image}
          alt={"advertisingImage"}
          className="w-full h-auto max-h-60 object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
