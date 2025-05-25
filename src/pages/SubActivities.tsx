import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "@/axiosConfig/instance";
import { useTranslation } from "react-i18next";
import LoadingSpinner from '@/components/ui/loader';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MainImage {
    id: number;
    name: string;
    description: string;
    image: {
        imageExtension: string;
        img: string;
    }
}

interface Activity {
    id: number;
    name: string;
    description: string;
    image: {
        imageExtension: string;
        img: string;
    }
}

interface MainActive {
    id: number;
    name: string; 
    description: string;
     image: {
        imageExtension: string;
        img: string;
    }
}

interface Games {
    id: number;
    name: string;
}

interface Res {
    id: number;
    name: string;
    activityTypes: Activity[];
    gameTypes: Games[];
}

const SubActivities: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [mainActive, setMainActive] = useState<MainActive[]>([]);
    const [mainImage, setMainImage] = useState<MainImage[]>([]);
    const [games, setGames] = useState<Games[]>([]);
    const [res, setRES] = useState<Res[]>([]);

    const getActivities = async () => {
        try {
            setLoading(true);
            const langParam = i18n.language === "en" ? "en" : "";
            const response = await axiosInstance.get(`/ActivityType/Get?id=${id}&language=${langParam}`);
          
            if (response.data && response.data.data) {
                setMainActive(response.data.data || []); 
                setActivities(response.data.data.activities || []); 
                // setSubActive(response.data.data.subActive || []); 
            }
            console.log(response.data.data); 
        } catch (error) {
            console.error(error);
            
        } finally {
            setLoading(false);
        }
    };


    console.log(activities)
    console.log(mainActive)

    useEffect(() => {
        getActivities();
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='p-3 m-2'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.length > 0 ? (
                    activities.map(activity => (
                        <Card
                             key={activity.id}
                             className="news-card overflow-hidden border border-gray-200"
                        >
                             <div className="h-48 overflow-hidden">
                                {
                                    activity?.image?.imageExtension || activity?.image?.img ? 
                                    <img
                                     src={`data:image/${activity?.image?.imageExtension};base64,${activity?.image?.img}`}
                                     alt={activity.name}
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
                              <CardTitle className="text-xl"><h1>{activity?.name}</h1></CardTitle>
                              <CardDescription className="text-gray-500 text-sm">
                                {activity?.description}
                             </CardDescription>
                             </CardHeader>
                            <CardContent>
                             <p></p>
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
                    ))
                ) : (
                    <p>{t('noSecondaryActivities.message')}</p> 
                )}
            </div>
        </div>
    );
};

export default SubActivities;
