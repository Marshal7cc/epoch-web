import request from '@/utils/request'

export function query(pagination, queryParam) {
  return request({
    url: '/system/role/query',
    method: 'post',
    params: {
      page: pagination.page,
      pageSize: pagination.pageSize
    },
    data: queryParam
  })
}

export function submit(dto) {
  return request({
    url: '/system/role/submit',
    method: 'post',
    data: dto
  })
}

export function remove(rows) {
  return request({
    url: '/system/role/remove',
    method: 'post',
    data: rows
  })
}
