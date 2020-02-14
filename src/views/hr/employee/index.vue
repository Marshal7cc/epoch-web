<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        :placeholder="$t('epoch.common-name')"
        class="filter-item"
        style="width: 150px;"
        v-model="queryParam.name"
      />

      <el-button @click="query" class="filter-item" icon="el-icon-search" plain type="primary">
        {{ $t('epoch.btn-search') }}
      </el-button>
      <el-button @click="reset" class="filter-item" icon="el-icon-refresh" plain type="info">
        {{ $t('epoch.btn-reset') }}
      </el-button>
      <el-button @click="add" class="filter-item" icon="el-icon-circle-plus-outline" plain type="success">
        {{ $t('epoch.btn-add') }}
      </el-button>
      <el-button @click="remove" class="filter-item" icon="el-icon-delete" plain type="warning">
        {{ $t('epoch.btn-delete') }}
      </el-button>
    </div>

    <el-table
      :data="rows"
      :key="0"
      border
      fit
      highlight-current-row
      ref="dataGrid"
      style="width: 100%;"
      v-loading="loading"
    >
      <el-table-column
        type="selection"
      />
      <el-table-column :label="$t('epoch.common-code')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.employeeCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('epoch.common-name')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('epoch.user-email')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('epoch.user-phone')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('epoch.employee-joinDate')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.joinDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('epoch.common-operation')" align="center">
        <template slot-scope="{row}">
          <el-button @click="edit(row)" circle icon="el-icon-edit" size="mini" type="primary"/>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      :page-size.sync="pagination.pageSize"
      :page.sync="pagination.page"
      :total="pagination.total"
      @pagination="query"
      v-show="pagination.total>0"
    />

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <el-form
        :model="dto"
        label-position="left"
        label-width="120px"
        ref="dataForm"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('epoch.common-code')">
          <el-input :placeholder="$t('epoch.common-code')" class="filter-item" v-model="dto.employeeCode"/>
        </el-form-item>
        <el-form-item :label="$t('epoch.common-name')">
          <el-input :placeholder="$t('epoch.common-name')" class="filter-item" v-model="dto.name"/>
        </el-form-item>
        <el-form-item :label="$t('epoch.employee-bornDate')">
          <el-date-picker :placeholder="$t('epoch.employee-bornDate')" class="filter-item" v-model="dto.bornDate"/>
        </el-form-item>
        <el-form-item :label="$t('epoch.user-email')">
          <el-input :placeholder="$t('epoch.user-email')" class="filter-item" v-model="dto.email"/>
        </el-form-item>
        <el-form-item :label="$t('epoch.user-phone')">
          <el-input :placeholder="$t('epoch.user-phone')" class="filter-item" v-model="dto.mobile"/>
        </el-form-item>
        <el-form-item :label="$t('epoch.employee-joinDate')">
          <el-date-picker :placeholder="$t('epoch.employee-joinDate')" class="filter-item" v-model="dto.joinDate"/>
        </el-form-item>
        <el-form-item :label="$t('epoch.employee-gender')">
          <el-input :placeholder="$t('epoch.employee-gender')" class="filter-item" v-model="dto.gender"/>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialog.visible = false">
          {{ $t('epoch.btn-cancel') }}
        </el-button>
        <el-button @click="submit">
          {{ $t('epoch.btn-save') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import base from '@/utils/base'
  import employeeApi from '@/api/hr/employee'

  export default {
    components: { Pagination },
    data() {
      return {
        rows: null,
        pagination: {
          total: 0,
          page: 1,
          pageSize: 10
        },
        dialog: {
          title: null,
          visible: false
        },
        queryParam: {},
        dto: {},
        loading: true
      }
    },
    created() {
      this.query()
    },
    methods: {
      query() {
        this.loading = true
        employeeApi.query(this.pagination, this.queryParam).then(response => {
          base.parseResponse(response, this)
        })
      },
      reset() {
        this.queryParam = {}
      },
      add() {
        this.dto = {}
        this.dialog.visible = true
        this.dialog.title = this.$t('epoch.btn-add')
      },
      edit(row) {
        employeeApi.queryById(row.employeeId).then(res => {
          this.dto = res.data
        })
        this.dialog.visible = true
        this.dialog.title = this.$t('epoch.btn-edit')
      },
      submit() {
        employeeApi.submit(this.dto).then((response) => {
          this.dialog.visible = false
          base.parseResponse(response, this)
          this.query()
        })
      },
      remove() {
        base.remove(this, employeeApi)
      }
    }
  }
</script>
