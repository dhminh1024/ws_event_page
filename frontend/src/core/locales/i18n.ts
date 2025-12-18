import i18n from 'i18next'

import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'


import { defaultLocale, resourceLocales, supportedLocales } from '@/config/locales'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    supportedLngs: supportedLocales,
    detection: {
      caches: ['localStorage'],
    },
    resources: resourceLocales,
  })

export default i18n
