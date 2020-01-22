import { query } from '@/api/system/prompt'

const prompts = query()

// query().then(res => {
//   prompts = res
// })

export default {
  prompts
}
