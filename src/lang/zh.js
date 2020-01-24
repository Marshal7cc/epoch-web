import { i18n } from '@/api/system/prompt'

let epoch = {
  // 'common-search': '新增'
}

i18n('zh_CN').then(res => {
  epoch = res.data
})

console.log(epoch)

export default {
  epoch
}
