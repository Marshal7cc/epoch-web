import { basicAuthorization } from '@/settings'
import request from '@/utils/request'
import auth from '@/utils/auth'

export default {
  /**
   * 登录认证
   * @param username
   * @param password
   */
  login: function(authenticationInfo) {
    authenticationInfo.grant_type = 'password'
    return request({
      headers: {
        'Authorization': basicAuthorization
      },
      url: '/auth/oauth/token',
      method: 'post',
      params: authenticationInfo
    })
  },
  /**
   * 注销登录
   */
  logout: function() {
    auth.removeToken()
    auth.clear()
  },
  /**
   * 生成图片验证码
   * @param randomId
   * @param scope
   */
  generateValidateCode: function(randomId, scope) {
    request({
      method: 'get',
      url: '/auth/captcha/create?validateCodeKey=' + randomId,
      responseType: 'arraybuffer'
    }).then(res => {
      return 'data:image/png;base64,' + btoa(
        new Uint8Array(res)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      )
    }).then((res) => {
      scope.validateCode.imageCode = res
    }).catch((e) => {
      if (e.toString().indexOf('429') !== -1) {
        scope.$message({
          message: scope.$t('tips.tooManyRequest'),
          type: 'error'
        })
      } else {
        scope.$message({
          message: scope.$t('tips.getCodeImageFailed'),
          type: 'error'
        })
      }
    })
  }
}

