import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axiosInstance from './../axiosConfig/instance';
import LoadingSpinner from '@/components/ui/loader';

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  const visibleNews = newsItems.slice(
    activePage * itemsPerPage,
    activePage * itemsPerPage + itemsPerPage
  );

const getNews = async () => {
  try {
    setLoading(true);
    const res = await axiosInstance.get('ImageContents/GetAll');
    setNewsItems(res.data.data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  const goToNextPage = () => {
    setActivePage((prev) => (prev + 1) % totalPages);
  };

  const goToPrevPage = () => {
    setActivePage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  useEffect(() => {
    getNews();
  }, []);
   if (loading) return   <LoadingSpinner  />

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white text-center mb-4">أخبار النادي</h1>
            <p className="text-white text-center max-w-2xl mx-auto">
              تابع آخر أخبار وفعاليات النادي وكن على اطلاع دائم بكل جديد
            </p>
          </div>
        </div>

        {/* News Content */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-secondary relative">
                آخر الأخبار
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {visibleNews.map((news) => (
                <Card key={news.id} className="news-card overflow-hidden border border-gray-200">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={`data:image/${news.image.imageExtension};base64,${news.image.img}`}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                        {news.newsType.name}
                      </span>
                      <span className="text-gray-500 text-sm">{news.date}</span>
                    </div>
                    <CardTitle className="text-xl">{news.title}</CardTitle>
                    <CardDescription className="text-gray-700">
                      {news.description?.length > 100
                        ? `${news.description.substring(0, 100)}...`
                        : news.description}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter>
                    <Button
                      variant="link"
                      className="text-primary p-0 hover:text-primary-dark"
                      onClick={() => navigate(`/news/${news.id}`, { state: { news } })}
                    >
                      قراءة المزيد
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={activePage === index ? 'default' : 'outline'}
                  className={`rounded-full w-10 h-10 p-0 ${
                    activePage === index ? 'bg-primary' : 'border-primary text-primary'
                  }`}
                  onClick={() => setActivePage(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default News;
