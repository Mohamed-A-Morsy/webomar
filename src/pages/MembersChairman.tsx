import React, { useEffect, useState } from 'react';
import axiosInstance from "../axiosConfig/instance";
import LoadingSpinner from "@/components/ui/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';



const MembersChairman = () => {
    const nevigate = useNavigate()
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3; 
    const [totalCount, setTotalCount] = useState(0);
    

    const handleFlip = (id: number) => {
    setFlippedCardId((prev) => (prev === id ? null : id));
  };
    

    const getMembers = async (page , size) => {
    try {
       setLoading(true);
       const langParam = i18n.language === "en" ? "en" : "";
      const response = await axiosInstance.get(`/StaffMember/GetAll?language=${langParam}&PageNumber=${page}&PageSize=${size}`);
      setMembers(response.data.data.result);
      setTotalCount(response.data.data.totalCount);
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

  console.log(members)

    useEffect(() => {
    getMembers(currentPage , pageSize);
  }, [i18n.language , currentPage]);

  if (loading) return <LoadingSpinner />;

  const totalPages = Math.ceil(totalCount / pageSize)
  return (
    <div>
        <h1  className="text-4xl text-center mb-11 font-semibold">{t("BoardOfDirectors")} </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {members.map((member) => {
            const isFlipped = flippedCardId === member.id;
            return(
            <Card
              key={member.id}
              className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
            //   className="news-card overflow-hidden border border-gray-200"
                onClick={() => handleFlip(member.id)}            >
              <div className="h-48 overflow-hidden">
                {
                    member.img ? <img
                  src={`data:image/${member.imageExtension};base64,${member.img}`}
                  alt={member.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                /> : ""
                }
                
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{member.name}</CardTitle>

                <CardDescription className="text-gray-500 text-sm">
                  {member.jobTitle}
                </CardDescription>
                
              </CardHeader>
              <CardContent>
                      {truncateText(member.details, 40)}
              </CardContent>
              <CardFooter>
              </CardFooter>
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-secondary mb-2 text-center">
                       {truncateText(member.details, 1000)}
                    </h3>
                  </div>
                </div>
            </Card>
            
          )
        })}
        </div>
        <Pagination className='mb-11 mt-11'>
                  {i18n.language === "ar" ? 
                    <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} /> : 
                    <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} /> }
                  <PaginationContent dir='ltr'>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <PaginationItem key={index + 1}>
                        <PaginationLink
                          isActive={currentPage === index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </PaginationContent>
                  {i18n.language === "ar" ?
                    <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />  : 
                    <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
                  }
                </Pagination>
         <style>{`
        .perspective {
          perspective: 1200px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}

export default MembersChairman
