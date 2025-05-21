
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-12 pb-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="font-bold text-lg mb-4">عن النادي</h4>
            <p className="text-gray-300 text-sm mb-4">
              نادي رياضي عريق تأسس عام 1945، يقدم مجموعة متنوعة من الأنشطة الرياضية والاجتماعية للأعضاء والمجتمع.
            </p>
            <div className="flex space-x-3 space-x-reverse">
              <a href="#" className="text-white hover:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.992 3.657 9.129 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.992 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C1.3 3.435.65 5.05.65 8.984v6.03c0 3.935.65 5.55 3.735 5.8 3.6.245 11.626.246 15.23 0 3.085-.25 3.735-1.865 3.735-5.8v-6.03c0-3.935-.65-5.55-3.735-5.8zm-10.61 8.518V7.617l6.63 4.087-6.63 4.087z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent">الرئيسية</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-accent">عن النادي</Link>
              </li>
              <li>
                <Link to="/activities" className="text-gray-300 hover:text-accent">الأنشطة</Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-accent">الأخبار</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-accent">معرض الصور</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-accent">اتصل بنا</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">معلومات الاتصال</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3 space-x-reverse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 mt-0.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300 text-sm">شارع الرياضة، حي النادي، المدينة</span>
              </li>
              <li className="flex items-start space-x-3 space-x-reverse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 mt-0.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300 text-sm">+966 123 456 7890</span>
              </li>
              <li className="flex items-start space-x-3 space-x-reverse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 mt-0.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300 text-sm">info@sportsclub.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">النشرة الإخبارية</h4>
            <p className="text-gray-300 text-sm mb-4">
              اشترك في النشرة الإخبارية للحصول على آخر الأخبار والعروض.
            </p>
            <div className="flex space-x-0">
              <Input 
                placeholder="البريد الإلكتروني" 
                className="rounded-l-none bg-white text-black" 
              />
              <Button type="submit" className="rounded-r-none bg-accent hover:bg-accent-light text-secondary">
                اشترك
              </Button>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-700 my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} نادي الرياضة. جميع الحقوق محفوظة.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4 space-x-reverse text-sm text-gray-400">
              <li><a href="#" className="hover:text-accent">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-accent">الشروط والأحكام</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
