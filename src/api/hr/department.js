import request from '@/utils/request'

/**
 * 查询
 */
export function queryDepartmentTree() {
  return request({
    url: '/hr/department/queryDepartmentTree',
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
    url: '/hr/department/submit',
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
    url: '/hr/department/remove',
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
    url: '/hr/department/queryById',
    method: 'get',
    params: {
      'id': id
    }
  })
}
