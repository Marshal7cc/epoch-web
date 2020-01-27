import Vue from 'vue'
import VueI18n from 'vue-i18n'

// 设置element内部UI Local,例如分页
import ElementUILocale from 'element-ui/lib/locale'

import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementJaLocale from 'element-ui/lib/locale/lang/ja'

import enLocale from './en'
import zhLocale from './zh'
import jaLocale from './ja'

import cache from '@/utils/cache'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  ja: {
    ...jaLocale,
    ...elementJaLocale
  }
}

export function getLanguage() {
  const chooseLanguage = cache.get('lang', '')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh'
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages,
  silentTranslationWarn: true
})

// 设置elementUI内部组件语言

ElementUILocale.use(getElementUILocales(getLanguage()))

const ElementUILocales = {
  zh: elementZhLocale,
  en: elementEnLocale,
  ja: elementJaLocale
}

const getElementUILocales = lang => {
  switch (lang) {
    case 'zh':
      return ElementUILocales.zh
    case 'en':
      return ElementUILocales.en
    case 'ja':
      return ElementUILocales.ja
  }
}
export default i18n
