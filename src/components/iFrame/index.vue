<template>
  <div v-loading="loading" :style="'height:'+ height">
    <div class="app-container" style="width: 100%;height: 100%">
      <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="auto" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      height: document.documentElement.clientHeight - 87.7 + 'px',
      loading: true,
      url: this.src
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.loading = false
    }, 500)
    window.onresize = () => {
      this.height = document.documentElement.clientHeight - 87.7 + 'px'
    }
  },
  methods: {
    refresh() {
      this.$emit('refresh', this.url)
    },
    openInNewPage() {
      window.open(this.url, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container {
    margin: 0;
    padding: 5px;
  }
</style>
