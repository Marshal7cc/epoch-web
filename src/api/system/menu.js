import request from '@/utils/request'

/**
 * 查询
 */
export function queryMenuTree() {
  return request({
    url: '/system/menus/queryMenuTree',
    method: 'post',
    data: {}
  })
}

/**
 * 保存
 * @param dto
 */
export function submit(dto) {
  return request({
    url: '/system/menu/submit',
    method: 'post',
    data: dto
  })
}

/**
 * 删除
 * @param rows
 */
export function remove(rows) {
  return request({
    url: '/system/menu/remove',
    method: 'post',
    data: rows
  })
}

/**
 * 根据ID查询
 * @param id
 */
export function queryById(id) {
  return request({
    url: '/system/menu/queryById',
    method: 'get',
    params: {
      'id': id
    }
  })
}

/**
 * 获取用户路由
 */
export function getUserMenu() {
  return request({
    url: '/system/menus/getUserMenu',
    method: 'get'
  })
}
