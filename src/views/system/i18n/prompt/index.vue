<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="queryParam.promptCode" placeholder="描述代码" style="width: 150px;" class="filter-item"/>
      <el-input v-model="queryParam.description" placeholder="描述" style="width: 150px;" class="filter-item"/>
      <el-select v-model="queryParam.lang" placeholder="语言" clearable style="width: 150px" class="filter-item">
        <el-option v-for="item in langOptions" :key="item.langId" :label="item.langName" :value="item.langId"/>
      </el-select>

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
      v-loading="loading"
      :data="rows"
      ref="dataGrid"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column label="代码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.promptCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="语言" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lang }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button circle type="primary" icon="el-icon-edit" size="mini" @click="edit(row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="pagination.total>0" :total="pagination.total" :page.sync="pagination.page"
                :pageSize.sync="pagination.pageSize"
                @pagination="query"/>

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <el-form ref="dataForm" :model="dto" label-position="left" label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="代码" prop="roleCode">
          <el-input v-model="dto.promptCode" class="filter-item" placeholder="代码">
          </el-input>
        </el-form-item>
        <el-form-item label="语言" prop="语言">
          <el-select v-model="dto.lang" class="filter-item" placeholder="语言">
            <el-option v-for="item in langOptions" :key="item.langId" :label="item.langName" :value="item.langId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="roleName">
          <el-input v-model="dto.description" class="filter-item" placeholder="描述">
          </el-input>
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
  import promptApi from '@/api/system/prompt'
  import langApi from '@/api/system/lang'

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
        loading: true,
        langOptions: {}
      }
    },
    created() {
      this.query()
    },
    mounted() {
      langApi.queryForOptions().then(res => {
        this.langOptions = res.data.rows
      })
    },
    methods: {
      query() {
        this.loading = true
        promptApi.query(this.pagination, this.queryParam).then(response => {
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
        promptApi.queryById(row.userId).then(res => {
          this.dto = res.data
        })
        this.dialog.visible = true
        this.dialog.title = this.$t('epoch.btn-edit')
      },
      submit() {
        promptApi.submit(this.dto).then((response) => {
          this.dialog.visible = false
          base.parseResponse(response, this)
          this.query()
        })
      },
      remove() {
        base.remove(this, promptApi)
      }
    }
  }
</script>
