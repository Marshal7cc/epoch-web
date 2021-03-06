import request from '@/utils/request'

export default {
  /**
   * 查询
   */
  query: function query(pagination, queryParam) {
    return request({
      url: '/system/lang/query',
      method: 'post',
      params: {
        page: pagination.page,
        pageSize: pagination.pageSize
      },
      data: queryParam
    })
  },
  /**
   * 保存
   * @param dto
   */
  submit: function submit(dto) {
    return request({
      url: '/system/lang/submit',
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
      url: '/system/lang/remove',
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
      url: '/system/lang/queryById',
      method: 'get',
      params: {
        'id': id
      }
    })
  },
  /**
   * 查询用作下拉框
   */
  queryForOptions: function() {
    return request({
      url: '/system/lang/queryForOptions',
      method: 'get'
    })
  }
}

