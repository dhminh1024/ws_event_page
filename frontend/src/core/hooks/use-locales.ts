import { useTranslation } from "react-i18next";

// const ALLOWED_LANGUAGES = ["en", "vn"];

export const useLocales = () => {
  const { t, i18n } = useTranslation();

  return { t, currentLanguage: i18n.language };
};
