import request from '@/utils/request'

export function query(pagination, queryParam) {
  return request({
    url: '/account/role/query',
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
    url: '/account/role/submit',
    method: 'post',
    data: dto
  })
}

export function remove(rows) {
  return request({
    url: '/account/role/remove',
    method: 'post',
    data: rows
  })
}
