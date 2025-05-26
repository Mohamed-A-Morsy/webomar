import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const MobileHeader = ({ isArabic, toggleMenu }) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        "md:hidden flex flex-col gap-2 pb-4 animate-slide-down",
        isArabic ? "items-end text-right" : "items-start text-left"
      )}
    >
      <Link to="/" onClick={toggleMenu}>
        <Button variant="ghost" className="w-full">
          {t("home")}
        </Button>
      </Link>
      <Link to="/News" onClick={toggleMenu}>
        <Button variant="ghost" className="w-full">
          {t("news")}
        </Button>
      </Link>
      <Link to="/halls" onClick={toggleMenu}>
        <Button variant="ghost" className="w-full">
          {t("halls")}
        </Button>
      </Link>
      <Link to="/events" onClick={toggleMenu}>
        <Button variant="ghost" className="w-full">
          {t("events")}
        </Button>
      </Link>
      <Link to="/teams" onClick={toggleMenu}>
        <Button variant="ghost" className="w-full">
          {t("teams")}
        </Button>
      </Link>
      <Link to="/gallery" onClick={toggleMenu}>
        <Button variant="ghost" className="w-full">
          {t("gallery")}
        </Button>
      </Link>
      <Link to="/activity" onClick={toggleMenu}>
        <Button variant="ghost" className="w-full">
          {t("ActivityType")}
        </Button>
      </Link>
      <Link to="/shops" onClick={toggleMenu}>
        <Button variant="ghost" className="w-full">
          {t("shops")}
        </Button>
      </Link>
    </div>
  );
};

export default MobileHeader;
