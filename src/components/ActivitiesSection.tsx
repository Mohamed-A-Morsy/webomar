
import React from 'react';
import { Button } from '@/components/ui/button';

// Simple activity icons
const ActivityIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    football: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
        <path strokeWidth="2" d="M12 7 9 9.5l.5 4L12 17l2.5-3.5.5-4L12 7zm0 0v6" />
      </svg>
    ),
    basketball: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
        <path strokeWidth="2" d="M4.5 12H19.5M12 4.5v15M5 5l14 14M5 19l14-14" />
      </svg>
    ),
    swimming: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth="2" d="M8 16.5c-1.57-.87-3.59-1.5-6-1.5v-2c2.97 0 5.43.98 7 2 1.57-1.02 4.03-2 7-2v2c-2.41 0-4.43.63-6 1.5M12 4c-1.66 0-3 1.34-3 3 0 .56.16 1.08.41 1.53.28.5.57 1.14.57 1.97L10 13h4l.02-2.5c0-.83.29-1.47.57-1.97.25-.45.41-.97.41-1.53 0-1.66-1.34-3-3-3z" />
        <path strokeWidth="2" d="M4 19h16M8 13.5C5 13.5 2.73 15 2 17c3.5 0 6.64.98 9 2.5 2.36-1.52 5.5-2.5 9-2.5-.73-2-3-3.5-6-3.5" />
      </svg>
    ),
    tennis: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
        <path strokeWidth="2" d="M4.5 12c0-4.142 3.358-7.5 7.5-7.5 4.142 0 7.5 3.358 7.5 7.5M4.5 12c0 4.142 3.358 7.5 7.5 7.5 4.142 0 7.5-3.358 7.5-7.5" />
        <path strokeWidth="2" d="M9 4.95A9.969 9.969 0 0 0 4.5 12c0 2.76 1.12 5.26 2.93 7.07" />
      </svg>
    ),
    fitness: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth="2" d="M18.364 5.636l-1.414 1.414M18.364 18.364l-1.414-1.414M5.636 5.636l1.414 1.414M5.636 18.364l1.414-1.414M3 12h2m14 0h2M12 3v2m0 14v2M7 12a5 5 0 0 1 5-5m0 0a5 5 0 0 1 5 5m-5-5v10m0 0a5 5 0 0 1-5-5m5 5a5 5 0 0 0 5-5" />
      </svg>
    ),
    volleyball: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
        <path strokeWidth="2" d="M12 3c-2.2 0-4.3.9-5.9 2.5m5.9 15.5c-2.3 0-4.5-1-6-2.7M21 12a8.91 8.91 0 0 0-2.2-5.9M10.5 10.5 15 7l-2 5.5 5.5 1.5" />
      </svg>
    ),
  };

  return (
    <div className="text-primary mx-auto">
      {icons[name] || icons.football}
    </div>
  );
};

const activities = [
  { name: "football", label: "كرة القدم" },
  { name: "basketball", label: "كرة السلة" },
  { name: "swimming", label: "السباحة" },
  { name: "tennis", label: "التنس" },
  { name: "fitness", label: "اللياقة البدنية" },
  { name: "volleyball", label: "كرة الطائرة" },
];

const ActivitiesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">الأنشطة الرياضية</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            يقدم النادي مجموعة متنوعة من الأنشطة الرياضية للجميع، من المبتدئين إلى المحترفين،
            وبإشراف مدربين متخصصين ذوي خبرة عالية.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-10">
          {activities.map((activity) => (
            <div key={activity.name} className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-300">
              <ActivityIcon name={activity.name} />
              <h3 className="mt-3 font-semibold text-secondary">{activity.label}</h3>
            </div>
          ))}
        </div>
        
        <div className="bg-secondary rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-white text-2xl font-bold mb-4">انضم إلى أكاديمية النادي الآن</h3>
              <p className="text-white opacity-90 mb-6">
                أكاديمية متخصصة لتدريب وتطوير المواهب الرياضية في مختلف الألعاب والفئات العمرية،
                مع أحدث المعدات والمرافق الرياضية.
              </p>
              <div>
                <Button className="bg-accent hover:bg-accent-light text-secondary font-bold">
                  سجل الآن
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=1000&auto=format&fit=crop" 
                alt="أكاديمية النادي" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
