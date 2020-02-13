import request from '@/utils/request'
import { Message } from 'element-ui'

export default {
  submit: function(dto) {
    return request({
      url: '/generator/create',
      method: 'post',
      data: dto,
      responseType: 'blob'
    }).then((r) => {
      const filename = dto.targetName + '.zip'
      const content = r
      const blob = new Blob([content])
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      } else {
        navigator.msSaveBlob(blob, filename)
      }
    }).catch((r) => {
      console.error(r)
      Message({
        message: r.message,
        type: 'error',
        duration: 1000
      })
    })
  }
}

