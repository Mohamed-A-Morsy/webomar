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
    const [jobs, setJObs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 3; // Number of jobs to display per page

    const handleFlip = (id: number) => {
        setFlippedCardId((prev) => (prev === id ? null : id));
    };

    const getJobs = async () => {
        try {
            setLoading(true);
            const langParam = i18n.language === "en" ? "en" : "";
            const response = await axiosInstance.get(`/Job/GetAll?language=${langParam}`);
            setJObs(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        getJobs();
    }, [i18n.language]);

    if (loading) return <LoadingSpinner />;

    // Calculate the current jobs to display
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    // Calculate total pages
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    return (
        <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <h1 className="text-4xl text-center mb-11 font-semibold mt-11">{t("Jobs")}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {currentJobs.map((job) => {
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
            <Pagination>
                    <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
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
                <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} /> 
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
