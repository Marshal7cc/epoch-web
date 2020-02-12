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
        message: scope.$t(response.message),
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
          message: scope.$t(response.message),
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
        message: scope.$t('epoch.tip-deleteSelectCheck'),
        type: 'warning',
        duration: 2000
      })
      return
    }
    scope.$confirm(scope.$t('epoch.tip-deleteSelectConfirm'), scope.$t('epoch.tip-title'), {
      confirmButtonText: scope.$t('epoch.btn-confirm'),
      cancelButtonText: scope.$t('epoch.btn-cancel'),
      type: 'warning'
    }).then(() => {
      api.remove(scope.$refs.dataGrid.selection).then((response) => {
        this.parseResponse(response, scope)
        scope.query()
      })
    })
  },
  /**
   * 生成随机数
   * @param len
   * @param radix
   * @returns {string}
   */
  randomNum: function(len, radix) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const uuid = []
    radix = radix || chars.length

    if (len) {
      // Compact form
      for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
      // rfc4122, version 4 form
      let r

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('') + new Date().getTime()
  }
}
