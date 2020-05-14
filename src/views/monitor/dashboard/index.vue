<template>
  <div class="app-container">
    <el-col v-for="(i, index) in pages" :key="index" :sm="6" :xs="12">
      <el-card :style="{background: i.bgc}" class="box-card" @click.native="open(i.url)">
        <div class="text item">
          <div class="left">
            <img :src="resolveIcon(i.icon)" alt="">
          </div>
          <div class="right">
            <span :style="{color: i.c}" class="header">{{ i.name }}</span> <br>
            <span>{{ i.description }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>
<script>
import { pages } from '@/settings'

export default {
  name: 'MonitorDashboard',
  data() {
    return {
      pages: [
        {
          icon: 'nacos.svg',
          name: 'Nacos注册中心',
          url: pages.nacosUrl,
          description: 'Nacos,微服务注册中心&配置中心',
          c: '#1890ff',
          bgc: 'rgba(236,251,252,0.3)'
        },
        {
          icon: 'jenkins.svg',
          name: 'jenkins可持续集成',
          url: pages.jenkinsUrl,
          description: 'jenkins可持续集成',
          c: '#1890ff',
          bgc: 'rgba(236,251,252,0.3)'
        },
        {
          icon: 'admin.svg',
          name: 'Admin面板',
          url: pages.springBootAdminUrl,
          description: 'Admin，基于SBA的微服务监控中心',
          c: '#1890ff',
          bgc: 'rgba(236,251,252,0.3)'
        }
      ]
    }
  },
  methods: {
    resolveIcon(icon) {
      return require(`@/assets/icons/${icon}`)
    },
    open(url) {
      window.open(url, '_blank')
    }
  }
}
</script>
<style scoped>
  .item {
    display: flex;
    flex-wrap: wrap;
  }

  .app-container {
    display: inline-block;
    width: 98.6%;
  }

  .box-card {
    margin: 13px;
    cursor: pointer;
  }

  .header {
    font-weight: 600;
    font-size: 1rem;
    display: inline-flex;
    margin-bottom: 8px;
  }

  .left {
    height: 100%;
  }

  img {
    width: 3.4rem;
    display: inline-block;
  }

  .right {
    margin-left: 10px
  }
</style>
