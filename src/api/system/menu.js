import request from '@/utils/request'

export function getUserMenu() {
  return request({
    url: '/system/menu/getUserMenu',
    method: 'get'
  })
}
