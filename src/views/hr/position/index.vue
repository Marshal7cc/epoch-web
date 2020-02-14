<template>
  <div class="department">
    <el-row :gutter="10">
      <el-col :sm="4" :xs="24">
        <div class="app-container">
          <div class="filter-container">
            <el-input :placeholder="$t('epoch.common-name')" class="filter-item search-item" v-model="name"/>
            <el-button @click="search" class="filter-item" plain type="primary">
              {{ $t('epoch.btn-search') }}
            </el-button>
          </div>
          <el-tree
            :check-strictly="true"
            :data="departmentTree"
            :filter-node-method="filterNode"
            @node-click="nodeClick"
            accordion
            highlight-current
            node-key="id"
            ref="departmentTree"
            show-checkbox
          />
        </div>
      </el-col>
      <el-col :sm="18" :xs="24">
        <!-- 岗位管理 -->
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
            <el-table-column type="selection"/>
            <el-table-column :label="$t('epoch.common-code')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.positionCode }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('epoch.common-name')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('epoch.common-description')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
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
              <el-form-item :label="$t('epoch.position-departmentName')" prop="userName">
                <treeselect
                  :clear-value-text="$t('common.clear')"
                  :multiple="false"
                  :options="departmentTree"
                  placeholder=" "
                  style="width:100%"
                  v-model="dto.departmentId"
                />
              </el-form-item>
              <el-form-item :label="$t('epoch.common-code')" prop="userName">
                <el-input :placeholder="$t('epoch.common-code')" class="filter-item" v-model="dto.positionCode"/>
              </el-form-item>
              <el-form-item :label="$t('epoch.common-name')" prop="email">
                <el-input :placeholder="$t('epoch.common-name')" class="filter-item" v-model="dto.name"/>
              </el-form-item>
              <el-form-item :label="$t('epoch.common-description')" prop="phone">
                <el-input :placeholder="$t('epoch.common-description')" class="filter-item" v-model="dto.description"/>
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import Pagination from '@/components/Pagination'
  import base from '@/utils/base'
  import positionApi from '@/api/hr/position'
  import { queryDepartmentTree } from '@/api/hr/department'

  export default {
    name: 'PositionManage',
    components: { Treeselect, Pagination },
    data() {
      return {
        name: '',
        buttonLoading: false,
        departmentTree: [],
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
    mounted() {
      this.initDepartmentTree()
      this.query()
    },
    methods: {
      initDepartmentTree() {
        queryDepartmentTree().then((r) => {
          this.departmentTree = r.data.rows
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      nodeClick(data, node, v) {
        this.queryParam.departmentId = data.id
        this.query()
      },
      search() {
        this.$refs.departmentTree.filter(this.name)
      },
      query() {
        this.loading = true
        positionApi.query(this.pagination, this.queryParam).then(response => {
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
        positionApi.queryById(row.positionId).then(res => {
          this.dto = res.data
        })
        this.dialog.visible = true
        this.dialog.title = this.$t('epoch.btn-edit')
      },
      submit() {
        positionApi.submit(this.dto).then((response) => {
          this.dialog.visible = false
          base.parseResponse(response, this)
          this.query()
        })
      },
      remove() {
        base.remove(this, positionApi)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .department {
    margin: 10px;

    .app-container {
      margin: 0 0 10px 0 !important;
    }
  }

  .el-card.is-always-shadow {
    box-shadow: none;
  }

  .el-card {
    border-radius: 0;
    border: none;

    .el-card__header {
      padding: 10px 20px !important;
      border-bottom: 1px solid #f1f1f1 !important;
    }
  }
</style>
