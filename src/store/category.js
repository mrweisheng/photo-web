import { defineStore } from 'pinia'
import { categoryApi } from '../api/category'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    loading: false,
    error: null
  }),

  getters: {
    getCategoryById: (state) => {
      return (id) => state.categories.find(c => c.id === id)
    }
  },

  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        const { data } = await categoryApi.getCategories()
        this.categories = data
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async addCategory(name) {
      try {
        const { data } = await categoryApi.createCategory(name)
        this.categories.unshift(data)
        return data
      } catch (err) {
        this.error = err.message
        throw err
      }
    }
  }
}) 