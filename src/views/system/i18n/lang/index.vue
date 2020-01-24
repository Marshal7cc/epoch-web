<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="queryParam.langName" placeholder="语言名称" style="width: 200px;" class="filter-item"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="query">
        {{ $t('epoch.common-search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="add">
        新增
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-delete"
                 @click="remove">
        删除
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
      <el-table-column label="语言代码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.langCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="语言名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.langName }}</span>
        </template>
      </el-table-column>
            <el-table-column label="描述" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="edit(row)">
            编辑
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
        <el-form-item label="语言代码" prop="langCode">
          <el-input v-model="dto.langCode" class="filter-item" placeholder="语言代码">
          </el-input>
        </el-form-item>
        <el-form-item label="语言名称" prop="langName">
          <el-input v-model="dto.langName" class="filter-item" placeholder="语言名称">
          </el-input>
        </el-form-item>
        <el-form-item label="描述" prop="langName">
                  <el-input v-model="dto.description" class="filter-item" placeholder="描述">
                  </el-input>
                </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">
          取消
        </el-button>
        <el-button type="primary" @click="submit">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import base from "@/utils/base";
  import {query, submit, remove, queryById} from '@/api/system/lang'
  import Pagination from '@/components/Pagination'

  export default {
    components: {Pagination},
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
        query(this.pagination, this.queryParam).then(response => {
          base.parseResponse(response, this)
        })
      },
      reset() {
        this.dto = {}
      },
      add() {
        this.reset()
        this.dialog.visible = true
        this.dialog.title = '新增'
      },
      edit(row) {
        queryById(row.langId).then(res=>{this.dto = res.data})
        this.dialog.visible = true
        this.dialog.title = '编辑'
      },
      submit() {
        submit(this.dto).then((response) => {
          this.dialog.visible = false
          base.parseResponse(response, this)
          this.query()
        })
      },
      remove() {
        base.removeCheck(this)
        remove(this.$refs.dataGrid.selection).then((response) => {
          base.parseResponse(response, this)
          this.query()
        })
      }
    }
  }
</script>
