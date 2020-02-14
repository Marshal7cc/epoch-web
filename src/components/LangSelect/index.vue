<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" style="color: #a8a9a9;" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='ja'" command="ja">
        日本語
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import promptApi from '@/api/system/prompt'
import auth from '@/utils/auth'
import { getLanguage } from '@/lang/index'

export default {
  name: 'LangSelect',
  computed: {
    language() {
      return this.$store.state.settings.language
    }
  },
  created() {
    this.initPrompt()
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.commit('settings/setLanguage', lang)
      this.$message({
        message: this.$t('tips.switchLanguageSuccess'),
        type: 'success'
      })
      this.initPrompt()
      setTimeout(() => {
        location.reload()
      }, 1000)
    },
    initPrompt() {
      promptApi.i18n(getLanguage()).then(res => {
        localStorage.setItem('prompt', JSON.stringify(res.data))
      })
    }
  }
}
</script>
