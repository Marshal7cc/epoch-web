import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import router from '@/router'
import auth from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (auth.getToken()) {
      config.headers['Authorization'] = auth.getToken()
    }
    return config
  }
)

// response interceptor
service.interceptors.response.use((response) => {
  if (response.data) {
    return response.data
  }
  return response
}, (error) => {
  if (error.response) {
    const errorMessage = error.response.data === null ? '系统内部异常，请联系网站管理员' : error.response.data.message
    switch (error.response.status) {
      case 500:
        Message({
          message: errorMessage,
          type: 'error',
          duration: 1000
        })
        break
      case 502:
        Message({
          message: errorMessage,
          type: 'error',
          duration: 1000
        })
        break
      case 404:
        Message({
          message: '很抱歉，资源未找到',
          type: 'error',
          duration: 1000
        })
        break
      case 403:
        Message({
          message: '很抱歉，您暂无该操作权限',
          type: 'error',
          duration: 1000
        })
        break
      case 401:
        debugger
        Message({
          message: '很抱歉，认证已失效，请重新登录',
          type: 'error',
          duration: 1000
        })
        setTimeout(function() {
          location.reload()
        }, 1000)
        break
      default:
        if (errorMessage === 'refresh token无效') {
          MessageBox.alert('登录已过期，请重新登录', '温馨提示', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
              router.push('/login')
            }
          })
        } else {
          Message({
            message: errorMessage,
            type: 'error',
            duration: 1000
          })
        }
        break
    }
  }
  return Promise.reject(error)
})

export default service
