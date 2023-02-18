import { watch } from 'vue'
import store from '@/store'

export const watchlang = (...cbs) => {
  watch(() => store.getters.lang, () => {
    cbs.forEach((cb) => cb(store.getters.lang))
  }, { deep: true })
}
