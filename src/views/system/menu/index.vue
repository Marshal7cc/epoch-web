<template>
  <div class="menu">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12">
        <div class="app-container">
          <div class="filter-container">
            <el-input v-model="menuName" placeholder="输入菜单名称" class="filter-item search-item" />
            <el-button class="filter-item" type="primary" plain @click="search">
              {{ $t('epoch.btn-search') }}
            </el-button>
            <el-button class="filter-item" type="warning" plain @click="reset">
              重置
            </el-button>
            <el-dropdown v-has-any-permission="['menu:add','menu:delete','menu:export']" trigger="click" class="filter-item">
              <el-button>
                更多<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="add">{{ $t('epoch.btn-add') }}</el-dropdown-item>
                <el-dropdown-item @click.native="deleteMenu">{{ $t('epoch.btn-delete') }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-tree
            ref="menuTree"
            :data="menuTree"
            :check-strictly="true"
            show-checkbox
            accordion
            node-key="id"
            highlight-current
            :filter-node-method="filterNode"
            @node-click="nodeClick"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ menu.menuId === '' ? $t('epoch.btn-add') : '编辑' }}</span>
          </div>
          <div>
            <el-form ref="form" :model="menu" :rules="rules" label-position="right" label-width="100px">
              <el-form-item label="父级菜单" prop="parentId">
                <treeselect
                  v-model="menu.parentId"
                  :multiple="false"
                  :options="menuTree"
                  :clear-value-text="$t('common.clear')"
                  placeholder=" "
                  style="width:100%"
                />
              </el-form-item>
              <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="menu.menuName" />
              </el-form-item>
              <el-form-item label="菜单编码" prop="menuCode">
                              <el-input v-model="menu.menuCode" />
                            </el-form-item>
              <el-form-item label="图标" prop="menuIcon">
                <el-input v-model="menu.menuIcon">
                  <el-button slot="append" icon="el-icon-brush" style="padding-left: 0;" @click="chooseIcons" />
                </el-input>
              </el-form-item>
              <el-form-item label="路径" prop="path">
                <el-input v-model="menu.path" />
              </el-form-item>
              <el-form-item label="组件" prop="component">
                <el-input v-model="menu.component" />
              </el-form-item>
              <el-form-item label="描述" prop="description">
                <el-input v-model="menu.description" />
              </el-form-item>
              <el-form-item label="序号" prop="sequence">
                <el-input-number v-model="menu.sequence" :min="0" :max="100" @change="handleNumChange" />
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: -2rem;">
          <el-row>
            <el-col :span="24" style="text-align: right">
              <el-button type="primary" plain :loading="buttonLoading" @click="submit">'保存'</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <Icons
      :dialog-visible="iconVisible"
      @close="iconVisible = false"
      @choose="chooseIcon"
    />
  </div>
</template>
<script>
import Icons from './Icons'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import base from "@/utils/base";
import { queryMenuTree, submit, remove, queryById } from '@/api/system/menu'

export default {
  name: 'MenuManage',
  components: { Icons, Treeselect },
  data() {
    return {
      iconVisible: false,
      buttonLoading: false,
      selection: [],
      menuTree: [],
      menuName: '',
      menu: this.initMenu(),
      rules: {
        menuName: [
          { required: true, message: this.$t('rules.require'), trigger: 'blur' },
          { min: 2, max: 10, message: this.$t('rules.range2to10'), trigger: 'blur' }
        ],
        path: { max: 100, message: this.$t('rules.noMoreThan100'), trigger: 'blur' },
        component: { max: 100, message: this.$t('rules.noMoreThan100'), trigger: 'blur' },
        perms: { max: 50, message: this.$t('rules.noMoreThan50'), trigger: 'blur' }
      }
    }
  },
  mounted() {
    this.initMenuTree()
  },
  methods: {
    initMenuTree() {
      queryMenuTree().then((r) => {
        this.menuTree = r.data.rows
      })
    },
    initMenu() {
      return {
        menuId: '',
        menuName: '',
        parentId: null,
        path: '',
        component: '',
        orderNum: 0,
        icon: ''
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    nodeClick(data, node, v) {
        queryById(data.id).then(res=>{
            this.menu = res.data
        })
    },
    handleNumChange(val) {
      this.menu.sequence = val
    },
    chooseIcons() {
      this.iconVisible = true
    },
    chooseIcon(icon) {
      this.menu.menuIcon = icon
      this.iconVisible = false
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          submit(this.menu).then((response) => {
                    base.parseResponse(response, this)
                    this.initMenuTree()
          })
        } else {
          return false
        }
      })
    },
    reset() {
      this.initMenuTree()
      this.menuName = ''
      this.resetForm()
    },
    search() {
      this.$refs.menuTree.filter(this.menuName)
    },
    add() {
      this.resetForm()
    },
    deleteMenu() {
      const checked = this.$refs.menuTree.getCheckedKeys()
      if (checked.length === 0) {
        this.$message({
          message: this.$t('tips.noNodeSelected'),
          type: 'warning'
        })
      } else {
        this.$confirm(this.$t('tips.confirmDeleteNode'), this.$t('common.tips'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          remove(this.$refs.menuTree.getCheckedNodes().map(function(item){ return { menuId:item.id } })).then((response) => {
                    base.parseResponse(response, this)
                    this.query()
                  })
        }).catch(() => {
          this.$refs.menuTree.setCheckedKeys([])
        })
      }
    },
    resetForm() {
      this.$refs.form.clearValidate()
      this.$refs.form.resetFields()
      this.menu = this.initMenu()
    }
  }
}
</script>
<style lang="scss" scoped>
  .menu {
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
