<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParam.roleCode"
        :placeholder="$t('epoch.role-code')"
        style="width: 150px;"
        class="filter-item"
      />
      <el-input v-model="queryParam.roleName" :placeholder="$t('epoch.role-name')" style="width: 150px;" class="filter-item" />

      <el-button plain class="filter-item" type="primary" icon="el-icon-search" @click="query">
        {{ $t('epoch.btn-search') }}
      </el-button>
      <el-button plain class="filter-item" type="info" icon="el-icon-refresh" @click="reset">
        {{ $t('epoch.btn-reset') }}
      </el-button>
      <el-button plain class="filter-item" type="success" icon="el-icon-circle-plus-outline" @click="add">
        {{ $t('epoch.btn-add') }}
      </el-button>
      <el-button plain class="filter-item" type="warning" icon="el-icon-delete" @click="remove">
        {{ $t('epoch.btn-delete') }}
      </el-button>
    </div>

    <el-table
      :key="0"
      ref="dataGrid"
      v-loading="loading"
      :data="rows"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        type="selection"
      />
      <el-table-column :label="$t('epoch.role-code')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roleCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('epoch.role-name')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('epoch.common-description')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roleDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('epoch.common-operation')" align="center">
        <template slot-scope="{row}">
          <el-button circle type="primary" icon="el-icon-edit" size="mini" @click="edit(row)" />
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="pagination.total>0"
      :total="pagination.total"
      :page.sync="pagination.page"
      :page-size.sync="pagination.pageSize"
      @pagination="query"
    />

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <el-form
        ref="dataForm"
        :model="dto"
        label-position="left"
        label-width="170px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('epoch.role-code')" prop="roleCode">
          <el-input v-model="dto.roleCode" class="filter-item" :placeholder="$t('epoch.role-code')" />
        </el-form-item>
        <el-form-item :label="$t('epoch.role-name')" prop="roleName">
          <el-input v-model="dto.roleName" class="filter-item" :placeholder="$t('epoch.role-name')" />
        </el-form-item>
        <el-form-item :label="$t('epoch.common-description')" prop="description">
          <el-input v-model="dto.roleDescription" class="filter-item" :placeholder="$t('epoch.common-description')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
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
import roleApi from '@/api/system/role'

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
      roleApi.query(this.pagination, this.queryParam).then(response => {
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
      roleApi.queryById(row.roleId).then(res => {
        this.dto = res.data
      })
      this.dialog.visible = true
      this.dialog.title = this.$t('epoch.btn-edit')
    },
    submit() {
      roleApi.submit(this.dto).then((response) => {
        this.dialog.visible = false
        base.parseResponse(response, this)
        this.query()
      })
    },
    remove() {
      base.remove(this, roleApi)
    }
  }
}
</script>
