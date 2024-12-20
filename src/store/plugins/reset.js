export function resetStore(store) {
  return {
    ...store,
    $reset() {
      store.$patch(store.$state)
    }
  }
} 