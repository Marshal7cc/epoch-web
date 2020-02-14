<template>
  <div class="department">
    <el-row :gutter="10">
      <el-col :sm="12" :xs="24">
        <div class="app-container">
          <div class="filter-container">
            <el-input :placeholder="$t('epoch.common-name')" class="filter-item search-item" v-model="name"/>
            <el-button @click="search" class="filter-item" plain type="primary">
              {{ $t('epoch.btn-search') }}
            </el-button>
            <el-button @click="reset" class="filter-item" plain type="warning">
              {{ $t('epoch.btn-reset') }}
            </el-button>
            <el-dropdown class="filter-item" trigger="click">
              <el-button>
                {{ $t('epoch.btn-more') }}
                <i class="el-icon-arrow-down el-icon--right"/>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="add">{{ $t('epoch.btn-add') }}</el-dropdown-item>
                <el-dropdown-item @click.native="deleteDepartment">{{ $t('epoch.btn-delete') }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
      <el-col :sm="12" :xs="24">
        <el-card class="box-card">
          <div class="clearfix" slot="header">
            <span>{{ department.departmentId === '' ? $t('epoch.btn-add') : $t('epoch.btn-edit') }}</span>
          </div>
          <div>
            <el-form :model="department" label-position="right" label-width="100px" ref="form">
              <el-form-item :label="$t('epoch.department-parentDepartment')" prop="parentId">
                <treeselect
                  :clear-value-text="$t('common.clear')"
                  :multiple="false"
                  :options="departmentTree"
                  placeholder=" "
                  style="width:100%"
                  v-model="department.parentId"
                />
              </el-form-item>
              <el-form-item :label="$t('epoch.common-name')">
                <el-input v-model="department.name"/>
              </el-form-item>
              <el-form-item :label="$t('epoch.common-code')">
                <el-input v-model="department.departmentCode"/>
              </el-form-item>
              <el-form-item :label="$t('epoch.common-description')">
                <el-input v-model="department.description"/>
              </el-form-item>
              <el-form-item :label="$t('epoch.department-managerPosition')" prop="component">
                <el-input v-model="department.managerPosition"/>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: -2rem;">
          <el-row>
            <el-col :span="24" style="text-align: right">
              <el-button :loading="buttonLoading" @click="submit" plain type="primary">{{ $t('epoch.btn-save') }}
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import base from '@/utils/base'
  import { queryDepartmentTree, submit, remove, queryById } from '@/api/hr/department'

  export default {
    name: 'DepartmentManage',
    components: { Treeselect },
    data() {
      return {
        buttonLoading: false,
        selection: [],
        departmentTree: [],
        name: '',
        department: this.initDepartment()
      }
    },
    mounted() {
      this.initDepartmentTree()
    },
    methods: {
      initDepartmentTree() {
        queryDepartmentTree().then((r) => {
          this.departmentTree = r.data.rows
        })
      },
      initDepartment() {
        return {}
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      nodeClick(data, node, v) {
        queryById(data.id).then(res => {
          this.department = res.data
        })
      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            submit(this.department).then((response) => {
              base.parseResponse(response, this)
              this.initDepartmentTree()
            })
          } else {
            return false
          }
        })
      },
      reset() {
        this.initDepartmentTree()
        this.name = ''
        this.resetForm()
      },
      search() {
        this.$refs.departmentTree.filter(this.name)
      },
      add() {
        this.resetForm()
      },
      deleteDepartment() {
        const checked = this.$refs.departmentTree.getCheckedKeys()
        if (checked.length === 0) {
          this.$message({
            message: this.$t('epoch.tip-deleteSelectCheck'),
            type: 'warning'
          })
        } else {
          this.$confirm(this.$t('epoch.tip-deleteSelectConfirm'), this.$t('epoch.tip-title'), {
            confirmButtonText: this.$t('epoch.btn-confirm'),
            cancelButtonText: this.$t('epoch.btn-cancel'),
            type: 'warning'
          }).then(() => {
            remove(this.$refs.departmentTree.getCheckedNodes().map(function(item) {
              return { departmentId: item.id }
            })).then((response) => {
              base.parseResponse(response, this)
              this.query()
            })
          }).catch(() => {
            this.$refs.departmentTree.setCheckedKeys([])
          })
        }
      },
      resetForm() {
        this.$refs.form.clearValidate()
        this.$refs.form.resetFields()
        this.department = this.initDepartment()
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
