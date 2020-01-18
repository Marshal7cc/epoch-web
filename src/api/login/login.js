import request from '@/utils/request'
import { basicAuthorization } from '@/settings'

/*
 * @login
 */
export function login(username, password) {
  return request({
    headers: {
      'Authorization': basicAuthorization
    },
    url: '/auth/oauth/token',
    method: 'post',
    params: {
      'username': username,
      'password': password,
      'grant_type': 'password'
    }
  })
}
