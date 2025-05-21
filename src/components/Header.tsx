
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/Logo.png" alt="مركز شباب الجزيرة" className="h-16 w-auto" />
            <div className="mr-3 text-right">
              <h1 className="text-secondary text-2xl font-bold">مركز التنمية الشبابية بالجزيرة</h1>
              <p className="text-gray-600 text-sm">النادي الرياضي الأول</p>
            </div>
          </div>
          
          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            <Button asChild variant="ghost">
              <Link to="/">الرئيسية</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/news">الأخبار</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/events">الفعاليات</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/teams">الفرق</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/gallery">الصور</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/about">عن النادي</Link>
            </Button>
            <Button asChild variant="default" className="bg-primary text-white hover:bg-primary-dark mr-2">
              <Link to="/contact">اتصل بنا</Link>
            </Button>
          </nav>
          
          {/* Mobile Nav Button */}
          <div className="md:hidden flex items-center mt-3 md:mt-0">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* News Ticker */}
      <div className="bg-secondary py-2 text-white overflow-hidden">
        <div className="ticker-container">
          <div className="ticker-content">
            <span className="font-bold ml-4">الأخبار العاجلة:</span>
            <span className="ml-6">النادي يحقق فوزاً كبيراً في البطولة المحلية بنتيجة 3-0</span>
            <span className="ml-6">إفتتاح الملعب الجديد الأسبوع المقبل</span>
            <span className="ml-6">اللاعب محمد أحمد ينضم إلى صفوف النادي</span>
            <span className="ml-6">بدء التسجيل في الأكاديمية الرياضية للموسم الجديد</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
