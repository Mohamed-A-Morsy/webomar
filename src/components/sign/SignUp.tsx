import React, { useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
import axiosInstance from "@/axiosConfig/instance";

interface SignUpFormData {
  name: string;
  sex: string;
  birthDate: string;
  nationality: string;
  email: string;
  password: string;
  phone: string;
  nationalId: number;
}

const Signup: React.FC = () => {
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    email: "",
    name: "",
    password: "",
    phone: "",
    sex: "",
    birthDate: "",
    nationality: "",
    nationalId: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSignUpFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/Accounts/UserRegisteration", signUpFormData);
      console.log("register success");
      window.location.replace("/signin");
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        if (error.response.data.error === "User InvalidCredentials") {
          setError("البريد الإلكتروني أو كلمة المرور غير صحيحة. الرجاء التحقق والمحاولة مرة أخرى.");
        } else if (error.response.data.message === "User  is already exist") {
          Swal.fire("الحساب موجود بالفعل");
        } else if (error.response.data.message === "Password does not meet the requirements (should contain Upper case, lower case, special char, number and min 8 length) or password is empty") {
          Swal.fire("يرجي التحقق من كلمة المرور");
        } else {
          setError("حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى لاحقًا.");
        }
      }
    }
  };

  return (
    <div className=" w-screen h-full text-black lg:py-1">

      <div className="bg-secondary2 rounded-lg shadow-lg shadow-primary py-4 flex flex-col justify-center items-center lg:w-[60%] m-auto">
        <img src="../../../public/Logo.png" alt="Logo" width={100} height={100} />
        <h2 className="text-3xl mt-4 font-bold">تسجيل حساب جديد</h2>
        <form
          className="mt-8 text-right w-[80%]"
          style={{ direction: "rtl" }}
          onSubmit={handleSubmit}
        >
          <div className="mb-2 flex lg:flex-row flex-col w-full justify-between gap-y-2 gap-x-8 ">
            <div className="lg:w-2/3 mb-4 ">
              <label style={{ textAlign: "right" }}>الاسم الكامل</label>
              <input
                className="border border-gray-400 rounded-lg py-2 px-3 mt-2 w-full outline-secondary2 text-gray-900"
                name="name"
                type="text"
                style={{ textAlign: "right" }}
                required
                onChange={handleChange}
              />
            </div>

            <div className="lg:w-1/3 w-full">
              <label style={{ textAlign: "right" }}>الجنس</label>
              <select
                className="border border-gray-400 rounded-lg py-2 px-4 my-2 w-full text-gray-700 outline-secondary2"
                name="sex"
                required
                onChange={handleChange}
              >
                <option value="" hidden className="text-gray-400">يرجى الاختيار</option>
                <option value="انثى">أنثى</option>
                <option value="ذكر">ذكر</option>
              </select>
            </div>
          </div>

          <div className="mb-2 flex lg:flex-row flex-col justify-between gap-x-8 ">
            <div className="w-2/3 mb-4">
              <label style={{ textAlign: "right" }}>تاريخ الميلاد</label>
              <input
                className="border w-100 border-gray-400 rounded-lg py-2 px-4 my-2 text-gray-700 outline-secondary2"
                type="date"
                name="birthDate"
                max={`${new Date().getFullYear()}-12-31`}
                min="1920-01-01"
                required
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-4">
              <label style={{ textAlign: "right" }}>الجنسية</label>
              <input
                className="border border-gray-400 rounded-lg py-2 px-3 mt-2 w-full outline-secondary2 text-gray-900"
                name="nationality"
                type="text"
                style={{ textAlign: "right" }}
                required
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-4">
              <label style={{ textAlign: "right" }}>الرقم القومي</label>
              <input
                className="border border-gray-400 rounded-lg py-2 px-3 mt-2 w-full outline-secondary2 text-gray-900"
                name="nationalId"
                type="text"
                style={{ textAlign: "right" }}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="mb-4">
              <label style={{ textAlign: "right" }}>البريد الإلكتروني</label>
              <input
                className="border border-gray-400 rounded-lg py-2 px-3 mt-2 w-full outline-secondary2 text-gray-900"
                name="email"
                type="email"
                style={{ textAlign: "right" }}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="mb-4">
              <label style={{ textAlign: "right" }}>كلمة المرور</label>
              <input
                className="border border-gray-400 rounded-lg py-2 px-3 mt-2 w-full outline-secondary2 text-gray-900"
                name="password"
                type="password"
                style={{ textAlign: "right" }}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="mb-4">
              <label style={{ textAlign: "right" }}>رقم الهاتف</label>
              <input
                className="border border-gray-400 rounded-lg py-2 px-3 mt-2 w-full outline-secondary2 text-gray-900"
                name="phone"
                type="tel"
                style={{ textAlign: "right" }}
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary text-black py-2 px-12 rounded-md hover:bg-secondary lg:text-xl text-lg mt-10 mb-2 flex w-[50%] m-auto justify-center"
          >
            تسجيل
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
