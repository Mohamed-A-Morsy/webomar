import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axiosInstance from "./../axiosConfig/instance";

export default function AdsSection() {
  const [advirtising, setAdvertising] = useState(null);
  const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
  const getAdvirtising = async () => {
    const res = await axiosInstance.get(`Advertisement/Get`);
    setAdvertising(res.data.data);
    console.log(res.data.data);
  };
  useEffect(() => {
    getAdvirtising();
  }, []);
  return (
    <>
      <div className="bg-secondary rounded-lg overflow-hidden mb-2 container">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-white text-2xl font-bold mb-4">
              {advirtising?.title}
            </h3>
            <p className="text-white opacity-90 mb-6">
              {stripHtml(advirtising?.description)}
            </p>
            <div></div>
          </div>
          <div className="md:w-1/2 h-64 md:h-auto">
            <img
              src={`data:image/${advirtising?.image?.imageExtension};base64,${advirtising?.image?.img}`}
              alt="Safari Camp"
              className="w-[800px] h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
