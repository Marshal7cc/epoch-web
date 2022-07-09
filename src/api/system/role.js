import request from '@/utils/request'

export default {
  /**
   * 查询
   */
  query: function query(pagination, queryParam) {
    return request({
      url: '/iam/roles/1/10',
      method: 'get',
      data: queryParam
    })
  },
  /**
   * 保存
   * @param dto
   */
  submit: function submit(dto) {
    return request({
      url: '/iam/roles',
      method: 'post',
      data: dto
    })
  },
  /**
   * 删除
   * @param rows
   */
  remove: function remove(rows) {
    return request({
      url: '/iam/roles/remove',
      method: 'post',
      data: rows
    })
  },
  /**
   * 根据ID查询
   * @param id
   */
  queryById: function queryById(id) {
    return request({
      url: '/iam/roles/queryById',
      method: 'get',
      params: {
        'id': id
      }
    })
  }
}

