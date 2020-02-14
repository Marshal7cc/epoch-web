import request from '@/utils/request'

export default {
  /**
   * 查询
   */
  query: function query() {
    return request({
      url: '/hr/company/query',
      method: 'get'
    })
  },
  /**
   * 保存
   * @param dto
   */
  submit: function submit(dto) {
    return request({
      url: '/hr/company/submit',
      method: 'post',
      data: dto
    })
  }
}

