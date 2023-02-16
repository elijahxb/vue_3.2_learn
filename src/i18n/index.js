import { createI18n } from 'vue-i18n'
import EN from '@/i18n/en'
import ZH from '@/i18n/zh'
const messages = {
  en: {
    ...EN
  },
  zh: {
    ...ZH
}
}

const getCurrentLanguage = () => {
  const UAlang = navigator.language // zh-CN
  const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
  localStorage.setItem('lang', langCode)
  console.log(langCode)
  return langCode
}

const i18n = createI18n({
  legacy: false,
  silentTranslationWarn: true,
  globalInjection: true,
  locale: getCurrentLanguage() || 'zh',
  messages: messages
  }
)

export default i18n
