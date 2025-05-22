/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axiosInstance from "@/axiosConfig/instance";
import { useTranslation } from "react-i18next";
import LoadingSpinner from '@/components/ui/loader';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FaTruckPlane } from "react-icons/fa6";




interface Activity {
    id: number;
    name: string;
    description: string;
}

interface Games {
    id: number;
    name: string;
}
interface Res {
    id: number;
    name: string;
}


const Counter: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [games, setGames] = useState<Games[]>([]); // Define a proper type for games if possible
    const [res, setRES] = useState<Res[]>([]); // Define a proper type for games if possible

    const getActivities = async () => {
        try {
            setLoading(true);
            const langParam = i18n.language === "en" ? "en" : "";
            const response = await axiosInstance.get(`/Navbar/GetAll?language=${langParam}`);
            setRES(response.data.data)
            setActivities(response.data.data[0].activityTypes);
            setGames(response.data.data[0].gameTypes);
            console.log(response.data.data[0]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getActivities();
    }, []);

    console.log(games)
    console.log(activities)
    console.log(res)

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='p-2'>
            <div className="bg-secondary rounded-lg overflow-hidden mb-2">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-white text-2xl font-bold mb-4">انضم إلى الانشطة الاجتماعية بالنادي الآن</h3>
              <p className="text-white opacity-90 mb-6">
                ينظم النادي بعض الرحلات والانشطة الاجتماعية التي يمكنك الانضمام اليها 
              </p>
              <div>
                <Button className="bg-accent hover:bg-accent-light text-secondary font-bold">
                  سجل الآن
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto">
             <img 
    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHNhamFyaSUyMGNhbXAlMjB0cmF2ZWwlMjBjb3VudHJ5fGVufDB8fHx8MTY2MjI3MjY5Nw&ixlib=rb-1.2.1&q=80&w=1000" 
    alt="Safari Camp" 
    className="w-[800px] h-[400px] object-cover"
/>
            </div>
          </div>
        </div>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-10">
          {activities.map((activity , key) => (
            <Link to={`/SubActivities/${activity.id}`} key={key}>
            <div key={activity.name} className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-300">
                <FaTruckPlane  className="h-9 w-9  text-primary"/>
              <h3 className="mt-3 font-semibold text-secondary">{activity.name}</h3>
              <p className="mt-3 font-semibold text-secondary">{activity.description
}</p>
            </div>
          </Link>
          ))}
        </div>
        </div>
    );
};

export default Counter;
