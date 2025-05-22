import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "./../axiosConfig/instance";
import { toast } from "react-toastify";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    contactTime: "",
    comments: "",
  });
  const token = localStorage.getItem("token");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      await axiosInstance.post("ContactUs/Create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("تم الإرسال بنجاح");

      setFormData({
        name: "",
        phoneNumber: "",
        contactTime: "",
        comments: "",
      });
    } catch (error: any) {
      if (!token) {
        toast.warning("يجب تسجيل الدخول");
      } else {
        toast.error("يوجد خطأ في البيانات");
      }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-secondary mb-6">
                تواصل معنا
              </h2>
              <p className="text-gray-600 mb-8">
                نحن هنا للإجابة على استفساراتكم واستقبال آرائكم ومقترحاتكم.
                يمكنكم التواصل معنا من خلال النموذج التالي أو زيارتنا في مقر
                النادي.
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="الاسم"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="رقم الهاتف"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <Input
                  placeholder="وقت الاتصال"
                  name="contactTime"
                  value={formData.contactTime}
                  onChange={handleChange}
                />
                <Textarea
                  placeholder="الرسالة"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  rows={4}
                />
                <Button
                  type="submit"
                  className="bg-secondary hover:bg-blue-800 text-white"
                  disabled={
                    formData.comments === "" ||
                    formData.name === "" ||
                    formData.phoneNumber === "" ||
                    formData.contactTime === ""
                  }
                >
                  إرسال الرسالة
                </Button>
              </form>
            </div>

            <div className="md:w-1/2">
              <div className="h-64 md:h-full bg-gray-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.5571800777!2d31.219507700000005!3d30.049559499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840d9cca401e9%3A0xdaab61569222e562!2z2YXYsdmD2LIg2LTYqNin2Kgg2KfZhNis2LLZitix2Kk!5e0!3m2!1sar!2seg!4v1707659882934!5m2!1sar!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="موقع النادي"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Address */}
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              {/* Location icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-secondary mb-2">العنوان</h3>
            <p className="text-gray-600">شارع الرياضة، حي النادي، المدينة</p>
          </div>

          {/* Phone */}
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-secondary mb-2">الهاتف</h3>
            <p className="text-gray-600">+966 123 456 7890</p>
            <p className="text-gray-600">+966 098 765 4321</p>
          </div>

          {/* Email */}
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-secondary mb-2">البريد الإلكتروني</h3>
            <p className="text-gray-600">info@sportsclub.com</p>
            <p className="text-gray-600">contact@sportsclub.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
