
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: "النادي يحقق فوزاً كبيراً في البطولة المحلية",
    description: "حقق فريقنا فوزاً مستحقاً بنتيجة ٣-٠ في المباراة النهائية للبطولة المحلية",
    date: "٢١ مايو ٢٠٢٥",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "افتتاح الملعب الجديد الأسبوع المقبل",
    description: "يستعد النادي لافتتاح الملعب الجديد بحضور كبار الشخصيات والرياضيين",
    date: "١٨ مايو ٢٠٢٥",
    image: "https://images.unsplash.com/photo-1508098682722-e99c1a7329d0?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "اللاعب محمد أحمد ينضم إلى صفوف النادي",
    description: "أعلن النادي رسمياً عن تعاقده مع اللاعب الدولي محمد أحمد لمدة موسمين",
    date: "١٥ مايو ٢٠٢٥",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "بدء التسجيل في الأكاديمية الرياضية للموسم الجديد",
    description: "يسر النادي الإعلان عن فتح باب التسجيل للأكاديمية الرياضية للفئات العمرية المختلفة",
    date: "١٢ مايو ٢٠٢٥",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1000&auto=format&fit=crop",
  },
];

const NewsSection = () => {
  const [activePage, setActivePage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  
  const visibleNews = newsItems.slice(
    activePage * itemsPerPage, 
    activePage * itemsPerPage + itemsPerPage
  );
  
  const goToNextPage = () => {
    setActivePage((prev) => (prev + 1) % totalPages);
  };
  
  const goToPrevPage = () => {
    setActivePage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-secondary relative">
            أحدث الأخبار
            <span className="absolute bottom-0 right-0 w-1/3 h-1 bg-primary mt-2"></span>
          </h2>
          
          <div className="flex space-x-2 space-x-reverse">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToPrevPage}
              className="border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToNextPage}
              className="border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleNews.map((news) => (
            <Card key={news.id} className="news-card overflow-hidden border border-gray-200">
              <div className="h-48 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{news.title}</CardTitle>
                <CardDescription className="text-gray-500 text-sm">{news.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{news.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="text-primary p-0 hover:text-primary-dark">
                  قراءة المزيد
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button className="bg-primary hover:bg-primary-dark text-white">
            عرض كل الأخبار
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
