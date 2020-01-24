import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import cache from '@/utils/cache'
import { getLanguage } from '@/lang/index'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state: {
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    language: getLanguage()
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    },
    setLanguage: (state, language) => {
      cache.save('lang', language)
      state.language = language
    }
  },
  actions
}

