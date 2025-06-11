import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import MobileHeader from "./MobileHeader";
import clsx from "clsx";
import Signin from "@/components/sign/SignIn";

const Header = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [menuOpen, setMenuOpen] = useState(false);

  

  const toggleLanguage = () => i18n.changeLanguage(isArabic ? "en" : "ar");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // if (!localStorage.getItem("token")) {
  //   return <Signin />;
  // }

  return (
    <header className="bg-white shadow-md" dir={isArabic ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-3">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
            <Link to="/">
              <img
                src="/Logo.png"
                alt={t("logoTitle")}
                className="h-14 w-auto cursor-pointer"
              />
            </Link>

            <div
              className={clsx(
                "text-center md:text-start",
                isArabic ? "md:text-right" : "md:text-left"
              )}
            >
              <h1 className="text-secondary text-lg sm:text-xl md:text-2xl font-bold">
                {t("logoTitle")}
              </h1>
              <p
                className={clsx(
                  "text-gray-600 text-sm",
                  isArabic ? "md:text-right" : "md:text-left"
                )}
              >
                {t("logoSubtitle")}
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            <Button asChild variant="ghost">
              <Link to="/">{t("home")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/News">{t("news")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/halls">{t("halls")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/events">{t("events")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/chairman">{t("chairMan")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/gallery">{t("gallery")}</Link>
            </Button>
            {/* <Button asChild variant="ghost">
              <Link to="/activity">{t("ActivityType")}</Link>
            </Button> */}
            <Button asChild variant="ghost">
              <Link to="/shops">{t("shops")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/jobs">{t("Jobs")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/signin">{localStorage.getItem("token") ? t("LogOut") :  t("LogIn")}</Link>
            </Button>
          </nav>
          <div className="flex items-center space-x-2 space-x-reverse md:space-x-0">
            <Button variant="outline" size="sm" onClick={toggleLanguage}>
              {isArabic ? "English" : "العربية"}
            </Button>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <MobileHeader isArabic={isArabic} toggleMenu={toggleMenu} />
        )}
      </div>
    </header>
  );
};

export default Header;
