<template>
  <i-frame
    :src="springBootAdmin"
    @refresh="refresh"
  />
</template>
<script>
import iFrame from '@/components/iFrame'
import { springBootAdminUrl } from '@/settings'

export default {
  components: { iFrame },
  data() {
    return {
      springBootAdmin: springBootAdminUrl
    }
  },
  mounted() {
  },
  methods: {
    refresh(u) {
      this.springBootAdmin = u
    }
  }
}
</script>
