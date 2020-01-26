/**
 * @author Marshal
 * @date   2019/10/31
 * @desc   基础通用方法
 */
export default {
  /**
   * 通用处理返回结果
   * @param response
   * @param scope
   */
  parseResponse: function(response, scope) {
    if (!response.success) {
      scope.$notify({
        message: response.message,
        type: 'error',
        duration: 2000
      })
    } else {
      if (response.data) {
        scope.rows = response.data.rows
        scope.pagination.total = response.data.total
        setTimeout(() => {
          scope.loading = false
        }, 0.5 * 1000)
      } else {
        scope.$notify({
          message: response.message,
          type: 'success',
          duration: 2000
        })
      }
    }
  },

  /**
   * 通用删除方法
   * @param scope
   */
  remove: function(scope, api) {
    if (scope.$refs.dataGrid.selection.length == 0) {
      scope.$notify({
        message: '请至少选择一条数据',
        type: 'warning',
        duration: 2000
      })
      return
    }
    scope.$confirm('确定要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      api.remove(scope.$refs.dataGrid.selection).then((response) => {
        this.parseResponse(response, scope)
        scope.query()
      })
    })
  }
}
