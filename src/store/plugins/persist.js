import { createPersistedState } from 'pinia-plugin-persistedstate'

export const persist = createPersistedState({
  key: prefix => `image-manager-${prefix}`,
  storage: localStorage
}) 