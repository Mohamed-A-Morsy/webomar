import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center py-3">
          <div className="flex items-center">
            <img src="/Logo.png" alt={t("logoTitle")} className="h-16 w-auto" />
            <div className="mr-3 text-right">
              <h1 className="text-secondary text-2xl font-bold">
                {t("logoTitle")}
              </h1>
              <p className="text-gray-600 text-sm">{t("logoSubtitle")}</p>
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
              <Link to="/teams">{t("teams")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/gallery">{t("gallery")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/about">{t("about")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/shops">{t("shops")}</Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="bg-primary text-white hover:bg-primary-dark mr-2"
            >
              <Link to="/contact">{t("contact")}</Link>
            </Button>
          </nav>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar")
            }
          >
            {i18n.language === "ar" ? "English" : "العربية"}
          </Button>
          <div className="md:hidden flex items-center mt-3 md:mt-0">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* News Ticker */}
      {/* <div className="bg-secondary py-2 text-white overflow-hidden">
        <div className="ticker-container">
          <div className="ticker-content">
            <span className="font-bold ml-4">{t("breakingNews")}</span>
            <span className="ml-6">{t("news1")}</span>
            <span className="ml-6">{t("news2")}</span>
            <span className="ml-6">{t("news3")}</span>
            <span className="ml-6">{t("news4")}</span>
          </div>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
