import request from '@/utils/request'

/**
 * 查询
 */
export function query(pagination, queryParam) {
  return request({
    url: '/system/lang/query',
    method: 'post',
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize
    },
    data: queryParam
  })
}

/**
 * 保存
 * @param dto
 */
export function submit(dto) {
  return request({
    url: '/system/lang/submit',
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
    url: '/system/lang/remove',
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
    url: '/system/lang/queryById',
    method: 'get',
    params: {
      'id': id
    }
  })
}

/**
 * 查询用作下拉框
 */
export function queryForOptions() {
  return request({
    url: '/system/lang/queryForOptions',
    method: 'get'
  })
}
