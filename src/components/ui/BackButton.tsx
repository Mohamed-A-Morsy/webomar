import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-1 text-black mb-4"
    >
      <span>{t("back")}</span>
      <ArrowLeft />
    </button>
  );
};

export default BackButton;
