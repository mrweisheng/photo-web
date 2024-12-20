import { createPinia } from 'pinia'
import { persist } from './plugins/persist'
import { resetStore } from './plugins/reset'

const pinia = createPinia()
pinia.use(persist)
pinia.use(resetStore)

export default pinia 