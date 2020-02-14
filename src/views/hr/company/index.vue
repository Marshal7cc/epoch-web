<template>
  <div class="app-container">
    <el-button @click="submit" class="filter-item" plain style="margin-left: 20px" type="success">
      {{ $t('epoch.btn-save') }}
    </el-button>

    <el-form
      :model="dto"
      label-position="left"
      label-width="120px"
      ref="dataForm"
      style="width: 500px; margin-left:20px;margin-top: 20px"
    >
      <el-form-item :label="$t('epoch.company-code')" prop="companyCode">
        <el-input class="filter-item" v-model="dto.companyCode"/>
      </el-form-item>
      <el-form-item :label="$t('epoch.company-fullName')" prop="companyFullName">
        <el-input class="filter-item" v-model="dto.companyFullName"/>
      </el-form-item>
      <el-form-item :label="$t('epoch.company-shortName')" prop="companyShortName">
        <el-input class="filter-item" v-model="dto.companyShortName"/>
      </el-form-item>
      <el-form-item :label="$t('epoch.company-phone')" prop="phone">
        <el-input class="filter-item" v-model="dto.phone"/>
      </el-form-item>
      <el-form-item :label="$t('epoch.company-email')" prop="email">
        <el-input class="filter-item" v-model="dto.zipcode"/>
      </el-form-item>
      <el-form-item :label="$t('epoch.company-address')" prop="address">
        <el-input class="filter-item" v-model="dto.address"/>
      </el-form-item>
      <el-form-item :label="$t('epoch.company-contactPerson')" prop="contactPerson">
        <el-input class="filter-item" v-model="dto.contactPerson"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import base from '@/utils/base'
  import companyApi from '@/api/hr/company'

  export default {
    data() {
      return {
        dto: {},
        loading: true
      }
    },
    mounted() {
      this.query()
    },
    methods: {
      query() {
        companyApi.query().then((response) => {
          if (response.data) {
            this.dto = response.data
          }
        })
      },
      submit() {
        companyApi.submit(this.dto).then((response) => {
          base.parseResponse(response, this)
          this.query()
        })
      }
    }
  }
</script>
