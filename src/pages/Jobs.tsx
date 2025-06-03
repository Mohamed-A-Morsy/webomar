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
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useTranslation } from 'react-i18next';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
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

    const getJobs = async (page: number, size: number) => {
        try {
            setLoading(true);
            const langParam = i18n.language === "en" ? "en" : "";
            const response = await axiosInstance.get(`/Job/GetAll?language=${langParam}&PageNumber=${page}&PageSize=${size}`);
            setJobs(response.data.data.result);
            setTotalCount(response.data.data.totalCount); 
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getJobs(currentPage, pageSize);
    }, [currentPage, i18n.language]);

        const truncateText = (htmlContent, maxLength) => {
        const defaultText = "No description available";
        if (!htmlContent) {
            return defaultText;
        }
        const tempElement = document.createElement("div");
        tempElement.innerHTML = htmlContent;
        const plainText = tempElement.textContent || tempElement.innerText || defaultText;

        if (plainText.length <= maxLength) {
            return plainText;
        }

        return plainText.substring(0, maxLength) + "...";
    };

    if (loading) return <LoadingSpinner />;

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <h1 className="text-4xl text-center mb-11 font-semibold mt-11">{t("Jobs")}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {jobs.map((job) => {
                    const isFlipped = flippedCardId === job.id;
                    return (
                        <Card
                            key={job.id}
                            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
                            onClick={() => handleFlip(job.id)}
                        >
                            <div className="h-48 overflow-hidden">
                                {job.image ? (
                                    <img
                                        src={`data:image/${job.imageExtension};base64,${job.image}`}
                                        alt={job.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                ) : ""}
                            </div>
                            <CardHeader>
                                <CardTitle className="text-xl">{job.title}</CardTitle>
                                <CardDescription className="text-gray-500 text-sm">
                                    {job.postingDate}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {truncateText(job.description, 40)}
                            </CardContent>
                            <CardFooter>
                            </CardFooter>
                            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-secondary mb-2 text-center">
                                        {truncateText(job.description, 1000)}
                                    </h3>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
            <Pagination className='mb-11'>
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
    );
};

export default Jobs;
