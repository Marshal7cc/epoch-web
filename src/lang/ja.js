import { i18n } from '@/api/system/prompt'

const epoch = async() => i18n('ja').res.data.rows

export default {
  epoch
}
