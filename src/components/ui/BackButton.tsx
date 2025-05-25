import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-1 text-black mb-4"
    >
      {isArabic ? (
        <>
          <ArrowRight />
          <span>{t("back")}</span>
        </>
      ) : (
        <>
          <ArrowLeft />
          <span>{t("back")}</span>
        </>
      )}
    </button>
  );
};

export default BackButton;
