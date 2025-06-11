import React, { useState, ChangeEvent, FormEvent } from "react";
import axiosInstance from "@/axiosConfig/instance";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SignInFormData {
  email: string;
  password: string;
}

// Assuming SignInSide is imported or defined elsewhere in your project

const Signin: React.FC = () => {
  const [signInFormData, setSignInFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignInFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/Accounts/Login`,
        signInFormData
      );

      // handle successful login here, e.g., redirect to another page
      console.log("Login successful");
      console.log(response.data);
      localStorage.setItem("token", response.data.data.token);
      window.location.replace("/");
    } catch (error: any) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "User InvalidCredentials"
      ) {
        Swal.fire(
          "البريد الإلكتروني أو كلمة المرور غير صحيحة. الرجاء التحقق والمحاولة مرة أخرى"
        );
        setError(
          "البريد الإلكتروني أو كلمة المرور غير صحيحة. الرجاء التحقق والمحاولة مرة أخرى."
        );
      } else {
        Swal.fire(
          "حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى لاحقًا."
        );
        setError("حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى لاحقًا.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-screen h-screen text-black overflow-hidden scale-90">
                <img src="../../public/sign.png" alt="signInLogo" />
      <div className="bg-secondary2 rounded-md shadow-lg shadow-primary lg:py-16 flex flex-col justify-center items-center">
        <h2 className="text-3xl mt-4 mb-2 font-bold">{t("login")}</h2>
        <p>{t("Getreadytoenteranewworldofcontrolandprivacy")}</p>
        <form className="mt-6 text-right w-[50%]" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="email">
              {t("account")}
            </label>
            <div className="flex flex-row-reverse">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=""
                className="text-gray-900 rounded-md bg-[#D9D9D9] py-2 px-4 mb-4 text-right outline-none w-full"
                required
                onChange={handleChange}
                value={signInFormData.email}
                disabled={loading}
              />
            </div>
            <label className="mb-2" htmlFor="password">
              {t("password")}
            </label>
            <div className="flex flex-row-reverse">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                className="text-gray-900 rounded-md bg-[#D9D9D9] py-2 px-4 text-right outline-none w-full"
                required
                onChange={handleChange}
                value={signInFormData.password}
                disabled={loading}
              />
            </div>
          </div>
          {error && (
            <p className="text-red-600 text-center mb-2" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="bg-primary text-black py-2 px-12 rounded-md hover:bg-secondary lg:text-xl text-lg mt-12 mb-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? t("loggingin") : t("login")}
          </button>
          <p className="text-center">
            {t("Donthaveanaccount")}{" "}
            <span className="text-secondary">
              <a href="/SignUp">{t("Registeranewaccount")}</a>
            </span>
          </p>
        </form>
      </div>

    </div>
  );
};

export default Signin;

