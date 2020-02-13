<template>
  <div class="app-container">
    <el-form ref="dataForm" :model="dto" label-position="left" label-width="70px">
      <el-form-item label="包父路径" prop="roleName">
        <el-input v-model="dto.parentPackagePath" class="filter-item" placeholder="com.marshal.epoch" />
      </el-form-item>
      <el-form-item label="包名" prop="roleCode">
        <el-input v-model="dto.packagePath" class="filter-item" placeholder="system" />
      </el-form-item>
      <el-form-item label="表名" prop="roleName">
        <el-input v-model="dto.tableName" class="filter-item" placeholder="sys_user" />
      </el-form-item>
      <el-form-item label="dto名称" prop="roleName">
        <el-input v-model="dto.targetName" class="filter-item" placeholder="SysUser" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">
        生成
      </el-button>
    </div>
  </div>
</template>
<script>
import base from '../../utils/base'
import generatorApi from '@/api/generator/generator'

export default {
  data() {
    return {
      dto: {},
      loading: true
    }
  },
  methods: {
    submit() {
      generatorApi.submit(this.dto).then((response) => {
        base.parseResponse(response, this)
        this.query()
      })
    }
  }
}
</script>
