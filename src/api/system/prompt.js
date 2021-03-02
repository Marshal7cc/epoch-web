import request from '@/utils/request'

export default {
  /**
   * 查询
   */
  query: function query(pagination, queryParam) {
    return request({
      url: '/system/prompt/query',
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
      url: '/system/prompt/submit',
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
      url: '/system/prompt/remove',
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
      url: '/system/prompt/queryById',
      method: 'get',
      params: {
        'id': id
      }
    })
  },
  /**
   * 根据语言查找全部
   * @param langCode
   */
  i18n: function(langCode) {
    return request({
      url: '/system/prompts/i18n',
      method: 'get',
      params: {
        'langCode': langCode
      }
    })
  }
}

